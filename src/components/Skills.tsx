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
import { useState, useRef } from "react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "SQL"],
  },
  {
    title: "Real-Time Communication",
    icon: Zap,
    skills: ["Socket.IO", "WebRTC", "Media Streams"],
  },
  {
    title: "Programming Languages",
    icon: Terminal,
    skills: ["Java", "C++", "Python", "JavaScript"],
  },

  {
    title: "Tools & Platforms",
    icon: Rocket,
    skills: ["Git", "Docker", "CI/CD", "GenAI "],
  },
];

const Skills = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    title: string
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
    <section id="skills" className="py-24 md:py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseMove={(e) => handleMouseMove(e, category.title)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Cursor glow effect */}
                {activeCard === category.title && (
                  <div
                    className="pointer-events-none absolute w-32 h-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300"
                    style={{
                      left: mousePosition.x - 64,
                      top: mousePosition.y - 64,
                    }}
                  />
                )}
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">{category.title}</h3>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm bg-secondary rounded-lg text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
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
