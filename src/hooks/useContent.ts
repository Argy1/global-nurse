import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Content = Tables<"content">;

export function useContent() {
  return useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .order("publish_date", { ascending: false });
      
      if (error) throw error;
      return data as Content[];
    },
  });
}

export function useContentBySlug(slug: string) {
  return useQuery({
    queryKey: ["content", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (error) throw error;
      return data as Content;
    },
    enabled: !!slug,
  });
}
