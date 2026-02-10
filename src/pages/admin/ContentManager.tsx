import { AdminLayout } from "@/components/layout/AdminLayout";
import { useContent } from "@/hooks/useContent";
import { useQuickstartChapters } from "@/hooks/useQuickstartChapters";
import { useSuccessStories } from "@/hooks/useSuccessStories";
import { Loader2 } from "lucide-react";

export default function AdminContentManager() {
  const { data: articles, isLoading: loadingArticles } = useContent();
  const { data: chapters, isLoading: loadingChapters } = useQuickstartChapters();
  const { data: stories, isLoading: loadingStories } = useSuccessStories();

  const isLoading = loadingArticles || loadingChapters || loadingStories;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Content Manager</h1>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-12">
          {/* Articles */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">News Articles ({articles?.length || 0})</h2>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    {["Title", "Category", "Published", "Date"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {articles?.map((a) => (
                    <tr key={a.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium text-foreground">{a.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{a.category}</td>
                      <td className="px-4 py-3">{a.is_published ? "✓" : "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(a.publish_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quickstart Chapters */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Quickstart Chapters ({chapters?.length || 0})</h2>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    {["Order", "Title", "Published"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chapters?.map((c) => (
                    <tr key={c.id} className="border-t border-border">
                      <td className="px-4 py-3 text-muted-foreground">{c.order_index}</td>
                      <td className="px-4 py-3 font-medium text-foreground">{c.title}</td>
                      <td className="px-4 py-3">{c.is_published ? "✓" : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Success Stories */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Success Stories ({stories?.length || 0})</h2>
            <div className="bg-card rounded-xl border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    {["Title", "Nurse", "Route", "Published"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stories?.map((s) => (
                    <tr key={s.id} className="border-t border-border">
                      <td className="px-4 py-3 font-medium text-foreground">{s.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.nurse_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.origin_country} → {s.destination_country}</td>
                      <td className="px-4 py-3">{s.is_published ? "✓" : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
