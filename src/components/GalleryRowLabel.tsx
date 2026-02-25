'use client'

import React from 'react'

interface GalleryRowLabelProps {
  data?: {
    image?: {
      filename?: string
      alt?: string
    }
    alt?: string
  }
}

export const GalleryRowLabel: React.FC<GalleryRowLabelProps> = ({ data }) => {
  if (!data?.image) {
    return <span style={{ color: '#888' }}>📷 Select an image...</span>
  }

  const filename = data.image.filename || 'Unnamed image'
  const hasAlt = data.alt || data.image.alt

  return (
    <span>
      📷 {filename}
      {hasAlt && <span style={{ color: '#4ade80', marginLeft: '8px' }}>✓</span>}
    </span>
  )
}
