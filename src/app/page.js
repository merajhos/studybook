import AvailableRooms from "@/components/home/AvailableRooms";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyStudyNook from "@/components/home/WhyStudyNook";

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Why Choose StudyNook Section */}
      <WhyStudyNook />

      {/* 3. How It Works Section */}
      <HowItWorks />

      {/* 4. Available / Featured Rooms Section */}
      <AvailableRooms />
    </main>
  );
}