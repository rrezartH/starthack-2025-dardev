import { Suspense } from "react"
import BottomNavigation from "@/components/bottom-navigation"
import UserProfile from "@/components/user-profile"
import LoadingSpinner from "@/components/loading-spinner"

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="w-full max-w-md mx-auto pb-16">
        <div className="sticky top-0 z-10 bg-white p-4 border-b">
          <h1 className="text-xl font-bold">Your Profile</h1>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <UserProfile />
        </Suspense>
      </div>
      <BottomNavigation activeTab="profile" />
    </main>
  )
}

