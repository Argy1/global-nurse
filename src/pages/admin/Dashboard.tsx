import { AdminLayout } from "@/components/layout/AdminLayout";
import { Users, Building2, MessageSquare, FileText, ArrowRight, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

function useCount(table: "candidates" | "employer_inquiries" | "chat_escalation_tickets" | "content_items") {
  return useQuery({
    queryKey: ["admin_count", table],
    queryFn: async () => {
      const { count, error } = await supabase.from(table as any).select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });
}

function useCountThisWeek(table: "candidates" | "employer_inquiries") {
  return useQuery({
    queryKey: ["admin_count_week", table],
    queryFn: async () => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const { count, error } = await supabase
        .from(table as any)
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekAgo.toISOString());
      if (error) throw error;
      return count || 0;
    },
  });
}

function useOpenTickets() {
  return useQuery({
    queryKey: ["admin_open_tickets_count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("chat_escalation_tickets")
        .select("*", { count: "exact", head: true })
        .neq("status", "Resolved");
      if (error) throw error;
      return count || 0;
    },
  });
}

export default function AdminDashboard() {
  const candidates = useCount("candidates");
  const employers = useCount("employer_inquiries");
  const openTickets = useOpenTickets();
  const content = useCount("content_items");
  const candidatesWeek = useCountThisWeek("candidates");
  const employersWeek = useCountThisWeek("employer_inquiries");

  const stats = [
    { label: "Total Candidates", value: candidates.data, sub: `${candidatesWeek.data ?? 0} this week`, icon: Users, color: "text-primary", href: "/admin/candidates" },
    { label: "Employer Inquiries", value: employers.data, sub: `${employersWeek.data ?? 0} this week`, icon: Building2, color: "text-accent", href: "/admin/employers" },
    { label: "Open Tickets", value: openTickets.data, sub: "Pending response", icon: MessageSquare, color: "text-cta", href: "/admin/chat-escalations" },
    { label: "Content Items", value: content.data, sub: "Articles & chapters", icon: FileText, color: "text-primary", href: "/admin/content" },
  ];

  const quickLinks = [
    { label: "Manage Candidates", href: "/admin/candidates", icon: Users },
    { label: "Employer Inquiries", href: "/admin/employers", icon: Building2 },
    { label: "Content Manager", href: "/admin/content", icon: FileText },
    { label: "Chat Escalations", href: "/admin/chat-escalations", icon: MessageSquare },
    { label: "Site Settings", href: "/admin/settings", icon: AlertTriangle },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-8">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => (
          <Link key={s.label} to={s.href} className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-lg transition-shadow group">
            <s.icon className={`h-8 w-8 ${s.color} mb-3`} />
            <p className="text-3xl font-extrabold text-foreground">{s.value ?? "—"}</p>
            <p className="text-sm font-semibold text-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <h2 className="text-lg font-bold text-foreground mb-4">Quick Links</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border hover:bg-muted transition-colors group"
          >
            <l.icon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground flex-1">{l.label}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
