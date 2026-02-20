import { useMemo, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send, CalendarDays, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { postContact } from "@/services/contact/contact";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type ScheduleState = {
  enabled: boolean;
  date: string; // yyyy-mm-dd
  time: string; // "10:30 AM"
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function to12h(hour24: number, minute: number) {
  const ampm = hour24 >= 12 ? "PM" : "AM";
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${h}:${pad2(minute)} ${ampm}`;
}

function weekdayFromISO(dateISO: string) {
  // dateISO: "YYYY-MM-DD"
  const [y, m, d] = dateISO.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.getDay(); // 0 Sun .. 6 Sat
}

/**
 * Business hours:
 * Mon-Fri: 9:00 AM - 6:00 PM
 * Sat: 10:00 AM - 4:00 PM
 * Sun: Closed
 */
function getBusinessWindow(dateISO: string) {
  const day = weekdayFromISO(dateISO);
  if (!dateISO) return null;

  // Sunday
  if (day === 0) return { closed: true as const };

  // Saturday
  if (day === 6) {
    return {
      closed: false as const,
      startHour: 10,
      startMinute: 0,
      endHour: 16,
      endMinute: 0,
    };
  }

  // Mon-Fri
  return {
    closed: false as const,
    startHour: 9,
    startMinute: 0,
    endHour: 18,
    endMinute: 0,
  };
}

function buildTimeSlots(dateISO: string, stepMinutes = 30) {
  const window = getBusinessWindow(dateISO);
  if (!window) return { closed: false, slots: [] as string[] };
  if ("closed" in window && window.closed) return { closed: true, slots: [] as string[] };

  const slots: string[] = [];
  const startTotal = window.startHour * 60 + window.startMinute;
  const endTotal = window.endHour * 60 + window.endMinute;

  for (let t = startTotal; t < endTotal; t += stepMinutes) {
    const hh = Math.floor(t / 60);
    const mm = t % 60;
    slots.push(to12h(hh, mm));
  }

  return { closed: false, slots };
}

function ScheduleCallPicker({
  value,
  onChange,
}: {
  value: ScheduleState;
  onChange: (next: ScheduleState) => void;
}) {
  const { closed, slots } = useMemo(
    () => buildTimeSlots(value.date, 30),
    [value.date]
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <CalendarDays size={18} />
            Schedule a Call
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Pick a date, then choose a time from the scroll list.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-foreground select-none">
          <input
            type="checkbox"
            checked={value.enabled}
            onChange={(e) =>
              onChange({
                ...value,
                enabled: e.target.checked,
                // reset when toggling off
                date: e.target.checked ? value.date : "",
                time: e.target.checked ? value.time : "",
              })
            }
            className="h-4 w-4"
          />
          Enable
        </label>
      </div>

      {value.enabled && (
        <div className="mt-4 space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Date
            </label>
            <Input
              type="date"
              value={value.date}
              onChange={(e) =>
                onChange({
                  ...value,
                  date: e.target.value,
                  time: "", // reset time when date changes
                })
              }
              className="h-12"
              required
            />
            {!!value.date && closed && (
              <p className="mt-2 text-sm text-red-500">
                We’re closed on Sunday. Please pick another date.
              </p>
            )}
          </div>

          {/* Time Scrollbar */}
          {!!value.date && !closed && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Time
              </label>

              <div className="rounded-xl border border-border bg-background p-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-2 pb-2">
                  <Clock size={14} />
                  <span>Scroll and click a time slot</span>
                </div>

                <div className="max-h-44 overflow-y-auto pr-1">
                  <div className="grid gap-2">
                    {slots.map((t) => {
                      const active = value.time === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => onChange({ ...value, time: t })}
                          className={[
                            "w-full text-left rounded-lg px-3 py-2 text-sm border transition",
                            active
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:bg-muted/40",
                          ].join(" ")}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {!value.time && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Please select a time slot.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [schedule, setSchedule] = useState<ScheduleState>({
    enabled: false,
    date: "",
    time: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const scheduleValid =
    !schedule.enabled || (schedule.enabled && schedule.date && schedule.time);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scheduleValid) {
      toast({
        title: "Please complete the schedule",
        description: "Select a date and a time slot.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const finalMessage =
        schedule.enabled && schedule.date && schedule.time
          ? `${formData.message}\n\n---\nScheduled Call:\nDate: ${schedule.date}\nTime: ${schedule.time}\nTimezone: Asia/Dhaka`
          : formData.message;

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name, // must match template variable
          from_email: formData.email,
          message: finalMessage,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent successfully!",
        description: "We’ll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", message: "" });
      setSchedule({ enabled: false, date: "", time: "" });
    } catch (error: any) {
      console.error("SEND FAILED:", error);
      toast({
        title: "Failed to send message",
        description: error?.text || error?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can help bring your
              vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <a
                      href="mailto:info@vertexias.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@vertexias.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <a
                      href="tel:+8801405098447"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +880 1405-098447
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-10 p-6 rounded-2xl bg-background border border-border">
                <h4 className="font-semibold text-foreground mb-4">
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background rounded-2xl p-8 shadow-card border border-border">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="resize-none"
                  />
                </div>

                {/* ✅ Schedule Call Component */}
                <ScheduleCallPicker value={schedule} onChange={setSchedule} />

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};