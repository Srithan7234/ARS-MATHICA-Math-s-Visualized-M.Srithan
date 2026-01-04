
import React, { useState, useEffect, useRef } from 'react';
import { 
  History, Sparkles, Layers, Zap, Info, ArrowUp, 
  Globe, Radio, Microscope, Film, Cpu, Waves, Brain, 
  Target, Rocket, Triangle, Hexagon, TreeDeciduous,
  Activity, Image, Infinity as InfinityIcon, Wind, Cloud, CloudLightning,
  ChevronRight, Box, Atom, Binary, FlaskConical, Sigma, Ruler
} from 'lucide-react';

interface Milestone {
  id: string;
  altitude: number; 
  year: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  visual: string; 
  formula?: string;
  horizontalPos: number; // 15 to 75 percent
  eraStyle: 'ancient' | 'classic' | 'retro' | 'modern' | 'future';
}

const MILESTONES: Milestone[] = [
  { id: "natural", altitude: 800, year: "Ancient", title: "Natural Self-Similarity", description: "Trees, rivers, and clouds observed repeating shapes at different scales before math could name them.", icon: TreeDeciduous, category: "Implicit", visual: "🌳", horizontalPos: 25, eraStyle: 'ancient' },
  { id: "artistic", altitude: 2500, year: "Pre-1700s", title: "Artistic Intuition", description: "Recursive patterns in temple architecture and Islamic art, signaling a deep human sensing of the infinite.", icon: Image, category: "Implicit", visual: "🏛️", horizontalPos: 68, eraStyle: 'ancient' },
  { id: "weierstrass", altitude: 5500, year: "1872", title: "The Weierstrass Monster", description: "Karl Weierstrass discovers a function continuous everywhere but differentiable nowhere. A jagged nightmare for classical math.", icon: Activity, category: "Pure Math", visual: "📈", formula: "f(x) = \\sum_{n=0}^{\\infty} a^n \\cos(b^n \\pi x)", horizontalPos: 18, eraStyle: 'classic' },
  { id: "koch", altitude: 9500, year: "1904", title: "Koch Snowflake", description: "Helge von Koch creates a curve with infinite length surrounding a finite area. Geometry begins to break Euclidean rules.", icon: Hexagon, category: "Geometry", visual: "❄️", formula: "D = \\frac{\\log 4}{\\log 3} \\approx 1.2619", horizontalPos: 72, eraStyle: 'classic' },
  { id: "sierpinski", altitude: 14000, year: "1915", title: "Sierpiński Triangle", description: "Structure from removal. Wacław Sierpiński demonstrates that infinite complexity arises from a simple recursive sieve.", icon: Triangle, category: "Geometry", visual: "🔺", formula: "N_n = 3^n", horizontalPos: 20, eraStyle: 'classic' },
  { id: "julia", altitude: 20000, year: "1920s", title: "Julia Sets", description: "Gaston Julia explores iterations in the complex plane, uncovering the strange attractors that define fractal boundaries.", icon: Layers, category: "Dynamics", visual: "🌀", formula: "z_{n+1} = z_n^2 + c", horizontalPos: 65, eraStyle: 'classic' },
  { id: "coastline", altitude: 32000, year: "1967", title: "Coastline Paradox", description: "Benoit Mandelbrot reframes measurement: the length of a coastline depends entirely on the scale of your ruler.", icon: Waves, category: "Geography", visual: "🏝️", formula: "L(\\epsilon) \\propto \\epsilon^{1-D}", horizontalPos: 15, eraStyle: 'retro' },
  { id: "term", altitude: 42000, year: "1975", title: "Term 'Fractal' Born", description: "From the Latin 'fractus' (broken), Mandelbrot formalizes the geometry of nature. The irregular is finally structured.", icon: Zap, category: "Definition", visual: "📜", horizontalPos: 75, eraStyle: 'retro' },
  { id: "computing", altitude: 58000, year: "Late 1970s", title: "Digital Visions", description: "Silicon vision reveals infinite detail. Computers translate abstract equations into recursive images.", icon: Cpu, category: "Technology", visual: "🖥️", horizontalPos: 22, eraStyle: 'retro' },
  { id: "mandelbrot", altitude: 75000, year: "1980", title: "The Mandelbrot Set", description: "The iconic thumbprint of the infinite. A simple rule yields the most complex object in math.", icon: Sparkles, category: "Milestone", visual: "🕳️", formula: "c \\in M \\iff \\lim_{n \\to \\infty} |z_n| \\le 2", horizontalPos: 62, eraStyle: 'retro' },
  { id: "landscapes", altitude: 105000, year: "1990s", title: "CGI Terrains", description: "Hollywood and gaming adopt fractal algorithms to generate infinite mountains, clouds, and cinematic worlds.", icon: Film, category: "Entertainment", visual: "🏔️", horizontalPos: 18, eraStyle: 'modern' },
  { id: "antennas", altitude: 135000, year: "2000s", title: "Fractal Antennas", description: "Compact multi-frequency designs fit inside tiny phones, powered by space-filling recursive curves.", icon: Radio, category: "Engineering", visual: "📱", horizontalPos: 70, eraStyle: 'modern' },
  { id: "biology", altitude: 180000, year: "2010s", title: "Biological Logic", description: "Evolution optimizes through recursion. Lungs, blood vessels, and neurons are revealed as living fractals.", icon: Microscope, category: "Biology", visual: "🫁", horizontalPos: 28, eraStyle: 'modern' },
  { id: "neural", altitude: 240000, year: "Current", title: "Neural Scaling", description: "AI models exhibit fractal properties in their optimization paths and internal weight distributions.", icon: Brain, category: "AI", visual: "🧠", horizontalPos: 65, eraStyle: 'modern' },
  { id: "quantum", altitude: 350000, year: "2020s", title: "Quantum Fractals", description: "Self-similar patterns observed in quantum wavefunctions and the fabric of spacetime itself.", icon: Atom, category: "Science", visual: "⚛️", formula: "\\psi(x) = \\mathcal{F}[\\psi]", horizontalPos: 15, eraStyle: 'future' },
  { id: "frontier", altitude: 500000, year: "Future", title: "Open Fractal Frontier", description: "Unknown recursive structures wait to be named. Humanity's climb toward infinity continues.", icon: Rocket, category: "Research", visual: "🛸", horizontalPos: 55, eraStyle: 'future' }
];

