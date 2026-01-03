
import React, { useState, useEffect, useRef } from 'react';
import { History, Sparkles, BookOpen, Layers, Zap, Info, ArrowDown, Shield } from 'lucide-react';

interface Era {
  id: string;
  year: string;
  title: string;
  thesis: string;
  explanation: string[];
  artifact: {
    title: string;
    description: string;
  };
}

const ERAS: Era[] = [
  {
    id: "1800s",
    year: "1800s",
    title: "Nature Breaks Classical Geometry",
    thesis: "Euclidean shapes were too smooth for a jagged world.",
    explanation: [
      "In the 19th century, mathematics was dominated by smooth curves and simple shapes. But mathematicians like Karl Weierstrass began discovering functions that were continuous but nowhere differentiable—monstrous jags that broke traditional rules.",
      "These discoveries were initially dismissed as mathematical pathologies, quirks that had no place in the physical world. Yet, they laid the foundation for a new way of describing reality."
    ],
    artifact: {
      title: "The Weierstrass Monster",
      description: "A function that is 'spiky' at every single point, no matter how much you zoom in. The first crack in the wall of classical geometry."
    }
  },
  {
    id: "early-1900s",
    year: "Early 1900s",
    title: "Strange Mathematical Objects",
    thesis: "Monsters that lived in the gaps of reality.",
    explanation: [
      "Helge von Koch and Georg Cantor began constructing shapes with infinite perimeters but finite areas. The Koch Snowflake and the Cantor Set challenged the very definition of 'dimension'.",
      "These shapes occupied a space between dimensions—not quite a line, but not quite a plane. They were the first 'fractals', though the name did not yet exist."
    ],
    artifact: {
      title: "The Cantor Set",
      description: "Take a line, remove the middle third, and repeat forever. You are left with a 'dust' of points that is both infinite and yet contains no intervals."
    }
  },
  {
    id: "1970s",
    year: "1970s",
    title: "Fractals Are Defined",
    thesis: "Naming the invisible geometry of the universe.",
    explanation: [
      "Benoit Mandelbrot, working at IBM, realized that these 'monsters' were actually the key to describing the roughness of nature. He coined the term 'fractal' from the Latin 'fractus', meaning broken or fragmented.",
      "Mandelbrot published 'The Fractal Geometry of Nature', arguing that clouds are not spheres, mountains are not cones, and bark is not smooth."
    ],
    artifact: {
      title: "The Word 'Fractal'",
      description: "Derived from 'fractus', it unified centuries of disparate mathematical 'monsters' into a single, cohesive field of study."
    }
  },
  {
    id: "1980s",
    year: "1980s",
    title: "Computers Reveal Hidden Complexity",
    thesis: "Silicon vision brings math to life.",
    explanation: [
      "With the rise of personal computing, Mandelbrot and others could finally visualize the equations they had been studying. The first render of the Mandelbrot Set was a watershed moment in both math and art.",
      "Suddenly, the 'infinite' wasn't just a concept—it was a high-resolution image on a screen. The public became mesmerized by the psychedelic complexity found in simple feedback loops."
    ],
    artifact: {
      title: "The first Mandelbrot render",
      description: "A crude black-and-white printout from 1980 that revealed the most complex object in mathematics for the first time."
    }
  },
  {
    id: "1990s",
    year: "1990s",
    title: "Fractals Enter Industry",
    thesis: "Engineering the chaos for the information age.",
    explanation: [
      "Engineers realized that fractal geometry could solve real-world problems. Nathan Cohen designed the first fractal antenna, allowing mobile phones to become tiny and sleek.",
      "In Hollywood, fractal algorithms were used to generate realistic mountains and clouds for films like 'Star Trek' and 'Titanic', replacing hand-drawn backgrounds with mathematical realism."
    ],
    artifact: {
      title: "The Fractal Antenna",
      description: "A recursive wire shape that resonance at multiple frequencies, allowing your phone to support GPS, Bluetooth, and Cellular in one tiny chip."
    }
  },
  {
    id: "2000s",
    year: "2000s",
    title: "Fractals in Medicine & Biology",
    thesis: "The architecture of life is recursive.",
    explanation: [
      "Researchers discovered that our lungs, blood vessels, and neural networks are all fractal branching systems designed to maximize efficiency. Fractal analysis became a tool for diagnosing cancer by measuring the 'roughness' of cell boundaries.",
      "The 'Fractal Dimension' became a vital metric in oncology, physiology, and even neurobiology to map the complexity of the human mind."
    ],
    artifact: {
      title: "Tumor Complexity Mapping",
      description: "A diagnostic method that identifies malignant growths by their chaotic, high-dimension fractal patterns compared to healthy tissue."
    }
  },
  {
    id: "2010s",
    year: "2010s",
    title: "Infinite Digital Worlds",
    thesis: "Virtual infinities born from a single equation.",
    explanation: [
      "The gaming industry embraced procedural generation. Games like 'No Man's Sky' used fractal math to generate quintillions of unique, explorable planets, each with its own terrain and ecosystems.",
      "The era of 'manual modeling' began to give way to 'generative modeling', where artists define the rules of the fractal and the computer grows the world."
    ],
    artifact: {
      title: "Procedural Planets",
      description: "Virtual landmasses that don't exist until a player looks at them, generated instantly via recursive noise algorithms."
    }
  },
  {
    id: "2020s",
    year: "2020s",
    title: "Fractals Everywhere",
    thesis: "The invisible threads of 5G and Artificial Intelligence.",
    explanation: [
      "Today, fractals power 5G beamforming, optimize global logistics networks, and are used to understand the deep structures of Large Language Models and Neural Networks.",
      "We no longer see fractals as 'strange'—they are the underlying language of our interconnected, high-data world."
    ],
    artifact: {
      title: "5G Beamforming Arrays",
      description: "Fractal-based antenna arrays that focus signals directly at your device, maximizing data speeds in crowded urban environments."
    }
  },
  {
    id: "future",
    year: "The Future",
    title: "The Next Frontier",
    thesis: "Folding the fabric of quantum reality.",
    explanation: [
      "Physicists are now finding fractal patterns in quantum wavefunctions and the structure of space-time itself. We are moving toward a 'fractal theory of everything'.",
      "As we bridge the gap between quantum mechanics and general relativity, the self-similar geometry of the universe may be the final piece of the puzzle."
    ],
    artifact: {
      title: "Quantum Fractals",
      description: "Mathematical models suggesting that at the smallest possible scales, the universe itself might be a recursive, holographic fractal."
    }
  }
];

