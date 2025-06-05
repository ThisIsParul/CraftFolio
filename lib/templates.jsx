export const templates = [
  {
    id: "nova-spark",
    name: "Nova Spark",
    description: "Futuristic developer portfolio with neon accents",
    previewClass: "bg-gray-950 p-6",
    preview: (
      <div className="h-full flex flex-col">
        <div className="h-10 border-b border-purple-500/30 mb-4 flex items-center justify-between">
          <div className="text-purple-400 font-bold">Nova</div>
          <div className="flex gap-3">
            <div className="h-2 w-12 bg-purple-500/50 rounded-full"></div>
            <div className="h-2 w-12 bg-purple-500/50 rounded-full"></div>
            <div className="h-2 w-12 bg-purple-500/50 rounded-full"></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-5 w-48 bg-cyan-500/30 rounded mx-auto mb-2"></div>
            <div className="h-3 w-32 bg-purple-500/30 rounded mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg"></div>
          <div className="h-12 bg-cyan-500/20 border border-cyan-500/30 rounded-lg"></div>
          <div className="h-12 bg-purple-500/20 border border-purple-500/30 rounded-lg"></div>
        </div>
      </div>
    ),
  },
  {
    id: "bloom-craft",
    name: "BloomCraft",
    description: "Soft pastel portfolio for designers",
    previewClass: "bg-gradient-to-br from-pink-200 via-white to-indigo-100 p-6",
    preview: (
      <div className="h-full flex flex-col">
        <div className="h-10 flex justify-center gap-6 mb-4">
          <div className="h-2 w-12 bg-pink-400/50 rounded-full"></div>
          <div className="h-2 w-12 bg-indigo-400/50 rounded-full"></div>
          <div className="h-2 w-12 bg-pink-400/50 rounded-full"></div>
        </div>
        <div className="flex-1 flex">
          <div className="w-1/3 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-pink-300/50"></div>
          </div>
          <div className="w-2/3 flex flex-col justify-center">
            <div className="h-4 w-32 bg-indigo-300/50 rounded mb-2"></div>
            <div className="h-2 w-48 bg-pink-300/50 rounded mb-1"></div>
            <div className="h-2 w-40 bg-pink-300/50 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="h-12 bg-white/70 rounded-lg shadow-sm"></div>
          <div className="h-12 bg-white/70 rounded-lg shadow-sm"></div>
          <div className="h-12 bg-white/70 rounded-lg shadow-sm"></div>
        </div>
      </div>
    ),
  },
  {
    id: "mono-grid",
    name: "MonoGrid",
    description: "Clean, minimalist developer portfolio",
    previewClass: "bg-white p-6",
    preview: (
      <div className="h-full flex flex-col">
        <div className="h-10 flex justify-between mb-4">
          <div></div>
          <div className="flex flex-col gap-1">
            <div className="h-1 w-6 bg-black rounded-full"></div>
            <div className="h-1 w-6 bg-black rounded-full"></div>
            <div className="h-1 w-6 bg-black rounded-full"></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-6 w-48 bg-black rounded mx-auto mb-2"></div>
            <div className="h-3 w-32 bg-lime-500 rounded mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="h-16 border border-gray-200 rounded-lg"></div>
          <div className="h-16 border border-gray-200 rounded-lg"></div>
        </div>
      </div>
    ),
  },
  {
    id: "gradient-flow",
    name: "GradientFlow",
    description: "Animated gradient, vibrant portfolio",
    previewClass: "bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-500 p-6",
    preview: (
      <div className="h-full flex flex-col">
        <div className="h-10 flex justify-between mb-4">
          <div className="text-white font-bold">FLOW</div>
          <div className="flex gap-3">
            <div className="h-2 w-12 bg-white/50 rounded-full"></div>
            <div className="h-2 w-12 bg-white/50 rounded-full"></div>
            <div className="h-2 w-12 bg-white/50 rounded-full"></div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-5 w-48 bg-white/30 rounded-full mx-auto mb-2"></div>
            <div className="h-3 w-32 bg-white/30 rounded-full mx-auto"></div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 overflow-hidden">
          <div className="h-12 w-1/3 bg-white/20 rounded-xl"></div>
          <div className="h-12 w-1/3 bg-white/20 rounded-xl"></div>
          <div className="h-12 w-1/3 bg-white/20 rounded-xl"></div>
          <div className="h-12 w-1/3 bg-white/20 rounded-xl"></div>
        </div>
      </div>
    ),
  },
  {
    id: "tech-aura",
    name: "TechAura",
    description: "Professional corporate portfolio",
    previewClass: "bg-gradient-to-r from-gray-50 to-blue-50 p-6",
    preview: (
      <div className="h-full flex flex-col">
        <div className="h-10 backdrop-blur-sm bg-white/70 flex justify-between items-center px-2 mb-4 rounded">
          <div className="font-serif font-bold text-blue-900">TA</div>
          <div className="flex gap-3">
            <div className="h-2 w-10 bg-blue-900/20 rounded-full"></div>
            <div className="h-2 w-10 bg-blue-900/20 rounded-full"></div>
            <div className="h-2 w-10 bg-blue-900/20 rounded-full"></div>
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="w-1/2 flex flex-col justify-center">
            <div className="h-4 w-32 bg-blue-900/20 rounded mb-2"></div>
            <div className="h-2 w-48 bg-blue-900/10 rounded mb-1"></div>
            <div className="h-2 w-40 bg-blue-900/10 rounded mb-3"></div>
            <div className="h-8 w-24 bg-blue-600/20 rounded"></div>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-24 h-24 bg-blue-100 rounded-lg shadow-sm"></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="h-8 bg-white rounded shadow-sm"></div>
          <div className="h-8 bg-white rounded shadow-sm"></div>
          <div className="h-8 bg-white rounded shadow-sm"></div>
        </div>
      </div>
    ),
  },
 
]

export const getTemplateById = (id) => {
  return templates.find((template) => template.id === id) || templates[0]
}
