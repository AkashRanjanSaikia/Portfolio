import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { ArrowUpRight, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Cozy Stay",
    description:
      "A hotel booking platform with role-based access for admins and users.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    image: "/image.png",
    github: "https://github.com/AkashRanjanSaikia/CozyStay",
    demo: "https://cozy-stay-pi.vercel.app/",
  },
  {
    title: "Video Meet",
    description:
      "A real-time video meeting web app with peer-to-peer calls and screen sharing.",
    tags: ["React", "WebRTC", "Socket.IO"],
    image: "/project_1.png",
    github: "https://github.com/AkashRanjanSaikia/video_Meet",
    demo: "https://video-meet-sigma.vercel.app/",
  },

  {
    title: "ChatPDF",
    description:
      "A RAG-based app that lets users upload PDFs and ask questions with context-aware answers.",
    tags: ["RAG", "LangChain", "Pinecone","TypeScript"],
    image: "/project_6.png",
    github: "https://github.com/AkashRanjanSaikia/Chat_PDF",
    demo: "#",
  },
  {
    title: "Traffic Sign Detection",
    description:
      "A deep learning model for detecting and classifying traffic signs with real-time web-based inference.",
    tags: ["Python", "PyTorch", "Computer Vision", "Deep Learning"],
    image: "/project_7.png",
    github: "https://github.com/AkashRanjanSaikia/traffic-sign-detection",
    demo: "https://arsaikia26-traffic-sign-detection.hf.space/",
  },
];

const CYCLE_DURATION = 5000; // 5 seconds per project

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions as any;

        // Entrance Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
            onEnter: () => setIsInView(true),
          },
        });

        tl.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        if (isDesktop) {
          tl.from(
            contentRef.current,
            {
              y: 30,
              opacity: 0,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.8",
          );
        }

        if (isMobile) {
          gsap.utils
            .toArray(".mobile-project-card")
            .forEach((card: any, i: number) => {
              gsap.from(card, {
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
                x: i % 2 === 0 ? -60 : 60,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
              });
            });
        }

        // Track visibility for animation cycling (runs on both)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => setIsInView(true),
          onLeave: () => setIsInView(false),
          onEnterBack: () => setIsInView(true),
          onLeaveBack: () => setIsInView(false),
        });
      },
    );

    return () => mm.revert();
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
  }, []);

  // Auto-cycle effect
  useEffect(() => {
    if (!isInView || isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 100 / (CYCLE_DURATION / 50);
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isInView, isPaused, goToNext]);

  const handleProjectHover = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:pt-24 md:pb-40 bg-card/50 overflow-x-hidden"
    >
      <div className="container">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
              Selected work
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-medium">
              Featured projects
            </h2>
          </div>
        </div>

        {/* Desktop Layout */}
        <div
          ref={contentRef}
          className="hidden lg:block relative min-h-[600px]"
        >
          {/* Project List */}
          <div className="max-w-md flex flex-col justify-center space-y-4">
            {projects.map((project, index) => (
              <div key={project.title} className="relative">
                {/* Project Card (The Hover Trigger) */}
                <div
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 border group/card ${
                    activeIndex === index
                      ? "bg-primary/[0.03] border-primary/20 shadow-sm translate-x-2"
                      : "bg-transparent border-transparent hover:bg-muted/50 opacity-60 hover:opacity-100"
                  }`}
                  onMouseEnter={() => handleProjectHover(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Progress Bar (Side indicator) */}
                  {activeIndex === index && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-primary/30 rounded-full overflow-hidden">
                      <div
                        className="w-full bg-primary transition-all duration-75 ease-linear origin-top"
                        style={{ height: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                          activeIndex === index
                            ? "text-primary"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        Project {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {project.title}
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-full transition-all duration-500 ${
                        activeIndex === index
                          ? "bg-primary text-primary-foreground rotate-0 shadow-md shadow-primary/20"
                          : "bg-muted text-muted-foreground -rotate-45"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  {/* Tags on active */}
                  <div
                    className={`flex flex-wrap gap-2 transition-all duration-500 ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 pointer-events-none"
                    }`}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Overlapping Floating Preview (Sibling to trigger, so it won't activate on hover) */}
                <div
                  className={`absolute left-[calc(100%+3rem)] top-1/2 w-[650px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-50 pointer-events-none ${
                    activeIndex === index
                      ? "opacity-100 -translate-y-1/2 translate-x-0 scale-100"
                      : index < activeIndex ||
                          (activeIndex === 0 && index === projects.length - 1)
                        ? "opacity-0 -translate-y-[calc(50%+4rem)] translate-x-0 scale-95"
                        : "opacity-0 -translate-y-[calc(50%-4rem)] translate-x-0 scale-95"
                  }`}
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-muted border border-border shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] flex flex-col pointer-events-auto">
                    {/* Browser Header Mockup */}
                    <div className="h-10 bg-muted/90 border-b border-border flex items-center px-5 gap-2.5 shrink-0 z-20">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                      </div>
                      <div className="mx-auto w-1/2 h-5 bg-background/50 rounded-md border border-border/50 flex items-center px-3">
                        <div className="w-full h-1.5 bg-muted-foreground/10 rounded-full" />
                      </div>
                    </div>

                    <div className="relative flex-1 overflow-hidden group/preview">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 z-10 pointer-events-none" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover/preview:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-500 z-20" />

                      {/* Links overlay */}
                      <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover/preview:opacity-100 transition-all duration-500 translate-y-4 group-hover/preview:translate-y-0 z-30">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          <Github className="w-5 h-5" />
                          <span className="font-bold text-sm">Code</span>
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                        >
                          <span className="text-sm">Live Demo</span>
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden grid gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group mobile-project-card bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-500"
            >
              <div className="aspect-video overflow-hidden relative border-b border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-tight mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
