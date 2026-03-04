import { CheckCircle, XCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "@/i18n/LanguageContext";
import { JoinMissionBanner } from "@/components/about/JoinMissionBanner";
import logoIcon from "@/assets/logo-icon.png";
import nursesPair from "@/assets/nurses-pair.png";

export default function About() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* "About Us" label above */}
        <div
          className="relative z-10 pt-10 pb-4 text-center"
          style={{ background: "linear-gradient(90deg, #015779 50%, #03989E 50%)" }}
        >
          <span
            className="inline-block px-5 py-1.5 rounded-full text-xs font-black tracking-[0.2em] uppercase"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            About Us
          </span>
        </div>

        {/* Split BG + Card */}
        <div
          className="relative"
          style={{ background: "linear-gradient(90deg, #015779 50%, #03989E 50%)" }}
        >
          <div className="container relative z-10 px-4 pb-0 pt-2">
            {/* Glass card */}
            <div
              className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
              style={{ background: "rgba(255,255,255,0.96)" }}
            >
              <div className="flex flex-col md:flex-row min-h-[340px]">
                {/* LEFT — branding + text */}
                <div className="flex flex-col justify-center gap-5 p-8 md:p-10 md:w-1/2">
                  <div className="flex items-center gap-3">
                    <img src={logoIcon} alt="Global Paro" className="h-10 w-10" />
                    <span className="font-heading font-black text-2xl">
                      Global{" "}
                      <span style={{ color: "#03989E" }}>PARO</span>
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-gray-600">
                    Global PARO empowers every international nurse with the tools, guidance, and global network needed to build a thriving career abroad — ethically, affordably, and with confidence.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm font-semibold" style={{ color: "#015779" }}>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#03989E" }} />
                      Ethical Recruitment
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#03989E" }} />
                      AI-Powered Platform
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#03989E" }} />
                      Global Network
                    </span>
                  </div>
                </div>

                {/* RIGHT — nurses photo */}
                <div className="hidden md:block md:w-1/2 relative overflow-hidden rounded-r-2xl">
                  <img
                    src={nursesPair}
                    alt="Nurses"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.75 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(3,152,158,0.15) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* White strip */}
            <div className="mx-auto w-full max-w-4xl h-2 bg-white opacity-80 rounded-b" />
          </div>

          {/* 2 color blocks below card */}
          <div className="flex" style={{ marginTop: 0 }}>
            <div className="w-1/2 h-14" style={{ background: "#03989E" }} />
            <div className="w-1/2 h-14" style={{ background: "#015779" }} />
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

      {/* Know the Difference */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-black font-heading text-foreground mb-2 text-center">{t.about.knowDifference}</h2>
          <p className="text-muted-foreground text-center mb-12">Know the red flags from green flags when choosing a recruitment partner.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-6 border-2" style={{ borderColor: "hsl(var(--destructive) / 0.4)" }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "hsl(var(--destructive) / 0.1)" }}>
                  <XCircle className="h-5 w-5" style={{ color: "hsl(var(--destructive))" }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: "hsl(var(--destructive))" }}>🚩 {t.about.redFlags}</h3>
              </div>
              <ul className="space-y-3">
                {t.about.redFlagsList.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <XCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--destructive))" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-6 border-2" style={{ borderColor: "hsl(var(--accent) / 0.4)" }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "hsl(var(--accent) / 0.1)" }}>
                  <CheckCircle className="h-5 w-5" style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: "hsl(var(--accent))" }}>✅ {t.about.greenFlags}</h3>
              </div>
              <ul className="space-y-3">
                {t.about.greenFlagsList.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "hsl(var(--accent))" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <JoinMissionBanner />
    </Layout>
  );
}
