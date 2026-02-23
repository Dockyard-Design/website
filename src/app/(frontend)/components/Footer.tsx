import Image from 'next/image'
import { Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const email = 'hello@dockyard.design'

  return (
    <footer className="w-full flex relative z-50 flex-shrink-0 min-h-[400px] footer-top-glow pt-7">
      <Image
        src="/images/anchor-footer.png"
        alt="Anchor"
        width={375}
        height={375}
        className="pl-1 object-contain absolute opacity-50 z-0"
      />
      <div className="flex w-full items-center px-64 pb-32 relative z-10 text-lg">
        <div className="flex-col flex gap-2">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/#about" className="hover:underline">
            About
          </a>
          <a href="/#services" className="hover:underline">
            Services
          </a>
          <a href="/projects" className="hover:underline">
            Projects
          </a>
        </div>
        <div className="flex-1 flex flex-col items-center space-y-10">
          <Image
            src="/images/logo.png"
            alt="Dockyard Design Logo"
            width={250}
            height={100}
            className="object-contain"
          />
          <a
            href="mailto:hello@dockyard.design"
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
            <a href="#" aria-label="Facebook" className="hover:text-[#00CDF4] transition-colors">
              <Facebook size={26} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#00CDF4] transition-colors">
              <Instagram size={26} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-[#00CDF4] transition-colors">
              <Youtube size={26} />
            </a>
          </div>
        </div>
        <div className="flex-col flex gap-2 text-lg">
          <a href="#" className="hover:underline">
            Legal
          </a>
          <a href="#" className="hover:underline">
            Policies
          </a>
          <a href="#" className="hover:underline">
            Contact us
          </a>
        </div>
      </div>
    </footer>
  )
}