const DECORATIONS = [
  { alt: 10000, label: "Troposphere Limit", type: 'line', icon: Wind },
  { alt: 25000, label: "Cruising Altitude", type: 'line', icon: Cloud },
  { alt: 50000, label: "Ozone Layer", type: 'zone', icon: CloudLightning },
  { alt: 95000, label: "Noctilucent Clouds", type: 'line', icon: Sparkles },
  { alt: 120000, label: "The Karman Line", type: 'boundary', icon: Globe },
];

const StickMan: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-black stroke-[4] fill-none">
    {/* Head */}
    <circle cx="50" cy="25" r="10" />
    {/* Body */}
    <line x1="50" y1="35" x2="50" y2="70" />
    {/* Arms */}
    <line x1="50" y1="45" x2="30" y2="60" />
    {/* Legs */}
    <line x1="50" y1="70" x2="35" y2="90" />
    <line x1="50" y1="70" x2="65" y2="90" />
    <line x1="50" y1="45" x2="70" y2="60" />
  </svg>
);

export const TimelineInfinite: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const progress = scrollTop / (scrollHeight - clientHeight);
    setScrollProgress(progress);
  };

  const maxAltitude = MILESTONES[MILESTONES.length - 1].altitude;
  const currentAltitude = Math.floor(scrollProgress * maxAltitude);
  const currentMilestone = [...MILESTONES].reverse().find(m => currentAltitude >= m.altitude) || MILESTONES[0];

  const getBgColor = (alt: number) => {
    if (alt < 15000) return '#a5dcf8'; 
    if (alt < 40000) return '#5ba4e1'; 
    if (alt < 80000) return '#1e3a8a'; 
    if (alt < 140000) return '#0f172a'; 
    return '#020617'; 
  };

  const getEraFrame = (style: string, proximity: number) => {
    const baseOpacity = proximity > 0.8 ? 'opacity-100' : 'opacity-80';
    const highlight = proximity > 0.95 ? 'ring-4 ring-white shadow-2xl scale-105' : 'ring-1 ring-black/10';
    
    switch(style) {
      case 'ancient': 
        return `border-amber-900/60 bg-[#fff9f0] shadow-[8px_8px_0_rgba(120,60,20,0.2)] text-amber-900 ${baseOpacity} ${highlight}`;
      case 'classic': 
        return `border-slate-800 bg-white shadow-[8px_8px_0_rgba(0,0,0,1)] text-slate-900 ${baseOpacity} ${highlight}`;
      case 'retro': 
        return `border-green-500 bg-black shadow-[0_0_20px_rgba(34,197,94,0.4)] font-mono text-green-400 ${baseOpacity} ${highlight}`;
      case 'modern': 
        return `border-white/20 bg-white/10 backdrop-blur-2xl rounded-2xl text-white ${baseOpacity} ${highlight}`;
      case 'future': 
        return `border-cyan-400 bg-cyan-950/40 shadow-[0_0_30px_rgba(34,211,238,0.3)] rounded-3xl text-cyan-100 ${baseOpacity} ${highlight}`;
      default: 
        return `border-white/10 bg-white/5 ${baseOpacity} ${highlight}`;
    }
  };

  return (
    <div 
      ref={scrollRef}
      onScroll={handleScroll}
      className="h-full w-full overflow-y-auto custom-scrollbar relative transition-colors duration-1000 font-sans select-none"
      style={{ backgroundColor: getBgColor(currentAltitude) }}
    >
      {/* Blueprint Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.2] z-0" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
      </div>

      {/* Scattered Science Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] flex flex-wrap justify-around items-center overflow-hidden grayscale">
         <Sigma size={300} strokeWidth={0.5} />
         <Atom size={400} strokeWidth={0.5} />
         <Binary size={250} strokeWidth={0.5} />
         <FlaskConical size={350} strokeWidth={0.5} />
         <Ruler size={400} strokeWidth={0.5} className="rotate-45" />
      </div>

      {/* The Cable - Left side consistent with neal.fun */}
      <div className="fixed left-20 top-0 bottom-0 w-[6px] bg-black/70 z-10 shadow-[2px_0_15px_rgba(0,0,0,0.4)]">
         <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
      </div>

      {/* Realistic Elevator Car with Stick Man */}
      <div className="fixed left-[42px] top-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
         <div className="w-[82px] h-[110px] bg-white border-4 border-black rounded-lg shadow-[10px_10px_0_rgba(0,0,0,0.2)] flex flex-col relative overflow-hidden">
            {/* Window */}
            <div className="w-[66px] h-[74px] bg-blue-50 border-2 border-black/10 mx-auto mt-2 rounded flex items-end justify-center overflow-hidden">
               <div className="w-14 h-24 mb-[-10px] animate-pulse-slow">
                  <StickMan />
               </div>
            </div>
            {/* Bottom Panel */}
            <div className="flex-1 bg-black flex items-center justify-center">
               <div className="text-[10px] font-black text-white uppercase tracking-tighter">CAR 03-A</div>
            </div>
            {/* Cables Attachment */}
            <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-black rotate-45"></div>
         </div>
      </div>

      {/* HUD Panel - Enhanced for Legibility and Spacing */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-none flex flex-col items-center gap-3">
        <div className="bg-white border-4 border-black px-10 py-4 shadow-[12px_12px_0_rgba(0,0,0,1)] flex flex-col items-center min-w-[340px]">
          <span className="text-[11px] font-black text-black/50 uppercase tracking-[0.4em]">CURRENT ALTITUDE</span>
          <div className="text-5xl font-mono font-bold text-black tabular-nums leading-none mt-1">
            {currentAltitude.toLocaleString()} <span className="text-xl font-normal opacity-40">m</span>
          </div>
        </div>
        <div className="bg-white border-4 border-black px-8 py-2.5 rounded-full text-sm font-black text-black shadow-xl flex items-center gap-4">
           <div className="w-3 h-3 rounded-full bg-blue-600 animate-ping"></div>
           <span className="tracking-widest">{currentMilestone.title.toUpperCase()}</span>
        </div>
      </div>

      {/* Atmosphere Axis Labels */}
      <div className="fixed right-16 top-0 bottom-0 w-px bg-black/5 flex flex-col justify-around text-[12px] font-black text-black/20 uppercase tracking-[2em] pointer-events-none [writing-mode:vertical-rl] z-0">
         <span>Troposphere</span>
         <span>Stratosphere</span>
         <span>Mesosphere</span>
         <span>Thermosphere</span>
         <span>Exosphere</span>
         <span>The Eternal Void</span>
      </div>

      {/* World Content */}
      <div className="relative w-full h-[2500vh] z-10">
        
        {/* Intro - Adjusted Z and Spacing to prevent overlap */}
        <div className="absolute top-[200px] left-48 pointer-events-none z-20">
           <div className="bg-white border-[10px] border-black p-12 shadow-[25px_25px_0_rgba(0,0,0,0.1)]">
              <h1 className="text-9xl font-black text-black font-[Orbitron] mb-2 uppercase italic tracking-tighter leading-none">ASCENT</h1>
              <p className="text-black/60 font-black uppercase tracking-[0.5em] text-lg mt-4">The Space Elevator of Recursive Logic</p>
           </div>
           <div className="mt-16 flex items-center gap-8 text-black font-black uppercase tracking-widest text-2xl">
              <ArrowUp size={64} className="animate-bounce stroke-[5]" /> 
              <span className="bg-black text-white px-6 py-2 shadow-lg">Scroll to Launch</span>
           </div>
        </div>

        {/* Floating Background Formulas - Higher Contrast */}
        {MILESTONES.filter(m => m.formula).map((m, i) => (
           <div 
             key={`formula-${m.id}`}
             className="absolute font-serif text-black/20 text-6xl select-none pointer-events-none italic whitespace-nowrap"
             style={{ 
               top: `${(m.altitude / maxAltitude) * 100}%`, 
               left: `${(i % 2 === 0 ? 10 : 80)}%`,
               transform: `rotate(${i % 2 === 0 ? -12 : 12}deg)` 
             }}
           >
             {m.formula}
           </div>
        ))}

        {/* Exhibit Cards - Fine-tuned proximity and appearance timing */}
        {MILESTONES.map((m) => {
          const mProgress = (m.altitude / maxAltitude);
          const distFromElevator = Math.abs(currentAltitude - m.altitude);
          const maxVisibleDist = 18000; 
          const isVisible = distFromElevator < maxVisibleDist;
          const proximityScale = 1 - (distFromElevator / maxVisibleDist);
          
          return (
            <div 
              key={m.id}
              className={`absolute w-[420px] transition-all duration-300 flex flex-col items-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-32 scale-90 pointer-events-none'}`}
              style={{ 
                top: `${mProgress * 100}%`,
                left: `${m.horizontalPos}%`,
                zIndex: isVisible ? 40 : 10
              }}
            >
              <div className={`border-[6px] p-8 transition-all ${getEraFrame(m.eraStyle, proximityScale)} flex flex-col group`}>
                <div className="flex items-start gap-6 mb-6">
                   <div className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform">
                      {m.visual}
                   </div>
                   <div className="flex-1">
                      <div className="text-[12px] font-black uppercase tracking-[0.3em] mb-1 opacity-60">
                        {m.year} • {m.category}
                      </div>
                      <h3 className="text-2xl font-black leading-tight uppercase tracking-tighter">
                        {m.title}
                      </h3>
                   </div>
                </div>
                <p className="text-base leading-relaxed font-bold">
                   {m.description}
                </p>
                {m.formula && (
                   <div className="mt-6 pt-6 border-t-[3px] border-current/20 font-mono text-[11px] opacity-70 italic overflow-hidden text-ellipsis">
                      {m.formula}
                   </div>
                )}
                <div className="absolute -bottom-5 left-10 bg-black text-white px-4 py-1.5 text-xs font-black uppercase shadow-lg">
                   POINT: {m.altitude}m
                </div>
              </div>
            </div>
          );
        })}

        {/* Decorative Environmental Milestones */}
        {DECORATIONS.map((d, i) => {
           const dProgress = (d.alt / maxAltitude);
           const distFromElevator = Math.abs(currentAltitude - d.alt);
           const isVisible = distFromElevator < 20000;
           
           return (
              <div 
                key={`decor-${i}`} 
                className={`absolute left-0 right-0 pointer-events-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ top: `${dProgress * 100}%` }}
              >
                 <div className="flex items-center gap-12 px-56">
                    <div className="h-[2px] flex-1 bg-black/40 border-t-[3px] border-dashed border-black/20"></div>
                    <div className="bg-white border-4 border-black text-black px-8 py-3 shadow-[10px_10px_0_rgba(0,0,0,0.1)] flex items-center gap-4">
                       <d.icon size={24} className="text-blue-600" />
                       <div className="flex flex-col">
                          <span className="text-[12px] font-black uppercase tracking-widest leading-none">{d.label}</span>
                          <span className="text-[10px] font-bold opacity-50 mt-1">{d.alt} meters</span>
                       </div>
                    </div>
                    <div className="h-[2px] flex-1 bg-black/40 border-t-[3px] border-dashed border-black/20"></div>
                 </div>
              </div>
           );
        })}

        {/* Peak Exhibit - The Infinite Terminal */}
        <div className="absolute bottom-0 left-0 w-full h-screen flex flex-col items-center justify-center text-center p-12 bg-gradient-to-t from-black via-slate-900 to-transparent">
           <div className="max-w-3xl mx-auto flex flex-col items-center animate-in zoom-in duration-1000">
              <div className="w-40 h-40 bg-white rounded-full border-[10px] border-black flex items-center justify-center mb-12 shadow-[0_0_100px_rgba(255,255,255,0.3)] animate-pulse">
                 <InfinityIcon size={80} className="text-black" />
              </div>
              <h2 className="text-8xl font-black text-white mb-10 uppercase tracking-tighter font-[Orbitron] leading-none">The Edge of Infinity</h2>
              <div className="bg-white border-[8px] border-black p-12 shadow-[20px_20px_0_rgba(255,255,255,0.1)]">
                <p className="text-3xl text-blue-600 font-black italic mb-8 font-serif leading-tight">
                   "The next fractal has not been named yet."
                </p>
                <p className="text-lg text-slate-800 font-bold max-w-lg mx-auto leading-relaxed">
                   Humanity's climb through recursive logic is just beginning. Every grain of detail in the void is a door to a new dimension.
                </p>
              </div>
              <div className="mt-20 flex flex-col items-center gap-8">
                 <Rocket size={64} className="text-white animate-bounce" />
                 <div className="h-80 w-[6px] bg-gradient-to-b from-white to-transparent"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Museum Label */}
      <footer className="fixed bottom-6 right-8 text-[12px] text-black/40 font-black uppercase tracking-[1em] pointer-events-none z-[110]">
         DEPT. OF MATHEMATICAL ASCENT • V.3.1
      </footer>

      <style>{`
        .animate-spin-slow {
          animation: spin 90s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};
