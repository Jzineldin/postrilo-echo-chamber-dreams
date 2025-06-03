
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContentStorage } from "@/hooks/useContentStorage";

export const BatchGenerator = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  const [theme, setTheme] = useState("");
  const [topics, setTopics] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [templateType, setTemplateType] = useState("quote-inspiration");
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateBatchContent = () => {
    if (!theme.trim() || !topics.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the theme and topics."
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate content generation
    setTimeout(() => {
      const topicList = topics.split('\n').filter(t => t.trim());
      const batchContent: string[] = [];
      
      for (let i = 0; i < Math.min(quantity, topicList.length); i++) {
        const topic = topicList[i] || `${theme} Topic ${i + 1}`;
        
        if (templateType === "quote-inspiration") {
          batchContent.push(`💭 "${topic}"\n\n${theme} reminds us that every challenge is an opportunity to grow. Embrace the journey! ✨\n\n#motivation #inspiration #growth`);
        } else if (templateType === "educational-carousel") {
          batchContent.push(`📚 Quick Tip: ${topic}\n\n${theme} - Here's what you need to know:\n\n• Key insight 1\n• Key insight 2\n• Key insight 3\n\nSave this for later! 🔖\n\n#education #tips #learning`);
        } else {
          batchContent.push(`🎯 ${topic}\n\n${theme} - This is an important topic that deserves attention. Let's dive deeper into what makes this significant.\n\n#content #${theme.toLowerCase().replace(/\s+/g, '')}`);
        }
      }
      
      setGeneratedContent(batchContent);
      setIsGenerating(false);
      
      // Save all content
      batchContent.forEach((content, index) => {
        saveContent(
          templateType,
          `Batch ${theme} - ${index + 1}`,
          [content],
          { batchGenerated: true, theme, originalTopics: topics },
          ['batch-generated', theme.toLowerCase()]
        );
      });

      toast({
        title: "Batch Content Generated!",
        description: `Generated ${batchContent.length} pieces of content and saved them.`
      });
    }, 2000);
  };

  const copyAllContent = () => {
    const allContent = generatedContent.join('\n\n---\n\n');
    navigator.clipboard.writeText(allContent);
    toast({
      title: "Content Copied!",
      description: "All generated content has been copied to clipboard."
    });
  };

  const exportContent = () => {
    const content = `Batch Generated Content - ${theme}\n\n${generatedContent.join('\n\n---\n\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_content_${theme.replace(/\s+/g, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-900">Batch Content Generator</h2>
        </div>
        <p className="text-gray-600">Generate multiple pieces of content at once</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Batch Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Content Theme</label>
            <Input
              placeholder="e.g., Productivity, Wellness, Business Tips"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Topics (one per line)</label>
            <Textarea
              placeholder="Time management&#10;Goal setting&#10;Work-life balance&#10;Stress management&#10;Team collaboration"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              rows={5}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Template Type</label>
              <select
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="quote-inspiration">Quote & Inspiration</option>
                <option value="educational-carousel">Educational Carousel</option>
                <option value="community-post">Community Post</option>
                <option value="tutorial-post">Tutorial Post</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <Input
                type="number"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <Button 
            onClick={generateBatchContent} 
            className="w-full" 
            disabled={isGenerating}
            size="lg"
          >
            {isGenerating ? "Generating..." : "Generate Batch Content"}
          </Button>
        </CardContent>
      </Card>

      {generatedContent.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Content</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyAllContent}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
                <Button variant="outline" size="sm" onClick={exportContent}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedContent.map((content, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">Post {index + 1}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(content)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">
                    {content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
