import React, { useState, useEffect } from 'react';
import { Smartphone, Clapperboard, HeartPulse, TreePine, Image, CloudDrizzle, Gamepad2, Mountain, Wifi, Brain, Building, Telescope, Lock, Sigma, Music, Milestone, Car, Droplets, Network, Snowflake, Globe, Lightbulb, TestTube, Factory } from 'lucide-react';
import { APPLICATIONS_DATA } from '../src/data/applications.tsx';

interface Application {
  id: number;
  category: string;
  title: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  howItWorks: string;
  realExample: string;
  impact: string;
  visualization: string;
  funFact: string;
  image: React.ReactNode;
}

const ApplicationCard = ({ app, isVisible }: { app: Application, isVisible: boolean }) => {
  return (
    <div
      className={`group bg-gray-900/50 border border-purple-500/20 rounded-2xl p-6 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:border-purple-400 transition-all duration-300 ease-in-out transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="text-5xl transition-transform duration-300 group-hover:scale-110">{app.icon}</div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase text-purple-400 tracking-wider mb-1">
            {app.category}
          </div>
          <h3 className="text-2xl font-bold text-gray-100">{app.title}</h3>
          <div className="text-gray-400 italic">{app.tagline}</div>
        </div>
      </div>
      <p className="text-gray-300 leading-relaxed my-4">{app.description}</p>
      <div className="bg-gray-800/50 p-4 rounded-lg my-4 border-l-4 border-purple-500">
        <h4 className="font-bold text-purple-300 flex items-center gap-2 mb-2">
          <Lightbulb size={16} /> How It Works
        </h4>
        <p className="text-sm text-gray-300">{app.howItWorks}</p>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg my-4 border-l-4 border-cyan-500">
        <h4 className="font-bold text-cyan-300 flex items-center gap-2 mb-2">
          <TestTube size={16} /> Real Example
        </h4>
        <p className="text-sm text-gray-300">{app.realExample}</p>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg my-4 border-l-4 border-pink-500">
        <h4 className="font-bold text-pink-300 flex items-center gap-2 mb-2">
          <Globe size={16} /> Real-World Impact
        </h4>
        <p className="text-sm text-gray-300">{app.impact}</p>
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg my-4 border-l-4 border-amber-500">
        <div className="flex items-start gap-3">
          <Lightbulb size={16} className="text-amber-300 mt-1" />
          <div>
            <h4 className="font-bold text-amber-300">Fun Fact</h4>
            <p className="text-sm text-gray-300">{app.funFact}</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 pt-6 border-t-2 border-dashed border-gray-700 text-gray-400">
        {app.image}
      </div>
    </div>
  );
};

interface ApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({ isOpen, onClose }) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [visibleCards, setVisibleCards] = useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setVisibleCards(false);
      setTimeout(() => {
        setVisibleCards(true);
        if (modalRef.current) {
          modalRef.current.scrollTop = 0;
        }
      }, 10);
    }
  }, [isOpen, currentFilter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);


  if (!isOpen) {
    return null;
  }

  const filteredData = currentFilter === 'all'
    ? APPLICATIONS_DATA
    : APPLICATIONS_DATA.filter(app => app.category === currentFilter);

  return (
    <div id="applications-section-modal" ref={modalRef} className="fixed inset-0 bg-black z-[2000] overflow-y-auto">
      <div className="sticky top-0 bg-black/80 backdrop-blur-lg p-5 border-b-2 border-purple-500/20 z-[2001] flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">🌍 Fractals in the Real World</h1>
          <p className="text-purple-300 mt-1">See how the mathematics you're exploring powers our modern world</p>
        </div>
        <button onClick={onClose} className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition">
          ✕ Close
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-5 sm:p-10">
        <div className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-8 mb-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-purple-300 mb-4">📱 From Your Screen to Outer Space</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            The fractals you're exploring in ARS MATHICA aren't just mathematical curiosities—they're actively shaping the world around you right now. From the antenna in your smartphone to the special effects in your favorite movies, from weather forecasts to cancer detection, fractals are everywhere.
          </p>
          <div className="bg-purple-900/20 p-5 rounded-lg mt-6 border-l-4 border-purple-500">
            <p className="font-semibold text-gray-200">
              <strong>Did you know?</strong> The device you're using right now contains at least 3 different fractal-based technologies!
            </p>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-5 mb-8 shadow-2xl">
          <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
            <button className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] ${currentFilter === 'all' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} onClick={() => setCurrentFilter('all')}>🌟 All Applications</button>
            <button className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] ${currentFilter === 'technology' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} onClick={() => setCurrentFilter('technology')}>📱 Technology</button>
            <button className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] ${currentFilter === 'nature' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} onClick={() => setCurrentFilter('nature')}>🌿 Nature</button>
            <button className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] ${currentFilter === 'medicine' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} onClick={() => setCurrentFilter('medicine')}>🏥 Medicine</button>
            <button className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] ${currentFilter === 'entertainment' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} onClick={() => setCurrentFilter('entertainment')}>🎬 Entertainment</button>
            <button className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] ${currentFilter === 'science' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} onClick={() => setCurrentFilter('science')}>🔬 Science</button>
            <button className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] ${currentFilter === 'engineering' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`} onClick={() => setCurrentFilter('engineering')}>🏗️ Engineering</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredData.map((app, index) => (
              <div key={app.id} style={{ transitionDelay: `${index * 50}ms`}}>
                  <ApplicationCard app={app} isVisible={visibleCards} />
              </div>
          ))}
        </div>

        <div className="bg-gray-900/50 border border-purple-500/20 rounded-2xl p-8 mt-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">🤯 Mind-Blowing Fractal Facts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 p-5 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition">
                    <div className="text-4xl mb-2">📏</div>
                    <h3 className="font-bold text-purple-200 text-lg">Infinite Coastlines</h3>
                    <p className="text-gray-300">The coastline of Britain is infinitely long! As you measure at smaller scales, the length keeps increasing—this is called the coastline paradox.</p>
                </div>
                <div className="bg-gray-800/50 p-5 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition">
                    <div className="text-4xl mb-2">🌳</div>
                    <h3 className="font-bold text-purple-200 text-lg">Broccoli Mathematics</h3>
                    <p className="text-gray-300">Romanesco broccoli is a perfect natural fractal—each floret is a miniature version of the whole, showing Fibonacci spirals!</p>
                </div>
                <div className="bg-gray-800/50 p-5 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition">
                    <div className="text-4xl mb-2">💰</div>
                    <h3 className="font-bold text-purple-200 text-lg">Stock Market Chaos</h3>
                    <p className="text-gray-300">Stock prices follow fractal patterns! The same mathematical structure appears whether you look at hourly, daily, or yearly charts.</p>
                </div>
                <div className="bg-gray-800/50 p-5 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition">
                    <div className="text-4xl mb-2">🫁</div>
                    <h3 className="font-bold text-purple-200 text-lg">Your Lungs</h3>
                    <p className="text-gray-300">Your lungs use fractal branching to pack 70 square meters of surface area (half a tennis court!) into your chest cavity.</p>
                </div>
                <div className="bg-gray-800/50 p-5 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition">
                    <div className="text-4xl mb-2">⚡</div>
                    <h3 className="font-bold text-purple-200 text-lg">Lightning Strikes</h3>
                    <p className="text-gray-300">Lightning bolts follow fractal paths because electricity seeks the path of least resistance through turbulent air.</p>
                </div>
                <div className="bg-gray-800/50 p-5 rounded-xl border-l-4 border-purple-500 hover:shadow-lg transition">
                    <div className="text-4xl mb-2">🌌</div>
                    <h3 className="font-bold text-purple-200 text-lg">Universe Structure</h3>
                    <p className="text-gray-300">Galaxies cluster in fractal patterns across the universe—from tiny scales to billions of light-years!</p>
                </div>
            </div>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-10 mt-10 text-center shadow-2xl text-white">
            <h2 className="text-4xl font-bold mb-4">🎯 Try It Yourself!</h2>
            <p className="text-lg max-w-3xl mx-auto mb-6">
                Return to the main fractal explorer and zoom into different regions. Each application you've learned about started with someone curious enough to explore—just like you!
            </p>
            <button onClick={onClose} className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
                🔬 Back to Explorer
            </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;