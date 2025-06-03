
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Palette, Monitor, Sun, Moon } from 'lucide-react';

export const AppearanceSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    theme: 'light',
    accentColor: 'purple',
    fontSize: [16],
    compactMode: false,
    animations: true,
    highContrast: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
    // Apply theme changes
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.style.fontSize = `${settings.fontSize[0]}px`;
    
    toast({
      title: "Appearance Updated",
      description: "Your appearance preferences have been saved.",
    });
  };

  const resetToDefaults = () => {
    setSettings({
      theme: 'light',
      accentColor: 'purple',
      fontSize: [16],
      compactMode: false,
      animations: true,
      highContrast: false
    });
    toast({
      title: "Reset Complete",
      description: "Appearance settings have been reset to defaults.",
    });
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Monitor }
  ];

  const colorOptions = [
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'red', label: 'Red', color: 'bg-red-500' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme & Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="font-medium">Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={settings.theme === option.value ? "default" : "outline"}
                  onClick={() => handleSettingChange('theme', option.value)}
                  className="flex items-center gap-2 h-12"
                >
                  <option.icon className="w-4 h-4" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="font-medium">Accent Color</Label>
            <div className="grid grid-cols-5 gap-3">
              {colorOptions.map((color) => (
                <Button
                  key={color.value}
                  variant={settings.accentColor === color.value ? "default" : "outline"}
                  onClick={() => handleSettingChange('accentColor', color.value)}
                  className="flex items-center gap-2 h-12"
                >
                  <div className={`w-4 h-4 rounded-full ${color.color}`}></div>
                  {color.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout & Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="font-medium">Font Size: {settings.fontSize[0]}px</Label>
            <Slider
              value={settings.fontSize}
              onValueChange={(value) => handleSettingChange('fontSize', value)}
              max={24}
              min={12}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Compact Mode</Label>
              <p className="text-sm text-gray-600">Reduce spacing and padding</p>
            </div>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Animations</Label>
              <p className="text-sm text-gray-600">Enable smooth transitions and animations</p>
            </div>
            <Switch
              checked={settings.animations}
              onCheckedChange={(checked) => handleSettingChange('animations', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">High Contrast</Label>
              <p className="text-sm text-gray-600">Improve accessibility with higher contrast</p>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={saveSettings} className="flex-1">
          Save Changes
        </Button>
        <Button onClick={resetToDefaults} variant="outline" className="flex-1">
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};
