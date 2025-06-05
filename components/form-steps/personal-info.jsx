"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

export default function PersonalInfoForm({ data, updateData }) {
  const [profileImage, setProfileImage] = useState(data.profileImage)

  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({
      ...data,
      [name]: value,
    })
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
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height

          // Calculate new dimensions (max 800px)
          const maxDimension = 800
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

          setProfileImage(compressedImageData)
          updateData({
            ...data,
            profileImage: compressedImageData,
          })
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    updateData({
      ...data,
      profileImage: null,
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="profileImage">Profile Picture</Label>
        <div className="flex items-center gap-4">
          <div className="relative">
            {profileImage ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-border">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0 h-6 w-6 rounded-full"
                  onClick={removeImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border border-border">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <Input id="profileImage" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <Button variant="outline" onClick={() => document.getElementById("profileImage").click()} type="button">
              Upload Image
            </Button>
            <p className="text-sm text-muted-foreground mt-2">Recommended: Square image, at least 300x300px</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={data.name} onChange={handleChange} placeholder="John Doe" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input id="title" name="title" value={data.title} onChange={handleChange} placeholder="Frontend Developer" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={data.bio}
          onChange={handleChange}
          placeholder="Write a short bio about yourself..."
          rows={5}
        />
      </div>
    </div>
  )
}
