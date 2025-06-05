"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Plus, X, Edit, Save } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SkillsForm({ data, updateData }) {
  const [newSkill, setNewSkill] = useState({ name: "", level: 75 })
  const [editingIndex, setEditingIndex] = useState(null)
  const [error, setError] = useState("")

  const addSkill = () => {
    if (!newSkill.name.trim()) {
      setError("Please enter a skill name")
      return
    }

    if (data.some((skill) => skill.name === newSkill.name.trim())) {
      setError("This skill already exists")
      return
    }

    if (editingIndex !== null) {
      // Update existing skill
      const updatedSkills = [...data]
      updatedSkills[editingIndex] = { ...newSkill, name: newSkill.name.trim() }
      updateData(updatedSkills)
      setEditingIndex(null)
    } else {
      // Add new skill
      updateData([...data, { ...newSkill, name: newSkill.name.trim() }])
    }

    setNewSkill({ name: "", level: 75 })
    setError("")
  }

  const editSkill = (index) => {
    setNewSkill(data[index])
    setEditingIndex(index)
    setError("")
  }

  const removeSkill = (index) => {
    const updatedSkills = [...data]
    updatedSkills.splice(index, 1)
    updateData(updatedSkills)

    if (editingIndex === index) {
      setNewSkill({ name: "", level: 75 })
      setEditingIndex(null)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Add Skills with Proficiency Level</Label>
        <div className="space-y-4 p-4 border rounded-md">
          <div className="space-y-2">
            <Label htmlFor="skillName">Skill Name</Label>
            <Input
              id="skillName"
              value={newSkill.name}
              onChange={(e) => {
                setNewSkill({ ...newSkill, name: e.target.value })
                setError("")
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. JavaScript, React, UI Design"
            />
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="skillLevel">Proficiency Level: {newSkill.level}%</Label>
            </div>
            <Slider
              id="skillLevel"
              min={0}
              max={100}
              step={5}
              value={[newSkill.level]}
              onValueChange={(value) => setNewSkill({ ...newSkill, level: value[0] })}
              className="py-4"
            />
          </div>

          <Button type="button" onClick={addSkill} className="w-full">
            {editingIndex !== null ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Skill
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </>
            )}
          </Button>
        </div>
      </div>

      <div>
        <Label>Your Skills</Label>
        <div className="mt-3 space-y-2">
          <AnimatePresence>
            {data.length === 0 ? (
              <p className="text-sm text-muted-foreground">No skills added yet</p>
            ) : (
              data.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => editSkill(index)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSkill(index)}
                      className="h-8 w-8 text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
