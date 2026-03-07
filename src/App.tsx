import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowDownRight, Sparkles, ExternalLink, X, Sun, Moon } from "lucide-react";

// --- Data ---
const projects = [
  {
    id: 1,
    title: "Aura Skincare",
    category: "Brand Identity & Packaging",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2000&auto=format&fit=crop",
    overview: "Aura is a premium skincare line targeting a demographic that values transparency and clinical efficacy.",
    challenge: "The brand was getting lost in a saturated market of 'clean beauty' with generic, overly minimal aesthetics.",
    strategy: "We pivoted the visual language from 'soft and natural' to 'clinical and precise', utilizing a stark, high-contrast typographic system to communicate efficacy and scientific backing.",
    results: "40% increase in direct-to-consumer sales within the first quarter post-rebrand. Secured placement in 3 major luxury retail chains.",
    gallery: [
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Nexus FinTech",
    category: "Digital Product & Identity",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    overview: "Nexus is a B2B financial infrastructure platform enabling cross-border payments for enterprise clients.",
    challenge: "Their legacy branding felt outdated and untrustworthy, hindering their ability to close enterprise-level deals.",
    strategy: "Developed a robust, tech-forward identity system. We focused on motion and data visualization to explain complex financial flows simply, establishing immediate credibility.",
    results: "Helped secure a $15M Series A funding round. Increased enterprise lead conversion rate by 22%.",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Vanguard",
    category: "Campaign & Art Direction",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    overview: "Vanguard is a high-performance athletic wear brand launching a new line of sustainable activewear.",
    challenge: "Needed to differentiate from fast-fashion competitors while communicating both high performance and environmental responsibility.",
    strategy: "Created an editorial-driven campaign focusing on raw, unpolished athleticism contrasted with stark, brutalist typography to emphasize durability and strength.",
    results: "Campaign generated 2.5M impressions in the first week. The sustainable line sold out within 48 hours of launch.",
    gallery: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
    ]
  }
];

const capabilities = [
  "Brand Strategy", "Identity Systems", "Art Direction", 
  "Digital Product Design", "Packaging", "Creative Direction"
];

const deliverables = [
  "Brand Guidelines", "UI/UX Design", "Marketing Campaigns", 
  "Motion Graphics", "Print Collateral"
];

// --- Animations ---
const AnimatedLetters = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: delay }
        }
      }}
      className="inline-flex flex-wrap justify-center overflow-hidden"
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: "100%", opacity: 0 },
            visible: { y: "0%", opacity: 1, transition: { type: "spring", damping: 15, stiffness: 150 } }
          }}
          className="inline-block relative"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// --- Components ---

const Navbar = ({ targetCompany, isDark, toggleTheme }: { targetCompany: string | null, isDark: boolean, toggleTheme: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-[100] mix-blend-difference text-white pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-1"
      >
        <span className="font-bold tracking-tighter text-2xl uppercase leading-none">
          Marjoe.
        </span>
        <span className="text-xs font-medium tracking-widest uppercase opacity-70">
          Portfolio '25
        </span>
      </motion.div>
      
      <div className="flex items-center gap-4 pointer-events-auto">
        {targetCompany && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3" />
            <span className="text-xs font-medium tracking-widest uppercase">
              Curated for {targetCompany}
            </span>
          </motion.div>
        )}
        <motion.button 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={toggleTheme}
          className="p-3 rounded-full border border-white/30 backdrop-blur-md hover:bg-white/10 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden dark:bg-neutral-950 bg-neutral-50 dark:text-white text-neutral-900 text-center transition-colors duration-500">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-[18vw] md:text-[15vw] leading-[0.85] font-black tracking-tighter uppercase flex flex-col items-center w-full dark:text-white text-neutral-900">
          <motion.div style={{ y: y1 }} className="flex z-20 flex-wrap justify-center">
            <span className="flex">
              <AnimatedLetters text="Brand" delay={0.2} />
              <motion.span
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: "spring" }}
                className="text-indigo-500"
              >.</motion.span>
            </span>
          </motion.div>
          <motion.div style={{ y: y2 }} className="flex z-10 flex-wrap justify-center">
            <span className="flex">
              <AnimatedLetters text="Systems" delay={0.6} />
              <motion.span
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: "spring" }}
                className="text-cyan-500"
              >.</motion.span>
            </span>
          </motion.div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-medium tracking-[0.3em] uppercase opacity-70 mt-8 md:mt-10 max-w-sm md:max-w-none"
        >
          Strategic Brand & Visual Design for Ambitious Businesses.
        </motion.p>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 dark:text-neutral-500 text-neutral-400"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDownRight className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
};

