import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const leadership = [
  {
    name: "DUMA Evi",
    role: "Founder",
    area: "Healthcare Talent Strategy",
    bio: "Visionary founder leading Global Paro's mission to bridge healthcare talents with international opportunities through ethical recruitment and AI-powered solutions.",
  },
  {
    name: "REI Lim",
    role: "Market Development",
    area: "Healthcare Talent Strategy",
    bio: "EMBA and licensed pharmacist with expertise in enterprise SaaS, AI sales, and healthcare advisory. Director, Lifesciences at Ethos BeathChapman. Founder of Pharminex, 2x Startup Acquisition. Led APAC digital & omnichannel at AstraZeneca, Zuellig Pharma.",
  },
  {
    name: "ANN MARIE Christopher",
    role: "Key Appointment Holder",
    area: "Healthcare Talent Strategy",
    bio: "Senior healthcare executive bringing deep industry expertise and strategic leadership to ensure Global Paro meets the highest standards of ethical recruitment.",
  },
];

const advisors = [
  {
    name: "Prof. Agus Setiawan",
    nickname: "AGUS",
    role: "Nurse Talent Communities",
    bio: "A distinguished community health nurse Professor at the Faculty of Nursing, University of Indonesia. Brings deep expertise in nursing education and community health.",
  },
  {
    name: "Timothy Low",
    nickname: "TIM",
    role: "Healthcare Provider Communities",
    bio: "Executive VP at QuikBot Technologies. Former CEO & Board Director at Temasek Holdings. Brings extensive healthcare leadership and strategic partnership experience.",
  },
  {
    name: "Auliana Idi Retnani",
    nickname: "LIA",
    role: "Digital Marketing & Omnichannel Strategy",
    bio: "Marketing Lead at APL, a Zuellig Pharma Company. Former Digital Marketing & Omnichannel Strategy at Boehringer Ingelheim. Expert in strategic marketing and innovation in healthcare.",
  },
];

export default function Team() {
  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">Our Team</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Meet the people behind Global Paro — a diverse team of healthcare, technology, and business leaders united by a shared mission.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-4 text-center">Leadership</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Healthcare Talent Strategy</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((person) => (
              <div key={person.name} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-extrabold text-accent">
                    {person.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-lg">{person.name}</h3>
                <p className="text-sm font-medium text-accent mb-3">{person.role}</p>
                <p className="text-sm text-muted-foreground">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">Advisors & Partners</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {advisors.map((person) => (
              <div key={person.name} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-extrabold text-primary">
                    {person.nickname?.[0] || person.name[0]}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-lg">{person.name}</h3>
                {person.nickname && <p className="text-xs text-muted-foreground mb-1">({person.nickname})</p>}
                <p className="text-sm font-medium text-accent mb-3">{person.role}</p>
                <p className="text-sm text-muted-foreground">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">Join Our Mission</h2>
          <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8">
            We're building the future of ethical nurse recruitment. Be part of it.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">Register Now <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
