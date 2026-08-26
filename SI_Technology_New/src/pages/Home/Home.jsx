import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import CountUpModule from "react-countup";
import {
  ArrowRight, ArrowUpRight, CheckCircle2, TrendingUp, Award, Cog,
  ShieldCheck, Users, Wrench, ChevronDown, Plus, Minus, MessageSquare,
  Target, Compass, Factory, Layers, Sparkles, CheckCircle, Briefcase,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { SITE_CONFIG, getWhatsAppUrl } from "../../constants/siteConfig";
import productsData from "../../data/Products.json";
import categoriesData from "../../data/Categories.json";
import faqData from "../../data/FAQ.json";

import projectsData from "../../data/Projects.json";
import AnimatedList from "../../components/common/AnimatedList";
import ProductCategorySlider from "../../components/ProductCategorySlider/ProductCategorySlider";

const CountUp = typeof CountUpModule === "function" ? CountUpModule : (CountUpModule.default || CountUpModule);

export default function Home() {
  const heroRef = useRef(null);
  const gridLinesRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [visibleStats, setVisibleStats] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const [activeSample, setActiveSample] = useState(0);
  const [missionFlipped, setMissionFlipped] = useState(false);
  const [visionFlipped, setVisionFlipped] = useState(false);
  const radialContainerRef = useRef(null);


  // Hero slider data with product PNG images and titles
  const heroSlides = [
    {
      image: "/images/hero-profile-3d.png",
      title1: "Industrial Aluminium",
      title2: "Profile Systems.",
      subtitle: "Engineering Solutions for Modern Industry.",
      imageScale: "h-[260px] sm:h-[380px] lg:h-[440px] xl:h-[480px]"
    },
    {
      image: "/images/hero-connecting-joint.png",
      title1: "Precision Connecting",
      title2: "Elements & Joints.",
      subtitle: "Secure Fasteners & Structural Assembly Accessories.",
      imageScale: "h-[260px] sm:h-[380px] lg:h-[440px] xl:h-[480px]"
    },
    {
      image: "/images/hero-pipe-clamp.png",
      title1: "Tubular Clamp",
      title2: "Connectors & Joints.",
      subtitle: "Robust Structural Tube Fasteners & Clamp Assemblies.",
      imageScale: "h-[300px] sm:h-[440px] lg:h-[520px] xl:h-[580px] scale-110 lg:scale-115"
    },
    {
      image: "/images/hero-workstation.png",
      title1: "Custom Ergonomic",
      title2: "Workstations.",
      subtitle: "Smart Pipe & Joint Solutions for Lean Manufacturing.",
      imageScale: "h-[280px] sm:h-[400px] lg:h-[460px] xl:h-[500px]"
    },
    {
      image: "/images/hero-conveyor.png",
      title1: "Modular Belt",
      title2: "Conveyor Systems.",
      subtitle: "High-Efficiency Material Handling & Assembly Lines.",
      imageScale: "h-[300px] sm:h-[440px] lg:h-[520px] xl:h-[580px] scale-110 lg:scale-115"
    }
  ];

  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handlePrevSlide = () => {
    setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };


  useEffect(() => {
    const el = radialContainerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=2400",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(5, Math.floor(self.progress * 6));
          setActivePillar(index);
        }
      });
    });

    return () => ctx.revert();
  }, []);



  // GSAP animation for hero blueprint lines
  useEffect(() => {
    const lines = gridLinesRef.current;
    if (lines) {
      gsap.fromTo(
        lines,
        { opacity: 0.1, backgroundPosition: "0px 0px" },
        {
          opacity: 0.35,
          backgroundPosition: "40px 40px",
          duration: 20,
          repeat: -1,
          ease: "linear",
        }
      );
    }
  }, []);

  // Intersection observer for scroll trigger stats counting
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleStats(true);
        }
      },
      { threshold: 0.2 }
    );
    const statsSection = document.getElementById("stats-section");
    if (statsSection) observer.observe(statsSection);
    return () => {
      if (statsSection) observer.unobserve(statsSection);
    };
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Why Choose Us strengths list
  const strengths = [
    {
      icon: Award,
      title: "Premium Quality Profiles",
      desc: "All extrusion profiles are manufactured from Aluminium Alloy 6063 T6, with precision silver or black matte anodizing exceeding 15 microns."
    },
    {
      icon: Cog,
      title: "Custom Structural Engineering",
      desc: "We design and pre-fabricate custom machine enclosures, robotic cells, conveyors, and workstations to match your exact CAD files."
    },
    {
      icon: TrendingUp,
      title: "Optimized Shopfloor Productivity",
      desc: "Our modular pipe and joint systems, gravity FIFO flow racks, and height-adjustable desks are engineered to streamline material flows."
    },
    {
      icon: ShieldCheck,
      title: "Industry Trusted Partner",
      desc: "Serving manufacturing hubs across India since 2018 with transparent dealings, reliable assembly guides, and post-sales installation support."
    }
  ];

  // Steps in the engineering workflow
  const processSteps = [
    {
      step: "01",
      title: "Consultation & Audit",
      desc: "We study your shopfloor footprint, assembly processes, and structural load requirements to propose the optimal modular layout."
    },
    {
      step: "02",
      title: "3D CAD Designing",
      desc: "Our engineers generate complete 3D models (STEP/DXF formats) of your custom workstations or safety guard fencing for layout approval."
    },
    {
      step: "03",
      title: "Precision Fabrication",
      desc: "We cut profiles, tap holes, install rollers, and pre-assemble structural blocks inside our facility for strict quality control."
    },
    {
      step: "04",
      title: "Fast Assembly & Delivery",
      desc: "Components are labeled and flat-packed with assembly drawings, or built on-site by our expert technicians. No welding, no mess."
    }
  ];

  return (
    <>
      <Helmet>
        <title>SI Technology | Premium Industrial Aluminium Profile Systems Pune</title>
        <meta name="description" content="SI Technology Pune delivers world-class industrial aluminium profile systems, connecting elements, pipe & joint solutions, and custom workstations." />
      </Helmet>
      <div className="w-full">
        {/* ─── HERO SLIDER SECTION ─── */}
        <section
          ref={heroRef}
          className="relative mt-[135px] sm:mt-[155px] lg:mt-[170px] py-8 pb-10 sm:py-10 lg:py-12 min-h-0 sm:min-h-[52vh] lg:min-h-[60vh] flex items-center justify-center text-slate-800 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/50"
        >
          {/* Background Image of Hero Section */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.04] overflow-hidden">
            <img
              src="/images/logo/si-technology-new-logo.png"
              alt=""
              className="w-full h-full object-contain max-w-4xl"
            />
          </div>

          {/* Blueprint Grid Lines Overlay */}
          <div
            ref={gridLinesRef}
            className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none z-1"
          />

          {/* Content Wrapper */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-12 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlide}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-12 gap-2 xs:gap-3 sm:gap-6 lg:gap-8 items-center min-h-0 sm:min-h-[420px]"
              >
                {/* LEFT COLUMN: Direct Product PNG Image (5 cols mobile, 6 cols desktop) */}
                <div className="col-span-5 sm:col-span-6 flex items-center justify-center lg:justify-start relative p-0 lg:-ml-6 pr-1 xs:pr-2 lg:pr-6 overflow-visible">
                  <img
                    src={heroSlides[heroSlide].image}
                    alt={heroSlides[heroSlide].title1}
                    className={`w-full max-w-full h-[180px] xs:h-[220px] sm:h-[320px] md:h-[390px] lg:h-[460px] xl:h-[500px] object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-500`}
                  />
                </div>

                {/* RIGHT COLUMN: Slide Text Content (7 cols mobile, 6 cols desktop) */}
                <div className="col-span-7 sm:col-span-6 flex flex-col items-start text-left px-1 xs:px-2 sm:px-0">
                  <h1 className="text-[13px] xs:text-[15px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-orbitron font-black uppercase leading-snug sm:leading-tight tracking-tight sm:tracking-wider mb-2 xs:mb-3 sm:mb-5">
                    <span className="block font-black text-black text-3d-heavy-slate">
                      {heroSlides[heroSlide].title1}
                    </span>
                    <span className="block text-[#f97316] font-black text-3d-heavy-orange mt-1.5 xs:mt-2 sm:mt-3">
                      {heroSlides[heroSlide].title2}
                    </span>
                  </h1>

                  <p className="text-[10px] xs:text-[11px] sm:text-sm lg:text-base xl:text-lg font-semibold text-slate-600 tracking-normal mb-3 sm:mb-6 leading-tight sm:leading-relaxed max-w-lg">
                    {heroSlides[heroSlide].subtitle}
                  </p>

                  {/* Action Buttons Group */}
                  <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-5">
                    {/* Services Button */}
                    <Link
                      to="/products"
                      className="text-slate-600 hover:text-[#f97316] font-display font-black text-[9px] xs:text-[10px] sm:text-[12px] uppercase tracking-[0.12em] sm:tracking-[0.18em] flex items-center gap-1 sm:gap-1.5 transition-colors duration-300 py-1 group"
                    >
                      Services
                      <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px] group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* EXPLORE MORE Button (Compact size & width) */}
                    <Link
                      to="/contact"
                      className="inline-flex items-center bg-[rgb(17,105,90)] hover:bg-[rgb(13,80,69)] text-white font-display font-black text-[8px] xs:text-[9px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.15em] rounded-full pl-2.5 xs:pl-3 sm:pl-4 pr-1 py-0.5 sm:py-1 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group/btn"
                    >
                      EXPLORE MORE
                      <span className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full bg-[#111827] text-white flex items-center justify-center ml-1.5 sm:ml-3 group-hover/btn:rotate-45 transition-transform duration-300 shadow-sm">
                        <ArrowUpRight size={10} className="sm:w-[12px] sm:h-[12px]" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators / Dots */}
          <div className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroSlide(i)}
                className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === heroSlide
                  ? "bg-[#f97316] w-5 sm:w-7"
                  : "bg-slate-400/50 hover:bg-slate-400 w-2 sm:w-2.5"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows (Visible on BOTH Mobile & Desktop) */}
          <button
            onClick={handlePrevSlide}
            className="flex absolute left-1 xs:left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-slate-900/15 hover:bg-[#f97316]/90 border border-slate-900/10 hover:border-transparent text-slate-800 hover:text-white backdrop-blur-md w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 items-center justify-center rounded-full shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNextSlide}
            className="flex absolute right-1 xs:right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-slate-900/15 hover:bg-[#f97316]/90 border border-slate-900/10 hover:border-transparent text-slate-800 hover:text-white backdrop-blur-md w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 items-center justify-center rounded-full shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={16} className="sm:w-6 sm:h-6" />
          </button>
        </section>

        {/* ─── ABOUT S I TECHNOLOGY SECTION (2-COLUMN REFERENCE DESIGN) ─── */}
        <section className="mt-0 py-4 sm:py-6 relative overflow-hidden border-y border-dark-200/60">
          {/* Steel-blue gradient container background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/30 via-slate-300/20 to-blue-200/25 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/40 pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Container card */}
            <div className="bg-[rgb(158,175,181)] backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10 lg:p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100/40 rounded-full blur-[60px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

                {/* Left Column (5 cols): Slides in from LEFT */}
                <motion.div
                  className="lg:col-span-6 space-y-4"
                  initial={{ opacity: 0, x: -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Accent Subtitle Badge */}
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-accent-600 uppercase">
                    <span className="w-8 h-0.5 bg-accent-600 rounded-full" />
                    WHO WE ARE
                  </div>

                  <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-[2.6rem] font-display font-black text-black tracking-tight leading-[1.15]">
                    Industrial <br />
                    Aluminium Profiles <br />
                    &amp; Automation.
                  </h2>

                  {/* Text Paragraphs */}
                  <div className="space-y-3 text-dark-700 text-sm sm:text-base leading-relaxed font-semibold">
                    <p>
                      Established in 2018, S I TECHNOLOGY has grown into a trusted name in industrial aluminium profile systems and automation solutions across India.
                    </p>
                    <p>
                      With a strong focus on engineering excellence and innovation, our experienced team manufactures, supplies, and installs modular structures that improve shopfloor productivity, optimize workspace utilization, and support lean manufacturing practices.
                    </p>
                  </div>

                  {/* Bullet Points — tighter spacing */}
                  <div className="space-y-1.5">
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
                        transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                        whileHover={{ x: 6 }}
                        className="flex items-center gap-3 p-2 -mx-2 rounded-xl border border-transparent hover:border-accent-500/30 hover:bg-accent-500/[0.06] transition-all duration-300 cursor-pointer group/item"
                      >
                        <div className="w-6 h-6 rounded-full bg-accent-500/15 text-accent-600 group-hover/item:bg-accent-500 group-hover/item:text-white flex items-center justify-center flex-shrink-0 transition-all duration-300">
                          <CheckCircle2 size={13} className="stroke-[2.5]" />
                        </div>
                        <span className="text-sm font-bold text-primary-950 group-hover/item:text-accent-700 transition-colors duration-300">
                          {point}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-primary-950 bg-primary-950 text-white hover:bg-accent-600 hover:border-accent-600 text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group/btn"
                    >
                      KNOW MORE ABOUT US
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>

                {/* Right Column (6 cols): Slides in from RIGHT — larger image */}
                <motion.div
                  className="lg:col-span-6 relative pb-6"
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-dark-200/80 hover:border-accent-500/50 hover:shadow-[0_25px_60px_rgba(249,115,22,0.18)] aspect-[16/10] bg-dark-100 group/img cursor-pointer transition-all duration-500">
                    <img
                      src="/images/about_workbench.jpg"
                      alt="S I TECHNOLOGY Aluminium Profile Workbench Assembly"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-500/15 via-transparent to-white/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Floating Stat Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="absolute bottom-0 left-6 sm:left-8 bg-white/95 backdrop-blur-md border border-dark-200/80 hover:border-accent-500/60 rounded-2xl p-4 sm:p-5 shadow-2xl hover:shadow-[0_15px_40px_rgba(249,115,22,0.2)] flex items-center gap-4 z-20 max-w-[260px] sm:max-w-[290px] transition-all duration-300 cursor-pointer group/stat"
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
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT CATEGORIES SECTION ─── */}
        <ProductCategorySlider categories={[
          {
            num: "01", title: "Aluminium Profiles", series: "5 Series", tags: ["20 Series", "40 Series"],
            img: "/images/profile_app/pa_004.jpg",
            desc: "Modular 6063-T6 aluminium extrusions in 20mm, 40mm, and 80mm series. Compatible with all standard DIN connectors and accessories.",
            link: "/products?category=aluminium-profiles",
          },
          {
            num: "02", title: "Workstations & Solutions", series: "5 Series", tags: ["Lean Workstations"],
            img: "/images/workstations/workstations_005.jpg",
            desc: "Ergonomic anti-static workstations with adjustable height, integrated shelving, and custom panel configurations for assembly lines.",
            link: "/products?category=workstations",
          },
          {
            num: "03", title: "Pipe & Joint Systems", series: "3 Series", tags: ["Pipe Joints"],
            img: "/images/pipe_joint/pipe_joint_007.jpg",
            desc: "Heavy-duty pipe & joint systems for material handling trolleys, racks, and flexible assembly structures with locking casters.",
            link: "/products?category=pipe-joint-systems",
          },
          {
            num: "04", title: "Belt Conveyors", series: "3 Series", tags: ["Belt Conveyors"],
            img: "/images/conveyor/Picture 374.jpg",
            desc: "Motorized belt conveyors and roller track systems built on aluminium profile frames for smooth production line integration.",
            link: "/products?category=belt-conveyors",
          },
          {
            num: "05", title: "Heavy Duty Applications", series: "2 Series", tags: ["Industrial"],
            img: "/images/Have duty app/IMG_2695.JPG",
            desc: "Robust industrial frames and heavy-duty application structures engineered for high-load manufacturing and automation environments.",
            link: "/products?category=heavy-duty-app",
          },
          {
            num: "06", title: "Heavy Duty Profiles", series: "2 Series", tags: ["Heavy Profiles"],
            img: "/images/Heavy duty profiles/Portalsystem.jpg",
            desc: "High-strength aluminium portal frames and structural profiles for overhead gantries, machine frames, and heavy industrial racking.",
            link: "/products?category=heavy-duty-profiles",
          },
          {
            num: "07", title: "Profile Assembly Systems", series: "4 Series", tags: ["Assembly"],
            img: "/images/Profile Assembly System/Fertigungslinie_OKIN.jpg",
            desc: "Complete profile-based assembly automation systems — from modular cell framing to full production line enclosures and fixtures.",
            link: "/products?category=profile-assembly-system",
          },
          {
            num: "08", title: "Finishing Systems", series: "2 Series", tags: ["Finishing"],
            img: "/images/feneshing/Picture 476.jpg",
            desc: "Premium surface finishing accessories — slot covers, end caps, corner profiles, and cable management inserts for a clean final look.",
            link: "/products?category=finishing-systems",
          },
          {
            num: "09", title: "Protection Systems", series: "3 Series", tags: ["Safety Guards"],
            img: "/Protection System/Steinbach Errani 03.jpg",
            desc: "Modular machine guarding enclosures, perimeter safety fencing, and transparent partition systems for complete operator protection.",
            link: "/products?category=protection-systems",
          },
        ]} />




        <section
          id="stats-section"
          className="mt-0 py-10 sm:py-12 bg-primary-900 text-white border-y border-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y-0 divide-x divide-white/10 text-center">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05, type: "spring", stiffness: 120 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-5xl font-mono font-black text-accent-500">
                  {visibleStats ? <CountUp start={0} end={6} duration={3} /> : "6"}+
                </div>
                <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Years of Excellence</p>
                <p className="text-[10px] text-white/30">Established in 2018</p>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 120 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-5xl font-mono font-black text-white">
                  {visibleStats ? <CountUp start={0} end={500} duration={3} /> : "500"}+
                </div>
                <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Completed Projects</p>
                <p className="text-[10px] text-white/30">Custom floor structures</p>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25, type: "spring", stiffness: 120 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-5xl font-mono font-black text-white">
                  {visibleStats ? <CountUp start={0} end={200} duration={3} /> : "200"}+
                </div>
                <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Happy Clients</p>
                <p className="text-[10px] text-white/30">Across Indian hubs</p>
              </motion.div>

              {/* Stat 4 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35, type: "spring", stiffness: 120 }}
                className="space-y-2"
              >
                <div className="text-3xl sm:text-5xl font-mono font-black text-accent-500">
                  {visibleStats ? <CountUp start={0} end={500} duration={3} /> : "500"}+
                </div>
                <p className="text-xs uppercase tracking-widest text-white/50 font-mono">Products &amp; SKUs</p>
                <p className="text-[10px] text-white/30">Profiles &amp; accessories</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── MISSION, VISION & CORE PILLARS SECTION ─── */}
        <section className="mt-6 sm:mt-8 py-12 sm:py-14 bg-slate-50 relative overflow-hidden border-y border-slate-200">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

            {/* Section Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-slate-200/60 border border-slate-300/80 rounded-full px-4 py-1.5 text-xs text-slate-700 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Core Outlook
              </div>
              <h2 className="text-xl xs:text-2xl sm:text-5xl font-display font-black text-black tracking-tight leading-none">
                Engineering Excellence
              </h2>
              <p className="text-slate-500 text-sm font-mono font-bold uppercase tracking-widest mt-1">
                Global Quality Standard
              </p>
            </div>

            {/* Infographic Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-4">

              {/* Left Card: OUR MISSION (Cyan Diamond) */}
              <div className="relative w-[290px] h-[290px] xs:w-80 xs:h-80 sm:w-96 sm:h-96 [perspective:1000px] group shrink-0">
                <div
                  onClick={() => setMissionFlipped(!missionFlipped)}
                  className={`relative w-full h-full duration-700 transition-all [transform-style:preserve-3d] ${missionFlipped ? "[transform:rotateY(180deg)]" : ""
                    } lg:group-hover:[transform:rotateY(180deg)] cursor-pointer`}
                >
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] -webkit-backface-visibility-hidden"
                  >
                    {/* Rotated Diamond Background Shape */}
                    <div className="absolute inset-4 bg-white border-2 border-dashed border-slate-200 shadow-xl rounded-[2.5rem] [transform:rotate(45deg)] transition-all duration-300 lg:group-hover:border-solid lg:group-hover:border-cyan-400 lg:group-hover:shadow-cyan-100" />

                    {/* Cyan Corner Accent (like the image) */}
                    <div className="absolute top-[8px] left-[8px] w-24 h-24 border-t-8 border-l-8 border-cyan-400 rounded-tl-[2rem] pointer-events-none" />

                    {/* Upright Front Content (No Rotation Needed!) */}
                    <div className="absolute inset-8 flex flex-col items-center justify-center text-center p-6 space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500 shadow-sm border border-cyan-100">
                        <Target size={22} className="stroke-[2.5]" />
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-black text-cyan-500 uppercase tracking-wider">
                        Our Mission
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[210px] font-semibold">
                        To deliver world-class industrial automation and aluminium profile solutions that help customers improve productivity, efficiency, safety, and profitability.
                      </p>

                      <span className="text-[9px] font-mono font-bold text-accent-500 uppercase tracking-widest animate-pulse lg:block hidden">
                        Hover to flip
                      </span>
                      <span className="text-[9px] font-mono font-bold text-accent-500 uppercase tracking-widest animate-pulse lg:hidden block">
                        Tap to flip
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] -webkit-backface-visibility-hidden text-white"
                  >
                    {/* Rotated Diamond Background Shape */}
                    <div className="absolute inset-4 bg-slate-900 border-2 border-cyan-400 shadow-2xl rounded-[2.5rem] [transform:rotate(45deg)]" />

                    {/* Upright Back Content (No Rotation Needed!) */}
                    <div className="absolute inset-8 flex flex-col items-center justify-center p-6">
                      <h3 className="text-xs sm:text-sm font-black text-cyan-400 font-display uppercase tracking-widest mb-3 text-center border-b border-cyan-400/20 pb-1.5 w-full">
                        Our Commitments
                      </h3>
                      <ul className="text-[9px] sm:text-[10px] text-white/90 space-y-1 list-disc pl-3 font-semibold leading-normal text-left w-full max-w-[220px]">
                        <li>Delivering superior quality products.</li>
                        <li>Providing innovative customized solutions.</li>
                        <li>Maintaining transparent business practices.</li>
                        <li>Ensuring customer satisfaction.</li>
                        <li>Continuously improving through tech.</li>
                        <li>Building long-term partnerships.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting Bridge (Link) */}
              {/* Desktop link */}
              <div className="hidden lg:flex items-center justify-center w-36 shrink-0 relative z-20 mx-[-3rem]">
                {/* Cyan loop */}
                <div className="w-10 h-6 bg-cyan-400 rounded-full flex items-center justify-center -mr-2 relative z-10 shadow-sm border border-white">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
                {/* Link line */}
                <div className="h-0.5 w-20 bg-slate-400" />
                {/* Purple loop */}
                <div className="w-10 h-6 bg-purple-500 rounded-full flex items-center justify-center -ml-2 relative z-10 shadow-sm border border-white">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
              </div>

              {/* Mobile divider */}
              <div className="lg:hidden flex flex-col items-center my-2">
                <div className="w-6 h-12 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full flex flex-col justify-between p-1.5 items-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </div>
              </div>

              {/* Right Card: OUR VISION (Purple Diamond) */}
              <div className="relative w-[290px] h-[290px] xs:w-80 xs:h-80 sm:w-96 sm:h-96 [perspective:1000px] group shrink-0">
                <div
                  onClick={() => setVisionFlipped(!visionFlipped)}
                  className={`relative w-full h-full duration-700 transition-all [transform-style:preserve-3d] ${visionFlipped ? "[transform:rotateY(180deg)]" : ""
                    } lg:group-hover:[transform:rotateY(180deg)] cursor-pointer`}
                >
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] -webkit-backface-visibility-hidden"
                  >
                    {/* Rotated Diamond Background Shape */}
                    <div className="absolute inset-4 bg-white border-2 border-dashed border-slate-200 shadow-xl rounded-[2.5rem] [transform:rotate(45deg)] transition-all duration-300 lg:group-hover:border-solid lg:group-hover:border-purple-500 lg:group-hover:shadow-purple-100" />

                    {/* Purple Corner Accent */}
                    <div className="absolute bottom-[8px] right-[8px] w-24 h-24 border-b-8 border-r-8 border-purple-500 rounded-br-[2rem] pointer-events-none" />

                    {/* Upright Front Content */}
                    <div className="absolute inset-8 flex flex-col items-center justify-center text-center p-6 space-y-3 sm:space-y-4">
                      <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shadow-sm border border-purple-100">
                        <Compass size={22} className="stroke-[2.5]" />
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-black text-purple-500 uppercase tracking-wider">
                        Our Vision
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[210px] font-semibold">
                        To become India's preferred engineering company for aluminium profile systems and industrial automation by providing innovative products and dependable service.
                      </p>

                      <span className="text-[9px] font-mono font-bold text-accent-500 uppercase tracking-widest animate-pulse lg:block hidden">
                        Hover to flip
                      </span>
                      <span className="text-[9px] font-mono font-bold text-accent-500 uppercase tracking-widest animate-pulse lg:hidden block">
                        Tap to flip
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] -webkit-backface-visibility-hidden text-white"
                  >
                    {/* Rotated Diamond Background Shape */}
                    <div className="absolute inset-4 bg-slate-900 border-2 border-purple-500 shadow-2xl rounded-[2.5rem] [transform:rotate(45deg)]" />

                    {/* Upright Back Content */}
                    <div className="absolute inset-8 flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="text-xs sm:text-sm font-black text-purple-400 font-display uppercase tracking-widest mb-3 text-center border-b border-purple-500/20 pb-1.5 w-full">
                        Our Aspiration
                      </h3>
                      <p className="text-[10px] sm:text-xs text-white/90 leading-relaxed font-semibold">
                        We aspire to be recognized globally for engineering excellence, product quality, customer satisfaction, and technological innovation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ─── COMPACT DEDICATED SECTION: OUR SIX OPERATING PILLARS ─── */}
        <section ref={radialContainerRef} className="py-12 sm:py-16 bg-slate-50 relative overflow-hidden swiss-border-b">
          {/* Subtle Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Centered Header Row with reduced bottom margin */}
            <div className="flex flex-col items-center justify-center gap-4 pb-4 mb-8 text-center">
              <div className="space-y-3 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <span className="inline-flex items-center gap-2 bg-white border border-dark-200/60 shadow-sm rounded-full px-4 py-1.5 text-xs text-primary-900 font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                    SIT BLUEPRINT
                  </span>
                </div>
                <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-display font-black text-black tracking-tight">
                  Our Six Operating Pillars
                </h2>
                <p className="text-sm sm:text-base text-dark-500 font-light leading-relaxed">
                  Foundational structural tenets guiding every lean shopfloor assembly line and workstation engineered at SI Technology.
                </p>
              </div>
            </div>

            {/* Interactive Radial Dial / Wheel Layout (Larger sizes) */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 w-full max-w-6xl mx-auto mt-2">

              {/* Left: The Circular Interactive Radial Wheel (Enlarged) */}
              <div className="relative w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] lg:w-[520px] lg:h-[520px] shrink-0 flex items-center justify-center select-none scale-[0.78] xs:scale-[0.9] sm:scale-100 origin-center my-[-35px] xs:my-[-15px] sm:my-0">

                {/* Outer Circular Connecting Orbit */}
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-red-500/70 animate-spin-slow pointer-events-none" style={{ boxShadow: '0 0 18px 2px rgba(239,68,68,0.15)' }} />

                {/* Center Detail Panel (Enlarged) */}
                <div
                  className="relative z-10 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full bg-primary-950 text-white flex flex-col items-center justify-center shadow-2xl border-4 border-accent-500/20 overflow-hidden"
                  style={{ perspective: "1000px" }}
                >
                  <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none z-10" />
                  <div className="absolute top-0 right-0 w-36 h-36 bg-accent-500/10 rounded-full blur-[50px] z-10" />

                  {/* Active Pillar Details inside circle */}
                  <AnimatePresence mode="wait">
                    {[
                      {
                        icon: ShieldCheck,
                        title: "Engineering Excellence",
                        desc: "High-tensile alloy with >15μ anodizing.",
                        img: "/images/3D IMAGE WITH NAME SI-20260716T110720Z-1-001/3D IMAGE WITH NAME SI/40 X 40 H.png"
                      },
                      {
                        icon: Wrench,
                        title: "Custom Lean Design",
                        desc: "Prefabricated machine cells tailored to CAD.",
                        img: "/images/workstations/workstations_001.jpg"
                      },
                      {
                        icon: CheckCircle2,
                        title: "Transparent Valuation",
                        desc: "Itemized BOMs and predictable upfront costs.",
                        img: "/images/strength_01.png"
                      },
                      {
                        icon: Cog,
                        title: "Ergonomic Optimization",
                        desc: "Worker-centric layouts for maximum safety.",
                        img: "/images/workstations/workstations_001.jpg"
                      },
                      {
                        icon: TrendingUp,
                        title: "Continuous Innovation",
                        desc: "Modular T-slot frames engineered to expand.",
                        img: "/images/pipe_joint/pipe_joint_001.jpg"
                      },
                      {
                        icon: MessageSquare,
                        title: "Dedicated Support",
                        desc: "From 3D review to step-by-step guides.",
                        img: "/images/gallery/conveyor.png"
                      }
                    ].map((item, idx) => {
                      const IconComp = item.icon;
                      if (activePillar !== idx) return null;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, rotateY: 90 }}
                          animate={{ opacity: 1, rotateY: 0 }}
                          exit={{ opacity: 0, rotateY: -90 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center"
                        >
                          {/* Circle Background Image */}
                          <img
                            src={item.img}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                          />
                          <div className="absolute inset-0 bg-black/35 z-0" />

                          <div className="relative z-10 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-500 text-white flex items-center justify-center mb-3 shadow-lg shadow-accent-500/30">
                              <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h3 className="font-display font-black text-sm sm:text-base lg:text-lg text-white tracking-tight leading-tight mb-2">
                              {item.title}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-white/70 font-light leading-relaxed line-clamp-3 px-2 sm:px-6">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* 6 Radial Node Buttons placed around the orbit (Enlarged) */}
                {[
                  { icon: ShieldCheck, title: "Engineering Excellence" },
                  { icon: Wrench, title: "Custom Lean Design" },
                  { icon: CheckCircle2, title: "Transparent Valuation" },
                  { icon: Cog, title: "Ergonomic Optimization" },
                  { icon: TrendingUp, title: "Continuous Innovation" },
                  { icon: MessageSquare, title: "Dedicated Support" }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  const isActive = activePillar === idx;

                  // Calculate angles (6 nodes: 0, 60, 120, 180, 240, 300 degrees)
                  const startAngle = -Math.PI / 2;
                  const angle = startAngle + (idx * 60 * Math.PI) / 180;

                  const xMobile = Math.cos(angle) * 125;
                  const yMobile = Math.sin(angle) * 125;
                  const xTablet = Math.cos(angle) * 165;
                  const yTablet = Math.sin(angle) * 165;
                  const xDesktop = Math.cos(angle) * 185;
                  const yDesktop = Math.sin(angle) * 185;

                  return (
                    <div
                      key={idx}
                      onClick={() => setActivePillar(idx)}
                      className={`absolute w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isActive
                        ? 'bg-accent-500 text-white scale-110 shadow-lg shadow-accent-500/50 border-2 border-accent-400 z-20'
                        : 'bg-white border border-dark-200/80 text-primary-900 hover:bg-primary-50 hover:border-primary-300 z-10'
                        }`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + var(--x)), calc(-50% + var(--y)))`,
                        '--x': `${xMobile}px`,
                        '--y': `${yMobile}px`,
                      }}
                    >
                      <style>{`
                      @media (min-width: 640px) {
                        div[style*="--x: ${xMobile}px"] {
                          --x: ${xTablet}px !important;
                          --y: ${yTablet}px !important;
                        }
                      }
                      @media (min-width: 1024px) {
                        div[style*="--x: ${xMobile}px"] {
                          --x: ${xDesktop}px !important;
                          --y: ${yDesktop}px !important;
                        }
                      }
                    `}</style>
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                    </div>
                  );
                })}
              </div>

              {/* Right: The Info Card Deck / Text List (Enlarged Card size) */}
              <div className="flex-1 w-full space-y-4 max-w-xl">
                <span className="text-[10px] font-mono font-bold text-accent-500 uppercase tracking-widest bg-accent-500/10 px-3 py-1.5 rounded-full border border-accent-500/20">
                  Active Pillar Index
                </span>

                <div className="bg-white border border-dark-200/60 rounded-[2rem] p-8 sm:p-10 shadow-sm space-y-6">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Engineering Excellence",
                      tag: "Alloy 6063 T6",
                      desc: "High-tensile alloy with >15μ matte anodizing for maximum strength and structural integrity under heavy industrial loads."
                    },
                    {
                      icon: Wrench,
                      title: "Custom Lean Design",
                      tag: "CAD Fitment",
                      desc: "Pre-fabricated machine cells & guards tailored precisely to your CAD models, guaranteeing zero-tolerance assembly."
                    },
                    {
                      icon: CheckCircle2,
                      title: "Transparent Valuation",
                      tag: "Zero Hidden Fees",
                      desc: "Itemized BOMs and predictable upfront proposal costs ensure complete clarity and accurate financial planning."
                    },
                    {
                      icon: Cog,
                      title: "Ergonomic Optimization",
                      tag: "ISO Ergonomics",
                      desc: "Worker-centric reach zones and height-adjustable modular layouts engineered for maximum productivity and safety."
                    },
                    {
                      icon: TrendingUp,
                      title: "Continuous Innovation",
                      tag: "100% Reusable",
                      desc: "Modular T-slot frames engineered to expand, adapt, or completely rebuild as your shopfloor demands evolve."
                    },
                    {
                      icon: MessageSquare,
                      title: "Dedicated Support",
                      tag: "Partner Cell",
                      desc: "From 3D concept reviews to step-by-step assembly guides, our dedicated cell supports you at every stage."
                    }
                  ].map((item, idx) => {
                    const isActive = activePillar === idx;
                    if (!isActive) return null;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xl sm:text-2xl font-black text-accent-500">0{idx + 1}</span>
                          <div className="h-px w-10 bg-dark-200" />
                          <span className="text-[10px] sm:text-xs font-mono font-bold text-dark-400 uppercase tracking-widest bg-dark-50 px-3 py-1 rounded-full border border-dark-100">{item.tag}</span>
                        </div>
                        <h3 className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-display font-black text-primary-900 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-dark-500 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    );
                  })}

                  {/* Horizontal Node Navigation list for Mobile */}
                  <div className="flex items-center justify-between pt-6 border-t border-dark-100">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        onClick={() => setActivePillar(i)}
                        className={`w-7 h-7 rounded-full font-mono text-xs font-black transition-all ${activePillar === i
                          ? 'bg-accent-500 text-white scale-110 shadow-sm'
                          : 'bg-dark-50 text-dark-400 hover:bg-dark-100'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>











        {/* ─── TECHNICAL FAQ SECTION ─── */}
        <section className="py-4 sm:py-6 bg-gradient-to-b from-primary-50/60 via-dark-50/90 to-primary-50/40 bg-dot-pattern relative overflow-hidden swiss-border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center gap-2 mb-4"
            >
              <span className="inline-flex items-center gap-2 bg-primary-100/60 border border-primary-200 rounded-full px-4 py-1.5 text-xs text-primary-900 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                Technical FAQs
              </span>
              <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-display font-black text-black tracking-tight leading-tight">
                Common Technical Inquiries
              </h2>
            </motion.div>

            <AnimatedList
              items={faqData}
              showGradients={false}
              enableArrowNavigation={true}
              displayScrollbar={false}
              initialSelectedIndex={-1}
              renderItem={(faq, idx, isHoveredOrSelected) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={faq.id}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                      ? "bg-white border-accent-500 ring-1 ring-accent-500/20 shadow-md"
                      : isHoveredOrSelected
                        ? "bg-primary-50/70 border-primary-300 shadow-sm scale-[1.005]"
                        : "bg-primary-50/40 border-primary-100/80 shadow-xs"
                      }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFaq(idx);
                      }}
                      className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-primary-900 hover:text-accent-500 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {isOpen ? <Minus size={18} className="text-accent-500" /> : <Plus size={18} />}
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-dark-600 text-xs sm:text-sm leading-relaxed border-t border-dark-100 pt-3 bg-dark-50/30">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
}
