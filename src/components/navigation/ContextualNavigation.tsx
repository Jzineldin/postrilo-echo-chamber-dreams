
import React from 'react'
import { ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'

interface ContextualNavigationProps {
  title?: string
  onBack?: () => void
  onClose?: () => void
  breadcrumbItems?: Array<{
    label: string
    href?: string
    current?: boolean
  }>
  onBreadcrumbNavigate?: (href: string) => void
  showBreadcrumbs?: boolean
  className?: string
}

export const ContextualNavigation = ({
  title,
  onBack,
  onClose,
  breadcrumbItems = [],
  onBreadcrumbNavigate,
  showBreadcrumbs = true,
  className = ''
}: ContextualNavigationProps) => {
  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            <div className="flex flex-col gap-2">
              {title && (
                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              )}
              
              {showBreadcrumbs && breadcrumbItems.length > 0 && (
                <BreadcrumbNavigation
                  items={breadcrumbItems}
                  onNavigate={onBreadcrumbNavigate}
                  showHome={true}
                />
              )}
            </div>
          </div>
          
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
