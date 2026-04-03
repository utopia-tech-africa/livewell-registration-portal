"use client";

import { useEffect, useState } from "react";
import { Registration } from "@/types";
import MetricsCards from "@/components/MetricsCards";
import UsersTable from "@/components/UsersTable";
import EditUserModal from "@/components/EditUserModal";
import Image from "next/image";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRegistration, setEditingRegistration] =
    useState<Registration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRegistrations = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/registrations");
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleEdit = (registration: Registration) => {
    setEditingRegistration(registration);
    setIsModalOpen(true);
  };

  const handleUpdate = (updated: Registration) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r)),
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin shadow-xl"></div>
          <p className="text-xl font-black text-neutral-900 tracking-tighter uppercase opacity-30 animate-pulse">
            Loading Registrations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-200/30 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white px-8 py-6 rounded-2xl shadow-sm border border-neutral-200/60">
          {/* Left */}
          <div className="flex items-center gap-5">
            <div className="p-2 bg-neutral-100 rounded-xl">
              <Image
                src="/logo.webp"
                alt="Livewell Logo"
                width={50}
                height={28}
                className="object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">
                Livewell <span className="text-primary-600">Admin</span>
              </h1>
              <p className="text-xs text-neutral-400 uppercase tracking-wider flex items-center gap-2 mt-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isRefreshing ? "bg-amber-500 animate-pulse" : "bg-green-500"
                  }`}
                ></span>
                {isRefreshing ? "Refreshing..." : "Dashboard"}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={fetchRegistrations}
              disabled={isRefreshing}
              className="flex-1 cursor-pointer md:flex-none px-5 py-2.5 text-sm font-bold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-100 transition-all-custom flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>

            <a
              href="/"
              className="flex-1 md:flex-none px-5 py-2.5 text-sm font-medium text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all-custom text-center"
            >
              Register
            </a>
          </div>
        </div>

        {/* Metrics */}
        <MetricsCards registrations={registrations} />

        {/* Table */}
        <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden">
          <UsersTable registrations={registrations} onEdit={handleEdit} />
        </div>
      </div>

      {/* Modal */}
      {editingRegistration && (
        <EditUserModal
          registration={editingRegistration}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
}
