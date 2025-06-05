"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, Linkedin, Twitter, Globe, ExternalLink, Instagram, Facebook, Youtube, Dribbble } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GradientFlowTemplate({ data }) {
  const { personalInfo, skills, projects, socialLinks, education, experience, testimonials } = data
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Animate sections on scroll
    const sections = container.querySelectorAll(".animate-section")

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
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

    // Text transitions with random reveal effects
    const textElements = container.querySelectorAll(".text-reveal")
    textElements.forEach((text) => {
      const chars = text.textContent.split("")
      text.textContent = ""

      chars.forEach((char) => {
        const span = document.createElement("span")
        span.textContent = char
        span.style.opacity = "0"
        span.style.display = "inline-block"
        text.appendChild(span)
      })

      gsap.to(text.querySelectorAll("span"), {
        opacity: 1,
        stagger: {
          each: 0.03,
          from: "random",
        },
        duration: 0.5,
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
    })

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 50,
            },
            ease: "power3.inOut",
          })
        }
      })
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
    <div ref={containerRef} className="min-h-screen font-sans">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-500"
          style={{ y: backgroundY }}
          animate={{
            background: [
              "linear-gradient(to top right, #f0abfc, #8b5cf6, #06b6d4)",
              "linear-gradient(to top right, #06b6d4, #f0abfc, #8b5cf6)",
              "linear-gradient(to top right, #8b5cf6, #06b6d4, #f0abfc)",
              "linear-gradient(to top right, #f0abfc, #8b5cf6, #06b6d4)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-white">FLOW</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-white hover:text-cyan-300 transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-white hover:text-cyan-300 transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
              <a href="#projects" className="text-white hover:text-cyan-300 transition-colors relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
              <a href="#skills" className="text-white hover:text-cyan-300 transition-colors relative group">
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-white hover:text-cyan-300 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
            </div>
            <div className="md:hidden">
              <button className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white text-reveal">Hi, I'm {personalInfo.name}</h1>
            <h2 className="text-xl md:text-2xl text-white/80 mb-8">{personalInfo.title}</h2>
            <p className="text-white/70 mb-12 max-w-2xl mx-auto">{personalInfo.bio}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#projects"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-4 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Animated emoji carousel */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, -100, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {["✨", "🚀", "💻", "🎨", "🔮", "⚡", "🌈", "💡"].map((emoji, index) => (
              <span key={index} className="text-3xl">
                {emoji}
              </span>
            ))}
            {["✨", "🚀", "💻", "🎨", "🔮", "⚡", "🌈", "💡"].map((emoji, index) => (
              <span key={`dup-${index}`} className="text-3xl">
                {emoji}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center text-white text-reveal">About Me</h2>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-white/80 mb-8 leading-relaxed">{personalInfo.bio}</p>

                  {(education?.length > 0 || experience?.length > 0) && (
                    <div className="space-y-8">
                      {education?.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-white">Education</h3>
                          <div className="space-y-4">
                            {education.map((item, index) => (
                              <motion.div
                                key={`edu-${index}`}
                                className="bg-white/10 rounded-xl p-4 border border-white/20"
                                whileHover={{ scale: 1.02 }}
                              >
                                <h4 className="font-bold text-white">{item.degree}</h4>
                                <p className="text-white/70">{item.institution}</p>
                                <p className="text-sm text-white/50">{item.year}</p>
                                {item.description && <p className="text-white/70 mt-2">{item.description}</p>}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {experience?.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-white">Experience</h3>
                          <div className="space-y-4">
                            {experience.map((item, index) => (
                              <motion.div
                                key={`exp-${index}`}
                                className="bg-white/10 rounded-xl p-4 border border-white/20"
                                whileHover={{ scale: 1.02 }}
                              >
                                <h4 className="font-bold text-white">{item.position}</h4>
                                <p className="text-white/70">{item.company}</p>
                                <p className="text-sm text-white/50">{item.year}</p>
                                {item.description && <p className="text-white/70 mt-2">{item.description}</p>}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  {personalInfo.profileImage && (
                    <motion.div
                      className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/30"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <img
                        src={personalInfo.profileImage || "/placeholder.svg"}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center text-white text-reveal">My Skills</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  whileHover={{ scale: 1.1, y: -10 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h3 className="font-bold text-white mb-2">{skill.name}</h3>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                    ></motion.div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm text-white/70">{skill.level}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center text-white text-reveal">My Projects</h2>

            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{ x: projects.length > 3 ? [0, -1200, 0] : 0 }}
                transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="min-w-[300px] md:min-w-[350px] bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 flex-shrink-0"
                    whileHover={{ y: -10 }}
                  >
                    {project.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="text-white/70 mb-4">{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-300 hover:text-white transition-colors"
                        >
                          View Project <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Duplicate projects for infinite scroll effect if there are few projects */}
                {projects.length <= 3 &&
                  projects.map((project, index) => (
                    <motion.div
                      key={`dup-${index}`}
                      className="min-w-[300px] md:min-w-[350px] bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 flex-shrink-0"
                      whileHover={{ y: -10 }}
                    >
                      {project.image && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                        <p className="text-white/70 mb-4">{project.description}</p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-cyan-300 hover:text-white transition-colors"
                          >
                            View Project <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials?.length > 0 && (
        <section className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-section">
              <h2 className="text-3xl font-bold mb-12 text-center text-white text-reveal">What People Say</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="mb-4">
                      <svg className="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-white/80 italic mb-6">{testimonial.text}</p>
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
                        <div className="w-12 h-12 rounded-full bg-white/20 mr-4"></div>
                      )}
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-white/60">{testimonial.position}</p>
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
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center text-white text-reveal">Get In Touch</h2>

            <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="mb-8">
                <p className="text-white/80 text-center mb-6">
                  Feel free to reach out through any of these platforms or send me a message directly.
                </p>
                <div className="flex justify-center gap-4">
                  {Object.entries(socialLinks).map(([platform, url]) =>
                    url ? (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-purple-600 transition-colors"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {renderSocialIcon(platform)}
                      </motion.a>
                    ) : null,
                  )}
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-opacity-90 transition-colors"
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
      <footer className="py-8 border-t border-white/20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white/60">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
