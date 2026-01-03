
import React, { useState, useMemo } from 'react';
import { 
  Globe, Cpu, TreeDeciduous, Activity, Film, Microscope, HardHat, 
  Sparkles, Filter, Info, ArrowRight, Zap, Search, X, 
  Lightbulb, Compass, Waves, Brain, Radio, Eye
} from 'lucide-react';

type Category = 'All' | 'Technology' | 'Nature' | 'Medicine' | 'Entertainment' | 'Science' | 'Engineering';

interface AppCard {
  title: string;
  category: Exclude<Category, 'All'>;
  tagline: string;
  description: string;
  howItWorks: string;
  example: string;
  impact: string;
  visualizationExplanation: string;
  funFact: string;
  icon: any;
  color: string;
}

const APPLICATIONS: AppCard[] = [
  {
    title: "Fractal Antennas",
    category: "Technology",
    tagline: "Fitting a massive antenna inside a tiny phone.",
    description: "Compact antennas that use self-similar geometry to maximize surface area within a small footprint.",
    howItWorks: "By using recursive patterns like the Sierpinski Carpet, the antenna can resonance at multiple frequencies simultaneously.",
    example: "Modern smartphones use fractal antennas to support GPS, WiFi, and 5G in one tiny module.",
    impact: "Revolutionized mobile communication by allowing sleek devices without external 'rabbit ear' antennas.",
    visualizationExplanation: "The recursive structure allows the electromagnetic waves to interact with the geometry at multiple scales, visualized as 'electromagnetic self-similarity'.",
    funFact: "A fractal antenna can be up to 75% smaller than a traditional one while maintaining the same performance.",
    icon: Radio,
    color: "text-blue-400"
  },
  {
    title: "CGI Landscape Generation",
    category: "Entertainment",
    tagline: "Building infinite cinematic worlds with math.",
    description: "Creating realistic mountains, clouds, and terrains for movies and video games using recursive algorithms.",
    howItWorks: "Instead of hand-drawing every rock, artists use 'midpoint displacement' fractals to generate infinite detail.",
    example: "The moon from Star Wars or the floating islands in Avatar were created using fractal terrain engines.",
    impact: "Reduced production costs and enabled the creation of breathtakingly complex fictional universes.",
    visualizationExplanation: "Fractal geometry replaces simple polygons with recursive displacement maps, creating 'roughness' that looks natural from any distance.",
    funFact: "The first fractal-generated landscape appeared in the 1982 film 'Star Trek II: The Wrath of Khan'.",
    icon: Film,
    color: "text-purple-400"
  },
  {
    title: "Cancer Cell Detection",
    category: "Medicine",
    tagline: "Identifying disease through boundary complexity.",
    description: "Using 'fractal dimension' analysis to distinguish between healthy tissue and cancerous growths.",
    howItWorks: "Cancerous tumors grow in a more chaotic, high-dimension fractal pattern than healthy, smoother cells.",
    example: "Oncology clinics use computer-aided fractal analysis to detect early-stage breast cancer in mammograms.",
    impact: "Earlier detection saves lives by catching subtle changes that the human eye might miss.",
    visualizationExplanation: "By mapping the 'D-value' (fractal dimension) of cell borders, irregular growths stand out as high-complexity noise compared to smooth tissue.",
    funFact: "The more 'fractal' a cell boundary is, the more aggressive the cancer usually is.",
    icon: Microscope,
    color: "text-red-400"
  },
  {
    title: "The Coastline Paradox",
    category: "Nature",
    tagline: "Why you can't truly measure a country's border.",
    description: "The realization that the length of a coastline depends entirely on the length of the ruler used.",
    howItWorks: "Coastlines are fractals; as you zoom in, more inlets and rocks appear, making the total length technically infinite.",
    example: "The official coastline of the UK is measured differently by various organizations based on their resolution.",
    impact: "Transformed mapping, geography, and how we understand international borders and territorial waters.",
    visualizationExplanation: "Zooming into a map reveals self-similar jaggedness, proving that Euclidean geometry fails to describe geographical reality.",
    funFact: "If you measured the coast with a 1cm ruler, it would be thousands of miles longer than if measured with a 1m ruler.",
    icon: Waves,
    color: "text-cyan-400"
  },
  {
    title: "Fractal Image Compression",
    category: "Technology",
    tagline: "Storing high-res images in tiny files.",
    description: "An algorithm that converts images into mathematical codes based on self-similar patterns within the image.",
    howItWorks: "The system finds parts of the image that look like smaller versions of itself and stores the transformation rule.",
    example: "Used in early satellite imagery and high-security archival systems where space is at a premium.",
    impact: "Enabled the storage of detailed maps and photos on limited hardware before modern high-speed internet.",
    visualizationExplanation: "Instead of pixels, the computer stores 'iterated function systems' that can regenerate the image at any resolution.",
    funFact: "Fractal images can be enlarged indefinitely without getting 'pixelated'—they just generate more math-based detail.",
    icon: Cpu,
    color: "text-emerald-400"
  },
  {
    title: "Blood Vessel Architecture",
    category: "Medicine",
    tagline: "Nature's perfect nutrient delivery system.",
    description: "The study of the recursive branching of our circulatory system to optimize blood flow.",
    howItWorks: "Lungs and blood vessels use fractal branching to maximize surface area for oxygen exchange in a small volume.",
    example: "Engineers study lung fractals to design more efficient heat exchangers and industrial filters.",
    impact: "Advances our understanding of cardiovascular health and helps design better artificial organs.",
    visualizationExplanation: "The human body is modeled as a 3D branching fractal tree, ensuring every cell is within 'diffusion distance' of a capillary.",
    funFact: "The surface area of your lungs' fractal branching is roughly the size of a tennis court.",
    icon: Activity,
    color: "text-rose-400"
  },
  {
    title: "Earthquake Prediction",
    category: "Science",
    tagline: "Finding patterns in the earth's chaos.",
    description: "Analyzing the fractal distribution of fault lines to estimate the probability of major seismic events.",
    howItWorks: "Small tremors follow a fractal distribution in time and space, revealing the underlying stress of tectonic plates.",
    example: "The Gutenberg-Richter Law uses fractal math to describe the relationship between earthquake size and frequency.",
    impact: "Helps cities prepare for disasters and saves thousands of lives through better building codes.",
    visualizationExplanation: "Seismologists visualize fault networks as 'fractal clusters' where a single break can trigger a recursive cascade of failures.",
    funFact: "Fractal patterns in rocks can reveal if an earthquake happened thousands of years ago.",
    icon: Compass,
    color: "text-orange-400"
  },
  {
    title: "Architecture & Structural Design",
    category: "Engineering",
    tagline: "Building stronger with less material.",
    description: "Using fractal structures in bridges and skyscrapers to distribute stress and weight efficiently.",
    howItWorks: "Recursive trusses provide high strength-to-weight ratios by distributing loads through multiple scales.",
    example: "The Eiffel Tower has a fractal-like iron lattice that allows it to stand tall despite being mostly air.",
    impact: "Lighter, cheaper, and more resilient buildings that can withstand high winds and weight.",
    visualizationExplanation: "Structural stress is mapped as a recursive flow, where large supports branch into smaller, self-similar braces.",
    funFact: "Indian temples often use fractal architecture (Shikhara) to represent the cosmic hierarchy of the universe.",
    icon: HardHat,
    color: "text-amber-400"
  },
  {
    title: "Computer Network Traffic",
    category: "Technology",
    tagline: "Modeling the pulse of the internet.",
    description: "Understanding how data packets move through the web using self-similar statistical models.",
    howItWorks: "Internet traffic isn't smooth; it has 'bursts' that look identical whether viewed over seconds or hours.",
    example: "Cisco and Google use fractal models to prevent network congestion and 'bufferbloat' during peak usage.",
    impact: "Ensures a stable, fast internet experience for billions of users worldwide.",
    visualizationExplanation: "Data traffic is visualized as 'heavy-tailed' distributions, showing that peak loads repeat across all time scales.",
    funFact: "The internet itself is a giant growing fractal with nodes branching into sub-nodes indefinitely.",
    icon: Globe,
    color: "text-blue-500"
  },
  {
    title: "Neural Network Mapping",
    category: "Medicine",
    tagline: "Deciphering the math of the mind.",
    description: "Mapping the fractal complexity of the human brain's white and gray matter.",
    howItWorks: "The brain's folds (gyri and sulci) follow a fractal pattern to pack maximum processing power into the skull.",
    example: "MRI scans use fractal dimensions to track the progression of Alzheimer’s and other neurological diseases.",
    impact: "New ways to diagnose brain disorders before symptoms even become visible.",
    visualizationExplanation: "Brain connectivity is modeled as a recursive 'small-world' network where information travels via fractal paths.",
    funFact: "A person’s intelligence is often correlated with the fractal complexity of their brain’s wiring.",
    icon: Brain,
    color: "text-indigo-400"
  },
  {
    title: "Fractal 5G Beamforming",
    category: "Technology",
    tagline: "Invisible math powering high-speed wireless.",
    description: "Algorithms that use fractal arrays to steer wireless signals directly to your device.",
    howItWorks: "Fractal geometry allows antennas to focus radio waves more precisely, reducing interference for 5G users.",
    example: "Massive MIMO towers in smart cities use fractal beamforming to handle thousands of users at once.",
    impact: "Ultra-fast mobile speeds and the ability to have stable connections in crowded stadiums.",
    visualizationExplanation: "The signal footprint is shaped into a fractal 'Sierpinski triangle' to maximize precision while minimizing energy leak.",
    funFact: "Fractal math is what allows 5G to handle 100x more devices than 4G.",
    icon: Zap,
    color: "text-yellow-400"
  },
  {
    title: "VFX Fluid Dynamics",
    category: "Entertainment",
    tagline: "Simulating water, fire, and smoke.",
    description: "Using recursive turbulence models to make digital fire and water look 'wet' and 'real'.",
    howItWorks: "Liquids are naturally fractal; big swirls create smaller swirls, which create even smaller ones.",
    example: "The water simulations in 'Moana' or 'Life of Pi' are powered by fractal fluid solvers.",
    impact: "Brought a new level of photorealism to cinema that was previously impossible to animate by hand.",
    visualizationExplanation: "Turbulence is rendered by adding layers of fractal noise (Perlin or Simplex) to basic fluid equations.",
    funFact: "Without fractals, digital water would look like smooth, unrealistic plastic.",
    icon: Waves,
    color: "text-blue-300"
  },
  {
    title: "Fractal Cryptography",
    category: "Technology",
    tagline: "Hiding secrets in mathematical infinite loops.",
    description: "Using the unpredictability of chaotic fractal systems to generate unhackable encryption keys.",
    howItWorks: "Because fractals are sensitive to initial conditions, tiny changes in a key lead to totally different outcomes.",
    example: "High-security military communications use fractal-based random number generators for encryption.",
    impact: "Provides a layer of security that is extremely difficult for current supercomputers to crack.",
    visualizationExplanation: "The 'key space' is modeled as a high-dimensional fractal manifold where only the correct coordinates decrypt the data.",
    funFact: "A fractal key can be so complex that it would take longer than the age of the universe to guess.",
    icon: Cpu,
    color: "text-red-500"
  },
  {
    title: "Snowflake Physics",
    category: "Nature",
    tagline: "The symmetry of cold math.",
    description: "Studying how ice crystals grow into self-similar hexagonal patterns.",
    howItWorks: "Water molecules bond in a specific geometric way that repeats as the crystal grows through the cold air.",
    example: "Material scientists study snowflakes to design new crystalline structures for electronics.",
    impact: "Insights into thermodynamics and the 'self-organization' of matter in the universe.",
    visualizationExplanation: "The 'Koch Snowflake' model precisely describes how the boundary of an ice crystal expands outward recursively.",
    funFact: "While no two snowflakes are identical, they all follow the same fractal 'base' rules of growth.",
    icon: Sparkles,
    color: "text-white"
  },
  {
    title: "Large-Scale Universe Structure",
    category: "Science",
    tagline: "The cosmic web is a giant fractal.",
    description: "The discovery that galaxies are distributed in a self-similar, web-like pattern across space.",
    howItWorks: "Gravity pulls matter together in a way that looks the same whether looking at local clusters or the whole sky.",
    example: "The Sloan Digital Sky Survey mapped the universe and found it follows fractal clustering laws.",
    impact: "Changes our fundamental understanding of the Big Bang and how the universe will eventually end.",
    visualizationExplanation: "Cosmologists model the universe as a 'Cosmic Sponge' where voids and matter follow a power-law distribution.",
    funFact: "If you zoom out far enough, the universe looks like a sponge made of light.",
    icon: Globe,
    color: "text-violet-500"
  },
  {
    title: "Weather & Cloud Modeling",
    category: "Science",
    tagline: "Predicting the unpredictable.",
    description: "Using fractals to understand the chaotic behavior of the atmosphere and storm systems.",
    howItWorks: "Clouds are 'fractal objects'—their edges are infinitely complex and their movement is self-similar.",
    example: "Meteorologists use fractal dimensions to categorize hurricane intensity and track rainfall patterns.",
    impact: "Slightly better weather forecasts which are critical for farming, travel, and disaster safety.",
    visualizationExplanation: "The atmospheric 'cascade' of energy is visualized as a fractal tree where large storm fronts drive micro-climates.",
    funFact: "Clouds are not 3D objects, but they aren't 2D either; their fractal dimension is usually around 1.3.",
    icon: TreeDeciduous,
    color: "text-gray-400"
  },
  {
    title: "Digital Music Synthesis",
    category: "Entertainment",
    tagline: "Generating infinite melodies with math.",
    description: "Creating '1/f noise' music that mimics the natural rhythms of nature using fractal sequences.",
    howItWorks: "By mapping fractal coordinates to musical notes, composers create sounds that feel both new and familiar.",
    example: "Ambient music used in spas or focused-work playlists often uses fractal noise for relaxation.",
    impact: "A new genre of generative art where the music 'composes itself' based on mathematical rules.",
    visualizationExplanation: "The 'spectral slope' of the audio is shaped to match the recursive patterns found in wind or heartbeats.",
    funFact: "Johann Sebastian Bach's music has been found to have hidden fractal structures in its rhythm.",
    icon: Radio,
    color: "text-pink-400"
  },
  {
    title: "Traffic Flow Optimization",
    category: "Engineering",
    tagline: "Designing roads that think like fractals.",
    description: "Using recursive branching models to design highway systems that minimize gridlock.",
    howItWorks: "Traffic flows best when the ratio of main roads to side streets follows a specific fractal distribution.",
    example: "City planners in Tokyo use fractal 'growth' simulations to decide where to build new train lines.",
    impact: "Shorter commutes, less pollution, and more efficient cities for the growing global population.",
    visualizationExplanation: "Urban traffic is modeled as a recursive fluid flow where 'bottlenecks' are predicted via fractal bottlenecks.",
    funFact: "Slime molds can actually solve complex traffic fractals better than many human engineers.",
    icon: HardHat,
    color: "text-green-500"
  },
  {
    title: "Plant Growth (L-Systems)",
    category: "Nature",
    tagline: "The code of the forest.",
    description: "Explaining how complex trees grow from a few simple genetic instructions.",
    howItWorks: "L-Systems use string rewriting to simulate the recursive 'budding' and 'branching' of plants.",
    example: "Botanists use these models to predict how a forest will regrow after a fire or logging.",
    impact: "Better environmental conservation and more realistic digital agriculture simulations.",
    visualizationExplanation: "A plant's DNA is visualized as a 'grammatical fractal' where a single instruction: 'branch and repeat' creates a forest.",
    funFact: "A fern is a 'living fractal'—each leaf is a miniature version of the entire branch.",
    icon: TreeDeciduous,
    color: "text-green-600"
  },
  {
    title: "Turbulence in Fluid Dynamics",
    category: "Science",
    tagline: "Taming the chaos of air and water.",
    description: "Describing how large eddies of fluid break down into smaller and smaller scales.",
    howItWorks: "Energy in a fluid cascades down a 'fractal ladder' until it dissipates as heat at the microscopic level.",
    example: "Aerospace engineers use fractal math to design quieter, more fuel-efficient airplane wings.",
    impact: "Saves billions in fuel costs and makes flying through storms much safer.",
    visualizationExplanation: "Vorticity is visualized as an 'infinite cascade' of swirls, modeled by the Navier-Stokes equations with fractal corrections.",
    funFact: "Leonardo da Vinci was one of the first people to draw the fractal nature of turbulent water.",
    icon: Waves,
    color: "text-blue-200"
  }
];

