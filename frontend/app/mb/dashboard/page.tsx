import BottomNavigation from "@/components/bottom-navigation";
import ImpactDashboard from "@/components/impact-dashboard";
import LoadingSpinner from "@/components/loading-spinner";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="w-full max-w-md mx-auto pb-16">
        <div className="sticky top-0 z-10 bg-white p-4 border-b">
          <h1 className="text-xl font-bold">Impact Dashboard</h1>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <ImpactDashboard />
        </Suspense>
      </div>
      <BottomNavigation activeTab="dashboard" />
    </main>
  );
}
