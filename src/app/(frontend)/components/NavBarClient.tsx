'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/Button'

interface NavLink {
  label: string
  link: string
  isExternal?: boolean
}

interface CtaButton {
  text: string
  link: string
}

interface NavBarClientProps {
  logoUrl: string
  navLinks: NavLink[]
  ctaButton: CtaButton
}

function isActive(href: string, pathname: string) {
  if (href.startsWith('#')) {
    return pathname === '/' && window.location.hash.substring(1) === href.substring(2)
  }
  return pathname === href
}

// Handle smooth scrolling to anchor links
function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith('/#')) {
    e.preventDefault()
    const targetId = href.substring(2) // Remove '/#' to get just the ID
    const element = document.getElementById(targetId)

    if (element) {
      // Calculate offset to account for fixed navbar
      const navbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Update URL hash without jumping
      window.history.pushState(null, '', href)
    }
  }
}

export default function NavBarClient({ logoUrl, navLinks, ctaButton }: NavBarClientProps) {
  const pathname = usePathname()

  return (
    <nav className="p-20 absolute left-80 z-1">
      <div className="flex items-center justify-between gap-20">
        <div className="">
          <Link href="/" className="outline-none">
            <Image
              src={logoUrl}
              alt="Dockyard Logo"
              width={250}
              height={100}
              className="object-contain w-auto h-auto"
              priority
            />
          </Link>
        </div>
        <div className="tracking-widest flex gap-8 pl-40 pr-40 text-lg font-light">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              className={isActive(link.link, pathname) ? 'font-bold' : 'hover:font-semibold'}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleSmoothScroll(e, link.link)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button className="ml-auto mr-40" variant="glower" size="lg-rounded">
          <Link href={ctaButton.link}>{ctaButton.text}</Link>
        </Button>
      </div>
    </nav>
  )
}
