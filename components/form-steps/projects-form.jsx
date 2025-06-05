"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Plus, Trash2, ExternalLink, Edit } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProjectsForm({ data, updateData }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  })
  const [errors, setErrors] = useState({})

  const resetForm = () => {
    setCurrentProject({
      title: "",
      description: "",
      link: "",
      image: null,
    })
    setErrors({})
  }

  const startAddingProject = () => {
    resetForm()
    setIsAdding(true)
    setEditingIndex(null)
  }

  const startEditingProject = (index) => {
    setCurrentProject({ ...data[index] })
    setIsAdding(true)
    setEditingIndex(index)
  }

  const cancelEditing = () => {
    setIsAdding(false)
    resetForm()
  }

  const validateForm = () => {
    const newErrors = {}

    if (!currentProject.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!currentProject.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (currentProject.link && !isValidUrl(currentProject.link)) {
      newErrors.link = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url) => {
    if (!url) return true // Allow empty URLs
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const saveProject = () => {
    if (!validateForm()) return

    if (editingIndex !== null) {
      // Update existing project
      const updatedProjects = [...data]
      updatedProjects[editingIndex] = currentProject
      updateData(updatedProjects)
    } else {
      // Add new project
      updateData([...data, currentProject])
    }

    setIsAdding(false)
    resetForm()
  }

  const deleteProject = (index) => {
    const updatedProjects = [...data]
    updatedProjects.splice(index, 1)
    updateData(updatedProjects)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size
      if (file.size > 1024 * 1024 * 2) {
        // 2MB limit
        alert("Image is too large. Please select an image under 2MB.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height

          // Calculate new dimensions (max 1200px)
          const maxDimension = 1200
          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }

          // Resize image
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0, width, height)

          // Get compressed image as data URL (JPEG at 80% quality)
          const compressedImageData = canvas.toDataURL("image/jpeg", 0.8)

          setCurrentProject({
            ...currentProject,
            image: compressedImageData,
          })
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <Button onClick={startAddingProject} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      ) : (
        <Card className="border-primary/50">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title</Label>
              <Input
                id="projectTitle"
                value={currentProject.title}
                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                placeholder="My Awesome Project"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Description</Label>
              <Textarea
                id="projectDescription"
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                placeholder="Describe your project..."
                rows={3}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectLink">Project Link (Optional)</Label>
              <Input
                id="projectLink"
                value={currentProject.link}
                onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                placeholder="https://myproject.com"
                className={errors.link ? "border-destructive" : ""}
              />
              {errors.link && <p className="text-sm text-destructive">{errors.link}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectImage">Project Image (Optional)</Label>
              <div className="flex items-center gap-4">
                {currentProject.image && (
                  <div className="w-16 h-16 rounded overflow-hidden border border-border">
                    <img
                      src={currentProject.image || "/placeholder.svg"}
                      alt="Project preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Input id="projectImage" type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="ghost" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button onClick={saveProject}>{editingIndex !== null ? "Update Project" : "Add Project"}</Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4 mt-6">
        <h3 className="font-medium">Your Projects</h3>

        {data.length === 0 && !isAdding ? (
          <p className="text-sm text-muted-foreground">No projects added yet</p>
        ) : (
          <AnimatePresence>
            {data.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    {project.image && (
                      <div className="w-full sm:w-32 h-32 bg-muted">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{project.title}</h4>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => startEditingProject(index)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProject(index)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary flex items-center gap-1 mt-2"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
