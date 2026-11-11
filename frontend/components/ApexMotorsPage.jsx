import React, { useState, useMemo, useEffect } from "react";
import {
  Menu, X, ChevronDown, Phone, Mail, MapPin, Check,
  Gauge, Fuel, Star
} from "lucide-react";
import { apiRequest } from "../services/api";
import { CATEGORY_COLOR, NAV_LINKS, SERVICES } from "../data/siteData";
import { formatMileage, formatPrice } from "../utils/formatters";
import Header from "./Header";
import Hero from "./Hero";

/* ======================================================================
   APEX MOTORS — single-file React front end
   ----------------------------------------------------------------------
   HOW THIS IS ORGANIZED (read this before wiring up Spring Boot):

   1. MOCK DATA — VEHICLES / SERVICES / REVIEWS
      Right now this is just plain JS arrays sitting in this file so the
      site works with zero backend. When your Spring Boot API is ready,
      delete the mock arrays and replace them with real fetches — every
      spot that needs to change is marked with a  // SPRING BOOT TODO
      comment, and each one tells you the suggested endpoint, method,
      and JSON shape to return/send.

   2. A tiny `apiRequest()` helper is included below. It currently just
      resolves after a short delay ("pretends" to call a server). Once
      your backend exists, point BASE_URL at it (e.g. http://localhost:8080)
      and swap the fake delay for a real `fetch(...)`.

   3. Forms (contact + test-drive/inquiry) already collect and validate
      the fields your Spring Boot controllers will want. They just log
      to the console and show a success state for now — no real network
      call is made, so this stays 100% frontend-only until you connect it.
   ====================================================================== */

