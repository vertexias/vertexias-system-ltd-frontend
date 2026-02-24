import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

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
      <div className="relative w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 dark:bg-blue-400/20 blur-3xl" />
          <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-indigo-500/10 dark:bg-indigo-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-sky-400/10 dark:bg-sky-400/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-12">

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Let’s build your next{" "}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                digital product
              </span>
            </h1>

            <p className="mt-4 text-gray-700 dark:text-gray-300/70 leading-relaxed">
              Share a few details and we’ll respond with a clear plan, timeline,
              and cost estimate. No spam — just a real conversation.
            </p>
          </div>

          {/* Content: left + right */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left info card */}
            <div className="lg:w-2/5 rounded-2xl border border-gray-300/10 dark:border-gray-100/10 bg-gray-100/5 dark:bg-gray-800/20 p-6 sm:p-7 transition-colors duration-300 lg:sticky lg:top-20 self-start">
              <h3 className="text-lg font-semibold">What happens next?</h3>
              <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
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

              <div className="mt-6 rounded-xl border border-gray-300/10 dark:border-gray-100/10 bg-gray-200/5 dark:bg-gray-800/20 p-4 transition-colors duration-300">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Prefer email only? Just submit the form — we’ll keep it simple.
                </p>
              </div>
            </div>

            {/* Right form card */}
            <div
              className="lg:w-3/5 rounded-2xl border border-gray-300/10 dark:border-gray-100/10
                         bg-white/90 dark:bg-gray-800/90
                         md:bg-white/20 md:dark:bg-gray-800/80
                         md:backdrop-blur
                         p-6 sm:p-8 shadow-xl transition-colors duration-300"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl bg-gray-100/5 dark:bg-gray-900/40 px-4 py-3 text-gray-900 dark:text-gray-100 border border-gray-300/10 dark:border-gray-100/10
                                 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/60 transition-colors duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-xl bg-gray-100/5 dark:bg-gray-900/40 px-4 py-3 text-gray-900 dark:text-gray-100 border border-gray-300/10 dark:border-gray-100/10
                                 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/60 transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Company (optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Vertexias System Solutions"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl bg-gray-100/5 dark:bg-gray-900/40 px-4 py-3 text-gray-900 dark:text-gray-100 border border-gray-300/10 dark:border-gray-100/10
                               placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/60 transition-colors duration-300"
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Project details
                  </label>
                  <textarea
                    name="projectDetails"
                    placeholder="Tell us what you want to build, features, deadline, budget range, tech preference, etc."
                    value={formData.projectDetails}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-2 w-full rounded-xl bg-gray-100/5 dark:bg-gray-900/40 px-4 py-3 text-gray-900 dark:text-gray-100 border border-gray-300/10 dark:border-gray-100/10
                               placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/60 resize-none transition-colors duration-300"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
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