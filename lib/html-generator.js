// Function to generate standalone HTML file
export const generateHTML = async (portfolioData) => {
  const { template, personalInfo, skills, projects, socialLinks, education, experience, testimonials } = portfolioData

  // Get template-specific styles and structure
  const templateStyles = getTemplateStyles(template)
  const templateStructure = getTemplateStructure(
    template,
    personalInfo,
    skills,
    projects,
    socialLinks,
    education,
    experience,
    testimonials,
  )

  // Create the HTML document
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${personalInfo.name} - Portfolio</title>

<!-- Tailwind CSS via CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- GSAP and Framer Motion via CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>

<!-- Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

<script>
  // Configure Tailwind
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: ${JSON.stringify(templateStyles.tailwindConfig || {})}
    }
  }
  
  // Check for dark mode preference
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
</script>

<style>
  ${templateStyles.css || ""}
  
  /* Animation classes */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-on-scroll.animated {
    opacity: 1;
    transform: translateY(0);
    transform: translateY(0);
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* Dark mode scrollbar */
  .dark ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }
  
  .dark ::-webkit-scrollbar-thumb {
    background: #555;
  }
  
  .dark ::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
</style>
</head>
<body class="${templateStyles.bodyClass || ""}">
${templateStructure}

<!-- Dark mode toggle -->
<button id="theme-toggle" class="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg z-50">
  <i class="fa-solid fa-sun dark:hidden"></i>
  <i class="fa-solid fa-moon hidden dark:inline"></i>
</button>

<script>
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Dark mode toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  });
  
  // Scroll animations
  document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    // GSAP animations
    ${templateStyles.gsapAnimations || ""}
  });
