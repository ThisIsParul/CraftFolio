"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin, Twitter, Globe, ExternalLink, Instagram, Facebook, Youtube, Dribbble, X } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function MonoGridTemplate({ data }) {
  const { personalInfo, skills, projects, socialLinks, education, experience, testimonials } = data
  const containerRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Text reveal animation
    const textElements = container.querySelectorAll(".text-reveal")
    textElements.forEach((text) => {
      gsap.fromTo(
        text,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    // Animate sections on scroll
    const sections = container.querySelectorAll(".animate-section")
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const renderSocialIcon = (platform) => {
    switch (platform) {
      case "github":
        return <Github className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "website":
        return <Globe className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "youtube":
        return <Youtube className="h-5 w-5" />
      case "dribbble":
        return <Dribbble className="h-5 w-5" />
      default:
        return null
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 right-0 z-40 p-6">
        <button
          onClick={toggleSidebar}
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white rounded-full shadow-md focus:outline-none"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
            </>
          )}
        </button>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-30 w-64 h-full bg-white shadow-lg"
          >
            <div className="p-8 pt-24 flex flex-col h-full">
              <div className="space-y-6">
                <a href="#home" className="block text-lg hover:text-lime-500 transition-colors" onClick={toggleSidebar}>
                  Home
                </a>
                <a
                  href="#about"
                  className="block text-lg hover:text-lime-500 transition-colors"
                  onClick={toggleSidebar}
                >
                  About
                </a>
                <a
                  href="#projects"
                  className="block text-lg hover:text-lime-500 transition-colors"
                  onClick={toggleSidebar}
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  className="block text-lg hover:text-lime-500 transition-colors"
                  onClick={toggleSidebar}
                >
                  Skills
                </a>
                <a
                  href="#contact"
                  className="block text-lg hover:text-lime-500 transition-colors"
                  onClick={toggleSidebar}
                >
                  Contact
                </a>
              </div>

              <div className="mt-auto">
                <div className="flex gap-4 mt-8">
                  {Object.entries(socialLinks).map(([platform, url]) =>
                    url ? (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-lime-500 transition-colors"
                      >
                        {renderSocialIcon(platform)}
                      </a>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
          <div className="text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-reveal overflow-hidden">
              HELLO, I'M
              <br />
              {personalInfo.name.toUpperCase()}
            </h1>
            <h2 className="text-xl md:text-2xl text-lime-500 mb-8">{personalInfo.title}</h2>
            {/* <p className="text-gray-600 mb-12 max-w-xl mx-auto md:mx-0">{personalInfo.bio}</p> */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.a
                href="#projects"
                className="px-8 py-3 bg-black text-white hover:bg-lime-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Me
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-4xl font-bold mb-16 text-reveal overflow-hidden">ABOUT</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-600 mb-8 leading-relaxed">{personalInfo.bio}</p>

                {(education?.length > 0 || experience?.length > 0) && (
                  <div className="space-y-8">
                    {education?.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold mb-4">Education</h3>
                        <div className="space-y-4">
                          {education.map((item, index) => (
                            <div key={`edu-${index}`} className="border-l-2 border-lime-500 pl-4">
                              <h4 className="font-bold">{item.degree}</h4>
                              <p className="text-gray-600">{item.institution}</p>
                              <p className="text-sm text-gray-500">{item.year}</p>
                              {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {experience?.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Experience</h3>
                        <div className="space-y-4">
                          {experience.map((item, index) => (
                            <div key={`exp-${index}`} className="border-l-2 border-lime-500 pl-4">
                              <h4 className="font-bold">{item.position}</h4>
                              <p className="text-gray-600">{item.company}</p>
                              <p className="text-sm text-gray-500">{item.year}</p>
                              {item.description && <p className="text-gray-600 mt-1">{item.description}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                {personalInfo.profileImage && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={personalInfo.profileImage || "/placeholder.svg"}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-4xl font-bold mb-16 text-reveal overflow-hidden">SKILLS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="p-6 border border-gray-200 hover:border-lime-500 group transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold group-hover:text-lime-500 transition-colors">{skill.name}</h3>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200">
                    <div className="h-full bg-lime-500" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-4xl font-bold mb-16 text-reveal overflow-hidden">PROJECTS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div key={index} className="group" whileHover={{ y: -10 }}>
                  <div className="overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gray-200"></div>
                    )}
                  </div>
                  <div className="p-6 border border-t-0 border-gray-200 group-hover:border-lime-500 transition-colors">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-lime-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-black hover:text-lime-500 transition-colors font-medium"
                      >
                        View Project <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials?.length > 0 && (
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-section">
              <h2 className="text-4xl font-bold mb-16 text-reveal overflow-hidden">TESTIMONIALS</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="p-6 border border-gray-200 hover:border-lime-500 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      {testimonial.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                      )}
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.position}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-4xl font-bold mb-16 text-reveal overflow-hidden">CONTACT</h2>

            <div className="max-w-xl mx-auto">
              <div className="mb-12">
                <p className="text-gray-600 mb-8 text-center">
                  Interested in working together? Feel free to reach out through any of these platforms.
                </p>
                <div className="flex justify-center gap-6">
                  {Object.entries(socialLinks).map(([platform, url]) =>
                    url ? (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-lime-500 transition-colors"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {renderSocialIcon(platform)}
                      </motion.a>
                    ) : null,
                  )}
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-4 border border-gray-200 focus:border-lime-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-4 border border-gray-200 focus:border-lime-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="w-full p-4 border border-gray-200 focus:border-lime-500 outline-none transition-colors"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-black text-white hover:bg-lime-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
