import {
  Code2,
  Server,
  Palette,
  Globe,
  Rocket,
  Zap,
  Database,
  Brain,
  Terminal,
} from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3"
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "WebSockets"
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      "MongoDB",
      "PostgreSQL",
      "SQL"
    ],
  },
  {
    title: "Programming Languages",
    icon: Terminal,
    skills: [
      "Java",
      "C++",
      "Python",
      "JavaScript"
    ],
  },
  {
    title: "Generative AI",
    icon: Brain,
    skills: [
      "RAG",
      "LangChain",
      "LangGraph",
      "Vector Databases",
      "Embeddings"
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Rocket,
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "CI/CD",
      "Socket.IO",
      "WebRTC"
    ],
  },
];

const Skills = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
        scale: 0.8,
        y: 60,
        opacity: 0,
        ease: "power3.out",
      });

      // Individual card animations
      const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%", // Trigger slightly later for a "pop up" effect as it enters
            end: "top 65%",
            scrub: 1,
          },
          scale: 0.7,
          y: 100,
          opacity: 0,
          ease: "power3.out",
          delay: (index % 3) * 0.1, // Slight horizontal stagger for cards in the same row
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    title: string,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setActiveCard(title);
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-20">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4 ">
            Skills & Expertise
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and beautiful
            web applications
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="skill-card group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
                onMouseMove={(e) => handleMouseMove(e, category.title)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Cursor glow effect */}
                {activeCard === category.title && (
                  <div
                    className="pointer-events-none absolute w-32 h-32 rounded-full bg-green-500/10 blur-2xl transition-opacity duration-300 shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                    style={{
                      left: mousePosition.x - 64,
                      top: mousePosition.y - 64,
                    }}
                  />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 tracking-tight">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
