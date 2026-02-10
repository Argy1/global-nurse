import { useState, useMemo } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search, Download, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const JOURNEY_STAGES = ["New", "Contacted", "Screening", "Preparing", "Ready", "Placed", "Closed"];

export default function AdminCandidates() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: candidates, isLoading } = useQuery({
    queryKey: ["admin_candidates"],
    queryFn: async () => {
      const { data, error } = await supabase.from("candidates").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateCandidate = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => {
      const { error } = await supabase.from("candidates").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_candidates"] });
      toast({ title: "Candidate updated" });
    },
    onError: () => toast({ title: "Update failed", variant: "destructive" }),
  });

  const filtered = useMemo(() => {
    if (!candidates) return [];
    return candidates.filter((c: any) => {
      const matchSearch = !search || c.full_name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()) || c.whatsapp_number?.includes(search);
      const matchStage = stageFilter === "all" || c.journey_stage === stageFilter;
      const matchVerified = verifiedFilter === "all" || (verifiedFilter === "verified" && c.email_verified) || (verifiedFilter === "unverified" && !c.email_verified);
      return matchSearch && matchStage && matchVerified;
    });
  }, [candidates, search, stageFilter, verifiedFilter]);

  const exportCSV = () => {
    if (!filtered.length) return;
    const headers = ["Full Name", "Email", "WhatsApp", "University", "English", "Stage", "Verified", "Date"];
    const rows = filtered.map((c: any) => [
      c.full_name, c.email || "", c.whatsapp_number, c.university || "", c.english_capability || c.english_level || "", c.journey_stage, c.email_verified ? "Yes" : "No", new Date(c.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r: string[]) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `candidates-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selected = candidates?.find((c: any) => c.id === selectedId) as any;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-extrabold text-foreground">Candidates</h1>
        <Button variant="outline" size="sm" onClick={exportCSV} disabled={!filtered.length}>
          <Download className="h-4 w-4 mr-1" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search name, email, phone…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Stage" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {JOURNEY_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Verified" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="unverified">Unverified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className={`flex-1 min-w-0 ${selected ? "hidden lg:block" : ""}`}>
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    {["Name", "Email", "WhatsApp", "Stage", "Verified", "Date"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c: any) => (
                    <tr key={c.id} className={`border-t border-border cursor-pointer hover:bg-muted/50 transition-colors ${selectedId === c.id ? "bg-muted" : ""}`} onClick={() => setSelectedId(c.id)}>
                      <td className="px-4 py-3 font-medium text-foreground">{c.full_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.email || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.whatsapp_number}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">{c.journey_stage}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`h-2 w-2 rounded-full inline-block ${c.email_verified ? "bg-accent" : "bg-muted-foreground/30"}`} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No candidates match filters.</p>}
              <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border">
                Showing {filtered.length} of {candidates?.length || 0}
              </div>
            </div>
          )}
        </div>

        {/* Detail Drawer */}
        {selected && (
          <div className="w-full lg:w-[400px] shrink-0 bg-card rounded-xl border border-border p-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Candidate Details</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedId(null)}><X className="h-4 w-4" /></Button>
            </div>

            <div className="space-y-4 text-sm">
              <Field label="Full Name" value={selected.full_name} />
              <Field label="Email" value={selected.email} />
              <Field label="WhatsApp" value={selected.whatsapp_number} />
              <Field label="Date of Birth" value={selected.date_of_birth} />
              <Field label="University" value={selected.university} />
              <Field label="Graduation Year" value={selected.graduation_year} />
              <Field label="Profession" value={selected.profession} />
              <Field label="Specialty" value={selected.specialty} />
              <Field label="English" value={selected.english_capability || selected.english_level} />
              <Field label="License Status" value={selected.license_status} />
              <Field label="Experience (yrs)" value={selected.experience_years} />
              <Field label="City/Country" value={selected.city_country} />
              <Field label="Target Countries" value={selected.target_countries?.join(", ")} />
              <Field label="Motivations" value={selected.motivations?.join(", ")} />
              <Field label="Challenges" value={selected.challenges?.join(", ")} />
              <Field label="Help Needed" value={selected.help_needed?.join(", ")} />
              <Field label="Email Verified" value={selected.email_verified ? "Yes" : "No"} />
              <Field label="WhatsApp Verified" value={selected.whatsapp_verified ? "Yes" : "No"} />

              <div className="pt-4 border-t border-border space-y-3">
                <div>
                  <Label className="text-foreground font-bold text-xs">Journey Stage</Label>
                  <Select value={selected.journey_stage} onValueChange={(v) => updateCandidate.mutate({ id: selected.id, updates: { journey_stage: v } })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {JOURNEY_STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-foreground font-bold text-xs">Assigned Support Agent</Label>
                  <Input
                    className="mt-1"
                    defaultValue={selected.assigned_support_agent || ""}
                    placeholder="Agent name"
                    onBlur={(e) => {
                      if (e.target.value !== (selected.assigned_support_agent || "")) {
                        updateCandidate.mutate({ id: selected.id, updates: { assigned_support_agent: e.target.value || null } });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function Field({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-foreground font-medium">{value || "—"}</p>
    </div>
  );
}
