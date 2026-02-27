import { getPayload } from 'payload'
import config from '@/payload.config'
import NavBarClient from './NavBarClient'
import type { Header, SiteSetting } from '@/payload-types'

// Helper to get image URL
const getImageUrl = (image: any, fallback: string = '') => {
  if (typeof image === 'object' && image !== null && 'url' in image) return image.url
  return fallback
}

export default async function NavBar() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [header, siteSettings] = await Promise.all([
    payload.findGlobal({
      slug: 'header',
      depth: 0,
    }) as Promise<Header>,
    payload.findGlobal({
      slug: 'site-settings',
      depth: 2,
    }) as Promise<SiteSetting>,
  ])

  // Transform navLinks to match expected type
  const navLinks =
    header?.navLinks?.map((link) => ({
      label: link.label,
      link: link.link,
      isExternal: link.isExternal ?? undefined,
    })) || []

  return (
    <NavBarClient
      logoUrl={getImageUrl(siteSettings?.logo, '/images/logo.png')}
      navLinks={navLinks}
      ctaButton={header?.ctaButton || { text: 'GET IN TOUCH', link: '/contact' }}
    />
  )
}
