import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

export default function LMS() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Learning Management System</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">Structured learning modules to prepare you for success abroad.</p>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="bg-card rounded-2xl p-12 shadow-card border border-border">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-cta/10 text-cta text-sm font-bold mb-4">COMING SOON</span>
            <h2 className="text-2xl font-extrabold text-foreground mb-4">We're Building Something Special</h2>
            <p className="text-muted-foreground mb-8">
              Our LMS will feature structured courses on licensing preparation, English proficiency, interview skills, and cultural adaptation — all designed specifically for nurses going global.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" asChild>
                <Link to="/register">Register to Get Early Access <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/quickstart">Read Quickstart Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
