
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { ContentFormData, GeneratedContentResult } from '@/types/contentGeneration';
import { StandardizedAIError } from '@/services/ai/standardizedErrorHandling';
import { OptimizedContentGenerationService } from '@/services/optimizedContentGeneration';
import { MobileContentForm } from '@/components/mobile/MobileContentForm';
import { UnifiedContentGeneratorCore } from './UnifiedContentGeneratorCore';
import { AIProviderConfig } from '@/components/ai/AIProviderConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Settings, BarChart3 } from 'lucide-react';
import { APP_CONFIG } from '@/config/app';

interface OptimizedContentGeneratorProps {
  canGenerateMore?: boolean;
  postsRemaining?: number;
}

export const OptimizedContentGenerator = ({
  canGenerateMore = true,
  postsRemaining = APP_CONFIG.defaultPostLimit
}: OptimizedContentGeneratorProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentResult | null>(null);
  const [generationError, setGenerationError] = useState<StandardizedAIError | null>(null);
  const [generationMetrics, setGenerationMetrics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('generate');

  const handleGenerate = async (formData: ContentFormData) => {
    setIsGenerating(true);
    setGeneratedContent(null);
    setGenerationError(null);
    setGenerationMetrics(null);

    try {
      const result = await OptimizedContentGenerationService.generateWithOptimizations(
        formData,
        (stage, progress) => {
          console.log(`Generation progress: ${stage} - ${progress}%`);
        }
      );

      setGeneratedContent(result.content);
      setGenerationMetrics(result.metrics);

      if (result.warnings.length > 0) {
        toast({
          title: "Content Generated",
          description: `Generated successfully with ${result.warnings.length} warnings`,
          variant: "default"
        });
      } else {
        toast({
          title: "Content Generated",
          description: `Generated in ${result.metrics.duration}ms`,
        });
      }
    } catch (error) {
      const standardizedError = error as StandardizedAIError;
      setGenerationError(standardizedError);
      toast({
        title: "Generation Failed",
        description: standardizedError.userFriendlyMessage,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent?.content) {
      navigator.clipboard.writeText(generatedContent.content);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    }
  };

  if (isMobile) {
    return (
      <div className="space-y-4">
        <MobileContentForm
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          canGenerateMore={canGenerateMore}
          postsRemaining={postsRemaining}
        />
        
        {generatedContent && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Generated Content</span>
                <Button onClick={handleCopy} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="whitespace-pre-wrap text-gray-800">
                  {generatedContent.content}
                </div>
              </div>
              
              {generationMetrics && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {generationMetrics.duration}ms
                  </Badge>
                  {generationMetrics.cacheHit && (
                    <Badge variant="outline">Cached</Badge>
                  )}
                  {generationMetrics.fallbackUsed && (
                    <Badge variant="outline">Fallback</Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <UnifiedContentGeneratorCore
            canGenerateMore={canGenerateMore}
            postsRemaining={postsRemaining}
            onContentGenerated={setGeneratedContent}
            onGenerationError={setGenerationError}
          />
        </TabsContent>

        <TabsContent value="settings">
          <AIProviderConfig />
        </TabsContent>

        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {generationMetrics ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {generationMetrics.duration}ms
                      </div>
                      <div className="text-sm text-gray-600">Generation Time</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {generationMetrics.retryCount}
                      </div>
                      <div className="text-sm text-gray-600">Retries</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {generationMetrics.cacheHit && (
                      <Badge variant="outline">Cache Hit</Badge>
                    )}
                    {generationMetrics.fallbackUsed && (
                      <Badge variant="outline">Fallback Used</Badge>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Generate content to see metrics</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
