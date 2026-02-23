import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'

interface SearchParams {
  page?: string
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const payload = await getPayload({ config })

  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const limit = 3

  const { docs, totalDocs } = await payload.find({
    collection: 'projects',
    depth: 1,
    limit,
    page: currentPage,
  })

  const totalPages = Math.ceil(totalDocs / limit)

  const createPageUrl = (page: number) => {
    return page === 1 ? '/projects' : `/projects?page=${page}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-16 pb-24 overflow-visible">
        {/* Glassmorphism background effect - extended beyond section */}
        <div className="absolute inset-0 overflow-visible pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-[#00CDF4]/10 rounded-full blur-[120px]" />
          <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-[#E45DFF]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-6">
            <span className="text-gradient-hero">OUR PROJECTS</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            A showcase of our work on previous web projects.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-24">
          {docs.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              image={
                (project.meta?.image &&
                typeof project.meta.image === 'object' &&
                'url' in project.meta.image
                  ? project.meta.image.url
                  : null) || '/images/anchor.png'
              }
              title={project.title}
              subtitle={project.hero?.title || project.title}
              description={project.hero?.description || project.summary || ''}
              slug={typeof project.slug === 'string' ? project.slug : undefined}
            />
          ))}
        </div>

        {docs.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No projects found. Check back soon for updates!</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            {/* Previous Button */}
            <Link
              href={createPageUrl(currentPage - 1)}
              className={`p-3 rounded-full border transition-all duration-300 ${
                currentPage > 1
                  ? 'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                  : 'border-gray-700 text-gray-600 cursor-not-allowed pointer-events-none'
              }`}
              aria-disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 px-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={createPageUrl(page)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentPage === page ? 'bg-white text-black' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {page}
                </Link>
              ))}
            </div>

            {/* Next Button */}
            <Link
              href={createPageUrl(currentPage + 1)}
              className={`p-3 rounded-full border transition-all duration-300 ${
                currentPage < totalPages
                  ? 'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                  : 'border-gray-700 text-gray-600 cursor-not-allowed pointer-events-none'
              }`}
              aria-disabled={currentPage >= totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
