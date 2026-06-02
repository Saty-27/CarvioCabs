import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { API } from "@/apiConfig";
import { useSEO } from "@/hooks/useSEO";
import { Navbar, Footer } from "./HomePage";
import { resolveImageUrl } from "@/utils/imageUrl";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, ChevronRight, Zap, Shield } from "lucide-react";

export default function FleetPage() {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "Carvio Cabs Fleet | Premium Cars, Sedans & SUVs for Rent in Mumbai",
    description: "Explore Carvio Cabs fleet in Mumbai including sedans, SUVs and premium chauffeur-driven cars for airport transfers, corporate travel, local rentals and outstation trips.",
    keywords: "Carvio Cabs fleet, luxury cars rent Mumbai, sedan cab booking, SUV car rental Mumbai",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Carvio Cabs Premium Fleet",
      "description": "Select from our fleet of clean, premium sedans and SUVs with professional drivers in Mumbai."
    }
  });

  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const response = await axios.get(`${API}/fleet`);
        setFleet(response.data);
      } catch (error) {
        console.error("Error fetching fleet:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFleet();
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#FFD700] text-sm font-medium tracking-widest uppercase">Our Fleet</span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6">Choose Your <span className="text-[#FFD700]">Luxury</span></h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From executive sedans to spacious SUVs, find the perfect vehicle for your journey.</p>
          </motion.div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex justify-center py-20"><div className="loader" /></div>
          ) : (
            <div className="space-y-12 max-w-5xl mx-auto">
              {fleet.map((car, i) => {
                const displayName = car.subtitle ? `${car.name} ${car.subtitle}` : car.name;
                
                return (
                  <motion.div 
                    key={car.car_id} 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex flex-col lg:flex-row items-center gap-8 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 lg:p-8 hover:border-[#FFD700]/30 hover:shadow-[0_4px_30px_rgba(255,215,0,0.05)] transition-all duration-500 group"
                  >
                    {/* Left side: Image and details */}
                    <div className="w-full lg:w-2/5 flex flex-col items-center">
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-zinc-900/30 flex items-center justify-center">
                        <img 
                          src={resolveImageUrl(car.image)} 
                          alt={car.name} 
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      
                      {/* Technical Specs Badges */}
                      <div className="grid grid-cols-4 gap-2 w-full mt-4 text-center">
                        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-2 flex flex-col items-center justify-center gap-1">
                          <Users size={16} className="text-[#FFD700]" />
                          <span className="text-[11px] text-zinc-400 font-medium">{car.passengers} seats</span>
                        </div>
                        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-2 flex flex-col items-center justify-center gap-1">
                          <Briefcase size={16} className="text-[#FFD700]" />
                          <span className="text-[11px] text-zinc-400 font-medium">{car.luggage} bags</span>
                        </div>
                        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-2 flex flex-col items-center justify-center gap-1">
                          <Zap size={16} className="text-[#FFD700]" />
                          <span className="text-[11px] text-zinc-400 font-medium">{car.fuel_type || "Petrol"}</span>
                        </div>
                        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-2 flex flex-col items-center justify-center gap-1">
                          <Shield size={16} className="text-[#FFD700]" />
                          <span className="text-[11px] text-zinc-400 font-medium">AC / GPS</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Pricing Box */}
                    <div className="w-full lg:w-3/5 flex flex-col justify-between h-full gap-6">
                      <div className="relative border border-zinc-800 bg-black rounded-xl pt-8 pb-6 px-4 lg:px-8 mt-4 shadow-inner">
                        {/* Custom Name Capsule Badge */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD700] text-black text-xs lg:text-sm font-bold tracking-widest px-6 py-1.5 rounded uppercase whitespace-nowrap shadow-[0_4px_12px_rgba(255,215,0,0.3)]">
                          {displayName}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative">
                          {/* Left Column: Local Packages */}
                          <div className="space-y-2 md:pr-4">
                            <div className="flex justify-between items-center text-xs lg:text-sm border-b border-zinc-900/40 pb-1.5">
                              <span className="text-zinc-400">4HR-40KM</span>
                              <span className="text-white font-bold">— <span className="text-[#FFD700] ml-1">₹{car.rental_4hr}</span></span>
                            </div>
                            <div className="flex justify-between items-center text-xs lg:text-sm border-b border-zinc-900/40 pb-1.5">
                              <span className="text-zinc-400">8HR-80KM</span>
                              <span className="text-white font-bold">— <span className="text-[#FFD700] ml-1">₹{car.rental_8hr}</span></span>
                            </div>
                            <div className="flex justify-between items-center text-xs lg:text-sm border-b border-zinc-900/40 pb-1.5">
                              <span className="text-zinc-400">Extra KM</span>
                              <span className="text-white font-bold">— <span className="text-[#FFD700] ml-1">₹{car.extra_km}</span></span>
                            </div>
                            <div className="flex justify-between items-center text-xs lg:text-sm">
                              <span className="text-zinc-400">Extra HR</span>
                              <span className="text-white font-bold">— <span className="text-[#FFD700] ml-1">₹{car.extra_hour}</span></span>
                            </div>
                          </div>

                          {/* Vertical divider on desktop */}
                          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 -translate-x-1/2" />

                          {/* Right Column: Outstation & Allowances */}
                          <div className="space-y-2 md:pl-4">
                            <div className="flex justify-between items-center text-xs lg:text-sm border-b border-zinc-900/40 pb-1.5">
                              <span className="text-zinc-400">O/S Per Day</span>
                              <span className="text-white font-bold">— <span className="text-[#FFD700] ml-1">{car.outstation_min_km || 300}km</span></span>
                            </div>
                            <div className="flex justify-between items-center text-xs lg:text-sm border-b border-zinc-900/40 pb-1.5">
                              <span className="text-zinc-400">Driver Allowance</span>
                              <span className="text-white font-bold">— <span className="text-[#FFD700] ml-1">₹{car.driver_allowance}</span></span>
                            </div>
                            <div className="flex justify-between items-center text-xs lg:text-sm">
                              <span className="text-zinc-400">Night Allowance</span>
                              <span className="text-white font-bold">— <span className="text-[#FFD700] ml-1">₹{car.night_allowance}</span></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description and CTA button */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-zinc-500 text-xs md:text-sm italic text-center sm:text-left">
                          {car.description || "Premium air-conditioned vehicle with professional chauffeur service."}
                        </p>
                        <Link to={`/fleet/${car.car_id}`} className="w-full sm:w-auto shrink-0">
                          <Button className="w-full sm:w-auto bg-[#FFD700] text-black hover:bg-[#E5C100] font-semibold px-8 transition-all hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                            View Details <ChevronRight size={16} className="ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
