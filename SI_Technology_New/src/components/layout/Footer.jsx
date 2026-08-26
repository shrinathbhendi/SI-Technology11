import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight, Factory } from "lucide-react";
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { SITE_CONFIG, getMailtoHref } from "../../constants/siteConfig";
import categoriesData from "../../data/Categories.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();



  return (
    <footer className="bg-primary-950 text-white border-t border-white/5 relative overflow-hidden">
      {/* Blueprint background lines watermark */}
      <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />

      {/* Subtle background image watermark */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none z-0"
        style={{ backgroundImage: "url('/images/footer_bg.png')" }}
      />


      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {/* Col 1: Company Profile */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3.5 group no-underline hover:no-underline">
            <div className="relative w-11 h-11 bg-white rounded-lg p-1 transition-all border border-white/20 shadow-sm flex items-center justify-center">
              <img
                src="/images/logo/si-technology-new-logo.png"
                alt="SI Technology Logo"
                className="object-contain max-h-full max-w-full"
              />
            </div>
            <div>
              <div className="font-display font-black text-white text-base tracking-wide leading-none no-underline hover:no-underline">
                SI&nbsp;&nbsp;TECHNOLOGY
              </div>
              <div className="text-[10px] text-white/50 font-mono tracking-wider mt-1 uppercase">
                ESTABLISHED 2018
              </div>
            </div>
          </Link>

          <p className="text-white/60 text-sm leading-relaxed font-light">
            SI Technology is a leading Indian provider of premium industrial aluminium profile structures, conveyor paths, cleanroom partitioning, and lean manufacturing automation solutions.
          </p>

          <div className="flex items-center gap-2 text-white/40 text-xs font-mono uppercase tracking-widest">
            <Factory size={14} className="text-[#6590a6]" />
            <span>Made in India</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#0077B5] hover:text-white text-white/60 flex items-center justify-center transition-all border border-white/10"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF0000] hover:text-white text-white/60 flex items-center justify-center transition-all border border-white/10"
              aria-label="YouTube"
            >
              <FaYoutube size={16} />
            </a>

            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E1306C] hover:text-white text-white/60 flex items-center justify-center transition-all border border-white/10"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-4 lg:pl-10 xl:pl-14">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Products", path: "/products" },
              { name: "Gallery", path: "/gallery" },
              { name: "Contact Us", path: "/contact" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="text-white/60 hover:text-[#6590a6] text-sm transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#6590a6]" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Products & Downloads */}
        <div className="space-y-4">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
            Products & Downloads
          </h4>
          <ul className="space-y-2.5">
            {categoriesData.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="text-white/60 hover:text-[#6590a6] text-sm transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#6590a6]" />
                  {cat.name}
                </Link>
              </li>
            ))}

          </ul>
        </div>

        {/* Col 4: Contact & Working Hours */}
        <div className="space-y-6">
          <h4 className="font-display font-black text-sm uppercase tracking-wider text-white">
            Contact Engineering Office
          </h4>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3 text-sm text-white/60">
              <MapPin size={16} className="text-[#6590a6] shrink-0 mt-1" />
              <span className="font-light">
                <strong>SI TECHNOLOGY</strong>
                <br />
                {SITE_CONFIG.contact.address.line1}
                <br />
                {SITE_CONFIG.contact.address.line2}
                <br />
                {SITE_CONFIG.contact.address.city} - {SITE_CONFIG.contact.address.zip}, {SITE_CONFIG.contact.address.state}, India
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#6590a6] shrink-0" />
              <div className="text-sm font-semibold">
                <a href={`tel:${SITE_CONFIG.contact.phoneTel}`} className="hover:text-[#6590a6] transition-colors">
                  {SITE_CONFIG.contact.phone}
                </a>
                {" / "}
                <a href={`tel:+919764674113`} className="hover:text-[#6590a6] transition-colors">
                  {SITE_CONFIG.contact.phoneSecondary}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#6590a6] shrink-0" />
              <div className="text-sm">
                <a href={getMailtoHref()} className="hover:text-[#6590a6] transition-colors font-semibold block">
                  {SITE_CONFIG.contact.email}
                </a>
                <a href={`mailto:${SITE_CONFIG.contact.emailSecondary}`} className="hover:text-[#6590a6] transition-colors text-xs text-white/40 block">
                  {SITE_CONFIG.contact.emailSecondary}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3 text-sm text-white/60 border-t border-white/10 pt-3">
              <Clock size={16} className="text-[#6590a6] shrink-0" />
              <span className="font-light text-xs">{SITE_CONFIG.contact.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>



      {/* ─── BOTTOM COPYRIGHT BAR ─── */}
      <div className="border-t border-white/5 bg-black/40 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-2 text-xs text-white text-center">
          <p>© {currentYear} {SITE_CONFIG.company.name}. All rights reserved.</p>
          <p className="font-light text-white">
            Developed By{" "}
            <a
              href="https://mindaxisinnovation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#6590a6] transition-colors font-semibold"
            >
              MindAxis Innovation Pvt Ltd.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
