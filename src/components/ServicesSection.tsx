import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { 
  Globe, 
  Cpu, 
  Cloud, 
  Link2, 
  Palette, 
  Settings2,
  ArrowRight 
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Full Stack Web Development',
    description: 'End-to-end web application development using modern frameworks and technologies for optimal performance and user experience.',
  },
  {
    icon: Cpu,
    title: 'Custom Business Software',
    description: 'Tailored software solutions designed to streamline your operations, automate workflows, and boost productivity.',
  },
  {
    icon: Cloud,
    title: 'SaaS Application Development',
    description: 'Scalable, multi-tenant cloud applications with subscription management, analytics, and enterprise-grade security.',
  },
  {
    icon: Link2,
    title: 'REST API & Integration',
    description: 'Robust API development and third-party integrations that connect your systems and enable seamless data flow.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality to create intuitive, engaging digital experiences.',
  },
  {
    icon: Settings2,
    title: 'System Optimization & Maintenance',
    description: 'Performance tuning, code refactoring, and ongoing support to keep your applications running at peak efficiency.',
  },
];

export const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Comprehensive Development Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From concept to deployment, we offer a full spectrum of development services 
              to bring your digital vision to life.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="text-primary" size={26} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
