// Dummy data for template previews
export const getDummyData = () => {
  return {
    personalInfo: {
      name: "RICHA CHADDA",
      title: "Full Stack Developer",
      bio: "Passionate developer with 5+ years of experience building web applications. Specialized in React, Node.js, and modern JavaScript frameworks.",
      profileImage: "/placeholder.svg?height=300&width=300",
    },
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "GraphQL", level: 70 },
      { name: "MongoDB", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "AWS", level: 65 },
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
        link: "https://example.com/project1",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Task Management App",
        description:
          "A collaborative task management application with real-time updates, team workspaces, and progress tracking.",
        link: "https://example.com/project2",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Weather Dashboard",
        description:
          "An interactive weather dashboard that displays current conditions and forecasts for multiple locations.",
        link: "https://example.com/project3",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    socialLinks: {
      github: "https://github.com/parul",
      linkedin: "https://linkedin.com/in/parul",
      twitter: "https://twitter.com/parul",
      website: "https://parul.dev",
    },
    testimonials: [
      {
        name: "Sarah Williams",
        position: "Product Manager at TechCorp",
        text: "Parul delivered an exceptional product that exceeded our expectations. Their technical skills and attention to detail are outstanding.",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Mini Chen",
        position: "CTO at StartupX",
        text: "Working with Parul was a pleasure. They quickly understood our requirements and delivered a high-quality solution on time.",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Emily Rodriguez",
        position: "Frontend Lead at DesignHub",
        text: "Parul's code is clean, well-documented, and follows best practices. They're a valuable asset to any development team.",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    education: [
      {
        degree: "Master of Computer Science",
        institution: "Stanford University",
        year: "2018-2020",
        description: "Specialized in Artificial Intelligence and Machine Learning",
      },
      {
        degree: "Bachelor of Science in Software Engineering",
        institution: "MIT",
        year: "2014-2018",
        description: "Graduated with honors, GPA 3.8/4.0",
      },
    ],
    experience: [
      {
        position: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        year: "2020-Present",
        description: "Lead developer for the company's main product, managing a team of 5 developers.",
      },
      {
        position: "Full Stack Developer",
        company: "StartupX",
        year: "2018-2020",
        description: "Developed and maintained multiple web applications using React and Node.js.",
      },
      {
        position: "Junior Developer",
        company: "CodeLabs",
        year: "2016-2018",
        description: "Worked on frontend development using HTML, CSS, and JavaScript.",
      },
    ],
  };
};
