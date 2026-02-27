'use client'

import Image from 'next/image'
import { Facebook, Instagram, Youtube } from 'lucide-react'

interface NavLink {
  label: string
  url: string
}

interface SocialLinks {
  facebook?: string
  instagram?: string
  youtube?: string
}

interface FooterClientProps {
  logoUrl: string
  backgroundImageUrl: string
  leftNavLinks: NavLink[]
  rightNavLinks: NavLink[]
  email: string
  socialLinks?: SocialLinks
}

export default function FooterClient({
  logoUrl,
  backgroundImageUrl,
  leftNavLinks,
  rightNavLinks,
  email,
  socialLinks,
}: FooterClientProps) {
  const defaultLeftLinks = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/#about' },
    { label: 'Services', url: '/#services' },
    { label: 'Projects', url: '/projects' },
  ]

  const defaultRightLinks = [
    { label: 'Legal', url: '#' },
    { label: 'Policies', url: '#' },
    { label: 'Contact us', url: '#' },
  ]

  const linksLeft = leftNavLinks.length > 0 ? leftNavLinks : defaultLeftLinks
  const linksRight = rightNavLinks.length > 0 ? rightNavLinks : defaultRightLinks

  return (
    <footer className="w-full flex relative z-50 flex-shrink-0 min-h-[400px] footer-top-glow pt-7">
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt="Anchor"
          width={375}
          height={375}
          className="pl-1 object-contain absolute opacity-50 z-0"
        />
      )}
      <div className="flex w-full items-center px-64 pb-32 relative z-10 text-lg">
        <div className="flex-col flex gap-2">
          {linksLeft.map((link, index) => (
            <a key={index} href={link.url} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center space-y-10">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Dockyard Design Logo"
              width={250}
              height={100}
              className="object-contain"
              priority
            />
          )}

          <a
            href={`mailto:${email}`}
            className="text-white text-xl group inline-flex hover:text-[#00CDF4] transition-colors duration-300"
          >
            {email.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block transition-transform duration-300 ease-in-out group-hover:animate-wave"
                style={{
                  animationDelay: `${index * 50}ms`,
                  display: 'inline-block',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </a>

          <div className="flex gap-4">
            {socialLinks?.facebook && (
              <a
                href={socialLinks.facebook}
                aria-label="Facebook"
                className="hover:text-[#00CDF4] transition-colors"
              >
                <Facebook size={26} />
              </a>
            )}
            {socialLinks?.instagram && (
              <a
                href={socialLinks.instagram}
                aria-label="Instagram"
                className="hover:text-[#00CDF4] transition-colors"
              >
                <Instagram size={26} />
              </a>
            )}
            {socialLinks?.youtube && (
              <a
                href={socialLinks.youtube}
                aria-label="YouTube"
                className="hover:text-[#00CDF4] transition-colors"
              >
                <Youtube size={26} />
              </a>
            )}

            {/* Show placeholder icons if no social links set */}
            {!socialLinks?.facebook && !socialLinks?.instagram && !socialLinks?.youtube && (
              <>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="hover:text-[#00CDF4] transition-colors"
                >
                  <Facebook size={26} />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="hover:text-[#00CDF4] transition-colors"
                >
                  <Instagram size={26} />
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-[#00CDF4] transition-colors">
                  <Youtube size={26} />
                </a>
              </>
            )}
          </div>
        </div>

        <div className="flex-col flex gap-2 text-lg">
          {linksRight.map((link, index) => (
            <a key={index} href={link.url} className="hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
