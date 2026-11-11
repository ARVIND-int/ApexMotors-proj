import { useState } from "react";

export default function Hero() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden border-b hairline">
      <div className="absolute inset-0">
        {!imageFailed && (
          <img
            src="https://images.pexels.com/photos/4692088/pexels-photo-4692088.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt="A luxury coupe parked at twilight overlooking the city skyline"
            className="w-full h-full object-cover"
            style={{ opacity: 0.55 }}
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(13,12,11,0.97) 10%, rgba(13,12,11,0.75) 45%, rgba(13,12,11,0.35) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 md:pt-36 md:pb-40">
        <p className="font-mono text-sm mb-6" style={{ color: "var(--gold)" }}>
          A curated dealership, not a lot
        </p>
        <h1
          className="font-display max-w-2xl"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05, color: "var(--paper)" }}
        >
          Every car here was chosen. Not just stocked.
        </h1>
        <p className="mt-6 max-w-xl text-base md:text-lg" style={{ color: "var(--muted)" }}>
          Apex Motors keeps a small, hand-inspected inventory of coupes, sedans, and SUVs -
          each one reconditioned, documented, and priced without the back-and-forth.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#inventory" className="btn-gold px-6 py-3 text-sm font-medium rounded-sm">
            View inventory
          </a>
          <a href="#contact" className="btn-outline px-6 py-3 text-sm font-medium rounded-sm border">
            Book a test drive
          </a>
        </div>
      </div>
    </section>
  );
}
