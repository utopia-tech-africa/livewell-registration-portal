import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";
import Image from "next/image";
// Assets copied from main project
import bluePattern from "@/assets/img/blue-pattern.webp";
import whitePattern from "@/assets/img/white-pattern.png";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 flex items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Real Assets from Livewell Project */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Image src={whitePattern} alt="pattern" fill className="object-cover" />
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full z-0 opacity-80  pointer-events-none">
        <Image
          src={bluePattern}
          alt="blue pattern"
          className="object-contain object-right-top w-full h-full"
        />
      </div>

      <div className="absolute top-8 right-8 z-20">
        <Link
          href="/dashboard"
          className="px-6 py-2.5 bg-white/80 backdrop-blur-md border border-neutral-200 text-neutral-800 rounded-xl font-bold text-sm shadow-sm hover:shadow-md hover:bg-neutral-50 transition-all cursor-pointer flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          ADMIN DASHBOARD
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl w-full items-center relative z-10 bg-white/50">
        <div className="hidden md:block space-y-8 animate-in slide-in-from-left duration-700">
          <div className="inline-block px-4 py-1.5 bg-secondary-100 text-secondary-500 rounded-full text-xs font-black  tracking-widest border border-secondary-500/20">
            Powered by Utopia Technologies
          </div>
          <h1 className="text-6xl font-black text-neutral-1000 leading-[1.1]">
            Livewell{" "}
            <span className="text-primary-600 underline decoration-4 decoration-primary-500/20">
              Registration
            </span>{" "}
            Portal
          </h1>
          <p className="text-xl text-neutral-500 max-w-md leading-relaxed font-medium">
            Fast, secure, and touch-friendly system designed for onsite staff to
            register attendees instantly.
          </p>
          <div className="flex gap-12 pt-8">
            <div>
              <p className="text-3xl font-black text-neutral-900 mb-1">Quick</p>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                Registration
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-neutral-900 mb-1">Auto</p>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                Synchronization
              </p>
            </div>
          </div>
        </div>

        <div className="animate-in slide-in-from-right duration-700">
          <RegistrationForm />
        </div>
      </div>

      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-500  text-xs font-black uppercase tracking-widest hidden lg:block opacity-80 hover:opacity-100 transition-opacity bg-wh">
        © 2026 <span className="text-secondary-500 ">Utopia Technologies</span>{" "}
        for Livewell • Event Solutions
      </footer>
    </main>
  );
}
