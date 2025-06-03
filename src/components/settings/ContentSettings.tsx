
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Target, Share, Link as LinkIcon, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContentSettings = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState({
    instagram: true,
    facebook: false,
    twitter: true,
    linkedin: false,
    tiktok: false,
    youtube: false
  });

  const [contentGoals, setContentGoals] = useState({
    brandAwareness: true,
    leadGeneration: false,
    engagement: true,
    sales: false,
    education: true,
    entertainment: false
  });

  const [callToActions, setCallToActions] = useState<string[]>([
    'Visit our website',
    'Learn more',
    'Get started today'
  ]);
  const [newCTA, setNewCTA] = useState('');

  const [links, setLinks] = useState<{name: string, url: string}[]>([
    { name: 'Website', url: 'https://example.com' },
    { name: 'Landing Page', url: 'https://example.com/landing' }
  ]);
  const [newLink, setNewLink] = useState({ name: '', url: '' });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Content Settings Updated",
      description: "Your default content settings have been saved successfully."
    });
  };

  const addCTA = () => {
    if (newCTA && !callToActions.includes(newCTA)) {
      setCallToActions([...callToActions, newCTA]);
      setNewCTA('');
    }
  };

  const removeCTA = (ctaToRemove: string) => {
    setCallToActions(callToActions.filter(cta => cta !== ctaToRemove));
  };

  const addLink = () => {
    if (newLink.name && newLink.url) {
      setLinks([...links, newLink]);
      setNewLink({ name: '', url: '' });
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Preferred Platforms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="w-5 h-5" />
              Preferred Platforms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(platforms).map(([platform, checked]) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform}
                    checked={checked}
                    onCheckedChange={(checked) => 
                      setPlatforms({...platforms, [platform]: checked as boolean})
                    }
                  />
                  <Label htmlFor={platform} className="capitalize">
                    {platform === 'tiktok' ? 'TikTok' : platform === 'youtube' ? 'YouTube' : platform}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Select the platforms where you primarily publish content
            </p>
          </CardContent>
        </Card>

        {/* Default Content Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Default Content Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(contentGoals).map(([goal, checked]) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={checked}
                    onCheckedChange={(checked) => 
                      setContentGoals({...contentGoals, [goal]: checked as boolean})
                    }
                  />
                  <Label htmlFor={goal} className="capitalize">
                    {goal.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              These goals will be used as defaults when creating new content
            </p>
          </CardContent>
        </Card>

        {/* Standard Call-to-Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Standard Call-to-Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newCTA}
                onChange={(e) => setNewCTA(e.target.value)}
                placeholder="Add a call-to-action"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCTA())}
              />
              <Button type="button" onClick={addCTA} variant="outline">
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {callToActions.map((cta, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {cta}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeCTA(cta)}
                  />
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-gray-600">
              These CTAs will be suggested when creating content
            </p>
          </CardContent>
        </Card>

        {/* Links to Include */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Links to Include
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newLink.name}
                onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                placeholder="Link name"
                className="flex-1"
              />
              <Input
                value={newLink.url}
                onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                placeholder="URL"
                className="flex-1"
              />
              <Button type="button" onClick={addLink} variant="outline">
                Add
              </Button>
            </div>
            
            <div className="space-y-2">
              {links.map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{link.name}</p>
                    <p className="text-sm text-gray-600">{link.url}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-600">
              These links will be readily available when creating content
            </p>
          </CardContent>
        </Card>

        <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Save Content Settings
        </Button>
      </form>
    </div>
  );
};
