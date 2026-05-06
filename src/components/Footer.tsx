import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Facebook, Instagram } from "lucide-react";
import { GradientLogo } from "./GradientLogo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
      <div className="container relative mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <GradientLogo size="md" />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Automation Specialist building AI, CRM, and funnel systems that scale.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Navigate</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link to="/experience" className="hover:text-foreground">Experience</Link></li>
              <li><Link to="/work" className="hover:text-foreground">Work</Link></li>
              <li><Link to="/testimonials" className="hover:text-foreground">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Get in touch</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-violet" />
                <a href="tel:+639244640194" className="hover:text-foreground">+63 924-464-0194</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-brand-violet" />
                <a href="https://wa.me/639772727335" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">+63 977-272-7335 (WhatsApp)</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-violet" />
                <a href="mailto:gojoswcollab@gmail.com" className="hover:text-foreground">gojoswcollab@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-brand-violet" />
                <a href="https://www.linkedin.com/in/remark-antipala-00b806355" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-brand-violet" />
                <a href="https://www.facebook.com/share/1FwsP7RFCz/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Facebook</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-brand-violet" />
                <a href="https://www.instagram.com/mark_antipala" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Instagram</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-violet" />
                Lapu-Lapu City, Cebu, Philippines
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Remark Antipala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
