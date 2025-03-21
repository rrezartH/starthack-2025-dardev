import { Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"
import AIAssistant from "@/components/ai-assistant"
import LoadingSpinner from "@/components/loading-spinner"

export default function AssistantPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="w-full max-w-md mx-auto pb-16">
        <div className="sticky top-0 z-10 bg-white p-4 border-b flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-virgin-red" />
          </Link>
          <h1 className="text-xl font-bold">Sustainability Assistant</h1>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <AIAssistant />
        </Suspense>
      </div>
      <BottomNavigation activeTab="home" />
    </main>
  )
}

