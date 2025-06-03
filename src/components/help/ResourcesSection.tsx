
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, BookOpen, Calendar, Image, FileText } from "lucide-react";

export const ResourcesSection = () => {
  const blogArticles = [
    {
      title: "10 Social Media Best Practices for 2024",
      description: "Learn the latest strategies to boost engagement and grow your audience",
      readTime: "5 min read",
      category: "Strategy"
    },
    {
      title: "How to Create a Consistent Brand Voice",
      description: "Step-by-step guide to developing and maintaining your brand's personality",
      readTime: "8 min read",
      category: "Branding"
    },
    {
      title: "The Ultimate Guide to Social Media Analytics",
      description: "Understanding metrics that matter and how to improve your performance",
      readTime: "12 min read",
      category: "Analytics"
    },
    {
      title: "Content Scheduling: Best Times to Post",
      description: "Platform-specific insights on when your audience is most active",
      readTime: "6 min read",
      category: "Timing"
    }
  ];

  const downloadableResources = [
    {
      title: "Social Media Content Calendar Template",
      description: "Excel template to plan and organize your content for the entire month",
      type: "Excel File",
      icon: Calendar
    },
    {
      title: "Instagram Image Size Guide",
      description: "Complete guide with all the optimal dimensions for Instagram posts",
      type: "PDF Guide",
      icon: Image
    },
    {
      title: "LinkedIn Content Best Practices",
      description: "Checklist for creating professional content that performs well",
      type: "PDF Checklist",
      icon: FileText
    },
    {
      title: "Twitter/X Engagement Strategies",
      description: "Proven tactics to increase your reach and engagement on Twitter/X",
      type: "PDF Guide",
      icon: FileText
    }
  ];

  const platformGuides = [
    {
      platform: "Instagram",
      sizes: [
        { type: "Feed Post", dimensions: "1080 x 1080 px" },
        { type: "Story", dimensions: "1080 x 1920 px" },
        { type: "Reel", dimensions: "1080 x 1920 px" },
        { type: "IGTV Cover", dimensions: "1080 x 1350 px" }
      ]
    },
    {
      platform: "Facebook",
      sizes: [
        { type: "Feed Post", dimensions: "1200 x 630 px" },
        { type: "Story", dimensions: "1080 x 1920 px" },
        { type: "Cover Photo", dimensions: "820 x 312 px" },
        { type: "Event Cover", dimensions: "1920 x 1080 px" }
      ]
    },
    {
      platform: "Twitter/X",
      sizes: [
        { type: "Tweet Image", dimensions: "1200 x 675 px" },
        { type: "Header", dimensions: "1500 x 500 px" },
        { type: "Profile Photo", dimensions: "400 x 400 px" }
      ]
    },
    {
      platform: "LinkedIn",
      sizes: [
        { type: "Post Image", dimensions: "1200 x 627 px" },
        { type: "Cover Photo", dimensions: "1584 x 396 px" },
        { type: "Company Logo", dimensions: "300 x 300 px" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Blog Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Blog Articles & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {blogArticles.map((article, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                <h4 className="font-semibold mb-2">{article.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  Read Article <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Downloadable Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Downloadable Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downloadableResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{resource.title}</h4>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                      <Badge variant="outline" className="mt-1">{resource.type}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Platform Size Guides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Platform-Specific Image Size Guides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {platformGuides.map((platform, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-lg">{platform.platform}</h4>
                <div className="space-y-2">
                  {platform.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{size.type}</span>
                      <span className="text-sm text-gray-600 font-mono">{size.dimensions}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
