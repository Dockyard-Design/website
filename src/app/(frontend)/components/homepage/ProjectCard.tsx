import * as React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export interface ProjectCardProps {
  imageSrc: string
  label: string
  title: string
  link: string
  active?: boolean
}

export function ProjectCard({ imageSrc, label, title, link, active = false }: ProjectCardProps) {
  return (
    <div
      className={`flex flex-col w-full gap-0 m-0 p-0 rounded-2xl shadow-lg border-none overflow-hidden bg-transparent transition-all duration-500 ${active ? 'scale-110 shadow-2xl z-20' : 'scale-95 z-10 white-drop-shadow'}`}
    >
      <div className="relative w-full h-65">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover rounded-t-2xl z-10"
          sizes="100vw"
        />
      </div>
      <div className="flex flex-col items-center overflow-visible px-0 relative">
        {/* Animated pink top border for active card */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ left: '50%', right: '50%', width: 0 }}
              animate={{ left: 0, right: 0, width: '100%' }}
              exit={{ left: '50%', right: '50%', width: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute top-0 h-0.75 bg-[#EB74FE] rounded-t-xl"
              style={{ zIndex: 20 }}
            />
          )}
        </AnimatePresence>
        <div className="inline-flex flex-col items-center bg-projects-gradient rounded-b-xl w-full py-4">
          <span className="uppercase text-md tracking-widest white-text-shadow-hero text-center">
            {label}
          </span>
          <span
            className={`text-xl font-bold text-center ${active ? 'text-gradient-hero' : 'text-white'} mb-4`}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  )
}