/* ----------------------------------------------------------------------
   MOCK DATA: VEHICLES
   SPRING BOOT TODO: GET /api/vehicles
   Suggested Vehicle entity / DTO fields (Java-ish):
     Long id; String name; String category; // "Coupe" | "Sedan" | "SUV"
     Integer year; Integer price; Integer mileage; String imageUrl;
     String engine; Integer horsepower; String drivetrain;
     Double zeroToSixty; String transmission; String exteriorColor;
     String interiorColor; String vin; String description;
   Replace the array below with the result of:
     const [vehicles, setVehicles] = useState([]);
     useEffect(() => { apiRequest("/api/vehicles").then(setVehicles); }, []);
------------------------------------------------------------------------- */
const VEHICLES = [
  {
    id: 1,
    name: "Corsera GT",
    category: "Coupe",
    year: 2024,
    price: 142900,
    mileage: 2100,
    image: "https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "3.9L Twin-Turbo V8",
    horsepower: 630,
    drivetrain: "Rear-Wheel Drive",
    zeroToSixty: 3.1,
    transmission: "8-Speed Dual-Clutch",
    exterior: "Glacier White",
    interior: "Obsidian Leather",
    vin: "APX2024CGT001",
    description:
      "The Corsera GT is the sharpest thing in the building. A twin-turbo V8 up front, a chassis tuned for a track it will rarely see, and a cabin quiet enough to hear yourself change your mind about the speed limit.",
  },
  {
    id: 2,
    name: "Halcyon RS",
    category: "Coupe",
    year: 2023,
    price: 118400,
    mileage: 6800,
    image: "https://images.pexels.com/photos/2896135/pexels-photo-2896135.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "3.0L Twin-Turbo I6",
    horsepower: 468,
    drivetrain: "All-Wheel Drive",
    zeroToSixty: 3.8,
    transmission: "8-Speed Automatic",
    exterior: "Amber Copper",
    interior: "Cognac Leather",
    vin: "APX2023HRS002",
    description:
      "Halcyon RS trades outright brutality for balance — a six-cylinder that pulls cleanly to redline and all-wheel grip that makes bad weather feel optional rather than disqualifying.",
  },
  {
    id: 3,
    name: "Meridian Coupe",
    category: "Coupe",
    year: 2022,
    price: 96750,
    mileage: 12400,
    image: "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "2.0L Turbo I4",
    horsepower: 302,
    drivetrain: "Rear-Wheel Drive",
    zeroToSixty: 5.2,
    transmission: "7-Speed Dual-Clutch",
    exterior: "Jet Black",
    interior: "Charcoal Alcantara",
    vin: "APX2022MDC003",
    description:
      "Meridian Coupe is the entry point to the range and the one our own staff argue over taking home most often — light, direct steering and a back seat that's actually usable.",
  },
  {
    id: 4,
    name: "Belmont Prestige",
    category: "Sedan",
    year: 2024,
    price: 89900,
    mileage: 3900,
    image: "https://images.pexels.com/photos/32512194/pexels-photo-32512194.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "3.5L Twin-Turbo V6",
    horsepower: 375,
    drivetrain: "All-Wheel Drive",
    zeroToSixty: 4.6,
    transmission: "9-Speed Automatic",
    exterior: "Onyx Black",
    interior: "Ivory Leather",
    vin: "APX2024BPR004",
    description:
      "Belmont Prestige is built for the driver who's in the car more than they're looking at it — a cabin tuned for long distances and a ride that erases bad pavement.",
  },
  {
    id: 5,
    name: "Sovereign L",
    category: "Sedan",
    year: 2023,
    price: 104250,
    mileage: 8100,
    image: "https://images.pexels.com/photos/18346535/pexels-photo-18346535.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "4.0L Twin-Turbo V8",
    horsepower: 456,
    drivetrain: "Rear-Wheel Drive",
    zeroToSixty: 4.2,
    transmission: "8-Speed Automatic",
    exterior: "Deep Slate",
    interior: "Espresso Leather",
    vin: "APX2023SVL005",
    description:
      "Sovereign L is the long-wheelbase flagship — extra rear legroom, a cabin lined in hand-stitched leather, and enough V8 that it never feels like it's working for it.",
  },
  {
    id: 6,
    name: "Larkspur Executive",
    category: "Sedan",
    year: 2022,
    price: 76300,
    mileage: 15200,
    image: "https://images.pexels.com/photos/29566862/pexels-photo-29566862.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "2.0L Turbo I4 Hybrid",
    horsepower: 268,
    drivetrain: "Front-Wheel Drive",
    zeroToSixty: 6.4,
    transmission: "CVT",
    exterior: "Platinum Silver",
    interior: "Graphite Cloth-Leather",
    vin: "APX2022LEX006",
    description:
      "Larkspur Executive is the practical argument in the lineup — a hybrid four-cylinder that returns real fuel economy without asking you to give up a proper leather cabin.",
  },
  {
    id: 7,
    name: "Osprey Terrain",
    category: "SUV",
    year: 2024,
    price: 118700,
    mileage: 4500,
    image: "https://images.pexels.com/photos/5288744/pexels-photo-5288744.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "3.0L Turbo I6 Mild-Hybrid",
    horsepower: 395,
    drivetrain: "All-Wheel Drive",
    zeroToSixty: 5.1,
    transmission: "8-Speed Automatic",
    exterior: "Desert Sand",
    interior: "Saddle Leather",
    vin: "APX2024OTR007",
    description:
      "Osprey Terrain is the SUV for people who actually leave pavement occasionally — adjustable air suspension, real ground clearance, and a third row that folds flat without a fight.",
  },
  {
    id: 8,
    name: "Kestrel Grand",
    category: "SUV",
    year: 2023,
    price: 97600,
    mileage: 9300,
    image: "https://images.pexels.com/photos/8622791/pexels-photo-8622791.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "4.0L Twin-Turbo V8",
    horsepower: 577,
    drivetrain: "All-Wheel Drive",
    zeroToSixty: 4.5,
    transmission: "9-Speed Automatic",
    exterior: "Ember Red",
    interior: "Black Nappa Leather",
    vin: "APX2023KGR008",
    description:
      "Kestrel Grand is a performance SUV without the caveats — a V8 that sounds the part, seating for five, and enough cargo room to make the whole thing defensible.",
  },
  {
    id: 9,
    name: "Fenwick Alpine",
    category: "SUV",
    year: 2022,
    price: 84950,
    mileage: 18600,
    image: "https://images.pexels.com/photos/20212558/pexels-photo-20212558.jpeg?auto=compress&cs=tinysrgb&w=1400",
    engine: "2.0L Turbo I4",
    horsepower: 261,
    drivetrain: "All-Wheel Drive",
    zeroToSixty: 6.8,
    transmission: "8-Speed Automatic",
    exterior: "Storm Gray",
    interior: "Slate Leather",
    vin: "APX2022FAL009",
    description:
      "Fenwick Alpine is the quiet, sensible one — every option that matters day-to-day, none of the ones that only matter on a spec sheet, and a price that reflects it.",
  },
];

