import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Globe, Users, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import nursePointing from "@/assets/nurse-pointing.png";
import logoIcon from "@/assets/logo-icon.png";

const paroItems = [
  {
    letter: "P",
    title: "Personalized Platform",
    points: [
      "AI-matched learning path based on your profile",
      "Personalized job matching with verified employers",
      "Custom roadmap from registration to placement",
    ],
    icon: Sparkles,
    color: "hsl(var(--primary))",
  },
  {
    letter: "A",
    title: "Accessible, Anytime Anywhere, Affordable",
    points: [
      "100% online — access from any device, any time",
      "Zero fees charged to nurses, ever",
      "Affordable subscription for premium LMS content",
    ],
    icon: Globe,
    color: "hsl(var(--accent))",
  },
  {
    letter: "R",
    title: "Reputable Team with Global Healthcare Access",
    points: [
      "Board advisors from Singapore, USA, and Indonesia",
      "Nurse experts with international workplace experience",
      "Partnerships with verified global employers",
    ],
    icon: Users,
    color: "hsl(var(--primary))",
  },
  {
    letter: "O",
    title: "One-Stop Career Journey",
    points: [
      "From IELTS prep to job placement in one platform",
      "Document management, STR verification, visa guidance",
      "Human + AI support throughout your entire journey",
    ],
    icon: BookOpen,
    color: "hsl(var(--accent))",
  },
];

export default function WhyChooseUs() {
  return (
    <Layout>
      {/* Hero — split panel: teal bar left + nurse photo right, text overlay */}
      <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
        {/* Background: full gradient */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #015779 0%, #03989E 100%)" }} />

        {/* Teal accent bar far left */}
        <div className="absolute left-0 top-0 bottom-0 w-3" style={{ background: "#03989E" }} />

        {/* Nurse photo right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <img
            src={nursePointing}
            alt="Professional nurse"
            className="w-full h-full object-cover object-center"
            style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 60%, transparent 100%)" }}
          />
          {/* Overlay gradient to blend */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #015779 0%, transparent 50%)" }} />
        </div>

        {/* Content */}
        <div className="relative container py-20 lg:py-28">
          <div className="max-w-lg">
            <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>Why Choose Global PARO</p>
            <h1 className="text-4xl lg:text-5xl font-black font-heading leading-tight mb-5 text-white">
              The Platform Built<br />
              <span style={{ color: "hsl(var(--accent))" }}>For Nurses.</span><br />
              By People Who Care.
            </h1>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
              We're not just a job board. We're your complete career partner — from your first English lesson to your first day working abroad.
            </p>
            <Button
              size="xl"
              asChild
              className="rounded-full font-bold shadow-lg"
              style={{ backgroundColor: "white", color: "#015779" }}
            >
              <Link to="/register">Create My Profile <ArrowRight className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PARO Acronym Sections */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src={logoIcon} alt="Global Paro" className="h-10 w-10" />
              <span className="font-heading font-black text-4xl tracking-widest" style={{ color: 'hsl(var(--primary))' }}>P.A.R.O</span>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">Our name is our promise. Every letter stands for a commitment we make to every nurse on our platform.</p>
          </div>

          <div className="space-y-12">
            {paroItems.map((item, i) => (
              <div key={item.letter} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}>
                {/* Letter Badge */}
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div
                    className="h-24 w-24 rounded-2xl flex items-center justify-center font-black text-5xl font-heading text-white shadow-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.letter}
                  </div>
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 bg-card rounded-2xl p-8 border border-border shadow-card">
                  <h3 className="text-2xl font-black font-heading text-foreground mb-4">{item.title}</h3>
                  <ul className="space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: item.color }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black font-heading text-foreground text-center mb-10">What Makes Us Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "No Fees. Ever.", desc: "We never charge nurses any placement fees, application fees, or hidden costs. Our mission is to empower nurses, not exploit them." },
              { title: "Ethical by Design", desc: "We follow WHO's Global Code on international health worker recruitment and only partner with verified, ethical employers." },
              { title: "AI + Human Support", desc: "Our platform combines AI-driven matching and learning with real human mentors who've walked the same path." },
              { title: "Transparent Process", desc: "Every step is communicated clearly. No vague timelines, no pressure, no surprises — just honest, structured guidance." },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-xl p-6 border border-border shadow-card">
                <CheckCircle className="h-7 w-7 text-accent mb-3" />
                <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container text-center max-w-2xl">
          <h2 className="text-3xl font-black font-heading text-primary-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/80 mb-8">Join hundreds of nurses already building their global careers with Global PARO.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              asChild
              className="rounded-full font-bold"
              style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--primary))' }}
            >
              <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild className="rounded-full font-bold">
              <Link to="/what-we-do">What We Do</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
