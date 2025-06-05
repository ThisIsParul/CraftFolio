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

export default function NovaSparkTemplate({ data }) {
  const { personalInfo, skills, projects, socialLinks, education, experience, testimonials } = data
  const containerRef = useRef(null)
  const heroRef = useRef(null)
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

    // Animate skill bars
    const skillBars = container.querySelectorAll(".skill-bar")

    skillBars.forEach((bar) => {
      const level = bar.getAttribute("data-level")
      gsap.fromTo(
        bar,
        { width: 0 },
        {
          width: `${level}%`,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    // Typewriter effect for hero text
    if (heroRef.current) {
      const text = heroRef.current.innerText
      heroRef.current.innerText = ""

      const typewriter = gsap.to(heroRef.current, {
        text: {
          value: text,
          delimiter: "",
        },
        duration: 2,
        delay: 0.5,
        ease: "none",
      })
    }

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
    <div ref={containerRef} className="min-h-screen bg-gray-950 text-gray-300 font-sans">
      {/* Matrix-style background */}
      <motion.div className="fixed inset-0 z-0 opacity-20" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJtYXRyaXgiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIiBmaWxsPSIjMDBmZjAwIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNtYXRyaXgpIi8+PC9zdmc+')]"></div>
      </motion.div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-gray-950/70 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
             {personalInfo.name.split(" ").map((name) => name[0]).join("")}
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#projects" className="text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#skills" className="text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
          </div>
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-cyan-400">
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
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1
              ref={heroRef}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400"
            >
              Hi, I'm {personalInfo.name} – {personalInfo.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl">{personalInfo.bio}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.a
                href="#projects"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-md border border-purple-500/50 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-transparent border border-cyan-500/50 text-cyan-400 rounded-md shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 rounded-xl overflow-hidden border border-purple-500/20 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/20 transition-all"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {project.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-cyan-400">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium"
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

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-section">
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-300">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                      data-level={skill.level}
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      {(experience?.length > 0 || education?.length > 0) && (
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-section">
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                Experience & Education
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {experience?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-cyan-400">Work Experience</h3>
                    <div className="space-y-8">
                      {experience.map((item, index) => (
                        <motion.div
                          key={index}
                          className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-purple-500/30"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-purple-500 -translate-x-1/2"></div>
                          <h4 className="text-lg font-semibold">{item.position}</h4>
                          <p className="text-cyan-400 text-sm mb-1">{item.company}</p>
                          <p className="text-gray-500 text-sm mb-2">{item.year}</p>
                          <p className="text-gray-400">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {education?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-cyan-400">Education</h3>
                    <div className="space-y-8">
                      {education.map((item, index) => (
                        <motion.div
                          key={index}
                          className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-purple-500/30"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-purple-500 -translate-x-1/2"></div>
                          <h4 className="text-lg font-semibold">{item.degree}</h4>
                          <p className="text-cyan-400 text-sm mb-1">{item.institution}</p>
                          <p className="text-gray-500 text-sm mb-2">{item.year}</p>
                          <p className="text-gray-400">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials?.length > 0 && (
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-section">
              <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                What People Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900 rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/5"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      {testimonial.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                          <span className="text-purple-400 text-xl">"</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-300">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.position}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 italic">"{testimonial.text}"</p>
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
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Get In Touch
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {Object.entries(socialLinks).map(([platform, url]) =>
                url ? (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-900 border border-purple-500/30 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-lg shadow-purple-500/10 hover:shadow-cyan-500/20 transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {renderSocialIcon(platform)}
                  </motion.a>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
