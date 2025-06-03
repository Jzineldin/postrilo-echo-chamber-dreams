
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, Download, ExternalLink, Users, Lightbulb } from 'lucide-react';

export const ResourcesSection = () => {
  const resources = [
    {
      category: "Documentation",
      icon: BookOpen,
      items: [
        {
          title: "User Guide",
          description: "Complete guide to using Postrilo",
          type: "Guide",
          link: "#",
          popular: true
        },
        {
          title: "API Documentation",
          description: "For developers and integrations",
          type: "Technical",
          link: "#",
          popular: false
        },
        {
          title: "Best Practices",
          description: "Tips for effective content creation",
          type: "Guide",
          link: "#",
          popular: true
        }
      ]
    },
    {
      category: "Video Tutorials",
      icon: Video,
      items: [
        {
          title: "Getting Started",
          description: "5-minute introduction to Postrilo",
          type: "Video",
          link: "#",
          popular: true
        },
        {
          title: "Advanced Features",
          description: "Deep dive into pro features",
          type: "Video",
          link: "#",
          popular: false
        },
        {
          title: "Content Strategy",
          description: "Building an effective content plan",
          type: "Webinar",
          link: "#",
          popular: true
        }
      ]
    },
    {
      category: "Downloads",
      icon: Download,
      items: [
        {
          title: "Content Calendar Template",
          description: "Plan your content strategy",
          type: "Template",
          link: "#",
          popular: true
        },
        {
          title: "Social Media Guide",
          description: "Platform-specific best practices",
          type: "PDF",
          link: "#",
          popular: false
        },
        {
          title: "Brand Voice Worksheet",
          description: "Define your brand personality",
          type: "Worksheet",
          link: "#",
          popular: true
        }
      ]
    }
  ];

  const communityResources = [
    {
      title: "Community Forum",
      description: "Connect with other Postrilo users",
      icon: Users,
      link: "#",
      members: "2.4k+"
    },
    {
      title: "Feature Requests",
      description: "Suggest and vote on new features",
      icon: Lightbulb,
      link: "#",
      members: "856"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Resources & Learning</h2>
        <p className="text-gray-600">Everything you need to master content creation with Postrilo</p>
      </div>

      <div className="grid gap-6">
        {resources.map((category, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="w-5 h-5 text-purple-600" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{item.title}</h4>
                        {item.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <Badge variant="outline" className="text-xs mt-1">{item.type}</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <h3 className="text-lg font-semibold md:col-span-2">Community</h3>
        {communityResources.map((resource, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <resource.icon className="w-8 h-8 text-purple-600" />
                <div className="flex-1">
                  <h4 className="font-semibold">{resource.title}</h4>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{resource.members} members</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-purple-900">Need Personalized Help?</h3>
            <p className="text-purple-700">
              Book a one-on-one session with our content experts to optimize your strategy
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Schedule Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
