"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  ExternalLink,
  Instagram,
  Facebook,
  Youtube,
  Dribbble,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function TechAuraTemplate({ data }) {
  const { personalInfo, skills, projects, socialLinks, education, experience, testimonials } = data
  const containerRef = useRef(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Animate sections on scroll with extra scaling
    const sections = container.querySelectorAll(".animate-section")
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    // Testimonial auto-scroll
    if (testimonials?.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [testimonials?.length])

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

  const nextTestimonial = () => {
    if (testimonials?.length > 1) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (testimonials?.length > 1) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white font-serif">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-serif font-bold text-white text-2xl"
          >
            {personalInfo.name.split(" ").map((name) => name[0]).join("")}
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["home", "about", "projects", "testimonials", "contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className="text-white hover:text-yellow-300 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
          </div>
          <div className="md:hidden">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center md:text-left"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
              >
                Hello, I'm <span className="text-yellow-300">{personalInfo.name}</span>
              </motion.h1>
              <motion.h2
                className="text-xl md:text-2xl mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.8 } }}
              >
                {personalInfo.title}
              </motion.h2>
              <motion.p
                className="mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.8 } }}
              >
                {personalInfo.bio}
              </motion.p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <motion.a
                  href="#projects"
                  className="px-6 py-3 bg-yellow-300 text-blue-700 rounded shadow-lg hover:bg-yellow-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-6 py-3 bg-white text-blue-700 border border-white rounded shadow-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex justify-center md:justify-end"
            >
              {personalInfo.profileImage && (
                <motion.div
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white"
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 1 }}
                >
                  <img
                    src={personalInfo.profileImage || "/placeholder.svg"}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg mx-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              About <span className="text-yellow-300">Me</span>
            </motion.h2>

            <div className="bg-white bg-opacity-20 rounded-lg shadow-lg p-8">
              <div className="flex border-b border-white/30 mb-6">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "profile"
                      ? "text-yellow-300 border-b-2 border-yellow-300"
                      : "text-white hover:text-yellow-300"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </button>
                {education?.length > 0 && (
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "education"
                        ? "text-yellow-300 border-b-2 border-yellow-300"
                        : "text-white hover:text-yellow-300"
                    }`}
                    onClick={() => setActiveTab("education")}
                  >
                    Education
                  </button>
                )}
                {experience?.length > 0 && (
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === "career"
                        ? "text-yellow-300 border-b-2 border-yellow-300"
                        : "text-white hover:text-yellow-300"
                    }`}
                    onClick={() => setActiveTab("career")}
                  >
                    Career
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-white">Personal Information</h3>
                        <p className="text-white mb-6 leading-relaxed">{personalInfo.bio}</p>
                        <div className="flex flex-wrap gap-3">
                          {skills.slice(0, 6).map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-yellow-300 text-blue-700 rounded-full text-sm">
                              {skill.name}
                            </span>
                          ))}
                          {skills.length > 6 && (
                            <span className="px-3 py-1 bg-white text-blue-700 rounded-full text-sm">
                              +{skills.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        {personalInfo.profileImage && (
                          <div className="rounded-full overflow-hidden shadow-md">
                            <img
                              src={personalInfo.profileImage || "/placeholder.svg"}
                              alt={personalInfo.name}
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "education" && education?.length > 0 && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {education.map((item, index) => (
                      <motion.div
                        key={index}
                        className="p-4 border-l-4 border-yellow-300 bg-white bg-opacity-20 rounded-r-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h3 className="text-lg font-bold text-white">{item.degree}</h3>
                        <p className="text-yellow-300">{item.institution}</p>
                        <p className="text-white text-sm">{item.year}</p>
                        {item.description && <p className="text-white mt-2">{item.description}</p>}
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "career" && experience?.length > 0 && (
                  <motion.div
                    key="career"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {experience.map((item, index) => (
                      <motion.div
                        key={index}
                        className="p-4 border-l-4 border-yellow-300 bg-white bg-opacity-20 rounded-r-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <h3 className="text-lg font-bold text-white">{item.position}</h3>
                        <p className="text-yellow-300">{item.company}</p>
                        <p className="text-white text-sm">{item.year}</p>
                        {item.description && <p className="text-white mt-2">{item.description}</p>}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              My <span className="text-yellow-300">Projects</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-xl overflow-hidden"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {project.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-700">{project.title}</h3>
                    <p className="text-gray-800 mb-4">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
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
        <section id="testimonials" className="py-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg mx-4">
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-section">
              <motion.h2
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                Client <span className="text-yellow-300">Testimonials</span>
              </motion.h2>

              <div className="max-w-3xl mx-auto relative">
                <div className="bg-yellow-50 bg-opacity-20 rounded-lg p-8 shadow-xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="mb-6">
                        <svg className="w-10 h-10 text-yellow-300 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="text-gray-200 italic text-lg mb-6">{testimonials[currentTestimonial].text}</p>
                      <div className="flex items-center justify-center">
                        {testimonials[currentTestimonial].image ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                              src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                              alt={testimonials[currentTestimonial].name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-yellow-300 mr-4"></div>
                        )}
                        <div className="text-left">
                          <h4 className="font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                          <p className="text-sm text-gray-200">{testimonials[currentTestimonial].position}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {testimonials.length > 1 && (
                  <div className="flex justify-center mt-6 gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-blue-600 hover:text-yellow-600 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-blue-600 hover:text-yellow-600 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <motion.h2
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Get In <span className="text-yellow-300">Touch</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white bg-opacity-20 rounded-lg shadow-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white">Send Me a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="w-full p-3 border border-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent bg-white bg-opacity-20 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className="w-full p-3 border border-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent bg-white bg-opacity-20 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="How can I help you?"
                      rows={5}
                      className="w-full p-3 border border-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent bg-white bg-opacity-20 text-white"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-yellow-300 text-blue-700 rounded font-medium hover:bg-yellow-400 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>

              <div>
                <div className="bg-white bg-opacity-20 rounded-lg shadow-xl p-8 mb-8">
                  <h3 className="text-xl font-bold mb-6 text-white">Connect With Me</h3>
                  <div className="space-y-4">
                    {Object.entries(socialLinks).map(([platform, url]) =>
                      url ? (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-white hover:text-yellow-300 transition-colors"
                        >
                          {renderSocialIcon(platform)}
                          <span className="capitalize">{platform}</span>
                        </a>
                      ) : null,
                    )}
                  </div>
                </div>

                <div className="bg-yellow-300 rounded-lg shadow-xl p-8 text-blue-700">
                  <h3 className="text-xl font-bold mb-6">Let's Work Together</h3>
                  <p className="mb-6">
                    I'm currently available for freelance work. If you have a project that you want to get started,
                    think you need my help with something or just fancy saying hello, then get in touch.
                  </p>
                  <motion.a
                    href="mailto:contact@example.com"
                    className="inline-block px-6 py-3 bg-white text-blue-700 rounded font-medium hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Email Me
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white bg-opacity-20 border-t border-white/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}