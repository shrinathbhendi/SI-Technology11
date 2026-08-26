import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Mail, MessageCircle, Info, ChevronRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import productsData from "../../data/Products.json";
import { SITE_CONFIG, getWhatsAppUrl, getMailtoHref } from "../../constants/siteConfig";

export default function ProductDetails() {
  const { slug } = useParams();
  
  // Find product by id (e.g. sit-2020ts) or code (e.g. SIT-2020TS)
  const product = productsData.find(
    p => p.id === slug || p.code.toLowerCase() === slug
  );

  // RFQ modal state
  const [showRfqModal, setShowRfqModal] = useState(false);
  const [rfqSuccess, setRfqSuccess] = useState(false);
  const [rfqData, setRfqData] = useState({
    name: "",
    email: "",
    quantity: "",
    notes: ""
  });

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary-900">Product Not Found</h2>
        <p className="text-dark-500 text-sm">
          The requested engineering SKU does not exist in our catalog database.
        </p>
        <Link to="/products" className="btn-primary inline-flex">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  // Get related products (same category, exclude current)
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    setRfqSuccess(true);
    setTimeout(() => {
      setRfqSuccess(false);
      setShowRfqModal(false);
      setRfqData({ name: "", email: "", quantity: "", notes: "" });
    }, 2500);
  };

  const whatsappInquiryUrl = getWhatsAppUrl(
    `Hi SI Technology, I am interested in your product: ${product.name} (Code: ${product.code}). Please share price and delivery time.`
  );

  return (
    <>
      <Helmet>
        <title>{`${product.name} (${product.code}) | SI Technology`}</title>
        <meta name="description" content={`Get specifications, weight, material, slot details, and applications for ${product.name} (Code: ${product.code}) from SI Technology.`} />
      </Helmet>

      <div className="w-full pt-24 pb-16 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Breadcrumb & Back button */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-dark-500 mb-8">
            <Link to="/products" className="hover:text-accent-500 flex items-center gap-1">
              <ArrowLeft size={12} /> Catalogue
            </Link>
            <ChevronRight size={10} />
            <Link to={`/products?category=${product.category}`} className="hover:text-accent-500">
              {product.category.replace("-", " ")}
            </Link>
            <ChevronRight size={10} />
            <span className="text-dark-700 font-bold">{product.code}</span>
          </div>

          {/* Main Layout Card */}
          <div className="bg-white border border-dark-200 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-sm relative overflow-hidden mb-12">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            
            {/* Left: Image Zoom Panel (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="aspect-square bg-dark-50 border border-dark-100 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-3 right-3 bg-white/80 border border-dark-200 text-[10px] font-mono uppercase px-2 py-1 rounded shadow-sm">
                  Zoom Hover
                </div>
              </div>
            </div>

            {/* Right: Spec Info (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-primary-900 text-white text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded">
                    Code: {product.code}
                  </span>
                  <span className="bg-dark-50 border border-dark-200 text-dark-700 text-xs font-mono px-3 py-1 rounded">
                    {product.material}
                  </span>
                </div>

                <h1 className="text-xl sm:text-3xl font-display font-black text-primary-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-dark-600 text-sm leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Applications list */}
                {product.application && product.application.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="font-display font-black text-xs uppercase tracking-wider text-dark-400">Applications</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.application.map((app, index) => (
                        <span 
                          key={index} 
                          className="bg-primary-50 border border-primary-100 text-primary-900 text-xs font-bold px-3.5 py-1.5 rounded-lg"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-dark-100">
                <button
                  onClick={() => setShowRfqModal(true)}
                  className="flex-1 btn-primary justify-center text-sm shadow-md"
                >
                  <Mail size={16} /> Request Quote (RFQ)
                </button>
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all shadow-md"
                >
                  <FaWhatsapp size={16} /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>

          {/* Technical Specifications Tab Panel */}
          <div className="bg-white border border-dark-200 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
            <h3 className="font-display font-black text-lg text-primary-900 mb-6 flex items-center gap-2">
              <Info size={20} className="text-accent-500" /> Technical Parameters
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Specs Table */}
              <div className="border border-dark-100 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-primary-900 text-white font-mono uppercase tracking-widest text-[10px]">
                      <th className="px-4 py-3">Parameter</th>
                      <th className="px-4 py-3">Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100 bg-white">
                    <tr className="hover:bg-dark-50/50">
                      <td className="px-4 py-3 font-semibold text-dark-800">Grade Alloy</td>
                      <td className="px-4 py-3 text-dark-600">Aluminium 6063 T6 (DIN Compliant)</td>
                    </tr>
                    <tr className="hover:bg-dark-50/50">
                      <td className="px-4 py-3 font-semibold text-dark-800">Finish Coating</td>
                      <td className="px-4 py-3 text-dark-600">{product.finish || "Silver Anodized"}</td>
                    </tr>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <tr key={key} className="hover:bg-dark-50/50">
                        <td className="px-4 py-3 font-semibold text-dark-800 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </td>
                        <td className="px-4 py-3 text-dark-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Extra Guidelines */}
              <div className="bg-dark-50 rounded-2xl p-6 border border-dark-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="font-display font-black text-sm text-primary-900">Assembly &amp; Customization Rules</h4>
                  <ul className="space-y-2 text-xs text-dark-650 leading-relaxed font-light">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                      Profiles can be pre-cut to exact custom lengths in our facility to prevent on-site scrap.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                      Tapping, slotting, and counter-boring services are executed as per structural layout drawings.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                      Compatible brackets, hammer nuts, and hidden connectors are bundled in standard pack counts.
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-dark-200 rounded-xl p-4 mt-6">
                  <p className="text-[10px] text-dark-400 font-mono uppercase tracking-widest leading-none mb-1">Central Helpdesk</p>
                  <p className="text-xs text-dark-700">
                    Submit structural loading inquiries directly to <strong>{SITE_CONFIG.contact.email}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-display font-black text-lg text-primary-900">Related Components</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/products/${rel.code.toLowerCase()}`}
                    className="bg-white border border-dark-200 hover:border-primary-900 rounded-2xl p-4 transition-all duration-300 hover:shadow-md flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="aspect-square bg-dark-50 border border-dark-100 rounded-xl mb-3 p-4 flex items-center justify-center">
                        <img 
                          src={rel.image} 
                          alt={rel.name} 
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-primary-900 group-hover:text-accent-500 transition-colors line-clamp-2">
                        {rel.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-accent-500 mt-3 block">
                      Code: {rel.code}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* RFQ MODAL PANEL */}
      {showRfqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-3xl border border-dark-200 shadow-2xl p-6 sm:p-8 max-w-md w-full relative">
            
            <button 
              onClick={() => setShowRfqModal(false)}
              className="absolute top-4 right-4 text-dark-400 hover:text-dark-800 p-2 cursor-pointer"
            >
              Cancel
            </button>

            {rfqSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Check size={28} />
                </div>
                <h3 className="text-lg font-bold text-primary-900 font-display">Inquiry Sent Successfully</h3>
                <p className="text-dark-500 text-xs font-light leading-relaxed max-w-xs mx-auto">
                  Thank you! Our engineering cell has received your RFQ for <strong>{product.code}</strong> and will email your quote within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-accent-500 uppercase tracking-widest block font-bold">Request For Quote</span>
                  <h3 className="text-lg font-bold text-primary-900 font-display">Inquire: {product.code}</h3>
                  <p className="text-[11px] text-dark-500 leading-normal font-light">
                    Fill out the fields to receive an official PDF quote with current shipping weights and lead times.
                  </p>
                </div>

                <form onSubmit={handleRfqSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-dark-500 uppercase tracking-wider mb-1.5 font-mono">Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={rfqData.name}
                      onChange={(e) => setRfqData({...rfqData, name: e.target.value})}
                      placeholder="John Doe" 
                      className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-2.5 text-xs text-dark-800 focus:outline-none focus:border-primary-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-dark-500 uppercase tracking-wider mb-1.5 font-mono">Corporate Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={rfqData.email}
                      onChange={(e) => setRfqData({...rfqData, email: e.target.value})}
                      placeholder="you@company.com" 
                      className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-2.5 text-xs text-dark-800 focus:outline-none focus:border-primary-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-dark-500 uppercase tracking-wider mb-1.5 font-mono">Project Quantity (Mtrs / Pcs) *</label>
                    <input 
                      type="text" 
                      required 
                      value={rfqData.quantity}
                      onChange={(e) => setRfqData({...rfqData, quantity: e.target.value})}
                      placeholder="e.g. 50 meters or 10 pcs" 
                      className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-2.5 text-xs text-dark-800 focus:outline-none focus:border-primary-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-dark-500 uppercase tracking-wider mb-1.5 font-mono">Design Notes / Custom Lengths</label>
                    <textarea 
                      rows={3} 
                      value={rfqData.notes}
                      onChange={(e) => setRfqData({...rfqData, notes: e.target.value})}
                      placeholder="Specify cutting, drilling, tapping requirements or assembly guide requests..." 
                      className="w-full bg-dark-50 border border-dark-200 rounded-xl px-4 py-2.5 text-xs text-dark-800 focus:outline-none focus:border-primary-900 resize-none"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full btn-primary justify-center text-xs font-bold py-3"
                  >
                    Submit RFQ
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
