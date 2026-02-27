'use client'

import Image from 'next/image'
import { BarChart3 } from 'lucide-react'
import { ServicesCard } from '../homepage/ServicesCard'
import type { ServicesBlock } from '@/payload-types'

export default function ServicesBlock({
  sectionTitle,
  featuredService,
  subtitle,
  description,
  services,
}: ServicesBlock) {
  // Helper to get image URL
  const getImageUrl = (image: any) => {
    if (typeof image === 'string') return image
    return image?.url || ''
  }

  // Helper to render rich text with inline formatting
  const renderRichText = (richText: any) => {
    if (!richText || !richText.root) return null

    return richText.root.children?.map((paragraph: any, pIndex: number) => {
      if (paragraph.type !== 'paragraph') return null

      const elements = paragraph.children?.map((child: any, cIndex: number) => {
        const key = `${pIndex}-${cIndex}`

        if (child.type === 'text') {
          let className = ''

          // Apply formatting based on child.format
          if (child.format === 1) {
            // Bold
            className = 'font-bold'
          }

          // Check for special styling markers in the text
          const text = child.text || ''

          // For Services title, apply special styling
          if (text === 'UNIQUE') {
            return (
              <span key={key} className="text-services bg-[#00CDF4] text-black px-1">
                {text}
              </span>
            )
          }
          if (text === 'YOUR BUSINESS') {
            return (
              <span key={key} className="text-services bg-[#E45DFF] text-black px-1">
                {text}
              </span>
            )
          }

          // For "We can help!" styling
          if (text.includes('We can help')) {
            return (
              <span key={key} className={`${className} font-bold text-[#00CDF4]`}>
                {text}
              </span>
            )
          }

          return (
            <span key={key} className={className}>
              {text}
            </span>
          )
        }

        return null
      })

      return <span key={pIndex}>{elements}</span>
    })
  }

  // Helper to get icon for a service
  const getServiceIcon = (service: any, index: number) => {
    // Check if there's an uploaded icon
    if (service.icon) {
      return (
        <Image
          src={getImageUrl(service.icon)}
          alt={service.title}
          width={96}
          height={96}
          className="text-white"
          priority
        />
      )
    }

    // Check for Google Analytics by title
    if (service.title === 'Google Analytics') {
      return <BarChart3 size={86} className="text-white" />
    }

    return null
  }

  return (
    <div className="w-full mt-22 flex justify-center items-center flex-col pb-16">
      <h1 className="text-2xl font-bold white-text-shadow-hero">{renderRichText(sectionTitle)}</h1>

      <div className="border-brand-gradient max-w-xl mx-auto mt-16 z-1">
        <div className="bg-brand-gradient-dark rounded-xl">
          <div className="white-text-shadow-hero p-6 flex flex-col text-center">
            <h1 className="font-bold text-2xl">{featuredService?.title}</h1>
            <span className="font-semibold pt-2">{featuredService?.description}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-20">
        <h2 className="text-center text-3xl font-semibold tracking-wide text-gradient">
          {renderRichText(subtitle)}
        </h2>
        <h6 className="text-center text-md font-medium mb-16 white-text-shadow-hero max-w-xl mx-auto pt-8">
          {renderRichText(description)}
        </h6>

        <div className="flex flex-row justify-center gap-12 mb-12">
          {services?.slice(0, 2).map((service, index) => (
            <ServicesCard
              key={index}
              icon={getServiceIcon(service, index)}
              title={service.title}
              description={service.description}
              cardClassName={`bg-services-gradient-card border border-[${service.cardColor}]/50 w-109 h-28`}
              iconClassName={`bg-gradient-to-t from-[${service.iconGradientStart}] to-[${service.iconGradientEnd}]`}
              iconWrapperStyle={{ boxShadow: `0px 0px 12px ${service.cardColor}` }}
              cardStyle={{
                boxShadow: `14px 14px 18px 1px #000, 0px 0px 18px 1px ${service.cardColor}`,
              }}
            />
          ))}
        </div>

        {services && services.length > 2 && (
          <div className="flex justify-center mt-12">
            <ServicesCard
              icon={getServiceIcon(services[2], 2)}
              title={services[2].title}
              description={services[2].description}
              cardClassName={`bg-services-gradient-card border border-[${services[2].cardColor}]/50 w-109 h-28`}
              iconClassName={`bg-gradient-to-t from-[${services[2].iconGradientStart}] to-[${services[2].iconGradientEnd}]`}
              iconWrapperStyle={{ boxShadow: `0px 0px 12px ${services[2].cardColor}` }}
              cardStyle={{
                boxShadow: `14px 14px 18px 1px #000, 0px 0px 18px 1px ${services[2].cardColor}`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
