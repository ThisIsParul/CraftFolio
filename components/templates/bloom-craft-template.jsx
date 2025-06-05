"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin, Twitter, Globe, ExternalLink, Instagram, Facebook, Youtube, Dribbble } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function BloomCraftTemplate({ data }) {
  const { personalInfo, skills, projects, socialLinks, education, experience, testimonials } = data
  const containerRef = useRef(null)
  const floatingImageRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

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

    // Floating animation for hero image
    if (floatingImageRef.current) {
      gsap.to(floatingImageRef.current, {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }

    // Animate flower brushes
    const flowers = container.querySelectorAll(".flower")
    flowers.forEach((flower) => {
      gsap.fromTo(
        flower,
        { scale: 0, rotation: -20, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: flower,
            start: "top 90%",
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-pink-200 via-white to-indigo-100 text-gray-800 font-serif"
    >
      {/* Decorative elements */}
      <div className="flower absolute top-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 -z-10"></div>
      <div className="flower absolute top-60 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-30 -z-10"></div>
      <div className="flower absolute bottom-40 right-20 w-40 h-40 bg-pink-100 rounded-full opacity-30 -z-10"></div>
      <div className="flower absolute bottom-20 left-20 w-20 h-20 bg-indigo-100 rounded-full opacity-30 -z-10"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center space-x-10">
            <a href="#home" className="text-gray-700 hover:text-pink-500 transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#about" className="text-gray-700 hover:text-pink-500 transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#portfolio" className="text-gray-700 hover:text-pink-500 transition-colors relative group">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-700 hover:text-pink-500 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {personalInfo.profileImage && (
              <motion.div
                ref={floatingImageRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-xl"
              >
                <img
                  src={personalInfo.profileImage || "/placeholder.svg"}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Hello, I'm <span className="text-pink-500">{personalInfo.name}</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-indigo-600 mb-6">{personalInfo.title}</h2>
              <p className="text-gray-600 mb-8 max-w-xl leading-relaxed">{personalInfo.bio}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <motion.a
                  href="#portfolio"
                  className="px-6 py-3 bg-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-6 py-3 bg-white text-pink-500 border border-pink-500 rounded-full shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-white/70">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              About <span className="text-pink-500">Me</span>
            </h2>

            {(education?.length > 0 || experience?.length > 0) && (
              <div className="max-w-3xl mx-auto">
                <div className="relative border-l-2 border-indigo-200 pl-8 ml-4">
                  {education?.map((item, index) => (
                    <motion.div
                      key={`edu-${index}`}
                      className="mb-12 relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-pink-100 border-2 border-pink-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-6 shadow-md">
                        <span className="text-sm text-pink-500 font-medium">{item.year}</span>
                        <h3 className="text-xl font-bold text-gray-800 mt-1">{item.degree}</h3>
                        <p className="text-indigo-600 mb-2">{item.institution}</p>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}

                  {experience?.map((item, index) => (
                    <motion.div
                      key={`exp-${index}`}
                      className="mb-12 relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (education?.length || 0) * 0.1 + index * 0.1 }}
                    >
                      <div className="absolute -left-12 top-0 w-6 h-6 rounded-full bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-6 shadow-md">
                        <span className="text-sm text-indigo-500 font-medium">{item.year}</span>
                        <h3 className="text-xl font-bold text-gray-800 mt-1">{item.position}</h3>
                        <p className="text-pink-600 mb-2">{item.company}</p>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-800">
                My <span className="text-pink-500">Skills</span>
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="px-6 py-3 bg-white rounded-full shadow-md text-gray-800 border border-pink-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1, backgroundColor: "#FDF2F8" }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              My <span className="text-pink-500">Portfolio</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {project.image && (
                    <div className="h-56 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-pink-500 hover:text-pink-600 font-medium"
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
        <section className="py-20 bg-white/70">
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-section">
              <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
                Client <span className="text-pink-500">Testimonials</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-pink-50 rounded-lg p-6 shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      {testimonial.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-pink-200">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center mr-4">
                          <span className="text-pink-500 text-xl">"</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-indigo-600">{testimonial.position}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
              Get In <span className="text-pink-500">Touch</span>
            </h2>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border border-pink-100">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Connect With Me</h3>
                <p className="text-gray-600 mb-6">
                  Feel free to reach out through any of these platforms. I'd love to hear from you!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {Object.entries(socialLinks).map(([platform, url]) =>
                    url ? (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {renderSocialIcon(platform)}
                      </motion.a>
                    ) : null,
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border-2 text-white border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                  />
                  <div className="absolute -bottom-1 left-4 right-4 h-px bg-pink-300 opacity-50"></div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border-2 text-white border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                  />
                  <div className="absolute -bottom-1 left-4 right-4 h-px bg-pink-300 opacity-50"></div>
                </div>

                <div className="relative">
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 border-2 text-white border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
                  ></textarea>
                  <div className="absolute -bottom-1 left-4 right-4 h-px bg-pink-300 opacity-50"></div>
                </div>

                <motion.button
                  className="w-full py-3 bg-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white/80 border-t border-pink-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
