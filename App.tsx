
import React, { useState, useRef, useEffect, memo } from 'react';
import { FractalVis, FractalVisRef } from './components/FractalVis';
import { AlgorithmicArt, AlgorithmicArtRef, ArtPatternType, ColorScheme } from './components/AlgorithmicArt';
import { DetectAndPaint } from './components/DetectAndPaint'; 
import { CommunityGallery } from './components/CommunityGallery'; 
import { Settings } from './components/Settings'; 
import { TutorialModal } from './components/TutorialModal';
import { RealWorldApps } from './components/RealWorldApps';
import { TimelineInfinite } from './components/TimelineInfinite';
import { FractalMode, AnimationPreset, MusicPreset, AudioSource } from './types';
import { getFractalInsight } from './services/geminiService';
import { audioService } from './services/audioService';
import { 
  Box, Layers, Share2, Download, RefreshCw, Save, Settings as SettingsIcon, Keyboard, ChevronDown,
  PlayCircle, Activity, Zap, LayoutGrid, Sliders, Hand, X, Palette, Play, Grid,
  Maximize2, Minimize2, Video, MousePointer,
  Sparkles, Atom, Brain, ImageIcon, Users, Clock,
  BookOpen, HelpCircle, Folder, Shuffle, Wand2, TreeDeciduous, Triangle, Hexagon, Flower, Wind, CloudLightning,
  List, RotateCw, Check, Camera, Move3d, ZoomIn, ZoomOut, Maximize, Music, Mic, MicOff, Tv, Globe, History,
  Key, ArrowLeft
} from 'lucide-react';

