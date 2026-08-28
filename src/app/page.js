
import AvailableRooms from "@/components/home/AvailableRooms";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyStudyNook from "@/components/home/WhyStudyNook";
import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-5 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Find Your Ideal <span className="text-cyan-400">Study Space</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Book quiet, equipped, and reliable study rooms in seconds.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/rooms"
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition"
            >
              Explore Rooms
            </Link>
            <Link
              href="/add-room"
              className="border border-slate-700 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Add a Room
            </Link>
          </div>
        </div>
      </section>

      {/* Available Rooms Section */}
      <AvailableRooms />
      <HeroSection></HeroSection>
      <HowItWorks></HowItWorks>
      <WhyStudyNook></WhyStudyNook>

    </main>
  );
}