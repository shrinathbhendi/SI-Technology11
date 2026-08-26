import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import { galleryItems, getCategoryForItem } from "../../data/galleryItems";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter items
  const filteredItems = filter === "all"
    ? galleryItems
    : galleryItems.filter(item => getCategoryForItem(item) === filter);

  // Slides format for yet-another-react-lightbox
  const slides = filteredItems.map(item => ({
    src: item.src,
    title: item.title,
    description: item.desc
  }));

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setOpenLightbox(true);
  };

  return (
    <>
      <Helmet>
        <title>Engineering Gallery &amp; Installations | SI Technology</title>
        <meta name="description" content="View SI Technology's portfolio of custom installations, heavy-duty aluminium profile systems, lean manufacturing conveyors, and factory floor shots." />
      </Helmet>

      <div className="w-full">
        {/* ─── HERO SECTION WITH BACKGROUND IMAGE ─── */}
        <section className="relative overflow-hidden swiss-border-b" style={{ minHeight: "350px" }}>
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/gallery_hero_bg.png"
              alt="SI Technology Installation Showroom Gallery"
              className="w-full h-full object-cover object-center opacity-85"
            />
            {/* Dark Balanced Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-950/85 via-primary-950/75 to-black/90" />
            <div className="absolute inset-0 bg-grid-light opacity-5" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm font-mono text-white/40 mb-6">
              <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-accent-400 font-semibold">Gallery</span>
            </nav>
            <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-display font-black leading-[1.15] mb-4">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-white"
                >
                  Factory Installations
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#f97316] mt-1"
                >
                  &amp; Products.
                </motion.span>
              </h1>
              <p className="text-white/80 text-base sm:text-lg font-semibold leading-relaxed">
                Explore our portfolio of custom workstations, raw extrusions, safety boundaries, and modular pipe tracks on shopfloors across Pune &amp; India.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid & Filters Section */}
        <div className="py-16 bg-dark-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Filters List */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: "all", label: "All Photos" },
                { id: "aluminum_profile", label: "Aluminum Profile Workstation" },
                { id: "customized_workstation", label: "Customized Workstation" },
                { id: "pipe_joints", label: "Pipe & Joints Projects" },
                { id: "fifo_rack", label: "FIFO Rack Projects" },
                { id: "machine_guarding", label: "Machine Guarding Projects" },
                { id: "ms_fabrication", label: "MS Fabrication Projects" }
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all border cursor-pointer ${filter === btn.id
                      ? "bg-primary-900 border-primary-900 text-white shadow-md"
                      : "bg-white border-dark-200 text-dark-750 hover:bg-dark-50"
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Grid layout with 4 columns per row on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleImageClick(index)}
                  className="bg-white border border-dark-200 rounded-2xl overflow-hidden shadow-sm hover:border-primary-900 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden aspect-[4/3] w-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary-950/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white text-primary-900 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <ZoomIn size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-dark-100 flex-grow flex items-center">
                    <h1 className="text-xs sm:text-sm font-bold text-primary-900 leading-snug">
                      {item.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      {openLightbox && (
        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          index={lightboxIndex}
          slides={slides}
        />
      )}
    </>
  );
}