// Memoized Sub-component for Volume Level to prevent App-wide re-renders
const VolumeIndicator = memo(() => {
  const [level, setLevel] = useState(0);
  
  useEffect(() => {
    let frame: number;
    const update = () => {
      if (audioService.getIsActive()) {
        const analysis = audioService.getAnalysis();
        setLevel(analysis.volume);
      } else {
        setLevel(0);
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-[9px] text-gray-500 mb-1"><span>Live Sync Level</span></div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-75" style={{ width: `${Math.min(100, level * 100)}%` }}></div>
        </div>
      </div>
      <div className="bg-black/50 p-2 rounded border border-white/5 overflow-hidden">
        <div className="text-[8px] text-gray-500 uppercase tracking-tighter mb-2 flex justify-between"><span>Spectral Response</span><span>60 FPS</span></div>
        <div className="flex items-end gap-0.5 h-10">
          {[...Array(12)].map((_, i) => (
            <Bar key={i} volume={level} />
          ))}
        </div>
      </div>
    </div>
  );
});

const Bar = memo(({ volume }: { volume: number }) => {
    const [h, setH] = useState(5);
    useEffect(() => {
        setH(Math.random() * (volume * 100) + 5);
    }, [volume]);
    return <div className="flex-1 bg-gradient-to-t from-purple-900/40 to-purple-400/80 rounded-t-sm transition-all duration-100" style={{ height: `${h}%` }}></div>;
});

const formatModeName = (mode: FractalMode) => {
    switch (mode) {
        case FractalMode.MANDELBULB_3D: return "Mandelbulb 3D";
        case FractalMode.JULIA_2D: return "Julia Set (2D)";
        case FractalMode.MANDELBROT: return "Mandelbrot Set";
        case FractalMode.TRICORN: return "Tricorn Fractal";
        case FractalMode.BURNING_SHIP: return "Burning Ship";
        case FractalMode.MENGER_SPONGE: return "Menger Sponge";
        case FractalMode.SIERPINSKI: return "Sierpinski Tet";
        default: return mode;
    }
};

const ART_PRESETS = [
   { name: "Fractal Tree", type: "Trees", icon: TreeDeciduous, code: 'FRACTAL_TREE' },
   { name: "Binary Tree", type: "Trees", icon: TreeDeciduous, code: 'BINARY_TREE' },
   { name: "Pythagoras Tree", type: "Trees", icon: Grid, code: 'PYTHAGORAS_TREE' },
   { name: "Fractal Bush", type: "Trees", icon: TreeDeciduous, code: 'FRACTAL_BUSH' },
   { name: "Koch Snowflake", type: "Curves", icon: Hexagon, code: 'KOCH_SNOWFLAKE' },
   { name: "Sierpinski Triangle", type: "Geometric", icon: Triangle, code: 'SIERPINSKI_TRIANGLE' },
   { name: "Dragon Curve", type: "Curves", icon: Wind, code: 'DRAGON_CURVE' },
   { name: "Levy C Curve", type: "Curves", icon: Wind, code: 'LEVY_C_CURVE' },
   { name: "Sierpinski Carpet", type: "Geometric", icon: Box, code: 'SIERPINSKI_CARPET' },
   { name: "Cantor Set", type: "Geometric", icon: Sliders, code: 'CANTOR_SET' },
   { name: "Fractal Lightning", type: "Nature", icon: Zap, code: 'FRACTAL_LIGHTNING' },
   { name: "Coral Branching", type: "Nature", icon: CloudLightning, code: 'CORAL_BRANCHING' },
   { name: "Algae Pattern", type: "L-Systems", icon: Flower, code: 'ALGAE_L_SYSTEM' },
   { name: "Flower Fractal", type: "L-Systems", icon: Flower, code: 'FLOWER_FRACTAL' },
];

const App: React.FC = () => {
  const [apiKeySelected, setApiKeySelected] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      setApiKeySelected(hasKey);
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    await (window as any).aistudio.openSelectKey();
    setApiKeySelected(true);
  };

  const [activeTab, setActiveTab] = useState('EXPLORER');

  const [mode, setMode] = useState<FractalMode>(FractalMode.JULIA_2D);
  const [stats, setStats] = useState<string>("Initializing...");
  const [insight, setInsight] = useState<string>("");
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [fractalDropdownOpen, setFractalDropdownOpen] = useState(false);
  
  const [controlsOpen, setControlsOpen] = useState(true);
  const [musicControlsOpen, setMusicControlsOpen] = useState(true);
  
  const [activeAnimation, setActiveAnimation] = useState<AnimationPreset>('NONE');
  const [isInteractive, setIsInteractive] = useState(false); 

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isAnimationOpen, setIsAnimationOpen] = useState(false);

  const [attractionSens, setAttractionSens] = useState(1.0);
  const [pinchSens, setPinchSens] = useState(1.0);
  const [morphSpeed, setMorphSpeed] = useState(0.1);

  const [iterations, setIterations] = useState(128); 
  const [power, setPower] = useState(8.0);
  const [colorMode, setColorMode] = useState(0); 

  const [musicMode, setMusicMode] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioSource>('BROWSER_TAB');
  const [audioSensitivity, setAudioSensitivity] = useState(1.0);
  const [musicPreset, setMusicPreset] = useState<MusicPreset>('MODERATE');
  const [audioActive, setAudioActive] = useState(false);

  const visRef = useRef<FractalVisRef>(null);

  const artRef = useRef<AlgorithmicArtRef>(null);
  const [artPattern, setArtPattern] = useState<ArtPatternType>('FRACTAL_TREE');
  const [artDepth, setArtDepth] = useState(10);
  const [artAngle, setArtAngle] = useState(25);
  const [artRatio, setArtRatio] = useState(0.7);
  const [artRandomness, setArtRandomness] = useState(0.0);
  const [artAnimate, setArtAnimate] = useState(false);
  const [artColorScheme, setArtColorScheme] = useState<ColorScheme>('COSMIC');
  const [artZoom, setArtZoom] = useState(1.0);
  
  const [isArtBrowseOpen, setIsArtBrowseOpen] = useState(false);
  const [artPatternDropdownOpen, setArtPatternDropdownOpen] = useState(false);
  
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const is2DMode = mode === FractalMode.JULIA_2D || mode === FractalMode.MANDELBROT || mode === FractalMode.TRICORN || mode === FractalMode.BURNING_SHIP;
  const is3DMode = mode === FractalMode.MANDELBULB_3D || mode === FractalMode.MENGER_SPONGE || mode === FractalMode.SIERPINSKI;

  const handleToggleMusic = async () => {
    if (!musicMode) {
      const success = await audioService.start(audioSource);
      if (success) {
        setMusicMode(true);
        setAudioActive(true);
      } else {
        setMusicMode(false);
        setAudioActive(false);
      }
    } else {
      audioService.stop();
      setMusicMode(false);
      setAudioActive(false);
    }
  };

  useEffect(() => {
    if (musicPreset === 'GENTLE') setAudioSensitivity(0.5);
    else if (musicPreset === 'MODERATE') setAudioSensitivity(1.0);
    else if (musicPreset === 'INTENSE') setAudioSensitivity(2.2);
  }, [musicPreset]);

  const handleDownload = () => {
      let dataUrl = "";
      if (activeTab === 'EXPLORER' && visRef.current) dataUrl = visRef.current.captureImage();
      else if (activeTab === 'ART' && artRef.current) dataUrl = artRef.current.captureImage();

      if (dataUrl) {
          const link = document.createElement('a');
          link.download = `fractal_${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
      }
  };

  const handleShare = () => {
      let dataUrl = "";
      if (activeTab === 'EXPLORER' && visRef.current) dataUrl = visRef.current.captureImage();
      else if (activeTab === 'ART' && artRef.current) dataUrl = artRef.current.captureImage();

      if (dataUrl && navigator.share) {
          fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "art.png", { type: "image/png" });
                navigator.share({ title: 'Fractal Art', text: 'Created with Fractal Universe', files: [file] }).catch(console.error);
            });
      }
  };

  const playAnimation = (preset: AnimationPreset) => {
      setActiveAnimation(preset);
      setIsAnimationOpen(false); 
  };

  const PresetCard = ({ title, desc, icon: Icon, onClick }: { title: string, desc: string, icon: any, onClick?: () => void }) => (
    <button onClick={onClick} className="w-full text-left p-4 rounded-xl bg-[#13141f] hover:bg-[#1e1f2e] border border-white/5 hover:border-purple-500/30 transition-all group mb-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/10 group-hover:to-transparent transition-all"></div>
      <div className="flex items-start gap-3 relative z-10">
        <div className="p-2 rounded-lg bg-[#0a0b10] text-purple-400 group-hover:text-purple-300 ring-1 ring-white/5">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white flex items-center justify-between w-full">
            {title}
            <PlayCircle size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400 ml-2" />
          </h4>
          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
    </button>
  );

  const NavItem = ({ icon: Icon, label, id }: { icon: any, label: string, id: string }) => (
    <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex flex-col items-center justify-center gap-2 p-3 transition-all relative group ${activeTab === id ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}
    >
        <div className={`p-3 rounded-xl transition-all ${activeTab === id ? 'bg-purple-500/10 ring-1 ring-purple-500/50' : 'group-hover:bg-white/5'}`}>
            <Icon size={24} strokeWidth={1.5} />
        </div>
        <span className="text-[9px] font-bold text-center leading-none tracking-wide">{label}</span>
        {activeTab === id && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-purple-500 rounded-l-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>}
    </button>
  );

  const ArtPresetItem = ({ name, type, icon: Icon, active, onClick }: any) => (
      <div onClick={onClick} className={`cursor-pointer p-3 rounded-lg border flex items-center gap-3 transition-all ${active ? 'bg-purple-900/20 border-purple-500/50' : 'bg-[#1a1b26] border-white/5 hover:border-white/10'}`}>
          <div className="p-2 bg-[#0a0b10] rounded text-purple-400"><Icon size={16} /></div>
          <div>
              <div className="text-xs font-bold text-gray-200">{name}</div>
              <div className="text-[10px] text-gray-500">{type}</div>
          </div>
      </div>
  );

  if (!apiKeySelected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white p-8 font-sans">
        <div className="max-w-md w-full bg-[#0c0d15] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Key className="text-purple-400" size={40} />
          </div>
          <h1 className="text-2xl font-bold mb-4 font-[Orbitron]">API Key Required</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            To access high-quality image generation and complex mathematical analysis, you must select an API key from a paid Google Cloud project.
          </p>
          <div className="space-y-4">
            <button
              onClick={handleSelectKey}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              Select API Key
            </button>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="block text-xs text-gray-500 hover:text-purple-400 transition-colors">Learn about Gemini API billing</a>
          </div>
        </div>
      </div>
    );
  }

  // SPECIAL IMMERSIVE MODE FOR TIMELINE
  if (activeTab === 'TIMELINE') {
    return (
      <div className="h-screen bg-black overflow-hidden relative">
        <button 
          onClick={() => setActiveTab('EXPLORER')}
          className="fixed top-8 left-8 z-[100] p-3 bg-black/50 backdrop-blur border border-white/10 rounded-full text-white hover:bg-white/10 transition-all group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <TimelineInfinite />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-gray-300 font-sans selection:bg-purple-500/30 selection:text-white overflow-hidden relative">
      <aside className="w-[100px] bg-black border-r border-white/10 flex flex-col items-center py-6 gap-2 shrink-0 z-50 shadow-2xl">
          <div className="mb-4 text-purple-500"><Zap size={32}/></div>
          <NavItem icon={Sparkles} label="EXPLORER" id="EXPLORER" />
          <NavItem icon={Atom} label="ALGORITHMIC ART" id="ART" />
          <NavItem icon={Brain} label="DETECT & PAINT" id="DETECT" />
          <NavItem icon={Globe} label="REAL WORLD APPS" id="APPS" />
          <NavItem icon={History} label="TIMELINE" id="TIMELINE" />
          <NavItem icon={ImageIcon} label="COMMUNITY" id="COMMUNITY" />
          <div className="mt-auto w-full flex flex-col items-center gap-2">
            <div className="w-12 h-[1px] bg-white/5 my-2"></div>
            <NavItem icon={SettingsIcon} label="SETTINGS" id="SETTINGS" />
          </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} type="TUTORIAL" />
      <TutorialModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} type="HELP" />

      {activeTab === 'EXPLORER' && (
        <>
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/90 h-[80px] shrink-0 sticky top-0 z-40">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full mb-2"></div>
                    <h1 className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase">Interactive Mathematical Visualization</h1>
                  </div>
                  {musicMode && (
                    <div className="flex items-center gap-2 bg-purple-900/20 border border-purple-500/30 rounded-full px-3 py-1 animate-pulse">
                      {audioSource === 'BROWSER_TAB' ? <Tv size={12} className="text-purple-400" /> : <Mic size={12} className="text-purple-400" />}
                      <span className="text-[10px] font-bold text-purple-300 uppercase tracking-tighter">Sync: {audioSource.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center bg-[#13141f] border border-white/5 rounded-lg p-1">
                        <button onClick={() => setMode(FractalMode.JULIA_2D)} className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${is2DMode ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}><Maximize2 size={12} /> 2D</button>
                        <button onClick={() => setMode(FractalMode.MANDELBULB_3D)} className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${is3DMode ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}><Box size={12} /> 3D</button>
                    </div>
                    <button onClick={() => setIsInteractive(!isInteractive)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border ${isInteractive ? 'bg-purple-600 text-white border-purple-500 shadow-lg' : 'bg-[#13141f] text-gray-400 border-white/5 hover:text-white'}`}><Move3d size={14} /> {isInteractive ? 'Interactive Gestures' : 'Standard View'}</button>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setIsAdvancedOpen(true)} className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#13141f] border border-white/5 rounded-lg hover:bg-[#1e1f2e] transition-colors text-gray-400 hover:text-white"><SettingsIcon size={14} /> Advanced</button>
                      <button onClick={() => setIsShortcutsOpen(true)} className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#13141f] border border-white/5 rounded-lg hover:bg-[#1e1f2e] transition-colors text-gray-400 hover:text-white"><Keyboard size={14} /> Shortcuts</button>
                    </div>
                </div>
            </header>
            <main className="flex flex-1 p-6 gap-6 h-[calc(100vh-80px)] overflow-hidden">
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="relative flex-1 bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black group">
                        {isInteractive && (
                            <div className="absolute bottom-6 right-6 z-30 bg-black/60 backdrop-blur border border-white/10 rounded-xl p-4 flex flex-col gap-2">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gesture Guide</div>
                                <div className="flex items-center gap-2 text-xs text-white"><span className="text-xl">✋</span> <span className="font-bold">Palm</span> Hover / Steer</div>
                                <div className="flex items-center gap-2 text-xs text-white"><span className="text-xl">✊</span> <span className="font-bold">Fist</span> Grab / Rotate</div>
                                <div className="flex items-center gap-2 text-xs text-white"><span className="text-xl">👌</span> <span className="font-bold">Pinch</span> Zoom / Drag</div>
                                <div className="flex items-center gap-2 text-xs text-white"><span className="text-xl">👏</span> <span className="font-bold">Clap</span> Switch Mode</div>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            <button onClick={() => visRef.current?.zoomIn()} className="p-2 bg-[#0F1016]/80 hover:bg-[#1F212E] rounded-lg text-gray-400 hover:text-white border border-white/5 transition-colors"><ZoomIn size={16} /></button>
                            <button onClick={() => visRef.current?.zoomOut()} className="p-2 bg-[#0F1016]/80 hover:bg-[#1F212E] rounded-lg text-gray-400 hover:text-white border border-white/5 transition-colors"><ZoomOut size={16} /></button>
                            <button onClick={() => visRef.current?.resetView()} className="p-2 bg-[#0F1016]/80 hover:bg-[#1F212E] rounded-lg text-gray-400 hover:text-white border border-white/5 transition-colors mr-2"><Maximize size={16} /></button>
                            <button onClick={() => window.location.reload()} className="p-2 bg-[#0F1016]/80 hover:bg-[#1F212E] rounded-lg text-gray-400 hover:text-white border border-white/5 transition-colors"><RefreshCw size={16} /></button>
                            <button onClick={handleDownload} className="p-2 bg-[#0F1016]/80 hover:bg-[#1F212E] rounded-lg text-gray-400 hover:text-white border border-white/5 transition-colors"><Download size={16} /></button>
                            <button onClick={handleShare} className="p-2 bg-[#0F1016]/80 hover:bg-[#1F212E] rounded-lg text-gray-400 hover:text-white border border-white/5 transition-colors"><Share2 size={16} /></button>
                        </div>
                        <FractalVis ref={visRef} mode={mode} onStatsUpdate={setStats} attractionSensitivity={attractionSens} pinchSensitivity={pinchSens} morphSpeed={morphSpeed} iterations={iterations} power={power} interactiveMode={isInteractive} activeAnimation={activeAnimation} colorMode={colorMode} musicMode={musicMode} audioSensitivity={audioSensitivity} />
                    </div>
                </div>
                <div className="w-[300px] flex flex-col gap-4 shrink-0 h-full overflow-y-auto custom-scrollbar">
                    <div className="bg-[#13141f] border border-purple-500/20 rounded-xl overflow-hidden shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
                        <button onClick={() => setMusicControlsOpen(!musicControlsOpen)} className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-2 text-purple-400"><Music size={14} /><h3 className="text-xs font-bold uppercase tracking-wider">Music Visualizer</h3></div>
                            <ChevronDown size={14} className={`text-gray-500 transition-transform ${musicControlsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {musicControlsOpen && (
                            <div className="p-4 pt-0 border-t border-white/5 bg-[#0a0b10]/50 space-y-4">
                                <div className="mt-3 flex flex-col gap-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Audio Source</span>
                                    {!musicMode && (
                                      <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5">
                                        <button onClick={() => setAudioSource('BROWSER_TAB')} className={`px-2 py-1 rounded text-[9px] font-bold transition-all ${audioSource === 'BROWSER_TAB' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>Tab</button>
                                        <button onClick={() => setAudioSource('MICROPHONE')} className={`px-2 py-1 rounded text-[9px] font-bold transition-all ${audioSource === 'MICROPHONE' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>Mic</button>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Music Mode</span>
                                    <button onClick={handleToggleMusic} className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${musicMode ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'bg-gray-800 text-gray-500 border-white/5 hover:text-gray-300'}`}>{musicMode ? (audioSource === 'BROWSER_TAB' ? <Tv size={10}/> : <Mic size={10}/>) : <MicOff size={10}/>} {musicMode ? 'ACTIVE' : 'START'}</button>
                                  </div>
                                </div>
                                {musicMode && (
                                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                                    <VolumeIndicator />
                                    <div>
                                      <div className="flex justify-between text-[10px] mb-1.5 text-gray-400 font-bold"><span>Audio Sensitivity</span><span>{(audioSensitivity * 100).toFixed(0)}%</span></div>
                                      <input type="range" min="0.1" max="5" step="0.1" value={audioSensitivity} onChange={(e) => { setAudioSensitivity(parseFloat(e.target.value)); setMusicPreset('CUSTOM'); }} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                    </div>
                                  </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="bg-[#13141f] border border-white/5 rounded-xl overflow-hidden shrink-0">
                        <button onClick={() => setControlsOpen(!controlsOpen)} className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-2 text-gray-400"><MousePointer size={14} /><h3 className="text-xs font-bold uppercase tracking-wider">Standard Controls</h3></div>
                            <ChevronDown size={14} className={`text-gray-500 transition-transform ${controlsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {controlsOpen && (
                            <div className="p-4 pt-0 border-t border-white/5 bg-[#0a0b10]/50 space-y-5">
                                <div className="mt-3">
                                    <div className="flex justify-between text-[10px] mb-1.5 text-gray-400 font-bold"><span>Attraction</span><span>{(attractionSens * 100).toFixed(0)}%</span></div>
                                    <input type="range" min="0" max="3" step="0.1" value={attractionSens} onChange={(e) => setAttractionSens(parseFloat(e.target.value))} className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="shrink-0">
                        <div className="flex items-center justify-between mb-2 text-gray-400 px-1">
                          <div className="flex items-center gap-2"><LayoutGrid size={14} /><h3 className="text-xs font-bold uppercase tracking-wider">Animation Presets</h3></div>
                        </div>
                        <PresetCard title="Mandelbrot Deep Dive" desc="Journey into the heart of the Mandelbrot set." icon={Activity} onClick={() => playAnimation('MANDELBROT_DIVE')} />
                    </div>
                </div>
            </main>
        </>
      )}

      {activeTab === 'ART' && (
        <>
           <header className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-black/90 backdrop-blur-md sticky top-0 z-40 h-[76px] shrink-0">
               <div>
                   <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-[Orbitron] tracking-wide">Algorithmic Art Studio</h1>
               </div>
           </header>
           <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 h-[calc(100vh-76px)] overflow-hidden">
               <div className="lg:col-span-3 flex flex-col gap-4">
                   <div className="relative flex-1 bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                       <AlgorithmicArt ref={artRef} pattern={artPattern} depth={artDepth} angle={artAngle} ratio={artRatio} randomness={artRandomness} animate={artAnimate} colorScheme={artColorScheme} zoom={artZoom} />
                   </div>
               </div>
               <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1 custom-scrollbar pb-10">
                   <div className="bg-[#13141f] border border-white/5 rounded-xl p-4 shrink-0 space-y-5">
                       <label className="text-xs font-bold text-gray-400 mb-3 block">Pattern Type</label>
                       <div className="relative">
                            <button onClick={() => setArtPatternDropdownOpen(!artPatternDropdownOpen)} className="w-full flex items-center justify-between p-3 bg-[#0a0b10] border border-white/5 rounded-lg text-sm text-gray-300 hover:text-white hover:border-white/10 transition-colors"><span className="text-xs font-bold">{artPattern.replace(/_/g,' ')}</span><ChevronDown size={14} /></button>
                            {artPatternDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1b26] border border-white/10 rounded-lg shadow-xl z-50 p-2 space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {ART_PRESETS.map((preset) => (
                                        <ArtPresetItem key={preset.code} name={preset.name} type={preset.type} icon={preset.icon} active={artPattern === preset.code} onClick={() => { setArtPattern(preset.code as ArtPatternType); setArtPatternDropdownOpen(false); }} />
                                    ))}
                                </div>
                            )}
                       </div>
                   </div>
               </div>
           </main>
        </>
      )}

      {activeTab === 'DETECT' && <DetectAndPaint />}
      {activeTab === 'APPS' && <RealWorldApps />}
      {activeTab === 'COMMUNITY' && <CommunityGallery />}
      {activeTab === 'SETTINGS' && <Settings />}
      
      </div>
    </div>
  );
};

export default App;
