import { AboutUsSection } from "@/ui/home/aboutUsSection";
import { MissionSection } from "@/ui/home/missionSection";
import { ProductSection } from "@/ui/home/productSection";
import { WelcomeSection } from "@/ui/home/welcomeSection";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-4 mx-auto w-full items-center justify-center">
      <WelcomeSection />

      <AboutUsSection />

      <MissionSection />

      <ProductSection />
    </main>
  );
}
