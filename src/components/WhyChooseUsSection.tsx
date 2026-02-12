import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Check } from 'lucide-react';

const features = [
  {
    title: 'Scalable Architecture',
    description: 'Systems designed to grow with your business, from startup to enterprise scale.',
  },
  {
    title: 'Clean & Maintainable Code',
    description: 'Well-documented, modular code that\'s easy to understand and extend.',
  },
  {
    title: 'Modern Technologies',
    description: 'Leveraging the latest frameworks and tools for optimal performance.',
  },
  {
    title: 'Security-Focused Development',
    description: 'Built-in security best practices protecting your data and users.',
  },
  {
    title: 'Client-Centric Approach',
    description: 'Your goals drive every decision, with transparent communication throughout.',
  },
  {
    title: 'Agile Methodology',
    description: 'Iterative development ensuring quick delivery and continuous improvement.',
  },
];

export const WhyChooseUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="why-us" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
                Excellence in Every Line of Code
              </h2>
              <p className="text-lg text-secondary-foreground/70 mb-8 leading-relaxed">
                We don't just build software—we engineer solutions that stand the test of time. 
                Our commitment to quality, innovation, and client success sets us apart.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="text-accent-foreground" size={14} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-foreground text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-secondary-foreground/60 text-sm mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-3xl opacity-10 blur-3xl" />
              <div className="relative bg-card rounded-3xl p-8 shadow-elevated">
                <div className="space-y-6">
                  {/* Code Block Visual */}
                  <div className="rounded-xl bg-secondary p-6 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                      <div className="w-3 h-3 rounded-full bg-primary/60" />
                    </div>
                    <div className="space-y-2 text-secondary-foreground/80">
                      <div><span className="text-accent">const</span> solution = <span className="text-primary">async</span> () =&gt; {'{'}</div>
                      <div className="pl-4"><span className="text-accent">await</span> analyze(requirements);</div>
                      <div className="pl-4"><span className="text-accent">await</span> design(architecture);</div>
                      <div className="pl-4"><span className="text-accent">await</span> develop(features);</div>
                      <div className="pl-4"><span className="text-accent">return</span> <span className="text-primary">success</span>;</div>
                      <div>{'}'}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-xl bg-background">
                      <div className="text-2xl font-bold text-foreground">100%</div>
                      <div className="text-xs text-muted-foreground">Test Coverage</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background">
                      <div className="text-2xl font-bold text-foreground">A+</div>
                      <div className="text-xs text-muted-foreground">Security Grade</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background">
                      <div className="text-2xl font-bold text-foreground">99.9%</div>
                      <div className="text-xs text-muted-foreground">Uptime SLA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
