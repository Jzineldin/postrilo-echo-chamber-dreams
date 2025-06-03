
import React from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  center?: boolean
}

export const ResponsiveContainer = ({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
  center = true
}: ResponsiveContainerProps) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-2 sm:px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12'
  }

  return (
    <div className={cn(
      'w-full',
      maxWidthClasses[maxWidth],
      paddingClasses[padding],
      center && 'mx-auto',
      className
    )}>
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: React.ReactNode
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ResponsiveGrid = ({
  children,
  columns = { default: 1, md: 2, lg: 3 },
  gap = 'md',
  className
}: ResponsiveGridProps) => {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8'
  }

  const gridColsClasses = `grid-cols-${columns.default} ${
    columns.sm ? `sm:grid-cols-${columns.sm}` : ''
  } ${
    columns.md ? `md:grid-cols-${columns.md}` : ''
  } ${
    columns.lg ? `lg:grid-cols-${columns.lg}` : ''
  } ${
    columns.xl ? `xl:grid-cols-${columns.xl}` : ''
  }`

  return (
    <div className={cn(
      'grid',
      gridColsClasses,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}
