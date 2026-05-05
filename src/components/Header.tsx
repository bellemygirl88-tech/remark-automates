import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { GradientLogo } from "./GradientLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/" as const, label: "Home" },
  { to: "/services" as const, label: "Services" },
  { to: "/experience" as const, label: "Experience" },
  { to: "/work" as const, label: "Work" },
  { to: "/certifications" as const, label: "Certifications" },
  { to: "/testimonials" as const, label: "Testimonials" },
  { to: "/book" as const, label: "Book a call" },
  { to: "/contact" as const, label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-border" />
      <div className="container relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <GradientLogo size="md" />

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md transition-colors hover:text-foreground hover:bg-accent"
              activeProps={{ className: "text-foreground bg-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/contact" className="hidden md:inline-flex">
            <Button className="gradient-brand text-white border-0 hover:opacity-90">Hire me</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden relative border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto max-w-6xl flex flex-col px-4 py-3 gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent"
                activeProps={{ className: "text-foreground bg-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
