import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Star, StarOff, Shield, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";

interface BrandVoice {
  id: string;
  name: string;
  tone: string;
  personality: string;
  target_audience: string;
  key_messages: string[];
  writing_style: string;
  do_use: string[];
  avoid: string[];
  is_default: boolean;
  user_id: string;
}

export const BrandVoiceManager = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { toast } = useToast();
  const [brandVoices, setBrandVoices] = useState<BrandVoice[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    tone: "",
    personality: "",
    target_audience: "",
    key_messages: "",
    writing_style: "",
    do_use: "",
    avoid: ""
  });

  useEffect(() => {
    if (user) {
      fetchBrandVoices();
    }
  }, [user, isAdmin]);

  const fetchBrandVoices = async () => {
    let query = supabase.from('brand_voices').select('*');
    
    // Admins can see all brand voices, regular users only see their own
    if (!isAdmin) {
      query = query.eq('user_id', user?.id);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch brand voices",
        variant: "destructive"
      });
    } else {
      setBrandVoices(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const brandVoiceData = {
      user_id: user.id,
      name: formData.name,
      tone: formData.tone,
      personality: formData.personality,
      target_audience: formData.target_audience,
      key_messages: formData.key_messages.split(',').map(msg => msg.trim()),
      writing_style: formData.writing_style,
      do_use: formData.do_use.split(',').map(item => item.trim()),
      avoid: formData.avoid.split(',').map(item => item.trim()),
      is_default: brandVoices.length === 0
    };

    let error;
    if (editingId) {
      const { error: updateError } = await supabase
        .from('brand_voices')
        .update(brandVoiceData)
        .eq('id', editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('brand_voices')
        .insert([brandVoiceData]);
      error = insertError;
    }

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingId ? 'update' : 'create'} brand voice`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: `Brand voice ${editingId ? 'updated' : 'created'} successfully`
      });
      resetForm();
      fetchBrandVoices();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      tone: "",
      personality: "",
      target_audience: "",
      key_messages: "",
      writing_style: "",
      do_use: "",
      avoid: ""
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const editBrandVoice = (brandVoice: BrandVoice) => {
    setFormData({
      name: brandVoice.name,
      tone: brandVoice.tone,
      personality: brandVoice.personality,
      target_audience: brandVoice.target_audience,
      key_messages: brandVoice.key_messages.join(', '),
      writing_style: brandVoice.writing_style,
      do_use: brandVoice.do_use.join(', '),
      avoid: brandVoice.avoid.join(', ')
    });
    setIsEditing(true);
    setEditingId(brandVoice.id);
  };

  const deleteBrandVoice = async (id: string) => {
    const { error } = await supabase
      .from('brand_voices')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete brand voice",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Brand voice deleted successfully"
      });
      fetchBrandVoices();
    }
  };

  const setDefaultBrandVoice = async (id: string) => {
    const { error } = await supabase
      .from('brand_voices')
      .update({ is_default: true })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to set default brand voice",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Default brand voice updated"
      });
      fetchBrandVoices();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Brand Voice Manager</h2>
          {isAdmin && (
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <Shield className="w-3 h-3 mr-1" />
              Admin Access
            </Badge>
          )}
        </div>
        <p className="text-gray-600">
          {isAdmin 
            ? "Admin view: Create and manage all brand voices across the platform" 
            : "Create and manage your brand voices for consistent content generation"
          }
        </p>
        {isAdmin && (
          <p className="text-sm text-blue-600 mt-1">
            <Users className="w-4 h-4 inline mr-1" />
            Viewing all users' brand voices
          </p>
        )}
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {isEditing ? 'Edit Brand Voice' : 'Create New Brand Voice'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Brand Voice Name</label>
                <Input
                  placeholder="e.g., Professional Tech Brand"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tone</label>
                <Input
                  placeholder="e.g., Friendly, Professional, Casual"
                  value={formData.tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Personality</label>
                <Input
                  placeholder="e.g., Innovative, Reliable, Approachable"
                  value={formData.personality}
                  onChange={(e) => setFormData({...formData, personality: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Target Audience</label>
                <Input
                  placeholder="e.g., Tech professionals, millennials"
                  value={formData.target_audience}
                  onChange={(e) => setFormData({...formData, target_audience: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Writing Style</label>
              <Input
                placeholder="e.g., Conversational, Educational, Inspirational"
                value={formData.writing_style}
                onChange={(e) => setFormData({...formData, writing_style: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Key Messages (comma separated)</label>
              <Textarea
                placeholder="e.g., Innovation, Quality, Customer-first approach"
                value={formData.key_messages}
                onChange={(e) => setFormData({...formData, key_messages: e.target.value})}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Words/Phrases to Use (comma separated)</label>
                <Textarea
                  placeholder="e.g., Innovative, cutting-edge, solution"
                  value={formData.do_use}
                  onChange={(e) => setFormData({...formData, do_use: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Words/Phrases to Avoid (comma separated)</label>
                <Textarea
                  placeholder="e.g., Cheap, basic, outdated"
                  value={formData.avoid}
                  onChange={(e) => setFormData({...formData, avoid: e.target.value})}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                {isEditing ? 'Update Brand Voice' : 'Create Brand Voice'}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Brand Voices List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {isAdmin ? 'All Brand Voices' : 'Your Brand Voices'}
        </h3>
        {brandVoices.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No brand voices created yet. Create your first one above!</p>
            </CardContent>
          </Card>
        ) : (
          brandVoices.map((voice) => (
            <Card key={voice.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-semibold">{voice.name}</h4>
                      {voice.is_default && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Default
                        </Badge>
                      )}
                      {isAdmin && voice.user_id !== user?.id && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          <Users className="w-3 h-3 mr-1" />
                          Other User
                        </Badge>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Tone:</span> {voice.tone}
                      </div>
                      <div>
                        <span className="font-medium">Personality:</span> {voice.personality}
                      </div>
                      <div>
                        <span className="font-medium">Audience:</span> {voice.target_audience}
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Style:</span> {voice.writing_style}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!voice.is_default && (voice.user_id === user?.id || isAdmin) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDefaultBrandVoice(voice.id)}
                      >
                        <StarOff className="w-4 h-4" />
                      </Button>
                    )}
                    {(voice.user_id === user?.id || isAdmin) && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editBrandVoice(voice)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteBrandVoice(voice.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
