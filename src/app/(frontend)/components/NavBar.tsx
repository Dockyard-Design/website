'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/Button'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
]

function isActive(href: string, pathname: string) {
  if (href.startsWith('#')) {
    return pathname === '/' && window.location.hash.substring(1) === href.substring(2)
  }
  return pathname === href
}

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="p-20 absolute left-80 z-1">
      <div className="flex items-center justify-between gap-20">
        <div className="">
          <Link href="/" className="outline-none">
            <Image
              src="/images/logo.png"
              alt="Dockyard Logo"
              width={250}
              height={100}
              className="object-contain w-auto h-auto"
            />
          </Link>
        </div>
        <div className="tracking-widest flex gap-8 pl-40 pr-40 text-lg font-light">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href, pathname) ? 'font-bold' : 'hover:font-semibold'}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button className="ml-auto mr-40" variant="glower" size="lg-rounded">
          <Link href="/contact">GET IN TOUCH</Link>
        </Button>
      </div>
    </nav>
  )
}
