import { ReactNode } from 'react'

interface ServicesCardProps {
  icon: ReactNode
  title: string
  description: string
  cardClassName?: string
  iconClassName?: string
  iconWrapperStyle?: React.CSSProperties
  cardStyle?: React.CSSProperties
  children?: ReactNode
}

export function ServicesCard({
  icon,
  title,
  description,
  cardClassName = '',
  iconClassName = '',
  iconWrapperStyle = {},
  cardStyle = {},
  children,
}: ServicesCardProps) {
  return (
    <div
      className={`flex flex-row items-stretch rounded-2xl relative shadow-lg ${cardClassName}`}
      style={cardStyle}
    >
      <div
        className={`flex items-center justify-center rounded-l-xl w-30 ${iconClassName}`}
        style={iconWrapperStyle}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center px-6 py-4">
        <div className="text-xl font-bold white-text-shadow-hero pb-1">{title}</div>
        <div className="white-text-shadow-hero text-sm">{description}</div>
        {children}
      </div>
    </div>
  )
}
