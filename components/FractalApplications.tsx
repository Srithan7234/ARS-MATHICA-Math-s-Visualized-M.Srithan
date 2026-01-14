
import React, { useState, useEffect } from 'react';
import { X, Globe, Cpu, Leaf, Stethoscope, Clapperboard, Microscope, HardHat, Info, Star, ArrowRight, Zap } from 'lucide-react';

interface ApplicationCardProps {
  icon: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  howItWorks: string;
  realExample: string;
  impact: string;
  funFact: string;
}

const CATEGORIES = [
  "🌟 All Applications",
  "📱 Technology",
  "🌿 Nature",
  "🏥 Medicine",
  "🎬 Entertainment",
  "🔬 Science",
  "🏗️ Engineering"
];

const APPLICATIONS: ApplicationCardProps[] = [
  {
    icon: "📡",
    title: "Smartphone Antennas",
    tagline: "The device in your pocket",
    category: "📱 Technology",
    description: "Fractal geometry allows antennas to be incredibly compact while receiving a vast range of frequencies.",
    howItWorks: "The repeating, self-similar patterns of a fractal antenna increase the effective length of the antenna within a tiny physical area.",
    realExample: "Used in almost every modern smartphone to handle 4G, 5G, Bluetooth, and WiFi simultaneously.",
    impact: "Revolutionized mobile tech by eliminating large external antennas while increasing reception quality.",
    funFact: "Fractal antennas are 'frequency independent,' meaning they can pick up signals across many bands without needing adjustment."
  },
  {
    icon: "🖼️",
    title: "Fractal Image Compression",
    tagline: "High-quality, tiny files",
    category: "📱 Technology",
    description: "Mathematical algorithms that treat parts of an image as self-similar transformations of other parts.",
    howItWorks: "Instead of storing pixels, the software stores the mathematical rules to reconstruct the image based on its internal patterns.",
    realExample: "Used in satellite imaging and early digital encyclopedias where storage was extremely limited.",
    impact: "Allowed for high-resolution images to be transmitted over slow connections during the early internet era.",
    funFact: "Unlike standard JPEG, fractal images don't 'pixelate' when zoomed; they reveal more calculated detail."
  },
  {
    icon: "📡",
    title: "5G Network Optimization",
    tagline: "Designing for massive connectivity",
    category: "📱 Technology",
    description: "Engineers use fractal modeling to determine the most efficient placement of small cell towers.",
    howItWorks: "Fractal patterns mimic the natural clustering of human activity, helping signal coverage match actual demand.",
    realExample: "Major telecom companies use fractal tiling to prevent signal 'dead zones' in dense urban centers.",
    impact: "Reduces power consumption and hardware costs while providing consistent high-speed data.",
    funFact: "The layout of 5G antennas often looks like a Sierpinski gasket to maximize signal interference cancellation."
  },
  {
    icon: "🌲",
    title: "Tree Branching Patterns",
    tagline: "Nature's structural blueprint",
    category: "🌿 Nature",
    description: "Trees use fractal branching to maximize surface area for photosynthesis with minimal resources.",
    howItWorks: "A simple genetic rule (branch once, split twice) repeats dozens of times to create complex forest canopies.",
    realExample: "Botanists use fractal dimension to measure forest density and predict carbon capture capabilities.",
    impact: "Helps scientists understand ecosystem health and design more efficient artificial solar collectors.",
    funFact: "If you flattened all the leaves of a large oak tree, they would cover several tennis courts!"
  },
  {
    icon: "🗾",
    title: "The Coastline Paradox",
    tagline: "Measuring the infinite",
    category: "🌿 Nature",
    description: "Coastlines are fractals, meaning their measured length increases as your ruler gets smaller.",
    howItWorks: "Because coastlines have infinite detail, measuring with a 1km ruler misses the nooks that a 1m ruler captures.",
    realExample: "Borders between countries (like Spain and Portugal) are often measured differently by each nation.",
    impact: "Essential for accurate mapping, maritime navigation, and territorial waters definition.",
    funFact: "Mathematically, the coastline of Great Britain is actually infinite if measured with infinitely small precision!"
  },
  {
    icon: "🧬",
    title: "Cancer Detection",
    tagline: "Mathematical early warning",
    category: "🏥 Medicine",
    description: "Healthy cells grow in predictable patterns, but cancerous cells often exhibit chaotic fractal growth.",
    howItWorks: "Doctors use 'Fractal Dimension' software to analyze biopsy images and detect abnormalities humans might miss.",
    realExample: "Used in mammography to differentiate between benign cysts and malignant tumors with 95%+ accuracy.",
    impact: "Enables much earlier diagnosis, significantly increasing survival rates for millions of patients.",
    funFact: "The 'roughness' of a mole's edge is a fractal measurement that helps predict melanoma."
  },
  {
    icon: "🫁",
    title: "Lung Physiology",
    tagline: "70 square meters in your chest",
    category: "🏥 Medicine",
    description: "Your lungs use fractal branching (the bronchial tree) to fit a massive oxygen-exchange surface into a small ribs cage.",
    howItWorks: "The airway splits roughly 23 times, ending in millions of tiny sacs called alveoli.",
    realExample: "Pulmonologists use fractal analysis to detect early-stage emphysema and asthma before symptoms appear.",
    impact: "Critical for understanding respiratory diseases and designing effective ventilators.",
    funFact: "The total surface area of your lungs is roughly the size of half a professional tennis court."
  },
  {
    icon: "🏔️",
    title: "CGI Terrain Generation",
    tagline: "Creating digital worlds",
    category: "🎬 Entertainment",
    description: "Almost every mountain, cloud, and forest in modern movies is a mathematical fractal.",
    howItWorks: "Artists use 'Perlin Noise' and recursive algorithms to generate infinite, realistic terrain without manual drawing.",
    realExample: "The mountains in 'Avatar' and the planet surfaces in 'Star Wars' are purely fractal-based.",
    impact: "Saves thousands of hours of manual labor and allows for hyper-realistic immersion.",
    funFact: "The first major use of fractal terrain was in the 1982 film 'Star Trek II: The Wrath of Khan' for the Genesis Effect."
  },
  {
    icon: "🎮",
    title: "Minecraft & Procedural Worlds",
    tagline: "Infinite exploration",
    category: "🎬 Entertainment",
    description: "Games use fractals to create billions of unique landforms that players can explore forever.",
    howItWorks: "A 'seed' number is fed into a fractal algorithm that calculates the height and biome of every single block.",
    realExample: "Games like 'No Man's Sky' use fractals to generate 18 quintillion unique planets.",
    impact: "Allows small indie teams to create massive, deep gaming experiences that last for years.",
    funFact: "Minecraft's world is technically larger than the surface of the Earth, all powered by one math equation."
  },
  {
    icon: "⛈️",
    title: "Weather Prediction",
    tagline: "Mastering the chaos",
    category: "🔬 Science",
    description: "The atmosphere is a chaotic fractal system where small changes lead to massive weather events.",
    howItWorks: "Meteorologists use 'Chaos Theory' (the study of fractal dynamics) to run thousands of parallel simulations.",
    realExample: "Modern hurricane tracking relies on understanding the fractal self-similarity of storm eddies.",
    impact: "Increases lead time for evacuation and saves thousands of lives every year during extreme weather.",
    funFact: "This is known as the 'Butterfly Effect'—the idea that a butterfly's wings could influence a tornado weeks later."
  },
  {
    icon: "🌌",
    title: "Galactic Clustering",
    tagline: "The structure of the universe",
    category: "🔬 Science",
    description: "Matter in the universe isn't spread evenly; it clusters in a massive, self-similar fractal web.",
    howItWorks: "Gravity pulls matter into filaments and voids that repeat their structural patterns at different cosmic scales.",
    realExample: "Astrophysicists use fractal dimension to map the 'Large Scale Structure' of the observable universe.",
    impact: "Helps us understand the Big Bang and the ultimate fate of all matter and energy.",
    funFact: "The distribution of galaxies looks remarkably like the neural pathways in a human brain."
  },
  {
    icon: "🏗️",
    title: "Fractal Architecture",
    tagline: "Buildings that breathe",
    category: "🏗️ Engineering",
    description: "Architects use fractal patterns to design buildings with better lighting, airflow, and structural integrity.",
    howItWorks: "By repeating geometric motifs, buildings can maximize shade while allowing breeze to pass through efficiently.",
    realExample: "The Eiffel Tower uses fractal trusses to stay incredibly lightweight yet withstand massive wind loads.",
    impact: "Leads to more sustainable, energy-efficient cities that harmonize with natural patterns.",
    funFact: "The ancient Hindu temples of Khajuraho are built as fractals, with smaller towers mimicking the main spire."
  }
];

