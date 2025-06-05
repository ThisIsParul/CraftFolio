"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Check, Download } from "lucide-react"
import { templates } from "@/lib/templates"

export default function PreviewTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Load user data from localStorage
    const savedData = localStorage.getItem("portfolioData")
    if (savedData) {
      setUserData(JSON.parse(savedData))
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/form" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Form
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-muted-foreground">
            Select a template to preview with your information. You can download your portfolio after selecting a
            template.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {templates.map((template) => (
            <motion.div key={template.id} variants={item}>
              <Card
                className={`overflow-hidden transition-all ${
                  selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardContent className="p-0">
                  <div
                    className="aspect-video relative overflow-hidden"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className={`w-full h-full ${template.previewClass}`}>{template.preview}</div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link href={`/preview/${template.id}`}>Preview</Link>
                    </Button>
                    {selectedTemplate === template.id && (
                      <Button variant="outline" asChild className="gap-2">
                        <Link href={`/download/${template.id}`}>
                          <Download className="h-4 w-4" />
                          Download
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
