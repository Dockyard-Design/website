'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/Button'
import { useState } from 'react'

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
function handleSmoothScroll(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
) {
  if (href.startsWith('/#')) {
    // Only handle smooth scroll if we're on the home page
    if (pathname !== '/') {
      // Let the default navigation happen - it will go to home page
      return
    }

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative z-50">
      {/* Desktop Navigation - unchanged positioning */}
      <div className="hidden md:block p-20 absolute left-80">
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
                className={
                  isActive(link.link, pathname)
                    ? 'font-bold [text-shadow:0_0_0.5px_white,0_0_0.5px_white]'
                    : 'hover:[text-shadow:0_0_0.5px_white,0_0_0.5px_white]'
                }
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                onClick={(e) => handleSmoothScroll(e, link.link, pathname)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Button className="ml-auto mr-40" variant="glower" size="lg-rounded">
            <Link href={ctaButton.link}>{ctaButton.text}</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - full screen menu */}
      <div className="md:hidden relative">
        <div className="flex items-center justify-between px-6 py-4">
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

          <button
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1.5 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu - Full Screen */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-primary-gradient flex flex-col items-center justify-center z-50">
            <button
              className="absolute top-6 right-6 p-4"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center gap-8 mt-16">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  className={
                    isActive(link.link, pathname)
                      ? 'text-xl font-bold [text-shadow:0_0_0.5px_white,0_0_0.5px_white]'
                      : 'text-xl hover:[text-shadow:0_0_0.5px_white,0_0_0.5px_white]'
                  }
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    handleSmoothScroll(e, link.link, pathname)
                    setIsMenuOpen(false)
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <Button
              className="mt-16 px-8 py-4"
              variant="glower"
              size="lg-rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={ctaButton.link}>{ctaButton.text}</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
