
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hash, X } from "lucide-react";

interface PreferredHashtagsCardProps {
  hashtags: string[];
  setHashtags: (hashtags: string[]) => void;
  newHashtag: string;
  setNewHashtag: (hashtag: string) => void;
}

export const PreferredHashtagsCard = ({ 
  hashtags, 
  setHashtags, 
  newHashtag, 
  setNewHashtag 
}: PreferredHashtagsCardProps) => {
  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag.startsWith('#') ? newHashtag : `#${newHashtag}`]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (hashtagToRemove: string) => {
    setHashtags(hashtags.filter(hashtag => hashtag !== hashtagToRemove));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5" />
          Preferred Hashtags
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add hashtags that represent your brand and will be suggested in content
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newHashtag}
            onChange={(e) => setNewHashtag(e.target.value)}
            placeholder="Add a hashtag (e.g., #innovation)"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
          />
          <Button type="button" onClick={addHashtag} variant="outline">
            Add
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {hashtags.map((hashtag, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {hashtag}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => removeHashtag(hashtag)}
              />
            </Badge>
          ))}
        </div>
        
        <p className="text-sm text-gray-600">
          These hashtags will be suggested when generating content for better reach and branding
        </p>
      </CardContent>
    </Card>
  );
};
