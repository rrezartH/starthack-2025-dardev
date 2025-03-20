import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-xl font-semibold mb-4">Idea Not Found</h2>
      <p className="text-muted-foreground mb-6">The idea you're looking for doesn't exist or has been removed.</p>
      <Button asChild>
        <Link href="/ideas" className="flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Ideas
        </Link>
      </Button>
    </div>
  )
}

