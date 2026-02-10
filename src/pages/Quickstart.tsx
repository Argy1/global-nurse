import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, MessageCircle, BookOpen, ChevronDown, ChevronUp,
  Globe, Languages, FileCheck, Heart, Shield, Users, BriefcaseMedical,
  GraduationCap, AlertTriangle, Handshake,
} from "lucide-react";
import { useSetting } from "@/hooks/useSiteSettings";

/* ── Chapter data ── */
const chapters = [
  {
    id: "global-shortage",
    icon: Globe,
    title: "Global Nursing Shortage & Aging Populations",
    intro: "The world is facing a critical and growing shortage of healthcare professionals. By 2030, the WHO projects a deficit of over 10 million health workers — and nurses represent the largest share of that gap.",
    bullets: [
      "Aging populations in the US, Canada, UK, Australia, and Singapore are driving demand for long-term care and chronic disease management.",
      "Many developed nations are unable to train enough nurses domestically to meet demand.",
      "International recruitment of qualified nurses has become a strategic priority for governments and healthcare systems worldwide.",
      "Countries like the Philippines, India, and Indonesia have large pools of skilled nurses ready to contribute globally.",
      "The shortage creates genuine, ethical opportunities for nurses willing to prepare and relocate.",
    ],
    nextStep: "Start by understanding which countries are actively recruiting and why. Research is the first step to making an informed decision about your career path.",
  },
  {
    id: "english-speaking-demand",
    icon: Languages,
    title: "Why English-Speaking Countries Need Nurses",
    intro: "English-speaking countries like the USA, Canada, the UK, and Singapore are among the most active recruiters of international nurses. Understanding why can help you target the right destination.",
    bullets: [
      "The USA faces a projected shortage of over 200,000 registered nurses by 2030, driven by retirements and population growth.",
      "Canada's immigration-friendly policies actively target healthcare professionals through programs like Express Entry.",
      "Singapore offers structured pathways for foreign-trained nurses with competitive compensation and modern facilities.",
      "These countries value internationally educated nurses who can demonstrate clinical competence and English proficiency.",
      "Working in these countries can provide career growth, professional development, and financial stability.",
    ],
    nextStep: "Consider which countries align with your personal goals, family situation, and professional interests. There is no single \"best\" destination — only the best fit for you.",
  },
  {
    id: "skills-competency",
    icon: BriefcaseMedical,
    title: "Skills & Competency Expectations",
    intro: "International employers expect nurses who meet rigorous clinical and professional standards. Understanding these expectations early helps you prepare effectively.",
    bullets: [
      "Clinical competencies are evaluated through credential review and licensing exams (like NCLEX for the USA).",
      "Employers look for experience in high-demand specialties: ICU, ER, Med-Surg, Operating Room, Pediatrics, and Geriatric Care.",
      "Soft skills matter: teamwork, critical thinking, patient communication, and adaptability to new healthcare systems.",
      "Documentation and record-keeping skills aligned with international standards (e.g., electronic health records).",
      "Willingness to learn and adapt to new protocols, technologies, and cultural expectations in the workplace.",
    ],
    nextStep: "Honestly assess your clinical strengths and gaps. If you have less than 2 years of experience, consider building more clinical hours before applying internationally.",
  },
  {
    id: "english-requirements",
    icon: GraduationCap,
    title: "English Language Requirements",
    intro: "English proficiency is non-negotiable for most international nursing pathways. The requirements are specific and rigorous, so early and consistent preparation is key.",
    bullets: [
      "Most pathways require IELTS Academic with a minimum overall band of 6.5, and at least 7.0 in Speaking.",
      "OET (Occupational English Test) is accepted as an alternative in many countries and is tailored to healthcare professionals.",
      "English requirements exist to protect patient safety — effective communication can be a matter of life and death.",
      "Many nurses underestimate the speaking and writing components. Practice with healthcare-specific scenarios.",
      "Preparation typically takes 3–12 months depending on your starting level. Start early and be consistent.",
    ],
    nextStep: "Take a practice IELTS or OET test to understand your current level. Set a realistic timeline for achieving the required scores, and consider enrolling in a preparation course.",
  },
  {
    id: "licensing-overview",
    icon: FileCheck,
    title: "Licensing Pathway Overview",
    intro: "Each country has its own licensing requirements for internationally educated nurses. Navigating these pathways can feel overwhelming, but understanding the steps makes it manageable.",
    bullets: [
      "USA: Requires CGFNS (Commission on Graduates of Foreign Nursing Schools) evaluation, NCLEX-RN exam, and VisaScreen certificate.",
      "Canada: Requires NNAS (National Nursing Assessment Service) evaluation, followed by provincial/territorial licensing body requirements.",
      "Singapore: Requires SNB (Singapore Nursing Board) registration with credential verification and potential bridging programs.",
      "TrueMerit and CGFNS are credential evaluation services that verify your education meets destination country standards.",
      "The licensing process typically takes 6–18 months. Planning ahead and gathering documents early is critical.",
    ],
    nextStep: "Identify the specific licensing pathway for your target country. Start gathering your educational transcripts, nursing license, and other required documents as early as possible.",
  },
  {
    id: "cultural-readiness",
    icon: Heart,
    title: "Cultural Readiness",
    intro: "Moving abroad as a nurse is not just a career change — it's a life change. Cultural readiness is about preparing yourself mentally, emotionally, and socially for a new environment.",
    bullets: [
      "Healthcare culture varies significantly between countries. Patient-nurse relationships, hierarchy, and communication styles may differ from what you're used to.",
      "Understanding workplace norms (punctuality, assertiveness, feedback culture) helps you integrate faster and more confidently.",
      "Building a support network before you move — through online communities, mentors, or fellow nurses abroad — can ease the transition.",
      "Homesickness is real and normal. Having strategies to stay connected with family while building new relationships is important.",
      "Cultural competence is a skill that employers value. Showing openness and adaptability is a strength, not a weakness.",
    ],
    nextStep: "Connect with nurses who have already made the move to your target country. Their firsthand insights can help you prepare for what textbooks and guides won't cover.",
  },
  {
    id: "communication-challenges",
    icon: AlertTriangle,
    title: "Communication Challenges",
    intro: "Even with strong English skills, communication in a new healthcare environment can be challenging. Understanding common challenges helps you prepare proactively.",
    bullets: [
      "Medical terminology may differ between countries. What you call a condition or procedure at home might have a different name abroad.",
      "Accents and dialects can make understanding and being understood more difficult initially — this improves with time and practice.",
      "Patient communication goes beyond language: body language, cultural sensitivity, and empathy are equally important.",
      "Handoff and documentation styles vary. Learning the local standards early prevents miscommunication and errors.",
      "Asking for clarification is a sign of professionalism, not weakness. Never guess when patient safety is at stake.",
    ],
    nextStep: "Practice clinical English in realistic scenarios. Role-play patient interactions, practice phone handoffs, and familiarize yourself with common medical abbreviations used in your target country.",
  },
  {
    id: "common-barriers",
    icon: Shield,
    title: "Common Barriers Nurses Face",
    intro: "Many talented nurses face obstacles on their international journey. Recognizing these barriers early allows you to plan around them rather than being caught off guard.",
    bullets: [
      "Financial barriers: Exam fees, application costs, and relocation expenses can add up. Budgeting and planning are essential.",
      "Information overload: Conflicting advice from agencies, social media, and peers can lead to confusion and poor decisions.",
      "Unethical recruiters: Some agencies charge excessive fees or make false promises. Learn to identify red flags vs. green flags.",
      "Licensing delays: Credential evaluation and exam scheduling can take longer than expected. Build buffer time into your plan.",
      "Emotional barriers: Fear of failure, family pressure, and uncertainty can slow progress. Seek support and take it one step at a time.",
    ],
    nextStep: "Make a realistic budget for your journey and identify which barriers apply to you. Having a clear financial and emotional plan reduces anxiety and keeps you moving forward.",
  },
  {
    id: "ethical-pathway",
    icon: Handshake,
    title: "Ethical & Structured International Pathway",
    intro: "Not all international recruitment is created equal. Understanding the difference between ethical and exploitative pathways is critical for protecting yourself and your career.",
    bullets: [
      "Ethical recruitment means: no fees charged to the nurse, transparent processes, clear contracts, and consent-based communication.",
      "The WHO Global Code of Practice on the International Recruitment of Health Personnel provides guidelines that ethical organizations follow.",
      "Red flags include: upfront fees, vague timelines, pressure to sign contracts quickly, and guarantees of placement.",
      "Green flags include: clear documentation, verifiable employer information, step-by-step guidance, and a focus on your preparedness.",
      "Your pathway should empower you with knowledge and preparation — not create dependency on a recruiter or agency.",
    ],
    nextStep: "Before engaging with any agency or recruiter, verify their credentials and approach. If something feels too good to be true, it probably is. Trust the process, not the promises.",
  },
  {
    id: "global-paro-support",
    icon: Users,
    title: "How Global Paro Supports Each Step",
    intro: "Global Paro exists to bridge the gap between your ambition and your readiness. We don't promise outcomes — we provide structured, ethical guidance so you can make informed decisions at every step.",
    bullets: [
      "Step-by-step guidance through licensing, language preparation, and credential evaluation — tailored to your target country.",
      "A peer community of nurses at every stage of the journey, from just starting to already working abroad.",
      "Educational resources including this Quickstart Guide, news updates, and future LMS courses (coming soon).",
      "WhatsApp-based support for quick questions and real-time guidance from our team.",
      "No fees charged to nurses. Ever. We believe in transparent, consent-based support.",
    ],
    nextStep: "Register to get personalized guidance for your journey. It takes less than 3 minutes, and we'll review your profile within 48 hours.",
  },
];

