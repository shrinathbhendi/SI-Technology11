import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Compass, Heart, Shield, Clock, MessageSquare, ArrowRight, CheckCircle, CheckCircle2, Briefcase, Target, Sparkles, Layers, Cog, TrendingUp, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, getWhatsAppUrl } from "../../constants/siteConfig";

export default function About() {
  const [activeStrength, setActiveStrength] = useState(0);

  const coreStrengths = [
    {
      icon: Award,
      num: "01",
      title: "Premium Quality Profiles",
      tag: "Material Excellence",
      desc: "Aluminium Alloy 6063 T6 with silver or black matte anodizing exceeding 15 microns for maximum durability and surface quality.",
      specs: ["Alloy Grade: 6063 T6", "Anodizing: >15 microns", "Corrosion Resistant", "European ISO Standards Compliance"],
      img: "/images/strength_01.png",
      bg: "bg-slate-900",
    },
    {
      icon: Cog,
      num: "02",
      title: "Custom Structural Engineering",
      tag: "CAD Precision",
      desc: "We design and pre-fabricate custom machine enclosures, robotic cells, conveyors, and workstations to match your exact CAD files.",
      specs: ["3D CAD Precision Drafting", "Custom Enclosure Layouts", "Conveyor & Robotic Frame Engineering", "Pre-Tapped flatpacks"],
      img: "/images/strength_02.png",
      bg: "bg-primary-900",
    },
    {
      icon: TrendingUp,
      num: "03",
      title: "Optimized Shopfloor Productivity",
      tag: "Lean Manufacturing",
      desc: "Modular pipe & joint systems, FIFO flow racks, and height-adjustable desks engineered to streamline every assembly line.",
      specs: ["Modular Pipe & Joint Systems", "FIFO Flow Racks", "Height-Adjustable Desks", "Lean Kaizen Optimization"],
      img: "/images/about_strength_03.png",
      bg: "bg-zinc-900",
    },
    {
      icon: ShieldCheck,
      num: "04",
      title: "Industry Trusted Partner",
      tag: "Since 2018",
      desc: "Serving manufacturing hubs across India since 2018 with reliable assembly guides and post-sales installation support.",
      specs: ["Established 2018 in Pune", "Serving 500+ Hubs Across India", "Comprehensive Assembly Guides", "Turnkey On-Site Support"],
      img: "/images/about_strength_04.jpg",
      bg: "bg-primary-950",
    },
  ];

  const coreValues = [
    {
      icon: Shield,
      title: "Uncompromising Quality",
      desc: "We use only high-grade Aluminium Alloy 6063 T6, ensuring every profile extrusion and accessory connector meets strict industrial tolerances."
    },
    {
      icon: Compass,
      title: "Technical Transparency",
      desc: "No hidden costs. We provide exact weight, surface area, and load-capacity specifications so engineers can design structures with confidence."
    },
    {
      icon: Heart,
      title: "Vested Partnerships",
      desc: "We aren't just selling hardware. We act as long-term advisors, reviewing CAD models, proposing modifications, and ensuring layout fits."
    },
    {
      icon: Award,
      title: "Lean Innovation",
      desc: "We continually update our connectors and modular accessories catalog to keep up with European standards and lean manufacturing trends."
    }
  ];

  const timelineSteps = [
    {
      year: "2018",
      title: "Establishment in Pune",
      desc: "SI Technology was incorporated in Dhayari, Pune. Started trading in basic T-slot profile structures and hardware connectors.",
      bg: "bg-slate-950 border-slate-800/80 hover:border-slate-600",
      glow: "hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]",
      dotColor: "bg-slate-400",
      textColor: "text-slate-300 border-slate-700",
      accentBg: "bg-slate-900 text-slate-200"
    },
    {
      year: "2020",
      title: "Workstation Fabrication",
      desc: "Launched customized workstation assembly lines. Set up an in-house cutting and tapping facility to supply pre-fabricated flatpacks.",
      bg: "bg-slate-950 border-slate-800/80 hover:border-teal-500/80",
      glow: "hover:shadow-[0_0_25px_rgba(20,184,166,0.45)]",
      dotColor: "bg-teal-500",
      textColor: "text-teal-300 border-teal-800",
      accentBg: "bg-teal-950/50 text-teal-200"
    },
    {
      year: "2022",
      title: "Lean & Pipe Systems",
      desc: "Introduced modular 28mm steel and ESD-conductive pipe and joint solutions, supporting Kaizen layout designs in warehouse logistics.",
      bg: "bg-slate-950 border-slate-800/80 hover:border-blue-500/80",
      glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.45)]",
      dotColor: "bg-blue-500",
      textColor: "text-blue-300 border-blue-800",
      accentBg: "bg-blue-950/50 text-blue-200"
    },
    {
      year: "2024",
      title: "Perimeter Safety Fencing",
      desc: "Supplied over 10,000 meters of ISO-compliant safety yellow wire mesh and polycarbonate machine guarding to automotive OEMs.",
      bg: "bg-slate-950 border-slate-800/80 hover:border-amber-500/80",
      glow: "hover:shadow-[0_0_25px_rgba(245,158,11,0.45)]",
      dotColor: "bg-amber-500",
      textColor: "text-amber-300 border-amber-800",
      accentBg: "bg-amber-950/50 text-amber-200"
    },
    {
      year: "2026",
      title: "Digital Integration",
      desc: "Now supporting 3D CAD modeling, custom design consultation, and on-site technician assembly across key industrial zones in India.",
      bg: "bg-slate-950 border-slate-800/80 hover:border-orange-500/80",
      glow: "hover:shadow-[0_0_25px_rgba(249,115,22,0.45)]",
      dotColor: "bg-orange-500",
      textColor: "text-orange-300 border-orange-800",
      accentBg: "bg-orange-950/50 text-orange-200"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | SI Technology - Industrial Aluminium Profiles</title>
        <meta name="description" content="Discover the story, mission, core values, and timeline of SI Technology (Est. 2018). Learn how we became Pune's trusted industrial aluminium profile supplier." />
      </Helmet>

      <div className="w-full">
        {/* ─── HERO SECTION WITH BACKGROUND IMAGE ─── */}
        <section className="relative overflow-hidden swiss-border-b">

          {/* ── DESKTOP HERO (sm and above): background image with dark overlay + centered text ── */}
          <div className="hidden sm:block relative" style={{ minHeight: "350px" }}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/about_hero_building.jpg"
                alt="SI Technology Engineering Headquarters Pune"
                className="w-full h-full object-cover object-center opacity-80"
              />
              {/* Dark Balanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-950/85 via-primary-950/75 to-black/90" />
              <div className="absolute inset-0 bg-grid-light opacity-5" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-16">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs sm:text-sm font-mono text-white/40 mb-6">
                <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
                <span>/</span>
                <span className="text-accent-400 font-semibold">About Us</span>
              </nav>
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black leading-[1.15] mb-4">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-white"
                  >
                    Our Story
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-[#f97316] mt-1"
                  >
                    &amp; Vision.
                  </motion.span>
                </h1>
                <p className="text-white/80 text-base sm:text-lg font-semibold leading-relaxed">
                  Supplying Pune and India with precision aluminium framing systems, lean assembly components, and safety structures since 2018.
                </p>
              </div>
            </div>
          </div>

          {/* ── MOBILE HERO (below sm): product frame image with text integrated in middle white space ── */}
          <div className="sm:hidden relative bg-white overflow-hidden swiss-border-b">
            {/* Navbar spacer */}
            <div className="h-[104px]" />

            {/* Mobile Hero Frame Container */}
            <div className="relative w-full min-h-[480px] xs:min-h-[520px] flex flex-col justify-between px-6 py-8">
              {/* Background Frame Image */}
              <img
                src="/images/about_hero_mobile.png"
                alt="SI Technology Industrial Aluminium Profiles and Pipe Joint"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Integrated Text Box in middle white area */}
              <div className="relative z-10 my-auto py-2 px-2 text-center">
                {/* Breadcrumb */}
                <nav className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 mb-3 font-semibold">
                  <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
                  <span>/</span>
                  <span className="text-[#f97316] font-bold">About Us</span>
                </nav>

                <h1 className="text-3xl xs:text-4xl font-display font-black leading-tight text-slate-900 mb-3 tracking-tight">
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="block"
                  >
                    Our Story
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="block text-[#f97316] mt-0.5"
                  >
                    &amp; Vision.
                  </motion.span>
                </h1>

                <p className="text-slate-700 text-xs xs:text-sm font-semibold leading-relaxed max-w-[290px] mx-auto">
                  Supplying Pune and India with precision aluminium framing systems, lean assembly components, and safety structures since 2018.
                </p>
              </div>

              {/* Padding spacer to push text away from bottom pipe joint */}
              <div className="h-12 relative z-10 pointer-events-none" />
            </div>
          </div>

        </section>


        {/* ─── ABOUT S I TECHNOLOGY SECTION (2-COLUMN REFERENCE DESIGN WITH CONTAINER CARD) ─── */}
        <section className="mt-0 py-2 sm:py-3 relative overflow-hidden bg-slate-50 border-y border-dark-200/60 z-10">
          {/* Steel-blue gradient container background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/30 via-slate-300/20 to-blue-200/25 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/40 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Container card */}
            <div className="bg-[rgb(158,175,181)] backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-xl p-5 sm:p-6 lg:p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100/40 rounded-full blur-[60px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">

                {/* Left Column (6 cols): Headline, Paragraphs, Small Checklist & CTA */}
                <div className="lg:col-span-6 space-y-3">
                  {/* Accent Subtitle Badge */}
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-black uppercase">
                    <span className="w-8 h-0.5 bg-black rounded-full" />
                    WHO WE ARE
                  </div>

                  <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-[2.85rem] font-display font-black text-black tracking-tight leading-[1.15]">
                    Industrial <br />
                    Aluminium Profiles <br />
                    &amp; Automation.
                  </h2>

                  {/* Text Paragraphs */}
                  <div className="space-y-3.5 text-dark-700 text-sm sm:text-base leading-relaxed font-semibold">
                    <p>
                      Established in 2018, S I Technology has grown into a trusted name in industrial aluminium profile systems and automation solutions across India.
                    </p>
                    <p>
                      With a strong focus on engineering excellence and innovation, our experienced team manufactures, supplies, and installs modular structures that improve shopfloor productivity, optimize workspace utilization, and support lean manufacturing practices.
                    </p>
                  </div>

                  {/* Small Bullet Points Checklist with Interactive Hover Effects */}
                  <div className="space-y-2.5 pt-1">
                    {[
                      "Market Leadership in Industrial Aluminium Profiles",
                      "Precision Alloy 6063 T6 Structural Extrusions",
                      "Partner to 500+ Manufacturing & Automotive Plants",
                      "End-to-End Turnkey CAD & Installation Support"
                    ].map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        whileHover={{ x: 6 }}
                        className="flex items-center gap-3.5 p-2.5 -mx-2.5 rounded-xl border border-transparent hover:border-accent-500/30 hover:bg-accent-500/[0.06] hover:shadow-sm transition-all duration-300 cursor-pointer group/item"
                      >
                        <div className="w-7 h-7 rounded-full bg-accent-500/15 text-accent-600 group-hover/item:bg-accent-500 group-hover/item:text-white group-hover/item:scale-110 flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm">
                          <CheckCircle2 size={15} className="stroke-[2.5]" />
                        </div>
                        <span className="text-sm sm:text-base font-bold text-primary-950 group-hover/item:text-accent-700 transition-colors duration-300">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button with Dynamic Hover Effect */}
                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary-950 bg-primary-950 text-white hover:bg-accent-600 hover:border-accent-600 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group/btn"
                    >
                      CONTACT US TODAY
                      <ArrowRight size={15} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>

                {/* Right Column (6 cols): Large Rounded Image Showcase + Bottom Floating Card */}
                <div className="lg:col-span-6 relative pb-8 lg:pb-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-dark-200/80 hover:border-accent-500/50 hover:shadow-[0_25px_60px_rgba(249,115,22,0.18)] aspect-[16/10] sm:aspect-[16/9] bg-dark-100 group/img cursor-pointer transition-all duration-500"
                  >
                    <img
                      src="/images/about_who_we_are.png"
                      alt="S I TECHNOLOGY Industrial Aluminium Profile Hub"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                    />
                    {/* Subtle Hover Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-500/15 via-transparent to-white/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </motion.div>

                  {/* Floating Stat Card at Bottom-Left with Interactive Lift */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-6 left-6 sm:left-8 bg-white/95 backdrop-blur-md border border-dark-200/80 hover:border-accent-500/60 rounded-2xl p-4 sm:p-5 shadow-2xl hover:shadow-[0_15px_40px_rgba(249,115,22,0.2)] flex items-center gap-4 z-20 max-w-[260px] sm:max-w-[290px] transition-all duration-300 cursor-pointer group/stat"
                  >
                    <div className="w-11 h-11 rounded-full bg-accent-500/15 text-accent-600 group-hover/stat:bg-accent-500 group-hover/stat:text-white group-hover/stat:rotate-12 transition-all duration-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-dark-500">
                        ESTABLISHED IN 2018
                      </p>
                      <p className="text-sm sm:text-base font-display font-black text-primary-950 group-hover/stat:text-accent-600 transition-colors duration-300">
                        6+ Years of Excellence
                      </p>
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ─── CORE VALUES ANIMATED GRID ─── */}
        <section className="mt-6 sm:mt-8 py-12 sm:py-16 bg-dark-50 swiss-border-b relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="inline-flex items-center gap-2 bg-primary-100/60 border border-primary-200 rounded-full px-4 py-1.5 text-xs text-primary-900 font-bold uppercase tracking-wider">
                Operating Philosophy
              </span>
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black text-black tracking-tight leading-[1.1]">
                Why Customers Choose S I Technology
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((val, i) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{
                      y: -10,
                      scale: 1.03,
                      boxShadow: "0 20px 40px rgba(184, 132, 180, 0.35)"
                    }}
                    className="bg-[#b884b4] border border-white/10 rounded-3xl p-7 shadow-sm flex flex-col justify-between cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-white text-[#b884b4] rounded-2xl flex items-center justify-center shadow-md shadow-black/10">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">
                        {val.title}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed font-medium">
                        {val.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── WHY CHOOSE US (STRENGTHS) ─── */}
        <section className="py-12 sm:py-16 bg-white swiss-border-b overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Centered Header */}
            <div className="flex flex-col items-center justify-center text-center gap-4 mb-16">
              <span className="inline-flex items-center gap-2 bg-accent-50 border border-accent-200 rounded-full px-4 py-1.5 text-xs text-accent-700 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Our Core Strengths
              </span>
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black text-black tracking-tight leading-[1.1]">
                Why Industry Leaders<br />
                Partner with S I Technology
              </h1>
            </div>

            {/* Unique: Full-width horizontal expanding panels */}
            <div className="flex flex-col lg:flex-row w-full gap-4 h-auto lg:h-[550px]">
              {coreStrengths.map((item, idx) => {
                const IconComp = item.icon;
                const isActive = activeStrength === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setActiveStrength(idx)}
                    onClick={() => setActiveStrength(idx)}
                    className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${item.bg} border border-dark-200/20 ${isActive
                      ? 'lg:flex-[3.8] h-[520px] lg:h-full shadow-2xl border-accent-500/30'
                      : 'lg:flex-[1] h-[80px] lg:h-full shadow-md border-transparent'
                      }`}
                  >
                    {/* Accent top bar */}
                    <div className={`absolute top-0 left-0 h-1 bg-accent-500 transition-all duration-700 z-20 ${isActive ? 'w-full' : 'w-0'}`} />

                    {/* Active layout: Split Top Image / Bottom Text */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 flex flex-col w-full h-full"
                        >
                          {/* Top half: Clear Image */}
                          <div className="w-full flex-1 relative overflow-hidden bg-dark-100">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                            />

                            {/* Number badge on image */}
                            <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full font-mono font-black text-xl shadow-lg">
                              {item.num}
                            </div>
                          </div>

                          {/* Bottom half: Compact Text Content */}
                          <div className="relative z-10 p-6 flex flex-col bg-white shrink-0 space-y-3">
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-accent-500 text-white flex items-center justify-center shadow-md shrink-0">
                                    <IconComp size={20} />
                                  </div>
                                  <h3 className="font-display font-black text-lg sm:text-xl text-primary-950 tracking-tight leading-tight">
                                    {item.title}
                                  </h3>
                                </div>
                                <span className="inline-block self-start sm:self-center text-[10px] font-mono font-bold text-accent-600 uppercase tracking-widest bg-accent-500/10 px-2.5 py-1 rounded-full border border-accent-500/20 shrink-0">
                                  {item.tag}
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm text-dark-500 font-light leading-relaxed mb-3">
                                {item.desc}
                              </p>
                            </div>

                            {/* Enhanced: Display Specs as Grid of Badges */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-dark-100">
                              {item.specs.map((spec, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-dark-700">
                                  <CheckCircle size={13} className="text-accent-500 shrink-0" />
                                  <span>{spec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Inactive state content */}
                    {!isActive && (
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                        />
                        <div className="absolute inset-0 bg-black/70" />

                        {/* Desktop collapsed: vertical text */}
                        <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <IconComp size={20} />
                          </div>
                          <span className="font-display font-black text-sm text-white uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 whitespace-nowrap">
                            {item.title}
                          </span>
                          <span className="font-mono font-black text-white/30 text-4xl leading-none mt-auto mb-6">
                            {item.num}
                          </span>
                        </div>

                        {/* Mobile collapsed: horizontal row */}
                        <div className="lg:hidden relative z-10 flex items-center gap-4 p-5 h-full">
                          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                            <IconComp size={16} />
                          </div>
                          <span className="font-display font-black text-sm text-white truncate">{item.title}</span>
                          <span className="ml-auto font-mono font-black text-white/30 text-3xl">{item.num}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ─── ANIMATED TIMELINE SECTION ─── */}
        <section className="py-12 sm:py-16 bg-white swiss-border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="inline-flex items-center gap-2 bg-accent-50 border border-accent-200 rounded-full px-4 py-1.5 text-xs text-accent-700 font-bold uppercase tracking-wider">
                Growth Journey
              </span>
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black text-black tracking-tight leading-[1.1]">
                Our Milestones Since 2018
              </h1>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 sm:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-dark-200">
              {timelineSteps.map((step, idx) => (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex items-center ${idx % 2 === 0 ? "sm:flex-row-reverse" : "sm:flex-row"}`}
                >
                  <div className="w-full sm:w-1/2 pl-14 sm:pl-8 sm:pr-8">
                    <div className={`border rounded-2xl p-6 sm:p-7 shadow-sm transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer ${step.bg} ${step.glow}`}>
                      <span className={`inline-block text-[11px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full border border-current ${step.textColor} bg-slate-900`}>
                        {step.year}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white mt-3 font-display">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className={`absolute left-6 sm:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white shadow-md z-10 transition-all duration-300 hover:scale-125 ${step.dotColor}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
