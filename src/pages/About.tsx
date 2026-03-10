import { CheckCircle, Globe, Target, TrendingUp, Users, Star, Eye } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";
import { JoinMissionBanner } from "@/components/about/JoinMissionBanner";
import logoIcon from "@/assets/logo-icon-3d.png";
import nursesPair from "@/assets/nurses-pair.png";
import missionCards from "@/assets/mission-cards.png";
import checkmarkIcon from "@/assets/values-checkmark.png";
import valuesTitle from "@/assets/values-title.png";
import valuesList from "@/assets/values-list.png";
import valuesBanner from "@/assets/values-banner.png";
import teamLogoIcon from "@/assets/team-logo-icon.png";
import teamArrow from "@/assets/team-arrow.png";
import teamHeroBar from "@/assets/team-hero-bar.png";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import dumaPhoto from "@/assets/team-duma.png";
import annPhoto from "@/assets/team-ann.png";
import timothyPhoto from "@/assets/team-timothy.png";
import agusPhoto from "@/assets/team-agus.png";
import liaPhoto from "@/assets/team-lia.png";
import qrDuma from "@/assets/qr-duma.png";
import qrAnn from "@/assets/qr-ann.png";
import qrTimothy from "@/assets/qr-timothy.png";
import qrAgus from "@/assets/qr-agus.png";
import qrLia from "@/assets/qr-lia.png";

interface Member {
  firstName: string;
  lastName: string;
  role_en: string;
  role_id: string;
  linkedIn?: string;
  photo?: string;
  hasPhoto: boolean;
  qr?: string;
}

const members: Member[] = [
  { firstName: "DUMA", lastName: "Evi", role_en: "Founder", role_id: "Pendiri", photo: dumaPhoto, hasPhoto: true, qr: qrDuma },
  { firstName: "ANN", lastName: "Marie C", role_en: "Workplace Culture Nurse Expert", role_id: "Ahli Budaya Kerja Keperawatan", photo: annPhoto, hasPhoto: true, qr: qrAnn },
  { firstName: "MEGAWATI", lastName: "Santoso", role_en: "Strategic Business", role_id: "Bisnis Strategis", linkedIn: "https://www.linkedin.com/in/megasantoso/", hasPhoto: false },
  { firstName: "Dr. TIMOTHY", lastName: "Low", role_en: "Board Advisor – ex CEO Gleneagles Hospital & Farrer Park Hospital", role_id: "Penasihat Dewan – eks CEO Gleneagles Hospital & Farrer Park Hospital", photo: timothyPhoto, hasPhoto: true, qr: qrTimothy },
  { firstName: "Prof. AGUS", lastName: "Setiawan", role_en: "Independence Board Advisor – ex Dean Faculty of Nurse University of Indonesia", role_id: "Penasihat Dewan Independen – eks Dekan Fakultas Keperawatan UI", photo: agusPhoto, hasPhoto: true, qr: qrAgus },
  { firstName: "LIA", lastName: "Retnani", role_en: "Board Advisor – Pharma Marketing Expert", role_id: "Penasihat Dewan – Ahli Pemasaran Farmasi", photo: liaPhoto, hasPhoto: true, qr: qrLia },
];

