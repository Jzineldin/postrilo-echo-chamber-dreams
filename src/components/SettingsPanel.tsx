
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { BrandVoiceSettings } from "@/components/settings/BrandVoiceSettings";
import { ContentSettings } from "@/components/settings/ContentSettings";
import { BillingSettings } from "@/components/settings/BillingSettings";
import { SocialAccountsSettings } from "@/components/settings/SocialAccountsSettings";
import { UsageDashboard } from "@/components/UsageDashboard";
import { Settings, User, Palette, FileText, CreditCard, BarChart3, Share2 } from "lucide-react";

export const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Settings className="w-6 h-6 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        </div>
        <p className="text-gray-600">Manage your account, social connections, brand voice, and preferences</p>
      </div>

      <Tabs defaultValue="social-accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="social-accounts" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Usage
          </TabsTrigger>
          <TabsTrigger value="brand-voice" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Brand Voice
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="social-accounts">
          <SocialAccountsSettings />
        </TabsContent>
        
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        
        <TabsContent value="usage">
          <Card>
            <CardContent className="pt-6">
              <UsageDashboard />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="brand-voice">
          <BrandVoiceSettings />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentSettings />
        </TabsContent>
        
        <TabsContent value="billing">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
