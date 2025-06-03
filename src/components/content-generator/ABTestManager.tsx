
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TestTube, BarChart3, Target } from 'lucide-react';
import { useABTest } from '@/hooks/useABTest';

interface ABTestManagerProps {
  topic: string;
  platform: string;
  tone: string;
  onVariantSelected?: (variant: any) => void;
}

export const ABTestManager = ({ 
  topic, 
  platform, 
  tone, 
  onVariantSelected 
}: ABTestManagerProps) => {
  const [showResults, setShowResults] = useState(false);
  const {
    activeTest,
    selectedVariant,
    testResults,
    createNewTest,
    analyzeResults,
    getRecommendations
  } = useABTest(topic, platform);

  const handleCreateTest = () => {
    const newTest = createNewTest(tone);
    if (onVariantSelected && newTest.variants[0]) {
      onVariantSelected(newTest.variants[0]);
    }
  };

  const handleAnalyze = () => {
    const results = analyzeResults();
    setShowResults(true);
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-4">
      {/* Active Test Display */}
      {activeTest ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5 text-blue-600" />
              Active A/B Test
              <Badge variant={activeTest.status === 'running' ? 'default' : 'secondary'}>
                {activeTest.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Testing variants for: {activeTest.topic}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTest.variants.map((variant) => (
                  <div key={variant.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{variant.name}</span>
                      {selectedVariant?.id === variant.id && (
                        <Badge variant="outline">Selected</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Template: {variant.metadata.template}</p>
                      <p>Hook: {variant.metadata.hook}</p>
                      <p>CTA: {variant.metadata.cta}</p>
                    </div>
                    {variant.performance && (
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Impressions: {variant.performance.impressions}</p>
                        <p>Engagement: {variant.performance.engagement}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAnalyze} variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze Results
              </Button>
              {testResults && (
                <Button 
                  onClick={() => setShowResults(!showResults)} 
                  variant="outline" 
                  size="sm"
                >
                  {showResults ? 'Hide' : 'Show'} Results
                </Button>
              )}
            </div>

            {/* Test Results */}
            {showResults && testResults && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Test Results</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Winner: <span className="font-medium">{testResults.winner}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm">Confidence:</span>
                    <Progress value={testResults.confidence} className="flex-1" />
                    <span className="text-sm font-medium">{testResults.confidence}%</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <TestTube className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <h3 className="font-medium">No Active A/B Test</h3>
                <p className="text-sm text-gray-600">
                  Create an A/B test to optimize your content performance
                </p>
              </div>
              <Button onClick={handleCreateTest}>
                <Target className="w-4 h-4 mr-2" />
                Start A/B Test
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Optimization Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
