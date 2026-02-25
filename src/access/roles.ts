import type { Access, FieldAccess } from 'payload'
import type { CollectionSlug } from '@/types/roles'

// Extended User type with roles
interface RoleWithPermissions {
  id: string | number
  slug?: string
  permissions?: Array<{
    collection: string
    hasAccess: boolean
  }>
}

interface UserWithRoles {
  id: string | number
  roles?: RoleWithPermissions[]
  [key: string]: unknown
}

/**
 * Check if user has the admin role
 * Special case: first user is always considered admin
 */
export const isAdmin = async (
  user: UserWithRoles | null | undefined,
  payload?: { count: (args: { collection: string }) => Promise<{ totalDocs: number }> },
): Promise<boolean> => {
  // If no user, not admin
  if (!user) return false

  // Check if user has admin role
  const hasAdminRole = user.roles?.some((role) => role.slug === 'admin')
  if (hasAdminRole) return true

  // Special case: if there's only 1 user in the system, they're the first user
  // and should be treated as admin
  if (payload) {
    try {
      const userCount = await payload.count({ collection: 'users' })
      if (userCount.totalDocs <= 1) {
        return true
      }
    } catch {
      // If we can't count, assume it's the first user
      return true
    }
  }

  return false
}

/**
 * Check if user has permission for a specific collection
 */
export const hasCollectionAccess = (
  user: UserWithRoles | null | undefined,
  collectionSlug: CollectionSlug,
): boolean => {
  if (!user?.roles) return false

  // Check if any role has explicit permission for this collection
  return user.roles.some((role) =>
    role.permissions?.some(
      (permission) => permission.collection === collectionSlug && permission.hasAccess === true,
    ),
  )
}

/**
 * Access function: Admin only
 */
export const adminOnly = ((args) => {
  const user = args.req.user as UserWithRoles | null | undefined

  // First user fallback: if no users exist yet, allow access
  if (!args.req.user) {
    return false
  }

  // Check if user has admin role
  const hasAdminRole = user?.roles?.some((role) => role.slug === 'admin')
  if (hasAdminRole) return true

  // Fallback: if user has no roles, they might be the first user
  // Allow them through (roles will be assigned by hook)
  if (!user?.roles || user.roles.length === 0) {
    return true
  }

  return false
}) satisfies Access

/**
 * Access function: Admin or user with collection permission
 */
export const adminOrHasCollectionAccess = (collectionSlug: CollectionSlug) => {
  return ((args) => {
    const user = args.req.user as UserWithRoles | null | undefined

    // First user fallback: if user has no roles, allow access
    if (!user?.roles || user.roles.length === 0) {
      return true
    }

    // Check if admin
    const hasAdminRole = user.roles?.some((role) => role.slug === 'admin')
    if (hasAdminRole) return true

    // Check collection permission
    return hasCollectionAccess(user, collectionSlug)
  }) satisfies Access
}

/**
 * Access function: Admin or self (for user management)
 */
export const adminOrSelf = ((args) => {
  const user = args.req.user as UserWithRoles | null | undefined

  // First user fallback
  if (!user?.roles || user.roles.length === 0) {
    return true
  }

  // Check if admin
  const hasAdminRole = user.roles?.some((role) => role.slug === 'admin')
  if (hasAdminRole) return true

  // Check if self
  return user?.id === args.id
}) satisfies Access

/**
 * Field access: Admin only
 */
export const adminOnlyFieldAccess: FieldAccess = (args) => {
  const user = args.req.user as UserWithRoles | null | undefined

  // First user fallback
  if (!user?.roles || user.roles.length === 0) {
    return true
  }

  return user?.roles?.some((role) => role.slug === 'admin') ?? false
}

/**
 * Field access: Prevent self-role change
 * Users cannot change their own roles
 */
export const preventSelfRoleChange: FieldAccess = (args) => {
  const user = args.req.user as UserWithRoles | null | undefined

  // First user can do anything
  if (!user?.roles || user.roles.length === 0) {
    return true
  }

  if (!user) return false
  if (user.roles?.some((role) => role.slug === 'admin')) return true
  // Prevent changing own roles
  if (user.id === args.id) return false
  return true
}
