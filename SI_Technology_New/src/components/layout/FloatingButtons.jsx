import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, FileText, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppUrl, SITE_CONFIG } from "../../constants/siteConfig";

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Phone Call Float */}
      <a
        href={`tel:${SITE_CONFIG.contact.phoneTel}`}
        className="w-12 h-12 rounded-full bg-[#091b30] hover:bg-[#1e293b] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border border-slate-900/10"
        aria-label="Call Us"
        title="Call Us"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp Float */}
      <a
        href={getWhatsAppUrl("Hi, I am browsing your website and want to discuss custom engineering profiles.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border border-green-600/10"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Floating Quote Trigger (Mobile Only, since it's in Navbar on desktop) */}
      <Link
        to="/request-quote"
        className="w-12 h-12 rounded-full bg-accent-500 hover:bg-accent-400 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer sm:hidden border border-accent-600/10"
        aria-label="Request Quote"
        title="Request Quote"
      >
        <FileText size={20} />
      </Link>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-primary-900 hover:bg-primary-800 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer border border-primary-950/10 animate-fade-in"
          aria-label="Scroll to top"
          title="Scroll to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
