import { Layout } from "@/components/layout/Layout";
import { JoinMissionBanner } from "@/components/about/JoinMissionBanner";
import checkmarkIcon from "@/assets/values-checkmark.png";
import valuesTitle from "@/assets/values-title.png";
import valuesList from "@/assets/values-list.png";
import valuesBanner from "@/assets/values-banner.png";

export default function AboutValues() {
  return (
    <Layout>
      <section className="py-16 px-6 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* LEFT: checkmark + Core VALUES title + tagline */}
            <div className="flex flex-col items-start">
              <img
                src={checkmarkIcon}
                alt="Core Values checkmark"
                className="w-48 h-48 object-contain mb-4"
              />
              <img
                src={valuesTitle}
                alt="Core VALUES"
                className="w-full max-w-sm object-contain mb-4"
              />
              <p className="text-foreground text-base">
                Talent is <span className="underline font-semibold">EVERYWHERE,</span> opportunity is not.
              </p>
            </div>

            {/* RIGHT: values list image */}
            <div className="flex items-center justify-center">
              <img
                src={valuesList}
                alt="P.A.R.O. Values: Passion, Accountability, Resilience, Opportunity"
                className="w-full max-w-md object-contain"
              />
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
