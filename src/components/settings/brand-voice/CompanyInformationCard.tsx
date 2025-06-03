
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";

interface CompanyInformationCardProps {
  formData: {
    companyName: string;
    industry: string;
  };
  setFormData: (data: any) => void;
}

export const CompanyInformationCard = ({ formData, setFormData }: CompanyInformationCardProps) => {
  const industries = [
    'technology', 'healthcare', 'finance', 'education', 'retail',
    'manufacturing', 'real-estate', 'marketing', 'consulting', 'other'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company/Brand Name</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            placeholder="Enter your company or brand name"
          />
          <p className="text-sm text-gray-500 mt-1">
            This helps AI understand your business context
          </p>
        </div>
        
        <div>
          <Label htmlFor="industry">Industry</Label>
          <select
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry.charAt(0).toUpperCase() + industry.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Industry context helps AI use appropriate terminology and examples
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
