

export const dynamic = "force-dynamic"; 

import AvailableRooms from "@/components/home/AvailableRooms";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyStudyNook from "@/components/home/WhyStudyNook";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <HeroSection />
      <WhyStudyNook />
      <HowItWorks />
      <AvailableRooms />
    </main>
  );
}