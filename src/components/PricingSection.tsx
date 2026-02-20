import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Palette,
  LayoutGrid,
  Code2,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Plan = {
  key: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  bdtFrom: number;
  bdtTo: number;
  highlight?: boolean;
  badge?: string;
  features: string[];
};

const FX_BDT_PER_USD = 110; // approx for display

function formatBDT(n: number) {
  return `৳${n.toLocaleString("en-US")}`;
}

function formatUSDFromBDTRange(from: number, to: number) {
  const usdFrom = Math.round(from / FX_BDT_PER_USD);
  const usdTo = Math.round(to / FX_BDT_PER_USD);
  return `$${usdFrom}–$${usdTo}`;
}

const plans: Plan[] = [
  {
    key: "uiux",
    title: "UI/UX & Landing",
    subtitle: "Design-first, conversion focused",
    icon: Palette,
    bdtFrom: 20000,
    bdtTo: 30000,
    features: [
      "Modern UI kit + sections",
      "Responsive (mobile-first)",
      "Figma-ready design structure",
      "Basic SEO structure",
      "Fast delivery timeline",
    ],
  },
  {
    key: "web",
    title: "Web Solution",
    subtitle: "Business website + core pages",
    icon: LayoutGrid,
    bdtFrom: 30000,
    bdtTo: 40000,
    highlight: true,
    badge: "Most Popular",
    features: [
      "Multi-page website (About/Services/Contact)",
      "Reusable components + clean layout",
      "Performance optimized UI",
      "Forms + basic integrations",
      "Deployment support",
    ],
  },
  {
    key: "fullstack",
    title: "Full-Stack App",
    subtitle: "Custom workflow & scalable build",
    icon: Code2,
    bdtFrom: 40000,
    bdtTo: 50000,
    features: [
      "Auth + dashboard screens",
      "API integration (CRUD)",
      "Role-based access (if needed)",
      "Scalable structure & best practices",
      "Post-launch support window",
    ],
  },
];

export const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="relative py-24 gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Sparkles size={16} />
            <span>Transparent Pricing (৳20k–৳50k)</span>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            Choose a <span className="text-gradient">Package</span> That Fits
          </h2>

          <p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.12s" }}
          >
            Clean UI/UX, scalable code, and a workflow built for real business needs.
            Get an exact quote based on your features & timeline.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.key}
                className={[
                  "relative rounded-2xl bg-card shadow-card border border-border/60 p-6 lg:p-7 animate-fade-up",
                  p.highlight ? "ring-1 ring-primary/30" : "",
                ].join(" ")}
                style={{ animationDelay: `${0.15 + idx * 0.06}s` }}
              >
                {p.badge ? (
                  <div className="absolute -top-3 left-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                    {p.badge}
                  </div>
                ) : null}

                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="text-primary" size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{p.subtitle}</p>
                  </div>

                  {p.highlight ? (
                    <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                      <LayoutGrid size={14} />
                      <span>Best value</span>
                    </div>
                  ) : null}
                </div>

                <div className="mb-5">
                  <div className="text-3xl font-bold text-foreground">
                    {formatBDT(p.bdtFrom)}{" "}
                    <span className="text-muted-foreground font-medium text-base">
                      – {formatBDT(p.bdtTo)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ≈ {formatUSDFromBDTRange(p.bdtFrom, p.bdtTo)} USD
                    <span className="text-muted-foreground/70"> (est.)</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="text-primary" size={14} />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    variant={p.highlight ? "hero" : "heroOutline"}
                    size="lg"
                    onClick={() => navigate(`/get-quote?plan=${p.key}`)}
                    className="w-full"
                  >
                    Get Quote
                    <ArrowRight size={18} />
                  </Button>

                  <button
                    type="button"
                    onClick={() => navigate(`/contact?plan=${p.key}`)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Talk to us about this package →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-10 text-center text-xs text-muted-foreground">
          USD is shown as an approximate reference (৳{FX_BDT_PER_USD}/$). Final cost depends on scope.
        </div>
      </div>
    </section>
  );
};