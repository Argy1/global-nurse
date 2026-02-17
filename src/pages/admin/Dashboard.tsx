import { AdminLayout } from "@/components/layout/AdminLayout";
import { Users, Building2, MessageSquare, FileText, ArrowRight, AlertTriangle, Clock, TrendingUp, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, FunnelChart, Funnel, LabelList,
} from "recharts";
import { format, subDays, differenceInMinutes } from "date-fns";

/* ─── hooks ─── */

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
    queryKey: ["admin_open_tickets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chat_escalation_tickets")
        .select("*")
        .neq("status", "Resolved");
      if (error) throw error;
      return data || [];
    },
  });
}

function usePipelineData() {
  return useQuery({
    queryKey: ["admin_pipeline"],
    queryFn: async () => {
      const { data, error } = await supabase.from("candidates").select("pipeline_status");
      if (error) throw error;
      const stages = ["new", "contacted", "screened", "qualified", "in_process", "placed", "closed"];
      const stageLabels: Record<string, string> = {
        new: "New", contacted: "Contacted", screened: "Screened",
        qualified: "Qualified", in_process: "In Process", placed: "Placed", closed: "Closed",
      };
      const counts: Record<string, number> = {};
      stages.forEach((s) => (counts[s] = 0));
      (data || []).forEach((c: any) => {
        if (counts[c.pipeline_status] !== undefined) counts[c.pipeline_status]++;
      });
      return stages.map((s) => ({ name: stageLabels[s], value: counts[s], fill: "" }));
    },
  });
}

function useTargetCountries() {
  return useQuery({
    queryKey: ["admin_target_countries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("candidates").select("target_countries");
      if (error) throw error;
      const map: Record<string, number> = {};
      (data || []).forEach((c: any) => {
        (c.target_countries || []).forEach((country: string) => {
          map[country] = (map[country] || 0) + 1;
        });
      });
      return Object.entries(map)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);
    },
  });
}

function useRecentCandidates() {
  return useQuery({
    queryKey: ["admin_recent_candidates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("id, full_name, created_at, pipeline_status, city_country")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
  });
}

function useRecentEmployers() {
  return useQuery({
    queryKey: ["admin_recent_employers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employer_inquiries")
        .select("id, institution_name, company_name, created_at, employer_status")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data || [];
    },
  });
}

function useDailyRegistrations() {
  return useQuery({
    queryKey: ["admin_daily_registrations"],
    queryFn: async () => {
      const since = subDays(new Date(), 13);
      const { data, error } = await supabase
        .from("candidates")
        .select("created_at")
        .gte("created_at", since.toISOString());
      if (error) throw error;
      const dayMap: Record<string, number> = {};
      for (let i = 0; i < 14; i++) {
        const d = format(subDays(new Date(), 13 - i), "MM/dd");
        dayMap[d] = 0;
      }
      (data || []).forEach((c: any) => {
        const d = format(new Date(c.created_at), "MM/dd");
        if (dayMap[d] !== undefined) dayMap[d]++;
      });
      return Object.entries(dayMap).map(([date, count]) => ({ date, count }));
    },
  });
}

/* ─── colors ─── */
const FUNNEL_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f59e0b", "#10b981", "#6366f1", "#ec4899", "#94a3b8"];
const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#f59e0b", "#10b981", "#6366f1", "#ec4899", "#94a3b8", "#f97316"];

/* ─── component ─── */
export default function AdminDashboard() {
  const candidates = useCount("candidates");
  const employers = useCount("employer_inquiries");
  const openTickets = useOpenTickets();
  const content = useCount("content_items");
  const candidatesWeek = useCountThisWeek("candidates");
  const employersWeek = useCountThisWeek("employer_inquiries");
  const pipelineData = usePipelineData();
  const countryData = useTargetCountries();
  const recentCandidates = useRecentCandidates();
  const recentEmployers = useRecentEmployers();
  const dailyRegs = useDailyRegistrations();

  const openCount = openTickets.data?.length || 0;
  const breachedTickets = (openTickets.data || []).filter(
    (t) => !t.first_response_at && differenceInMinutes(new Date(), new Date(t.created_at)) > 15
  );

  const stats = [
    { label: "Total Candidates", value: candidates.data, sub: `+${candidatesWeek.data ?? 0} this week`, icon: Users, color: "text-primary" },
    { label: "Employer Inquiries", value: employers.data, sub: `+${employersWeek.data ?? 0} this week`, icon: Building2, color: "text-accent" },
    { label: "Open Tickets", value: openCount, sub: `${breachedTickets.length} breaching SLA`, icon: MessageSquare, color: breachedTickets.length > 0 ? "text-destructive" : "text-primary" },
    { label: "Content Items", value: content.data, sub: "Articles & chapters", icon: FileText, color: "text-primary" },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard</h1>
        <span className="text-xs text-muted-foreground">{format(new Date(), "EEEE, dd MMM yyyy")}</span>
      </div>

      {/* SLA Alert Banner */}
      {breachedTickets.length > 0 && (
        <Link to="/admin/chat-escalations" className="block mb-6">
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-center gap-3 hover:bg-destructive/15 transition-colors">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-destructive">
                ⚠️ {breachedTickets.length} ticket{breachedTickets.length > 1 ? "s" : ""} breaching 15-min SLA
              </p>
              <p className="text-xs text-destructive/80">Click to view and respond immediately</p>
            </div>
            <ArrowRight className="h-4 w-4 text-destructive" />
          </div>
        </Link>
      )}

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <Badge variant="secondary" className="text-[10px] font-medium">{s.sub}</Badge>
              </div>
              <p className="text-3xl font-extrabold text-foreground">{s.value ?? "—"}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Registration Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Registration Trend (14 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyRegs.data || []}>
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Target Countries Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" /> Top Target Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52 flex items-center">
              {(countryData.data || []).length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={countryData.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name} (${value})`}>
                      {(countryData.data || []).map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground mx-auto">No data yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Funnel */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Candidate Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {(pipelineData.data || []).map((stage, i) => (
              <div key={stage.name} className="text-center">
                <div
                  className="rounded-lg mx-auto flex items-center justify-center text-white font-bold text-lg mb-1"
                  style={{
                    backgroundColor: FUNNEL_COLORS[i % FUNNEL_COLORS.length],
                    width: `${100 - i * 8}%`,
                    height: 48,
                    minWidth: 40,
                  }}
                >
                  {stage.value}
                </div>
                <p className="text-[10px] text-muted-foreground font-medium">{stage.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Candidates */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> Recent Registrations
            </CardTitle>
            <Link to="/admin/candidates" className="text-xs text-primary hover:underline">View all →</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {(recentCandidates.data || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No registrations yet</p>
            )}
            {(recentCandidates.data || []).map((c: any) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.full_name}</p>
                  <p className="text-[11px] text-muted-foreground">{c.city_country || "—"}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-[10px]">{c.pipeline_status}</Badge>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {format(new Date(c.created_at), "dd MMM, HH:mm")}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Employers */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4 text-accent" /> Recent Employer Inquiries
            </CardTitle>
            <Link to="/admin/employers" className="text-xs text-primary hover:underline">View all →</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {(recentEmployers.data || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No inquiries yet</p>
            )}
            {(recentEmployers.data || []).map((e: any) => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{e.institution_name || e.company_name || "—"}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-[10px]">{e.employer_status}</Badge>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {format(new Date(e.created_at), "dd MMM, HH:mm")}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
