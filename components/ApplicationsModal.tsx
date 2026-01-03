import React, { useState, useEffect } from 'react';

const APPLICATIONS_DATA = [
  {
    id: 1,
    category: 'technology',
    title: "Smartphone Antennas",
    icon: "📱",
    tagline: "The device in your pocket",
    description: "Modern smartphones use fractal antennas to receive multiple frequencies (4G, 5G, WiFi, Bluetooth, GPS) from a tiny space.",
    howItWorks: "Fractal designs create 'electrical length' much longer than physical size. A fractal antenna acts like multiple antennas in one, each tuned to different frequencies.",
    realExample: "Your phone's antenna uses patterns like the Hilbert curve or Koch snowflake to pack maximum reception into minimal space.",
    impact: "Without fractal antennas, phones would need multiple large antennas sticking out—impossible for slim modern designs!",
    visualization: "Imagine fitting a 10-meter antenna into a 5cm space by folding it into a fractal pattern.",
    funFact: "The first fractal antenna was patented in 1995. Now virtually every smartphone uses them!",
    image: "📱🔄📡"
  },

  {
    id: 2,
    category: 'entertainment',
    title: "Movie CGI & VFX",
    icon: "🎬",
    tagline: "Hollywood's secret weapon",
    description: "Blockbuster movies use fractal algorithms to generate realistic mountains, clouds, explosions, and alien worlds.",
    howItWorks: "Instead of manually creating millions of details, artists use fractal 'recipes' that generate infinite complexity automatically. One formula creates an entire mountain range!",
    realExample: "Disney's 'Frozen': Mountains and ice created using fractal noise. Pixar's 'Brave': Forest trees and landscapes. Avatar: Pandora's alien terrain.",
    impact: "What once took months of manual work now takes hours. Fractal CGI reduced production time and cost by 90%.",
    visualization: "A single fractal formula can generate 1000 unique, photorealistic mountains in seconds.",
    funFact: "The original Star Trek II (1982) featured the first fractal-generated planet—revolutionary for its time!",
    image: "🏔️🌋🎥"
  },

  {
    id: 3,
    category: 'medicine',
    title: "Cancer Detection",
    icon: "🏥",
    tagline: "Saving lives through math",
    description: "Doctors use fractal analysis to detect cancerous tumors earlier and more accurately than traditional methods.",
    howItWorks: "Healthy tissue has regular, predictable patterns. Cancer cells grow chaotically with irregular fractal dimensions. Computers measure these differences in medical scans.",
    realExample: "Lung cancer detection: Fractal analysis spots tumors 6-12 months earlier than visual inspection. Breast cancer: Improves mammogram accuracy by 15-20%.",
    impact: "Early detection increases survival rates from 20% to 90% for many cancers. Fractal analysis saves thousands of lives annually.",
    visualization: "Healthy blood vessels: Fractal dimension ≈ 1.7. Cancerous blood vessels: Fractal dimension ≈ 2.3",
    funFact: "Your heartbeat follows fractal patterns—deviations from this pattern can indicate heart disease!",
    image: "🫁💗🔬"
  },

  {
    id: 4,
    category: 'nature',
    title: "Tree Branching Patterns",
    icon: "🌳",
    tagline: "Nature's optimization algorithm",
    description: "Trees use fractal branching to maximize sunlight exposure while minimizing material (wood). Evolution discovered fractals millions of years ago!",
    howItWorks: "Each branch splits into smaller branches following similar ratios. This self-similar pattern maximizes leaf area for photosynthesis while maintaining structural strength.",
    realExample: "An oak tree's branches, your lung airways, river networks, and lightning bolts all follow similar fractal mathematics—da Vinci noticed this 500 years ago!",
    impact: "Engineers copy tree fractals to design efficient road networks, water distribution systems, and circuit boards.",
    visualization: "A tree with 5 generations of branching can have 1,000+ leaves from one trunk—maximum efficiency!",
    funFact: "The blood vessels in your body, if laid end-to-end, would circle Earth 2.5 times—packed efficiently using fractal design!",
    image: "🌲🌿🍃"
  },

  {
    id: 5,
    category: 'technology',
    title: "Image Compression",
    icon: "🖼️",
    tagline: "Storing photos efficiently",
    description: "Fractal image compression can shrink photo file sizes by 100x while maintaining quality—crucial for web and mobile apps.",
    howItWorks: "Instead of storing every pixel, the algorithm stores fractal 'recipes' that recreate similar patterns. Natural images contain lots of self-similar details perfect for this.",
    realExample: "Microsoft used fractal compression in Encarta encyclopedia. Netflix and YouTube use fractal techniques in their video compression.",
    impact: "Your phone can store 10,000 photos instead of 100. Websites load 10x faster. Streaming video became practical.",
    visualization: "A 10MB photo compressed to 100KB with minimal quality loss—perfect for mobile data!",
    funFact: "The JPEG format uses discrete cosine transforms, but newer fractal methods achieve even better compression!",
    image: "📸💾🗜️"
  },

  {
    id: 6,
    category: 'science',
    title: "Weather Prediction",
    icon: "🌤️",
    tagline: "Forecasting chaos",
    description: "Weather systems are chaotic and fractal. Understanding fractal patterns helps meteorologists predict storms and climate patterns.",
    howItWorks: "Clouds, air turbulence, and storm systems follow fractal mathematics. Supercomputers simulate these patterns to forecast weather.",
    realExample: "Hurricane prediction models use fractal analysis of wind patterns. Climate models predict global temperature changes using fractal ocean currents.",
    impact: "Modern weather forecasts are 90% accurate for 3 days ahead (vs. 50% in the 1980s). Saves billions in disaster prevention.",
    visualization: "A butterfly flapping wings in Brazil can theoretically cause a tornado in Texas—the chaos theory 'butterfly effect'!",
    funFact: "We can't predict weather beyond ~10 days because of chaotic fractal behavior—even with perfect data!",
    image: "⛈️🌪️☁️"
  },

  {
    id: 7,
    category: 'technology',
    title: "Video Game Worlds",
    icon: "🎮",
    tagline: "Infinite digital landscapes",
    description: "Games like Minecraft and No Man's Sky use fractal algorithms to generate massive, unique worlds procedurally.",
    howItWorks: "Fractals create endless variations from simple rules. One algorithm generates billions of unique planets, each with realistic terrain, vegetation, and features.",
    realExample: "No Man's Sky: 18 quintillion unique planets. Minecraft: Infinite worlds. Terraria, Starbound: Fractal generation creates exploration replay value.",
    impact: "Developers create massive game worlds without manually designing every detail. 1GB game file = infinite content.",
    visualization: "A single fractal seed generates an entire unique planet with mountains, valleys, caves, and ecosystems.",
    funFact: "The original Elite game (1984) used fractals to fit 8 galaxies with 256 planets each into just 32KB of memory!",
    image: "🗺️🏔️🎮"
  },

  {
    id: 8,
    category: 'engineering',
    title: "Earthquake Analysis",
    icon: "🌋",
    tagline: "Predicting Earth's movement",
    description: "Seismologists use fractal patterns to understand earthquake frequency and predict seismic activity.",
    howItWorks: "Earthquake magnitudes follow fractal 'power law' distributions—many small quakes, few large ones. Fault lines show fractal crack patterns.",
    realExample: "Japan's earthquake early warning system uses fractal analysis. Building codes require fractal-inspired flexible designs to absorb seismic waves.",
    impact: "Buildings designed with fractal principles survive earthquakes that destroy rigid structures. Early warnings save thousands of lives.",
    visualization: "For every magnitude 8 earthquake, there are ~10 magnitude 7s, ~100 magnitude 6s—fractal scaling!",
    funFact: "The San Andreas Fault's surface roughness is fractal—looks similar whether viewed from 1 meter or 1 kilometer!",
    image: "🏗️⚠️📊"
  },

  {
    id: 9,
    category: 'technology',
    title: "WiFi Router Optimization",
    icon: "📶",
    tagline: "Better internet at home",
    description: "Fractals help design better WiFi antennas and optimize router placement for maximum coverage.",
    howItWorks: "Fractal antennas radiate signals more uniformly in all directions. Fractal analysis predicts signal propagation through walls and obstacles.",
    realExample: "Modern mesh WiFi systems use fractal mathematics to calculate optimal node placement. Enterprise networks optimize coverage using fractal models.",
    impact: "Better WiFi coverage with fewer devices. Reduced dead zones. 30% better range than traditional antennas.",
    visualization: "Fractal antenna patterns create 'donut-shaped' coverage instead of narrow beams—perfect for home use.",
    funFact: "The fractal Hilbert curve antenna design is so efficient it's used in everything from routers to satellites!",
    image: "🌐📡✨"
  },

  {
    id: 10,
    category: 'medicine',
    title: "Brain Imaging Analysis",
    icon: "🧠",
    tagline: "Understanding consciousness",
    description: "Neurologists use fractal dimension analysis to study brain complexity and detect neurological disorders.",
    howItWorks: "Healthy brains show specific fractal patterns in neural connections. Alzheimer's, epilepsy, and schizophrenia alter these patterns detectably.",
    realExample: "MRI scans analyzed with fractal geometry detect Alzheimer's 5 years before symptoms appear. Epilepsy prediction improved by 40%.",
    impact: "Early intervention for brain diseases. Personalized treatment plans. Better understanding of consciousness and intelligence.",
    visualization: "Your brain has ~86 billion neurons with fractal branching—maximum connections in minimum space.",
    funFact: "The folding pattern of your brain's cortex is fractal—it packs 2.5 square meters into your skull!",
    image: "🧠🔬💭"
  },

  {
    id: 11,
    category: 'engineering',
    title: "Architecture & Building Design",
    icon: "🏛️",
    tagline: "Beauty meets efficiency",
    description: "Architects use fractal patterns to create visually stunning, structurally sound, and energy-efficient buildings.",
    howItWorks: "Fractal facades optimize solar exposure and natural ventilation. Repeated patterns at multiple scales create aesthetic appeal while reducing material waste.",
    realExample: "Eiffel Tower: Fractal-like structure for strength-to-weight ratio. Indian stepwells: Fractal water management. Modern green buildings: Fractal shading systems.",
    impact: "Buildings that are 40% more energy-efficient. Reduced construction costs. Enhanced structural integrity during earthquakes.",
    visualization: "A fractal facade provides shade when needed, allows light when desired—passive climate control!",
    funFact: "Many Islamic mosques and Hindu temples feature intricate fractal patterns—mathematical beauty for centuries!",
    image: "🕌🏗️✨"
  },

  {
    id: 12,
    category: 'science',
    title: "Astronomy & Galaxy Formation",
    icon: "🌌",
    tagline: "The universe's large-scale structure",
    description: "Galaxies, galaxy clusters, and cosmic voids follow fractal distributions across billions of light-years.",
    howItWorks: "Matter clusters fractally due to gravitational attraction. From planets to galaxy superclusters, self-similar patterns repeat at every scale.",
    realExample: "The Sloan Digital Sky Survey mapped millions of galaxies—they form a 'cosmic web' with fractal dimension ≈ 2.1.",
    impact: "Understanding fractal distribution helps cosmologists test theories of dark matter and the universe's evolution.",
    visualization: "From atomic nuclei to the observable universe—matter organizes fractally across 45 orders of magnitude!",
    funFact: "Saturn's rings show fractal patterns—gaps within gaps within gaps, creating mesmerizing structures!",
    image: "🪐🌠🔭"
  },

  {
    id: 13,
    category: 'technology',
    title: "Data Encryption & Security",
    icon: "🔐",
    tagline: "Protecting your information",
    description: "Chaos-based fractal encryption makes codes nearly impossible to crack, protecting everything from banking to military communications.",
    howItWorks: "Fractal and chaotic systems are extremely sensitive to initial conditions. Tiny changes create completely different outputs—perfect for encryption.",
    realExample: "Military communications use chaos-based encryption. Blockchain systems incorporate fractal hashing. Secure messaging apps use chaotic algorithms.",
    impact: "Modern encryption keeps billions of online transactions secure. Fractals help protect against quantum computer attacks.",
    visualization: "Changing one bit in a fractal encryption key completely scrambles the entire message—unbreakable without the exact key!",
    funFact: "Fractal encryption is so secure that even quantum computers struggle to crack it—future-proof security!",
    image: "🔒💻🛡️"
  },

  {
    id: 14,
    category: 'nature',
    title: "Coastline Measurement Paradox",
    icon: "🏖️",
    tagline: "How long is a beach?",
    description: "Coastlines are fractals—their length increases as measurement scale decreases, approaching infinity!",
    howItWorks: "At 100km scale, Britain's coast is ~2,800km. At 50km scale: ~3,400km. At 1m scale: ~7,000km. Smaller scales reveal more detail indefinitely.",
    realExample: "This paradox, discovered by Lewis Fry Richardson and popularized by Mandelbrot, revolutionized geography and mapmaking.",
    impact: "Changed how we measure natural boundaries. Led to fractal dimension concept. Explains why map scales matter critically.",
    visualization: "A 'smooth' coastline at 10km scale becomes jagged at 100m scale, and incredibly complex at 1m scale!",
    funFact: "Norway has the world's longest coastline (58,133 km) largely because its fractal fjords add infinite detail!",
    image: "🌊🗺️📐"
  },

  {
    id: 15,
    category: 'entertainment',
    title: "Music Synthesis & Sound Design",
    icon: "🎵",
    tagline: "Mathematical music",
    description: "Electronic musicians use fractal algorithms to create organic, evolving sounds impossible with traditional synthesis.",
    howItWorks: "Fractal and chaotic equations generate complex, non-repeating waveforms that sound natural and 'alive' rather than mechanical.",
    realExample: "Synthesizers like the Buchla and Serge use chaos circuits. Modern software like VCV Rack includes fractal oscillators. Ambient music relies heavily on fractal generation.",
    impact: "Created entirely new genres of electronic music. Film soundtracks use fractal audio for alien, otherworldly sounds.",
    visualization: "A fractal waveform never repeats exactly—like natural sounds from wind, water, or fire.",
    funFact: "Pink noise (1/f noise), found in nature and pleasing to ears, follows fractal mathematics!",
    image: "🎹🎧🌊"
  },

  {
    id: 16,
    category: 'science',
    title: "Oil & Mineral Exploration",
    icon: "🛢️",
    tagline: "Finding Earth's resources",
    description: "Geologists use fractal analysis to predict where oil, natural gas, and valuable minerals are hidden underground.",
    howItWorks: "Rock formations, fault lines, and mineral deposits follow fractal patterns. Analyzing these patterns reveals likely resource locations without expensive drilling.",
    realExample: "Oil companies save millions by using fractal seismic analysis to identify drilling sites. Mining companies map ore deposits using fractal geology.",
    impact: "Reduces exploration costs by 60%. Minimizes environmental impact by avoiding unnecessary drilling. Finds resources other methods miss.",
    visualization: "Fractal analysis of surface geology predicts underground structures 2km deep with 70% accuracy!",
    funFact: "The distribution of earthquakes, volcanoes, and mineral deposits all follow fractal power laws!",
    image: "⛏️💎🗺️"
  },

  {
    id: 17,
    category: 'engineering',
    title: "Traffic Flow Optimization",
    icon: "🚗",
    tagline: "Reducing congestion",
    description: "City planners use fractal mathematics to design road networks and optimize traffic light timing.",
    howItWorks: "Traffic patterns follow fractal 'cascading failure' dynamics. Small delays amplify into big jams. Fractal analysis predicts and prevents these cascades.",
    realExample: "Google Maps uses fractal traffic prediction. Singapore's smart traffic system reduces congestion by 30% using fractal algorithms.",
    impact: "Reduced commute times. Lower emissions. Better emergency vehicle routing. Smarter city infrastructure planning.",
    visualization: "A single blocked intersection creates fractal 'ripples' affecting traffic 5km away within 20 minutes!",
    funFact: "Traffic jams often emerge from nowhere due to fractal 'phantom jam' effects—even without accidents!",
    image: "🚦🗺️🚙"
  },

  {
    id: 18,
    category: 'medicine',
    title: "Blood Vessel Analysis",
    icon: "❤️",
    tagline: "Your fractal circulatory system",
    description: "Blood vessels form fractal networks optimized to deliver oxygen to every cell efficiently.",
    howItWorks: "From aorta to capillaries, vessels branch fractally—maximizing surface area while minimizing distance and pressure drop.",
    realExample: "Doctors detect cardiovascular disease by measuring deviations from healthy fractal patterns. Diabetic retinopathy diagnosed via fractal analysis of eye blood vessels.",
    impact: "Non-invasive disease detection. Early warning of heart attacks and strokes. Personalized treatment planning.",
    visualization: "Your 100,000 km of blood vessels fit in your body through fractal branching—engineering perfection!",
    funFact: "If your blood vessels were laid flat, they'd cover 600 square meters—yet fit inside you through fractals!",
    image: "💓🔬🩺"
  },

  {
    id: 19,
    category: 'technology',
    title: "5G Network Design",
    icon: "📡",
    tagline: "Next-gen connectivity",
    description: "5G cell towers use fractal antennas and fractal placement patterns to provide faster, more reliable coverage.",
    howItWorks: "Fractal antenna arrays can beam-form signals precisely to users. Network topology uses fractal distribution for optimal coverage density.",
    realExample: "India's 5G rollout uses fractal network planning. Urban 5G achieves 10 Gbps using fractal beamforming antennas.",
    impact: "100x faster speeds. Better coverage with fewer towers. Enable IoT, autonomous vehicles, smart cities.",
    visualization: "A fractal antenna array can focus signal like a spotlight, following moving users automatically!",
    funFact: "Future 6G networks will use even more advanced fractal techniques to achieve terabit speeds!",
    image: "📱⚡🌐"
  },

  {
    id: 20,
    category: 'nature',
    title: "Snowflake Formation",
    icon: "❄️",
    tagline: "Nature's mathematical artistry",
    description: "Every snowflake is unique, yet all follow fractal branching patterns determined by temperature and humidity.",
    howItWorks: "Water molecules crystallize following fractal growth rules. Tiny environmental variations create infinite unique patterns—all hexagonally symmetric.",
    realExample: "Wilson Bentley photographed 5,000 snowflakes (1885-1931)—no two alike, all fractal. Modern high-speed cameras capture formation in real-time.",
    impact: "Understanding snowflake fractals helps climate science, ice formation physics, and crystal growth technology.",
    visualization: "A snowflake's fractal branches can have branches-on-branches 5-6 levels deep—infinite complexity from simple rules!",
    funFact: "The idea that 'no two snowflakes are alike' is mathematically true—probabilities are astronomical!",
    image: "❄️🔬✨"
  }
];

