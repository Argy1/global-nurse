import { Layout } from "@/components/layout/Layout";
import { JoinMissionBanner } from "@/components/about/JoinMissionBanner";
import { Rocket } from "lucide-react";

const missions = [
  {
    num: "1",
    text: (
      <>
        Providing an{" "}
        <span className="font-black" style={{ color: "#03989E" }}>AFFORDABLE MOBILE</span>{" "}
        platform that nurses can access{" "}
        <span className="font-black" style={{ color: "#03989E" }}>ANYTIME ANYWHERE</span>{" "}
        — removing the barriers of cost and location from international career preparation.
      </>
    ),
  },
  {
    num: "2",
    text: (
      <>
        Accelerating the international career journey for every{" "}
        <span className="font-black" style={{ color: "#03989E" }}>NURSE</span>{" "}
        through an{" "}
        <span className="font-black" style={{ color: "#03989E" }}>AI-powered platform</span>{" "}
        that delivers personalized guidance, language preparation, and licensing support.
      </>
    ),
  },
  {
    num: "3",
    text: (
      <>
        Empowering a sustainable{" "}
        <span className="font-black" style={{ color: "#03989E" }}>GLOBAL ECOSYSTEM</span>{" "}
        by partnering with hospitals, governments, and training institutions to build long-term, ethical nurse mobility pathways.
      </>
    ),
  },
];

export default function AboutMission() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-10 mb-16">
            {/* Left: MISSION label */}
            <div className="md:w-1/3 flex flex-col items-start shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#03989E20" }}
                >
                  <Rocket className="h-6 w-6" style={{ color: "#03989E" }} />
                </div>
              </div>
              <h1
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 6rem)",
                  letterSpacing: "-0.03em",
                  color: "#03989E",
                }}
              >
                MISSION
              </h1>
              <div
                className="w-16 h-1 rounded-full mt-3"
                style={{ backgroundColor: "#03989E" }}
              />
              <p className="text-muted-foreground text-sm mt-6 leading-relaxed max-w-xs">
                Three core commitments that drive everything we do at Global PARO.
              </p>
            </div>

            {/* Right: intro text */}
            <div className="md:w-2/3 pt-2">
              <p className="text-foreground text-lg md:text-xl leading-relaxed">
                Global PARO's mission is built on three pillars — making nurse career development{" "}
                <strong>accessible</strong>, <strong>accelerated</strong>, and{" "}
                <strong>sustainable</strong> for Indonesian healthcare professionals worldwide.
              </p>
            </div>
          </div>

          {/* Mission Cards */}
          <div className="space-y-6">
            {missions.map((m) => (
              <div
                key={m.num}
                className="relative rounded-2xl border-2 p-8 md:p-10 flex items-start gap-8 hover:shadow-lg transition-shadow"
                style={{ borderColor: "#015779" }}
              >
                {/* Big number */}
                <div
                  className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-black text-white"
                  style={{ background: "linear-gradient(135deg, #03989E, #015779)" }}
                >
                  {m.num}
                </div>
                <p className="text-foreground text-base md:text-lg leading-relaxed pt-2">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JoinMissionBanner />
    </Layout>
  );
}