const FlipbookCard = ({ project, index, progress, range, targetScale, setSelectedProject }: any) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const y = useTransform(progress, range, [0, -20]);
  
  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0 px-4 md:px-6">
      <motion.div 
        style={{ scale, y }}
        layoutId={`project-${project.id}`}
        onClick={() => setSelectedProject(project)}
        initial="initial"
        whileHover="hover"
        className="relative w-full max-w-5xl h-[75vh] md:h-[80vh] rounded-3xl overflow-hidden cursor-pointer shadow-2xl dark:shadow-none"
      >
        <motion.img 
          src={project.image} 
          variants={{ initial: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover" 
          referrerPolicy="no-referrer" 
          alt={project.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
        
        <motion.div 
          variants={{ initial: { opacity: 0, backdropFilter: "blur(0px)" }, hover: { opacity: 1, backdropFilter: "blur(4px)" } }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 z-10"
        >
          <motion.span 
            variants={{ initial: { y: 20, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white font-medium tracking-widest uppercase border border-white/30 px-6 py-3 rounded-full flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> View Case Study
          </motion.span>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-20">
          <div className="flex items-center gap-4 mb-2 md:mb-4">
            <span className="text-xs font-medium tracking-widest text-neutral-300 uppercase border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              0{index + 1}
            </span>
            <span className="text-xs font-medium tracking-widest text-indigo-400 uppercase">
              {project.category}
            </span>
          </div>
          <h3 className="text-3xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none">
            {project.title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
};

const FlipbookGallery = ({ setSelectedProject }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full dark:bg-neutral-950 bg-neutral-50 z-10 transition-colors duration-500">
      <div className="sticky top-0 h-screen flex items-start justify-start p-6 md:p-20 z-0 pointer-events-none mix-blend-difference">
        <h2 className="text-[12vw] md:text-[6vw] leading-none font-black tracking-tighter uppercase opacity-30 flex flex-col items-start text-white">
          <AnimatedLetters text="Selected" delay={0.2} />
          <AnimatedLetters text="Works" delay={0.6} />
        </h2>
      </div>
      <div className="relative z-10 -mt-[100vh]">
        {projects.map((project, index) => {
          const targetScale = 1 - ((projects.length - 1 - index) * 0.05);
          const range = [index * (1 / projects.length), 1];
          return (
            <FlipbookCard 
              key={project.id} 
              project={project} 
              index={index} 
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
              setSelectedProject={setSelectedProject}
            />
          );
        })}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 dark:bg-neutral-950 bg-neutral-50 dark:text-white text-neutral-900 border-t dark:border-white/10 border-black/10 relative z-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-widest uppercase dark:text-neutral-500 text-neutral-500 mb-4"
          >
            About
          </motion.h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none flex flex-col gap-2">
            <div><AnimatedLetters text="Strategic" delay={0.2} /></div>
            <div><AnimatedLetters text="Execution." delay={0.4} /></div>
          </h3>
        </div>
        
        <div className="lg:col-span-8 flex flex-col gap-10 md:gap-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-4xl font-light leading-tight dark:text-neutral-300 text-neutral-700"
          >
            I partner with ambitious businesses to build visual systems that command attention and drive growth. By bridging the gap between strategic thinking and high-level execution, I help brands communicate their value with absolute clarity and confidence.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t dark:border-white/10 border-black/10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="p-6 md:p-8 rounded-3xl dark:bg-neutral-900/50 bg-white shadow-sm border dark:border-white/5 border-black/5"
            >
              <h4 className="text-xs font-medium tracking-widest uppercase dark:text-neutral-500 text-neutral-500 mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> Capabilities
              </h4>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {capabilities.map((skill, i) => (
                  <span key={i} className="px-4 py-2 rounded-full border dark:border-white/10 border-black/10 text-sm font-medium tracking-wide dark:bg-neutral-900 bg-neutral-50">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}
              className="p-6 md:p-8 rounded-3xl dark:bg-neutral-900/50 bg-white shadow-sm border dark:border-white/5 border-black/5"
            >
              <h4 className="text-xs font-medium tracking-widest uppercase dark:text-neutral-500 text-neutral-500 mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500" /> Deliverables
              </h4>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {deliverables.map((app, i) => (
                  <span key={i} className="px-4 py-2 rounded-full border dark:border-white/10 border-black/10 text-sm font-medium tracking-wide dark:bg-neutral-900 bg-neutral-50">
                    {app}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative py-24 md:py-32 px-6 md:px-10 dark:bg-neutral-950 bg-neutral-50 dark:text-white text-neutral-900 overflow-hidden flex flex-col justify-between min-h-screen transition-colors duration-500">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: true }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[150px]" 
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center w-full max-w-2xl mx-auto">
        <h2 className="text-[14vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter uppercase mb-6 flex flex-col items-center">
          <div><AnimatedLetters text="Start a" delay={0.2} /></div>
          <div><AnimatedLetters text="Project." delay={0.5} /></div>
        </h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center dark:text-neutral-400 text-neutral-600 mb-10 md:mb-12 text-lg"
        >
          Ready to elevate your brand? Let's discuss how strategic design can drive your business forward.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col gap-4 text-left"
        >
          <a
            href="mailto:hello@marjoe.blueprint"
            className="w-full p-6 md:p-8 rounded-3xl bg-indigo-600 text-white font-bold text-2xl md:text-4xl tracking-tighter hover:bg-indigo-700 transition-all flex items-center justify-between group"
          >
            hello@marjoe.design
            <ArrowDownRight className="w-8 h-8 md:w-12 md:h-12 -rotate-90 group-hover:rotate-0 transition-transform" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 mt-20 border-t dark:border-white/10 border-black/10 pt-10"
      >
        <div className="flex gap-6 md:gap-10">
          {['Behance', 'Dribbble', 'LinkedIn'].map((link) => (
            <a 
              key={link}
              href="#" 
              className="text-xs font-medium tracking-widest uppercase dark:text-neutral-500 text-neutral-500 hover:text-indigo-500 transition-colors flex items-center gap-2"
            >
              {link} <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
        <p className="text-xs font-medium tracking-widest uppercase dark:text-neutral-600 text-neutral-400">
          © 2025 Marjoe Blueprint.
        </p>
      </motion.div>
    </footer>
  );
};

export default function App() {
  const [targetCompany, setTargetCompany] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const company = params.get("for") || params.get("company");
    if (company) {
      const formattedCompany = company.charAt(0).toUpperCase() + company.slice(1);
      setTargetCompany(formattedCompany);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <main className="dark:bg-neutral-950 bg-neutral-50 min-h-screen selection:bg-indigo-500 selection:text-white transition-colors duration-500 antialiased">
      <Navbar targetCompany={targetCompany} isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <Hero />
      <FlipbookGallery setSelectedProject={setSelectedProject} />
      <About />
      <Footer />

      {/* Project Expansion Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-10 dark:bg-neutral-950/95 bg-neutral-50/95 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-6xl h-full md:h-[90vh] dark:bg-neutral-900 bg-white md:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 md:p-10 flex justify-between items-start border-b dark:border-white/10 border-black/10 shrink-0 bg-white dark:bg-neutral-900 z-10">
                <div>
                  <span className="text-indigo-500 text-xs font-medium tracking-widest uppercase mb-2 block">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none dark:text-white text-neutral-900">
                    {selectedProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="p-2 dark:text-neutral-400 text-neutral-600 hover:text-indigo-500 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              {/* Case Study Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-b dark:border-white/10 border-black/10">
                  {[
                    { title: "Overview", content: selectedProject.overview },
                    { title: "Challenge", content: selectedProject.challenge },
                    { title: "Strategy", content: selectedProject.strategy },
                    { title: "Results", content: selectedProject.results }
                  ].map((section, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      key={idx}
                    >
                      <h4 className="text-xs font-bold tracking-widest uppercase dark:text-neutral-500 text-neutral-400 mb-3">
                        {section.title}
                      </h4>
                      <p className="text-sm md:text-base leading-relaxed dark:text-neutral-300 text-neutral-700">
                        {section.content}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 md:p-10 grid grid-cols-1 gap-6 md:gap-10">
                  {selectedProject.gallery.map((img: string, i: number) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.1 }}
                      key={i} 
                      className="w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800"
                    >
                      <img 
                        src={img} 
                        className="w-full h-auto object-cover" 
                        referrerPolicy="no-referrer" 
                        alt={`${selectedProject.title} Detail ${i + 1}`}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
