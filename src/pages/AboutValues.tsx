import { Layout } from "@/components/layout/Layout";
import { JoinMissionBanner } from "@/components/about/JoinMissionBanner";
import { Check } from "lucide-react";

const values = [
  {
    num: "1",
    letter: "P",
    word: "ASSION",
    full: "PASSION",
    desc: "We are driven by a deep passion for improving the lives of nurses and the communities they serve globally.",
  },
  {
    num: "2",
    letter: "A",
    word: "CCOUNTABILITY",
    full: "ACCOUNTABILITY",
    desc: "We take ownership of our commitments to nurses, employers, and partners — holding ourselves to the highest standards.",
  },
  {
    num: "3",
    letter: "R",
    word: "ESILIENCE",
    full: "RESILIENCE",
    desc: "We embrace challenges as opportunities, persisting through obstacles to create lasting pathways for international nursing careers.",
  },
  {
    num: "4",
    letter: "O",
    word: "PPORTUNITY",
    full: "OPPORTUNITY",
    desc: "We believe every nurse deserves equal access to global opportunities, regardless of their background or location.",
  },
];

export default function AboutValues() {
  return (
    <Layout>
      {/* Hero & Main Content */}
      <section className="py-20 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN */}
            <div className="flex flex-col items-start">
              {/* Big checkmark icon */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-lg"
                style={{ backgroundColor: "#015779" }}
              >
                <Check className="h-12 w-12 text-white" strokeWidth={3} />
              </div>

              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Core
              </p>
              <h1 className="font-black text-foreground leading-none mb-6" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
                <span className="text-foreground">Core </span>
                <span style={{ color: "#03989E" }}>VALUES</span>
              </h1>

              <div
                className="w-16 h-1 rounded-full mb-8"
                style={{ backgroundColor: "#03989E" }}
              />

              <blockquote className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                "Talent is{" "}
                <span className="uppercase" style={{ color: "#03989E" }}>EVERYWHERE</span>
                ,<br />
                opportunity is not."
              </blockquote>

              <p className="text-muted-foreground mt-4 leading-relaxed">
                Our values are the foundation of every decision we make. They guide how we work with nurses, partners, and the global healthcare community.
              </p>
            </div>

            {/* RIGHT COLUMN — 4 value items */}
            <div className="space-y-6">
              {values.map((v) => (
                <div
                  key={v.num}
                  className="flex items-start gap-5 p-6 rounded-xl border border-border hover:shadow-md transition-shadow bg-card"
                >
                  {/* Number badge */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white"
                    style={{ background: "linear-gradient(135deg, #03989E, #015779)" }}
                  >
                    {v.num}
                  </div>
                  <div>
                    {/* Drop-cap style title */}
                    <h3 className="text-2xl font-black text-foreground leading-none mb-2">
                      <span style={{ color: "#03989E", fontSize: "2rem" }}>{v.letter}</span>
                      <span className="text-foreground">{v.word}</span>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* "Nurses are the heart" banner — like image-13 */}
      <section
        className="py-10 px-6"
        style={{ backgroundColor: "#03989E" }}
      >
        <div className="container max-w-6xl mx-auto text-center">
          <p className="text-white font-black text-xl md:text-3xl tracking-widest uppercase">
            Nurses Are The Heart Of Healthcare
          </p>
        </div>
      </section>

      <JoinMissionBanner />
    </Layout>
  );
}
