import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "@/pages/HomePage";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { MapPin, Phone, Car, ArrowRight, ShieldCheck, CheckCircle, HelpCircle } from "lucide-react";
import axios from "axios";
import { API } from "@/apiConfig";

// Localized content database for 11 locations
const LOCATION_DATA = {
  andheri: {
    name: "Andheri",
    metaTitle: "Taxi Service in Andheri | Airport Cab & Car Rental With Driver",
    metaDescription: "Book taxi service in Andheri with Carvio Cabs. Get airport cab, local taxi, corporate cab, outstation cab and car rental with driver in Andheri East and Andheri West.",
    keywords: "taxi service in Andheri, cab service in Andheri, Andheri cab rental, Mumbai airport cab Andheri",
    h1: "Taxi Service in Andheri",
    intro: "Looking for taxi service in Andheri? Carvio Cabs provides reliable cab service in Andheri East, Andheri West and nearby Mumbai areas. Book airport taxi from Andheri to Mumbai Airport, local cab service, car rental with driver, outstation cab and corporate travel service with easy call and WhatsApp booking.",
    airportContent: "Book a quick and comfortable cab from Andheri to Mumbai Airport with Carvio Cabs. Our airport transfer service is suitable for early morning flights, late-night arrivals, business travellers and family airport trips.",
    routes: [
      { route: "Andheri to Mumbai Airport Cab", dist: "5 km", time: "15 mins" },
      { route: "Andheri to Bandra Cab", dist: "8 km", time: "25 mins" },
      { route: "Andheri to Dadar Taxi", dist: "14 km", time: "35 mins" },
      { route: "Andheri to Churchgate Cab", dist: "25 km", time: "50 mins" },
      { route: "Andheri to Goregaon Cab", dist: "9 km", time: "20 mins" },
      { route: "Andheri to Navi Mumbai Cab", dist: "28 km", time: "60 mins" }
    ],
    faqs: [
      { q: "Do you provide cab service in Andheri East and West?", a: "Yes, Carvio Cabs operates comprehensive 24/7 coverage across Andheri East (including MIDC, SEEPZ, Saki Naka) and Andheri West (including Lokhandwala, Versova, Link Road)." },
      { q: "How early should I book an airport taxi from Andheri?", a: "While Andheri is near the airport, we suggest booking at least 1-2 hours in advance to account for local peak-hour traffic." }
    ]
  },
  bandra: {
    name: "Bandra",
    metaTitle: "Cab Service in Bandra | Premium Chauffeur Cars & Taxi",
    metaDescription: "Reliable cab service in Bandra for corporate bookings, airport transfers, local travel, and outstation trips. Rent premium chauffeur-driven cars in Bandra East & West.",
    keywords: "cab service in Bandra, Bandra taxi, car rental Bandra, Bandra to Mumbai airport taxi",
    h1: "Cab Service in Bandra",
    intro: "Looking for premium cab service in Bandra? Carvio Cabs provides top-rated chauffeur-driven car rentals and taxi services across Bandra West, Bandra East, BKC (Bandra Kurla Complex), and adjacent areas. Enjoy safe, clean, and punctual transit for business commutes or personal travel.",
    airportContent: "Skip the stress of airport parking. Book a professional airport transfer cab from Bandra to Mumbai Airport. We ensure early morning pickups and seamless baggage handling with our premium fleet.",
    routes: [
      { route: "Bandra to Mumbai Airport Cab", dist: "9 km", time: "20 mins" },
      { route: "Bandra to BKC Business Cab", dist: "3 km", time: "10 mins" },
      { route: "Bandra to Dadar Taxi", dist: "6 km", time: "15 mins" },
      { route: "Bandra to Churchgate Taxi", dist: "18 km", time: "35 mins" },
      { route: "Bandra to Andheri Cab", dist: "8 km", time: "25 mins" },
      { route: "Bandra to Pune Outstation Cab", dist: "145 km", time: "3 hrs" }
    ],
    faqs: [
      { q: "Do you provide luxury chauffeur services in BKC?", a: "Yes, we specialize in corporate travel and luxury executive transfers in Bandra Kurla Complex (BKC). Our premium sedans are perfect for business meetings." },
      { q: "Is booking cancellation free in Bandra?", a: "Yes, we offer free cancellations within our standard grace window. Please refer to our Terms of Service for policy details." }
    ]
  },
  santacruz: {
    name: "Santacruz",
    metaTitle: "Airport Cab Service in Santacruz | Carvio Cabs Santacruz East",
    metaDescription: "Book premium airport taxi, local rental, and chauffeur-driven cars in Santacruz East and West. Carvio Cabs is based in Santacruz East, Mumbai.",
    keywords: "airport cab service Santacruz, taxi in Santacruz East, car rental Santacruz, Santacruz cab booking",
    h1: "Airport Cab Service in Santacruz",
    intro: "As Carvio Cabs is proudly headquartered in Santacruz East, Mumbai, we provide lightning-fast, ultra-reliable cab booking, airport transfers, and car rentals with drivers in Santacruz East, Santacruz West, Vakola, Kalina, and nearby localities. Experience top-tier service at your doorstep.",
    airportContent: "Being minutes away from the airport terminals, Carvio Cabs is the fastest local choice for Mumbai Domestic and International Airport pickups and drops from Santacruz.",
    routes: [
      { route: "Santacruz East to Mumbai Airport Terminal 1", dist: "2 km", time: "5 mins" },
      { route: "Santacruz to Mumbai Airport Terminal 2", dist: "6 km", time: "15 mins" },
      { route: "Santacruz to Bandra Kurla Complex (BKC)", dist: "4 km", time: "10 mins" },
      { route: "Santacruz to Andheri East Cab", dist: "7 km", time: "20 mins" },
      { route: "Santacruz to South Mumbai (Colaba) Taxi", dist: "22 km", time: "40 mins" }
    ],
    faqs: [
      { q: "Can I get an immediate cab pickup in Santacruz?", a: "Since our primary hub is based in Santacruz East, we can frequently dispatch vehicles for rapid pickup in Vakola, Kalina, and Santacruz West." },
      { q: "Do you offer corporate booking accounts?", a: "Yes, corporate clients can enjoy monthly invoicing and priority bookings through our executive account portal." }
    ]
  },
  "vile-parle": {
    name: "Vile Parle",
    metaTitle: "Taxi Service in Vile Parle | Mumbai Airport Transfers & Cabs",
    metaDescription: "Book professional taxi service in Vile Parle East & West. Reliable airport cab booking, local city rides, and outstation chauffeur-driven cars.",
    keywords: "taxi service in Vile Parle, Vile Parle cab service, airport taxi Vile Parle, car rental Vile Parle",
    h1: "Taxi Service in Vile Parle",
    intro: "Need a premium cab in Vile Parle? Carvio Cabs provides safe and sanitized chauffeur-driven car rentals across Vile Parle East, Vile Parle West, Juhu, and surrounding colleges or commercial zones. Travel comfortably with our polite, professional drivers.",
    airportContent: "Get on-time airport taxis from Vile Parle to domestic or international terminals. We monitor flight statuses to ensure your chauffeur is waiting for you right as you land.",
    routes: [
      { route: "Vile Parle to Mumbai Airport Terminal 1", dist: "3 km", time: "8 mins" },
      { route: "Vile Parle to Andheri East Cab", dist: "5 km", time: "15 mins" },
      { route: "Vile Parle to Bandra West Taxi", dist: "6 km", time: "18 mins" },
      { route: "Vile Parle to Dadar Cab", dist: "12 km", time: "30 mins" },
      { route: "Vile Parle to Churchgate Cab", dist: "24 km", time: "50 mins" }
    ],
    faqs: [
      { q: "Do you service residential areas near Juhu Scheme?", a: "Yes, we provide luxury and economy cabs across Juhu, Vile Parle West, and Vile Parle East residential areas." },
      { q: "Can I book outstation cabs from Vile Parle?", a: "Absolutely. We offer competitive one-way and round-trip outstation packages to Pune, Lonavala, Alibaug, and Nashik." }
    ]
  },
  dadar: {
    name: "Dadar",
    metaTitle: "Cab Service in Dadar | Outstation Taxi & Local Car Rental",
    metaDescription: "Reliable cab service in Dadar for local travel and outstation trips. Book airport transfers, corporate cars, and one-way outstation cabs from Dadar.",
    keywords: "cab service in Dadar, Dadar taxi, outstation cab from Dadar, car rental Dadar",
    h1: "Cab Service in Dadar",
    intro: "Dadar stands as the heart of Mumbai's connectivity. Carvio Cabs offers premium chauffeur-driven cab booking, outstation taxi services, and local car rentals from Dadar East and Dadar West. Connect seamlessly to any part of Mumbai or Maharashtra with our professional services.",
    airportContent: "Travel in comfort from Dadar to Mumbai Airport. Our professional chauffeurs navigate peak traffic via the Sea Link or Western Express Highway to get you to your flight on time.",
    routes: [
      { route: "Dadar to Mumbai Airport Cab", dist: "13 km", time: "30 mins" },
      { route: "Dadar to Churchgate Taxi", dist: "11 km", time: "25 mins" },
      { route: "Dadar to Bandra Kurla Complex (BKC)", dist: "6 km", time: "15 mins" },
      { route: "Dadar to Pune Outstation Cab", dist: "150 km", time: "3.5 hrs" },
      { route: "Dadar to Nashik Cab", dist: "170 km", time: "4 hrs" }
    ],
    faqs: [
      { q: "Do you pick up from Dadar Railway Station?", a: "Yes, we offer scheduled pick-ups from Dadar Central and Western railway terminals. Your driver will coordinate the exact meeting spot." },
      { q: "What types of cars are available in Dadar?", a: "Our Dadar fleet ranges from compact sedans (Dzire) to premium executive SUVs (Innova Crysta) suitable for every travel budget." }
    ]
  },
  mahim: {
    name: "Mahim",
    metaTitle: "Taxi Service in Mahim | Airport Transfer & Chauffeur Rental",
    metaDescription: "Book professional taxi service in Mahim. Get airport cab transfer, corporate cars, local rental, and outstation trips with Carvio Cabs.",
    keywords: "taxi service in Mahim, Mahim cab booking, airport taxi Mahim, car rental Mahim",
    h1: "Taxi Service in Mahim",
    intro: "Carvio Cabs provides reliable, safe, and professional cab services in Mahim, Mahim West, and Mahim East. Whether you need a corporate transfer, an outstation ride, or a local drop-off near Mahim Dargah or the causeway, our clean fleet and polite chauffeurs ensure a smooth transit.",
    airportContent: "Get punctual and safe airport pickup and drop-off services from Mahim to Mumbai Airport. We guarantee zero delays and professional assistance with your bags.",
    routes: [
      { route: "Mahim to Mumbai Airport Cab", dist: "10 km", time: "22 mins" },
      { route: "Mahim to Bandra West Cab", dist: "3 km", time: "10 mins" },
      { route: "Mahim to Dadar Taxi", dist: "3 km", time: "10 mins" },
      { route: "Mahim to Nariman Point Cab", dist: "16 km", time: "35 mins" }
    ],
    faqs: [
      { q: "Are your Mahim cabs available 24/7?", a: "Yes, our booking engine and drivers operate round-the-clock. We recommend booking in advance for late-night or early-morning travel." },
      { q: "Are tolls included in the fare from Mahim?", a: "Standard fares exclude state tolls and parking fees. They are added transparently to your final invoice without markups." }
    ]
  },
  kurla: {
    name: "Kurla",
    metaTitle: "Cab Service in Kurla | Local Taxi & Airport Cab Booking",
    metaDescription: "Reliable cab service in Kurla East and Kurla West. Book airport transfers, local cab rentals, corporate business travel, and outstation taxis.",
    keywords: "cab service in Kurla, Kurla taxi booking, Kurla to Mumbai airport cab, car rental Kurla",
    h1: "Cab Service in Kurla",
    intro: "Looking for a reliable cab in Kurla? Carvio Cabs provides clean, air-conditioned chauffeur-driven cars across Kurla West, Kurla East, LBS Marg, and commercial hubs like Phoenix Marketcity. Book for local travel, corporate meetings, or outstation family trips.",
    airportContent: "Book an airport transfer from Kurla to Mumbai Airport terminal 1 or 2. Our drivers know the best shortcuts to avoid LBS Marg and link road traffic jams.",
    routes: [
      { route: "Kurla to Mumbai Airport Terminal 2", dist: "7 km", time: "20 mins" },
      { route: "Kurla to Bandra Kurla Complex (BKC)", dist: "2 km", time: "8 mins" },
      { route: "Kurla to Thane Outstation Taxi", dist: "18 km", time: "35 mins" },
      { route: "Kurla to Dadar Cab", dist: "9 km", time: "25 mins" }
    ],
    faqs: [
      { q: "Can I book a cab from Kurla station?", a: "Yes, we coordinate pick-ups near Kurla West or Kurla East station exits for passenger convenience." },
      { q: "Do you offer clean vehicles in Kurla?", a: "Absolutely. All vehicles undergo deep sanitization and cleaning before and after every trip." }
    ]
  },
  goregaon: {
    name: "Goregaon",
    metaTitle: "Car Rental in Goregaon | Airport Cab & Chauffeur Services",
    metaDescription: "Get premium car rental in Goregaon East & West with professional driver. Book airport taxi, corporate cabs, local rentals and outstation tours.",
    keywords: "car rental in Goregaon, Goregaon cab service, Goregaon taxi, airport taxi Goregaon",
    h1: "Car Rental in Goregaon",
    intro: "Need a premium car rental in Goregaon? Carvio Cabs offers chauffeur-driven cab booking across Goregaon East, Goregaon West, Link Road, Aarey Colony, and major business parks like Nesco and Nirlon Knowledge Park. Travel with peace of mind with our trained drivers and luxury sedans or SUVs.",
    airportContent: "Arrive on time for your flights. Book an executive airport pickup or drop-off cab from Goregaon to Mumbai Airport. We offer smooth express commutes via the Western Express Highway.",
    routes: [
      { route: "Goregaon to Mumbai Airport Cab", dist: "11 km", time: "25 mins" },
      { route: "Goregaon to Bandra Kurla Complex (BKC)", dist: "17 km", time: "40 mins" },
      { route: "Goregaon to Nesco Exhibition Center Cab", dist: "2 km", time: "8 mins" },
      { route: "Goregaon to Churchgate Cab", dist: "32 km", time: "65 mins" },
      { route: "Goregaon to Lonavala Outstation Cab", dist: "100 km", time: "2.5 hrs" }
    ],
    faqs: [
      { q: "Do you provide event guest transport at Nesco?", a: "Yes, we manage fleet logistics and guest transportation for exhibitions, weddings, and corporate events held at Nesco and Goregaon hotels." },
      { q: "Do you offer hourly car rentals in Goregaon?", a: "Yes, we offer flexible local rental packages (e.g., 4 hrs/40 km, 8 hrs/80 km, or 12 hrs/120 km) with drivers." }
    ]
  },
  churchgate: {
    name: "Churchgate",
    metaTitle: "Taxi Service in Churchgate | South Mumbai Chauffeur Cars",
    metaDescription: "Premium taxi service in Churchgate, Colaba and Nariman Point. Book airport taxi, local rentals, corporate executive travel and outstation rides.",
    keywords: "taxi service in Churchgate, South Mumbai cab, Churchgate to airport taxi, car rental Churchgate",
    h1: "Taxi Service in Churchgate",
    intro: "Travel South Mumbai in style. Carvio Cabs provides premium taxi service in Churchgate, Nariman Point, Colaba, Marine Drive, and surrounding commercial hubs. Get professional chauffeur-driven cars for business commutes, client drop-offs, or personal sightseeing tours.",
    airportContent: "Book an airport transfer from South Mumbai (Churchgate) to Mumbai Airport. Our drivers utilize the Eastern Freeway or Coastal Road for the fastest, most comfortable transit.",
    routes: [
      { route: "Churchgate to Mumbai Airport Cab", dist: "24 km", time: "45 mins" },
      { route: "Churchgate to Bandra Kurla Complex (BKC)", dist: "19 km", time: "35 mins" },
      { route: "Churchgate to Dadar Taxi", dist: "11 km", time: "25 mins" },
      { route: "Churchgate to Pune Outstation Cab", dist: "160 km", time: "3.5 hrs" }
    ],
    faqs: [
      { q: "Do you offer corporate rates for Nariman Point firms?", a: "Yes, we partner with South Mumbai businesses for regular employee travels and airport drops with corporate invoicing options." },
      { q: "Can I book a premium car like a Juhu or Bandra tour from Churchgate?", a: "Yes, our local rental packages are ideal for private city sightseeing tours from South Mumbai." }
    ]
  },
  matunga: {
    name: "Matunga",
    metaTitle: "Cab Service in Matunga | Local Car Rental & Airport Taxi",
    metaDescription: "Book premium cab service in Matunga East and West. Reliable airport cab transfers, corporate transport, local city rides and outstation trips.",
    keywords: "cab service in Matunga, Matunga taxi, local car rental Matunga, airport cab Matunga",
    h1: "Cab Service in Matunga",
    intro: "Looking for a reliable cab service in Matunga? Carvio Cabs provides clean vehicles and professional chauffeurs across Matunga East, Matunga West, and adjoining Central Mumbai neighborhoods. Book our clean, luxury cars for family functions, temple visits, Juhu beach runs, or daily work commutes.",
    airportContent: "Reserve an airport taxi from Matunga to Mumbai Airport terminal 1 or 2. We ensure completely on-time arrivals and departures, tracking your flight schedules.",
    routes: [
      { route: "Matunga to Mumbai Airport Cab", dist: "11 km", time: "25 mins" },
      { route: "Matunga to Dadar West Taxi", dist: "2 km", time: "8 mins" },
      { route: "Matunga to Bandra Kurla Complex (BKC)", dist: "7 km", time: "20 mins" },
      { route: "Matunga to Churchgate Cab", dist: "14 km", time: "30 mins" }
    ],
    faqs: [
      { q: "Are drivers familiar with local Matunga routes?", a: "Yes, all our drivers are experienced professionals with deep local knowledge of Matunga, Dadar, and Sion roads." },
      { q: "Do you support digital payment modes?", a: "Yes, we accept credit cards, corporate accounts, bank transfers, and online UPI payments via Razorpay." }
    ]
  },
  "mumbai-airport": {
    name: "Mumbai Airport",
    metaTitle: "Mumbai Airport Taxi Service | Airport Pickup & Drop Cab",
    metaDescription: "Book Mumbai Airport taxi service with Carvio Cabs. Premium airport pickup and drop-off cabs from Domestic (T1) & International (T2) terminals.",
    keywords: "airport taxi service Mumbai, Mumbai airport pickup and drop, airport cab Mumbai, T2 airport cab",
    h1: "Mumbai Airport Taxi Service",
    intro: "Avoid terminal queues and booking surges. Carvio Cabs provides premium airport taxi service and pre-booked airport pickup/drop-off services at both Terminal 1 (Domestic) and Terminal 2 (International) of Mumbai Airport (BOM). Walk out to a waiting chauffeur, a clean car, and a guaranteed flat rate.",
    airportContent: "We monitor flight arrivals in real-time. If your flight is delayed or lands early, your chauffeur will adjust their schedule automatically—no extra wait fees or stress.",
    routes: [
      { route: "Mumbai Airport to Santacruz East", dist: "2 km", time: "5 mins" },
      { route: "Mumbai Airport to Andheri West", dist: "7 km", time: "20 mins" },
      { route: "Mumbai Airport to Bandra Kurla Complex (BKC)", dist: "8 km", time: "20 mins" },
      { route: "Mumbai Airport to Dadar Taxi", dist: "13 km", time: "30 mins" },
      { route: "Mumbai Airport to Churchgate (South Mumbai)", dist: "24 km", time: "45 mins" },
      { route: "Mumbai Airport to Pune Outstation Cab", dist: "155 km", time: "3.5 hrs" }
    ],
    faqs: [
      { q: "How do I meet my driver at the airport?", a: "Upon flight arrival, your chauffeur will coordinate via call or WhatsApp. They can meet you at the designated terminal arrivals exit with a placard of your name." },
      { q: "What happens if my flight is delayed?", a: "We monitor all commercial flights landing in Mumbai. Your driver will automatically adjust the arrival time based on the updated schedule." }
    ]
  },
  juhu: {
    name: "Juhu",
    metaTitle: "Cab Service in Juhu | Airport Taxi & Car Rental | Carvio Cab",
    metaDescription: "Book reliable cab service in Juhu with Carvio Cab. Chauffeur driven car rental, airport pickup/drop, outstation taxi and corporate travel in Juhu Mumbai.",
    keywords: "cab service in Juhu, Juhu taxi booking, Juhu airport cab, car rental Juhu",
    h1: "Cab Service in Juhu",
    intro: "Need a premium cab in Juhu? Carvio Cabs provides top-tier chauffeur-driven car rentals and taxi services in Juhu, Juhu Scheme, and surrounding areas. Get safe, clean, and punctual transit for local travel or airport drops.",
    airportContent: "Book a quick and comfortable airport taxi from Juhu to Mumbai Airport terminal 1 or 2. We monitor flight timings to ensure your chauffeur is waiting for you on time.",
    routes: [
      { route: "Juhu to Mumbai Airport Cab", dist: "6 km", time: "18 mins" },
      { route: "Juhu to Bandra West Cab", dist: "5 km", time: "15 mins" },
      { route: "Juhu to Dadar Taxi", dist: "13 km", time: "30 mins" },
      { route: "Juhu to Andheri West Cab", dist: "4 km", time: "12 mins" }
    ],
    faqs: [
      { q: "Do you operate near Juhu Beach and residential areas?", a: "Yes, we provide 24/7 cab pickups near Juhu Beach, Juhu Tara Road, Juhu Scheme, and surrounding neighborhoods." },
      { q: "Can I book a premium car for local sightseeing in Juhu?", a: "Yes, our local hourly rental packages (such as 8h/80km) are perfect for sightseeing tours and luxury travel." }
    ]
  },
  malad: {
    name: "Malad",
    metaTitle: "Cab Service in Malad | Local Taxi & Car Rental Mumbai",
    metaDescription: "Book cab service in Malad East and Malad West with Carvio Cab. Reliable airport transfers, outstation cabs, and local car rental with driver.",
    keywords: "cab service in Malad, Malad taxi booking, Malad airport cab, car rental Malad",
    h1: "Cab Service in Malad",
    intro: "Looking for a reliable cab in Malad? Carvio Cabs provides premium chauffeur-driven taxi bookings and car rental service across Malad West, Malad East, Link Road, and Mindspace corporate hub. Travel safely with our verified drivers.",
    airportContent: "Book an airport transfer from Malad to Mumbai Airport. We ensure early morning pickups and smooth highway transit via the Western Express Highway.",
    routes: [
      { route: "Malad to Mumbai Airport Cab", dist: "14 km", time: "30 mins" },
      { route: "Malad to Bandra Kurla Complex (BKC)", dist: "20 km", time: "45 mins" },
      { route: "Malad to Dadar Taxi", dist: "22 km", time: "50 mins" },
      { route: "Malad to Pune Outstation Cab", dist: "165 km", time: "4 hrs" }
    ],
    faqs: [
      { q: "Do you service corporate offices in Mindspace Malad?", a: "Yes, we offer dedicated employee transport and executive travel support for firms located in Mindspace, Malad West." },
      { q: "Are outstation bookings from Malad available one-way?", a: "Yes, we offer affordable one-way outstation taxi drops from Malad to destinations like Pune, Nashik, and Surat." }
    ]
  },
  borivali: {
    name: "Borivali",
    metaTitle: "Cab Service in Borivali | Airport taxi & Chauffeur Cars",
    metaDescription: "Book reliable cab service in Borivali East & West. Get airport cab pickup/drop, outstation taxi, local car rental with driver from Borivali.",
    keywords: "cab service in Borivali, Borivali taxi booking, Borivali airport cab, car rental Borivali",
    h1: "Cab Service in Borivali",
    intro: "Carvio Cabs provides top-rated cab booking and chauffeur-driven car rental in Borivali West, Borivali East, Shimpoli, and neighboring areas. Connect seamlessly to the airport, local meetings, or long-distance outstation routes.",
    airportContent: "Travel comfortably from Borivali to Mumbai Airport. Our experienced chauffeurs use the Western Express Highway to get you to your flight on time.",
    routes: [
      { route: "Borivali to Mumbai Airport Cab", dist: "18 km", time: "40 mins" },
      { route: "Borivali to Bandra Kurla Complex (BKC)", dist: "24 km", time: "50 mins" },
      { route: "Borivali to Dadar Taxi", dist: "28 km", time: "60 mins" },
      { route: "Borivali to Pune Outstation Cab", dist: "172 km", time: "4 hrs" }
    ],
    faqs: [
      { q: "Do you pick up near Borivali Railway Station?", a: "Yes, we coordinate pickup points close to Borivali East and West station exits for convenient railway transit connections." },
      { q: "Is 24/7 airport transfer service available in Borivali?", a: "Yes, we operate 24/7 for all pre-booked airport pickups and drops from Borivali." }
    ]
  },
  kandivali: {
    name: "Kandivali",
    metaTitle: "Cab Service in Kandivali | Car Rental with Driver | Taxi",
    metaDescription: "Book taxi service in Kandivali East and West with Carvio Cab. Chauffeur driven cars, airport cab transfers, and outstation rides.",
    keywords: "cab service in Kandivali, Kandivali taxi, car rental Kandivali, airport taxi Kandivali",
    h1: "Cab Service in Kandivali",
    intro: "Need a premium cab in Kandivali? Carvio Cabs offers safe and sanitized car rental with driver across Kandivali East (including Lokhandwala, Thakur Village) and Kandivali West. Travel in luxury with our experienced local drivers.",
    airportContent: "Get on-time airport pickup or drop cab service from Kandivali to Mumbai Airport. We track your flight and guarantee a hassle-free transfer.",
    routes: [
      { route: "Kandivali to Mumbai Airport Cab", dist: "16 km", time: "35 mins" },
      { route: "Kandivali to Bandra Kurla Complex (BKC)", dist: "22 km", time: "48 mins" },
      { route: "Kandivali to Dadar Taxi", dist: "25 km", time: "55 mins" },
      { route: "Kandivali to Lonavala Outstation Cab", dist: "110 km", time: "2.8 hrs" }
    ],
    faqs: [
      { q: "Can I book a local hourly cab package in Kandivali?", a: "Yes, we provide flexible hourly packages like 4h/40km and 8h/80km for local city travel in Kandivali." },
      { q: "Are your drivers background-verified?", a: "Absolutely. All drivers undergo rigorous verification and background checks for passenger safety." }
    ]
  },
  powai: {
    name: "Powai",
    metaTitle: "Cab Service in Powai | Corporate Taxi & Airport Cabs",
    metaDescription: "Premium cab service in Powai with Carvio Cab. Get executive corporate transport, airport pickups, and local car rentals in Hiranandani Powai.",
    keywords: "cab service in Powai, Powai taxi booking, Hiranandani Powai cab, car rental Powai",
    h1: "Cab Service in Powai",
    intro: "Experience elite travel in Powai. Carvio Cabs provides premium chauffeur-driven car rentals and corporate taxi services in Hiranandani Powai, Chandivali, and adjacent hubs. Punctual, safe, and professional transfers.",
    airportContent: "Book a professional airport cab from Powai to Mumbai Airport. We monitor flight schedules and use JVLR for the fastest route.",
    routes: [
      { route: "Powai to Mumbai Airport Cab", dist: "8 km", time: "20 mins" },
      { route: "Powai to Bandra Kurla Complex (BKC)", dist: "11 km", time: "25 mins" },
      { route: "Powai to Dadar Taxi", dist: "15 km", time: "35 mins" },
      { route: "Powai to Pune Outstation Cab", dist: "148 km", time: "3 hrs" }
    ],
    faqs: [
      { q: "Do you specialize in corporate travel in Powai?", a: "Yes, we are a preferred partner for corporate travel in Powai, offering executive booking accounts and consolidated monthly invoicing." },
      { q: "Do you support digital payments for local trips?", a: "Yes, all our bookings support secure online card, corporate account, and UPI payments via Razorpay." }
    ]
  },
  bkc: {
    name: "BKC",
    metaTitle: "Cab Service in BKC | Corporate Car Rental Bandra Kurla Complex",
    metaDescription: "Premium corporate cab service in BKC Mumbai. Executive chauffeur driven cars, airport transfers, and business travel with Carvio Cab.",
    keywords: "cab service in BKC, Bandra Kurla Complex taxi, corporate car rental BKC, airport cab BKC",
    h1: "Cab Service in Bandra Kurla Complex (BKC)",
    intro: "Travel with style in Mumbai's leading business district. Carvio Cabs provides premium corporate cab services, executive airport transfers, and hourly rentals in Bandra Kurla Complex (BKC). High-end sedans and SUVs with professional chauffeurs.",
    airportContent: "On-time executive airport transfers from BKC to Mumbai domestic and international terminals. We guarantee seamless pickup and drop logistics.",
    routes: [
      { route: "BKC to Mumbai Airport Cab", dist: "8 km", time: "20 mins" },
      { route: "BKC to South Mumbai (Colaba) Taxi", dist: "20 km", time: "35 mins" },
      { route: "BKC to Dadar Cab", dist: "6 km", time: "15 mins" },
      { route: "BKC to Pune Corporate Cab", dist: "140 km", time: "3 hrs" }
    ],
    faqs: [
      { q: "Can I open a corporate travel account in BKC?", a: "Yes, we offer corporate accounts featuring consolidated monthly invoicing, priority dispatch, and customizable travel portals for BKC firms." },
      { q: "Do you offer premium cars like Mercedes or Fortuner in BKC?", a: "Yes, we maintain a fleet of premium and luxury sedans and SUVs for VIP guest transit in BKC." }
    ]
  },
  "lower-parel": {
    name: "Lower Parel",
    metaTitle: "Cab Service in Lower Parel | Local Taxi & Corporate Cars",
    metaDescription: "Reliable cab booking in Lower Parel with Carvio Cab. Chauffeur driven car rental, airport taxi, and corporate transport in Lower Parel Mumbai.",
    keywords: "cab service in Lower Parel, Lower Parel taxi, car rental Lower Parel, airport cab Lower Parel",
    h1: "Cab Service in Lower Parel",
    intro: "Book premium cab service in Lower Parel, Palladium, Kamala Mills, and surrounding commercial neighborhoods. Carvio Cabs offers clean cars and polite chauffeurs for business travel, client drops, or local shopping commutes.",
    airportContent: "Arrive stress-free for your flight. Book a professional airport transfer cab from Lower Parel to Mumbai Airport via the Western Express Highway or Coastal Road.",
    routes: [
      { route: "Lower Parel to Mumbai Airport Cab", dist: "16 km", time: "35 mins" },
      { route: "Lower Parel to BKC Business Cab", dist: "11 km", time: "25 mins" },
      { route: "Lower Parel to Dadar Taxi", dist: "4 km", time: "12 mins" },
      { route: "Lower Parel to Pune Outstation Cab", dist: "154 km", time: "3.5 hrs" }
    ],
    faqs: [
      { q: "Do you operate in Kamala Mills and Palladium zones?", a: "Yes, we provide 24/7 pickup and drop coverage near all commercial buildings, IT parks, and malls in Lower Parel." },
      { q: "Are hourly local rentals available from Lower Parel?", a: "Yes, our flexible hourly packages (4h/40km, 8h/80km) are perfect for shopping tours and business visits." }
    ]
  },
  worli: {
    name: "Worli",
    metaTitle: "Cab Service in Worli | Airport Taxi & Car Rental Worli",
    metaDescription: "Book premium taxi service in Worli with Carvio Cab. Chauffeur driven cars, airport pickup/drop, and outstation cabs near Worli Sea Face.",
    keywords: "cab service in Worli, Worli taxi booking, Worli Sea Face cab, car rental Worli",
    h1: "Cab Service in Worli",
    intro: "Travel comfortably across Worli. Carvio Cabs provides top-tier taxi service, local car rentals, and outstation rides from Worli Sea Face, Worli Naka, and neighboring South Mumbai areas. AC vehicles with polite drivers.",
    airportContent: "Get on-time airport drops and pickups. We navigate the Bandra-Worli Sea Link to get you to Mumbai Airport terminals quickly and comfortably.",
    routes: [
      { route: "Worli to Mumbai Airport Cab", dist: "15 km", time: "30 mins" },
      { route: "Worli to Bandra Kurla Complex (BKC)", dist: "10 km", time: "22 mins" },
      { route: "Worli to Nariman Point Taxi", dist: "12 km", time: "25 mins" },
      { route: "Worli to Pune Outstation Cab", dist: "152 km", time: "3.5 hrs" }
    ],
    faqs: [
      { q: "Do you use the Bandra-Worli Sea Link?", a: "Yes, our drivers default to the Sea Link for airport routes to save time, unless you request an alternate route." },
      { q: "Can I book a cab for a full day in South Mumbai from Worli?", a: "Yes, our 8-hour and 12-hour local rental packages are ideal for full-day city travel." }
    ]
  },
  colaba: {
    name: "Colaba",
    metaTitle: "Cab Service in Colaba | South Mumbai Taxi & Car Rental",
    metaDescription: "Book cab service in Colaba Nariman Point, and South Mumbai with Carvio Cab. Chauffeur driven car rental, airport taxi, and outstation cabs.",
    keywords: "cab service in Colaba, Colaba taxi booking, South Mumbai cab, car rental Colaba",
    h1: "Cab Service in Colaba",
    intro: "Travel South Mumbai with Carvio Cabs. We offer premium chauffeur-driven cab booking, outstation taxi service, and hourly car rentals in Colaba, Gateway of India, and Nariman Point. Comfortable cars with verified local route drivers.",
    airportContent: "Book a direct airport transfer from Colaba to Mumbai Airport. We utilize the Eastern Freeway or Coastal Road for the fastest transit.",
    routes: [
      { route: "Colaba to Mumbai Airport Cab", dist: "26 km", time: "50 mins" },
      { route: "Colaba to Bandra Kurla Complex (BKC)", dist: "21 km", time: "40 mins" },
      { route: "Colaba to Dadar Taxi", dist: "13 km", time: "30 mins" },
      { route: "Colaba to Pune Outstation Cab", dist: "162 km", time: "3.8 hrs" }
    ],
    faqs: [
      { q: "Do you provide tourist car rentals from Colaba?", a: "Yes, we offer local car rentals for Mumbai sightseeing tours covering Gateway of India, Marine Drive, and historic locations." },
      { q: "Can I pre-book an early morning airport drop from Colaba?", a: "Yes, we suggest booking by the previous night to guarantee a punctual morning pickup from South Mumbai." }
    ]
  },
  chembur: {
    name: "Chembur",
    metaTitle: "Cab Service in Chembur | Local Taxi & Airport Cabs",
    metaDescription: "Book reliable cab service in Chembur with Carvio Cab. Local hourly rentals, outstation taxi, and airport pickup/drop in Chembur East & West.",
    keywords: "cab service in Chembur, Chembur taxi, car rental Chembur, airport taxi Chembur",
    h1: "Cab Service in Chembur",
    intro: "Looking for a cab in Chembur? Carvio Cabs provides premium chauffeur-driven cars and taxi service across Chembur East, Chembur West, and neighboring Eastern Line locations. Experience safe, clean, and punctual travel.",
    airportContent: "Get on-time airport transfers from Chembur to Mumbai Airport. We utilize Santacruz-Chembur Link Road (SCLR) for the fastest route.",
    routes: [
      { route: "Chembur to Mumbai Airport Cab", dist: "12 km", time: "25 mins" },
      { route: "Chembur to Bandra Kurla Complex (BKC)", dist: "8 km", time: "18 mins" },
      { route: "Chembur to Dadar Taxi", dist: "10 km", time: "20 mins" },
      { route: "Chembur to Pune Outstation Cab", dist: "135 km", time: "2.8 hrs" }
    ],
    faqs: [
      { q: "Which route do you use for airport drops from Chembur?", a: "We generally use SCLR or Eastern Express Highway based on real-time traffic conditions." },
      { q: "Do you offer one-way outstation cabs from Chembur to Pune?", a: "Yes, we offer fixed-rate one-way outstation drop packages to Pune and other locations." }
    ]
  },
  ghatkopar: {
    name: "Ghatkopar",
    metaTitle: "Cab Service in Ghatkopar | Airport Taxi & Car Rental",
    metaDescription: "Book cab service in Ghatkopar East and West with Carvio Cab. Reliable local taxi, airport pickup/drop, and outstation taxi service.",
    keywords: "cab service in Ghatkopar, Ghatkopar taxi booking, car rental Ghatkopar, airport cab Ghatkopar",
    h1: "Cab Service in Ghatkopar",
    intro: "Need a premium cab in Ghatkopar? Carvio Cabs offers professional chauffeur-driven car rentals across Ghatkopar East, Ghatkopar West, LBS Marg, and Metro station zones. AC sedans and executive SUVs for all your travel needs.",
    airportContent: "Pre-book your airport taxi from Ghatkopar to Mumbai Airport. We ensure early morning pickups and comfortable terminal drops.",
    routes: [
      { route: "Ghatkopar to Mumbai Airport Cab", dist: "10 km", time: "22 mins" },
      { route: "Ghatkopar to Bandra Kurla Complex (BKC)", dist: "9 km", time: "20 mins" },
      { route: "Ghatkopar to Dadar Taxi", dist: "12 km", time: "25 mins" },
      { route: "Ghatkopar to Nashik Outstation Cab", dist: "155 km", time: "3.5 hrs" }
    ],
    faqs: [
      { q: "Do you pick up from Ghatkopar Metro Station?", a: "Yes, we coordinate pick-ups near Ghatkopar Metro and Railway station exits for easy commuter transfers." },
      { q: "Can I book a local taxi package for shopping in Ghatkopar?", a: "Yes, our local hourly rental packages are ideal for shopping trips to local markets or malls." }
    ]
  },
  thane: {
    name: "Thane",
    metaTitle: "Cab Service in Thane | Local Car Rental & Outstation Taxi",
    metaDescription: "Book reliable cab service in Thane with Carvio Cab. Get airport pickup/drop, local hourly rental, and outstation taxi from Thane.",
    keywords: "cab service in Thane, Thane taxi booking, car rental Thane, airport cab Thane",
    h1: "Cab Service in Thane",
    intro: "Experience premium travel in Thane. Carvio Cabs offers professional chauffeur-driven taxi service and hourly car rentals across Thane East, Thane West, Ghodbunder Road, and neighboring areas. AC sedans and SUVs with verified drivers.",
    airportContent: "Book your airport taxi from Thane to Mumbai Airport. We monitor flight arrivals and ensure on-time pickups and drops.",
    routes: [
      { route: "Thane to Mumbai Airport Cab", dist: "22 km", time: "45 mins" },
      { route: "Thane to Bandra Kurla Complex (BKC)", dist: "25 km", time: "50 mins" },
      { route: "Thane to Dadar Taxi", dist: "26 km", time: "50 mins" },
      { route: "Thane to Pune Outstation Cab", dist: "160 km", time: "3.5 hrs" },
      { route: "Thane to Nashik Cab", dist: "145 km", time: "3.2 hrs" }
    ],
    faqs: [
      { q: "Do you serve Ghodbunder Road in Thane?", a: "Yes, we provide 24/7 pickup and drop coverage across all residential complexes and IT parks on Ghodbunder Road." },
      { q: "Are tolls included in outstation rates from Thane?", a: "Standard rates exclude toll and parking fees, which are billed transparently at actuals." }
    ]
  },
  "navi-mumbai": {
    name: "Navi Mumbai",
    metaTitle: "Cab Service in Navi Mumbai | Local Taxi & Car Rental",
    metaDescription: "Book cab service in Navi Mumbai with Carvio Cab. Premium airport transfers, corporate travel, outstation taxi and car rental with driver.",
    keywords: "cab service in Navi Mumbai, Navi Mumbai taxi, car rental Navi Mumbai, airport taxi Navi Mumbai",
    h1: "Cab Service in Navi Mumbai",
    intro: "Looking for a reliable cab in Navi Mumbai? Carvio Cabs provides professional chauffeur-driven car rentals across Vashi, Nerul, Belapur, Kharghar, and other Navi Mumbai nodes. Clean AC cars and polite drivers.",
    airportContent: "Get on-time airport taxi service from Navi Mumbai to Mumbai Airport. We use the Palm Beach Road and Highway for smooth travel.",
    routes: [
      { route: "Navi Mumbai to Mumbai Airport Cab", dist: "28 km", time: "55 mins" },
      { route: "Navi Mumbai to BKC Business Cab", dist: "22 km", time: "45 mins" },
      { route: "Navi Mumbai to Dadar Taxi", dist: "24 km", time: "45 mins" },
      { route: "Navi Mumbai to Pune Outstation Cab", dist: "120 km", time: "2.5 hrs" }
    ],
    faqs: [
      { q: "Which areas do you cover in Navi Mumbai?", a: "We cover all major nodes including Vashi, Nerul, Kharghar, Belapur, Kopar Khairane, Sanpada, and Airoli." },
      { q: "Do you offer one-way drops to Pune from Navi Mumbai?", a: "Yes, we offer fixed-rate one-way outstation taxi service to Pune via the Expressway." }
    ]
  },
  vashi: {
    name: "Vashi",
    metaTitle: "Cab Service in Vashi | Airport Taxi & Car Rental Vashi",
    metaDescription: "Book cab service in Vashi with Carvio Cab. Reliable local taxi, airport pickup/drop, and outstation taxi service with professional driver.",
    keywords: "cab service in Vashi, Vashi taxi booking, car rental Vashi, airport cab Vashi",
    h1: "Cab Service in Vashi",
    intro: "Need a premium cab in Vashi? Carvio Cabs provides top-tier chauffeur-driven car rentals and local taxi services across Vashi, Sanpada, and adjacent Navi Mumbai areas. Verified drivers and clean AC fleet.",
    airportContent: "Book a direct airport transfer from Vashi to Mumbai Airport. Enjoy punctual pickups and drops with flat-rate fares.",
    routes: [
      { route: "Vashi to Mumbai Airport Cab", dist: "24 km", time: "45 mins" },
      { route: "Vashi to Bandra Kurla Complex (BKC)", dist: "18 km", time: "35 mins" },
      { route: "Vashi to Dadar Taxi", dist: "16 km", time: "30 mins" },
      { route: "Vashi to Pune Outstation Cab", dist: "128 km", time: "2.6 hrs" }
    ],
    faqs: [
      { q: "Do you pick up near Vashi Railway Station?", a: "Yes, we coordinate pick-ups near the station and corporate parks in Vashi Sector 30." },
      { q: "Can I book a local hourly cab package in Vashi?", a: "Yes, we offer flexible local packages (4h/40km and 8h/80km) for city travel." }
    ]
  },
  nerul: {
    name: "Nerul",
    metaTitle: "Cab Service in Nerul | Local Taxi & Car Rental Nerul",
    metaDescription: "Reliable cab service in Nerul Navi Mumbai with Carvio Cab. Chauffeur driven car rental, airport transfers, and outstation taxi booking.",
    keywords: "cab service in Nerul, Nerul taxi booking, car rental Nerul, airport taxi Nerul",
    h1: "Cab Service in Nerul",
    intro: "Looking for a reliable cab in Nerul? Carvio Cabs offers safe and sanitized car rental with driver across Nerul, Seawoods, and surrounding nodes. AC sedans and SUVs with professional drivers.",
    airportContent: "Get on-time airport pickup or drop cab service from Nerul to Mumbai Airport. We track your flight and guarantee a hassle-free transfer.",
    routes: [
      { route: "Nerul to Mumbai Airport Cab", dist: "30 km", time: "60 mins" },
      { route: "Nerul to Bandra Kurla Complex (BKC)", dist: "24 km", time: "50 mins" },
      { route: "Nerul to Dadar Taxi", dist: "22 km", time: "45 mins" },
      { route: "Nerul to Pune Outstation Cab", dist: "115 km", time: "2.3 hrs" }
    ],
    faqs: [
      { q: "Do you service Seawoods Darave area near Nerul?", a: "Yes, we provide 24/7 pickup and drop coverage across Seawoods and Nerul sectors." },
      { q: "Can I book a cab for a round trip to Pune from Nerul?", a: "Yes, we offer fixed-rate round-trip outstation packages to Pune and other locations." }
    ]
  },
  kharghar: {
    name: "Kharghar",
    metaTitle: "Cab Service in Kharghar | Airport Taxi & Car Rental",
    metaDescription: "Book cab service in Kharghar Navi Mumbai with Carvio Cab. Reliable local taxi, airport pickup/drop, and outstation taxi service.",
    keywords: "cab service in Kharghar, Kharghar taxi, car rental Kharghar, airport cab Kharghar",
    h1: "Cab Service in Kharghar",
    intro: "Need a premium cab in Kharghar? Carvio Cabs provides top-tier chauffeur-driven car rentals and local taxi services across Kharghar, Belapur, and adjacent nodes. Clean AC cars and verified drivers.",
    airportContent: "Book your airport taxi from Kharghar to Mumbai Airport. We monitor flight arrivals and ensure on-time pickups and drops.",
    routes: [
      { route: "Kharghar to Mumbai Airport Cab", dist: "35 km", time: "70 mins" },
      { route: "Kharghar to Bandra Kurla Complex (BKC)", dist: "30 km", time: "60 mins" },
      { route: "Kharghar to Dadar Taxi", dist: "28 km", time: "55 mins" },
      { route: "Kharghar to Pune Outstation Cab", dist: "105 km", time: "2.1 hrs" }
    ],
    faqs: [
      { q: "Do you operate in Sector 35 and golf course areas in Kharghar?", a: "Yes, we provide 24/7 pickup and drop coverage across all sectors of Kharghar." },
      { q: "Is toll included in Pune outstation trips from Kharghar?", a: "Standard rates exclude toll and parking fees, which are billed transparently at actuals." }
    ]
  },
  airoli: {
    name: "Airoli",
    metaTitle: "Cab Service in Airoli | Local Taxi & Corporate Cars",
    metaDescription: "Book cab service in Airoli Navi Mumbai with Carvio Cab. Chauffeur driven car rental, airport taxi, and corporate transport in Airoli.",
    keywords: "cab service in Airoli, Airoli taxi booking, car rental Airoli, airport taxi Airoli",
    h1: "Cab Service in Airoli",
    intro: "Book premium cab service in Airoli, Mindspace, and surrounding commercial neighborhoods. Carvio Cabs offers clean cars and polite chauffeurs for business travel, client drops, or local commutes.",
    airportContent: "Arrive on time for your flight. Book a professional airport transfer cab from Airoli to Mumbai Airport via SCLR or Eastern Express Highway.",
    routes: [
      { route: "Airoli to Mumbai Airport Cab", dist: "26 km", time: "50 mins" },
      { route: "Airoli to Bandra Kurla Complex (BKC)", dist: "20 km", time: "40 mins" },
      { route: "Airoli to Dadar Taxi", dist: "22 km", time: "45 mins" },
      { route: "Airoli to Pune Outstation Cab", dist: "142 km", time: "3 hrs" }
    ],
    faqs: [
      { q: "Do you service corporate parks in Airoli Mindspace?", a: "Yes, we specialize in employee transport and executive travel for companies in Mindspace, Airoli." },
      { q: "Do you offer hourly local rentals in Airoli?", a: "Yes, our local hourly rental packages (such as 8h/80km) are perfect for business visits." }
    ]
  },
  "mira-road": {
    name: "Mira Road",
    metaTitle: "Cab Service in Mira Road | Airport Taxi & Car Rental",
    metaDescription: "Book cab service in Mira Road East and West with Carvio Cab. Reliable local taxi, airport pickup/drop, and outstation taxi service.",
    keywords: "cab service in Mira Road, Mira Road taxi, car rental Mira Road, airport cab Mira Road",
    h1: "Cab Service in Mira Road",
    intro: "Need a premium cab in Mira Road? Carvio Cabs provides professional chauffeur-driven car rentals across Mira Road East, Bhayandar, and adjacent nodes. Clean AC cars and verified drivers.",
    airportContent: "Book your airport taxi from Mira Road to Mumbai Airport. We monitor flight arrivals and ensure on-time pickups and drops.",
    routes: [
      { route: "Mira Road to Mumbai Airport Cab", dist: "28 km", time: "60 mins" },
      { route: "Mira Road to Bandra Kurla Complex (BKC)", dist: "32 km", time: "70 mins" },
      { route: "Mira Road to Dadar Taxi", dist: "34 km", time: "70 mins" },
      { route: "Mira Road to Pune Outstation Cab", dist: "185 km", time: "4.5 hrs" }
    ],
    faqs: [
      { q: "Do you cover all areas in Mira Road and Bhayandar?", a: "Yes, we provide comprehensive 24/7 pickup and drop coverage across Mira Road East & West and Bhayandar." },
      { q: "Are tolls included in outstation rates from Mira Road?", a: "Standard rates exclude toll and parking fees, which are billed transparently at actuals." }
    ]
  }
};

