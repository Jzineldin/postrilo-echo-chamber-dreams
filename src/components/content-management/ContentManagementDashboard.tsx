
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { TestimonialManager } from './TestimonialManager';
import { TemplateManager } from './TemplateManager';
import { ContentSettingsManager } from './ContentSettingsManager';

export const ContentManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('testimonials');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
        <p className="text-gray-600">Manage testimonials, templates, and content settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="testimonials" className="mt-6">
          <TestimonialManager />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <TemplateManager />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <ContentSettingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
