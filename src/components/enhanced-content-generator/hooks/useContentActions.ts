
import { useToast } from "@/hooks/use-toast";

export const useContentActions = () => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Content has been copied to your clipboard."
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handleRegenerate = () => {
    // This would trigger regeneration logic
    console.log("Regenerating content...");
  };

  return {
    copyToClipboard,
    handleRegenerate
  };
};
