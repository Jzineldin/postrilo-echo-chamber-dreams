
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { User, Camera, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileSectionProps {
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const ProfileSection = ({ isExpanded = true, onToggle }: ProfileSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const profileContent = (
    <form onSubmit={handleProfileUpdate} className="space-y-4">
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4 mb-6`}>
        <Avatar className="w-20 h-20">
          <AvatarImage src="" />
          <AvatarFallback className="text-lg">
            {user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button type="button" variant="outline" className={`flex items-center gap-2 ${isMobile ? 'w-full h-12' : ''}`}>
          <Camera className="w-4 h-4" />
          Change Photo
        </Button>
      </div>
      
      <div className={`${isMobile ? 'space-y-4' : 'grid md:grid-cols-2 gap-4'}`}>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            placeholder="Enter your first name"
            className={isMobile ? 'h-12' : ''}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            placeholder="Enter your last name"
            className={isMobile ? 'h-12' : ''}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className={isMobile ? 'h-12' : 'flex items-center gap-2'}
        />
      </div>
      
      <Button 
        type="submit" 
        className={`${isMobile ? 'w-full h-12 ' : ''}bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700`}
      >
        Update Profile
      </Button>
    </form>
  );

  if (isMobile && onToggle) {
    return (
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-white/50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {profileContent}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        {profileContent}
      </CardContent>
    </Card>
  );
};
