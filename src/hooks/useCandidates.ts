import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

export type CandidateInsert = TablesInsert<"candidates">;

export function useSubmitCandidate() {
  return useMutation({
    mutationFn: async (candidate: CandidateInsert) => {
      const { data, error } = await supabase
        .from("candidates")
        .insert(candidate)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
  });
}

// Alias for consistency
export const useCreateCandidate = useSubmitCandidate;
