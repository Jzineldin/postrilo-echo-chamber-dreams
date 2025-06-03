
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Star } from 'lucide-react';

interface VideoTestimonialProps {
  name: string;
  title: string;
  company: string;
  videoUrl: string;
  thumbnailUrl: string;
  quote: string;
  metrics?: string;
  rating: number;
}

export const VideoTestimonial = ({
  name,
  title,
  company,
  videoUrl,
  thumbnailUrl,
  quote,
  metrics,
  rating
}: VideoTestimonialProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video bg-gray-100">
        {!isPlaying ? (
          <div 
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <img 
              src={thumbnailUrl} 
              alt={`${name} testimonial`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <Button 
              size="lg"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 bg-white/90 hover:bg-white text-purple-600"
            >
              <Play className="w-6 h-6 ml-1" />
            </Button>
          </div>
        ) : (
          <video 
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full"
          />
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        <blockquote className="text-gray-700 mb-4 italic">
          "{quote}"
        </blockquote>
        
        {metrics && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-green-800 font-semibold text-sm">📈 {metrics}</p>
          </div>
        )}
        
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{title} at {company}</p>
        </div>
      </CardContent>
    </Card>
  );
};
