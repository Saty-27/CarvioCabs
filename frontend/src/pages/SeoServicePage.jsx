import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Navbar, Footer } from "@/pages/HomePage";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { MapPin, Phone, Car, ArrowRight, ShieldCheck, CheckCircle, HelpCircle, Calendar, Clock } from "lucide-react";
import axios from "axios";
import { API } from "@/apiConfig";

const SEO_PAGE_DATA = {
  "car-rental-mumbai": {
    title: "Car Rental in Mumbai | Book Chauffeur Driven Cars | Carvio Cab",
    description: "Book premium car rental in Mumbai with driver. Get safe, clean, and reliable chauffeur driven car rental service for city travel, airport and outstation.",
    keywords: "car rental in Mumbai, car rental service in Mumbai, Carvio car rental, car rental with driver in Mumbai, chauffeur driven car rental Mumbai, private car rental Mumbai",
    h1: "Car Rental Service in Mumbai with Driver",
    intro: "Carvio Cab offers premier chauffeur-driven car rental in Mumbai, tailoring premium executive travel, wedding transports, and leisure trips. Experience the ultimate convenience of professional, background-verified drivers and a top-tier sanitized fleet of sedans and SUVs.",
    contentTitle: "Experience Luxury Car Rental in Mumbai",
    contentDesc: "Our car rental service with driver in Mumbai is designed to cater to high-end corporate requirements, family events, and personalized city travel. With transparent billing, customizable packages, and 24/7 client booking desk support, Carvio Cab ensures your premium transport is fully secure and punctual.",
    icon: Car,
    features: [
      "Background-verified professional chauffeurs",
      "Sanitized premium sedans and luxury SUVs",
      "Transparent billing with no hidden fees",
      "24/7 priority customer helpline support"
    ],
    faqs: [
      { q: "What types of cars are available for rental in Mumbai?", a: "We offer a wide selection of vehicles, including compact sedans, premium sedans (Maruti Dzire), executive SUVs (Toyota Innova Crysta, Maruti Ertiga, Kia Carens), and luxury cars." },
      { q: "Is fuel and driver allowance included in the car rental price?", a: "Our local packages (such as 4-hour or 8-hour rentals) are all-inclusive of fuel. Driver allowances are stated clearly in the fare breakdowns to avoid surprise costs." }
    ],
    schemaType: "CarRental"
  },
  "airport-cab-mumbai": {
    title: "Mumbai Airport Cab Service | Airport Pickup & Drop | Carvio Cab",
    description: "Book Mumbai airport cab service with Carvio Cab for safe airport pickup and drop. Available for local, corporate, and private travel in Mumbai.",
    keywords: "Mumbai airport cab, Mumbai airport taxi, airport cab service Mumbai, airport pickup cab Mumbai, airport drop cab Mumbai, cab from Mumbai airport, T2 airport cab",
    h1: "Mumbai Airport Cab Service",
    intro: "Avoid terminal queues and surge pricing. Carvio Cab provides premium, flat-rate airport taxi service and pre-booked airport pickup/drop-off services at both Terminal 1 (Domestic) and Terminal 2 (International) of Mumbai Airport.",
    contentTitle: "Punctual Mumbai Airport Pickups and Drops",
    contentDesc: "We monitor commercial flights landing in Mumbai in real-time. Whether your flight is delayed or lands early, your chauffeur will adjust their schedule automatically—ensuring completely on-time terminal gate pickup with zero wait stress.",
    icon: ShieldCheck,
    features: [
      "Real-time flight schedule tracking",
      "Meet & greet with placards at arrivals terminal",
      "Fixed flat-rate pricing with zero hidden surcharges",
      "Professional airport luggage assistance"
    ],
    faqs: [
      { q: "How do I coordinate with my driver at Mumbai Airport T2?", a: "Upon landing, your chauffeur will call or message you to coordinate the pickup point. They will meet you at the designated terminal arrivals exit with a placard of your name." },
      { q: "Are wait times billed if my flight is delayed?", a: "No, we do not charge extra fees for flight delays since we adjust dispatch times based on real-time flight tracking data." }
    ],
    schemaType: "TaxiService"
  },
  "outstation-cab-mumbai": {
    title: "Outstation Cab from Mumbai | Pune, Nashik, Shirdi Taxi | Carvio Cab",
    description: "Book outstation cab from Mumbai to Pune, Nashik, Shirdi, Lonavala, Alibaug and more with Carvio Cab. Safe, comfortable and reliable taxi service.",
    keywords: "outstation cab from Mumbai, outstation taxi service Mumbai, one way cab from Mumbai, round trip cab from Mumbai, Mumbai to Pune cab, Mumbai to Nashik cab",
    h1: "Outstation Cab Service from Mumbai",
    intro: "Explore destinations beyond Mumbai with complete peace of mind. Carvio Cab offers premium intercity and outstation taxi service for one-way drops and round trips to major cities and weekend tourist destinations.",
    contentTitle: "Comfortable One-Way and Round Trip Intercity Travel",
    contentDesc: "Travel smoothly via the Expressway or highway. Our outstation fleet features top-tier AC SUVs and sedans driven by experienced long-haul drivers who are well-versed in highway safety and tourist routes.",
    icon: MapPin,
    features: [
      "Fixed one-way drop fares and roundtrip pricing",
      "Experienced and polite highway chauffeurs",
      "AC comfort with spacious luggage accommodation",
      "24/7 emergency highway roadside assistance"
    ],
    faqs: [
      { q: "What routes are popular for outstation cabs from Mumbai?", a: "Our most popular outstation routes include Mumbai to Pune, Lonavala, Nashik, Shirdi, Alibaug, Mahabaleshwar, and Surat." },
      { q: "Do you offer outstation drop service only?", a: "Yes, you can book one-way drops where you only pay for the distance travelled to your destination, or round trips for multi-day travels." }
    ],
    schemaType: "TaxiService"
  },
  "local-cab-mumbai": {
    title: "Local Cab Service in Mumbai | Hourly Taxi Rental | Carvio Cab",
    description: "Rent local cabs in Mumbai with flexible hourly packages (4hr/40km, 8hr/80km). Book a chauffeur-driven taxi for city travel, shopping, and business.",
    keywords: "local cab service Mumbai, local cab booking, car rental near me, taxi service in Mumbai, cab service near me",
    h1: "Local Cab Service in Mumbai",
    intro: "Travel across Mumbai in absolute comfort. Carvio Cab provides local taxi rentals with flexible hourly packages tailored for shopping, business meetings, hospital visits, sightseeing tours, and personal travel.",
    contentTitle: "Flexible Hourly Cab Rental with Driver",
    contentDesc: "With local packages like 4h/40km or 8h/80km, you can book a clean, air-conditioned car with a driver for the day. Make multiple stops, keep the vehicle as long as you need, and experience the convenience of private chauffeur travel.",
    icon: Clock,
    features: [
      "Flexible hourly packages (4h/40km, 8h/80km, 12h/120km)",
      "Multi-stop capabilities within Mumbai metropolitan areas",
      "AC comfort in premium sedans and executive SUVs",
      "Experienced local route chauffeurs"
    ],
    faqs: [
      { q: "Can I customize the hourly package duration?", a: "Yes, our default packages can be extended by paying fixed, transparent extra hour/kilometer charges, which are clearly shown before booking." },
      { q: "What areas are covered by local cab rental?", a: "We cover the entire Mumbai area, including South Mumbai, Western Suburbs, Eastern Suburbs, Thane, and Navi Mumbai." }
    ],
    schemaType: "TaxiService"
  },
  "corporate-cab-service": {
    title: "Corporate Cab Service Mumbai | Executive Car Rental | Carvio Cab",
    description: "Premium corporate cab service in Mumbai for monthly billing, employee transportation, executive business travel, and airport transfers.",
    keywords: "corporate cab service Mumbai, employee transportation Mumbai, corporate car rental Mumbai, office cab service Mumbai, business travel cab Mumbai",
    h1: "Corporate Cab Service in Mumbai",
    intro: "Streamline transportation logistics for your company. Carvio Cab provides specialized corporate cab services in Mumbai, serving business executives, guest pickups, business events, and regular employee commutes.",
    contentTitle: "Elite Corporate Transportation Solutions",
    contentDesc: "Ensure punctuality, security, and prestige for your business travels. We partner with companies to provide custom travel desks, priority dispatch, background-verified uniformed chauffeurs, and consolidated monthly billing.",
    icon: Car,
    features: [
      "Consolidated corporate monthly invoicing",
      "Dedicated corporate travel portal and helpline",
      "Polite, background-verified uniformed drivers",
      "AC premium sedans and corporate multi-utility SUVs"
    ],
    faqs: [
      { q: "Do you offer customized monthly invoicing for businesses?", a: "Yes, our corporate accounts features consolidated monthly billing, route tracking, and detailed travel logs for accounts departments." },
      { q: "What happens if a booking needs to be dispatched urgently?", a: "Corporate account holders get priority vehicle dispatch and access to our 24/7 dedicated dispatch team." }
    ],
    schemaType: "Service"
  },
  "mumbai-to-pune-cab": {
    title: "Mumbai to Pune Cab | One Way & Round Trip Taxi | Carvio Cab",
    description: "Book Mumbai to Pune cab for safe and comfortable travel. Reliable one-way and round-trip taxi service with professional drivers.",
    keywords: "Mumbai to Pune cab, Mumbai to Pune taxi, cab from Mumbai to Pune, one way cab Mumbai to Pune, outstation taxi Mumbai to Pune",
    h1: "Mumbai to Pune Cab Service",
    intro: "Travel between Mumbai and Pune via the Express Highway in comfort. Carvio Cab offers premium taxi service for one-way drops and round-trip journeys between the two metropolitan cities.",
    contentTitle: "Punctual Mumbai to Pune Highway Travel",
    contentDesc: "The route from Mumbai to Pune is approximately 150 km and takes about 3 hours. Our professional chauffeurs are highly experienced on the expressway, providing a safe, comfortable, and smooth travel experience.",
    icon: ArrowRight,
    features: [
      "Flat-rate one-way drop fares and round trips",
      "Expressway-experienced safe highway drivers",
      "Pre-booked pickups from any Mumbai location or Airport",
      "Spacious AC cars for a comfortable intercity ride"
    ],
    faqs: [
      { q: "What is the distance and travel time from Mumbai to Pune?", a: "The distance is roughly 150 km and typically takes 3 hours via the Mumbai-Pune Expressway, depending on traffic conditions." },
      { q: "Can I get picked up directly from Mumbai Airport T2 for Pune?", a: "Yes, we provide direct airport pickups from Terminal 1 & 2 for transfer to any location in Pune." }
    ],
    schemaType: "TaxiService"
  },
  "mumbai-to-nashik-cab": {
    title: "Mumbai to Nashik Cab | Book One Way & Round Trip Taxi | Carvio Cab",
    description: "Book a reliable cab from Mumbai to Nashik. One-way and round-trip taxi service with professional drivers and transparent billing.",
    keywords: "Mumbai to Nashik cab, Mumbai to Nashik taxi, one way cab Mumbai to Nashik, outstation taxi Mumbai to Nashik",
    h1: "Mumbai to Nashik Cab Service",
    intro: "Enjoy a scenic, safe, and comfortable ride to Nashik. Carvio Cab provides premium one-way and round-trip outstation taxi booking services from Mumbai to the wine capital of India.",
    contentTitle: "Reliable Cab Transfers to Nashik",
    contentDesc: "The drive from Mumbai to Nashik is around 170 km and takes approximately 4 hours. Our highway-trained drivers ensure you travel safely through the Kasara Ghats, offering clean, well-maintained sedans and SUVs.",
    icon: ArrowRight,
    features: [
      "AC sedans and spacious SUVs for ghat travel",
      "Experienced chauffeurs familiar with local Nashik routes",
      "Transparent toll and allowance breakdowns",
      "Door-to-door pickup and drop convenience"
    ],
    faqs: [
      { q: "What is the travel duration between Mumbai and Nashik?", a: "The distance is about 170 km, which generally takes 4 hours to cover via the NH 160 highway." },
      { q: "Can we plan a multi-day round trip for vineyards tours?", a: "Yes, you can book our round-trip packages which include driver allowance for multi-day vineyard and temple tours." }
    ],
    schemaType: "TaxiService"
  },
  "mumbai-to-shirdi-cab": {
    title: "Mumbai to Shirdi Cab | Devotional Tour Taxi | Carvio Cab",
    description: "Book safe devotional tour taxi from Mumbai to Shirdi Sai Baba temple. One-way and round-trip outstation cabs at affordable rates.",
    keywords: "Mumbai to Shirdi cab, Mumbai to Shirdi taxi, outstation cab Mumbai to Shirdi, Shirdi tour taxi",
    h1: "Mumbai to Shirdi Cab Service",
    intro: "Book your devotional journey with absolute comfort. Carvio Cab offers safe and reliable one-way drops and round-trip taxi services from Mumbai to the holy town of Shirdi.",
    contentTitle: "Safe Devotional Journeys to Shirdi Sai Baba Temple",
    contentDesc: "Travel to Shirdi (approx 240 km) in a relaxed state. Our premium SUVs (Innova Crysta, Ertiga) and comfortable sedans are driven by polite, experienced chauffeurs, ensuring a stress-free devotional pilgrimage for your family.",
    icon: ArrowRight,
    features: [
      "Spacious SUVs perfect for family pilgrims",
      "Punctual early-morning or late-night departures",
      "Comfortable highway travel with experienced drivers",
      "Flexible round-trip packages for darshan"
    ],
    faqs: [
      { q: "How long does it take to reach Shirdi from Mumbai by cab?", a: "It takes about 4.5 to 5 hours to travel the 240 km distance, which is now faster and smoother via the Samruddhi Mahamarg." },
      { q: "Does the driver wait while we complete temple darshan?", a: "Yes, for round-trip bookings, the chauffeur will wait at the designated parking area and coordinate for your return journey." }
    ],
    schemaType: "TaxiService"
  }
};

