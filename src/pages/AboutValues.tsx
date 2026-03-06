import { Layout } from "@/components/layout/Layout";
import { JoinMissionBanner } from "@/components/about/JoinMissionBanner";
import checkmarkIcon from "@/assets/values-checkmark.png";
import valuesBanner from "@/assets/values-banner.png";

const values = [
  {
    num: "1",
    letter: "P",
    word: "ASSION",
    desc: "Purpose mission-driven HCP committed to meaningful care.",
  },
  {
    num: "2",
    letter: "A",
    word: "CCOUNTABILITY",
    desc: "Responsible, ethical, and transparent global career guidance.",
  },
  {
    num: "3",
    letter: "R",
    word: "ESILIENCE",
    desc: "Strength to navigate complex international pathways.",
  },
  {
    num: "4",
    letter: "O",
    word: "PPORTUNITY",
    desc: "Access to regulated and life-changing global careers.",
  },
];

export default function AboutValues() {
  return (
    <Layout>
      {/* Main Content */}
      <section className="py-16 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* LEFT: checkmark + title + quote */}
            <div className="flex flex-col items-start">
              <img
                src={checkmarkIcon}
                alt="Core Values"
                className="w-40 h-40 object-contain mb-6"
              />
              <h1 className="font-black leading-none mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
                <span style={{ color: "#015779" }}>Core </span>
                <span style={{ color: "#03989E" }}>VALUES</span>
              </h1>
              <p className="text-foreground text-base leading-relaxed">
                Talent is{" "}
                <span className="underline font-semibold">EVERYWHERE,</span>{" "}
                opportunity is not.
              </p>
            </div>

            {/* RIGHT: 4 value rows */}
            <div className="space-y-5">
              {values.map((v) => (
                <div key={v.num} className="flex items-start gap-4">
                  {/* Number circle */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-black"
                    style={{ borderColor: "#015779", color: "#015779" }}
                  >
                    {v.num}
                  </div>
                  <div>
                    {/* Drop-cap title */}
                    <h3 className="font-black text-2xl leading-none mb-1">
                      <span style={{ color: "#03989E", fontSize: "2.2rem" }}>{v.letter}</span>
                      <span style={{ color: "#015779" }}>{v.word}</span>
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <div className="w-full">
        <img
          src={valuesBanner}
          alt="Nurses Are The Heart Of Healthcare"
          className="w-full object-cover"
          style={{ maxHeight: "80px" }}
        />
      </div>

      <JoinMissionBanner />
    </Layout>
  );
}