/* ----------------------------------------------------------------------
   MOCK DATA: REVIEWS
   SPRING BOOT TODO: GET /api/reviews
   Suggested Review entity: Long id; String authorName; Integer rating;
   String quote; String vehiclePurchased; String photoUrl;
------------------------------------------------------------------------- */
const REVIEWS = [
  {
    id: 1,
    name: "Priya Nathan",
    vehicle: "Sovereign L",
    rating: 5,
    photo: "https://images.pexels.com/photos/30004322/pexels-photo-30004322.jpeg?auto=compress&cs=tinysrgb&w=300",
    quote:
      "Nobody rushed me. I test-drove two cars, went home, came back three days later, and the same person remembered exactly where we'd left off.",
  },
  {
    id: 2,
    name: "Marcus Webb",
    vehicle: "Kestrel Grand",
    rating: 5,
    photo: "https://images.pexels.com/photos/32064778/pexels-photo-32064778.jpeg?auto=compress&cs=tinysrgb&w=300",
    quote:
      "The trade-in number they gave me on the spot was better than two other dealers quoted after I'd filled out their online forms. That alone made the decision easy.",
  },
  {
    id: 3,
    name: "ElenaFord",
    vehicle: "Belmont Prestige",
    rating: 5,
    photo: "https://images.pexels.com/photos/29852895/pexels-photo-29852895.jpeg?auto=compress&cs=tinysrgb&w=300",
    quote:
      "They delivered the car to my office so I could sign the paperwork on my lunch break. I still haven't set foot in the actual showroom.",
  },
  {
    id: 4,
    name: "David Okafor",
    vehicle: "Osprey Terrain",
    rating: 4,
    photo: "https://images.pexels.com/photos/28446973/pexels-photo-28446973.jpeg?auto=compress&cs=tinysrgb&w=300",
    quote:
      "Financing was explained line by line before I signed anything, which is more than I can say for the last two dealerships I walked into.",
  },
];

/* ======================================================================
   MAIN COMPONENT
   ====================================================================== */
export default function ApexMotors() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("price-asc");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [inquiryContext, setInquiryContext] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [vehicleResponse, reviewResponse] = await Promise.all([
          apiRequest("/api/vehicles", {}, VEHICLES),
          apiRequest("/api/reviews", {}, REVIEWS),
        ]);

        if (!isMounted) return;

        setVehicles(
          Array.isArray(vehicleResponse)
            ? vehicleResponse.map(normalizeVehicle)
            : []
        );
        setReviews(
          Array.isArray(reviewResponse)
            ? reviewResponse.map(normalizeReview)
            : []
        );
      } catch (err) {
        if (!isMounted) return;
        console.error("Failed to load dealership data", err);
        setError("Unable to load dealership data right now.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredVehicles = useMemo(() => {
    let list =
      category === "All" ? vehicles : vehicles.filter((v) => v.category === category);
    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "year-desc": (a, b) => b.year - a.year,
      "year-asc": (a, b) => a.year - b.year,
      "mileage-asc": (a, b) => a.mileage - b.mileage,
      "mileage-desc": (a, b) => b.mileage - a.mileage,
    };
    return [...list].sort(sorters[sortBy]);
  }, [category, sortBy, vehicles]);

  return (
    <div style={{ background: "var(--ink)", color: "var(--paper)", minHeight: "100vh" }} className="apex-root">
      <GlobalStyle />

      <Header isMenuOpen={mobileNavOpen} setIsMenuOpen={setMobileNavOpen} />

      <Hero />

      <Inventory
        vehicles={filteredVehicles}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onSelect={setSelectedVehicle}
        loading={loading}
        error={error}
      />

      <Services />

      <Story />

      <Reviews reviews={reviews} loading={loading} error={error} />

      <Contact />

      <Footer />

      {selectedVehicle && (
        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onRequest={(type) => {
            setInquiryContext({ vehicle: selectedVehicle, type });
          }}
        />
      )}

      {inquiryContext && (
        <QuickRequestModal
          context={inquiryContext}
          onClose={() => setInquiryContext(null)}
        />
      )}
    </div>
  );
}

