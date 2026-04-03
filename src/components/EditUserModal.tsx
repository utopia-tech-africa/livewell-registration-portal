"use client";

import { useState, useEffect } from "react";
import { Registration } from "@/types";

interface EditUserModalProps {
  registration: Registration | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: Registration) => void;
}

export default function EditUserModal({
  registration,
  isOpen,
  onClose,
  onUpdate,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (registration) {
      setFormData({
        name: registration.name,
        phone: registration.phone,
        email: registration.email || "",
      });
      setStatus(null);
    }
  }, [registration]);

  if (!isOpen || !registration) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`/api/registrations/${registration.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setStatus({ type: "success", message: "Contact updated successfully" });
        setTimeout(() => {
          onUpdate(updated);
          onClose();
        }, 800);
      } else {
        const err = await res.json();
        setStatus({ type: "error", message: err.error || "Failed to update" });
      }
    } catch (error) {
      console.error("Edit error:", error);
      setStatus({ type: "error", message: "Check network connection" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden scale-in animate-in zoom-in-95 duration-200">
        <div className="bg-primary-600 p-6 flex justify-between items-center text-white">
          <h3 className="text-xl font-black">Edit Attendee</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/20 rounded-full transition-colors cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {status && (
            <div
              className={`p-3 rounded-xl text-center text-sm font-bold animate-in zoom-in duration-300 ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {status.message}
            </div>
          )}

          <div>
            <label
              htmlFor="edit-name"
              className="block text-sm font-black  text-neutral-700 mb-2 tracking-wide"
            >
              Full Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-neutral-100 bg-neutral-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-phone"
              className="block text-sm font-black  text-neutral-700 mb-2 tracking-wide"
            >
              Phone Number
            </label>
            <input
              id="edit-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-neutral-100 bg-neutral-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-mono"
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-email"
              className="block text-sm font-black  text-neutral-700 mb-2 tracking-wide"
            >
              Email Address
            </label>
            <input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-neutral-100 bg-neutral-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 cursor-pointer text-sm font-bold text-neutral-500 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 cursor-pointer text-sm font-bold text-white bg-primary-600 rounded-xl shadow-lg hover:bg-primary-700 disabled:bg-neutral-300 transition-all active:scale-95 transition-all-custom"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