const FUN_FACTS = [
  {
    title: "The Coastline Paradox",
    text: "The smaller your ruler, the longer a coastline gets. Technically, the coast of India is infinitely long if you measure every grain of sand!",
    icon: Waves
  },
  {
    title: "Romanesco Broccoli",
    text: "This vegetable is a perfect physical fractal. Each bud is a small version of the whole head, following a logarithmic spiral.",
    icon: TreeDeciduous
  },
  {
    title: "Fractal Lungs",
    text: "If you flattened the fractal branching of your lungs, they would cover an entire tennis court. Math is what lets you breathe!",
    icon: Microscope
  },
  {
    title: "Stock Market Patterns",
    text: "Stock charts look identical whether you look at them for 1 day, 1 month, or 10 years. This 'self-similarity' is a key fractal property.",
    icon: Activity
  },
  {
    title: "Cosmic Web",
    text: "The universe isn't a random soup; it's a giant web of galaxies that follows a fractal distribution across billions of light-years.",
    icon: Globe
  }
];

export const RealWorldApps: React.FC = () => {
  const [filter, setFilter] = useState<Category>('All');
  const [search, setSearch] = useState('');

  const filteredApps = useMemo(() => {
    return APPLICATIONS.filter(app => {
      const matchesFilter = filter === 'All' || app.category === filter;
      const matchesSearch = app.title.toLowerCase().includes(search.toLowerCase()) || 
                            app.description.toLowerCase().includes(search.toLowerCase()) ||
                            app.tagline.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const categories: Category[] = ['All', 'Technology', 'Nature', 'Medicine', 'Entertainment', 'Science', 'Engineering'];

  return (
    <div className="flex flex-col h-full bg-black text-gray-200 overflow-hidden">
      {/* Sticky Header */}
      <div className="px-8 py-8 border-b border-white/5 bg-black/90 backdrop-blur-md shrink-0 sticky top-0 z-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-[Orbitron] tracking-tight">
              Fractals in the Real World
            </h1>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-semibold">
              Discover how recursive mathematics shapes our modern civilization
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search applications..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-[#13141f] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 w-64 transition-all"
                />
             </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-8">
           <div className="flex items-center gap-2 text-gray-500 mr-2 text-xs font-bold uppercase"><Filter size={14}/> Filter:</div>
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                 filter === cat 
                   ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20' 
                   : 'bg-[#13141f] text-gray-400 border-white/5 hover:text-white hover:bg-white/5'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        
        {/* Intro Narrative */}
        <div className="max-w-4xl mb-12 animate-in fade-in slide-in-from-left-4 duration-700">
           <div className="bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <Globe size={120} className="text-purple-400 rotate-12" />
              </div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                 <Compass className="text-purple-400" /> Beyond the Abstract
              </h2>
              <p className="text-gray-400 leading-relaxed">
                For centuries, fractals were considered nothing more than mathematical curiosities—geometric monsters that didn't fit into the smooth world of Euclidean shapes. But today, we realize that <b>nature isn't smooth; it's rough, irregular, and recursive.</b> 
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                From the way your smartphone talks to satellites, to the way cancer cells are identified by surgeons, fractal math is the hidden engine of 21st-century innovation. Exploring these applications bridges the gap between digital art and human progress.
              </p>
              <div className="mt-6 flex items-center gap-4">
                 <div className="px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 text-xs font-bold text-purple-300">
                    <span className="text-purple-500 mr-2">Did You Know?</span>
                    Fractals allow your smartphone antenna to be 75% smaller.
                 </div>
              </div>
           </div>
        </div>

        {/* Application Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredApps.map((app, i) => (
            <div 
              key={app.title} 
              className="bg-[#0c0d15] border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 transition-all group hover:shadow-2xl hover:shadow-purple-500/5 flex flex-col animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-[#13141f] border border-white/5 ${app.color} group-hover:scale-110 transition-transform`}>
                  <app.icon size={24} />
                </div>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter border border-white/5 px-2 py-1 rounded bg-black/50">
                  {app.category}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{app.title}</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-3">{app.tagline}</p>
              
              <div className="space-y-4 flex-1">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Overview</div>
                  <p className="text-xs text-gray-400 leading-relaxed">{app.description}</p>
                </div>
                
                <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                  <div className="text-[10px] text-purple-400 uppercase font-bold mb-1 flex items-center gap-1.5">
                    <Info size={10} /> The Math
                  </div>
                  <p className="text-[11px] text-gray-300 leading-tight">{app.howItWorks}</p>
                </div>

                <div className="p-3 bg-purple-900/10 rounded-lg border border-purple-500/10">
                  <div className="text-[10px] text-cyan-400 uppercase font-bold mb-1 flex items-center gap-1.5">
                    <Eye size={10} /> Visualization
                  </div>
                  <p className="text-[11px] text-gray-300 leading-tight">{app.visualizationExplanation}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                   <div>
                      <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Impact</div>
                      <p className="text-[10px] text-gray-400 leading-tight">{app.impact}</p>
                   </div>
                   <div>
                      <div className="text-[9px] text-gray-500 uppercase font-bold mb-1">Example</div>
                      <p className="text-[10px] text-gray-400 leading-tight">{app.example}</p>
                   </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                 <div className="p-1.5 bg-yellow-500/10 rounded text-yellow-500">
                    <Lightbulb size={12} />
                 </div>
                 <p className="text-[10px] text-yellow-500/80 italic font-medium leading-tight">{app.funFact}</p>
              </div>
            </div>
          ))}
          
          {filteredApps.length === 0 && (
             <div className="col-span-full py-20 text-center">
                <Search size={48} className="text-gray-800 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600">No applications found</h3>
                <p className="text-gray-700">Try a different search term or category filter.</p>
             </div>
          )}
        </div>

        {/* Fun Facts Section */}
        <div className="border-t border-white/10 pt-16 mb-20">
           <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
              <h2 className="text-2xl font-bold text-white font-[Orbitron] flex items-center gap-3">
                 <Sparkles className="text-yellow-400" /> Mind-Blowing Fractal Facts
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FUN_FACTS.map((fact, i) => (
                <div key={i} className="bg-[#13141f] border border-white/10 rounded-2xl p-6 relative group overflow-hidden">
                   <div className="absolute -top-4 -right-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                      <fact.icon size={120} />
                   </div>
                   <h3 className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-widest">{fact.title}</h3>
                   <p className="text-sm text-gray-300 leading-relaxed italic">"{fact.text}"</p>
                </div>
              ))}
           </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-10 text-center text-white relative overflow-hidden mb-10 shadow-2xl shadow-purple-500/20">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
           <div className="relative z-10 flex flex-col items-center">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full mb-6 ring-4 ring-white/5">
                 <Sparkles size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">The Universe is Iterative</h2>
              <p className="text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
                Now that you've seen how these patterns build our world, head back to the explorer and experiment. Every scientific breakthrough began as a simple question: <b>"What if we repeated this?"</b>
              </p>
              <button 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
              >
                 Return to Explorer <ArrowRight size={16} />
              </button>
           </div>
        </div>

        <footer className="text-center py-12 border-t border-white/5 text-gray-600">
           <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Ars Mathica 2.0 • Real-World Educational Exhibition Module</p>
           <p className="text-[9px] mt-2">Compiled for STEM Education & Mathematical Outreach</p>
        </footer>
      </div>
    </div>
  );
};