function normalizeVehicle(vehicle) {
  return {
    ...vehicle,
    name: vehicle.name || vehicle.displayName || `${vehicle.make} ${vehicle.model}`,
    image: vehicle.image || vehicle.imageUrl,
    exterior: vehicle.exterior || vehicle.exteriorColor,
    interior: vehicle.interior || vehicle.interiorColor,
  };
}

function normalizeReview(review) {
  return {
    ...review,
    name: review.name || review.authorName,
    vehicle: review.vehicle || review.vehicleName,
    photo: review.photo || review.photoUrl,
    quote: review.quote || review.comment,
  };
}

/* ======================================================================
   GLOBAL STYLE — fonts, color tokens, and small hand-rolled utility
   classes that Tailwind's core set doesn't cover (custom brand colors,
   hairline borders, focus rings, etc).
   ====================================================================== */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

      .apex-root {
        --ink: #0d0c0b;
        --panel: #17140f;
        --panel-2: #1f1b15;
        --hairline: rgba(201,167,104,0.16);
        --hairline-strong: rgba(201,167,104,0.35);
        --gold: #c9a768;
        --gold-soft: #a98d5a;
        --paper: #ece7dc;
        --muted: #9c968a;
        font-family: 'Inter', system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      .apex-root .font-display { font-family: 'Fraunces', serif; }
      .apex-root .font-mono { font-family: 'IBM Plex Mono', monospace; }

      .apex-root .hairline { border-color: var(--hairline); }
      .apex-root .hairline-strong { border-color: var(--hairline-strong); }

      .apex-root .btn-gold {
        background: var(--gold);
        color: #14120d;
      }
      .apex-root .btn-gold:hover { background: #d9b878; }

      .apex-root .btn-outline {
        border: 1px solid var(--hairline-strong);
        color: var(--paper);
      }
      .apex-root .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

      .apex-root input:focus, .apex-root select:focus, .apex-root textarea:focus {
        outline: none;
        border-color: var(--gold) !important;
      }

      .apex-root ::selection { background: var(--gold); color: #14120d; }

      @media (prefers-reduced-motion: reduce) {
        .apex-root * { transition: none !important; animation: none !important; }
      }
    `}</style>
  );
}

/* ======================================================================
   INVENTORY — filters, sort, grid
   ====================================================================== */
function Inventory({ vehicles, category, setCategory, sortBy, setSortBy, onSelect, loading, error }) {
  const categories = ["All", ...new Set(vehicles.map((vehicle) => vehicle.category).filter(Boolean))];

  return (
    <section id="inventory" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <SectionHeading eyebrow="Inventory" title="Currently on the floor" />

      <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b hairline pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-4 py-2 text-sm rounded-sm border transition-colors"
              style={{
                borderColor: category === c ? "var(--gold)" : "var(--hairline-strong)",
                color: category === c ? "var(--gold)" : "var(--muted)",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>Sort</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none text-sm rounded-sm border pl-3 pr-8 py-2"
              style={{ background: "var(--panel)", borderColor: "var(--hairline-strong)", color: "var(--paper)" }}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
              <option value="mileage-asc">Mileage: Low to High</option>
              <option value="mileage-desc">Mileage: High to Low</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--muted)" }} />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-sm" style={{ color: "var(--muted)" }}>
            Loading inventory...
          </p>
        ) : error ? (
          <p className="col-span-full text-center text-sm" style={{ color: "#d98a6a" }}>
            {error}
          </p>
        ) : (
          vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={() => onSelect(vehicle)}
            />
          ))
        )}

        {!loading && !error && vehicles.length === 0 && (
          <p className="col-span-full text-center text-sm" style={{ color: "var(--muted)" }}>
            No vehicles found.
          </p>
        )}
      </div>
    </section>
  );
}

function VehicleCard({ vehicle, onSelect }) {
  const chipColor = CATEGORY_COLOR[vehicle.category];
  return (
    <article style={{ background: "var(--ink)" }} className="group">
      <button onClick={onSelect} className="w-full text-left block">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={vehicle.image}
            alt={`${vehicle.year} ${vehicle.name}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className="absolute top-3 left-3 text-xs font-mono px-2 py-1 rounded-sm"
            style={{ background: "rgba(13,12,11,0.75)", color: chipColor, border: `1px solid ${chipColor}55` }}
          >
            {vehicle.category}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg" style={{ color: "var(--paper)" }}>{vehicle.name}</h3>
            <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>{vehicle.year}</span>
          </div>
          <p className="font-mono text-lg mt-2" style={{ color: "var(--gold)" }}>{formatPrice(vehicle.price)}</p>
          <div className="mt-3 flex items-center gap-4 font-mono text-xs" style={{ color: "var(--muted)" }}>
            <span className="flex items-center gap-1"><Gauge size={13} /> {formatMileage(vehicle.mileage)}</span>
            <span className="flex items-center gap-1"><Fuel size={13} /> {vehicle.horsepower} hp</span>
          </div>
        </div>
      </button>
    </article>
  );
}

/* ======================================================================
   VEHICLE DETAIL MODAL
   ====================================================================== */
function VehicleModal({ vehicle, onClose, onRequest }) {
  const specs = [
    { label: "Engine", value: vehicle.engine },
    { label: "Horsepower", value: `${vehicle.horsepower} hp` },
    { label: "Drivetrain", value: vehicle.drivetrain },
    { label: "0–60 mph", value: `${vehicle.zeroToSixty}s` },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Exterior", value: vehicle.exterior },
    { label: "Interior", value: vehicle.interior },
    { label: "Mileage", value: formatMileage(vehicle.mileage) },
    { label: "VIN", value: vehicle.vin ? `...${vehicle.vin.slice(-6)}` : "Not available" },
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(8,7,6,0.85)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-modal-title"
        className="w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto border hairline-strong"
        style={{ background: "var(--panel)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <img src={vehicle.image} alt={vehicle.name} className="w-full h-64 md:h-full object-cover" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full"
              style={{ background: "rgba(13,12,11,0.7)", color: "var(--paper)" }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <span className="font-mono text-xs px-2 py-1 rounded-sm" style={{ color: CATEGORY_COLOR[vehicle.category], border: `1px solid ${CATEGORY_COLOR[vehicle.category]}55` }}>
              {vehicle.category} · {vehicle.year}
            </span>
            <h2 id="vehicle-modal-title" className="font-display text-3xl mt-4" style={{ color: "var(--paper)" }}>{vehicle.name}</h2>
            <p className="font-mono text-2xl mt-2" style={{ color: "var(--gold)" }}>{formatPrice(vehicle.price)}</p>

            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{vehicle.description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t hairline pt-6">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-xs" style={{ color: "var(--muted)" }}>{s.label}</dt>
                  <dd className="text-sm mt-0.5" style={{ color: "var(--paper)" }}>{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onRequest("Test Drive")}
                className="btn-gold px-5 py-3 text-sm font-medium rounded-sm flex-1"
              >
                Request test drive
              </button>
              <button
                onClick={() => onRequest("Inquiry")}
                className="btn-outline border px-5 py-3 text-sm font-medium rounded-sm flex-1"
              >
                Send inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================
   QUICK REQUEST MODAL — used by both "Request test drive" and
   "Send inquiry" buttons on the vehicle modal.

   SPRING BOOT TODO: POST /api/test-drives   (when context.type === "Test Drive")
   SPRING BOOT TODO: POST /api/inquiries     (when context.type === "Inquiry")
   Suggested request body for either one:
     { vehicleId, vehicleName, type, name, email, phone, message }
   Suggested response: 201 Created with the saved record, so the frontend
   could show a real confirmation/reference number instead of a generic one.
   ====================================================================== */
function QuickRequestModal({ context, onClose }) {
  const { vehicle, type } = context;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const endpoint = type === "Test Drive" ? "/api/test-drives" : "/api/inquiries";
      await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify({ vehicleId: vehicle.id, vehicleName: vehicle.name, type, ...form }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(8,7,6,0.85)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-modal-title"
        className="w-full sm:max-w-md border hairline-strong p-6 md:p-8"
        style={{ background: "var(--panel)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-xs" style={{ color: "var(--gold)" }}>{type}</p>
            <h3 id="request-modal-title" className="font-display text-xl mt-1" style={{ color: "var(--paper)" }}>{vehicle.name}</h3>
          </div>
          <button onClick={onClose} style={{ color: "var(--muted)" }} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-8 text-center py-6">
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--gold)" }}>
              <Check size={22} color="#14120d" />
            </div>
            <p className="mt-4 font-display text-lg" style={{ color: "var(--paper)" }}>Request received</p>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              A member of the Apex Motors team will reach out about the {vehicle.name} shortly.
            </p>
            <button onClick={onClose} className="btn-gold mt-6 px-5 py-2.5 text-sm font-medium rounded-sm">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Field label="Full name" required autoComplete="name" value={form.name} onChange={handleChange("name")} />
            <Field label="Email" type="email" required autoComplete="email" value={form.email} onChange={handleChange("email")} />
            <Field label="Phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange("phone")} />
            {type === "Test Drive" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Preferred date" type="date" required value={form.preferredDate} onChange={handleChange("preferredDate")} />
                <Field label="Preferred time" type="time" required value={form.preferredTime} onChange={handleChange("preferredTime")} />
              </div>
            )}
            <FieldArea label="Message (optional)" value={form.message} onChange={handleChange("message")} rows={3} />
            <label className="flex items-start gap-2 text-xs" style={{ color: "var(--muted)" }}>
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
              />
              I agree that Apex Motors may contact me about this request.
            </label>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-gold mt-2 px-5 py-3 text-sm font-medium rounded-sm disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : `Send ${type.toLowerCase()} request`}
            </button>
            {status === "error" && (
              <p className="text-sm" style={{ color: "#d98a6a" }}>
                Something went wrong — please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

/* ======================================================================
   SERVICES
   ====================================================================== */
function Services() {
  return (
    <section id="services" className="border-t hairline" style={{ background: "var(--panel)" }}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <SectionHeading eyebrow="Services" title="What happens after you say yes" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="border-t pt-6" style={{ borderColor: "var(--hairline-strong)" }}>
                <Icon size={22} style={{ color: "var(--gold)" }} />
                <h3 className="font-display text-lg mt-4" style={{ color: "var(--paper)" }}>{s.title}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>{s.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   STORY
   ====================================================================== */
function Story() {
  return (
    <section id="story" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="order-2 md:order-1">
          <SectionHeading eyebrow="Since 2009" title="A dealership that started as an argument" />
          <p className="mt-6 text-sm md:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            Apex Motors started because our founder, a mechanic by training, got tired of
            watching good cars get flipped fast and priced high. So the model here is
            deliberately slower: every vehicle is inspected line by line, reconditioned
            in-house, and only listed once it's something we'd sign off on for a friend.
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            That's also why the lot stays small. We'd rather carry thirty cars we can
            vouch for than three hundred we can't.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t hairline pt-6">
            <div>
              <p className="font-display text-2xl" style={{ color: "var(--gold)" }}>15+</p>
              <p className="font-mono text-xs mt-1" style={{ color: "var(--muted)" }}>Years trading</p>
            </div>
            <div>
              <p className="font-display text-2xl" style={{ color: "var(--gold)" }}>100%</p>
              <p className="font-mono text-xs mt-1" style={{ color: "var(--muted)" }}>Inspected in-house</p>
            </div>
            <div>
              <p className="font-display text-2xl" style={{ color: "var(--gold)" }}>4.9</p>
              <p className="font-mono text-xs mt-1" style={{ color: "var(--muted)" }}>Average rating</p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <img
            src="https://images.pexels.com/photos/29566862/pexels-photo-29566862.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="A sedan on display under warm showroom lighting"
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   REVIEWS
   ====================================================================== */
function Reviews({ reviews, loading, error }) {
  return (
    <section id="reviews" className="border-t hairline" style={{ background: "var(--panel)" }}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <SectionHeading eyebrow="Reviews" title="What it's like to buy from us" />

        {loading ? (
          <p className="mt-10 text-sm" style={{ color: "var(--muted)" }}>Loading reviews...</p>
        ) : error ? (
          <p className="mt-10 text-sm" style={{ color: "#d98a6a" }}>{error}</p>
        ) : reviews.length === 0 ? (
          <p className="mt-10 text-sm" style={{ color: "var(--muted)" }}>
            Customer reviews will appear here soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="border hairline p-5" style={{ background: "var(--ink)" }}>
                <div className="flex items-center gap-3">
                  <img src={r.photo} alt={r.name} loading="lazy" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm" style={{ color: "var(--paper)" }}>{r.name}</p>
                    <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>{r.vehicle}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      style={{ color: i < r.rating ? "var(--gold)" : "var(--hairline-strong)" }}
                      fill={i < r.rating ? "var(--gold)" : "none"}
                    />
                  ))}
                </div>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>{r.quote}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ======================================================================
   CONTACT — frontend-only submission state (no backend call is made
   unless BASE_URL is set at the top of this file).

   SPRING BOOT TODO: POST /api/contact-messages
   Suggested request body: { name, email, phone, message }
   Suggested response: 201 Created
   ====================================================================== */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // SPRING BOOT TODO: swap this mock call for a real one, e.g.
      // await apiRequest("/api/contact-messages", { method: "POST", body: JSON.stringify(form) });
      await apiRequest("/api/contact-messages", { method: "POST", body: JSON.stringify(form) });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <SectionHeading eyebrow="Contact" title="Come see one in person" />
          <p className="mt-6 text-sm md:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            Walk in any day we're open, or send us a note and we'll get back to you within one
            business day — usually faster.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <MapPin size={18} style={{ color: "var(--gold)" }} />
              <a href="https://maps.google.com/?q=482+Ridgeline+Avenue+Mathura+UP" target="_blank" rel="noreferrer" className="text-sm" style={{ color: "var(--paper)" }}>482 Ridgeline Avenue, Mathura, UP</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} style={{ color: "var(--gold)" }} />
              <a href="tel:+919876543210" className="text-sm" style={{ color: "var(--paper)" }}>+91 98765 43210</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} style={{ color: "var(--gold)" }} />
              <a href="mailto:hello@apexmotors.example" className="text-sm" style={{ color: "var(--paper)" }}>hello@apexmotors.example</a>
            </div>
          </div>
        </div>

        <div className="border hairline p-6 md:p-8" style={{ background: "var(--panel)" }}>
          {status === "success" ? (
            <div className="text-center py-10">
              <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--gold)" }}>
                <Check size={22} color="#14120d" />
              </div>
              <p className="mt-4 font-display text-lg" style={{ color: "var(--paper)" }}>Message sent</p>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Thanks for reaching out — we'll be in touch shortly.
              </p>
              <button onClick={() => setStatus("idle")} className="btn-outline border mt-6 px-5 py-2.5 text-sm font-medium rounded-sm">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Full name" required autoComplete="name" value={form.name} onChange={handleChange("name")} />
              <Field label="Email" type="email" required autoComplete="email" value={form.email} onChange={handleChange("email")} />
              <Field label="Phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange("phone")} />
              <FieldArea label="Message" required value={form.message} onChange={handleChange("message")} rows={4} />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-gold mt-2 px-5 py-3 text-sm font-medium rounded-sm disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send message"}
              </button>
              {status === "error" && (
                <p className="text-sm" style={{ color: "#d98a6a" }}>Something went wrong — please try again.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   FOOTER
   ====================================================================== */
function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg" style={{ color: "var(--paper)" }}>
          Apex <span style={{ color: "var(--gold)" }}>Motors</span>
        </p>
        <p className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Apex Motors. All vehicles subject to prior sale.
        </p>
      </div>
    </footer>
  );
}

/* ======================================================================
   SMALL REUSABLE PIECES
   ====================================================================== */
function SectionHeading({ eyebrow, title }) {
  return (
    <div>
      <p className="font-mono text-xs" style={{ color: "var(--gold)" }}>{eyebrow}</p>
      <h2 className="font-display mt-2" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--paper)" }}>
        {title}
      </h2>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, required = false, autoComplete }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
        {label}{required && " *"}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className="text-sm rounded-sm border px-3 py-2.5"
        style={{ background: "var(--ink)", borderColor: "var(--hairline-strong)", color: "var(--paper)" }}
      />
    </label>
  );
}

function FieldArea({ label, value, onChange, required = false, rows = 3 }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
        {label}{required && " *"}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="text-sm rounded-sm border px-3 py-2.5 resize-none"
        style={{ background: "var(--ink)", borderColor: "var(--hairline-strong)", color: "var(--paper)" }}
      />
    </label>
  );
}
