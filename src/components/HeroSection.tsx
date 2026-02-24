import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Layers, Zap } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
            <Zap size={16} />
            <span>Full-Stack Web Development Experts</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Engineering{' '}
            <span className="text-gradient">Digital Excellence</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            We craft powerful, scalable web applications and custom software solutions
            that transform businesses. From startups to enterprises, we bring your
            digital vision to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" onClick={() => navigate("/get-quote")}>
              Get a Quote
              <ArrowRight size={20} />
            </Button>
            <a href='#services'>
            <Button variant="heroOutline" size="xl">
              View Services
            </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">5+</div>
              <div className="text-sm text-muted-foreground">Tech Stacks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Client Focused</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="hidden lg:block absolute top-1/3 left-20 animate-float">
          <div className="w-16 h-16 rounded-2xl bg-card shadow-card flex items-center justify-center">
            <Code2 className="text-primary" size={28} />
          </div>
        </div>
        <div className="hidden lg:block absolute top-1/2 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 rounded-2xl bg-card shadow-card flex items-center justify-center">
            <Layers className="text-accent" size={28} />
          </div>
        </div>
      </div>
    </section>
  );
};
