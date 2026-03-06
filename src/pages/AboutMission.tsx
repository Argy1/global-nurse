import { Layout } from "@/components/layout/Layout";
import { JoinMissionBanner } from "@/components/about/JoinMissionBanner";

const missions = [
  {
    num: "1",
    icon: "💰",
    text: (
      <>
        Providing{" "}
        <span className="font-black" style={{ color: "#03989E" }}>AFFORDABLE MOBILE</span>{" "}
        platform that can be accessed{" "}
        <span className="font-black" style={{ color: "#03989E" }}>ANYTIME ANYWHERE</span>{" "}
        to enable international qualifies
      </>
    ),
  },
  {
    num: "2",
    icon: "🔄",
    text: (
      <>
        Accelerating international career for{" "}
        <span className="font-black" style={{ color: "#03989E" }}>NURSE</span>{" "}
        through a seamless - scalable{" "}
        <span className="font-black" style={{ color: "#03989E" }}>AI-powered platform</span>{" "}
        that simplifies the journey
      </>
    ),
  },
  {
    num: "3",
    icon: "🌐",
    text: (
      <>
        Empowering sustainable{" "}
        <span className="font-black" style={{ color: "#03989E" }}>GLOBAL ECOSYSTEM</span>{" "}
        by partnering & connecting with international key stakeholders
      </>
    ),
  },
];

export default function AboutMission() {
  return (
    <Layout>
      <section className="py-16 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          {/* Header row */}
          <div className="flex flex-col md:flex-row items-start gap-10 mb-14">
            {/* Left: MISSION label */}
            <div className="md:w-1/4 flex flex-col items-start shrink-0">
              <h1
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(3rem, 7vw, 5rem)",
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
              <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                Three core commitments that drive everything we do at Global PARO.
              </p>
            </div>

            {/* Right: intro */}
            <div className="md:w-3/4 pt-2">
              <p className="text-foreground text-lg md:text-xl leading-relaxed">
                Global PARO's mission is built on three pillars — making nurse career
                development <strong>accessible</strong>, <strong>accelerated</strong>, and{" "}
                <strong>sustainable</strong> for Indonesian healthcare professionals worldwide.
              </p>
            </div>
          </div>

          {/* Mission Cards — 3 columns like the slide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missions.map((m) => (
              <div
                key={m.num}
                className="relative rounded-2xl border-2 pt-10 pb-8 px-7 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                style={{ borderColor: "#015779" }}
              >
                {/* Number badge overlapping top border */}
                <div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-xl font-black text-white shadow-md"
                  style={{ background: "linear-gradient(135deg, #03989E, #015779)" }}
                >
                  {m.num}
                </div>
                <p className="text-foreground text-base leading-relaxed mt-2">
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
