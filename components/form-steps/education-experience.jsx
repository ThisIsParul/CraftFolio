"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit, GraduationCap, Briefcase } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function EducationExperienceForm({ data, updateData }) {
  const [activeTab, setActiveTab] = useState("education")
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [currentItem, setCurrentItem] = useState({
    education: {
      degree: "",
      institution: "",
      year: "",
      description: "",
    },
    experience: {
      position: "",
      company: "",
      year: "",
      description: "",
    },
  })
  const [errors, setErrors] = useState({})

  const resetForm = () => {
    setCurrentItem({
      education: {
        degree: "",
        institution: "",
        year: "",
        description: "",
      },
      experience: {
        position: "",
        company: "",
        year: "",
        description: "",
      },
    })
    setErrors({})
  }

  const startAdding = () => {
    resetForm()
    setIsAdding(true)
    setEditingIndex(null)
  }

  const startEditing = (index, type) => {
    setActiveTab(type)
    setCurrentItem({
      ...currentItem,
      [type]: { ...data[type][index] },
    })
    setIsAdding(true)
    setEditingIndex(index)
  }

  const cancelEditing = () => {
    setIsAdding(false)
    resetForm()
  }

  const validateForm = () => {
    const newErrors = {}
    const item = currentItem[activeTab]

    if (activeTab === "education") {
      if (!item.degree.trim()) newErrors.degree = "Degree is required"
      if (!item.institution.trim()) newErrors.institution = "Institution is required"
      if (!item.year.trim()) newErrors.year = "Year is required"
    } else {
      if (!item.position.trim()) newErrors.position = "Position is required"
      if (!item.company.trim()) newErrors.company = "Company is required"
      if (!item.year.trim()) newErrors.year = "Year is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveItem = () => {
    if (!validateForm()) return

    const updatedData = { ...data }

    if (editingIndex !== null) {
      // Update existing item
      updatedData[activeTab][editingIndex] = currentItem[activeTab]
    } else {
      // Add new item
      updatedData[activeTab] = [...(updatedData[activeTab] || []), currentItem[activeTab]]
    }

    updateData(updatedData)
    setIsAdding(false)
    resetForm()
  }

  const deleteItem = (index, type) => {
    const updatedData = { ...data }
    updatedData[type] = updatedData[type].filter((_, i) => i !== index)
    updateData(updatedData)
  }

  const handleChange = (e, type) => {
    const { name, value } = e.target
    setCurrentItem({
      ...currentItem,
      [type]: {
        ...currentItem[type],
        [name]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Experience
          </TabsTrigger>
        </TabsList>

        <TabsContent value="education" className="space-y-4 mt-4">
          {!isAdding ? (
            <Button onClick={startAdding} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          ) : activeTab === "education" ? (
            <Card className="border-primary/50">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree / Certificate</Label>
                  <Input
                    id="degree"
                    name="degree"
                    value={currentItem.education.degree}
                    onChange={(e) => handleChange(e, "education")}
                    placeholder="Bachelor of Science in Computer Science"
                    className={errors.degree ? "border-destructive" : ""}
                  />
                  {errors.degree && <p className="text-sm text-destructive">{errors.degree}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    name="institution"
                    value={currentItem.education.institution}
                    onChange={(e) => handleChange(e, "education")}
                    placeholder="University of Technology"
                    className={errors.institution ? "border-destructive" : ""}
                  />
                  {errors.institution && <p className="text-sm text-destructive">{errors.institution}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    value={currentItem.education.year}
                    onChange={(e) => handleChange(e, "education")}
                    placeholder="2018-2022"
                    className={errors.year ? "border-destructive" : ""}
                  />
                  {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={currentItem.education.description}
                    onChange={(e) => handleChange(e, "education")}
                    placeholder="Additional details about your education..."
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="ghost" onClick={cancelEditing}>
                  Cancel
                </Button>
                <Button onClick={saveItem}>{editingIndex !== null ? "Update" : "Add"}</Button>
              </CardFooter>
            </Card>
          ) : null}

          <div className="space-y-4 mt-4">
            <AnimatePresence>
              {(!data.education || data.education.length === 0) && !isAdding ? (
                <p className="text-sm text-muted-foreground">No education history added yet</p>
              ) : (
                data.education?.map((item, index) => (
                  <motion.div
                    key={`edu-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.degree}</h4>
                            <p className="text-sm text-muted-foreground">{item.institution}</p>
                            <p className="text-sm">{item.year}</p>
                            {item.description && <p className="text-sm mt-2">{item.description}</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => startEditing(index, "education")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteItem(index, "education")}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 mt-4">
          {!isAdding ? (
            <Button onClick={startAdding} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          ) : activeTab === "experience" ? (
            <Card className="border-primary/50">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    value={currentItem.experience.position}
                    onChange={(e) => handleChange(e, "experience")}
                    placeholder="Senior Frontend Developer"
                    className={errors.position ? "border-destructive" : ""}
                  />
                  {errors.position && <p className="text-sm text-destructive">{errors.position}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={currentItem.experience.company}
                    onChange={(e) => handleChange(e, "experience")}
                    placeholder="Tech Company Inc."
                    className={errors.company ? "border-destructive" : ""}
                  />
                  {errors.company && <p className="text-sm text-destructive">{errors.company}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    value={currentItem.experience.year}
                    onChange={(e) => handleChange(e, "experience")}
                    placeholder="2020-Present"
                    className={errors.year ? "border-destructive" : ""}
                  />
                  {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={currentItem.experience.description}
                    onChange={(e) => handleChange(e, "experience")}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="ghost" onClick={cancelEditing}>
                  Cancel
                </Button>
                <Button onClick={saveItem}>{editingIndex !== null ? "Update" : "Add"}</Button>
              </CardFooter>
            </Card>
          ) : null}

          <div className="space-y-4 mt-4">
            <AnimatePresence>
              {(!data.experience || data.experience.length === 0) && !isAdding ? (
                <p className="text-sm text-muted-foreground">No work experience added yet</p>
              ) : (
                data.experience?.map((item, index) => (
                  <motion.div
                    key={`exp-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.position}</h4>
                            <p className="text-sm text-muted-foreground">{item.company}</p>
                            <p className="text-sm">{item.year}</p>
                            {item.description && <p className="text-sm mt-2">{item.description}</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => startEditing(index, "experience")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteItem(index, "experience")}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
