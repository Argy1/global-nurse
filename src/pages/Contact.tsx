import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "We'll respond within 24-48 hours",
    action: "globalparo@gmail.com",
    href: "mailto:globalparo@gmail.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Community",
    description: "Get quick answers from nurses",
    action: "Join Community",
    href: "/community",
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Application Status",
  "Pathway Information",
  "Partnership/Employer",
  "Report a Concern",
  "Media Inquiry",
  "Other",
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent! ✉️",
      description: "Thank you for reaching out. We'll respond within 24-48 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      {/* Hero */}
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

      {/* Contact Methods */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-mint flex items-center justify-center mb-4">
                  <method.icon className="h-6 w-6 text-mint-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                <span className="text-primary font-medium text-sm group-hover:underline">
                  {method.action}
                </span>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-6 lg:p-8 shadow-card border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required placeholder="you@email.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inquiryType">Inquiry Type *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="What is your inquiry about?" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" required placeholder="Brief subject line" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    required
                    placeholder="How can we help you?"
                    rows={5}
                  />
                </div>

                <Button type="submit" variant="cta" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 24-48 hours. For urgent matters, please reach out via WhatsApp.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-12 lg:py-16 bg-muted">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Check out our resources and guides for answers to common questions about pathways, requirements, and the application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/content">
                Browse Resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="default" asChild>
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
