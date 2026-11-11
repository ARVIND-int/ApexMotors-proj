import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/siteData";

export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const [activeSection, setActiveSection] = useState("top");
  const menuRef = useRef(null);

  useEffect(() => {
    const sections = ["top", ...NAV_LINKS.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeMenuWhenClickingOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenuWhenClickingOutside);
    return () => document.removeEventListener("mousedown", closeMenuWhenClickingOutside);
  }, [isMenuOpen, setIsMenuOpen]);

  const linkStyle = (href) => ({
    color: activeSection === href.slice(1) ? "var(--gold)" : "var(--muted)",
  });

  return (
    <header
      ref={menuRef}
      className="sticky top-0 z-40 border-b"
      style={{ background: "rgba(13,12,11,0.9)", backdropFilter: "blur(8px)", borderColor: "var(--hairline)" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-xl tracking-wide" style={{ color: "var(--paper)" }}>
          Apex <span style={{ color: "var(--gold)" }}>Motors</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm" style={linkStyle(link.href)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-gold text-sm font-medium px-4 py-2 rounded-sm">
            Book a visit
          </a>
        </nav>

        <button
          className="md:hidden p-2"
          style={{ color: "var(--paper)" }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-t hairline px-6 py-4 flex flex-col gap-4" style={{ background: "var(--panel)" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm"
              style={linkStyle(link.href)}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-gold text-sm font-medium px-4 py-2 rounded-sm text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Book a visit
          </a>
        </div>
      )}
    </header>
  );
}
