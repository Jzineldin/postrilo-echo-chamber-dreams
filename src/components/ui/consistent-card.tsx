
import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ConsistentCardProps {
  children: React.ReactNode
  title?: string
  className?: string
  height?: 'auto' | 'fixed' | 'equal'
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

export const ConsistentCard = ({ 
  children, 
  title, 
  className,
  height = 'auto',
  padding = 'md',
  hover = true 
}: ConsistentCardProps) => {
  const heightClasses = {
    auto: '',
    fixed: 'h-64',
    equal: 'h-full'
  }

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }

  return (
    <Card className={cn(
      'bg-white border border-gray-200 shadow-sm',
      heightClasses[height],
      hover && 'hover:shadow-md hover:border-gray-300 transition-all duration-200',
      className
    )}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(
        paddingClasses[padding],
        title ? 'pt-0' : ''
      )}>
        {children}
      </CardContent>
    </Card>
  )
}