export default function About() {
  const { t, lang } = useTranslation();
  const icons = [<Globe className="h-7 w-7" />, <Target className="h-7 w-7" />, <TrendingUp className="h-7 w-7" />];

  return (
    <Layout>
      {/* ── SECTION 1: Global Paro Hero ── */}
      <section id="global-paro" className="relative overflow-hidden">
        {/* Split navy (left) / teal (right) full-bleed background */}
        <div className="absolute inset-0 z-0 flex">
          <div className="w-[55%] h-full" style={{ backgroundColor: "#015779" }} />
          <div className="w-[45%] h-full" style={{ backgroundColor: "#03989E" }} />
        </div>

        <div className="relative z-10 py-10 md:py-14 lg:py-20">
          <div className="container px-4 md:px-6 lg:px-8">
            {/* Large white card — takes almost full container width */}
            <div
              className="w-full rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ background: "rgba(255,255,255,0.97)", minHeight: "320px" }}
            >

              {/* Content — left side only */}
              <div className="relative z-10 flex flex-col justify-center gap-5 p-8 md:p-12 lg:p-14 max-w-xl">
                {/* Logo: icon + text — keduanya sama tinggi */}
                <div className="flex items-center gap-4 md:gap-5">
                  <img
                    src={logoIcon}
                    alt="Global PARO Icon"
                    className="object-contain shrink-0"
                    style={{ width: "clamp(3rem, 8vw, 6rem)", height: "clamp(3rem, 8vw, 6rem)" }}
                  />
                  <h1
                    className="font-black font-heading leading-none tracking-tight"
                    style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                  >
                    <span style={{ color: "#015779" }}>Global </span>
                    <span style={{ color: "#03989E" }}>PARO</span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg leading-loose text-gray-600 text-justify" style={{ maxWidth: "480px" }}>
                  {t.about.heroDesc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {(lang === "id" ? t.about.heroTagsId : t.about.heroTags).map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#03989E" }}>
                      <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ background: "#03989E" }} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy Banner */}
      <section className="py-12" style={{ backgroundColor: "hsl(var(--primary))" }}>
        <div className="container text-center">
          <p className="text-2xl lg:text-3xl font-black font-heading text-primary-foreground italic">
            "{t.about.brandPhilosophy}"
          </p>
          <p className="text-primary-foreground/70 mt-2 text-sm">{t.about.brandPhilosophyDesc}</p>
        </div>
      </section>

      {/* ── SECTION 2: Vision ── */}
      <section id="vision">
        {/* Vision Hero */}
        <div className="py-20 px-6" style={{ background: "linear-gradient(135deg, #03989E 0%, #015779 100%)" }}>
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3 flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h2 className="font-black text-white leading-none mb-2" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", letterSpacing: "-0.03em" }}>
                  {t.about.visionSectionTitle}
                </h2>
                <div className="w-16 h-1 bg-white/50 rounded-full mt-2" />
              </div>
              <div className="md:w-2/3">
                <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6">
                  {t.about.visionStatement}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Quote */}
        <div className="py-16 px-6 bg-background">
          <div className="container max-w-6xl mx-auto">
            <div className="rounded-2xl p-8 md:p-12 border-l-4 relative overflow-hidden" style={{ borderColor: "#03989E", backgroundColor: "hsl(var(--muted))" }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: "#03989E", transform: "translate(30%, -30%)" }} />
              <Globe className="h-10 w-10 mb-6 opacity-60" style={{ color: "#03989E" }} />
              <blockquote className="text-2xl md:text-3xl font-bold text-foreground leading-snug mb-6 max-w-3xl italic">
                "{t.about.visionQuote}"
              </blockquote>
              <p className="text-muted-foreground text-sm font-semibold uppercase tracking-widest">{t.about.visionQuoteAttr}</p>
            </div>
          </div>
        </div>

        {/* Vision Pillars */}
        <div className="py-16 px-6" style={{ backgroundColor: "hsl(var(--card))" }}>
          <div className="container max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black text-center mb-12 text-foreground">{t.about.visionPillarsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.about.visionPillars.map((p, i) => (
                <div key={p.title} className="rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#03989E20", color: "#03989E" }}>
                    {icons[i]}
                  </div>
                  <h4 className="font-bold text-lg text-foreground mb-2">{p.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="py-14 px-6 bg-background">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {t.about.visionStats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl font-black mb-1" style={{ color: "#03989E" }}>{s.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Cards */}
        <div className="py-16 px-6" style={{ backgroundColor: "hsl(var(--card))" }}>
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #03989E, #015779)" }}>
                <Star className="h-8 w-8 mb-4 opacity-80" />
                <h4 className="text-xl font-bold mb-3">{t.about.visionForNurses}</h4>
                <p className="text-white/85 leading-relaxed">{t.about.visionForNursesCard}</p>
              </div>
              <div className="rounded-2xl p-8 border-2 border-foreground/10">
                <Users className="h-8 w-8 mb-4" style={{ color: "#03989E" }} />
                <h4 className="text-xl font-bold mb-3 text-foreground">{t.about.visionForHealthcare}</h4>
                <p className="text-muted-foreground leading-relaxed">{t.about.visionForHealthcareCard}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Mission ── */}
      <section id="mission" className="py-16 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="font-black leading-none" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", letterSpacing: "-0.03em", color: "#03989E" }}>
              {t.about.missionSectionTitle}
            </h2>
            <div className="w-16 h-1 rounded-full mt-3" style={{ backgroundColor: "#03989E" }} />
          </div>
          <div className="w-full min-h-[220px] sm:min-h-[300px] md:min-h-[380px]">
            <img src={missionCards} alt={t.about.missionImgAlt} className="w-full h-full object-contain" style={{ minHeight: "220px" }} />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Values ── */}
      <section id="values" className="py-16 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start">
              <img src={checkmarkIcon} alt={t.about.valuesImgAlt} className="w-48 h-48 object-contain mb-4" />
              <img src={valuesTitle} alt={t.about.valuesImgAlt} className="w-full max-w-sm object-contain mb-4" />
              <p className="text-foreground text-base">
                {t.about.valuesTagline}
                <span className="underline font-semibold">{t.about.valuesTaglineHighlight}</span>
                {t.about.valuesTaglineEnd}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img src={valuesList} alt={t.about.valuesListImgAlt} className="w-full max-w-md object-contain" />
            </div>
          </div>
        </div>
      </section>
      <div className="w-full">
        <img src={valuesBanner} alt={t.about.valuesBannerAlt} className="w-full object-cover" style={{ maxHeight: "80px" }} />
      </div>

      {/* ── SECTION 5: Team ── */}
      <section id="team">
        {/* Team Hero */}
        <div className="relative overflow-hidden" style={{ backgroundColor: "#03989E" }}>
          <img src={teamHeroBar} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" aria-hidden="true" />
          <div className="relative z-10 py-8 lg:py-10">
            <div className="container flex items-center justify-center gap-6">
              <div className="hidden md:block h-16 w-32 lg:w-48 rounded-sm" style={{ backgroundColor: "#03989E" }} />
              <div className="flex items-center gap-3">
                <img src={logoIcon} alt="Global Paro" className="h-12 w-12 object-contain" />
                <h2 className="text-5xl lg:text-6xl font-black font-heading text-white tracking-tight">
                  <span className="italic">ur</span> <span style={{ color: "#015779" }}>TEAM</span>
                </h2>
              </div>
              <div className="hidden md:block h-16 w-32 lg:w-48 rounded-sm" style={{ backgroundColor: "#03989E" }} />
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="py-12 bg-white">
          <div className="container max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
              {members.map((person, i) => (
                <MemberCard key={person.firstName} person={person} lang={lang} index={i} />
              ))}
            </div>
            <div className="flex items-center justify-center py-3" style={{ backgroundColor: "#015779" }}>
              <span className="text-white text-sm font-medium tracking-wide">www.GlobalParo.com</span>
            </div>
          </div>
        </div>
      </section>

      <JoinMissionBanner />
    </Layout>
  );
}

