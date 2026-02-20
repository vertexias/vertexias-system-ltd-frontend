import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
// import { Footer } from "./Footer";

const GetAQuote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectDetails: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quote Request Submitted:", formData);
    alert("Thank you! Your quote request has been submitted.");
    setFormData({ name: "", email: "", company: "", projectDetails: "" });
  };

  return (
    <>
      <Navbar />

      {/* Page */}
      <div className="relative min-h-screen bg-[#0a0f25] text-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-10 mt-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Get a tailored estimate within 24–48 hours
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Let’s build your next{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                digital product
              </span>
            </h1>

            <p className="mt-4 text-white/70 leading-relaxed">
              Share a few details and we’ll respond with a clear plan, timeline,
              and cost estimate. No spam — just a real conversation.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            {/* Left info card */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <h3 className="text-lg font-semibold">What happens next?</h3>
              <ul className="mt-4 space-y-3 text-white/70 text-sm leading-relaxed">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
                  We review your requirements and ask any missing questions.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                  We send a proposal with scope, timeline, and pricing.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                  If you approve, we start with milestones and weekly updates.
                </li>
              </ul>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm text-white/70">
                  Prefer email only? Just submit the form — we’ll keep it simple.
                </p>
              </div>
            </div>

            {/* Form card */}
            <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#11172f]/80 backdrop-blur p-6 sm:p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm text-white/70">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl bg-[#0f1430] px-4 py-3 text-white border border-white/10
                                 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-blue-500/60"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm text-white/70">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl bg-[#0f1430] px-4 py-3 text-white border border-white/10
                                 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-blue-500/60"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="text-sm text-white/70">Company (optional)</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Vertexias System Ltd"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl bg-[#0f1430] px-4 py-3 text-white border border-white/10
                               placeholder:text-white/40 outline-none focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="text-sm text-white/70">Project details</label>
                  <textarea
                    name="projectDetails"
                    placeholder="Tell us what you want to build, features, deadline, budget range, tech preference, etc."
                    value={formData.projectDetails}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-2 w-full rounded-xl bg-[#0f1430] px-4 py-3 text-white border border-white/10
                               placeholder:text-white/40 outline-none focus:ring-2 focus:ring-blue-500/60 resize-none"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                  <p className="text-xs text-white/50">
                    By submitting, you agree to be contacted about this request.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold
                               bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600
                               transition-colors"
                  >
                    Submit Request
                    <span className="text-white/90">→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default GetAQuote;