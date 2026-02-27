'use client'

import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'
import HeroBlock from './blocks/HeroBlock'
import ServicesBlock from './blocks/ServicesBlock'
import AboutBlock from './blocks/AboutBlock'
import StepsBlock from './blocks/StepsBlock'
import ProjectsCarouselBlock from './blocks/ProjectsCarouselBlock'

const blockComponents = {
  hero: HeroBlock,
  services: ServicesBlock,
  about: AboutBlock,
  steps: StepsBlock,
  projectsCarousel: ProjectsCarouselBlock,
}

export type BlockType = keyof typeof blockComponents

interface RenderBlocksProps {
  blocks: Page['blocks']
}

// Type assertion helper to convert block to component props
function getBlockComponent(block: any) {
  const { blockType, ...props } = block
  return { Component: blockComponents[blockType as BlockType], props }
}

export const RenderBlocks: React.FC<RenderBlocksProps> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const { Component, props } = getBlockComponent(block)

            if (Component) {
              return (
                <div key={index}>
                  <Component {...props} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
