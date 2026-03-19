"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#api", label: "API" },
  { href: "#sdk", label: "SDK" },
  { href: "#pricing", label: "Pricing" },
  { href: "https://github.com/jgaillard/secql", label: "GitHub", external: true },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-14 left-0 right-0 bg-[var(--background)] border-b border-[var(--border)] px-6 py-4 flex flex-col gap-3 z-50">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
