
import React from 'react'
import { BarChart3, FileText, Sparkles, TrendingUp } from 'lucide-react'
import { ConsistentCard } from '@/components/ui/consistent-card'
import { ResponsiveGrid } from '@/components/mobile/ResponsiveContainer'
import { QuickHelpTooltip } from '@/components/help/ContextualHelp'

interface StatsCardProps {
  icon: React.ComponentType<any>
  title: string
  value: string | number
  subtitle?: string
  trend?: string
  helpText?: string
}

const StatsCard = ({ icon: Icon, title, value, subtitle, trend, helpText }: StatsCardProps) => {
  const content = (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {subtitle && (
            <div className="text-sm text-gray-500">{subtitle}</div>
          )}
        </div>
      </div>
      {trend && (
        <div className="text-right">
          <div className="text-sm font-medium text-green-600">{trend}</div>
          <div className="text-xs text-gray-500">vs last month</div>
        </div>
      )}
    </div>
  )

  return (
    <ConsistentCard height="equal" hover={true}>
      {helpText ? (
        <QuickHelpTooltip content={helpText}>
          {content}
        </QuickHelpTooltip>
      ) : content}
    </ConsistentCard>
  )
}

interface EnhancedStatsGridProps {
  stats: {
    contentGenerated: number
    remainingCredits: number
    postsSaved: number
    engagementRate: string
  }
}

export const EnhancedStatsGrid = ({ stats }: EnhancedStatsGridProps) => {
  const statsCards = [
    {
      icon: Sparkles,
      title: "Content Generated",
      value: stats.contentGenerated,
      subtitle: "This month",
      trend: "+12%",
      helpText: "Total number of AI-generated content pieces this month"
    },
    {
      icon: BarChart3,
      title: "Remaining Credits",
      value: stats.remainingCredits,
      subtitle: "Resets monthly",
      helpText: "Your available content generation credits for this billing period"
    },
    {
      icon: FileText,
      title: "Posts Saved",
      value: stats.postsSaved,
      subtitle: "In library",
      trend: "+8%",
      helpText: "Content pieces saved to your content library"
    },
    {
      icon: TrendingUp,
      title: "Engagement Rate",
      value: stats.engagementRate,
      subtitle: "Average",
      trend: "+5.2%",
      helpText: "Average engagement rate across all your published content"
    }
  ]

  return (
    <ResponsiveGrid 
      columns={{ default: 1, sm: 2, lg: 4 }}
      gap="md"
      className="mb-8"
    >
      {statsCards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </ResponsiveGrid>
  )
}