/* ── Component ── */
export default function Quickstart() {
  const [activeId, setActiveId] = useState(chapters[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const { value: whatsappLink } = useSetting("whatsapp_direct_chat_link");
  const whatsappHref = whatsappLink ?? "mailto:globalparo@gmail.com";

  /* Intersection observer for active chapter tracking */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  return (
    <Layout>
      {/* SEO meta */}
      <title>Quickstart Guide — Must-Know Before Working Abroad as a Nurse | Global Paro</title>
      <meta name="description" content="A comprehensive 10-chapter guide for nurses preparing to work abroad. Covers licensing, English requirements, cultural readiness, ethical pathways, and more." />

      {/* Hero */}
      <section className="gradient-hero py-14 lg:py-20">
        <div className="container text-center max-w-3xl">
          <p className="text-accent-foreground bg-accent/20 inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            10 Essential Chapters
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight">
            Must-Know Before Working Abroad as a Nurse
          </h1>
          <p className="text-base lg:text-lg text-primary-foreground/85 max-w-2xl mx-auto">
            A free, comprehensive guide covering everything from global nursing demand to ethical pathways.
            Read at your own pace — each chapter builds on the last.
          </p>
        </div>
      </section>

      {/* Main content area */}
      <section className="py-10 lg:py-16">
        <div className="container">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">

            {/* ── Sticky TOC (desktop) / Collapsible (mobile) ── */}
            <aside className="lg:block">
              {/* Mobile toggle */}
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="lg:hidden w-full flex items-center justify-between bg-card border border-border rounded-xl p-4 mb-4 font-semibold text-foreground"
              >
                <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /> Table of Contents</span>
                {tocOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <nav className={`${tocOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-24 bg-card border border-border rounded-xl p-4 mb-6 lg:mb-0 max-h-[70vh] overflow-y-auto`}>
                <p className="hidden lg:block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Table of Contents</p>
                <ol className="space-y-1">
                  {chapters.map((ch, i) => (
                    <li key={ch.id}>
                      <button
                        onClick={() => scrollTo(ch.id)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-start gap-2 ${
                          activeId === ch.id
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <span className="shrink-0 w-5 text-right font-mono text-xs mt-0.5">{i + 1}.</span>
                        <span className="leading-snug">{ch.title}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* ── Chapters ── */}
            <div className="space-y-16 lg:space-y-20">
              {chapters.map((ch, i) => {
                const isLast = i === chapters.length - 1;
                const nextChapter = !isLast ? chapters[i + 1] : null;
                const Icon = ch.icon;

                return (
                  <article
                    key={ch.id}
                    id={ch.id}
                    ref={(el) => { sectionRefs.current[ch.id] = el; }}
                    className="scroll-mt-24"
                  >
                    {/* Chapter header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Chapter {String(i + 1).padStart(2, "0")}</p>
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground leading-tight">{ch.title}</h2>
                      </div>
                    </div>

                    {/* Intro */}
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">{ch.intro}</p>

                    {/* Bullet highlights */}
                    <div className="bg-card border border-border rounded-xl p-6 mb-6">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Key Points</h3>
                      <ul className="space-y-3">
                        {ch.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-foreground">
                            <span className="shrink-0 mt-1 h-2 w-2 rounded-full bg-accent" />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What you should do next */}
                    <div className="bg-muted rounded-xl p-6 mb-6 border-l-4 border-primary">
                      <h3 className="text-sm font-bold text-foreground mb-2">What You Should Do Next</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ch.nextStep}</p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                      {nextChapter ? (
                        <Button variant="default" size="sm" onClick={() => scrollTo(nextChapter.id)}>
                          Continue the Journey <ArrowRight className="h-4 w-4" />
                        </Button>
                      ) : null}
                      <Button variant="cta" size="sm" asChild>
                        <Link to="/register">Register for Guided Support <ArrowRight className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4" /> Chat With Us
                        </a>
                      </Button>
                    </div>

                    {/* Divider (not after last) */}
                    {!isLast && <hr className="mt-12 lg:mt-16 border-border" />}
                  </article>
                );
              })}

              {/* Final CTA */}
              <div className="gradient-hero rounded-2xl p-8 lg:p-12 text-center">
                <h2 className="text-2xl lg:text-3xl font-extrabold text-primary-foreground mb-3">
                  Ready to Take the First Step?
                </h2>
                <p className="text-primary-foreground/85 max-w-lg mx-auto mb-6">
                  You've read the guide. Now let us help you build a personalized plan. Register today — it takes under 3 minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
                  </Button>
                  <Button variant="heroOutline" size="xl" asChild>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" /> WhatsApp Support
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-primary-foreground/50 mt-4">No fees. Consent-based contact only.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
