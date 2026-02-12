import { Linkedin, Twitter, Github, Instagram } from 'lucide-react';

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  { name: 'Web Development', href: '#services' },
  { name: 'Custom Software', href: '#services' },
  { name: 'SaaS Development', href: '#services' },
  { name: 'API Integration', href: '#services' },
];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

export const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                 <img src="/logo2.png" alt="vertexia" />
              </div>
              <span className="font-bold text-xl text-secondary-foreground">Vertexia Sys Ltd.</span>
            </div>
            <p className="text-secondary-foreground/60 mb-6 text-sm leading-relaxed">
              Engineering digital excellence through innovative web solutions and custom software development.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} className="text-secondary-foreground/70" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors text-sm"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Stay Updated</h4>
            <p className="text-secondary-foreground/60 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-secondary-foreground/10 border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 my-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              © {new Date().getFullYear()} Vertexia Systems Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
