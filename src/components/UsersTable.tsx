"use client";

import { useState } from "react";
import { Registration } from "@/types";

interface UsersTableProps {
  registrations: Registration[];
  onEdit: (registration: Registration) => void;
}

export default function UsersTable({ registrations, onEdit }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRegistrations = registrations.filter(
    (registration) =>
      registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.phone.includes(searchTerm),
  );

  const downloadCSV = () => {
    const headers = ["Name", "Phone", "Email", "Date Registered"];
    const rows = filteredRegistrations.map((r) => [
      r.name,
      r.phone,
      r.email || "N/A",
      new Date(r.createdAt).toLocaleString("en-GB"),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `livewell_registrations_${new Date().toISOString()}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100 p-8 transition-all hover:shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h3 className="text-xl font-bold text-neutral-900 border-l-4 border-primary-500 pl-4">
          Recently Registered Users
        </h3>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <button
            onClick={downloadCSV}
            className="px-4 py-2 cursor-pointer text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 active:scale-95 transition-all shadow-md active:shadow-sm"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/50">
              <th className="px-6 py-4 text-sm font-bold text-neutral-800  tracking-wider">
                Attendee Name
              </th>
              <th className="px-6 py-4 text-sm font-bold text-neutral-800  tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-4 text-sm font-bold text-neutral-800  tracking-wider">
                Email Address
              </th>
              <th className="px-6 py-4 text-sm font-bold text-neutral-800  tracking-wider">
                Date Registered
              </th>
              <th className="px-6 py-4 text-sm font-bold text-neutral-800  tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-neutral-600 font-medium"
                >
                  No registrations found matching your search.
                </td>
              </tr>
            ) : (
              filteredRegistrations.map((registration) => (
                <tr
                  key={registration.id}
                  className="hover:bg-neutral-50/50 transition-colors group cursor-default"
                >
                  <td className="px-6 py-2">
                    <p className="font-bold text-sm text-neutral-700 group-hover:text-primary-600 transition-colors">
                      {registration.name}
                    </p>
                  </td>
                  <td className="px-6 py-2 text-neutral-800 font-mono text-sm">
                    {registration.phone}
                  </td>
                  <td className="px-6 py-2">
                    {registration.email ? (
                      <span className="text-neutral-800 text-sm">
                        {registration.email}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-medium">
                        Not provided
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-2 text-neutral-800 text-sm whitespace-nowrap">
                    {new Date(registration.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-2 text-right">
                    <button
                      onClick={() => onEdit(registration)}
                      className="px-3 py-1.5 text-xs font-bold cursor-pointer text-primary-600 hover:text-white border border-primary-200 hover:bg-primary-600 rounded-md transition-all active:scale-95"
                    >
                      Edit Info
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
