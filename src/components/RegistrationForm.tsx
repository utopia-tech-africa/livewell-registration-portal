"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      // Basic phone validation (allowing digits, +, spaces, hyphens)
      const phoneRegex = /^[\d\s+\-()]{8,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Enter a valid phone number";
      }
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) {
      setStatus({ type: "error", message: "Check fields for errors" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Admission granted. Registered successfully!",
        });
        setFormData({ name: "", phone: "", email: "" });
        setErrors({});

        // Auto-reset and focus back after 4 seconds
        setTimeout(() => {
          setStatus(null);
          nameInputRef.current?.focus();
        }, 4000);
      } else {
        const data = await res.json();
        setStatus({
          type: "error",
          message: data.error || "System error. Please try again.",
        });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network connectivity issue." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100 transition-all-custom">
      <div className="p-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.webp"
            alt="Livewell Logo"
            width={120}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-neutral-900 mb-2">
          Event Registration
        </h2>
        <p className="text-center text-neutral-500 mb-8">
          Please enter attendee details below
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-1 transition-colors ${
                errors.name ? "text-red-500" : "text-neutral-700"
              }`}
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={`w-full px-4 py-4 rounded-xl border transition-all text-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 ring-red-500/10 animate-shake"
                  : "border-neutral-200 focus:ring-primary-500 focus:border-transparent"
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className={`block text-sm font-medium mb-1 transition-colors ${
                errors.phone ? "text-red-500" : "text-neutral-700"
              }`}
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +233 24 000 0000"
              className={`w-full px-4 py-4 rounded-xl border transition-all text-lg focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 ring-red-500/10 animate-shake"
                  : "border-neutral-200 focus:ring-primary-500 focus:border-transparent"
              }`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 transition-colors ${
                errors.email ? "text-red-500" : "text-neutral-700"
              }`}
            >
              Email Address{" "}
              <span className="text-neutral-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              className={`w-full px-4 py-4 rounded-xl border transition-all text-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 ring-red-500/10 animate-shake"
                  : "border-neutral-200 focus:ring-primary-500 focus:border-transparent"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
                {errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-lg font-bold text-white rounded-xl shadow-lg transition-all-custom cursor-pointer ${
              loading
                ? "bg-neutral-400 cursor-not-allowed"
                : "bg-primary-600 hover:bg-primary-700 active:scale-[0.98] active:shadow-md"
            }`}
          >
            {loading ? "Registering..." : "Submit Registration"}
          </button>
        </form>

        {status && (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              status.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