</script>
</body>
</html>
`

  return html
}

// Template-specific styles
const getTemplateStyles = (templateId) => {
  const styles = {
   


    // New templates
    "nova-spark": {
      bodyClass: "bg-gray-950 text-gray-300",
      tailwindConfig: {
        colors: {
          primary: "#8b5cf6",
          secondary: "#06b6d4",
        },
      },
      css: `
        .skill-bar {
          width: 0;
          transition: width 1.5s ease-out;
        }
        .text-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .text-reveal.animated {
          opacity: 1;
          transform: translateY(0);
        }
      `,
      gsapAnimations: `
        gsap.from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
        
        // Animate skill bars
        document.querySelectorAll('.skill-bar').forEach(bar => {
          const level = bar.getAttribute('data-level');
          gsap.to(bar, {
            width: level + '%',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            }
          });
        });
        
        // Animate sections
        document.querySelectorAll('.animate-section').forEach(section => {
          gsap.from(section, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          });
        });
      `,
    },
    "bloom-craft": {
      bodyClass: "bg-gradient-to-br from-pink-200 via-white to-indigo-100 text-gray-800 font-serif",
      tailwindConfig: {
        colors: {
          primary: "#ec4899",
          secondary: "#6366f1",
        },
      },
      css: `
        .flower {
          opacity: 0;
          transform: scale(0) rotate(-20deg);
          transition: opacity 1s ease, transform 1s ease;
        }
        .flower.animated {
          opacity: 0.3;
          transform: scale(1) rotate(0);
        }
      `,
      gsapAnimations: `
        // Floating animation for profile image
        gsap.to('.profile-image', {
          y: 15,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        
        // Animate flowers
        document.querySelectorAll('.flower').forEach(flower => {
          gsap.to(flower, {
            opacity: 0.3,
            scale: 1,
            rotation: 0,
            duration: 1,
            scrollTrigger: {
              trigger: flower,
              start: 'top 90%',
            }
          });
        });
        
        // Animate sections
        document.querySelectorAll('.animate-section').forEach(section => {
          gsap.from(section, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          });
        });
      `,
    },
    "mono-grid": {
      bodyClass: "bg-white text-gray-900 font-sans",
      tailwindConfig: {
        colors: {
          primary: "#65a30d",
        },
      },
      css: `
        .text-reveal {
          clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
          transition: clip-path 1s ease;
        }
        .text-reveal.animated {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      `,
      gsapAnimations: `
        // Text reveal animation
        document.querySelectorAll('.text-reveal').forEach(text => {
          gsap.to(text, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 80%',
            }
          });
        });
        
        // Animate sections
        document.querySelectorAll('.animate-section').forEach(section => {
          gsap.from(section, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          });
        });
      `,
    },
    "gradient-flow": {
      bodyClass: "font-sans",
      tailwindConfig: {
        colors: {
          primary: "#8b5cf6",
          secondary: "#06b6d4",
        },
      },
      css: `
        body {
          background: linear-gradient(to top right, #f0abfc, #8b5cf6, #06b6d4);
          background-size: 400% 400%;
          animation: gradient 20s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .text-reveal span {
          opacity: 0;
          display: inline-block;
          transition: opacity 0.5s ease;
        }
        .text-reveal.animated span {
          opacity: 1;
        }
      `,
      gsapAnimations: `
        // Text transitions with random reveal effects
        document.querySelectorAll('.text-reveal').forEach(text => {
          const chars = text.textContent.split('');
          text.textContent = '';
          
          chars.forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            text.appendChild(span);
          });
          
          gsap.to(text.querySelectorAll('span'), {
            opacity: 1,
            stagger: {
              each: 0.03,
              from: 'random',
            },
            duration: 0.5,
            scrollTrigger: {
              trigger: text,
              start: 'top 80%',
            }
          });
        });
        
        // Animate sections
        document.querySelectorAll('.animate-section').forEach(section => {
          gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          });
        });
      `,
    },
   "tech-aura": {
      bodyClass: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white font-serif",
      tailwindConfig: {
        colors: {
          primary: "#2563eb",
        },
      },
      css: `
        .tab-content {
          display: none;
        }
        .tab-content.active {
          display: block;
        }
      `,
      gsapAnimations: `
        // Animate sections on scroll for tech-aura
        document.querySelectorAll('.animate-section').forEach(section => {
          gsap.from(section, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            }
          });
        });
        
        // Tab functionality for tech-aura template
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        tabButtons.forEach(button => {
          button.addEventListener('click', () => {
            const target = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(target).classList.add('active');
          });
        });
      `,
    },}

  return styles[templateId] || styles["nova-spark"] // Default to nova-spark if template not found
}

// Template-specific HTML structure
const getTemplateStructure = (
  templateId,
  personalInfo,
  skills,
  projects,
  socialLinks,
  education,
  experience,
  testimonials,
) => {
  // Convert image data to base64 if it exists
  const profileImage = personalInfo.profileImage

  // Helper function to create social icons
  const getSocialIcon = (platform) => {
    const icons = {
      github: "fa-brands fa-github",
      linkedin: "fa-brands fa-linkedin",
      twitter: "fa-brands fa-twitter",
      website: "fa-solid fa-globe",
      instagram: "fa-brands fa-instagram",
      facebook: "fa-brands fa-facebook",
      youtube: "fa-brands fa-youtube",
      dribbble: "fa-brands fa-dribbble",
      behance: "fa-brands fa-behance",
    }

    return icons[platform] || "fa-solid fa-link"
  }

  // Create social links HTML
  const socialLinksHTML = Object.entries(socialLinks)
    .filter(([_, url]) => url)
    .map(([platform, url]) => {
      const baseClasses = "social-link"
      let templateClasses = ""

      switch (templateId) {
        case "nova-spark":
          templateClasses =
            "w-14 h-14 flex items-center justify-center rounded-full bg-gray-900 border border-purple-500/30 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 shadow-lg shadow-purple-500/10 hover:shadow-cyan-500/20 transition-all"
          break
        case "bloom-craft":
          templateClasses =
            "w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
          break
        case "mono-grid":
          templateClasses = "text-gray-600 hover:text-lime-500 transition-colors"
          break
        case "gradient-flow":
          templateClasses =
            "w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-purple-600 transition-colors"
          break
        case "tech-aura":
          templateClasses = "flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
          break
       
        default:
          templateClasses = "text-gray-600 hover:text-gray-900"
      }

      return `
        <a href="${url}" target="_blank" rel="noopener noreferrer" 
           class="${baseClasses} ${templateClasses}">
          <i class="${getSocialIcon(platform)}"></i>
          ${templateId === "professional" || templateId === "tech-aura" ? `<span class="ml-2 capitalize">${platform}</span>` : ""}
        </a>
      `
    })
    .join("")

  // Create skills HTML
  const skillsHTML = skills
    .map((skill, index) => {
      let skillClass = ""
      const skillLevel = typeof skill === "object" && skill.level ? skill.level : 75
      const skillName = typeof skill === "object" && skill.name ? skill.name : skill

      switch (templateId) {
        case "nova-spark":
          return `
            <div class="mb-6 animate-on-scroll" style="transition-delay: ${index * 50}ms">
              <div class="flex justify-between mb-2">
                <span class="font-medium text-gray-300">${skillName}</span>
                <span class="text-cyan-400">${skillLevel}%</span>
              </div>
              <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div class="skill-bar h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" data-level="${skillLevel}" style="width: 0%"></div>
              </div>
            </div>
          `
        case "bloom-craft":
          skillClass = "px-6 py-3 bg-white rounded-full shadow-md text-gray-800 border border-pink-200"
          break
        case "mono-grid":
          return `
            <div class="p-6 border border-gray-200 hover:border-lime-500 group transition-colors animate-on-scroll" style="transition-delay: ${index * 50}ms">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold group-hover:text-lime-500 transition-colors">${skillName}</h3>
                <span class="text-sm text-gray-500">${skillLevel}%</span>
              </div>
              <div class="w-full h-1 bg-gray-200">
                <div class="h-full bg-lime-500 skill-bar" data-level="${skillLevel}" style="width: 0%"></div>
              </div>
            </div>
          `
        case "gradient-flow":
          return `
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-on-scroll" style="transition-delay: ${index * 50}ms">
              <h3 class="font-bold text-white mb-2">${skillName}</h3>
              <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div class="h-full bg-white skill-bar" data-level="${skillLevel}" style="width: 0%"></div>
              </div>
              <div class="text-right mt-1">
                <span class="text-sm text-white/70">${skillLevel}%</span>
              </div>
            </div>
          `
        case "tech-aura":
          return `
            <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm animate-on-scroll" style="transition-delay: ${index * 50}ms">
              ${skillName}
            </span>
          `
        
        default:
          skillClass = "px-3 py-1 bg-gray-100 rounded-full"
      }

      return `
        <span class="skill-item ${skillClass} animate-on-scroll" style="transition-delay: ${index * 50}ms">
          ${skillName}
        </span>
      `
    })
    .join("")

  // Create projects HTML
  const projectsHTML = projects
    .map((project, index) => {
      const projectImage = project.image
        ? `<div class="${templateId === "creative" || templateId === "modern" || templateId === "bloom-craft" || templateId === "gradient-flow" ? "h-56" : "h-48"} overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
        </div>`
        : templateId === "modern"
          ? `<div class="h-48 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30"></div>`
          : ""

      let projectClass = ""
      let titleClass = ""
      let descClass = ""
      let linkClass = ""

      switch (templateId) {
        case "nova-spark":
          projectClass =
            "bg-gray-900 rounded-xl overflow-hidden border border-purple-500/20 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/20 transition-all"
          titleClass = "text-xl font-bold mb-2 text-cyan-400"
          descClass = "text-gray-400 mb-4"
          linkClass = "inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium"
          break
        case "bloom-craft":
          projectClass = "bg-white rounded-lg overflow-hidden shadow-lg"
          titleClass = "text-xl font-bold mb-2 text-gray-800"
          descClass = "text-gray-600 mb-4"
          linkClass = "inline-flex items-center gap-1 text-pink-500 hover:text-pink-600 font-medium"
          break
        case "mono-grid":
          return `
            <div class="group animate-on-scroll" style="transition-delay: ${index * 100}ms">
              <div class="overflow-hidden">
                ${
                  project.image
                    ? `<img src="${project.image}" alt="${project.title}" class="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105">`
                    : `<div class="w-full aspect-video bg-gray-200"></div>`
                }
              </div>
              <div class="p-6 border border-t-0 border-gray-200 group-hover:border-lime-500 transition-colors">
                <h3 class="text-xl font-bold mb-2 group-hover:text-lime-500 transition-colors">${project.title}</h3>
                <p class="text-gray-600 mb-4">${project.description}</p>
                ${
                  project.link
                    ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-black hover:text-lime-500 transition-colors font-medium">
                    View Project <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i>
                  </a>`
                    : ""
                }
              </div>
            </div>
          `
        case "gradient-flow":
          projectClass =
            "min-w-[300px] md:min-w-[350px] bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 flex-shrink-0"
          titleClass = "text-xl font-bold mb-2 text-white"
          descClass = "text-white/70 mb-4"
          linkClass = "inline-flex items-center gap-1 text-cyan-300 hover:text-white transition-colors"
          break
        case "tech-aura":
          projectClass = "bg-white rounded-lg shadow-lg overflow-hidden"
          titleClass = "text-xl font-bold mb-2 text-gray-900"
          descClass = "text-gray-600 mb-4"
          linkClass = "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
          break
          break
        default:
          projectClass = "bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md"
          titleClass = "text-xl font-semibold mb-2"
          descClass = "text-gray-700 dark:text-gray-300 mb-4"
          linkClass = "inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800"
      }

      if (templateId === "professional") {
        return `
          <div class="project-item animate-on-scroll ${projectClass}" style="transition-delay: ${index * 100}ms">
            <div class="flex flex-col md:flex-row">
              ${
                project.image
                  ? `<div class="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                    </div>`
                  : ""
              }
              <div class="p-6 md:w-2/3">
                <h3 class="${titleClass}">${project.title}</h3>
                <p class="${descClass}">${project.description}</p>
                ${
                  project.link
                    ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" 
                        class="${linkClass}">
                      View Project <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i>
                    </a>`
                    : ""
                }
              </div>
            </div>
          </div>
        `
      }

      return `
        <div class="project-item animate-on-scroll ${projectClass}" style="transition-delay: ${index * 100}ms">
          ${projectImage}
          <div class="p-6">
            <h3 class="${titleClass}">${project.title}</h3>
            <p class="${descClass}">${project.description}</p>
            ${
              project.link
                ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" 
                    class="${linkClass}">
                  View Project <i class="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i>
                </a>`
                : ""
            }
          </div>
        </div>
      `
    })
    .join("")

  // Create education HTML if available
  const educationHTML =
    education && education.length > 0
      ? education
          .map((item, index) => {
            let itemClass = ""
            let titleClass = ""
            let subtitleClass = ""
            let dateClass = ""
            let descClass = ""

            switch (templateId) {
              case "nova-spark":
                return `
              <div class="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-purple-500/30 animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <div class="absolute left-0 top-0 w-2 h-2 rounded-full bg-purple-500 -translate-x-1/2"></div>
                <h4 class="text-lg font-semibold">${item.degree}</h4>
                <p class="text-cyan-400 text-sm mb-1">${item.institution}</p>
                <p class="text-gray-500 text-sm mb-2">${item.year}</p>
                <p class="text-gray-400">${item.description || ""}</p>
              </div>
            `
              case "bloom-craft":
                return `
              <div class="mb-12 relative animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <div class="absolute -left-12 top-0 w-6 h-6 rounded-full bg-pink-100 border-2 border-pink-400 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-pink-500"></div>
                </div>
                <div class="bg-pink-50 rounded-lg p-6 shadow-md">
                  <span class="text-sm text-pink-500 font-medium">${item.year}</span>
                  <h3 class="text-xl font-bold text-gray-800 mt-1">${item.degree}</h3>
                  <p class="text-indigo-600 mb-2">${item.institution}</p>
                  <p class="text-gray-600">${item.description || ""}</p>
                </div>
              </div>
            `
              case "mono-grid":
                return `
              <div class="border-l-2 border-lime-500 pl-4 animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <h4 class="font-bold">${item.degree}</h4>
                <p class="text-gray-600">${item.institution}</p>
                <p class="text-sm text-gray-500">${item.year}</p>
                ${item.description ? `<p class="text-gray-600 mt-1">${item.description}</p>` : ""}
              </div>
            `
              case "gradient-flow":
                return `
              <div class="bg-white/10 rounded-xl p-4 border border-white/20 animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <h4 class="font-bold text-white">${item.degree}</h4>
                <p class="text-white/70">${item.institution}</p>
                <p class="text-sm text-white/50">${item.year}</p>
                ${item.description ? `<p class="text-white/70 mt-2">${item.description}</p>` : ""}
              </div>
            `
              case "tech-aura":
                return `
              <div class="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r-lg animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <h3 class="text-lg font-bold text-gray-900">${item.degree}</h3>
                <p class="text-blue-600">${item.institution}</p>
                <p class="text-gray-500 text-sm">${item.year}</p>
                ${item.description ? `<p class="text-gray-600 mt-2">${item.description}</p>` : ""}
              </div>
            `
              default:
                itemClass = "mb-4 pb-4 border-b border-gray-200 dark:border-gray-700"
                titleClass = "text-lg font-semibold"
                subtitleClass = "text-gray-600 dark:text-gray-400"
                dateClass = "text-sm text-gray-500 dark:text-gray-500"
                descClass = "text-gray-600 dark:text-gray-400 mt-2"
            }

            return `
          <div class="${itemClass} animate-on-scroll" style="transition-delay: ${index * 100}ms">
            <h4 class="${titleClass}">${item.degree}</h4>
            <p class="${subtitleClass}">${item.institution}</p>
            <p class="${dateClass}">${item.year}</p>
            ${item.description ? `<p class="${descClass}">${item.description}</p>` : ""}
          </div>
        `
          })
          .join("")
      : ""

  // Create experience HTML if available
  const experienceHTML =
    experience && experience.length > 0
      ? experience
          .map((item, index) => {
            let itemClass = ""
            let titleClass = ""
            let subtitleClass = ""
            let dateClass = ""
            let descClass = ""

            switch (templateId) {
              case "nova-spark":
                return `
              <div class="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-purple-500/30 animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <div class="absolute left-0 top-0 w-2 h-2 rounded-full bg-purple-500 -translate-x-1/2"></div>
                <h4 class="text-lg font-semibold">${item.position}</h4>
                <p class="text-cyan-400 text-sm mb-1">${item.company}</p>
                <p class="text-gray-500 text-sm mb-2">${item.year}</p>
                <p class="text-gray-400">${item.description || ""}</p>
              </div>
            `
              case "bloom-craft":
                return `
              <div class="mb-12 relative animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <div class="absolute -left-12 top-0 w-6 h-6 rounded-full bg-indigo-100 border-2 border-indigo-400 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                </div>
                <div class="bg-indigo-50 rounded-lg p-6 shadow-md">
                  <span class="text-sm text-indigo-500 font-medium">${item.year}</span>
                  <h3 class="text-xl font-bold text-gray-800 mt-1">${item.position}</h3>
                  <p class="text-pink-600 mb-2">${item.company}</p>
                  <p class="text-gray-600">${item.description || ""}</p>
                </div>
              </div>
            `
              case "mono-grid":
                return `
              <div class="border-l-2 border-lime-500 pl-4 animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <h4 class="font-bold">${item.position}</h4>
                <p class="text-gray-600">${item.company}</p>
                <p class="text-sm text-gray-500">${item.year}</p>
                ${item.description ? `<p class="text-gray-600 mt-1">${item.description}</p>` : ""}
              </div>
            `
              case "gradient-flow":
                return `
              <div class="bg-white/10 rounded-xl p-4 border border-white/20 animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <h4 class="font-bold text-white">${item.position}</h4>
                <p class="text-white/70">${item.company}</p>
                <p class="text-sm text-white/50">${item.year}</p>
                ${item.description ? `<p class="text-white/70 mt-2">${item.description}</p>` : ""}
              </div>
            `
              case "tech-aura":
                return `
              <div class="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-r-lg animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <h3 class="text-lg font-bold text-gray-900">${item.position}</h3>
                <p class="text-blue-600">${item.company}</p>
                <p class="text-gray-500 text-sm">${item.year}</p>
                ${item.description ? `<p class="text-gray-600 mt-2">${item.description}</p>` : ""}
              </div>
            `
              default:
                itemClass = "mb-4 pb-4 border-b border-gray-200 dark:border-gray-700"
                titleClass = "text-lg font-semibold"
                subtitleClass = "text-gray-600 dark:text-gray-400"
                dateClass = "text-sm text-gray-500 dark:text-gray-500"
                descClass = "text-gray-600 dark:text-gray-400 mt-2"
            }

            return `
          <div class="${itemClass} animate-on-scroll" style="transition-delay: ${index * 100}ms">
            <h4 class="${titleClass}">${item.position}</h4>
            <p class="${subtitleClass}">${item.company}</p>
            <p class="${dateClass}">${item.year}</p>
            ${item.description ? `<p class="${descClass}">${item.description}</p>` : ""}
          </div>
        `
          })
          .join("")
      : ""

  // Create testimonials HTML if available
  const testimonialsHTML =
    testimonials && testimonials.length > 0
      ? testimonials
          .map((testimonial, index) => {
            let itemClass = ""
            let quoteClass = ""
            let authorClass = ""
            let positionClass = ""

            switch (templateId) {
              case "nova-spark":
                return `
              <div class="bg-gray-900 rounded-xl p-6 border border-purple-500/20 shadow-lg shadow-purple-500/5 animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <div class="flex items-center mb-4">
                  ${
                    testimonial.image
                      ? `<div class="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img src="${testimonial.image}" alt="${testimonial.name}" class="w-full h-full object-cover">
                    </div>`
                      : `<div class="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                      <span class="text-purple-400 text-xl">"</span>
                    </div>`
                  }
                  <div>
                    <h4 class="font-semibold text-gray-300">${testimonial.name}</h4>
                    <p class="text-sm text-gray-500">${testimonial.position}</p>
                  </div>
                </div>
                <p class="text-gray-400 italic">"${testimonial.text}"</p>
              </div>
            `
              case "bloom-craft":
                return `
              <div class="bg-pink-50 rounded-lg p-6 shadow-md animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <div class="flex items-center mb-4">
                  ${
                    testimonial.image
                      ? `<div class="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-pink-200">
                      <img src="${testimonial.image}" alt="${testimonial.name}" class="w-full h-full object-cover">
                    </div>`
                      : `<div class="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center mr-4">
                      <span class="text-pink-500 text-xl">"</span>
                    </div>`
                  }
                  <div>
                    <h4 class="font-semibold text-gray-800">${testimonial.name}</h4>
                    <p class="text-sm text-indigo-600">${testimonial.position}</p>
                  </div>
                </div>
                <p class="text-gray-600 italic">"${testimonial.text}"</p>
              </div>
            `
              case "mono-grid":
                return `
              <div class="p-6 border border-gray-200 hover:border-lime-500 transition-colors animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <p class="text-gray-600 italic mb-6">"${testimonial.text}"</p>
                <div class="flex items-center">
                  ${
                    testimonial.image
                      ? `<div class="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img src="${testimonial.image}" alt="${testimonial.name}" class="w-full h-full object-cover">
                    </div>`
                      : `<div class="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>`
                  }
                  <div>
                    <h4 class="font-bold">${testimonial.name}</h4>
                    <p class="text-sm text-gray-500">${testimonial.position}</p>
                  </div>
                </div>
              </div>
            `
              case "gradient-flow":
                return `
              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-on-scroll" style="transition-delay: ${index * 100}ms">
                <div class="mb-4">
                  <svg class="w-8 h-8 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p class="text-white/80 italic mb-6">${testimonial.text}</p>
                <div class="flex items-center">
                  ${
                    testimonial.image
                      ? `<div class="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img src="${testimonial.image}" alt="${testimonial.name}" class="w-full h-full object-cover">
                    </div>`
                      : `<div class="w-12 h-12 rounded-full bg-white/20 mr-4"></div>`
                  }
                  <div>
                    <h4 class="font-semibold text-white">${testimonial.name}</h4>
                    <p class="text-sm text-white/60">${testimonial.position}</p>
                  </div>
                </div>
              </div>
            `
              case "tech-aura":
                if (index === 0) {
                  return `
                <div class="bg-blue-50 rounded-lg p-8 shadow-md animate-on-scroll" style="transition-delay: ${index * 100}ms">
                  <div class="mb-6">
                    <svg class="w-10 h-10 text-blue-300 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p class="text-gray-600 italic text-lg mb-6">${testimonial.text}</p>
                  <div class="flex items-center justify-center">
                    ${
                      testimonial.image
                        ? `<div class="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img src="${testimonial.image}" alt="${testimonial.name}" class="w-full h-full object-cover">
                      </div>`
                        : `<div class="w-12 h-12 rounded-full bg-blue-200 mr-4"></div>`
                    }
                    <div class="text-left">
                      <h4 class="font-bold text-gray-900">${testimonial.name}</h4>
                      <p class="text-sm text-gray-500">${testimonial.position}</p>
                    </div>
                  </div>
                </div>
              `
                }
                return ""
              default:
                itemClass = "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                quoteClass = "text-gray-600 dark:text-gray-300 italic mb-4"
                authorClass = "font-semibold text-gray-800 dark:text-gray-200"
                positionClass = "text-sm text-gray-500 dark:text-gray-400"
            }

            return `
          <div class="${itemClass} animate-on-scroll" style="transition-delay: ${index * 100}ms">
            <p class="${quoteClass}">"${testimonial.text}"</p>
            <div class="flex items-center">
              ${
                testimonial.image
                  ? `<div class="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img src="${testimonial.image}" alt="${testimonial.name}" class="w-full h-full object-cover">
                </div>`
                  : ""
              }
              <div>
                <h4 class="${authorClass}">${testimonial.name}</h4>
                <p class="${positionClass}">${testimonial.position}</p>
              </div>
            </div>
          </div>
        `
          })
          .join("")
      : ""

  // Template-specific structures
  const templates = {
    // Original templates
  

    // New templates
    "nova-spark": `
      <nav class="sticky top-0 z-40 backdrop-blur-md bg-gray-950/70 border-b border-purple-500/20">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
            NOVA
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="#home" class="text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Home
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#projects" class="text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Projects
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#skills" class="text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Skills
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" class="text-gray-300 hover:text-cyan-400 transition-colors relative group">
              Contact
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </nav>

      <section id="home" class="min-h-screen flex items-center relative overflow-hidden">
        <div class="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div class="text-center md:text-left">
            <h1 class="hero-title text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Hi, I'm ${personalInfo.name} – ${personalInfo.title}
            </h1>
            <p class="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl">${personalInfo.bio}</p>
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#projects" class="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-md border border-purple-500/50 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all">
                View Projects
              </a>
              <a href="#contact" class="px-6 py-3 bg-transparent border border-cyan-500/50 text-cyan-400 rounded-md shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all">
                Contact Me
              </a>
            </div>
          </div>
        </div>

        <div class="absolute top-1/4 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </section>

      <section id="projects" class="py-20 relative">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Featured Projects
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${projectsHTML}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" class="py-20 bg-gray-900/50">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Skills & Expertise
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              ${skillsHTML}
            </div>
          </div>
        </div>
      </section>

      ${
        education?.length > 0 || experience?.length > 0
          ? `
      <section class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Experience & Education
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              ${
                experience?.length > 0
                  ? `
              <div>
                <h3 class="text-xl font-bold mb-6 text-cyan-400">Work Experience</h3>
                <div class="space-y-8">
                  ${experienceHTML}
                </div>
              </div>
              `
                  : ""
              }

              ${
                education?.length > 0
                  ? `
              <div>
                <h3 class="text-xl font-bold mb-6 text-cyan-400">Education</h3>
                <div class="space-y-8">
                  ${educationHTML}
                </div>
              </div>
              `
                  : ""
              }
            </div>
          </div>
        </div>
      </section>
      `
          : ""
      }

      ${
        testimonials?.length > 0
          ? `
      <section class="py-20 bg-gray-900/50">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              What People Say
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${testimonialsHTML}
            </div>
          </div>
        </div>
      </section>
      `
          : ""
      }

      <section id="contact" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Get In Touch
            </h2>
            <div class="flex flex-wrap justify-center gap-6">
              ${socialLinksHTML}
            </div>
          </div>
        </div>
      </section>

      <footer class="py-8 border-t border-purple-500/20">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-gray-500">
            &copy; ${new Date().getFullYear()} ${personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    `,

    "bloom-craft": `
      <div class="flower absolute top-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 -z-10"></div>
      <div class="flower absolute top-60 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-30 -z-10"></div>
      <div class="flower absolute bottom-40 right-20 w-40 h-40 bg-pink-100 rounded-full opacity-30 -z-10"></div>
      <div class="flower absolute bottom-20 left-20 w-20 h-20 bg-indigo-100 rounded-full opacity-30 -z-10"></div>

      <nav class="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div class="max-w-6xl mx-auto px-6 py-4">
          <div class="flex justify-center space-x-10">
            <a href="#home" class="text-gray-700 hover:text-pink-500 transition-colors relative group">
              Home
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#about" class="text-gray-700 hover:text-pink-500 transition-colors relative group">
              About
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#portfolio" class="text-gray-700 hover:text-pink-500 transition-colors relative group">
              Portfolio
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" class="text-gray-700 hover:text-pink-500 transition-colors relative group">
              Contact
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </nav>

      <section id="home" class="min-h-screen flex items-center">
        <div class="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div class="flex flex-col md:flex-row items-center gap-12">
            ${
              profileImage
                ? `
            <div class="profile-image w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-xl">
              <img src="${profileImage}" alt="${personalInfo.name}" class="w-full h-full object-cover">
            </div>
            `
                : ""
            }

            <div class="text-center md:text-left">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                Hello, I'm <span class="text-pink-500">${personalInfo.name}</span>
              </h1>
              <h2 class="text-xl md:text-2xl text-indigo-600 mb-6">${personalInfo.title}</h2>
              <p class="text-gray-600 mb-8 max-w-xl leading-relaxed">${personalInfo.bio}</p>
              <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="#portfolio" class="px-6 py-3 bg-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-all">
                  View My Work
                </a>
                <a href="#contact" class="px-6 py-3 bg-white text-pink-500 border border-pink-500 rounded-full shadow-md hover:shadow-lg transition-all">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="py-20 bg-white/70">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-gray-800">
              About <span class="text-pink-500">Me</span>
            </h2>

            ${
              education?.length > 0 || experience?.length > 0
                ? `
            <div class="max-w-3xl mx-auto">
              <div class="relative border-l-2 border-indigo-200 pl-8 ml-4">
                ${educationHTML}
                ${experienceHTML}
              </div>
            </div>
            `
                : ""
            }

            <div class="mt-16">
              <h3 class="text-2xl font-bold mb-8 text-center text-gray-800">
                My <span class="text-pink-500">Skills</span>
              </h3>
              <div class="flex flex-wrap justify-center gap-4">
                ${skillsHTML}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-gray-800">
              My <span class="text-pink-500">Portfolio</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${projectsHTML}
            </div>
          </div>
        </div>
      </section>

      ${
        testimonials?.length > 0
          ? `
      <section class="py-20 bg-white/70">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-gray-800">
              Client <span class="text-pink-500">Testimonials</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${testimonialsHTML}
            </div>
          </div>
        </div>
      </section>
      `
          : ""
      }

      <section id="contact" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-gray-800">
              Get In <span class="text-pink-500">Touch</span>
            </h2>
            <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border border-pink-100">
              <div class="mb-8">
                <h3 class="text-xl font-bold mb-4 text-gray-800">Connect With Me</h3>
                <p class="text-gray-600 mb-6">
                  Feel free to reach out through any of these platforms. I'd love to hear from you!
                </p>
                <div class="flex flex-wrap justify-center gap-4">
                  ${socialLinksHTML}
                </div>
              </div>

              <div class="space-y-4">
                <div class="relative">
                  <input type="text" placeholder="Your Name" class="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors">
                  <div class="absolute -bottom-1 left-4 right-4 h-px bg-pink-300 opacity-50"></div>
                </div>

                <div class="relative">
                  <input type="email" placeholder="Your Email" class="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors">
                  <div class="absolute -bottom-1 left-4 right-4 h-px bg-pink-300 opacity-50"></div>
                </div>

                <div class="relative">
                  <textarea placeholder="Your Message" rows="4" class="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"></textarea>
                  <div class="absolute -bottom-1 left-4 right-4 h-px bg-pink-300 opacity-50"></div>
                </div>

                <button class="w-full py-3 bg-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="py-8 bg-white/80 border-t border-pink-200">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-gray-600">
            &copy; ${new Date().getFullYear()} ${personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    `,

    "mono-grid": `
      <nav class="fixed top-0 right-0 z-40 p-6">
        <button class="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white rounded-full shadow-md focus:outline-none">
          <span class="w-6 h-0.5 bg-black"></span>
          <span class="w-6 h-0.5 bg-black"></span>
          <span class="w-6 h-0.5 bg-black"></span>
        </button>
      </nav>

      <section id="home" class="min-h-screen flex items-center">
        <div class="max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
          <div class="text-center md:text-left">
            <h1 class="text-6xl md:text-8xl font-bold mb-8 text-reveal overflow-hidden">
              HELLO, I'M
              <br />
              ${personalInfo.name.toUpperCase()}
            </h1>
            <h2 class="text-xl md:text-2xl text-lime-500 mb-8">${personalInfo.title}</h2>
           
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#projects" class="px-8 py-3 bg-black text-white hover:bg-lime-500 transition-colors">
                View Projects
              </a>
              <a href="#contact" class="px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition-colors">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-4xl font-bold mb-16 text-reveal overflow-hidden">ABOUT</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p class="text-gray-600 mb-8 leading-relaxed">${personalInfo.bio}</p>

                ${
                  education?.length > 0 || experience?.length > 0
                    ? `
                <div class="space-y-8">
                  ${
                    education?.length > 0
                      ? `
                  <div>
                    <h3 class="text-xl font-bold mb-4">Education</h3>
                    <div class="space-y-4">
                      ${educationHTML}
                    </div>
                  </div>
                  `
                      : ""
                  }

                  ${
                    experience?.length > 0
                      ? `
                  <div class="mt-8">
                    <h3 class="text-xl font-bold mb-4">Experience</h3>
                    <div class="space-y-4">
                      ${experienceHTML}
                    </div>
                  </div>
                  `
                      : ""
                  }
                </div>
                `
                    : ""
                }
              </div>

              <div>
                ${
                  profileImage
                    ? `
                <div class="aspect-square overflow-hidden">
                  <img src="${profileImage}" alt="${personalInfo.name}" class="w-full h-full object-cover">
                </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-4xl font-bold mb-16 text-reveal overflow-hidden">SKILLS</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${skillsHTML}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-4xl font-bold mb-16 text-reveal overflow-hidden">PROJECTS</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              ${projectsHTML}
            </div>
          </div>
        </div>
      </section>

      ${
        testimonials?.length > 0
          ? `
      <section class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-4xl font-bold mb-16 text-reveal overflow-hidden">TESTIMONIALS</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              ${testimonialsHTML}
            </div>
          </div>
        </div>
      </section>
      `
          : ""
      }

      <section id="contact" class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-4xl font-bold mb-16 text-reveal overflow-hidden">CONTACT</h2>

            <div class="max-w-xl mx-auto">
              <div class="mb-12">
                <p class="text-gray-600 mb-8 text-center">
                  Interested in working together? Feel free to reach out through any of these platforms.
                </p>
                <div class="flex justify-center gap-6">
                  ${socialLinksHTML}
                </div>
              </div>

              <form class="space-y-6">
                <div>
                  <input type="text" placeholder="Your Name" class="w-full p-4 border border-gray-200 focus:border-lime-500 outline-none transition-colors">
                </div>
                <div>
                  <input type="email" placeholder="Your Email" class="w-full p-4 border border-gray-200 focus:border-lime-500 outline-none transition-colors">
                </div>
                <div>
                  <textarea placeholder="Your Message" rows="5" class="w-full p-4 border border-gray-200 focus:border-lime-500 outline-none transition-colors"></textarea>
                </div>
                <button type="submit" class="w-full py-4 bg-black text-white hover:bg-lime-500 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer class="py-8 border-t border-gray-200">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-gray-600">
            &copy; ${new Date().getFullYear()} ${personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    `,

    "gradient-flow": `
      <nav class="sticky top-0 z-40 backdrop-blur-md bg-white/10">
        <div class="max-w-6xl mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <div class="text-xl font-bold text-white">FLOW</div>
            <div class="hidden md:flex space-x-8">
              <a href="#home" class="text-white hover:text-cyan-300 transition-colors relative group">
                Home
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
              <a href="#about" class="text-white hover:text-cyan-300 transition-colors relative group">
                About
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
              <a href="#projects" class="text-white hover:text-cyan-300 transition-colors relative group">
                Projects
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
              <a href="#skills" class="text-white hover:text-cyan-300 transition-colors relative group">
                Skills
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
              <a href="#contact" class="text-white hover:text-cyan-300 transition-colors relative group">
                Contact
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" class="min-h-screen flex items-center relative z-10">
        <div class="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 text-white text-reveal">Hi, I'm ${personalInfo.name}</h1>
            <h2 class="text-xl md:text-2xl text-white/80 mb-8">${personalInfo.title}</h2>
            <p class="text-white/70 mb-12 max-w-2xl mx-auto">${personalInfo.bio}</p>
            <div class="flex flex-wrap gap-4 justify-center">
              <a href="#projects" class="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 hover:bg-white/30 transition-all">
                View My Work
              </a>
              <a href="#contact" class="px-8 py-4 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-all">
                Contact Me
              </a>
            </div>
          </div>
        </div>

        <div class="absolute bottom-10 left-0 right-0 flex justify-center">
          <div class="flex gap-4">
            ${["✨", "🚀", "💻", "🎨", "🔮", "⚡", "🌈", "💡"].map((emoji, index) => `<span key="${index}" class="text-3xl">${emoji}</span>`).join("")}
          </div>
        </div>
      </section>

      <section id="about" class="py-20 relative z-10">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white text-reveal">About Me</h2>

            <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p class="text-white/80 mb-8 leading-relaxed">${personalInfo.bio}</p>

                  ${
                    education?.length > 0 || experience?.length > 0
                      ? `
                  <div class="space-y-8">
                    ${
                      education?.length > 0
                        ? `
                    <div>
                      <h3 class="text-xl font-bold mb-4 text-white">Education</h3>
                      <div class="space-y-4">
                        ${educationHTML}
                      </div>
                    </div>
                    `
                        : ""
                    }

                    ${
                      experience?.length > 0
                        ? `
                    <div>
                      <h3 class="text-xl font-bold mb-4 text-white">Experience</h3>
                      <div class="space-y-4">
                        ${experienceHTML}
                      </div>
                    </div>
                    `
                        : ""
                    }
                  </div>
                  `
                      : ""
                  }
                </div>

                <div class="flex items-center justify-center">
                  ${
                    profileImage
                      ? `
                  <div class="w-64 h-64 rounded-full overflow-hidden border-4 border-white/30">
                    <img src="${profileImage}" alt="${personalInfo.name}" class="w-full h-full object-cover">
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" class="py-20 relative z-10">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white text-reveal">My Skills</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              ${skillsHTML}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="py-20 relative z-10">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white text-reveal">My Projects</h2>

            <div class="overflow-hidden">
              <div class="flex gap-6">
                ${projectsHTML}
              </div>
            </div>
          </div>
        </div>
      </section>

      ${
        testimonials?.length > 0
          ? `
      <section class="py-20 relative z-10">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white text-reveal">What People Say</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${testimonialsHTML}
            </div>
          </div>
        </div>
      </section>
      `
          : ""
      }

      <section id="contact" class="py-20 relative z-10">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white text-reveal">Get In Touch</h2>

            <div class="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div class="mb-8">
                <p class="text-white/80 text-center mb-6">
                  Feel free to reach out through any of these platforms or send me a message directly.
                </p>
                <div class="flex justify-center gap-4">
                  ${socialLinksHTML}
                </div>
              </div>

              <form class="space-y-4">
                <div>
                  <input type="text" placeholder="Your Name" class="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/50">
                </div>
                <div>
                  <input type="email" placeholder="Your Email" class="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/50">
                </div>
                <div>
                  <textarea placeholder="Your Message" rows="4" class="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/50"></textarea>
                </div>
                <button type="submit" class="w-full py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-opacity-90 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer class="py-8 border-t border-white/20 relative z-10">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-white/60">
            &copy; ${new Date().getFullYear()} ${personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    `,

   "tech-aura": `
      <nav class="sticky top-0 z-40 backdrop-blur-lg bg-white/20 shadow-lg">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="font-serif font-bold text-white text-2xl">
            ${personalInfo.name.split(" ").map((name) => name[0]).join("")}
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="#home" class="text-white hover:text-yellow-300 transition-colors">Home</a>
            <a href="#about" class="text-white hover:text-yellow-300 transition-colors">About</a>
            <a href="#projects" class="text-white hover:text-yellow-300 transition-colors">Projects</a>
            <a href="#testimonials" class="text-white hover:text-yellow-300 transition-colors">Testimonials</a>
            <a href="#contact" class="text-white hover:text-yellow-300 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <section id="home" class="min-h-screen flex items-center">
        <div class="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div class="text-center md:text-left">
              <h1 class="text-4xl md:text-5xl font-bold mb-4 text-white">
                Hello, I'm <span class="text-yellow-300">${personalInfo.name}</span>
              </h1>
              <h2 class="text-xl md:text-2xl text-white mb-6">${personalInfo.title}</h2>
              <p class="text-white mb-8 max-w-xl">${personalInfo.bio}</p>
              <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="#projects" class="px-6 py-3 bg-yellow-300 text-blue-700 rounded shadow-md hover:bg-yellow-400 transition-colors">
                  View Projects
                </a>
                <a href="#contact" class="px-6 py-3 bg-white text-blue-700 border border-white rounded shadow-md hover:bg-gray-100 transition-colors">
                  Contact Me
                </a>
              </div>
            </div>
            <div class="flex justify-center md:justify-end">
              ${profileImage ? `<div class="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img src="${profileImage}" alt="${personalInfo.name}" class="w-full h-full object-cover">
              </div>` : ""}
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="py-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg mx-4">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white">
              About <span class="text-yellow-300">Me</span>
            </h2>
            <div class="bg-white bg-opacity-20 rounded-lg shadow-lg p-8">
              <div class="flex border-b border-white/30 mb-6">
                <button class="px-4 py-2 font-medium text-yellow-300 border-b-2 border-yellow-300 tab-button active" data-tab="profile">
                  Profile
                </button>
                ${education?.length > 0 ? `<button class="px-4 py-2 font-medium text-white hover:text-yellow-300 tab-button" data-tab="education">
                  Education
                </button>` : ""}
                ${experience?.length > 0 ? `<button class="px-4 py-2 font-medium text-white hover:text-yellow-300 tab-button" data-tab="career">
                  Career
                </button>` : ""}
              </div>
              <div id="profile" class="tab-content active">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 class="text-xl font-bold mb-4 text-white">Personal Information</h3>
                    <p class="text-white mb-6 leading-relaxed">${personalInfo.bio}</p>
                    <div class="flex flex-wrap gap-3">
                      ${skillsHTML}
                    </div>
                  </div>
                  <div>
                    ${profileImage ? `<div class="rounded-full overflow-hidden shadow-md">
                      <img src="${profileImage}" alt="${personalInfo.name}" class="w-full h-auto">
                    </div>` : ""}
                  </div>
                </div>
              </div>
              ${education?.length > 0 ? `<div id="education" class="tab-content hidden space-y-6">
                ${educationHTML}
              </div>` : ""}
              ${experience?.length > 0 ? `<div id="career" class="tab-content hidden space-y-6">
                ${experienceHTML}
              </div>` : ""}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white">
              My <span class="text-yellow-300">Projects</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${projectsHTML}
            </div>
          </div>
        </div>
      </section>

      ${testimonials?.length > 0 ? `
      <section id="testimonials" class="py-20 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg mx-4">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white">
              Client <span class="text-yellow-300">Testimonials</span>
            </h2>
            <div class="max-w-3xl mx-auto relative">
              ${testimonialsHTML}
            </div>
          </div>
        </div>
      </section>
      ` : ""}
      <section id="contact" class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <div class="animate-section">
            <h2 class="text-3xl font-bold mb-12 text-center text-white">
              Get In <span class="text-yellow-300">Touch</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div class="bg-white rounded-lg shadow-lg p-8">
                <h3 class="text-xl font-bold mb-6 text-white">Send Me a Message</h3>
                <form class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-white mb-1">
                      Your Name
                    </label>
                    <input type="text" id="name" placeholder="John Doe" class="w-full p-3 border border-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent">
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-white mb-1">
                      Your Email
                    </label>
                    <input type="email" id="email" placeholder="john@example.com" class="w-full p-3 border border-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent">
                  </div>
                  <div>
                    <label for="message" class="block text-sm font-medium text-white mb-1">
                      Your Message
                    </label>
                    <textarea id="message" placeholder="How can I help you?" rows="5" class="w-full p-3 border border-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"></textarea>
                  </div>
                  <a href="mailto:contact@example.com" class="inline-block px-6 py-3 bg-yellow-300 text-blue-700 rounded shadow-md hover:bg-yellow-400 transition-colors">
                    Email Me
                  </a>
                </form>
              </div>
              <div>
                <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h3 class="text-xl font-bold mb-6 text-white">Connect With Me</h3>
                  <div class="space-y-4">
                    ${socialLinksHTML}
                  </div>
                </div>
                <div class="bg-yellow-300 rounded-lg shadow-lg p-8 text-blue-700">
                  <h3 class="text-xl font-bold mb-6">Let's Work Together</h3>
                  <p class="mb-6">
                    I'm currently available for freelance work. If you have a project that you want to get started,
                    think you need my help with something or just fancy saying hello, then get in touch.
                  </p>
                  <a href="mailto:contact@example.com" class="inline-block px-6 py-3 bg-white text-blue-600 rounded font-medium hover:bg-blue-50 transition-colors">
                    Email Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="py-8 bg-white bg-opacity-20 border-t border-white/30">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <p class="text-white">
            &copy; ${new Date().getFullYear()} ${personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    `,
  }

  return templates[templateId] || templates["nova-spark"] // Default to nova-spark if template not found
}
