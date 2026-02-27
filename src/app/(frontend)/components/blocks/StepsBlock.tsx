'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { StepsBlock as StepsBlockType } from '@/payload-types'

export default function StepsBlock({ title, steps }: StepsBlockType) {
  // Helper to get image URL
  const getImageUrl = (image: any) => {
    if (typeof image === 'string') return image
    return image?.url || ''
  }

  // Helper to extract plain text from rich text title
  const extractText = (richText: any) => {
    if (!richText || !richText.root) return ''
    let text = ''
    const extract = (node: any) => {
      if (node.children) {
        node.children.forEach((child: any) => {
          if (child.text) text += child.text
          extract(child)
        })
      }
    }
    extract(richText.root)
    return text
  }

  const titleText = extractText(title)

  return (
    <div className="bg-steps-gradient w-full mt-32 py-16 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center white-text-shadow-hero">
        {titleText || (
          <>
            <span className="text-[#00CDF4]">FOUR</span> SIMPLE STEPS TO YOUR{' '}
            <span className="text-[#E45DFF]">GREAT</span> WEBSITE
          </>
        )}
      </h1>

      <div className="mt-12 grid grid-cols-1 grid-rows-2 gap-y-8 gap-x-6 md:grid-cols-4 md:grid-rows-2 md:gap-x-12 md:gap-y-8 w-full max-w-6xl mx-auto">
        {/* Top row: images with animation */}
        {steps?.map((step: any, index: number) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.4 }}
              className="flex items-center justify-center"
            >
              {step.icon && (
                <Image
                  src={getImageUrl(step.icon)}
                  alt={`${step.title} icon`}
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              )}
            </motion.div>
          </React.Fragment>
        ))}

        {/* Bottom row: text with animation */}
        {steps?.map((step: any, index: number) => (
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center max-w-3/4 w-full mx-auto"
          >
            <h2
              className="text-2xl font-extrabold mb-2 tracking-wide white-text-shadow-no-bg"
              style={{ backgroundColor: step.color }}
            >
              {step.title}
            </h2>
            <p className="text-md off-white-text-shadow-steps font-semibold leading-snug">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
