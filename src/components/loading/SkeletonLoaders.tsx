
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export const HeroSectionSkeleton = () => (
  <div className="relative min-h-screen flex items-center">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 -z-10" />
    <div className="w-full max-w-7xl mx-auto px-4 space-y-8 text-center">
      <Skeleton className="h-4 w-48 mx-auto" />
      <div className="space-y-4 max-w-5xl mx-auto">
        <Skeleton className="h-16 w-full max-w-4xl mx-auto" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="h-10 w-20 mx-auto" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        ))}
      </div>
      <div className="space-y-3 max-w-lg mx-auto">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-8 w-32 mx-auto" />
      </div>
    </div>
  </div>
);

export const FeatureSectionSkeleton = () => (
  <div className="py-16 space-y-12">
    <div className="text-center space-y-4">
      <Skeleton className="h-8 w-64 mx-auto" />
      <Skeleton className="h-5 w-96 mx-auto" />
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-12 w-12" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const TemplateGallerySkeleton = () => (
  <div className="space-y-8">
    <div className="text-center space-y-2">
      <Skeleton className="h-8 w-64 mx-auto" />
      <Skeleton className="h-5 w-80 mx-auto" />
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="group cursor-pointer">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const DemoSectionSkeleton = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <Skeleton className="h-8 w-72 mx-auto" />
      <Skeleton className="h-5 w-96 mx-auto" />
    </div>
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center p-3 bg-gray-50 rounded-lg">
              <Skeleton className="h-6 w-6 mx-auto mb-2" />
              <Skeleton className="h-4 w-16 mx-auto mb-1" />
              <Skeleton className="h-3 w-20 mx-auto" />
            </div>
          ))}
        </div>
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  </div>
);
