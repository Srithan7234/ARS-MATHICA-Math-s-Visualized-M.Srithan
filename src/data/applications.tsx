
import React from 'react';
import { Smartphone, Clapperboard, HeartPulse, TreePine, Image, CloudDrizzle, Gamepad2, Mountain, Wifi, Brain, Building, Telescope, Lock, Sigma, Music, Milestone, Car, Droplets, Network, Snowflake, Globe, Lightbulb, TestTube, Factory } from 'lucide-react';

export const APPLICATIONS_DATA = [
  {
    id: 1,
    category: 'technology',
    title: "Smartphone Antennas",
    icon: <Smartphone size={48} className="text-purple-400" />,
    tagline: "The device in your pocket",
    description: "Modern smartphones use fractal antennas to receive multiple frequencies (4G, 5G, WiFi, Bluetooth, GPS) from a tiny space.",
    howItWorks: "Fractal designs create 'electrical length' much longer than physical size. A fractal antenna acts like multiple antennas in one, each tuned to different frequencies.",
    realExample: "Your phone's antenna uses patterns like the Hilbert curve or Koch snowflake to pack maximum reception into minimal space.",
    impact: "Without fractal antennas, phones would need multiple large antennas sticking out—impossible for slim modern designs!",
    visualization: "Imagine fitting a 10-meter antenna into a 5cm space by folding it into a fractal pattern.",
    funFact: "The first fractal antenna was patented in 1995. Now virtually every smartphone uses them!",
    image: <div className="flex justify-center items-center gap-4"><Smartphone size={32} /><Network size={32} /><Wifi size={32} /></div>
  },

  {
    id: 2,
    category: 'entertainment',
    title: "Movie CGI & VFX",
    icon: <Clapperboard size={48} className="text-purple-400" />,
    tagline: "Hollywood's secret weapon",
    description: "Blockbuster movies use fractal algorithms to generate realistic mountains, clouds, explosions, and alien worlds.",
    howItWorks: "Instead of manually creating millions of details, artists use fractal 'recipes' that generate infinite complexity automatically. One formula creates an entire mountain range!",
    realExample: "Disney's 'Frozen': Mountains and ice created using fractal noise. Pixar's 'Brave': Forest trees and landscapes. Avatar: Pandora's alien terrain.",
    impact: "What once took months of manual work now takes hours. Fractal CGI reduced production time and cost by 90%.",
    visualization: "A single fractal formula can generate 1000 unique, photorealistic mountains in seconds.",
    funFact: "The original Star Trek II (1982) featured the first fractal-generated planet—revolutionary for its time!",
    image: <div className="flex justify-center items-center gap-4"><Mountain size={32} /><CloudDrizzle size={32} /><Clapperboard size={32} /></div>
  },

  {
    id: 3,
    category: 'medicine',
    title: "Cancer Detection",
    icon: <HeartPulse size={48} className="text-purple-400" />,
    tagline: "Saving lives through math",
    description: "Doctors use fractal analysis to detect cancerous tumors earlier and more accurately than traditional methods.",
    howItWorks: "Healthy tissue has regular, predictable patterns. Cancer cells grow chaotically with irregular fractal dimensions. Computers measure these differences in medical scans.",
    realExample: "Lung cancer detection: Fractal analysis spots tumors 6-12 months earlier than visual inspection. Breast cancer: Improves mammogram accuracy by 15-20%.",
    impact: "Early detection increases survival rates from 20% to 90% for many cancers. Fractal analysis saves thousands of lives annually.",
    visualization: "Healthy blood vessels: Fractal dimension ≈ 1.7. Cancerous blood vessels: Fractal dimension ≈ 2.3",
    funFact: "Your heartbeat follows fractal patterns—deviations from this pattern can indicate heart disease!",
    image: <div className="flex justify-center items-center gap-4"><Droplets size={32} /><HeartPulse size={32} /><TestTube size={32} /></div>
  },

  {
    id: 4,
    category: 'nature',
    title: "Tree Branching Patterns",
    icon: <TreePine size={48} className="text-purple-400" />,
    tagline: "Nature's optimization algorithm",
    description: "Trees use fractal branching to maximize sunlight exposure while minimizing material (wood). Evolution discovered fractals millions of years ago!",
    howItWorks: "Each branch splits into smaller branches following similar ratios. This self-similar pattern maximizes leaf area for photosynthesis while maintaining structural strength.",
    realExample: "An oak tree's branches, your lung airways, river networks, and lightning bolts all follow similar fractal mathematics—da Vinci noticed this 500 years ago!",
    impact: "Engineers copy tree fractals to design efficient road networks, water distribution systems, and circuit boards.",
    visualization: "A tree with 5 generations of branching can have 1,000+ leaves from one trunk—maximum efficiency!",
    funFact: "The blood vessels in your body, if laid end-to-end, would circle Earth 2.5 times—packed efficiently using fractal design!",
    image: <div className="flex justify-center items-center gap-4"><TreePine size={32} /><Snowflake size={32} /><CloudDrizzle size={32} /></div>
  },

  {
    id: 5,
    category: 'technology',
    title: "Image Compression",
    icon: <Image size={48} className="text-purple-400" />,
    tagline: "Storing photos efficiently",
    description: "Fractal image compression can shrink photo file sizes by 100x while maintaining quality—crucial for web and mobile apps.",
    howItWorks: "Instead of storing every pixel, the algorithm stores fractal 'recipes' that recreate similar patterns. Natural images contain lots of self-similar details perfect for this.",
    realExample: "Microsoft used fractal compression in Encarta encyclopedia. Netflix and YouTube use fractal techniques in their video compression.",
    impact: "Your phone can store 10,000 photos instead of 100. Websites load 10x faster. Streaming video became practical.",
    visualization: "A 10MB photo compressed to 100KB with minimal quality loss—perfect for mobile data!",
    funFact: "The JPEG format uses discrete cosine transforms, but newer fractal methods achieve even better compression!",
    image: <div className="flex justify-center items-center gap-4"><Image size={32} /><Network size={32} /><Smartphone size={32} /></div>
  },

  {
    id: 6,
    category: 'science',
    title: "Weather Prediction",
    icon: <CloudDrizzle size={48} className="text-purple-400" />,
    tagline: "Forecasting chaos",
    description: "Weather systems are chaotic and fractal. Understanding fractal patterns helps meteorologists predict storms and climate patterns.",
    howItWorks: "Clouds, air turbulence, and storm systems follow fractal mathematics. Supercomputers simulate these patterns to forecast weather.",
    realExample: "Hurricane prediction models use fractal analysis of wind patterns. Climate models predict global temperature changes using fractal ocean currents.",
    impact: "Modern weather forecasts are 90% accurate for 3 days ahead (vs. 50% in the 1980s). Saves billions in disaster prevention.",
    visualization: "A butterfly flapping wings in Brazil can theoretically cause a tornado in Texas—the chaos theory 'butterfly effect'!",
    funFact: "We can't predict weather beyond ~10 days because of chaotic fractal behavior—even with perfect data!",
    image: <div className="flex justify-center items-center gap-4"><CloudDrizzle size={32} /><Globe size={32} /><TestTube size={32} /></div>
  },

  {
    id: 7,
    category: 'technology',
    title: "Video Game Worlds",
    icon: <Gamepad2 size={48} className="text-purple-400" />,
    tagline: "Infinite digital landscapes",
    description: "Games like Minecraft and No Man's Sky use fractal algorithms to generate massive, unique worlds procedurally.",
    howItWorks: "Fractals create endless variations from simple rules. One algorithm generates billions of unique planets, each with realistic terrain, vegetation, and features.",
    realExample: "No Man's Sky: 18 quintillion unique planets. Minecraft: Infinite worlds. Terraria, Starbound: Fractal generation creates exploration replay value.",
    impact: "Developers create massive game worlds without manually designing every detail. 1GB game file = infinite content.",
    visualization: "A single fractal seed generates an entire unique planet with mountains, valleys, caves, and ecosystems.",
    funFact: "The original Elite game (1984) used fractals to fit 8 galaxies with 256 planets each into just 32KB of memory!",
    image: <div className="flex justify-center items-center gap-4"><Milestone size={32} /><Mountain size={32} /><Gamepad2 size={32} /></div>
  },

  {
    id: 8,
    category: 'engineering',
    title: "Earthquake Analysis",
    icon: <Mountain size={48} className="text-purple-400" />,
    tagline: "Predicting Earth's movement",
    description: "Seismologists use fractal patterns to understand earthquake frequency and predict seismic activity.",
    howItWorks: "Earthquake magnitudes follow fractal 'power law' distributions—many small quakes, few large ones. Fault lines show fractal crack patterns.",
    realExample: "Japan's earthquake early warning system uses fractal analysis. Building codes require fractal-inspired flexible designs to absorb seismic waves.",
    impact: "Buildings designed with fractal principles survive earthquakes that destroy rigid structures. Early warnings save thousands of lives.",
    visualization: "For every magnitude 8 earthquake, there are ~10 magnitude 7s, ~100 magnitude 6s—fractal scaling!",
    funFact: "The San Andreas Fault's surface roughness is fractal—looks similar whether viewed from 1 meter or 1 kilometer!",
    image: <div className="flex justify-center items-center gap-4"><Factory size={32} /><Milestone size={32} /><Sigma size={32} /></div>
  },

  {
    id: 9,
    category: 'technology',
    title: "WiFi Router Optimization",
    icon: <Wifi size={48} className="text-purple-400" />,
    tagline: "Better internet at home",
    description: "Fractals help design better WiFi antennas and optimize router placement for maximum coverage.",
    howItWorks: "Fractal antennas radiate signals more uniformly in all directions. Fractal analysis predicts signal propagation through walls and obstacles.",
    realExample: "Modern mesh WiFi systems use fractal mathematics to calculate optimal node placement. Enterprise networks optimize coverage using fractal models.",
    impact: "Better WiFi coverage with fewer devices. Reduced dead zones. 30% better range than traditional antennas.",
    visualization: "Fractal antenna patterns create 'donut-shaped' coverage instead of narrow beams—perfect for home use.",
    funFact: "The fractal Hilbert curve antenna design is so efficient it's used in everything from routers to satellites!",
    image: <div className="flex justify-center items-center gap-4"><Globe size={32} /><Network size={32} /><Lightbulb size={32} /></div>
  },

  {
    id: 10,
    category: 'medicine',
    title: "Brain Imaging Analysis",
    icon: <Brain size={48} className="text-purple-400" />,
    tagline: "Understanding consciousness",
    description: "Neurologists use fractal dimension analysis to study brain complexity and detect neurological disorders.",
    howItWorks: "Healthy brains show specific fractal patterns in neural connections. Alzheimer's, epilepsy, and schizophrenia alter these patterns detectably.",
    realExample: "MRI scans analyzed with fractal geometry detect Alzheimer's 5 years before symptoms appear. Epilepsy prediction improved by 40%.",
    impact: "Early intervention for brain diseases. Personalized treatment plans. Better understanding of consciousness and intelligence.",
    visualization: "Your brain has ~86 billion neurons with fractal branching—maximum connections in minimum space.",
    funFact: "The folding pattern of your brain's cortex is fractal—it packs 2.5 square meters into your skull!",
    image: <div className="flex justify-center items-center gap-4"><Brain size={32} /><TestTube size={32} /><Lightbulb size={32} /></div>
  },

  {
    id: 11,
    category: 'engineering',
    title: "Architecture & Building Design",
    icon: <Building size={48} className="text-purple-400" />,
    tagline: "Beauty meets efficiency",
    description: "Architects use fractal patterns to create visually stunning, structurally sound, and energy-efficient buildings.",
    howItWorks: "Fractal facades optimize solar exposure and natural ventilation. Repeated patterns at multiple scales create aesthetic appeal while reducing material waste.",
    realExample: "Eiffel Tower: Fractal-like structure for strength-to-weight ratio. Indian stepwells: Fractal water management. Modern green buildings: Fractal shading systems.",
    impact: "Buildings that are 40% more energy-efficient. Reduced construction costs. Enhanced structural integrity during earthquakes.",
    visualization: "A fractal facade provides shade when needed, allows light when desired—passive climate control!",
    funFact: "Many Islamic mosques and Hindu temples feature intricate fractal patterns—mathematical beauty for centuries!",
    image: <div className="flex justify-center items-center gap-4"><Milestone size={32} /><Factory size={32} /><Lightbulb size={32} /></div>
  },

  {
    id: 12,
    category: 'science',
    title: "Astronomy & Galaxy Formation",
    icon: <Telescope size={48} className="text-purple-400" />,
    tagline: "The universe's large-scale structure",
    description: "Galaxies, galaxy clusters, and cosmic voids follow fractal distributions across billions of light-years.",
    howItWorks: "Matter clusters fractally due to gravitational attraction. From planets to galaxy superclusters, self-similar patterns repeat at every scale.",
    realExample: "The Sloan Digital Sky Survey mapped millions of galaxies—they form a 'cosmic web' with fractal dimension ≈ 2.1.",
    impact: "Understanding fractal distribution helps cosmologists test theories of dark matter and the universe's evolution.",
    visualization: "From atomic nuclei to the observable universe—matter organizes fractally across 45 orders of magnitude!",
    funFact: "Saturn's rings show fractal patterns—gaps within gaps within gaps, creating mesmerizing structures!",
    image: <div className="flex justify-center items-center gap-4"><Milestone size={32} /><Network size={32} /><Telescope size={32} /></div>
  },

  {
    id: 13,
    category: 'technology',
    title: "Data Encryption & Security",
    icon: <Lock size={48} className="text-purple-400" />,
    tagline: "Protecting your information",
    description: "Chaos-based fractal encryption makes codes nearly impossible to crack, protecting everything from banking to military communications.",
    howItWorks: "Fractal and chaotic systems are extremely sensitive to initial conditions. Tiny changes create completely different outputs—perfect for encryption.",
    realExample: "Military communications use chaos-based encryption. Blockchain systems incorporate fractal hashing. Secure messaging apps use chaotic algorithms.",
    impact: "Modern encryption keeps billions of online transactions secure. Fractals help protect against quantum computer attacks.",
    visualization: "Changing one bit in a fractal encryption key completely scrambles the entire message—unbreakable without the exact key!",
    funFact: "Fractal encryption is so secure that even quantum computers struggle to crack it—future-proof security!",
    image: <div className="flex justify-center items-center gap-4"><Lock size={32} /><Smartphone size={32} /><Sigma size={32} /></div>
  },

  {
    id: 14,
    category: 'nature',
    title: "Coastline Measurement Paradox",
    icon: <Sigma size={48} className="text-purple-400" />,
    tagline: "How long is a beach?",
    description: "Coastlines are fractals—their length increases as measurement scale decreases, approaching infinity!",
    howItWorks: "At 100km scale, Britain's coast is ~2,800km. At 50km scale: ~3,400km. At 1m scale: ~7,000km. Smaller scales reveal more detail indefinitely.",
    realExample: "This paradox, discovered by Lewis Fry Richardson and popularized by Mandelbrot, revolutionized geography and mapmaking.",
    impact: "Changed how we measure natural boundaries. Led to fractal dimension concept. Explains why map scales matter critically.",
    visualization: "A 'smooth' coastline at 10km scale becomes jagged at 100m scale, and incredibly complex at 1m scale!",
    funFact: "Norway has the world's longest coastline (58,133 km) largely because its fractal fjords add infinite detail!",
    image: <div className="flex justify-center items-center gap-4"><Globe size={32} /><Milestone size={32} /><Sigma size={32} /></div>
  },

  {
    id: 15,
    category: 'entertainment',
    title: "Music Synthesis & Sound Design",
    icon: <Music size={48} className="text-purple-400" />,
    tagline: "Mathematical music",
    description: "Electronic musicians use fractal algorithms to create organic, evolving sounds impossible with traditional synthesis.",
    howItWorks: "Fractal and chaotic equations generate complex, non-repeating waveforms that sound natural and 'alive' rather than mechanical.",
    realExample: "Synthesizers like the Buchla and Serge use chaos circuits. Modern software like VCV Rack includes fractal oscillators. Ambient music relies heavily on fractal generation.",
    impact: "Created entirely new genres of electronic music. Film soundtracks use fractal audio for alien, otherworldly sounds.",
    visualization: "A fractal waveform never repeats exactly—like natural sounds from wind, water, or fire.",
    funFact: "Pink noise (1/f noise), found in nature and pleasing to ears, follows fractal mathematics!",
    image: <div className="flex justify-center items-center gap-4"><Music size={32} /><Droplets size={32} /><CloudDrizzle size={32} /></div>
  },

  {
    id: 16,
    category: 'science',
    title: "Oil & Mineral Exploration",
    icon: <Milestone size={48} className="text-purple-400" />,
    tagline: "Finding Earth's resources",
    description: "Geologists use fractal analysis to predict where oil, natural gas, and valuable minerals are hidden underground.",
    howItWorks: "Rock formations, fault lines, and mineral deposits follow fractal patterns. Analyzing these patterns reveals likely resource locations without expensive drilling.",
    realExample: "Oil companies save millions by using fractal seismic analysis to identify drilling sites. Mining companies map ore deposits using fractal geology.",
    impact: "Reduces exploration costs by 60%. Minimizes environmental impact by avoiding unnecessary drilling. Finds resources other methods miss.",
    visualization: "Fractal analysis of surface geology predicts underground structures 2km deep with 70% accuracy!",
    funFact: "The distribution of earthquakes, volcanoes, and mineral deposits all follow fractal power laws!",
    image: <div className="flex justify-center items-center gap-4"><Milestone size={32} /><Globe size={32} /><TestTube size={32} /></div>
  },

  {
    id: 17,
    category: 'engineering',
    title: "Traffic Flow Optimization",
    icon: <Car size={48} className="text-purple-400" />,
    tagline: "Reducing congestion",
    description: "City planners use fractal mathematics to design road networks and optimize traffic light timing.",
    howItWorks: "Traffic patterns follow fractal 'cascading failure' dynamics. Small delays amplify into big jams. Fractal analysis predicts and prevents these cascades.",
    realExample: "Google Maps uses fractal traffic prediction. Singapore's smart traffic system reduces congestion by 30% using fractal algorithms.",
    impact: "Reduced commute times. Lower emissions. Better emergency vehicle routing. Smarter city infrastructure planning.",
    visualization: "A single blocked intersection creates fractal 'ripples' affecting traffic 5km away within 20 minutes!",
    funFact: "Traffic jams often emerge from nowhere due to fractal 'phantom jam' effects—even without accidents!",
    image: <div className="flex justify-center items-center gap-4"><Milestone size={32} /><Car size={32} /><Globe size={32} /></div>
  },

  {
    id: 18,
    category: 'medicine',
    title: "Blood Vessel Analysis",
    icon: <Droplets size={48} className="text-purple-400" />,
    tagline: "Your fractal circulatory system",
    description: "Blood vessels form fractal networks optimized to deliver oxygen to every cell efficiently.",
    howItWorks: "From aorta to capillaries, vessels branch fractally—maximizing surface area while minimizing distance and pressure drop.",
    realExample: "Doctors detect cardiovascular disease by measuring deviations from healthy fractal patterns. Diabetic retinopathy diagnosed via fractal analysis of eye blood vessels.",
    impact: "Non-invasive disease detection. Early warning of heart attacks and strokes. Personalized treatment planning.",
    visualization: "Your 100,000 km of blood vessels fit in your body through fractal branching—engineering perfection!",
    funFact: "If your blood vessels were laid flat, they'd cover 600 square meters—yet fit inside you through fractals!",
    image: <div className="flex justify-center items-center gap-4"><HeartPulse size={32} /><TestTube size={32} /><Droplets size={32} /></div>
  },

  {
    id: 19,
    category: 'technology',
    title: "5G Network Design",
    icon: <Network size={48} className="text-purple-400" />,
    tagline: "Next-gen connectivity",
    description: "5G cell towers use fractal antennas and fractal placement patterns to provide faster, more reliable coverage.",
    howItWorks: "Fractal antenna arrays can beam-form signals precisely to users. Network topology uses fractal distribution for optimal coverage density.",
    realExample: "India's 5G rollout uses fractal network planning. Urban 5G achieves 10 Gbps using fractal beamforming antennas.",
    impact: "100x faster speeds. Better coverage with fewer towers. Enable IoT, autonomous vehicles, smart cities.",
    visualization: "A fractal antenna array can focus signal like a spotlight, following moving users automatically!",
    funFact: "Future 6G networks will use even more advanced fractal techniques to achieve terabit speeds!",
    image: <div className="flex justify-center items-center gap-4"><Smartphone size={32} /><Lightbulb size={32} /><Network size={32} /></div>
  },

  {
    id: 20,
    category: 'nature',
    title: "Snowflake Formation",
    icon: <Snowflake size={48} className="text-purple-400" />,
    tagline: "Nature's mathematical artistry",
    description: "Every snowflake is unique, yet all follow fractal branching patterns determined by temperature and humidity.",
    howItWorks: "Water molecules crystallize following fractal growth rules. Tiny environmental variations create infinite unique patterns—all hexagonally symmetric.",
    realExample: "Wilson Bentley photographed 5,000 snowflakes (1885-1931)—no two alike, all fractal. Modern high-speed cameras capture formation in real-time.",
    impact: "Understanding snowflake fractals helps climate science, ice formation physics, and crystal growth technology.",
    visualization: "A snowflake's fractal branches can have branches-on-branches 5-6 levels deep—infinite complexity from simple rules!",
    funFact: "The idea that 'no two snowflakes are alike' is mathematically true—probabilities are astronomical!",
    image: <div className="flex justify-center items-center gap-4"><Snowflake size={32} /><TestTube size={32} /><CloudDrizzle size={32} /></div>
  }
];
