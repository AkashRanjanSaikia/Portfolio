import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title: "Cozy Stay",
    description:
      "A hotel booking platform with role-based access for admins and users.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    image: "./image.png",
    github: "https://github.com/AkashRanjanSaikia/CozyStay",
    demo: "https://cozy-stay-pi.vercel.app/",
  },
  {
    title: "Video Meet",
    description:
      "A real-time video meeting web app with peer-to-peer calls and screen sharing.",
    tags: ["React", "WebRTC", "Socket.IO"],
    image: "./project_1.png",
    github: "https://github.com/AkashRanjanSaikia/video_Meet",
    demo: "https://video-meet-sigma.vercel.app/",
  },

  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates and intuitive drag-and-drop interface.",
    tags: ["TypeScript", "WebSocket", "Redis"],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    github: "#",
    demo: "#",
  },
  {
    title: "Healthcare Portal",
    description:
      "A responsive portfolio website for MediCare Surgical, showcasing the company’s profile, services, and contact details.",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    github: "https://github.com/AkashRanjanSaikia/MediCare-Surgical",
    demo: "https://medi-care-surgical.vercel.app/",
  },
];

const CYCLE_DURATION = 5000; // 5 seconds per project

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
  }, []);

  // Auto-cycle effect
  useEffect(() => {
    if (isPaused) return;

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
  }, [isPaused, goToNext]);

  const handleProjectHover = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section id="projects" className="py-24 md:py-14 bg-card/50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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
          className="hidden md:flex gap-4 h-[450px]"
          onMouseLeave={handleMouseLeave}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              onMouseEnter={() => handleProjectHover(index)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                activeIndex === index ? "flex-[3]" : "flex-[0.5]"
              }`}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out ${
                  activeIndex === index
                    ? "object-fill scale-105"
                    : "object-cover scale-100"
                }`}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-out shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] ${
                  activeIndex === index
                    ? "bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                    : "bg-black/60"
                }`}
              />

              {/* Content for Active Project */}
              <div
                className={`absolute inset-0 p-8 flex flex-col justify-between text-white transition-all duration-500 ease-out ${
                  activeIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                {/* Tags */}
                <div
                  className={`flex flex-wrap gap-2 transition-all duration-500 ease-out ${
                    activeIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: activeIndex === index ? "100ms" : "0ms",
                  }}
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className={`absolute top-6 right-6 z-10 flex items-center gap-4 transition-all duration-500 ease-out ${
                    activeIndex === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transitionDelay: activeIndex === index ? "600ms" : "0ms",
                  }}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-foreground hover:scale-110 transition-all duration-500 ease-out shadow-lg dark:bg-zinc-900 dark:text-white"
                    aria-label={`View ${project.title} Source Code`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-foreground hover:scale-110 transition-all duration-500 ease-out shadow-lg dark:bg-zinc-900 dark:text-white"
                    aria-label={`Visit ${project.title} Live Demo`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Bottom Content */}
                <div
                  className={`space-y-4 transition-all duration-500 ease-out ${
                    activeIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: activeIndex === index ? "200ms" : "0ms",
                  }}
                >
                  <h3
                    className={`text-3xl md:text-4xl font-serif font-medium leading-tight max-w-lg transition-all duration-500 ease-out ${
                      activeIndex === index ? "translate-y-0" : "translate-y-8"
                    }`}
                    style={{
                      transitionDelay: activeIndex === index ? "300ms" : "0ms",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-white/80 text-sm max-w-md leading-relaxed transition-all duration-500 ease-out ${
                      activeIndex === index ? "translate-y-0" : "translate-y-8"
                    }`}
                    style={{
                      transitionDelay: activeIndex === index ? "400ms" : "0ms",
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Title for Inactive Projects (Vertical) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                  activeIndex === index
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
              >
                <h3
                  className="text-white text-lg font-medium whitespace-nowrap"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators - Dots */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-8">
          {projects.map((project, index) => (
            <button
              key={project.title}
              onClick={() => {
                setActiveIndex(index);
                setProgress(0);
              }}
              className="relative p-1"
              aria-label={`Go to ${project.title}`}
            >
              <div
                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                  activeIndex === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
              >
                {activeIndex === index && (
                  <div
                    className="h-full bg-primary/50 rounded-full"
                    style={{
                      width: `${100 - progress}%`,
                      marginLeft: "auto",
                      transition: "width 50ms linear",
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Mobile Layout - Stacked Cards */}
        <div className="md:hidden space-y-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
