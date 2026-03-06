import { Layout } from "@/components/layout/Layout";
import { JoinMissionBanner } from "@/components/about/JoinMissionBanner";
import missionCards from "@/assets/mission-cards.png";

export default function AboutMission() {
  return (
    <Layout>
      <section className="py-16 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          {/* Title */}
          <div className="mb-10">
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
            <div className="w-16 h-1 rounded-full mt-3" style={{ backgroundColor: "#03989E" }} />
          </div>

          {/* Mission cards image */}
          <img
            src={missionCards}
            alt="Mission cards: Providing, Accelerating, Empowering"
            className="w-full object-contain"
          />
        </div>
      </section>

      <JoinMissionBanner />
    </Layout>
  );
}
