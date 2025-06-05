"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateHTML } from "@/lib/html-generator"
import MinimalTemplate from "@/components/templates/minimal-template"
import CreativeTemplate from "@/components/templates/creative-template"
import ProfessionalTemplate from "@/components/templates/professional-template"
import ModernTemplate from "@/components/templates/modern-template"
import DarkTemplate from "@/components/templates/dark-template"

export default function Preview() {
  const { toast } = useToast()
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem("portfolioData")
    if (savedData) {
      setPortfolioData(JSON.parse(savedData))
    }
    setLoading(false)
  }, [])

  const downloadHTML = async () => {
    try {
      const html = await generateHTML(portfolioData)

      // Create a blob with the HTML content
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Create a temporary link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = `${portfolioData.personalInfo.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.html`
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Portfolio downloaded!",
        description: "Your HTML file is ready to be deployed anywhere.",
      })
    } catch (error) {
      console.error("Error generating HTML:", error)
      toast({
        title: "Error downloading portfolio",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderTemplate = () => {
    if (!portfolioData) return null

    switch (portfolioData.template) {
      case "minimal":
        return <MinimalTemplate data={portfolioData} />
      case "creative":
        return <CreativeTemplate data={portfolioData} />
      case "professional":
        return <ProfessionalTemplate data={portfolioData} />
      case "modern":
        return <ModernTemplate data={portfolioData} />
      case "dark":
        return <DarkTemplate data={portfolioData} />
      default:
        return <MinimalTemplate data={portfolioData} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <h1 className="text-2xl font-bold mb-4">No Portfolio Data Found</h1>
          <p className="text-muted-foreground mb-6">
            You haven't created a portfolio yet. Start by selecting a template and filling out your information.
          </p>
          <Button asChild>
            <Link href="/templates">Get Started</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href={`/form/${portfolioData.template}`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Edit
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="gap-2">
              <Link href={`/form/${portfolioData.template}`}>
                <Edit className="h-4 w-4" />
                Edit Portfolio
              </Link>
            </Button>
            <Button onClick={downloadHTML} className="gap-2">
              <Download className="h-4 w-4" />
              Download HTML
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-muted">
        <div className="container mx-auto p-4">
          <div className="bg-background rounded-lg shadow-lg overflow-hidden">{renderTemplate()}</div>
        </div>
      </div>
    </div>
  )
}
