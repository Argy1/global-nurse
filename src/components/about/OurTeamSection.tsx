import logoIcon3d from "@/assets/logo-icon-3d.png";
import teamLogoIcon from "@/assets/team-logo-icon.png";
import teamHeroBar from "@/assets/team-hero-bar.png";
import dumaPhoto from "@/assets/team-duma.png";
import liaPhoto from "@/assets/team-lia.png";
import timothyPhoto from "@/assets/team-timothy.png";
import agusPhoto from "@/assets/team-agus.png";
import qrDuma from "@/assets/qr-duma.png";
import qrLia from "@/assets/qr-lia.png";
import qrTimothy from "@/assets/qr-timothy.png";
import qrAgus from "@/assets/qr-agus.png";

interface TeamMember {
  firstName: string;
  lastName: string;
  role: string;
  photo?: string;
  qr?: string;
  linkedIn?: string;
}

const teamMembers: TeamMember[] = [
  {
    firstName: "DUMA",
    lastName: "Evi",
    role: "Founder",
    photo: dumaPhoto,
    qr: qrDuma,
  },
  {
    firstName: "LIA",
    lastName: "Retnani",
    role: "Board Advisor - Pharma Marketing Expert",
    photo: liaPhoto,
    qr: qrLia,
  },
  {
    firstName: "MEGAWATI",
    lastName: "Santoso",
    role: "Strategic Business",
    linkedIn: "https://www.linkedin.com/in/megasantoso/",
  },
  {
    firstName: "Dr. TIMOTHY",
    lastName: "Low",
    role: "Board Advisor - ex CEO Gleneagles Hospital & Farrer Park Hospital",
    photo: timothyPhoto,
    qr: qrTimothy,
  },
  {
    firstName: "Prof. AGUS",
    lastName: "Setiawan",
    role: "Independence Board Advisor - ex Dean Faculty of Nurse University of Indonesia",
    photo: agusPhoto,
    qr: qrAgus,
  },
];

export function OurTeamSection() {
  return (
    <section id="team" className="py-12 md:py-16 bg-[#f2f4f5]" style={{ scrollMarginTop: "80px" }}>
      <div className="relative mb-8 md:mb-10 h-[90px] md:h-[120px] overflow-hidden">
        <img src={teamHeroBar} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logoIcon3d}
            alt="Global Paro"
            className="object-contain shrink-0 -mr-1"
            style={{ width: "clamp(3.5rem, 7vw, 7rem)", height: "clamp(3.5rem, 7vw, 7rem)" }}
          />
          <h2 className="font-black tracking-tight leading-none whitespace-nowrap" style={{ fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)" }}>
            <strong className="font-black" style={{ color: "#015779" }}>ur </strong>
            <strong className="font-black" style={{ color: "#03989E" }}>TEAM</strong>
          </h2>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#d6e7eb] bg-white">
          {teamMembers.map((member) => (
            <article key={`${member.firstName}-${member.lastName}`} className="min-h-[290px] border border-[#d6e7eb] bg-[#f9fbfb]">
              <div className="relative flex items-center justify-center min-h-[150px] pt-5">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-[220px] h-[128px] object-contain"
                  />
                ) : (
                  <img src={teamLogoIcon} alt="Global Paro" className="w-[150px] h-[120px] object-contain" />
                )}
              </div>

              <div className="px-5 pb-5 flex items-start gap-3">
                {member.qr ? (
                  <img src={member.qr} alt={`${member.firstName} QR`} className="w-12 h-12 object-contain shrink-0 mt-1" />
                ) : (
                  <div className="w-12 h-12 shrink-0 mt-1" />
                )}
                <div className="w-0.5 self-stretch bg-[#015779] rounded-full shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-black leading-tight" style={{ fontSize: "clamp(1.35rem, 2.2vw, 2.25rem)" }}>
                    <span style={{ color: "#03989E" }}>{member.firstName}</span>{" "}
                    <span style={{ color: "#1f2937" }}>{member.lastName}</span>
                  </h3>
                  <p className="text-sm text-gray-600 leading-snug mt-1">{member.role}</p>
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs underline mt-1"
                      style={{ color: "#015779" }}
                    >
                      {member.linkedIn}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div className="hidden md:block min-h-[290px] border border-[#d6e7eb] bg-[#f9fbfb]" />
        </div>
      </div>

      <div className="h-11 flex items-center justify-center mt-6 w-full" style={{ backgroundColor: "#015779" }}>
        <span className="text-white text-sm md:text-lg font-medium">www.GlobalParo.com</span>
      </div>
    </section>
  );
}
