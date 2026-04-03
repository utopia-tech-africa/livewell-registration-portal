import { Registration } from "@/types";

interface MetricsCardsProps {
  registrations: Registration[];
}

export default function MetricsCards({ registrations }: MetricsCardsProps) {
  const totalRegistrations = registrations.length;
  const usersWithEmail = registrations.filter((r) => !!r.email).length;
  const usersWithoutEmail = totalRegistrations - usersWithEmail;

  const cards = [
    {
      label: "Total Registrations",
      value: totalRegistrations,
      color: "bg-primary-700 text-white border-primary-200",
    },
    {
      label: "Users with Email",
      value: usersWithEmail,
      color: "bg-primary-600 text-white border-secondary-200",
    },
    {
      label: "Users without Email",
      value: usersWithoutEmail,
      color: "bg-primary-500 text-white border-primary-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md ${card.color}`}
        >
          <p className="text-sm font-medium uppercase tracking-wider opacity-80 mb-2">
            {card.label}
          </p>
          <p className="text-4xl font-black">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
