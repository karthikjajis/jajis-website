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
    <div className="min-h-screen w-full overflow-x-hidden font-sans bg-black text-white">
      {/* HERO */}
      <section
        className="relative bg-center bg-cover h-[70vh] text-white flex items-center justify-center md:bg-fixed"
        style={{
          backgroundImage:
            "url('https://www.causeway.com/hs-fs/hubfs/iStock-1225020118-1-scaled.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {data.page || "Jaji’s Beauty Saloon Franchise"}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mt-4 font-light">
            Own a premium beauty brand and build your success with Jaji’s.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="#enquiry-form-section"
              className="px-8 py-3.5 bg-black border border-white text-white rounded-full font-bold hover:bg-white hover:text-black transition shadow-lg flex items-center gap-2"
            >
              <FaPaperPlane className="text-sm" /> Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT JAJIS */}
      <section className="bg-white text-black py-24">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div className="space-y-8">
              <span className="text-xs font-bold tracking-widest text-black uppercase bg-gray-100 border border-gray-300 px-3 py-1 rounded-full">
                Our Journey
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Crafting Excellence Since Day One
              </h2>

              <div className="w-20 h-1 bg-black"></div>

              <p className="text-lg text-gray-800 leading-relaxed text-justify">
                Founded with a vision to provide exceptional beauty and
                lifestyle services, Jajis has grown from a small local business
                into a trusted brand serving communities with professionalism
                and care.
              </p>

              <p className="text-lg text-gray-800 leading-relaxed text-justify">
                Our mission is to make beauty and wellness accessible to
                everyone while maintaining the highest standards of quality,
                hygiene, and customer satisfaction.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-100 border border-gray-200 p-6 rounded-2xl text-center shadow-sm">
                  <div className="text-4xl md:text-5xl font-extrabold text-black">
                    2003
                  </div>
                  <div className="text-gray-600 text-xs font-semibold uppercase tracking-wider mt-2">
                    Established Year
                  </div>
                </div>
                <div className="bg-gray-100 border border-gray-200 p-6 rounded-2xl text-center shadow-sm">
                  <div className="text-4xl md:text-5xl font-extrabold text-black">
                    50+
                  </div>
                  <div className="text-gray-600 text-xs font-semibold uppercase tracking-wider mt-2">
                    Team Members
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center text-2xl mb-4">
                  <FaBuilding />
                </div>
                <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To deliver innovative, high-quality beauty and lifestyle
                  services that enhance confidence and well-being, ensuring
                  every client feels valued and beautiful.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center text-2xl mb-4">
                  <FaStar />
                </div>
                <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be a leading beauty & lifestyle brand known for excellence,
                  innovation, and customer satisfaction across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FRANCHISE */}
      <section
        className="relative bg-center bg-cover text-white py-24 border-t border-white/10 md:bg-fixed"
        style={{
          backgroundImage: `url(${saloonBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Why Partner With Jaji’s?
            </h2>
            <p className="text-gray-300 text-lg">
              A proven beauty brand with strong support, modern systems, and
              growth-focused opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaChartLine />, text: "Proven Business Model" },
              { icon: <FaTrophy />, text: "Strong Brand Trust" },
              { icon: <FaChalkboardTeacher />, text: "Professional Training" },
              { icon: <FaBullhorn />, text: "Marketing Support" },
              { icon: <FaHandshake />, text: "Continuous Guidance" },
              { icon: <FaStar />, text: "Premium Services" },
              { icon: <FaLaptopCode />, text: "Modern Systems" },
              { icon: <FaRocket />, text: "Growth Opportunities" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-black/60 border border-white/20 backdrop-blur-md p-6 md:p-8 rounded-2xl 
                transition-all duration-300 hover:bg-white hover:text-black hover:shadow-2xl hover:-translate-y-1.5"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 text-white 
                  group-hover:bg-black group-hover:text-white transition-all duration-300 text-2xl mb-5 mx-auto"
                >
                  {item.icon}
                </div>
                <p className="text-center font-bold text-base md:text-lg tracking-wide">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* JAJI'S FRANCHISE ENQUIRY FORM SECTION (FULL WHITE BACKGROUND) */}
      {/* ========================================================================= */}
      <section
        id="enquiry-form-section"
        className="py-24 bg-white text-black relative border-t border-gray-200"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          {/* SECTION HEADER & BRAND OVERVIEW */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-black text-xs font-semibold uppercase tracking-widest mb-4">
              <FaFileContract /> Official Partner Program
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black uppercase">
              Become a Jaji’s Franchise Partner
            </h2>

            <p className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
              Jaji’s began its journey in 2003 and has successfully expanded
              across multiple locations in Kerala. We are now inviting
              passionate entrepreneurs and investors to become part of our
              growing franchise network.
            </p>
          </div>

          {/* ESTIMATED INVESTMENT HIGHLIGHT CARD */}
          <div className="bg-gray-900 border border-gray-300 rounded-2xl p-6 md:p-8 mb-12 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-black text-white flex items-center justify-center text-3xl shrink-0 font-bold shadow">
                  <FaCoins />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white font-bold">
                    Financial Requirement
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                    Estimated Investment:{" "}
                    <span className="text-white underline decoration-2 underline-offset-4">
                      ₹30 Lakhs to ₹50 Lakhs
                    </span>
                  </h3>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-xs text-gray-700 max-w-md shadow-sm">
                <div className="flex items-start gap-2">
                  <FaInfoCircle className="text-black shrink-0 text-sm mt-0.5" />
                  <p>
                    The final investment may vary depending on the location,
                    outlet size, interior requirements, and selected franchise
                    model.
                  </p>
                </div>
              </div>
            </div>
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
                className="mt-4 px-8 py-3.5 bg-black text-white hover:bg-gray-800 rounded-full font-bold transition-all cursor-pointer shadow-md"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl space-y-12 text-black"
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
