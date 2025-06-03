
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageCircle, Phone, Clock } from 'lucide-react';

export const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support request:', formData);
    // Handle form submission
  };

  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@postrilo.com",
      responseTime: "Within 24 hours",
      available: true
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available in app",
      responseTime: "Usually within minutes",
      available: true
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk to our experts",
      contact: "+1 (555) 123-4567",
      responseTime: "Business hours only",
      available: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Contact Support</h2>
        <p className="text-gray-600">Need help? We're here to assist you with any questions or issues</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="account">Account Help</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Please describe your issue in detail..."
                  className="min-h-32"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Support Channels */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Other ways to reach us</h3>
          
          {supportChannels.map((channel, index) => (
            <Card key={index} className={!channel.available ? 'opacity-60' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <channel.icon className="w-6 h-6 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{channel.title}</h4>
                      {channel.available ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Available</Badge>
                      ) : (
                        <Badge variant="secondary">Coming Soon</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                    <p className="text-sm font-medium">{channel.contact}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {channel.responseTime}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Emergency Issues</h4>
              <p className="text-sm text-blue-700 mb-3">
                For urgent issues affecting your account or billing, please use the priority support channel.
              </p>
              <Button variant="outline" className="w-full">
                Priority Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
