import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function CompanyDetailLoading() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="icon" disabled>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="h-8 w-64 bg-muted animate-pulse rounded-md"></div>
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="h-7 w-48 bg-muted animate-pulse rounded-md"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-24 bg-muted animate-pulse rounded-md"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-20 bg-muted animate-pulse rounded-md"></div>
                    <div className="h-20 bg-muted animate-pulse rounded-md"></div>
                    <div className="h-20 bg-muted animate-pulse rounded-md"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

