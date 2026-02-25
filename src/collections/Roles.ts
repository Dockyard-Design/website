import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUGS, isSystemRole } from '@/types/roles'
import { adminOnly } from '@/access/roles'

interface RoleData {
  id: string | number
  slug: string
  name: string
}

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    useAsTitle: 'name',
    group: 'Admin',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    // Allow anyone to read/create when setting up (no users yet)
    // After setup, only admins can manage roles
    create: ({ req }) => {
      // Always allow creating roles (for first user setup)
      return true
    },
    read: ({ req }) => {
      // Always allow reading roles (needed for auto-assignment)
      return true
    },
    update: adminOnly,
    delete: adminOnly,
    admin: adminOnly,
  },
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        // Prevent changing system role slugs
        if (operation === 'update' && data.slug && isSystemRole(data.slug as string)) {
          // Fetch original to check if slug changed
          const original = await req.payload.findByID({
            collection: 'roles',
            id: data.id as string,
            depth: 0,
          })
          if ((original as RoleData).slug !== data.slug) {
            throw new Error('Cannot modify system role slug')
          }
        }
        return data
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        // Fetch the role being deleted to check if it's a system role
        const role = await req.payload.findByID({
          collection: 'roles',
          id: id as string,
          depth: 0,
        })
        const roleData = role as RoleData
        if (roleData?.slug && isSystemRole(roleData.slug)) {
          throw new Error(`Cannot delete the ${roleData.name} role`)
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name for this role',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for this role (e.g., "admin", "editor")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description of what this role can do',
      },
    },
    {
      name: 'permissions',
      type: 'array',
      label: 'Collection Permissions',
      admin: {
        description: 'Select which collections this role can access',
      },
      fields: [
        {
          name: 'collection',
          type: 'select',
          required: true,
          options: COLLECTION_SLUGS.map((slug) => ({
            label: slug.charAt(0).toUpperCase() + slug.slice(1),
            value: slug,
          })),
        },
        {
          name: 'hasAccess',
          type: 'checkbox',
          label: 'Has Access',
          defaultValue: true,
        },
      ],
    },
  ],
}
