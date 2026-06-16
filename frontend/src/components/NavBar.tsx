"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",       label: "Chat"  },
  { href: "/admin",  label: "Admin" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-background-surface border-b border-border-col px-6 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-accent-subtle font-bold text-xs font-mono shrink-0">
          AI
        </div>
        <div>
          <p className="font-display font-semibold text-text-col-primary text-sm leading-tight">AI Support Agent</p>
          <p className="text-xs text-text-col-tertiary font-mono tracking-wide leading-tight">Refund Assistant</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {navLinks.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium uppercase tracking-wider transition-colors duration-150 ${
                active
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "text-text-col-tertiary hover:text-text-col-secondary border border-transparent"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
