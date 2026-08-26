import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG, getWhatsAppUrl, getMailtoHref, getTelHref } from "../../constants/siteConfig";

export default function Contact() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();

  const [formSuccess, setFormSuccess] = useState(false);

  const onSubmit = (data) => {
    // Validate phone number is exactly 10 digits
    if (!/^[0-9]{10}$/.test(data.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Generate WhatsApp link and redirect
    const message = `*New Website Inquiry*\n\n` +
                    `*Name:* ${data.name}\n` +
                    `*Company:* ${data.company || "N/A"}\n` +
                    `*Email:* ${data.email}\n` +
                    `*Phone:* ${data.phone}\n` +
                    `*Subject:* ${data.subject}\n\n` +
                    `*Message:* ${data.message}`;

    const whatsappUrl = getWhatsAppUrl(message);
    
    // Redirect / open WhatsApp
    window.open(whatsappUrl, "_blank");

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      reset();
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | SI Technology Pune</title>
        <meta name="description" content="Reach out to SI Technology in Dhayari, Pune. Get driving directions, phone numbers, corporate emails, and submit inquiries for aluminium profiles." />
      </Helmet>

      <div className="w-full bg-dark-50">
        
        {/* Contact Hero Section */}
        <section className="relative overflow-hidden bg-primary-950" style={{ minHeight: "350px" }}>
          {/* Background Image with Dark Blue Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45" 
            style={{ backgroundImage: "url('/images/workstations/workstations_001.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/90 to-primary-950/70" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-32 pb-16">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-start gap-2 text-xs sm:text-sm font-mono text-white/40 mb-6 w-full">
              <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-accent-400 font-semibold">Contact</span>
            </nav>
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black leading-none mb-4">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-white"
                >
                  Engineering Collaboration
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#f97316] mt-2"
                >
                  &amp; Technical Support
                </motion.span>
              </h1>
              <p className="text-white/60 text-xs sm:text-sm font-semibold max-w-xl mx-auto leading-relaxed">
                Get in touch with our design office in Dhayari, Pune to discuss customized modular workspaces, conveyors, lean automation layouts, or profile orders.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-8 sm:mb-10">
            {/* Left: Contact Info cards (5 cols) - Order 2 on Mobile, Order 1 on Desktop */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-black text-primary-900 font-display text-center lg:text-left">Contact Details</h1>
              
              <div className="bg-gradient-to-br from-primary-900/10 via-primary-50/60 to-dark-50 border border-primary-200/80 rounded-3xl p-5 sm:p-8 shadow-md flex-1 space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
                
                {/* Physical Address */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 bg-primary-50 border border-primary-100 text-primary-900 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-dark-400 uppercase tracking-widest block font-bold leading-none">Office &amp; Shed Location</span>
                    <p className="text-dark-800 text-xs sm:text-sm leading-relaxed font-light">
                      <strong>SI TECHNOLOGY</strong>
                      <br />
                      {SITE_CONFIG.contact.address.line1}
                      <br />
                      {SITE_CONFIG.contact.address.line2}
                      <br />
                      {SITE_CONFIG.contact.address.city} - {SITE_CONFIG.contact.address.zip}, {SITE_CONFIG.contact.address.state}, India
                    </p>
                  </div>
                </div>

                {/* Telephone Numbers */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 bg-primary-50 border border-primary-100 text-primary-900 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-dark-400 uppercase tracking-widest block font-bold leading-none">Phone Lines</span>
                    <a href={getTelHref()} className="text-dark-800 text-sm font-semibold hover:text-accent-500 transition-colors block">
                      {SITE_CONFIG.contact.phone}
                    </a>
                    <a href="tel:+919764674113" className="text-dark-800 text-sm font-semibold hover:text-accent-500 transition-colors block">
                      {SITE_CONFIG.contact.phoneSecondary}
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 bg-primary-50 border border-primary-100 text-primary-900 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-dark-400 uppercase tracking-widest block font-bold leading-none">Email Address</span>
                    <a href={getMailtoHref()} className="text-dark-800 text-sm font-semibold hover:text-accent-500 transition-colors block">
                      {SITE_CONFIG.contact.email}
                    </a>
                    <a href={`mailto:${SITE_CONFIG.contact.emailSecondary}`} className="text-dark-800 text-xs text-dark-400 hover:text-accent-500 transition-colors block">
                      {SITE_CONFIG.contact.emailSecondary}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-4 relative z-10">
                  <div className="w-10 h-10 bg-primary-50 border border-primary-100 text-primary-900 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-dark-400 uppercase tracking-widest block font-bold leading-none">Business Hours</span>
                    <p className="text-dark-700 text-xs sm:text-sm font-light">
                      {SITE_CONFIG.contact.workingHours}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Contact Form (7 cols) - Order 1 on Mobile so it is visible first! */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
              <h1 className="text-xl xs:text-2xl sm:text-3xl font-black text-primary-900 font-display text-center lg:text-left">Send Inquiry</h1>
              
              <div className="bg-primary-950 text-white border border-primary-800 rounded-3xl p-5 sm:p-8 shadow-xl flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none" />

                {formSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 border border-green-400 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Check size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">Redirecting to WhatsApp...</h3>
                    <p className="text-white/70 text-xs font-light max-w-sm leading-relaxed">
                      Thank you for contacting us. We are opening WhatsApp to submit your message. Our engineering team will respond within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-1.5 font-mono">Full Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...register("name", { required: true })}
                          className={`w-full bg-primary-900/80 border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent-500 transition-colors ${
                            errors.name ? "border-red-500" : "border-white/15"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-1.5 font-mono">Company / Plant</label>
                        <input
                          type="text"
                          placeholder="Your Company Name"
                          {...register("company")}
                          className="w-full bg-primary-900/80 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-1.5 font-mono">Email</label>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                          className={`w-full bg-primary-900/80 border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent-500 transition-colors ${
                            errors.email ? "border-red-500" : "border-white/15"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-1.5 font-mono">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          {...register("phone", { 
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Phone number must be exactly 10 digits"
                            },
                            onChange: (e) => {
                              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                            }
                          })}
                          className={`w-full bg-primary-900/80 border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent-500 transition-colors ${
                            errors.phone ? "border-red-500" : "border-white/15"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[10px] mt-1 font-semibold">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-1.5 font-mono">Subject Topic</label>
                      <select
                        {...register("subject", { required: true })}
                        className="w-full bg-primary-900/80 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-500 transition-colors"
                      >
                        <option value="Product Price & Quote" className="bg-primary-950 text-white">Product Price &amp; Quote Request</option>
                        <option value="Custom Workstation Design" className="bg-primary-950 text-white">Custom Workstation Design Support</option>
                        <option value="Pipe Joint Racking Layout" className="bg-primary-950 text-white">Pipe &amp; Joint Lean Systems Inquiry</option>
                        <option value="Safety Guard Fencing Layout" className="bg-primary-950 text-white">Safety Guard Boundary Inquiry</option>
                        <option value="Other Shopfloor Requirement" className="bg-primary-950 text-white">Other Shopfloor Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-1.5 font-mono">Inquiry Message</label>
                      <textarea
                        rows={4}
                        placeholder="Detail your parameters: e.g. Aluminium Profile 40x40 Heavy, 120 meters, pre-cut to 3.2m lengths, with M8 hammer nuts."
                        {...register("message", { required: true })}
                        className={`w-full bg-primary-900/80 border rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-accent-500 transition-colors resize-none ${
                          errors.message ? "border-red-500" : "border-white/15"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl justify-center text-xs py-3.5 shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <Send size={14} /> Send WhatsApp Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Google Map Map */}
          <div className="bg-white border border-dark-200 rounded-3xl p-5 sm:p-8 shadow-sm">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-primary-900 mb-4">
              Map Directions
            </h3>
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-dark-100">
              <iframe
                src={SITE_CONFIG.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SI Technology Location directions map"
              />
              <div className="absolute top-4 left-4 z-10">
                <a
                  href={SITE_CONFIG.contact.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-900 hover:bg-accent-500 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-lg border border-white/10 shadow-lg block"
                >
                  Open in Google Maps App ↗
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
