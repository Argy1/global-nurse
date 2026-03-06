import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useWhatsAppGroups } from "@/hooks/useWhatsAppGroups";

export function useWhatsAppLink() {
  const navigate = useNavigate();
  const { data: groups } = useWhatsAppGroups();

  const isValidLink = (link: string | undefined | null): boolean => {
    return !!link && link !== "UPDATE_ME" && link.startsWith("http");
  };

  const getFirstValidLink = (): string | null => {
    if (!groups) return null;
    const validGroup = groups.find((g) => isValidLink(g.join_link));
    return validGroup?.join_link || null;
  };

  const handleWhatsAppClick = (e?: React.MouseEvent, specificLink?: string) => {
    e?.preventDefault();
    
    const linkToUse = specificLink || getFirstValidLink();
    
    if (linkToUse && isValidLink(linkToUse)) {
      window.open(linkToUse, "_blank", "noopener,noreferrer");
    } else {
      toast({
        title: "Link Coming Soon",
        description: "WhatsApp group link will be available soon. Contact: hello@globalparo.com",
        variant: "default",
      });
      // Navigate to community page for more options
      navigate("/community");
    }
  };

  const handleGroupClick = (link: string, e: React.MouseEvent) => {
    if (!isValidLink(link)) {
      e.preventDefault();
      toast({
        title: "Link Coming Soon",
        description: "This WhatsApp group link will be available soon. Contact: hello@globalparo.com",
        variant: "default",
      });
    }
  };

  return {
    isValidLink,
    getFirstValidLink,
    handleWhatsAppClick,
    handleGroupClick,
  };
}
