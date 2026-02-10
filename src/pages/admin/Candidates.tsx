import { AdminLayout } from "@/components/layout/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function AdminCandidates() {
  const { data: candidates, isLoading } = useQuery({
    queryKey: ["admin_candidates"],
    queryFn: async () => {
      const { data, error } = await supabase.from("candidates").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Candidates</h1>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {["Name", "Email", "WhatsApp", "University", "English", "Stage", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {candidates?.map((c: any) => (
                <tr key={c.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{c.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.email || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.whatsapp_number}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.university || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.english_capability || c.english_level || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">{c.journey_stage || c.pipeline_status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!candidates || candidates.length === 0) && <p className="text-center py-8 text-muted-foreground">No candidates yet.</p>}
        </div>
      )}
    </AdminLayout>
  );
}
