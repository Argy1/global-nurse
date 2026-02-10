import { AdminLayout } from "@/components/layout/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export default function AdminEmployers() {
  const { data: inquiries, isLoading } = useQuery({
    queryKey: ["admin_employer_inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("employer_inquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Employer Inquiries</h1>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {["Institution", "Email", "Title", "Mobile", "Status", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries?.map((i: any) => (
                <tr key={i.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{i.institution_name || i.company_name || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.institutional_email || i.email || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.title || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{i.contact_mobile || i.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">{i.employer_status || i.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(i.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!inquiries || inquiries.length === 0) && <p className="text-center py-8 text-muted-foreground">No inquiries yet.</p>}
        </div>
      )}
    </AdminLayout>
  );
}
