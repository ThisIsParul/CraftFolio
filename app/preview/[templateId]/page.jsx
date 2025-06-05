"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateHTML } from "@/lib/html-generator"
import { getDummyData } from "@/lib/dummy-data"
import NovaSparkTemplate from "@/components/templates/nova-spark-template"
import BloomCraftTemplate from "@/components/templates/bloom-craft-template"
import MonoGridTemplate from "@/components/templates/mono-grid-template"
import GradientFlowTemplate from "@/components/templates/gradient-flow-template"
import TechAuraTemplate from "@/components/templates/tech-aura-template"

export default function Preview({ params }) {
  const { templateId } = React.use(params)
  const searchParams = useSearchParams()
  const useDummyData = searchParams.get("dummy") === "true"
  const { toast } = useToast()
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (useDummyData) {
      // Use dummy data for preview
      setPortfolioData({ ...getDummyData(), template: templateId })
      setLoading(false)
    } else {
      // Load user data from localStorage
      const savedData = localStorage.getItem("portfolioData")
      if (savedData) {
        const userData = JSON.parse(savedData)
        setPortfolioData({ ...userData, template: templateId })
      }
      setLoading(false)
    }
  }, [templateId, useDummyData])

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

    switch (templateId) {
      case "nova-spark":
        return <NovaSparkTemplate data={portfolioData} />
      case "bloom-craft":
        return <BloomCraftTemplate data={portfolioData} />
      case "mono-grid":
        return <MonoGridTemplate data={portfolioData} />
      case "gradient-flow":
        return <GradientFlowTemplate data={portfolioData} />
      case "tech-aura":
        return <TechAuraTemplate data={portfolioData} />
      default:
        return <NovaSparkTemplate data={portfolioData} />
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
            You haven't created a portfolio yet. Start by filling out your information.
          </p>
          <Button asChild>
            <Link href="/form">Get Started</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href={useDummyData ? "/templates" : "/preview-templates"} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to {useDummyData ? "Templates" : "Template Selection"}
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            {!useDummyData && (
              <>
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/form">
                    <Edit className="h-4 w-4" />
                    Edit Portfolio
                  </Link>
                </Button>
                <Button onClick={downloadHTML} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download HTML
                </Button>
              </>
            )}
            {useDummyData && (
              <Button asChild>
                <Link href="/form">Create Your Portfolio</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1">{renderTemplate()}</div>
    </div>
  )
}