export default function LocationPage({ location }) {
  const data = LOCATION_DATA[location];
  const [settings, setSettings] = useState({ company_name: "Carvio Cabs", email: "support@carviocabs.com" });

  useEffect(() => {
    axios.get(`${API}/settings`).then(r => setSettings(r.data)).catch(() => {});
  }, []);

  // Injected schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": `${settings.company_name} - ${data.name} Location Hub`,
    "description": data.metaDescription,
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
      {
        "@type": "AdministrativeArea",
        "name": data.name
      },
      {
        "@type": "AdministrativeArea",
        "name": "Mumbai"
      }
    ]
  };

  const faqSchema = {
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
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [businessSchema, faqSchema]
  };

  // SEO Hook call
  useSEO({
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    schema: combinedSchema
  });

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-secondary border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-zinc-400 text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-2">
              <MapPin size={16} /> Local Service Area: {data.name}, Mumbai
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-4 mb-6 leading-tight">
              {data.h1}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {data.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services in location */}
      <section className="py-20 bg-primary">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-dark p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-xl bg-zinc-800/50 flex items-center justify-center mb-6">
                <Car className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Cab Service in {data.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Whether you need a premium cab for office travel, local drops, client pickup, or weekend family road trips, Carvio Cabs provides modern, fully sanitized vehicles and verified drivers across {data.name} and neighboring areas.
              </p>
            </div>
            <Link to="/book" className="text-white font-medium flex items-center gap-2 hover:text-zinc-300 transition-colors">
              Book Local Chauffeur <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="card-dark p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-xl bg-zinc-800/50 flex items-center justify-center mb-6">
                <ShieldCheck className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{data.name} to Mumbai Airport Cab</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {data.airportContent}
              </p>
            </div>
            <Link to="/book" className="text-white font-medium flex items-center gap-2 hover:text-zinc-300 transition-colors">
              Book Airport Transfer <ArrowRight size={16} />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-20 bg-secondary">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Popular Cab Routes from {data.name}</h2>
            <p className="text-muted-foreground text-sm mt-2">Punctual taxi transfers with transparent billing and no surprise surges.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.routes.map((route, i) => (
              <div key={i} className="card-dark flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-zinc-400" size={18} />
                  <span className="text-foreground font-semibold text-sm md:text-base">{route.route}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium text-xs md:text-sm">{route.dist}</p>
                  <p className="text-zinc-500 text-xs">{route.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localized FAQ */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Local Travel FAQs ({data.name})</h2>
          </div>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <div key={i} className="card-dark p-6">
                <div className="flex gap-3 mb-2">
                  <HelpCircle className="text-white flex-shrink-0 mt-1" size={20} />
                  <h3 className="text-foreground font-bold text-base md:text-lg">{faq.q}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8 text-sm md:text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Taxi in {data.name} Now</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            Get instant confirmations, clean premium sedans or SUVs, and highly trained drivers for local, airport, or outstation rides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/book" className="bg-white text-black hover:bg-zinc-200 transition-colors font-semibold px-8 py-4 rounded-xl text-lg block w-full sm:w-auto">
              Book Your Ride
            </Link>
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="border border-zinc-800 text-white hover:bg-zinc-800/40 transition-colors font-semibold px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 w-full sm:w-auto">
                <Phone size={18} /> Call Support
              </a>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
