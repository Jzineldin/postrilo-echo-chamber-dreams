import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedFormFields, ContentStyles } from "@/components/EnhancedFormFields";
import { useContentStorage } from "@/hooks/useContentStorage";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Eye, Save, ArrowLeft } from "lucide-react";

export const ProductLaunch = () => {
  const { toast } = useToast();
  const { saveContent } = useContentStorage();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [benefits, setBenefits] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [pricing, setPricing] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [styles, setStyles] = useState<ContentStyles | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const generateContent = () => {
    if (!productName.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the product name and description."
      });
      return;
    }

    const launchContent = [
      `🚀 Introducing ${productName}!\n\n${description}\n\nWe're excited to share something amazing with you!`,
      
      `✨ Key Features\n\n${features || "🔥 Revolutionary design\n💡 Smart functionality\n⚡ Lightning-fast performance\n🛡️ Enterprise-grade security"}`,
      
      `🎯 Why You'll Love It\n\n${benefits || "Save time and increase productivity with our innovative solution. Experience the difference that quality and attention to detail can make."}`,
      
      `📅 Launch Details\n\n${launchDate ? `Available: ${launchDate}` : "Coming soon!"}\n${pricing ? `Starting at: ${pricing}` : "Competitive pricing available"}`,
      
      `🎉 Ready to Get Started?\n\n${callToAction || "Don't miss out on this game-changing product. Be among the first to experience the future!"}\n\nComment below or DM us for early access! 👇`
    ];

    setGeneratedContent(launchContent);
    setShowPreview(true);
  };

  const saveGeneratedContent = () => {
    const contentId = saveContent(
      "product-launch",
      `${productName} Launch`,
      generatedContent,
      { 
        styles, 
        productInfo: { productName, description, features, benefits, launchDate, pricing, callToAction } 
      },
      tags
    );

    toast({
      title: "Product Launch Created!",
      description: "Your product launch content has been generated and saved."
    });

    // Reset form
    setProductName("");
    setDescription("");
    setFeatures("");
    setBenefits("");
    setLaunchDate("");
    setPricing("");
    setCallToAction("");
    setGeneratedContent([]);
    setShowPreview(false);
  };

  const editContent = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Eye className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Content Preview</h2>
          </div>
          <p className="text-gray-600">Review your generated product launch</p>
        </div>

        <div className="space-y-4">
          {generatedContent.map((slide, index) => (
            <Card key={index} className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="text-sm text-gray-500">Slide {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-gray-700">{slide}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          <Button onClick={editContent} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Edit Content
          </Button>
          <Button onClick={saveGeneratedContent} className="flex items-center gap-2 flex-1">
            <Save className="w-4 h-4" />
            Save to Library
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Rocket className="w-6 h-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900">Product Launch</h2>
        </div>
        <p className="text-gray-600">Create compelling content to announce your new product</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name *</Label>
            <Input
              id="productName"
              placeholder="Your amazing product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Product Description *</Label>
            <Textarea
              id="description"
              placeholder="What is your product and why is it special? Give a compelling overview."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="features">Key Features</Label>
            <Textarea
              id="features"
              placeholder="List the main features that make your product stand out"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="benefits">Benefits & Value</Label>
            <Textarea
              id="benefits"
              placeholder="How will your product help customers? What problems does it solve?"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="launchDate">Launch Date</Label>
              <Input
                id="launchDate"
                placeholder="e.g., March 15, 2024"
                value={launchDate}
                onChange={(e) => setLaunchDate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="pricing">Pricing</Label>
              <Input
                id="pricing"
                placeholder="e.g., $99 or Starting at $49"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="callToAction">Call to Action</Label>
            <Textarea
              id="callToAction"
              placeholder="What action do you want people to take? (e.g., pre-order, sign up, learn more)"
              value={callToAction}
              onChange={(e) => setCallToAction(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <EnhancedFormFields onStyleChange={setStyles} onTagsChange={setTags} />

      <Button onClick={generateContent} className="w-full" size="lg">
        <Eye className="w-4 h-4 mr-2" />
        Preview Product Launch
      </Button>
    </div>
  );
};
