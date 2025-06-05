"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Dribbble,
  DribbbleIcon as Behance,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SocialLinksForm({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateData({
      ...data,
      [name]: value,
    })
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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="developer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="developer">Developer</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>

        <TabsContent value="developer" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Label>
            <Input
              id="github"
              name="github"
              value={data.github}
              onChange={handleChange}
              placeholder="https://github.com/yourusername"
              className={!isValidUrl(data.github) ? "border-destructive" : ""}
            />
            {data.github && !isValidUrl(data.github) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={data.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourusername"
              className={!isValidUrl(data.linkedin) ? "border-destructive" : ""}
            />
            {data.linkedin && !isValidUrl(data.linkedin) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Personal Website
            </Label>
            <Input
              id="website"
              name="website"
              value={data.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              className={!isValidUrl(data.website) ? "border-destructive" : ""}
            />
            {data.website && !isValidUrl(data.website) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter
            </Label>
            <Input
              id="twitter"
              name="twitter"
              value={data.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/yourusername"
              className={!isValidUrl(data.twitter) ? "border-destructive" : ""}
            />
            {data.twitter && !isValidUrl(data.twitter) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              Instagram
            </Label>
            <Input
              id="instagram"
              name="instagram"
              value={data.instagram || ""}
              onChange={handleChange}
              placeholder="https://instagram.com/yourusername"
              className={!isValidUrl(data.instagram) ? "border-destructive" : ""}
            />
            {data.instagram && !isValidUrl(data.instagram) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              Facebook
            </Label>
            <Input
              id="facebook"
              name="facebook"
              value={data.facebook || ""}
              onChange={handleChange}
              placeholder="https://facebook.com/yourusername"
              className={!isValidUrl(data.facebook) ? "border-destructive" : ""}
            />
            {data.facebook && !isValidUrl(data.facebook) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              YouTube
            </Label>
            <Input
              id="youtube"
              name="youtube"
              value={data.youtube || ""}
              onChange={handleChange}
              placeholder="https://youtube.com/@yourchannel"
              className={!isValidUrl(data.youtube) ? "border-destructive" : ""}
            />
            {data.youtube && !isValidUrl(data.youtube) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="dribbble" className="flex items-center gap-2">
              <Dribbble className="h-4 w-4" />
              Dribbble
            </Label>
            <Input
              id="dribbble"
              name="dribbble"
              value={data.dribbble || ""}
              onChange={handleChange}
              placeholder="https://dribbble.com/yourusername"
              className={!isValidUrl(data.dribbble) ? "border-destructive" : ""}
            />
            {data.dribbble && !isValidUrl(data.dribbble) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="behance" className="flex items-center gap-2">
              <Behance className="h-4 w-4" />
              Behance
            </Label>
            <Input
              id="behance"
              name="behance"
              value={data.behance || ""}
              onChange={handleChange}
              placeholder="https://behance.net/yourusername"
              className={!isValidUrl(data.behance) ? "border-destructive" : ""}
            />
            {data.behance && !isValidUrl(data.behance) && (
              <p className="text-sm text-destructive">Please enter a valid URL</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <h3 className="font-medium mb-2">Why Add Social Links?</h3>
        <p className="text-sm text-muted-foreground">
          Social links help potential employers or clients connect with you on different platforms. They also provide
          additional context about your work and professional presence.
        </p>
      </div>
    </div>
  )
}
