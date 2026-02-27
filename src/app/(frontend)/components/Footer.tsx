import { getPayload } from 'payload'
import config from '@/payload.config'
import FooterClient from './FooterClient'
import type { Footer as FooterType, SiteSetting } from '@/payload-types'

// Helper to get image URL
const getImageUrl = (image: any, fallback: string = '') => {
  if (typeof image === 'object' && image !== null && 'url' in image) return image.url
  return fallback
}

export default async function Footer() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [footer, siteSettings] = await Promise.all([
    payload.findGlobal({
      slug: 'footer',
      depth: 2,
    }) as Promise<FooterType>,
    payload.findGlobal({
      slug: 'site-settings',
      depth: 2,
    }) as Promise<SiteSetting>,
  ])

  // Transform socialLinks to match expected type
  const socialLinks = footer?.socialLinks
    ? {
        facebook: footer.socialLinks.facebook || undefined,
        instagram: footer.socialLinks.instagram || undefined,
        youtube: footer.socialLinks.youtube || undefined,
      }
    : undefined

  return (
    <FooterClient
      logoUrl={getImageUrl(siteSettings?.logo, '/images/logo.png')}
      backgroundImageUrl={getImageUrl(footer?.backgroundImage) || '/images/anchor-footer.png'}
      leftNavLinks={footer?.leftNavLinks || []}
      rightNavLinks={footer?.rightNavLinks || []}
      email={footer?.email || 'hello@dockyard.design'}
      socialLinks={socialLinks}
    />
  )
}
