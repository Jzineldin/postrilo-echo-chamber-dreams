
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  ThumbsUp, 
  Eye,
  TrendingUp,
  Zap,
  Clock
} from "lucide-react";

interface InteractiveFeedbackProps {
  className?: string;
}

export const InteractiveFeedback = ({ className = "" }: InteractiveFeedbackProps) => {
  const [likeCount, setLikeCount] = useState(847);
  const [isLiked, setIsLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(23);
  const [shareCount, setShareCount] = useState(156);
  const [viewCount, setViewCount] = useState(2340);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 600);
  };

  const handleComment = () => {
    setCommentCount(prev => prev + 1);
  };

  const handleShare = () => {
    setShareCount(prev => prev + 1);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Live Engagement Simulator */}
      <Card className="bg-white/95 backdrop-blur-sm border-white/20 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Preview
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span className="tabular-nums">{viewCount.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-800 leading-relaxed">
              ✨ The secret to productivity isn't working harder—it's working smarter!
              <br />
              <br />
              🎯 Here's my 3-step system that transformed my daily routine...
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-600 hover:text-red-500'
                  } ${showAnimation ? 'scale-110' : ''}`}
                >
                  <Heart className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="tabular-nums font-medium">{likeCount}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleComment}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="tabular-nums font-medium">{commentCount}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="tabular-nums font-medium">{shareCount}</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+12% engagement</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Heart, label: "Avg. Likes", value: "847", change: "+15%" },
          { icon: MessageCircle, label: "Comments", value: "23", change: "+8%" },
          { icon: Share2, label: "Shares", value: "156", change: "+22%" },
          { icon: Clock, label: "Engagement Rate", value: "4.2%", change: "+18%" }
        ].map((metric, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/30 p-3 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <metric.icon className="w-4 h-4 text-purple-600" />
              <span className="text-xs text-gray-600 font-medium">{metric.label}</span>
            </div>
            <div className="space-y-1">
              <div className="text-lg font-bold text-gray-900">{metric.value}</div>
              <div className="text-xs text-green-600 font-medium">{metric.change}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