const FUN_FACTS = [
  { icon: "📶", title: "Hidden Antennas", text: "Your phone doesn't have a visible antenna because it's a fractal pattern printed directly onto the circuit board inside." },
  { icon: "🥦", title: "Nature's Math", text: "Romanesco broccoli is a 'perfect' fractal. Every single floret is a miniature version of the entire head." },
  { icon: "📈", title: "Market Chaos", text: "Stock market charts are fractals. A 1-minute chart looks statistically identical to a 1-month chart." },
  { icon: "⚡", title: "Lightning Paths", text: "Lightning is a fractal 'dielectric breakdown.' It branches to find the path of least resistance to the ground." },
  { icon: "🫀", title: "The Heartbeat", text: "A healthy human heart rate isn't regular; it has a fractal 'complexity.' A perfectly regular beat often signal illness." },
  { icon: "🌍", title: "Infinite Coast", text: "If you measure a coastline with an infinitely small ruler, its length becomes infinite. This is the Coastline Paradox." }
];

export const FractalApplications: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState("🌟 All Applications");
  const [filteredApps, setFilteredApps] = useState(APPLICATIONS);

  useEffect(() => {
    if (activeCategory === "🌟 All Applications") {
      setFilteredApps(APPLICATIONS);
    } else {
      setFilteredApps(APPLICATIONS.filter(app => app.category === activeCategory));
    }
  }, [activeCategory]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col animate-in fade-in duration-300 overflow-hidden">
      {/* applications-header */}
      <header className="applications-header h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl shrink-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-teal-400 font-[Orbitron] flex items-center gap-3">
             <Globe size={28} /> FRACTALS IN THE REAL WORLD
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Bridging Abstract Mathematics and Modern Reality</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
          <X size={28} />
        </button>
      </header>

      {/* scrollable-content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gradient-to-b from-black via-[#050b0a] to-black">
        <div className="max-w-7xl mx-auto px-8 py-12">
          
          {/* Introduction Section */}
          <section className="app-intro mb-16 animate-in slide-in-from-top-4 duration-500">
            <div className="bg-white/5 border border-teal-500/20 rounded-3xl p-10 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full group-hover:bg-teal-500/20 transition-all duration-1000"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-white mb-6 leading-tight">From Your Screen to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Outer Space</span></h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Fractals are more than just beautiful patterns on a screen. They are the fundamental language of nature and a critical tool in modern engineering. From the smartphone in your pocket to the galaxies spinning in the void, fractal geometry provides the blueprint for efficiency, complexity, and beauty.
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-teal-500/20 border border-teal-500/30 px-4 py-2 rounded-xl text-teal-300 text-sm font-bold flex items-center gap-2">
                       <Zap size={16} /> Fast Fact: Your lungs have a fractal surface area of 70m²!
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[300px] bg-black/40 p-6 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="text-[10px] font-bold text-teal-500 uppercase mb-4 tracking-widest">Global Impact</div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Tech Integration</span><span className="text-sm font-mono text-white">98%</span></div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-teal-500 w-[98%]"></div></div>
                        <div className="flex justify-between items-center"><span className="text-sm text-gray-400">Nature Correlation</span><span className="text-sm font-mono text-white">High</span></div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[85%]"></div></div>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Filter System */}
          <section className="app-filters mb-10 overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex gap-3 min-w-max">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-xs font-bold transition-all border ${activeCategory === cat ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.3)]' : 'bg-white/5 text-gray-500 border-white/10 hover:border-teal-500/30 hover:text-gray-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Applications Grid */}
          <section className="app-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 min-h-[400px]">
            {filteredApps.map((app, idx) => (
              <div 
                key={app.title} 
                className="bg-[#0c0d15] border border-white/5 rounded-2xl p-6 hover:border-teal-500/40 hover:-translate-y-2 transition-all duration-300 flex flex-col shadow-xl group animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{app.icon}</div>
                  <span className="text-[9px] font-bold text-teal-500/80 bg-teal-500/10 px-2 py-1 rounded-full uppercase tracking-tighter border border-teal-500/20">{app.category.split(' ')[1]}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{app.title}</h3>
                <p className="text-xs text-teal-500/60 font-medium mb-4">{app.tagline}</p>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">{app.description}</p>
                
                <div className="space-y-4 mt-auto">
                   <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <div className="text-[9px] font-bold text-gray-500 uppercase mb-2 flex items-center gap-1"><Microscope size={10} /> How it works</div>
                      <p className="text-xs text-gray-300 leading-normal">{app.howItWorks}</p>
                   </div>
                   <div className="flex items-center gap-2 px-1">
                      <div className="p-1 rounded bg-teal-500/20 text-teal-400"><HardHat size={12} /></div>
                      <div className="text-[10px] text-gray-500"><span className="text-gray-300 font-bold">Real Example:</span> {app.realExample}</div>
                   </div>
                   <div className="p-3 bg-teal-900/10 rounded-lg border border-teal-500/10 text-[10px] text-teal-300/80 italic">
                      " {app.funFact} "
                   </div>
                </div>
              </div>
            ))}
          </section>

          {/* Mind-Blowing Facts Section */}
          <section className="app-facts mb-20">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-[1px] flex-1 bg-white/10"></div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3"><Star className="text-yellow-500" /> MIND-BLOWING FRACTAL FACTS</h2>
                <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FUN_FACTS.map((fact, i) => (
                  <div key={i} className="bg-gradient-to-br from-[#13141f] to-black p-8 rounded-3xl border border-white/5 hover:border-yellow-500/20 transition-all group">
                     <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{fact.icon}</div>
                     <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                       {fact.title}
                     </h4>
                     <p className="text-sm text-gray-400 leading-relaxed">{fact.text}</p>
                  </div>
                ))}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="app-cta">
            <div className="bg-gradient-to-r from-teal-900 via-teal-700 to-indigo-900 rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
              <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-6">Inspired by the Math?</h2>
                <p className="text-lg text-teal-100 mb-10 leading-relaxed">
                  Now that you've seen how fractals power the world around us, head back into the explorer to discover your own unique structures.
                </p>
                <button 
                  onClick={onClose}
                  className="px-12 py-4 bg-white text-teal-900 font-black rounded-full text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3"
                >
                  BACK TO EXPLORER <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* Footer Info */}
          <footer className="mt-16 text-center text-gray-600 text-[10px] uppercase tracking-[0.3em]">
             &copy; 2024 ARS MATHICA 2.0 • FOR NATIONAL SCIENCE EXHIBITION • THE MATHEMATICS OF EVERYTHING
          </footer>
        </div>
      </div>
    </div>
  );
};
