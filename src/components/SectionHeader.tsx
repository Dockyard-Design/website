'use client'

import React from 'react'

interface SectionHeaderProps {
  label?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label }) => {
  const sectionData: Record<string, { color: string; number: number }> = {
    'Section 1: The Brief': { color: '#009DFF', number: 1 },
    'Section 2: Prototyping': { color: '#FFAA21', number: 2 },
    'Section 3: Build': { color: '#85E115', number: 3 },
    'Section 4: Feedback': { color: '#FF21E9', number: 4 },
  }

  const data = sectionData[label || '']
  const borderColor = data?.color || '#666'
  const number = data?.number || 0

  return (
    <div
      style={{
        marginTop: '3rem',
        marginBottom: '1.5rem',
        padding: '1.5rem 2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderLeft: `6px solid ${borderColor}`,
        borderRadius: '0 12px 12px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {/* Large Section Number */}
      <span
        style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          color: borderColor,
          opacity: 0.15,
          lineHeight: 1,
        }}
      >
        {number}
      </span>

      {/* Section Title */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: '1.4rem',
            fontWeight: 700,
            color: borderColor,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label?.replace('Section ' + number + ': ', '')}
        </h2>
        <p
          style={{
            margin: '0.25rem 0 0 0',
            fontSize: '0.85rem',
            color: '#888',
            letterSpacing: '0.02em',
          }}
        >
          Step {number} of 4
        </p>
      </div>
    </div>
  )
}
