import { AdminLayout } from "@/components/layout/AdminLayout";
import { useContent } from "@/hooks/useContent";
import { Loader2 } from "lucide-react";

export default function AdminContentManager() {
  const { data: allItems, isLoading } = useContent();

  const news = allItems?.filter((i) => i.type === "News") || [];
  const chapters = allItems?.filter((i) => i.type === "QuickstartChapter") || [];
  const stories = allItems?.filter((i) => i.type === "SuccessStory") || [];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-extrabold text-foreground mb-6">Content Manager</h1>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-12">
          {[
            { title: "News Articles", items: news },
            { title: "Quickstart Chapters", items: chapters },
            { title: "Success Stories", items: stories },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-foreground mb-4">{section.title} ({section.items.length})</h2>
              <div className="bg-card rounded-xl border border-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      {["Title", "Tags", "Published", "Date"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item) => (
                      <tr key={item.id} className="border-t border-border">
                        <td className="px-4 py-3 font-medium text-foreground">{item.title}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.tags?.join(", ") || "—"}</td>
                        <td className="px-4 py-3">{item.published ? "✓" : "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.publish_date ? new Date(item.publish_date).toLocaleDateString() : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {section.items.length === 0 && <p className="text-center py-8 text-muted-foreground">No items yet.</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
