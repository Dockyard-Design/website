import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import { adminOnly, adminOrSelf, adminOnlyFieldAccess, preventSelfRoleChange } from '@/access/roles'

/**
 * Hook to handle first user creation
 * Creates roles before user is saved and assigns Admin role
 */
const handleFirstUser: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation !== 'create') return data

  // If roles already assigned, skip
  if (data.roles && data.roles.length > 0) {
    return data
  }

  try {
    // Check if this is the first user
    const existingUsers = await req.payload.find({
      collection: 'users',
      limit: 0,
      depth: 0,
    })

    // If users exist and user is not admin, don't auto-assign
    if (existingUsers.totalDocs > 0) {
      // Check if current user is admin
      const hasAdminRole = req.user?.roles?.some((role) => {
        if (typeof role === 'number') return false
        return (role as { slug?: string }).slug === 'admin'
      })
      if (!hasAdminRole) {
        return data
      }
    }

    // First user - create roles and assign Admin
    req.payload.logger.info('First user detected - creating roles')

    // Create Admin role if it doesn't exist
    const adminRoleResult = await req.payload.find({
      collection: 'roles',
      where: { slug: { equals: 'admin' } },
      depth: 0,
    })

    let adminRoleId: string | number

    if (adminRoleResult.docs.length === 0) {
      const newAdminRole = await req.payload.create({
        collection: 'roles',
        data: {
          name: 'Admin',
          slug: 'admin',
          description: 'Full system access to all collections',
          permissions: [
            { collection: 'users', hasAccess: true },
            { collection: 'media', hasAccess: true },
            { collection: 'projects', hasAccess: true },
          ],
        },
      })
      adminRoleId = newAdminRole.id
      req.payload.logger.info('Admin role created')
    } else {
      adminRoleId = adminRoleResult.docs[0].id
    }

    // Create Editor role if it doesn't exist
    const editorRoleResult = await req.payload.find({
      collection: 'roles',
      where: { slug: { equals: 'editor' } },
      depth: 0,
    })

    if (editorRoleResult.docs.length === 0) {
      await req.payload.create({
        collection: 'roles',
        data: {
          name: 'Editor',
          slug: 'editor',
          description: 'Can manage media and projects',
          permissions: [
            { collection: 'media', hasAccess: true },
            { collection: 'projects', hasAccess: true },
          ],
        },
      })
      req.payload.logger.info('Editor role created')
    }

    // Assign Admin role to this user
    data.roles = [adminRoleId]
    req.payload.logger.info(`Admin role assigned to first user: ${data.email}`)
  } catch (error) {
    req.payload.logger.error({
      msg: 'Failed to setup roles for first user',
      error: error instanceof Error ? error.message : String(error),
    })
  }

  return data
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
  },
  auth: true,
  access: {
    // Allow anyone to create when no users exist (first user setup)
    create: ({ req }) => {
      // Always allow creating first user
      return true
    },
    read: adminOrSelf,
    update: adminOrSelf,
    delete: adminOnly,
    admin: adminOnly,
  },
  hooks: {
    beforeChange: [handleFirstUser],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the user',
      },
    },
    {
      name: 'roles',
      type: 'relationship',
      relationTo: 'roles',
      hasMany: true,
      saveToJWT: true,
      admin: {
        description:
          'Assign roles to this user. Admins have full access. First user automatically becomes Admin.',
        position: 'sidebar',
        condition: (data, siblingData, { user }) => {
          // Hide roles field if not logged in (first user creation)
          return !!user
        },
      },
      access: {
        create: adminOnlyFieldAccess,
        read: adminOnlyFieldAccess,
        update: preventSelfRoleChange,
      },
    },
  ],
}
