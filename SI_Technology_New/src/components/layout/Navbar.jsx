import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail } from "lucide-react";
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import categoriesData from "../../data/Categories.json";
import { SITE_CONFIG } from "../../constants/siteConfig";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  // Handle scroll to make top-bar slide up
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset mobile products dropdown when mobile menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileProductsOpen(false);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ─── FULL-WIDTH HEADER WRAPPER ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ${
          isScrolled ? "-translate-y-10 shadow-md" : "translate-y-0"
        }`}
      >
        {/* 1. TOP BAR (Height: 40px / h-10) */}
        <div className="h-10 bg-[#091b30] text-white flex items-center justify-between px-4 sm:px-6 lg:px-8 select-none">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${SITE_CONFIG.contact.phoneTel}`}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <Phone size={13} className="text-[#a83e23]" />
              <span>{SITE_CONFIG.contact.phone}</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <Mail size={13} className="text-[#a83e23]" />
              <span className="hidden sm:inline">{SITE_CONFIG.contact.email}</span>
              <span className="inline sm:hidden">Email</span>
            </a>
          </div>

          {/* Right: Social icons */}
          <div className="flex items-center gap-2">
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#a83e23] flex items-center justify-center text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={12} />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#a83e23] flex items-center justify-center text-white transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube size={12} />
            </a>

            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#a83e23] flex items-center justify-center text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={12} />
            </a>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION BAR (Height: 64px on mobile / 96px-112px on desktop) */}
        <div className="h-16 sm:h-24 lg:h-28 bg-[#d6d6d6] border-b border-slate-300 flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 shrink-0 py-1"
          >
            <div style={{ perspective: "1000px" }} className="flex items-center">
              <img
                src="/images/logo/si-technology-new-logo.png"
                alt="SI Technology Logo"
                className="h-[70px] sm:h-[125px] w-auto object-contain logo-spin-3d"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
            <NavLink
              to="/"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-[#a83e23]" : "text-slate-800 hover:text-[#a83e23]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-[#a83e23]" : "text-slate-800 hover:text-[#a83e23]"
                }`
              }
            >
              About Us
            </NavLink>



            {/* Products Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="flex items-center gap-0.5 cursor-pointer">
                <Link
                  to="/products"
                  className={`px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                    location.pathname.includes("/products")
                      ? "text-[#a83e23]"
                      : "text-slate-800 hover:text-[#a83e23]"
                  }`}
                >
                  Products
                </Link>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-slate-600 ${
                    dropdownOpen ? "rotate-180 text-[#a83e23]" : ""
                  }`}
                />
              </div>

              {/* Floating Submenu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-3 px-2 z-50"
                  >
                    <div className="px-3 pb-2 mb-2 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Extrusion &amp; Assembly Systems
                    </div>

                    {categoriesData.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-[#a83e23] transition-colors group"
                      >
                        <span>{cat.name}</span>
                        <ArrowRight
                          size={12}
                          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#a83e23]"
                        />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/gallery"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-[#a83e23]" : "text-slate-800 hover:text-[#a83e23]"
                }`
              }
            >
              Gallery
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setDropdownOpen(false)}
              className={({ isActive }) =>
                `px-3.5 lg:px-4 py-2.5 text-xs lg:text-[13.5px] xl:text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive ? "text-[#a83e23]" : "text-slate-800 hover:text-[#a83e23]"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Contact Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/request-quote"
              className="hidden sm:inline-block bg-[#a83e23] hover:bg-[#8f311a] text-white font-display font-black tracking-wider text-xs sm:text-sm lg:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-none uppercase transition-all duration-300 shadow-md hover:shadow-lg no-underline"
            >
              Get Quote
            </Link>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800 hover:text-[#a83e23] hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#091b30]/98 backdrop-blur-xl text-white z-40 pt-24 pb-8 px-6 overflow-y-auto flex flex-col justify-between lg:hidden"
          >
            <div className="space-y-6">
              {/* Navigation Links */}
              <div className="flex flex-col gap-4 text-lg font-bold uppercase tracking-wider">
                <Link
                  to="/"
                  className="hover:text-[#a83e23] border-b border-white/10 pb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:text-[#a83e23] border-b border-white/10 pb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>

                {/* Mobile Products Menu Item with Collapsible Submenu */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="flex items-center justify-between w-full text-left hover:text-[#a83e23] border-b border-white/10 pb-3 font-bold text-lg uppercase tracking-wider bg-transparent border-0 text-white outline-none cursor-pointer"
                  >
                    <span>Products</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 text-white/70 ${
                        mobileProductsOpen ? "rotate-180 text-[#a83e23]" : ""
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden flex flex-col pl-4 gap-3 pt-3"
                      >
                        <Link
                          to="/products"
                          className="text-sm font-bold uppercase tracking-wider text-white/70 hover:text-[#a83e23] transition-colors pb-1 border-b border-white/5"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProductsOpen(false);
                          }}
                        >
                          All Products
                        </Link>
                        {categoriesData.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/products?category=${cat.slug}`}
                            className="text-sm font-bold uppercase tracking-wider text-white/70 hover:text-[#a83e23] transition-colors pb-1 border-b border-white/5 last:border-0"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProductsOpen(false);
                            }}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link
                  to="/gallery"
                  className="hover:text-[#a83e23] border-b border-white/10 pb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  to="/contact"
                  className="hover:text-[#a83e23] pb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="space-y-3 pt-6 border-t border-white/15">
              <Link
                to="/request-quote"
                className="flex items-center justify-center bg-[#a83e23] hover:bg-[#8f311a] text-white font-bold py-3.5 px-6 rounded-none w-full text-center text-sm uppercase tracking-wider transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
