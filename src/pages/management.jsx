import CEO from "../assets/img/management-ceo.webp";
import DIRECTOR from "../assets/img/management-jaji-main-image.webp";
import JAJI from "../assets/img/management-jaji.webp";
import jaji1 from "../assets/img/management-jajis.webp";
import jaji2 from "../assets/img/management-jajis1.webp";
import jaji3 from "../assets/img/management-jajis2.webp";

export default function Management() {
  return (
    <div className="w-full text-gray-800 ">
      {/* ================= HERO / PARALLAX BANNER ================= */}
      <div
        className="relative h-[100vh] mt-12 w-full bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${jaji2})`,
        }}
      >
        <div className="absolute inset-0 bg-black/65">
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Management
            </h1>
            <p className="text-gray-200 mt-4 max-w-2xl">
              The visionaries shaping the future of Jaji’s Innovation
            </p>
          </div>
        </div>
      </div>

      {/* ================= FOUNDER SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src={JAJI}
            alt="Dr. Jajimole K Founder of Jajis Innovation"
            className="rounded-2xl shadow-xl object-cover w-full h-[480px]"
          />

          <div className="text-justify">
            <h2 className="text-3xl font-bold mb-4">Dr. Jajimole K</h2>
            <p className="text-lg font-semibold text-gray-600 mb-4">
              Founder & Director, Jaji’s Innovation Pvt Ltd
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Dr. Jajimole K is the visionary force and guiding spirit behind
              Jaji’s Innovation Pvt Ltd, a multi-brand beauty, wellness, and
              lifestyle company that has transformed Kerala’s beauty industry
              over the past two decades.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              Trained at reputed international institutes, she developed a
              philosophy that blends clinical precision with artistic creativity
              — a concept widely known as{" "}
              <strong>“The Beautiful Science.”</strong>
            </p>

            <p className="text-gray-600 leading-relaxed">
              Under her leadership, Jaji’s Innovation has expanded into luxury
              unisex salons, kids’ salons, cafés, food courts, cosmetic and
              skincare lines, and upcoming luxe skin & hair clinics, employing
              over 150+ professionals.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PARALLAX BREAK SECTION ================= */}
      <div
        className="relative h-[50vh] w-full bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${jaji1})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center px-6">
          <p className="text-white text-2xl md:text-3xl font-semibold max-w-4xl">
            “Beauty is not just appearance, but confidence, wellness, and
            empowerment.”
          </p>
        </div>
      </div>

      {/* ================= NEXT GENERATION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
          The Next Generation of Leadership
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* ===== KEERTHI SUNIL ===== */}
          <div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="relative h-[420px] w-full">
              <img
                src={DIRECTOR}
                alt="Keerthi Sunil Director Jajis Innovation"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Keerthi Sunil</h3>
              <p className="text-gray-500 font-medium mb-4">
                Director — “The Next Jaji”
              </p>
              <p className="text-gray-600 leading-relaxed text-sm text-justify">
                A talented makeup and nail artist with dual Master’s degrees in
                Business Management and English Literature, Keerthi blends
                artistic expression with strategic insight. Carrying forward her
                mother’s legacy, she ensures Jaji’s Innovation remains a modern
                creative hub rooted in excellence.
              </p>
            </div>
          </div>

          {/* ===== KARTHIK SUNIL ===== */}
          <div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="relative h-[420px] w-full">
              <img
                src={CEO}
                alt="Karthik Sunil Creative Director"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">Karthik Sunil</h3>
              <p className="text-gray-500 font-medium mb-4">
                Creative Director — “The Art of Transformation”
              </p>
              <p className="text-gray-600 leading-relaxed text-sm text-justify">
                With a Master’s in Entrepreneurship & Innovation Management from
                Loughborough University and Vidal Sassoon certification, Karthik
                brings global expertise to advanced hair artistry. His
                experience at Rush UK salons positions him as a leading
                innovator in contemporary styling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TAGLINE ================= */}
      <section className="bg-gray-700 py-16">
        <p className="text-center text-white text-xl md:text-2xl font-semibold max-w-4xl mx-auto px-6">
          “Dr. Jajimole K – Turning Passion into Innovation, and Beauty into
          Confidence.”
        </p>
      </section>
    </div>
  );
}
