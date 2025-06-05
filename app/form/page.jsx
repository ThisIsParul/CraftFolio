"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Save, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import PersonalInfoForm from "@/components/form-steps/personal-info"
import SkillsForm from "@/components/form-steps/skills-form"
import ProjectsForm from "@/components/form-steps/projects-form"
import SocialLinksForm from "@/components/form-steps/social-links-form"

export default function MultiStepForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(() => {
    // Try to load from localStorage
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("portfolioData")
      if (savedData) {
        return JSON.parse(savedData)
      }
    }

    return {
      personalInfo: {
        name: "",
        title: "",
        bio: "",
        profileImage: null,
      },
      skills: [],
      projects: [],
      socialLinks: {
        github: "",
        linkedin: "",
        twitter: "",
        website: "",
      },
    }
  })

  const steps = [
    {
      id: "personal",
      title: "Personal Information",
      component: (
        <PersonalInfoForm data={formData.personalInfo} updateData={(data) => updateFormData("personalInfo", data)} />
      ),
    },
    {
      id: "skills",
      title: "Skills",
      component: <SkillsForm data={formData.skills} updateData={(data) => updateFormData("skills", data)} />,
    },
    {
      id: "projects",
      title: "Projects",
      component: <ProjectsForm data={formData.projects} updateData={(data) => updateFormData("projects", data)} />,
    },
    {
      id: "social",
      title: "Social Links",
      component: (
        <SocialLinksForm data={formData.socialLinks} updateData={(data) => updateFormData("socialLinks", data)} />
      ),
    },
    
  ]

  // Add this function after the component declaration
  const checkStorageSize = (data) => {
    try {
      const serializedData = JSON.stringify(data)
      const sizeInKB = serializedData.length / 1024

      // If data is getting large, show a warning
      if (sizeInKB > 4000) {
        // 4MB warning threshold
        toast({
          title: "Storage warning",
          description: "Your portfolio data is getting large. Consider using smaller images.",
          variant: "destructive",
        })
      }

      return serializedData
    } catch (error) {
      console.error("Error serializing data:", error)
      toast({
        title: "Error saving data",
        description: "Could not save your data. Try using smaller images or fewer items.",
        variant: "destructive",
      })
      return null
    }
  }

  // Update the useEffect that saves to localStorage
  useEffect(() => {
    try {
      const serializedData = checkStorageSize(formData)
      if (serializedData) {
        localStorage.setItem("portfolioData", serializedData)
      }
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      toast({
        title: "Storage limit reached",
        description: "Could not save your data. Try using smaller images or fewer items.",
        variant: "destructive",
      })
    }
  }, [formData])

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Form is complete, navigate to preview templates
      router.push("/preview-templates")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveProgress = () => {
    try {
      const serializedData = checkStorageSize(formData)
      if (serializedData) {
        localStorage.setItem("portfolioData", serializedData)
        toast({
          title: "Progress saved",
          description: "Your portfolio data has been saved to your browser.",
        })
      }
    } catch (error) {
      toast({
        title: "Storage limit reached",
        description: "Could not save your data. Try using smaller images or fewer items.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={saveProgress} className="gap-2">
              <Save className="h-4 w-4" />
              Save Progress
            </Button>
            {currentStep === steps.length - 1 && (
              <Button variant="outline" asChild className="gap-2">
                <Link href="/preview-templates">
                  <Eye className="h-4 w-4" />
                  Preview Templates
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Create Your Portfolio</h1>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <p className="text-muted-foreground">
                Complete the form below to create your portfolio. You'll be able to preview all templates with your
                data.
              </p>
              <div className="flex items-center gap-2">
                {steps.map((step, index) => (
                  <Button
                    key={step.id}
                    variant={currentStep === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentStep(index)}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">{steps[currentStep].title}</h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep].component}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button onClick={nextStep} className="gap-2">
                {currentStep === steps.length - 1 ? "View Templates" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