export default function SeoServicePage({ pageKey }) {
  const data = SEO_PAGE_DATA[pageKey];
  const [settings, setSettings] = useState({ company_name: "Carvio Cab", email: "support@carviocabs.com" });

  useEffect(() => {
    axios.get(`${API}/settings`).then(r => setSettings(r.data)).catch(() => {});
  }, []);

  // Schema Injection
  const businessSchema = data ? {
    "@context": "https://schema.org",
    "@type": data.schemaType,
    "name": `${data.h1} | ${settings.company_name}`,
    "description": data.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": settings.company_name,
      "image": "https://carviocabs.com/uploads/favicon.png",
      "telephone": settings.phone || "+91 95943 12974",
      "email": settings.email || "support@carviocabs.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": settings.address || "Santacruz East",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400055",
        "addressCountry": "IN"
      },
      "priceRange": "₹₹"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Mumbai" },
      { "@type": "AdministrativeArea", "name": "Maharashtra" }
    ]
  } : null;

  const faqSchema = data ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  } : null;

  const combinedSchema = data ? {
    "@context": "https://schema.org",
    "@graph": [businessSchema, faqSchema]
  } : null;

  // SEO Hook call
  useSEO({
    title: data?.title || "Carvio Cab",
    description: data?.description || "",
    keywords: data?.keywords || "",
    schema: combinedSchema
  });

  if (!data) {
    return <Navigate to="/" replace />;
  }

  const PageIcon = data.icon;

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-secondary border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.05)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-16 h-16 rounded-2xl bg-zinc-850/50 border border-zinc-800 flex items-center justify-center mx-auto mb-6">
              <PageIcon className="text-[#FFD700]" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6 leading-tight">
              {data.h1}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {data.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details & Features */}
      <section className="py-20 bg-primary">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-foreground mb-6">{data.contentTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {data.contentDesc}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you need to book a local cab in Mumbai, an outstation trip, or daily company logistics, Carvio Cab handles it professionally with safety first.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-dark p-8">
            <h3 className="text-white font-semibold text-xl mb-6">Service Highlights</h3>
            <ul className="space-y-4">
              {data.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="text-[#FFD700] mt-1 flex-shrink-0" size={18} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Localized FAQ */}
      <section className="py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-zinc-400 text-sm font-medium tracking-widest uppercase">FAQ</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <div key={i} className="card-dark p-6">
                <div className="flex gap-3 mb-2">
                  <HelpCircle className="text-[#FFD700] flex-shrink-0 mt-1" size={20} />
                  <h3 className="text-foreground font-bold text-base md:text-lg">{faq.q}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8 text-sm md:text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Cab in Mumbai Today</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            Get instant quote options for premium chauffeur driven cars, airport drops, and outstation trips with Carvio Cab.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/book" className="bg-[#FFD700] text-black hover:bg-[#E5C100] transition-colors font-semibold px-8 py-4 rounded-xl text-lg block w-full sm:w-auto">
              Get Free Quote / Book Now
            </Link>
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="border border-zinc-800 text-white hover:bg-zinc-800/40 transition-colors font-semibold px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                <Phone size={18} /> Contact Support
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
