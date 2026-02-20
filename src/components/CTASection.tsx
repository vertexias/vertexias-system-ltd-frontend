import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-8">
            <Sparkles size={16} />
            <span>Ready to Start?</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Let's Build Your Next{' '}
            <span className="text-gradient">Big Idea</span>
          </h2>

          <p className="text-lg md:text-xl text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
            Transform your vision into reality with our expert development team. 
            From concept to launch, we're with you every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="cta" size="xl" asChild>
              <a href="#contact">
                Contact Us
                <ArrowRight size={20} />
              </a>
            </Button>
            <a href="#contact">
            <Button variant="heroOutline" size="xl" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
              Schedule a Call
            </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
