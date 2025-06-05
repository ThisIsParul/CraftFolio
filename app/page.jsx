"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Palette, Download, ArrowRight, Users, Code, Globe } from "lucide-react"
import ParticlesBackground from "@/components/ParticlesBackground"
import gsap from "gsap"

export default function LandingPageWithCanvasAnimation() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const canvasRef = useRef(null)
  const animationFrameId = useRef(null)
  const particles = useRef([])
  const buttonsRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const footerRef = useRef(null)

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

    gsap.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.3, duration: 1, ease: "power3.out" })

    gsap.fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.6, duration: 1, ease: "power3.out" })

    gsap.fromTo(featuresRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out", stagger: 0.2 })

    gsap.fromTo(testimonialsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power3.out" })

    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 2, ease: "power3.out" })
  }, [])

  // Canvas particle background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.radius = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.color = `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > width) this.speedX *= -1
        if (this.y < 0 || this.y > height) this.speedY *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.shadowBlur = 8
        ctx.shadowColor = this.color
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const initParticles = (num) => {
      particles.current = []
      for (let i = 0; i < num; i++) {
        particles.current.push(new Particle())
      }
    }

    initParticles(Math.min(120, width / 10))

    const connectParticles = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x
          const dy = particles.current[i].y - particles.current[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / 150) * 0.15})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles.current[i].x, particles.current[i].y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.current.forEach(p => {
        p.update()
        p.draw()
      })
      connectParticles()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initParticles(Math.min(120, width / 10))
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [])

  return (
    <>
      <ParticlesBackground />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-20 bg-gradient-to-b from-black to-gray-900"
        style={{ pointerEvents: "none" }}
      />
     

      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-gray-100 relative z-10">
        <header className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">
              Craftfolio
            </h1>
          </div>
        </header>

        <main className="max-w-4xl text-center mt-24">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600 drop-shadow-lg"
          >
            Build Your Dream Portfolio in Minutes
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-purple-300 mb-12 max-w-xl mx-auto drop-shadow-md"
          >
            Create beautiful, animated portfolios with our easy-to-use builder. No coding required.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-64 py-4 text-lg border-purple-400 text-purple-400 hover:bg-purple-700/30 shadow-lg transition"
            >
              <Link href="/form" className="flex items-center justify-center gap-2">
                <ArrowRight className="h-6 w-6" />
                Create My Portfolio
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-64 py-4 text-lg bg-purple-600 hover:bg-purple-700 shadow-lg transition">
              <Link href="/templates" className="flex items-center justify-center gap-2">
                <Palette className="h-6 w-6" />
                Browse Templates
              </Link>
            </Button>

            
          </div>
        </main>
       

        <section
          ref={featuresRef}
          className="max-w-5xl w-full mt-40 grid md:grid-cols-3 gap-10 px-4"
        >
          {[
            { icon: <Palette className="mx-auto h-12 w-12 text-purple-400" />, title: "Beautiful Templates", description: "Multiple professionally designed templates you can customize." },
            { icon: <Sparkles className="mx-auto h-12 w-12 text-purple-400" />, title: "Stunning Animations", description: "Add eye-catching animations effortlessly." },
            { icon: <Download className="mx-auto h-12 w-12 text-purple-400" />, title: "Export as HTML", description: "Export your portfolio for any platform." },
 
            { icon: <Code className="mx-auto h-12 w-12 text-purple-400" />, title: "No Coding Needed", description: "Simple drag & drop interface, no programming skills required." },
            { icon: <Globe className="mx-auto h-12 w-12 text-purple-400" />, title: "Responsive Design", description: "Your portfolio looks perfect on all devices." },
          ].map(({ icon, title, description }, idx) => (
            <div key={idx} className="bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-purple-700 transition-shadow cursor-default">
              {icon}
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-purple-300">{description}</p>
            </div>
          ))}
        </section>
 <Sparkles/>
        <section
          ref={testimonialsRef}
          className="max-w-5xl w-full mt-32 px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600">
            Loved by Creators
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            {[
              {
                quote: "“Craftfolio made my portfolio in 5 minutes. The animations are fire!”",
                author: "Alex Designer",
              },
              {
                quote: "“Never thought building a portfolio could be fun and so interactive.”",
                author: "Riya Dev",
              },
              {
                quote: "“The templates are stunning and exporting as HTML made deployment effortless.”",
                author: "James Coder",
              },
            ].map(({ quote, author }, idx) => (
              <blockquote key={idx} className="bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-xl p-8 flex-1 shadow-lg">
                <p className="italic text-purple-300">{quote}</p>
                <footer className="mt-6 font-semibold text-purple-400">— {author}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <footer
          ref={footerRef}
          className="w-full py-12 text-center text-purple-400 mt-40 select-none"
        >
          <p>© {new Date().getFullYear()} Craftfolio. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
