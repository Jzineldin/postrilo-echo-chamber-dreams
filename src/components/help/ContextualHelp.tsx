
import React, { useState } from 'react'
import { HelpCircle, Book, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface HelpItem {
  title: string
  content: string
  link?: string
}

interface ContextualHelpProps {
  topic: string
  helpItems: HelpItem[]
  tooltip?: string
  position?: 'inline' | 'floating'
}

export const ContextualHelp = ({
  topic,
  helpItems,
  tooltip = "Get help with this feature",
  position = 'inline'
}: ContextualHelpProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const HelpButton = () => (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 w-6 p-0 rounded-full hover:bg-gray-100"
    >
      <HelpCircle className="w-4 h-4 text-gray-500" />
    </Button>
  )

  const HelpContent = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Book className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-gray-900">Help: {topic}</h3>
      </div>
      
      <div className="space-y-3">
        {helpItems.map((item, index) => (
          <div key={index} className="space-y-2">
            <h4 className="font-medium text-gray-800">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.content}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
              >
                Learn more
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  if (position === 'floating') {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <HelpButton />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Help & Documentation</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <HelpContent />
                </div>
              </SheetContent>
            </Sheet>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <HelpCircle className="w-5 h-5" />
          {topic}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <HelpContent />
      </CardContent>
    </Card>
  )
}

export const QuickHelpTooltip = ({ children, content }: { children: React.ReactNode, content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)
