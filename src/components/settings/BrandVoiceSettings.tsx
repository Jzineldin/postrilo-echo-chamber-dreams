
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BrandVoiceHeader } from './brand-voice/BrandVoiceHeader';
import { CompanyInformationCard } from './brand-voice/CompanyInformationCard';
import { PersonalitySliders } from './brand-voice/PersonalitySliders';
import { ContentGuidelinesCard } from './brand-voice/ContentGuidelinesCard';
import { PreferredHashtagsCard } from './brand-voice/PreferredHashtagsCard';

export const BrandVoiceSettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'technology',
    bannedWords: '',
    preferredHashtags: ''
  });

  const [personalitySliders, setPersonalitySliders] = useState({
    professionalCasual: [50],
    seriousHumorous: [50],
    formalInformal: [50],
    conservativeProgressive: [50]
  });

  const [hashtags, setHashtags] = useState<string[]>(['#innovation', '#quality', '#growth']);
  const [newHashtag, setNewHashtag] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Brand Voice Updated",
      description: "Your brand voice settings have been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      <BrandVoiceHeader />

      <form onSubmit={handleSave} className="space-y-6">
        <CompanyInformationCard formData={formData} setFormData={setFormData} />
        <PersonalitySliders 
          personalitySliders={personalitySliders} 
          setPersonalitySliders={setPersonalitySliders} 
        />
        <ContentGuidelinesCard formData={formData} setFormData={setFormData} />
        <PreferredHashtagsCard 
          hashtags={hashtags}
          setHashtags={setHashtags}
          newHashtag={newHashtag}
          setNewHashtag={setNewHashtag}
        />

        <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          Save Brand Voice Settings
        </Button>
      </form>
    </div>
  );
};
