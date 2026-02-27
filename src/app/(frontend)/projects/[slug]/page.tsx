import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import type { Media, Project } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface GalleryItem {
  image: number | Media
  alt?: string | null
  id?: string | null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return docs.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await queryProjectBySlug({ slug })

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const metaTitle = project.meta?.title || project.title
  const metaDescription = project.meta?.description || project.summary

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
    },
  }
}

function SectionGallery({
  gallery,
  sectionKey,
}: {
  gallery: GalleryItem[] | null | undefined
  sectionKey: string
}) {
  if (!gallery || gallery.length === 0) return null

  const validImages = gallery
    .filter((item) => typeof item.image === 'object' && item.image !== null)
    .slice(0, 4)

  if (validImages.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-4 w-[400px]">
      {validImages.map((item, index) => {
        const image = item.image as Media

        return (
          <div
            key={item.id || `${sectionKey}-${index}`}
            className="relative w-48 h-48 overflow-hidden rounded-2xl"
          >
            <Image
              src={getMediaUrl(image, 'card')}
              alt={item.alt || image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover"
              sizes="192px"
              loading="lazy"
            />
          </div>
        )
      })}
    </div>
  )
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await queryProjectBySlug({ slug })

  if (!project) {
    notFound()
  }

  const { isEnabled: draft } = await draftMode()
  const hero = project.hero
  const heroImage = hero?.image as Media | undefined
  const heroTitle = hero?.title || project.title

  const sections = [
    {
      key: 'theBrief',
      title: 'The Brief',
      content: project.theBrief,
      gallery: project.theBriefGallery,
    },
    {
      key: 'prototyping',
      title: 'Prototyping',
      content: project.prototyping,
      gallery: project.prototypingGallery,
    },
    {
      key: 'build',
      title: 'Build',
      content: project.build,
      gallery: project.buildGallery,
    },
    {
      key: 'feedback',
      title: 'Feedback',
      content: project.feedback,
      gallery: project.feedbackGallery,
    },
  ].filter((section) => section.content || (section.gallery && section.gallery.length > 0))

  return (
    <article className="min-h-screen pt-50">
      {draft && <RefreshRouteOnSave />}

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-visible">
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Text Side */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="space-y-6">
                {/* Label */}
                <p className="text-xs font-medium tracking-[0.2em] text-gray-500 uppercase">
                  Project Details
                </p>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {heroTitle}
                </h1>

                {/* Description */}
                {hero?.description && (
                  <p className="text-lg text-gray-400 leading-relaxed">{hero.description}</p>
                )}

                {/* CTA */}
                <a
                  href="#content"
                  className="inline-flex items-center gap-2 text-white hover:text-[#00CDF4] transition-colors duration-300 group"
                >
                  <span>Read the full case study</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Image Side */}
            {heroImage && heroImage.url && (
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={getMediaUrl(heroImage, 'hero')}
                    alt={heroImage.alt || heroTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Content */}
      <div id="content">
        {sections.map((section, index) => {
          const sectionNumber = index + 1
          const shouldUseGradient = section.key === 'theBrief' || section.key === 'build'
          const numberColors = ['#009DFF', '#FFAA21', '#85E115', '#FF21E9']
          const numberColor = numberColors[index] || '#ffffff'

          return (
            <section
              key={section.key}
              className={`${shouldUseGradient ? 'bg-steps-gradient' : ''}`}
            >
              <span
                className="text-[200px] font-bold leading-none"
                style={{ color: numberColor, opacity: 0.15 }}
              >
                {sectionNumber}
              </span>
              <h2>{section.title}</h2>
              {section.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: convertLexicalToHTML({
                      data: section.content,
                    }),
                  }}
                />
              )}
              <SectionGallery gallery={section.gallery} sectionKey={section.key} />
            </section>
          )
        })}

        {sections.length === 0 && <div>No detailed content available for this project.</div>}
      </div>

      {/* Next Project CTA */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105"
          >
            <span>View More Projects</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </article>
  )
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
