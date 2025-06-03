
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEnhancedMobile } from './EnhancedMobileOptimizations';
import { Smartphone, Tablet, Monitor, CheckCircle, AlertCircle } from 'lucide-react';

interface TestResult {
  test: string;
  passed: boolean;
  message: string;
}

export const MobileResponsiveTestSuite = () => {
  const { isMobile, touchDevice, screenSize, isExtraSmall, isSmall } = useEnhancedMobile();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runResponsiveTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // Test 1: Touch Target Size
    const buttons = document.querySelectorAll('button, [role="button"], a');
    const touchTargetTest = Array.from(buttons).every(button => {
      const rect = button.getBoundingClientRect();
      return rect.height >= 44 && rect.width >= 44;
    });
    
    results.push({
      test: 'Touch Target Size',
      passed: touchTargetTest,
      message: touchTargetTest ? 'All interactive elements meet 44px minimum size' : 'Some elements are too small for touch'
    });

    // Test 2: Viewport Configuration
    const viewport = document.querySelector('meta[name="viewport"]');
    const viewportTest = viewport && viewport.getAttribute('content')?.includes('width=device-width');
    
    results.push({
      test: 'Viewport Configuration',
      passed: !!viewportTest,
      message: viewportTest ? 'Viewport is properly configured' : 'Viewport meta tag is missing or incorrect'
    });

    // Test 3: Font Size
    const inputs = document.querySelectorAll('input, select, textarea');
    const fontSizeTest = Array.from(inputs).every(input => {
      const styles = window.getComputedStyle(input);
      const fontSize = parseFloat(styles.fontSize);
      return fontSize >= 16;
    });
    
    results.push({
      test: 'Input Font Size',
      passed: fontSizeTest,
      message: fontSizeTest ? 'All inputs have 16px+ font size (prevents zoom on iOS)' : 'Some inputs may cause zoom on iOS'
    });

    // Test 4: Horizontal Scroll
    const horizontalScrollTest = document.documentElement.scrollWidth <= window.innerWidth;
    
    results.push({
      test: 'Horizontal Scroll',
      passed: horizontalScrollTest,
      message: horizontalScrollTest ? 'No horizontal scrolling detected' : 'Horizontal scrolling detected'
    });

    // Test 5: Mobile-specific CSS Classes
    const mobileOptimizedElements = document.querySelectorAll('.mobile-optimized, .touch-friendly, .mobile-button');
    const mobileClassTest = mobileOptimizedElements.length > 0;
    
    results.push({
      test: 'Mobile CSS Classes',
      passed: mobileClassTest,
      message: mobileClassTest ? 'Mobile-specific CSS classes detected' : 'No mobile-specific styling found'
    });

    // Test 6: Safe Area Support
    const safeAreaElements = document.querySelectorAll('[class*="safe-area"]');
    const safeAreaTest = safeAreaElements.length > 0;
    
    results.push({
      test: 'Safe Area Support',
      passed: safeAreaTest,
      message: safeAreaTest ? 'Safe area padding is implemented' : 'No safe area support detected'
    });

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate testing delay
    setTestResults(results);
    setIsRunning(false);
  };

  const getDeviceIcon = () => {
    if (isExtraSmall || isSmall) return <Smartphone className="w-5 h-5" />;
    if (screenSize === 'md') return <Tablet className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  const getScreenSizeBadge = () => {
    const variants = {
      xs: 'destructive',
      sm: 'secondary',
      md: 'default',
      lg: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[screenSize] || 'outline'}>
        {screenSize.toUpperCase()} Screen
      </Badge>
    );
  };

  useEffect(() => {
    // Auto-run tests when component mounts
    runResponsiveTests();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getDeviceIcon()}
          Mobile Responsive Test Suite
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          {getScreenSizeBadge()}
          <Badge variant={isMobile ? 'default' : 'outline'}>
            {isMobile ? 'Mobile' : 'Desktop'} Detected
          </Badge>
          <Badge variant={touchDevice ? 'default' : 'outline'}>
            {touchDevice ? 'Touch' : 'Mouse'} Device
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Running comprehensive mobile responsiveness tests...
          </p>
          <Button 
            onClick={runResponsiveTests} 
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? 'Running...' : 'Run Tests'}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold">Test Results</h4>
            {testResults.map((result, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                {result.passed ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{result.test}</span>
                    <Badge variant={result.passed ? 'default' : 'destructive'} className="text-xs">
                      {result.passed ? 'PASS' : 'FAIL'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{result.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">Device Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Screen Size:</span> {screenSize}
            </div>
            <div>
              <span className="font-medium">Viewport:</span> {window.innerWidth}x{window.innerHeight}
            </div>
            <div>
              <span className="font-medium">Device Type:</span> {isMobile ? 'Mobile' : 'Desktop'}
            </div>
            <div>
              <span className="font-medium">Touch Support:</span> {touchDevice ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
