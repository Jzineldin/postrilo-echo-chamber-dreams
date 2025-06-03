
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GettingStartedGuide } from "@/components/help/GettingStartedGuide";
import { FAQSection } from "@/components/help/FAQSection";
import { ContactSupport } from "@/components/help/ContactSupport";
import { ResourcesSection } from "@/components/help/ResourcesSection";
import { HelpCircle, BookOpen, MessageSquare, Download } from "lucide-react";

export const HelpSupportPage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <HelpCircle className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Help & Support</h2>
        </div>
        <p className="text-gray-600">Everything you need to know to get the most out of our platform</p>
      </div>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="getting-started" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Contact Support
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started">
          <GettingStartedGuide />
        </TabsContent>
        
        <TabsContent value="faq">
          <FAQSection />
        </TabsContent>
        
        <TabsContent value="contact">
          <ContactSupport />
        </TabsContent>
        
        <TabsContent value="resources">
          <ResourcesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