export const TimelineInfinite: React.FC = () => {
  const [activeEra, setActiveEra] = useState<string>(ERAS[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const eraRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: scrollRef.current,
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveEra(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    (Object.values(eraRefs.current) as (HTMLDivElement | null)[]).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      (Object.values(eraRefs.current) as (HTMLDivElement | null)[]).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#050508] text-gray-200 overflow-hidden relative selection:bg-purple-500/30">
      {/* Narrative Spine (Fixed Left) */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent z-10 pointer-events-none">
        <div 
          className="absolute top-0 w-1 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] rounded-full transition-all duration-700 ease-out"
          style={{ 
            height: '100px', 
            top: `${(ERAS.findIndex(e => e.id === activeEra) / (ERAS.length - 1)) * 90 + 5}%` 
          }}
        />
      </div>

      {/* Floating Era Indicator - Adjusted positioning to absolute to respect content container boundaries */}
      <div className="absolute top-12 left-12 z-40 animate-in fade-in slide-in-from-left-4 duration-500 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 px-5 py-2.5 rounded-full flex items-center gap-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="p-1.5 bg-purple-500/10 rounded-full border border-purple-500/20">
                <History size={16} className="text-purple-400" />
            </div>
            <span className="text-[11px] font-black text-white uppercase tracking-[0.25em]">
                {ERAS.find(e => e.id === activeEra)?.year} <span className="text-purple-500 mx-1">•</span> {ERAS.find(e => e.id === activeEra)?.title}
            </span>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar relative px-12 md:px-24"
      >
        <div className="max-w-4xl mx-auto py-24">
          
          {/* Intro Section */}
          <div className="mb-48 pl-12 border-l-2 border-purple-500/20">
             <h1 className="text-5xl md:text-7xl font-bold font-[Orbitron] text-white leading-tight mb-6">
                Timeline of the <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Infinite</span>
             </h1>
             <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                A historical journey through the evolution of fractals—from the "monsters" of abstract mathematics to the building blocks of the modern universe.
             </p>
             <div className="mt-12 flex items-center gap-4 text-gray-500 animate-bounce">
                <ArrowDown size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Scroll to move through time</span>
             </div>
          </div>

          {ERAS.map((era, index) => (
            <div 
              key={era.id} 
              id={era.id}
              ref={el => eraRefs.current[era.id] = el}
              className={`min-h-[80vh] flex flex-col justify-center mb-64 transition-all duration-1000 relative ${activeEra === era.id ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4 blur-sm'}`}
            >
              {/* Year Label */}
              <div className="absolute -left-16 top-0 text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] flex items-center gap-4">
                 <div className={`w-3 h-3 rounded-full border border-purple-500 transition-all duration-500 ${activeEra === era.id ? 'bg-purple-500 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-transparent'}`}></div>
                 {era.year}
              </div>

              {/* Era Header */}
              <div className="mb-8 pl-12">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 transition-colors duration-500 group">
                    {era.title}
                 </h2>
                 <p className="text-lg md:text-xl text-purple-400 italic font-medium">
                    "{era.thesis}"
                 </p>
              </div>

              {/* Era Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pl-12">
                 <div className="md:col-span-8 space-y-6 text-gray-400 leading-relaxed text-sm md:text-base">
                    {era.explanation.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                 </div>

                 {/* Artifact Card */}
                 <div className="md:col-span-4">
                    <div className="bg-[#13141f] border border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-2xl">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                       <div className="p-3 bg-purple-500/10 rounded-lg w-fit text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                          <Layers size={20} />
                       </div>
                       <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Exhibition Artifact</h4>
                       <h3 className="text-base font-bold text-purple-300 mb-3">{era.artifact.title}</h3>
                       <p className="text-[11px] text-gray-500 leading-relaxed">
                          {era.artifact.description}
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          ))}

          {/* Outro / Future */}
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center pb-48">
             <div className="p-6 bg-purple-500/10 rounded-full border border-purple-500/20 mb-8 animate-pulse">
                <Sparkles size={48} className="text-purple-400" />
             </div>
             <h2 className="text-3xl font-bold text-white mb-4 font-[Orbitron]">The story is still unfolding...</h2>
             <p className="text-gray-500 max-w-xl text-sm italic">
                Fractals are not just a chapter in history; they are the language in which the universe is written. As we look ahead, the complexity only grows.
             </p>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-700 font-bold uppercase tracking-[0.4em] pointer-events-none">
         ARS MATHICA • MUSEUM MODULE 003 • INFINITE TIMELINE
      </footer>
    </div>
  );
};
