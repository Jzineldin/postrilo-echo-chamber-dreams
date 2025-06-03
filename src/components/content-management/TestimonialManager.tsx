
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  rating: number;
  metrics?: string;
  imageUrl?: string;
  isActive: boolean;
}

export const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Marketing Director',
      company: 'TechCorp',
      quote: 'Postrilo has transformed our content creation process. We generate a month\'s worth of content in just hours!',
      rating: 5,
      metrics: '300% increase in engagement',
      isActive: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Social Media Manager',
      company: 'StartupHub',
      quote: 'The AI understands our brand voice perfectly. It\'s like having a content team that never sleeps.',
      rating: 5,
      metrics: '50% time savings',
      isActive: true
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    title: '',
    company: '',
    quote: '',
    rating: 5,
    metrics: '',
    isActive: true
  });

  const handleSave = () => {
    if (isEditing) {
      setTestimonials(prev => 
        prev.map(t => t.id === isEditing ? { ...t, ...newTestimonial } : t)
      );
      setIsEditing(null);
    } else {
      const testimonial: Testimonial = {
        ...newTestimonial as Testimonial,
        id: Date.now().toString()
      };
      setTestimonials(prev => [...prev, testimonial]);
    }
    setNewTestimonial({ name: '', title: '', company: '', quote: '', rating: 5, metrics: '', isActive: true });
  };

  const handleEdit = (testimonial: Testimonial) => {
    setNewTestimonial(testimonial);
    setIsEditing(testimonial.id);
  };

  const handleDelete = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const toggleActive = (id: string) => {
    setTestimonials(prev => 
      prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t)
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newTestimonial.name || ''}
                onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Customer name"
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTestimonial.title || ''}
                onChange={(e) => setNewTestimonial(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Job title"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={newTestimonial.company || ''}
                onChange={(e) => setNewTestimonial(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Company name"
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={newTestimonial.rating || 5}
                onChange={(e) => setNewTestimonial(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="quote">Quote</Label>
            <Textarea
              id="quote"
              value={newTestimonial.quote || ''}
              onChange={(e) => setNewTestimonial(prev => ({ ...prev, quote: e.target.value }))}
              placeholder="Customer testimonial"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="metrics">Metrics (optional)</Label>
            <Input
              id="metrics"
              value={newTestimonial.metrics || ''}
              onChange={(e) => setNewTestimonial(prev => ({ ...prev, metrics: e.target.value }))}
              placeholder="e.g., 300% increase in engagement"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {isEditing ? 'Update' : 'Add'} Testimonial
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <h3 className="text-lg font-semibold">Existing Testimonials</h3>
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={!testimonial.isActive ? 'opacity-50' : ''}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title} at {testimonial.company}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={testimonial.isActive ? 'default' : 'secondary'}>
                    {testimonial.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(testimonial.id)}
                  >
                    {testimonial.isActive ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-2">"{testimonial.quote}"</blockquote>
              {testimonial.metrics && (
                <Badge variant="outline" className="text-green-700 border-green-200">
                  📈 {testimonial.metrics}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
