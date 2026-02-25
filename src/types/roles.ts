// Collection slugs that can have permissions assigned (excluding 'roles' since it's managed by admin only)
export const COLLECTION_SLUGS = ['users', 'media', 'projects'] as const

export type CollectionSlug = (typeof COLLECTION_SLUGS)[number]

export interface Permission {
  collection: CollectionSlug
  hasAccess: boolean
}

// Role slugs that are system-protected
export const SYSTEM_ROLES = ['admin'] as const
export type SystemRoleSlug = (typeof SYSTEM_ROLES)[number]

// Helper to check if a role is a system role
export const isSystemRole = (slug: string): boolean => {
  return SYSTEM_ROLES.includes(slug as SystemRoleSlug)
}

// Helper to validate collection slug
export const isValidCollectionSlug = (slug: string): slug is CollectionSlug => {
  return COLLECTION_SLUGS.includes(slug as CollectionSlug)
}
