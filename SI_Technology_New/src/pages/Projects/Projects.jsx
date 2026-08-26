import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Factory, Calendar } from "lucide-react";
import projectsData from "../../data/Projects.json";

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Engineering Projects &amp; Case Studies | SI Technology</title>
        <meta name="description" content="Read case studies on SI Technology's modular installations: gravity FIFO racks for auto plants, ESD workbenches, and robotic safety guard fences." />
      </Helmet>

      <div className="w-full pt-24 pb-16 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 rounded-full px-4 py-1.5 text-xs text-primary-900 font-bold uppercase tracking-wider">
              Case Studies
            </div>
            <h1 className="text-xl xs:text-2xl sm:text-4xl font-display font-black text-primary-900 tracking-tight">
              Modular Framing Installations
            </h1>
            <p className="text-dark-500 text-sm font-light">
              See how we help manufacturing and logistics facilities optimize workspace flow, safety compliant boundaries, and material delivery speed.
            </p>
          </div>

          {/* Projects Stack */}
          <div className="space-y-16">
            {projectsData.map((proj, idx) => (
              <div 
                key={proj.id}
                className="bg-white border border-dark-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
                  {/* Left Column: Details (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                        <span className="bg-primary-900 text-white font-bold px-3 py-1 rounded">
                          {proj.industry}
                        </span>
                        <span className="text-dark-400 flex items-center gap-1">
                          <Factory size={13} className="text-accent-500" /> SI-PROJ-00{idx+1}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-primary-900 font-display tracking-tight">
                        {proj.name}
                      </h2>

                      {/* Challenge, Solution, Result blocks */}
                      <div className="space-y-4 pt-2">
                        <div className="border-l-2 border-red-500 pl-4 py-0.5">
                          <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold">The Challenge</span>
                          <p className="text-dark-600 text-xs sm:text-sm leading-relaxed mt-1 font-light">{proj.challenge}</p>
                        </div>
                        
                        <div className="border-l-2 border-primary-900 pl-4 py-0.5">
                          <span className="text-[10px] font-mono text-primary-900 uppercase tracking-widest font-bold">Our Solution</span>
                          <p className="text-dark-600 text-xs sm:text-sm leading-relaxed mt-1 font-light">{proj.solution}</p>
                        </div>

                        <div className="border-l-2 border-green-600 pl-4 py-0.5 bg-green-50/20">
                          <span className="text-[10px] font-mono text-green-600 uppercase tracking-widest font-bold font-black">The Result</span>
                          <div className="flex items-start gap-1.5 mt-1">
                            <CheckCircle2 size={15} className="text-green-600 shrink-0 mt-0.5" />
                            <p className="text-dark-800 text-xs sm:text-sm font-semibold leading-relaxed">{proj.result}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-dark-100 flex items-center justify-start">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs py-2.5 px-5 rounded-full transition-all"
                      >
                        Inquire About This Setup <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Visual Comparison (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-center gap-4">
                    <span className="text-[10px] font-mono text-dark-400 uppercase tracking-widest block font-bold text-center lg:text-left">
                      Visual Comparison: Before vs. After
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Before image */}
                      <div className="relative rounded-2xl overflow-hidden border border-dark-100 aspect-square">
                        <img 
                          src={proj.beforeImg} 
                          alt="Layout Before Installation" 
                          className="w-full h-full object-cover grayscale opacity-75"
                        />
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-mono uppercase font-bold px-2 py-0.5 rounded">
                          Before Setup
                        </div>
                      </div>
                      
                      {/* After image */}
                      <div className="relative rounded-2xl overflow-hidden border-2 border-primary-900 aspect-square">
                        <img 
                          src={proj.afterImg} 
                          alt="Layout After Installation" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-green-600 text-white text-[8px] font-mono uppercase font-bold px-2 py-0.5 rounded">
                          After SI Setup
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
