import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";

const leadership = [
  { name: "DUMA Evi", role: "Founder", bio_en: "Visionary founder leading Global Paro's mission to bridge healthcare talents with international opportunities through ethical recruitment and AI-powered solutions.", bio_id: "Pendiri visioner yang memimpin misi Global Paro untuk menjembatani talenta kesehatan dengan peluang internasional melalui rekrutmen etis dan solusi berbasis AI." },
  { name: "REI Lim", role: "Market Development", bio_en: "EMBA and licensed pharmacist with expertise in enterprise SaaS, AI sales, and healthcare advisory. Director, Lifesciences at Ethos BeathChapman. Founder of Pharminex, 2x Startup Acquisition. Led APAC digital & omnichannel at AstraZeneca, Zuellig Pharma.", bio_id: "EMBA dan apoteker berlisensi dengan keahlian di SaaS enterprise, penjualan AI, dan konsultasi kesehatan. Direktur, Lifesciences di Ethos BeathChapman. Pendiri Pharminex, 2x Akuisisi Startup." },
  { name: "ANN MARIE Christopher", role: "Key Appointment Holder", bio_en: "Senior healthcare executive bringing deep industry expertise and strategic leadership to ensure Global Paro meets the highest standards of ethical recruitment.", bio_id: "Eksekutif senior kesehatan yang membawa keahlian industri mendalam dan kepemimpinan strategis untuk memastikan Global Paro memenuhi standar tertinggi rekrutmen etis." },
];

const advisors = [
  { name: "Prof. Agus Setiawan", nickname: "AGUS", role_en: "Nurse Talent Communities", role_id: "Komunitas Talenta Perawat", bio_en: "A distinguished community health nurse Professor at the Faculty of Nursing, University of Indonesia. Brings deep expertise in nursing education and community health.", bio_id: "Profesor keperawatan komunitas terkemuka di Fakultas Keperawatan, Universitas Indonesia. Membawa keahlian mendalam dalam pendidikan keperawatan dan kesehatan masyarakat." },
  { name: "Timothy Low", nickname: "TIM", role_en: "Healthcare Provider Communities", role_id: "Komunitas Penyedia Layanan Kesehatan", bio_en: "Executive VP at QuikBot Technologies. Former CEO & Board Director at Temasek Holdings. Brings extensive healthcare leadership and strategic partnership experience.", bio_id: "Wakil Presiden Eksekutif di QuikBot Technologies. Mantan CEO & Direktur Dewan di Temasek Holdings. Membawa pengalaman kepemimpinan kesehatan dan kemitraan strategis yang luas." },
  { name: "Auliana Idi Retnani", nickname: "LIA", role_en: "Digital Marketing & Omnichannel Strategy", role_id: "Strategi Pemasaran Digital & Omnichannel", bio_en: "Marketing Lead at APL, a Zuellig Pharma Company. Former Digital Marketing & Omnichannel Strategy at Boehringer Ingelheim. Expert in strategic marketing and innovation in healthcare.", bio_id: "Pemimpin Pemasaran di APL, perusahaan Zuellig Pharma. Mantan Strategi Pemasaran Digital & Omnichannel di Boehringer Ingelheim. Ahli pemasaran strategis dan inovasi dalam kesehatan." },
];

export default function Team() {
  const { lang, t } = useTranslation();

  return (
    <Layout>
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-4">{t.team.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">{t.team.subtitle}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-4 text-center">{t.team.leadership}</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">{t.team.healthcareStrategy}</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((person) => (
              <div key={person.name} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                <div className="h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-extrabold text-accent">{person.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
                </div>
                <h3 className="font-bold text-foreground text-lg">{person.name}</h3>
                <p className="text-sm font-medium text-accent mb-3">{person.role}</p>
                <p className="text-sm text-muted-foreground">{lang === "id" ? person.bio_id : person.bio_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-extrabold text-foreground mb-12 text-center">{t.team.advisors}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {advisors.map((person) => (
              <div key={person.name} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-extrabold text-primary">{person.nickname?.[0] || person.name[0]}</span>
                </div>
                <h3 className="font-bold text-foreground text-lg">{person.name}</h3>
                {person.nickname && <p className="text-xs text-muted-foreground mb-1">({person.nickname})</p>}
                <p className="text-sm font-medium text-accent mb-3">{lang === "id" ? person.role_id : person.role_en}</p>
                <p className="text-sm text-muted-foreground">{lang === "id" ? person.bio_id : person.bio_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-hero">
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