const ApplicationCard = ({ app, isVisible }: { app: any, isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: isHovered ? '0 15px 50px rgba(0,0,0,0.2)' : '0 8px 30px rgba(0,0,0,0.12)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: 'flex', alignItems: 'start', gap: '20px', marginBottom: '20px' }}>
        <div style={{ fontSize: '56px', flexShrink: 0 }}>{app.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#11998e', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '5px' }}>
            {app.category.toUpperCase()}
          </div>
          <h3 style={{ margin: '0 0 8px 0', color: '#11998e', fontSize: '24px' }}>{app.title}</h3>
          <div style={{ color: '#666', fontStyle: 'italic', fontSize: '15px' }}>{app.tagline}</div>
        </div>
      </div>
      <p style={{ color: '#555', lineHeight: 1.8, margin: '20px 0', fontSize: '16px' }}>{app.description}</p>
      <div style={{ background: 'linear-gradient(135deg, #e6f9f5 0%, #d4f4ed 100%)', padding: '20px', borderRadius: '10px', margin: '20px 0', borderLeft: '4px solid #11998e' }}>
        <h4 style={{ color: '#11998e', margin: '0 0 12px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚙️</span> How It Works
        </h4>
        <p style={{ color: '#333', margin: 0, lineHeight: 1.7 }}>{app.howItWorks}</p>
      </div>
      <div style={{ background: '#fff9e6', padding: '20px', borderRadius: '10px', margin: '20px 0', borderLeft: '4px solid #ffc107' }}>
        <h4 style={{ color: '#ff9800', margin: '0 0 12px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🌟</span> Real Example
        </h4>
        <p style={{ color: '#333', margin: 0, lineHeight: 1.7 }}>{app.realExample}</p>
      </div>
      <div style={{ background: '#f0f4ff', padding: '20px', borderRadius: '10px', margin: '20px 0', borderLeft: '4px solid #667eea' }}>
        <h4 style={{ color: '#667eea', margin: '0 0 12px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💥</span> Real-World Impact
        </h4>
        <p style={{ color: '#333', margin: 0, lineHeight: 1.7 }}>{app.impact}</p>
      </div>
      <div style={{ background: '#fff0f0', padding: '15px 20px', borderRadius: '10px', margin: '20px 0', borderLeft: '4px solid #ff6b6b' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
          <span style={{ fontSize: '24px', flexShrink: 0 }}>💡</span>
          <div>
            <h4 style={{ color: '#ff6b6b', margin: '0 0 8px 0', fontSize: '15px' }}>Fun Fact</h4>
            <p style={{ color: '#333', margin: 0, lineHeight: 1.7, fontSize: '14px' }}>{app.funFact}</p>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '20px', borderTop: '2px dashed #e0e0e0' }}>
        <div style={{ fontSize: '40px', letterSpacing: '10px' }}>{app.image}</div>
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
    <div id="applications-section-modal" ref={modalRef} style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', zIndex: 2000, overflowY: 'auto' }}>
      <style>{`
        .category-tab {
          background: #f0f0f0;
          border: 2px solid transparent;
          padding: 12px 24px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .category-tab:hover {
          background: #e0e0e0;
          transform: translateY(-2px);
        }

        .category-tab.active {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
          border-color: #11998e;
        }

        .fact-card {
          background: #f7fafc;
          padding: 25px;
          border-radius: 12px;
          border-left: 4px solid #11998e;
          transition: transform 0.3s ease;
        }

        .fact-card:hover {
          transform: translateY(-5px);
        }

        .fact-card h3 {
          color: #11998e;
          margin: 10px 0;
        }

        .fact-card p {
          color: #555;
          line-height: 1.7;
          margin: 0;
        }
      `}</style>
      <div style={{ position: 'sticky', top: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', padding: '20px', borderBottom: '2px solid rgba(255,255,255,0.1)', zIndex: 2001, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', margin: 0, fontSize: '28px' }}>🌍 Fractals in the Real World</h1>
          <p style={{ color: '#38ef7d', margin: '5px 0 0 0', fontSize: '14px' }}>See how the mathematics you're exploring powers our modern world</p>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          ✕ Close
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: 'white', borderRadius: '15px', padding: '30px', marginBottom: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <h2 style={{ color: '#11998e', marginTop: 0 }}>📱 From Your Screen to Outer Space</h2>
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#333' }}>
            The fractals you're exploring in ARS MATHICA aren't just mathematical curiosities—they're actively shaping the world around you right now. From the antenna in your smartphone to the special effects in your favorite movies, from weather forecasts to cancer detection, fractals are everywhere.
          </p>
          <div style={{ background: '#e6f9f5', padding: '20px', borderRadius: '10px', marginTop: '20px', borderLeft: '4px solid #11998e' }}>
            <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>
              <strong>Did you know?</strong> The device you're using right now contains at least 3 different fractal-based technologies!
            </p>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className={`category-tab ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => setCurrentFilter('all')}>🌟 All Applications</button>
            <button className={`category-tab ${currentFilter === 'technology' ? 'active' : ''}`} onClick={() => setCurrentFilter('technology')}>📱 Technology</button>
            <button className={`category-tab ${currentFilter === 'nature' ? 'active' : ''}`} onClick={() => setCurrentFilter('nature')}>🌿 Nature</button>
            <button className={`category-tab ${currentFilter === 'medicine' ? 'active' : ''}`} onClick={() => setCurrentFilter('medicine')}>🏥 Medicine</button>
            <button className={`category-tab ${currentFilter === 'entertainment' ? 'active' : ''}`} onClick={() => setCurrentFilter('entertainment')}>🎬 Entertainment</button>
            <button className={`category-tab ${currentFilter === 'science' ? 'active' : ''}`} onClick={() => setCurrentFilter('science')}>🔬 Science</button>
            <button className={`category-tab ${currentFilter === 'engineering' ? 'active' : ''}`} onClick={() => setCurrentFilter('engineering')}>🏗️ Engineering</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px' }}>
          {filteredData.map((app, index) => (
              <div key={app.id} style={{ transitionDelay: `${index * 50}ms`}}>
                  <ApplicationCard app={app} isVisible={visibleCards} />
              </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '15px', padding: '30px', marginTop: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ color: '#11998e' }}>🤯 Mind-Blowing Fractal Facts</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <div className="fact-card">
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>📏</div>
                    <h3>Infinite Coastlines</h3>
                    <p>The coastline of Britain is infinitely long! As you measure at smaller scales, the length keeps increasing—this is called the coastline paradox.</p>
                </div>
                <div className="fact-card">
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>🌳</div>
                    <h3>Broccoli Mathematics</h3>
                    <p>Romanesco broccoli is a perfect natural fractal—each floret is a miniature version of the whole, showing Fibonacci spirals!</p>
                </div>
                <div className="fact-card">
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>💰</div>
                    <h3>Stock Market Chaos</h3>
                    <p>Stock prices follow fractal patterns! The same mathematical structure appears whether you look at hourly, daily, or yearly charts.</p>
                </div>
                <div className="fact-card">
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>🫁</div>
                    <h3>Your Lungs</h3>
                    <p>Your lungs use fractal branching to pack 70 square meters of surface area (half a tennis court!) into your chest cavity.</p>
                </div>
                <div className="fact-card">
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>⚡</div>
                    <h3>Lightning Strikes</h3>
                    <p>Lightning bolts follow fractal paths because electricity seeks the path of least resistance through turbulent air.</p>
                </div>
                <div className="fact-card">
                    <div style={{ fontSize: '36px', marginBottom: '10px' }}>🌌</div>
                    <h3>Universe Structure</h3>
                    <p>Galaxies cluster in fractal patterns across the universe—from tiny scales to billions of light-years!</p>
                </div>
            </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '15px', padding: '40px', marginTop: '40px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', color: 'white' }}>
            <h2 style={{ marginTop: 0, fontSize: '32px' }}>🎯 Try It Yourself!</h2>
            <p style={{ fontSize: '18px', lineHeight: 1.8, maxWidth: '800px', margin: '20px auto' }}>
                Return to the main fractal explorer and zoom into different regions. Each application you've learned about started with someone curious enough to explore—just like you!
            </p>
            <button onClick={onClose} style={{ background: 'white', color: '#667eea', border: 'none', padding: '15px 40px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', marginTop: '20px' }}>
                🔬 Back to Explorer
            </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;