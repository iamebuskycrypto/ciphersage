import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { GameSection } from "@/components/GameSection";
import { OnChainStats } from "@/components/OnChainStats";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen" style={{ background: '#0A0B14' }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <GameSection />
      <OnChainStats />
      <Footer />
    </main>
  );
}
