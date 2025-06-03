
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Twitter, Linkedin, Facebook, Video, FileText, Lightbulb, Rocket, Users, Star, Eye, Copy } from "lucide-react";

interface TemplateGallerySectionProps {
  onTryTemplate: (templateId: string) => void;
  onGetStarted: () => void;
}

export const TemplateGallerySection = ({ onTryTemplate, onGetStarted }: TemplateGallerySectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 8 },
    { id: 'social-media', name: 'Social Media', count: 4 },
    { id: 'video', name: 'Video Scripts', count: 2 },
    { id: 'educational', name: 'Educational', count: 2 }
  ];

  const templates = [
    {
      id: 'product-launch',
      name: 'Product Launch Announcement',
      category: 'social-media',
      description: 'Create buzz for your new product with platform-optimized launch posts',
      platforms: ['instagram', 'twitter', 'linkedin', 'facebook'],
      exampleContent: {
        instagram: '🚀 Introducing TaskFlow Pro - the productivity app that changes everything!\n\n✨ What makes it special:\n• AI-powered task prioritization\n• Seamless team collaboration\n• 50% faster project completion\n\nAvailable March 15th. Ready to 10x your productivity?\n\n👆 Link in bio for early access\n\n#ProductLaunch #Productivity #AI #TaskFlow',
        linkedin: '🚀 Excited to announce the launch of TaskFlow Pro!\n\nAfter 2 years of development and feedback from 1000+ beta users, we\'re ready to transform how teams manage projects.\n\nKey features:\n→ AI-powered task prioritization\n→ Real-time collaboration tools\n→ Advanced analytics dashboard\n\nEarly bird pricing available until March 20th.\n\n#ProductLaunch #B2B #Productivity',
        twitter: '🚀 TaskFlow Pro is here!\n\nThe productivity app that actually works:\n• AI task prioritization\n• Team collaboration\n• 50% faster completion\n\nLaunching March 15th 🎯\n\nRT if you\'re ready to level up! 👇\n\n#ProductLaunch #Productivity'
      },
      icon: Rocket,
      color: 'from-blue-500 to-purple-600',
      popularity: 95
    },
    {
      id: 'educational-tutorial',
      name: 'Educational Tutorial',
      category: 'educational',
      description: 'Share knowledge with step-by-step tutorials that engage and educate',
      platforms: ['instagram', 'linkedin', 'youtube'],
      exampleContent: {
        instagram: '📚 Tutorial: How to Master Social Media Analytics\n\nStep-by-step guide:\n\n1️⃣ Set up tracking pixels\n2️⃣ Define key metrics (CTR, engagement, conversions)\n3️⃣ Use native analytics tools\n4️⃣ Create weekly reports\n5️⃣ A/B test everything\n\n💡 Pro tip: Focus on metrics that drive business results, not vanity metrics\n\nSave this post! 🔖\n\n#SocialMediaTips #Analytics #DigitalMarketing',
        linkedin: 'How to Master Social Media Analytics in 5 Steps\n\nMany businesses track the wrong metrics. Here\'s what actually matters:\n\n1. Set up proper tracking\n→ Install pixels on all platforms\n→ Connect Google Analytics\n→ Use UTM parameters\n\n2. Focus on business metrics\n→ Lead generation\n→ Conversion rates\n→ Customer acquisition cost\n\n3. Create actionable reports\n→ Weekly performance summaries\n→ Platform comparisons\n→ ROI calculations\n\nWhat metrics do you prioritize? Share below 👇'
      },
      icon: Lightbulb,
      color: 'from-green-500 to-blue-500',
      popularity: 88
    },
    {
      id: 'behind-scenes',
      name: 'Behind the Scenes',
      category: 'social-media',
      description: 'Give your audience an authentic look into your process and culture',
      platforms: ['instagram', 'facebook', 'linkedin'],
      exampleContent: {
        instagram: '👀 Behind the scenes at our design studio\n\nToday Sarah is working on our new mobile app interface. Here\'s what most people don\'t see:\n\n→ 47 iterations before the final design\n→ 3 hours of user testing\n→ Endless coffee and creative debates\n→ The "aha!" moment at 2 PM\n\nThis is why we believe in perfectionism with purpose ❤️\n\n#BehindTheScenes #DesignProcess #TeamWork #Creativity',
        linkedin: 'What 6 months of product development really looks like:\n\n→ 200+ user interviews\n→ 47 design iterations\n→ 12 failed prototypes\n→ Countless late nights\n→ 1 breakthrough moment\n\nBuilding something meaningful takes time. Our team\'s dedication to getting every detail right is what sets us apart.\n\nShoutout to Sarah for leading our design team through this journey! 👏'
      },
      icon: Users,
      color: 'from-pink-500 to-red-500',
      popularity: 82
    },
    {
      id: 'video-script',
      name: 'Video Script Template',
      category: 'video',
      description: 'Engaging video scripts optimized for different platforms and lengths',
      platforms: ['youtube', 'tiktok', 'instagram'],
      exampleContent: {
        youtube: 'HOOK: "The productivity hack that saved me 20 hours per week"\n\n[Scene 1 - Problem]\nHi everyone! I used to work 60-hour weeks and still felt behind.\n\n[Scene 2 - Solution]\nThen I discovered time-blocking, and everything changed.\n\n[Scene 3 - How-to]\nHere\'s exactly how I do it:\n1. Brain dump all tasks\n2. Estimate time for each\n3. Block calendar time\n4. Batch similar activities\n\n[Scene 4 - Results]\nNow I work 40 hours and get twice as much done.\n\n[CTA]\nTry this for one week and let me know how it goes!\n\nWhat\'s your biggest productivity challenge? Comment below! 👇',
        tiktok: 'HOOK: POV: You discover the productivity hack that changes everything\n\n[Quick montage showing chaos vs organized]\n\nThe secret? Time-blocking!\n\n✅ Brain dump everything\n✅ Block time on calendar\n✅ Batch similar tasks\n✅ Protect your blocks\n\nResult: 20 hours saved per week! 🤯\n\nWho else needs to try this? 👀\n\n#productivity #timemanagement #lifehacks'
      },
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      popularity: 91
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'youtube': return <Video className="w-4 h-4" />;
      case 'tiktok': return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(previewTemplate === templateId ? null : templateId);
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900">
          Content Template Gallery
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Browse our AI-optimized templates with real examples. See exactly what you'll get before signing up!
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {templateCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          const isPreviewOpen = previewTemplate === template.id;
          
          return (
            <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{template.popularity}%</span>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                  {template.name}
                </CardTitle>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {template.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Platform Support */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">Platforms:</span>
                  <div className="flex gap-1">
                    {template.platforms.map((platform) => (
                      <div key={platform} className="p-1 rounded bg-gray-100">
                        {getPlatformIcon(platform)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template.id)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isPreviewOpen ? 'Hide Preview' : 'Preview Examples'}
                  </Button>
                  <Button 
                    onClick={() => onTryTemplate(template.id)}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Try Template
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Content Preview */}
                {isPreviewOpen && (
                  <div className="space-y-3 mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900">Example Content:</h4>
                    {Object.entries(template.exampleContent).map(([platform, content]) => (
                      <div key={platform} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(platform)}
                            <span className="text-sm font-medium capitalize">{platform}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyContent(content)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                          {content.length > 200 ? `${content.substring(0, 200)}...` : content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 py-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-900">
          Ready to create content like this?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get access to all templates, unlimited generation, and AI customization. 
          Start creating professional content in minutes, not hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8"
          >
            Start Creating Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn How It Works
          </Button>
        </div>
      </div>
    </div>
  );
};
