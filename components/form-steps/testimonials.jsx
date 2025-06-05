"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Plus, Trash2, Edit, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TestimonialsForm({ data, updateData }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [currentTestimonial, setCurrentTestimonial] = useState({
    name: "",
    position: "",
    text: "",
    image: null,
  })
  const [errors, setErrors] = useState({})

  const resetForm = () => {
    setCurrentTestimonial({
      name: "",
      position: "",
      text: "",
      image: null,
    })
    setErrors({})
  }

  const startAddingTestimonial = () => {
    resetForm()
    setIsAdding(true)
    setEditingIndex(null)
  }

  const startEditingTestimonial = (index) => {
    setCurrentTestimonial({ ...data[index] })
    setIsAdding(true)
    setEditingIndex(index)
  }

  const cancelEditing = () => {
    setIsAdding(false)
    resetForm()
  }

  const validateForm = () => {
    const newErrors = {}

    if (!currentTestimonial.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!currentTestimonial.position.trim()) {
      newErrors.position = "Position is required"
    }

    if (!currentTestimonial.text.trim()) {
      newErrors.text = "Testimonial text is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveTestimonial = () => {
    if (!validateForm()) return

    if (editingIndex !== null) {
      // Update existing testimonial
      const updatedTestimonials = [...data]
      updatedTestimonials[editingIndex] = currentTestimonial
      updateData(updatedTestimonials)
    } else {
      // Add new testimonial
      updateData([...data, currentTestimonial])
    }

    setIsAdding(false)
    resetForm()
  }

  const deleteTestimonial = (index) => {
    const updatedTestimonials = [...data]
    updatedTestimonials.splice(index, 1)
    updateData(updatedTestimonials)
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

          // Calculate new dimensions (max 400px for testimonial images)
          const maxDimension = 400
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

          setCurrentTestimonial({
            ...currentTestimonial,
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
        <Button onClick={startAddingTestimonial} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add New Testimonial
        </Button>
      ) : (
        <Card className="border-primary/50">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testimonialName">Name</Label>
              <Input
                id="testimonialName"
                value={currentTestimonial.name}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                placeholder="John Smith"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonialPosition">Position / Company</Label>
              <Input
                id="testimonialPosition"
                value={currentTestimonial.position}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, position: e.target.value })}
                placeholder="CEO at Company Inc."
                className={errors.position ? "border-destructive" : ""}
              />
              {errors.position && <p className="text-sm text-destructive">{errors.position}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonialText">Testimonial</Label>
              <Textarea
                id="testimonialText"
                value={currentTestimonial.text}
                onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, text: e.target.value })}
                placeholder="What they said about you or your work..."
                rows={4}
                className={errors.text ? "border-destructive" : ""}
              />
              {errors.text && <p className="text-sm text-destructive">{errors.text}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonialImage">Person's Image (Optional)</Label>
              <div className="flex items-center gap-4">
                {currentTestimonial.image && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-border">
                    <img
                      src={currentTestimonial.image || "/placeholder.svg"}
                      alt="Testimonial person"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Input id="testimonialImage" type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="ghost" onClick={cancelEditing}>
              Cancel
            </Button>
            <Button onClick={saveTestimonial}>
              {editingIndex !== null ? "Update Testimonial" : "Add Testimonial"}
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4 mt-6">
        <h3 className="font-medium">Your Testimonials</h3>

        {data.length === 0 && !isAdding ? (
          <p className="text-sm text-muted-foreground">No testimonials added yet</p>
        ) : (
          <AnimatePresence>
            {data.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      {testimonial.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Quote className="h-6 w-6 text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => startEditingTestimonial(index)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteTestimonial(index)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm mt-2">"{testimonial.text}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
