
import React, { memo } from 'react';
import { LazyComponentBoundary } from './LazyComponentBoundary';

interface PerformantSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  enableLazyLoading?: boolean;
  enableMemoization?: boolean;
  backgroundGradient?: string;
  fallback?: React.ReactNode;
}

const SectionContent = memo(({ 
  children, 
  id, 
  className, 
  backgroundGradient 
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  backgroundGradient?: string;
}) => {
  return (
    <section id={id} className={`relative ${className || ''}`}>
      {backgroundGradient && (
        <div 
          className={`absolute inset-0 -z-10 ${backgroundGradient}`}
          style={{ willChange: 'transform' }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
});

SectionContent.displayName = 'SectionContent';

export const PerformantSection = ({
  children,
  id,
  className,
  enableLazyLoading = true,
  enableMemoization = true,
  backgroundGradient,
  fallback
}: PerformantSectionProps) => {
  const content = enableMemoization ? (
    <SectionContent 
      id={id}
      className={className}
      backgroundGradient={backgroundGradient}
    >
      {children}
    </SectionContent>
  ) : (
    <section id={id} className={`relative ${className || ''}`}>
      {backgroundGradient && (
        <div 
          className={`absolute inset-0 -z-10 ${backgroundGradient}`}
          style={{ willChange: 'transform' }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );

  if (enableLazyLoading) {
    return (
      <LazyComponentBoundary fallback={fallback}>
        {content}
      </LazyComponentBoundary>
    );
  }

  return content;
};
