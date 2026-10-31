import { useEffect, useState } from "react";
import { API } from "../config/api";
import {
  FaSpa,
  FaChartLine,
  FaTrophy,
  FaChalkboardTeacher,
  FaBullhorn,
  FaHandshake,
  FaStar,
  FaLaptopCode,
  FaRocket,
  FaBuilding,
  FaUser,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCoins,
  FaCheckCircle,
  FaFileContract,
  FaPaperPlane,
  FaInfoCircle,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import saloonBg from "../assets/img/saloon-4.webp";
import storyImg from "../assets/img/saloon-1.webp";
import { PageHero, Btn, Stats, SectionTitle, FeatureList, Split, eyebrow, wrap, sectionPad } from "../components/ui";

export default function Franchise() {
  const [data, setData] = useState({ page: "" });
  const [error, setError] = useState(null);

  // Form State
  const initialFormState = {
    fullName: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    ageGroup: "",
    currentCityDistrict: "",
    state: "",
    occupation: "",
    hasBusinessExp: "",
    businessExpDetails: "",
    hasSalonExp: "",
    applicantType: "",
    preferredCity: "",
    preferredArea: "",
    hasCommercialProperty: "",
    propertySize: "",
    propertyLocationLink: "",
    investmentBudget: "",
    investmentSource: "",
    planToStart: "",
    dailyOperationsInvolvement: "",
    confirmAccurate: false,
    agreeContact: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    API.get("franchise/")
      .then((res) => setData(res.data))
      .catch(() => setError("Failed to load franchise page data"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formError) setFormError("");
  };

  const handleRadioSelect = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mandatory checks verification
    if (
      !formData.fullName ||
      !formData.mobileNumber ||
      !formData.email ||
      !formData.ageGroup ||
      !formData.currentCityDistrict ||
      !formData.state ||
      !formData.occupation ||
      !formData.hasBusinessExp ||
      !formData.hasSalonExp ||
      !formData.applicantType ||
      !formData.preferredCity ||
      !formData.preferredArea ||
      !formData.hasCommercialProperty ||
      !formData.investmentBudget ||
      !formData.investmentSource ||
      !formData.planToStart ||
      !formData.dailyOperationsInvolvement
    ) {
      setFormError(
        "Please fill in all mandatory fields marked with an asterisk (*).",
      );
      const el = document.getElementById("enquiry-form-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (!formData.confirmAccurate || !formData.agreeContact) {
      setFormError("Please accept both declaration checkboxes to proceed.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    const payload = {
      full_name: formData.fullName,
      mobile_number: formData.mobileNumber,
      whatsapp_number: formData.whatsappNumber || null,
      email: formData.email,
      age_group: formData.ageGroup,
      current_city_district: formData.currentCityDistrict,
      state: formData.state,
      occupation: formData.occupation,
      has_business_exp: formData.hasBusinessExp,
      business_exp_details: formData.businessExpDetails || null,
      has_salon_exp: formData.hasSalonExp,
      applicant_type: formData.applicantType,
      preferred_city: formData.preferredCity,
      preferred_area: formData.preferredArea,
      has_commercial_property: formData.hasCommercialProperty,
      property_size: formData.propertySize || null,
      property_location_link: formData.propertyLocationLink || null,
      investment_budget: formData.investmentBudget,
      investment_source: formData.investmentSource,
      plan_to_start: formData.planToStart,
      daily_operations_involvement: formData.dailyOperationsInvolvement,
      confirm_accurate: formData.confirmAccurate,
      agree_contact: formData.agreeContact,
    };

    try {
      await API.post("franchise/", payload);
      setFormSubmitted(true);
      const el = document.getElementById("enquiry-form-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Franchise submission error:", err);
      const serverMsg =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        "Failed to submit franchise enquiry. Please check your inputs or try again.";
      setFormError(serverMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormState);
    setFormSubmitted(false);
    const el = document.getElementById("enquiry-form-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden bg-white text-black pt-24">
      <PageHero
        image={saloonBg}
        alt="Inside a Jaji's salon"
        kicker="Franchise"
        title="Own a Jaji’s salon"
        subtitle="Own a premium beauty brand and build your success with Jaji’s."
      >
        <Btn href="#enquiry-form-section" variant="light">Apply now</Btn>
        <Btn href="tel:+919744012345" variant="ghostLight">Call us</Btn>
      </PageHero>

      <Stats items={[["2002", "Serving Kerala since"], ["7", "Salon locations"], ["1 million+", "Happy customers"]]} />

      <Split image={storyImg} alt="A Jaji's salon reception">
        <p className={eyebrow}>Our journey</p>
        <h2 className="text-3xl md:text-5xl font-light">Crafting excellence since day one</h2>
        <p className="text-gray-700 leading-relaxed">
          Founded with a vision to provide exceptional beauty and lifestyle services, Jaji’s has grown from a small local
          business into a trusted brand serving communities with professionalism and care.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to make beauty and wellness accessible to everyone while maintaining the highest standards of
          quality, hygiene and customer satisfaction.
        </p>
        <dl className="grid sm:grid-cols-2 gap-x-8">
          <div className="border-t border-gray-200 py-5">
            <dt className="text-[0.85rem] font-medium tracking-[0.12em] uppercase">Our mission</dt>
            <dd className="mt-1 text-sm text-gray-600">
              To deliver innovative, high-quality beauty and lifestyle services that enhance confidence and well-being,
              ensuring every client feels valued and beautiful.
            </dd>
          </div>
          <div className="border-t border-gray-200 py-5">
            <dt className="text-[0.85rem] font-medium tracking-[0.12em] uppercase">Our vision</dt>
            <dd className="mt-1 text-sm text-gray-600">
              To be a leading beauty and lifestyle brand known for excellence, innovation and customer satisfaction across
              India.
            </dd>
          </div>
        </dl>
      </Split>

      <section className="bg-gray-100">
        <div className={`${wrap} ${sectionPad}`}>
          <SectionTitle title="Why partner with Jaji’s" sub="A proven beauty brand with strong support, modern systems and growth-focused opportunities." />
          <FeatureList
            items={[
              ["Proven business model"],
              ["Strong brand trust"],
              ["Professional training"],
              ["Marketing support"],
              ["Continuous guidance"],
              ["Premium services"],
              ["Modern systems"],
              ["Growth opportunities"],
            ]}
          />
        </div>
      </section>

      <section id="enquiry-form-section" className="bg-white text-black scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-20 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className={eyebrow}>Official partner programme</p>
            <h2 className="mt-3 text-2xl md:text-4xl">Become a Jaji’s franchise partner</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Jaji’s began its journey in 2002 and has expanded across multiple locations in Kerala. We are now inviting
              passionate entrepreneurs and investors to become part of our growing franchise network.
            </p>
          </div>

          <div className="border border-black p-6 md:p-8 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[0.75rem] tracking-[0.2em] uppercase text-gray-600">Estimated investment</p>
              <p className="mt-2 text-3xl md:text-4xl font-light">₹30 lakhs – ₹50 lakhs</p>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              The final investment may vary depending on the location, outlet size, interior requirements and selected
              franchise model.
            </p>
          </div>

          {/* FORM CONTAINER / SUCCESS CONFIRMATION STATE */}
          {formSubmitted ? (
            <div className="bg-stone-50 border border-gray-300 rounded-2xl p-8 md:p-14 text-center shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-black text-white flex items-center justify-center text-4xl shadow-lg">
                <FaCheck />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                Thank You for Your Enquiry!
              </h3>
              <div className="max-w-2xl mx-auto space-y-4 text-gray-800 text-base md:text-lg leading-relaxed bg-white border border-gray-200 p-6 md:p-8 rounded-xl text-left my-6 shadow-sm">
                <p className="font-semibold text-black">
                  Thank you for your interest in becoming a Jaji’s franchise
                  partner.
                </p>
                <p className="text-gray-700">
                  Our franchise development team will review your application
                  and contact shortlisted applicants for an initial discussion.
                  Submission of this form does not constitute a franchise
                  agreement or guarantee franchise approval.
                </p>
                <hr className="border-gray-200 my-4" />
                <div className="text-center sm:text-left">
                  <div className="font-bold text-black text-lg">
                    Jaji’s Innovation Pvt. Ltd.
                  </div>
                  <div className="text-gray-600 text-sm mt-0.5">
                    Growing together. Creating successful beauty businesses.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="mt-4 px-8 py-4 bg-black text-white hover:bg-gray-800 text-[0.8rem] font-medium tracking-[0.18em] uppercase transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 p-6 sm:p-8 md:p-12 space-y-12 text-black"
            >
              {/* Form Heading Header */}
              <div className="border-b border-gray-200 pb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black tracking-wide uppercase">
                    Franchise Enquiry Form
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Fill in the details below to express your interest in
                    partnership.
                  </p>
                </div>
                <span className="text-xs text-gray-700 bg-gray-100 border border-gray-300 px-3 py-1 rounded-full font-medium">
                  * Mandatory Fields
                </span>
              </div>

              {/* Display Validation Error Banner if any */}
              {formError && (
                <div className="bg-gray-100 border border-gray-400 text-black p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
                  <FaExclamationCircle className="text-black text-xl shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* ================================================================= */}
              {/* SECTION 1: PERSONAL DETAILS */}
              {/* ================================================================= */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-black text-lg md:text-xl font-bold border-b border-gray-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-bold">
                    <FaUser />
                  </div>
                  <h4>Personal Details</h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Full Name <span className="text-black">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Mobile Number <span className="text-black">*</span>
                    </label>
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      WhatsApp Number{" "}
                      <span className="text-gray-500 text-xs font-normal">
                        (Optional)
                      </span>
                    </label>
                    <div className="relative">
                      <FaWhatsapp className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        placeholder="Enter WhatsApp number"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Email Address <span className="text-black">*</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. name@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Age Group */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Age Group <span className="text-black">*</span>
                    </label>
                    <select
                      name="ageGroup"
                      value={formData.ageGroup}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    >
                      <option value="">Select Age Group</option>
                      <option value="Below 25">Below 25</option>
                      <option value="25–35">25–35</option>
                      <option value="36–45">36–45</option>
                      <option value="46–55">46–55</option>
                      <option value="Above 55">Above 55</option>
                    </select>
                  </div>

                  {/* Current City and District */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Current City and District{" "}
                      <span className="text-black">*</span>
                    </label>
                    <input
                      type="text"
                      name="currentCityDistrict"
                      value={formData.currentCityDistrict}
                      onChange={handleChange}
                      placeholder="e.g. Kochi, Ernakulam"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    />
                  </div>

                  {/* State */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      State <span className="text-black">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Kerala, Karnataka, Tamil Nadu"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* ================================================================= */}
              {/* SECTION 2: BUSINESS INFORMATION */}
              {/* ================================================================= */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3 text-black text-lg md:text-xl font-bold border-b border-gray-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-bold">
                    <FaBriefcase />
                  </div>
                  <h4>Business Information</h4>
                </div>

                <div className="space-y-6">
                  {/* Current Occupation or Business */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Current Occupation or Business{" "}
                      <span className="text-black">*</span>
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="e.g. Business Owner, Salaried Employee, Service Professional"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    />
                  </div>

                  {/* Do you have previous business experience? */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Do you have previous business experience?{" "}
                      <span className="text-black">*</span>
                    </label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            handleRadioSelect("hasBusinessExp", opt)
                          }
                          className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${formData.hasBusinessExp === opt
                              ? "bg-black text-white border-black shadow-md font-bold"
                              : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-xs ${formData.hasBusinessExp === opt ? "border-white bg-white text-black" : "border-gray-400"}`}
                          >
                            {formData.hasBusinessExp === opt && "✓"}
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* If yes, please provide details */}
                  {formData.hasBusinessExp === "Yes" && (
                    <div className="animate-fade-in">
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        If yes, please provide details.
                      </label>
                      <textarea
                        name="businessExpDetails"
                        rows="3"
                        value={formData.businessExpDetails}
                        onChange={handleChange}
                        placeholder="Briefly describe your previous business experience..."
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                      />
                    </div>
                  )}

                  {/* Salon/Beauty Experience */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Do you have experience in the salon, beauty, wellness,
                      retail, or hospitality industry?{" "}
                      <span className="text-black">*</span>
                    </label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleRadioSelect("hasSalonExp", opt)}
                          className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${formData.hasSalonExp === opt
                              ? "bg-black text-white border-black shadow-md font-bold"
                              : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-xs ${formData.hasSalonExp === opt ? "border-white bg-white text-black" : "border-gray-400"}`}
                          >
                            {formData.hasSalonExp === opt && "✓"}
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Individual or Company */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Are you applying as an individual or company?{" "}
                      <span className="text-black">*</span>
                    </label>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        "Individual",
                        "Partnership",
                        "Private Limited Company",
                        "Other",
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            handleRadioSelect("applicantType", opt)
                          }
                          className={`py-3 px-4 rounded-xl border text-xs md:text-sm font-semibold transition-all text-center cursor-pointer ${formData.applicantType === opt
                              ? "bg-black text-white border-black font-bold"
                              : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================================= */}
              {/* SECTION 3: PROPOSED FRANCHISE LOCATION */}
              {/* ================================================================= */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3 text-black text-lg md:text-xl font-bold border-b border-gray-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-bold">
                    <FaMapMarkerAlt />
                  </div>
                  <h4>Proposed Franchise Location</h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Preferred City or Town */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Preferred City or Town for the Franchise{" "}
                      <span className="text-black">*</span>
                    </label>
                    <input
                      type="text"
                      name="preferredCity"
                      value={formData.preferredCity}
                      onChange={handleChange}
                      placeholder="e.g. Kozhikode, Thrissur, Trivandrum"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    />
                  </div>

                  {/* Preferred Area or Locality */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Preferred Area or Locality{" "}
                      <span className="text-black">*</span>
                    </label>
                    <input
                      type="text"
                      name="preferredArea"
                      value={formData.preferredArea}
                      onChange={handleChange}
                      placeholder="e.g. MG Road, City Center"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    />
                  </div>

                  {/* Commercial Property radio options */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Do you already have a commercial property?{" "}
                      <span className="text-black">*</span>
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Yes, owned property",
                        "Yes, rented property",
                        "Property under consideration",
                        "No, I need assistance finding a location",
                      ].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            handleRadioSelect("hasCommercialProperty", opt)
                          }
                          className={`p-3.5 rounded-xl border text-xs md:text-sm font-medium text-left transition-all flex items-center justify-between cursor-pointer ${formData.hasCommercialProperty === opt
                              ? "bg-black text-white border-black font-bold"
                              : "bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center text-xs ${formData.hasCommercialProperty === opt ? "border-white bg-white text-black" : "border-gray-400"}`}
                          >
                            {formData.hasCommercialProperty === opt && "✓"}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Approximate Property Size
                    </label>
                    <select
                      name="propertySize"
                      value={formData.propertySize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    >
                      <option value="">Select Property Size</option>
                      <option value="Below 1,500 sq. ft.">
                        Below 1,500 sq. ft.
                      </option>
                      <option value="1,500–2,500 sq. ft.">
                        1,500–2,500 sq. ft.
                      </option>
                      <option value="2,500–4,000 sq. ft.">
                        2,500–4,000 sq. ft.
                      </option>
                      <option value="Above 4,000 sq. ft.">
                        Above 4,000 sq. ft.
                      </option>
                      <option value="Not yet decided">Not yet decided</option>
                    </select>
                  </div>

                  {/* Property Location or Maps link */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Property Location or Google Maps Link
                    </label>
                    <input
                      type="text"
                      name="propertyLocationLink"
                      value={formData.propertyLocationLink}
                      onChange={handleChange}
                      placeholder="Paste Google Maps URL or address details"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* ================================================================= */}
              {/* SECTION 4: INVESTMENT DETAILS */}
              {/* ================================================================= */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3 text-black text-lg md:text-xl font-bold border-b border-gray-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-bold">
                    <FaCoins />
                  </div>
                  <h4>Investment Details</h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Available Investment Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Available Investment Budget{" "}
                      <span className="text-black">*</span>
                    </label>
                    <select
                      name="investmentBudget"
                      value={formData.investmentBudget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    >
                      <option value="">Select Investment Budget</option>
                      <option value="₹30 Lakhs–₹40 Lakhs">
                        ₹30 Lakhs–₹40 Lakhs
                      </option>
                      <option value="₹40 Lakhs–₹50 Lakhs">
                        ₹40 Lakhs–₹50 Lakhs
                      </option>
                      <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
                      <option value="Funding is being arranged">
                        Funding is being arranged
                      </option>
                    </select>
                  </div>

                  {/* Source of Investment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Source of Investment <span className="text-black">*</span>
                    </label>
                    <select
                      name="investmentSource"
                      value={formData.investmentSource}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    >
                      <option value="">Select Investment Source</option>
                      <option value="Own funds">Own funds</option>
                      <option value="Bank loan">Bank loan</option>
                      <option value="Business partners">
                        Business partners
                      </option>
                      <option value="Combination of own funds and loan">
                        Combination of own funds and loan
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Planning to start */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      When are you planning to start the franchise?{" "}
                      <span className="text-black">*</span>
                    </label>
                    <select
                      name="planToStart"
                      value={formData.planToStart}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    >
                      <option value="">Select Start Timeline</option>
                      <option value="Immediately">Immediately</option>
                      <option value="Within 1–3 months">
                        Within 1–3 months
                      </option>
                      <option value="Within 3–6 months">
                        Within 3–6 months
                      </option>
                      <option value="Within 6–12 months">
                        Within 6–12 months
                      </option>
                      <option value="Just exploring the opportunity">
                        Just exploring the opportunity
                      </option>
                    </select>
                  </div>

                  {/* Daily operations involvement */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Will you be personally involved in daily operations?{" "}
                      <span className="text-black">*</span>
                    </label>
                    <select
                      name="dailyOperationsInvolvement"
                      value={formData.dailyOperationsInvolvement}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-black focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all text-sm"
                    >
                      <option value="">Select Involvement Level</option>
                      <option value="Yes, full-time">Yes, full-time</option>
                      <option value="Yes, part-time">Yes, part-time</option>
                      <option value="No, I will appoint a management team">
                        No, I will appoint a management team
                      </option>
                      <option value="Not yet decided">Not yet decided</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ================================================================= */}
              {/* SECTION 5: DECLARATION */}
              {/* ================================================================= */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3 text-black text-lg md:text-xl font-bold border-b border-gray-200 pb-3">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-sm font-bold">
                    <FaFileContract />
                  </div>
                  <h4>Declaration & Consent</h4>
                </div>

                <div className="space-y-4 bg-gray-50 border border-gray-200 p-5 md:p-6 rounded-xl">
                  {/* Checkbox 1 */}
                  <label className="flex items-start gap-3.5 cursor-pointer text-xs md:text-sm text-gray-700 leading-relaxed">
                    <input
                      type="checkbox"
                      name="confirmAccurate"
                      checked={formData.confirmAccurate}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-gray-400 bg-white text-black focus:ring-black shrink-0 accent-black cursor-pointer"
                    />
                    <span>
                      I confirm that the information provided in this form is
                      true and accurate. I understand that submitting this form
                      does not guarantee the approval or allotment of a Jaji’s
                      franchise. The franchise will be approved only after
                      location evaluation, financial assessment, management
                      discussion, and completion of the required agreements.
                    </span>
                  </label>

                  {/* Checkbox 2 */}
                  <label className="flex items-start gap-3.5 cursor-pointer text-xs md:text-sm text-gray-700 leading-relaxed">
                    <input
                      type="checkbox"
                      name="agreeContact"
                      checked={formData.agreeContact}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-gray-400 bg-white text-black focus:ring-black shrink-0 accent-black cursor-pointer"
                    />
                    <span>
                      I agree to be contacted by Jaji’s Innovation Pvt. Ltd.
                      through phone, WhatsApp, email, or SMS regarding this
                      franchise enquiry.
                    </span>
                  </label>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-6 border-t border-gray-200 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-black text-white font-extrabold text-base md:text-lg rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider flex items-center justify-center gap-3 mx-auto cursor-pointer shadow-lg"
                >
                  <FaPaperPlane className="text-base" />{" "}
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT FRANCHISE ENQUIRY"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
