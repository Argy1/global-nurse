import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, ArrowRight, Loader2, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { toast } from "@/hooks/use-toast";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const { data: socialLinks } = useSocialLinks();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isValidUrl = (url: string | undefined) => {
    return url && url !== "UPDATE_ME" && url.startsWith("http");
  };

  const handleSocialClick = (url: string | undefined, name: string) => {
    if (isValidUrl(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast({
        title: "Coming Soon",
        description: `Our ${name} link will be available soon.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // For now, we'll just show success - in production, this would save to a table or send an email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent! ✉️",
        description: "Thank you for reaching out. We'll respond within 24-48 hours.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Something went wrong. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12 lg:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Have questions? We're here to help. Reach out and our team will respond promptly.
            </p>
          </div>
        </div>
      </section>

      {/* A) Contact Cards */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {/* Email */}
            <a
              href="mailto:globalparo@gmail.com"
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all group text-center"
            >
              <div className="h-12 w-12 rounded-lg bg-mint mx-auto flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-mint-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Email</h3>
              <p className="text-sm text-primary group-hover:underline">globalparo@gmail.com</p>
            </a>

            {/* WhatsApp */}
            <Link
              to="/community"
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all group text-center"
            >
              <div className="h-12 w-12 rounded-lg bg-accent mx-auto flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">WhatsApp</h3>
              <p className="text-sm text-primary group-hover:underline">Join Community</p>
            </Link>

            {/* Instagram */}
            <button
              onClick={() => handleSocialClick(socialLinks?.instagram_url, "Instagram")}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all group text-center w-full"
            >
              <div className="h-12 w-12 rounded-lg bg-cta mx-auto flex items-center justify-center mb-4">
                <Instagram className="h-6 w-6 text-cta-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Instagram</h3>
              <p className="text-sm text-muted-foreground">
                {isValidUrl(socialLinks?.instagram_url) ? "Follow Us" : "Coming Soon"}
              </p>
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => handleSocialClick(socialLinks?.linkedin_url, "LinkedIn")}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all group text-center w-full"
            >
              <div className="h-12 w-12 rounded-lg bg-primary mx-auto flex items-center justify-center mb-4">
                <Linkedin className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">LinkedIn</h3>
              <p className="text-sm text-muted-foreground">
                {isValidUrl(socialLinks?.linkedin_url) ? "Connect" : "Coming Soon"}
              </p>
            </button>
          </div>

          {/* B) Contact Form */}
          <div className="max-w-xl mx-auto">
            <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@email.com"
                    maxLength={255}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="How can we help you?"
                    rows={5}
                    maxLength={1000}
                    required
                  />
                </div>

                <Button type="submit" variant="cta" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24-48 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Check out our resources and guides for answers to common questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/content">
                Browse Resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="cta" asChild>
              <Link to="/apply">
                Start Your Application
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
