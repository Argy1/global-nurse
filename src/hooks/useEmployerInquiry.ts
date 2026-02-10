import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface EmployerInquiryInsert {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  country: string;
  nurses_needed?: number;
  specialties_needed?: string[];
  message?: string;
}

export function useSubmitEmployerInquiry() {
  return useMutation({
    mutationFn: async (inquiry: EmployerInquiryInsert) => {
      const { data, error } = await supabase
        .from("employer_inquiries")
        .insert(inquiry)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
}
