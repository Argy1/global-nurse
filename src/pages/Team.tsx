import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/i18n/LanguageContext";

interface Member {
  firstName: string;
  lastName: string;
  role_en: string;
  role_id: string;
  bio_en: string;
  bio_id: string;
  linkedIn?: string;
  category: "core" | "advisor";
  categoryLabel_en: string;
  categoryLabel_id: string;
}

const members: Member[] = [
  {
    firstName: "DUMA",
    lastName: "Evi",
    role_en: "Founder & CEO",
    role_id: "Pendiri & CEO",
    bio_en: "Visionary founder leading Global Paro's mission to bridge healthcare talents with international opportunities through ethical recruitment and AI-powered solutions.",
    bio_id: "Pendiri visioner yang memimpin misi Global Paro untuk menjembatani talenta kesehatan dengan peluang internasional melalui rekrutmen etis dan solusi berbasis AI.",
    category: "core",
    categoryLabel_en: "Core Team",
    categoryLabel_id: "Tim Inti",
  },
  {
    firstName: "ANN MARIE",
    lastName: "Christopher",
    role_en: "Key Appointment Holder",
    role_id: "Pemegang Janji Kunci",
    bio_en: "Senior healthcare executive with deep industry expertise ensuring Global Paro meets the highest standards of ethical recruitment and workplace culture excellence.",
    bio_id: "Eksekutif senior kesehatan dengan keahlian industri mendalam yang memastikan Global Paro memenuhi standar tertinggi rekrutmen etis dan keunggulan budaya kerja.",
    category: "core",
    categoryLabel_en: "Core Team",
    categoryLabel_id: "Tim Inti",
  },
  {
    firstName: "MEGAWATI",
    lastName: "Santoso",
    role_en: "Strategic Business",
    role_id: "Bisnis Strategis",
    bio_en: "Strategic business leader driving Global Paro's partnerships, market expansion, and organizational growth across key healthcare markets in the Asia-Pacific region.",
    bio_id: "Pemimpin bisnis strategis yang mendorong kemitraan Global Paro, ekspansi pasar, dan pertumbuhan organisasi di pasar kesehatan utama di kawasan Asia-Pasifik.",
    category: "core",
    categoryLabel_en: "Core Team",
    categoryLabel_id: "Tim Inti",
  },
  {
    firstName: "Dr. TIMOTHY",
    lastName: "Low",
    role_en: "Board Advisor",
    role_id: "Penasihat Dewan",
    bio_en: "Executive VP at QuikBot Technologies. Former CEO & Board Director at Temasek Holdings. Brings extensive healthcare leadership and strategic partnership experience across Asia.",
    bio_id: "Wakil Presiden Eksekutif di QuikBot Technologies. Mantan CEO & Direktur Dewan di Temasek Holdings. Membawa pengalaman kepemimpinan kesehatan dan kemitraan strategis yang luas.",
    category: "advisor",
    categoryLabel_en: "Board Advisor",
    categoryLabel_id: "Penasihat Dewan",
  },
  {
    firstName: "Prof. AGUS",
    lastName: "Setiawan",
    role_en: "Independent Board Advisor",
    role_id: "Penasihat Dewan Independen",
    bio_en: "Distinguished Professor at the Faculty of Nursing, University of Indonesia. Brings deep expertise in nursing education, community health, and talent development.",
    bio_id: "Profesor terkemuka di Fakultas Keperawatan, Universitas Indonesia. Membawa keahlian mendalam dalam pendidikan keperawatan, kesehatan komunitas, dan pengembangan talenta.",
    category: "advisor",
    categoryLabel_en: "Independent Board Advisor",
    categoryLabel_id: "Penasihat Dewan Independen",
  },
  {
    firstName: "LIA",
    lastName: "Retnani",
    role_en: "Board Advisor – Pharma & Digital",
    role_id: "Penasihat Dewan – Farmasi & Digital",
    bio_en: "Marketing Lead at APL, a Zuellig Pharma Company. Former Digital Marketing & Omnichannel Strategy at Boehringer Ingelheim. Expert in healthcare marketing and digital innovation.",
    bio_id: "Pemimpin Pemasaran di APL, perusahaan Zuellig Pharma. Mantan Strategi Pemasaran Digital & Omnichannel di Boehringer Ingelheim. Ahli pemasaran kesehatan dan inovasi digital.",
    category: "advisor",
    categoryLabel_en: "Board Advisor – Pharma",
    categoryLabel_id: "Penasihat Dewan – Farmasi",
  },
];

