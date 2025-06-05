"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, Check, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateHTML } from "@/lib/html-generator"

export default function DownloadPage({ params }) {
 const { templateId } = React.use(params)
  const { toast } = useToast()
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloaded, setDownloaded] = useState(false)
  const [fileName, setFileName] = useState("")

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem("portfolioData")
    if (savedData) {
      const userData = JSON.parse(savedData)
      setPortfolioData({ ...userData, template: templateId })
      setFileName(`${userData.personalInfo.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.html`)
    }
    setLoading(false)
  }, [templateId])

  const downloadHTML = async () => {
    try {
      const html = await generateHTML(portfolioData)

      // Create a blob with the HTML content
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Create a temporary link and trigger download
      const a = document.createElement("a")
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()

      // Clean up
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloaded(true)
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/preview-templates" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-6">Download Your Portfolio</h1>

            <div className="mb-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {downloaded ? (
                  <Check className="h-10 w-10 text-primary" />
                ) : (
                  <Download className="h-10 w-10 text-primary" />
                )}
              </div>

              <h2 className="text-xl font-medium mb-2">
                {downloaded ? "Your portfolio is ready!" : "Your portfolio is ready to download"}
              </h2>
              <p className="text-muted-foreground">
                {downloaded
                  ? `You've downloaded ${fileName}. You can now host this file on any web server.`
                  : "Click the button below to download your portfolio as a standalone HTML file."}
              </p>
            </div>

            <div className="space-y-4">
              <Button onClick={downloadHTML} size="lg" className="w-full gap-2">
                <Download className="h-5 w-5" />
                {downloaded ? "Download Again" : "Download HTML File"}
              </Button>

              {downloaded && (
                <div className="space-y-4 mt-8 pt-8 border-t">
                  <h3 className="text-lg font-medium">What's Next?</h3>
                  <p className="text-muted-foreground text-sm">
                    Your portfolio is a standalone HTML file that can be hosted anywhere. Here are some free hosting
                    options:
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="https://pages.github.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <ExternalLink className="h-8 w-8 mb-2 text-primary" />
                      <span className="font-medium">GitHub Pages</span>
                      <span className="text-xs text-muted-foreground">Free hosting by GitHub</span>
                    </a>

                    <a
                      href="https://www.netlify.com/drop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <ExternalLink className="h-8 w-8 mb-2 text-primary" />
                      <span className="font-medium">Netlify Drop</span>
                      <span className="text-xs text-muted-foreground">Drag & drop hosting</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
