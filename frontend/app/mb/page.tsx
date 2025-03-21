import BottomNavigation from "@/components/bottom-navigation";
import HomeScreen from "@/components/home-screen";
import LoadingSpinner from "@/components/loading-spinner";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-auto pb-16">
        <Suspense fallback={<LoadingSpinner />}>
          <HomeScreen />
        </Suspense>
      </div>
      <BottomNavigation activeTab="home" />
    </main>
  );
}