function MemberCard({ person, lang, index }: { person: Member; lang: string; index: number }) {
  const isBottomRow = index >= 3;
  const col = index % 3;
  const showRightBorder = col < 2;
  const showBottomBorder = !isBottomRow;

  return (
    <div
      className="bg-white flex flex-col"
      style={{
        borderRight: showRightBorder ? "1px solid #e5e7eb" : "none",
        borderBottom: showBottomBorder ? "1px solid #e5e7eb" : "none",
      }}
    >
      <div className="relative flex items-center justify-center pt-8 pb-4 px-6 bg-white min-h-[200px]">
        {person.hasPhoto && person.photo ? (
          <img src={person.photo} alt={`${person.firstName} ${person.lastName}`} className="w-48 h-40 object-contain" />
        ) : (
          <div className="relative flex items-center justify-center">
            <img src={teamLogoIcon} alt="Global Paro" className="w-32 h-32 object-contain opacity-60" />
          </div>
        )}
        <img src={teamArrow} alt="" className="absolute bottom-6 right-8 w-6 h-6 object-contain" aria-hidden="true" />
      </div>
      <div className="px-4 pb-5 flex items-start gap-3">
        {person.qr ? (
          <img src={person.qr} alt={`${person.firstName} LinkedIn QR`} className="shrink-0 w-12 h-12 object-contain rounded" />
        ) : (
          <div className="shrink-0 w-12 h-12 rounded border-2 flex items-center justify-center opacity-30" style={{ borderColor: "#015779" }}>
            <span className="text-xs font-bold" style={{ color: "#015779" }}>QR</span>
          </div>
        )}
        <div className="self-stretch w-0.5 rounded-full shrink-0" style={{ backgroundColor: "#015779" }} />
        <div className="min-w-0">
          <p className="font-black font-heading text-base leading-tight">
            <span style={{ color: "#03989E" }}>{person.firstName}</span>{" "}
            <span style={{ color: "#015779" }}>{person.lastName}</span>
          </p>
          <p className="text-xs text-gray-500 leading-snug mt-0.5">{lang === "id" ? person.role_id : person.role_en}</p>
          {person.linkedIn && (
            <a href={person.linkedIn} target="_blank" rel="noopener noreferrer" className="text-xs underline mt-1 block" style={{ color: "#03989E" }}>
              {person.linkedIn}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
