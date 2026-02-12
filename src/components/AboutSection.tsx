import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Target, Shield, Rocket } from 'lucide-react';

export const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Building Tomorrow's Digital Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At Vertexia Systems Ltd., we specialize in delivering scalable, secure, and 
              high-performance web solutions. Our team of expert developers combines cutting-edge 
              technologies with industry best practices to create software that drives real 
              business results.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-background shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-primary-foreground" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Innovation First</h3>
              <p className="text-muted-foreground">
                We embrace emerging technologies to deliver forward-thinking solutions that keep you ahead of the competition.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-background shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                <Shield className="text-primary-foreground" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Reliable Partners</h3>
              <p className="text-muted-foreground">
                Count on us for consistent quality, transparent communication, and on-time delivery every single time.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-background shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                <Target className="text-primary-foreground" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Business-Driven</h3>
              <p className="text-muted-foreground">
                Every solution we build is designed with your business goals in mind, ensuring measurable ROI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