// Different gradient per row to distinguish core vs advisor
const coreGradient = "from-primary to-accent";
const advisorGradient = "from-accent to-primary";

export default function Team() {
  const { lang, t } = useTranslation();

  return (
    <Layout>
      {/* ── Hero Banner ── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(198 80% 22%) 50%, hsl(var(--accent)) 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/2 translate-x-1/3"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 translate-y-1/2 -translate-x-1/4"
          style={{ background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)' }} />

        <div className="relative container text-center z-10">
          <p className="text-sm font-bold tracking-widest uppercase text-primary-foreground/70 mb-3">
            {lang === "id" ? "Tim Kami" : "Our People"}
          </p>
          <h1 className="text-5xl lg:text-7xl font-black font-heading text-primary-foreground mb-4 leading-none">
            Our <span style={{ color: 'hsl(var(--mint, var(--accent)))' }}>TEAM</span>
          </h1>
          <p className="text-lg text-primary-foreground/85 max-w-2xl mx-auto">
            {lang === "id"
              ? "Dipimpin oleh para pakar industri global, penasihat kesehatan, dan profesional berdedikasi yang bersatu untuk memberdayakan perawat Indonesia."
              : "Led by global industry experts, healthcare advisors, and dedicated professionals united to empower Indonesian nurses worldwide."}
          </p>
        </div>
      </section>

      {/* ── 6-Member Grid ── */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {/* Section label row 1 */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
              {lang === "id" ? "Tim Inti" : "Core Team"}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Row 1: Core Team */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {members.filter(m => m.category === "core").map((person) => (
              <MemberCard key={person.firstName} person={person} lang={lang} gradientClass={coreGradient} />
            ))}
          </div>

          {/* Section label row 2 */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ backgroundColor: 'hsl(var(--accent) / 0.1)', color: 'hsl(var(--accent))' }}>
              {lang === "id" ? "Penasihat Dewan" : "Board Advisors"}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Row 2: Advisors */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {members.filter(m => m.category === "advisor").map((person) => (
              <MemberCard key={person.firstName} person={person} lang={lang} gradientClass={advisorGradient} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Values Strip ── */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              { num: "6", label: lang === "id" ? "Anggota Tim" : "Team Members" },
              { num: "3", label: lang === "id" ? "Negara Tujuan" : "Target Countries" },
              { num: "20+", label: lang === "id" ? "Tahun Pengalaman" : "Years Experience" },
              { num: "100%", label: lang === "id" ? "Didedikasikan" : "Dedicated" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black font-heading" style={{ color: 'hsl(var(--accent))' }}>{stat.num}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Mission CTA ── */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)' }}
      >
        <div className="container text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground mb-4">{t.team.joinMission}</h2>
          <p className="text-primary-foreground/90 max-w-xl mx-auto mb-8">{t.team.joinMissionDesc}</p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">{t.common.registerNow} <ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}

function MemberCard({ person, lang, gradientClass }: { person: Member; lang: string; gradientClass: string }) {
  const initials = person.firstName.replace("Dr. ", "").replace("Prof. ", "").split(" ")[0].slice(0, 2);

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden group hover:border-accent/40 hover:shadow-lg transition-all duration-300">
      {/* Avatar Area */}
      <div className="relative pt-8 pb-4 flex flex-col items-center"
        style={{ background: 'hsl(var(--muted))' }}>
        <div className={`h-24 w-24 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg mb-3 group-hover:scale-105 transition-transform duration-300`}>
          <span className="text-3xl font-black text-white font-heading">{initials}</span>
        </div>
        {/* LinkedIn icon (placeholder) */}
        <a
          href={person.linkedIn ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
          style={{ backgroundColor: 'hsl(var(--accent) / 0.15)', color: 'hsl(var(--accent))' }}
          aria-label={`${person.firstName} LinkedIn`}
          onClick={(e) => { if (!person.linkedIn) e.preventDefault(); }}
        >
          <Linkedin className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h3 className="font-black font-heading text-lg leading-tight mb-0.5">
          <span style={{ color: 'hsl(var(--primary))' }}>{person.firstName}</span>{" "}
          <span className="text-foreground font-normal">{person.lastName}</span>
        </h3>
        <Badge
          className="mb-3 text-xs font-semibold"
          style={{
            backgroundColor: 'hsl(var(--accent) / 0.12)',
            color: 'hsl(var(--accent))',
            border: '1px solid hsl(var(--accent) / 0.3)'
          }}
        >
          {lang === "id" ? person.role_id : person.role_en}
        </Badge>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {lang === "id" ? person.bio_id : person.bio_en}
        </p>
      </div>
    </div>
  );
}
