import { ArrowDown, Download, Linkedin, Github, Twitter } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/30 rounded-full blur-2xl" />

      <div className="container relative z-10 pt-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left side - Text content */}
          <div className="flex-[0.7]">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-2 animate-fade-up">
              Hello, It's Me
            </h2>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-[1.1] mb-6 animate-fade-up-delay-1">
              Akash Ranjan Saikia
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 animate-fade-up-delay-2">
              I'm a full-stack developer with hands-on experience in both frontend and backend. 
              I enjoy <br />
              turning cool ideas into real, working web apps. I focus on  <br />
              creating seamless, user-friendly websites.
            </p>

            <div className="flex flex-col gap-6 animate-fade-up-delay-3">
              <Button 
                className="w-fit rounded-full px-6 gap-2"
                asChild
              >
                <a href="/resume.pdf" download>
                  Download CV
                  <Download className="w-4 h-4" />
                </a>
              </Button>

              {/* Social Icons */}
              <div className="pl-2 flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/akash-ranjan-saikia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="group"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 transition-colors">
                    <Linkedin className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                  </span>
                </a>
                <a
                  href="https://github.com/AkashRanjanSaikia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="group"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 transition-colors">
                    <Github className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                  </span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="group"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-primary/10 transition-colors">
                    {/* <Twitter className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" /> */}
                    <img
                      src="/x-twitter.svg"
                      alt="Twitter"
                      className="w-5 h-5 text-foreground group-hover:text-primary transition-colors dark:invert"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-[0.3] flex justify-center md:justify-end animate-fade-up-delay-2 -mt-8 md:-mt-10">
            <img 
              src="/Img1.jpg" 
              alt="Akash Ranjan Saikia" 
              className="w-48 h-72 md:w-80 md:min-h-96 shadow-2xl object-cover overflow-hidden"
              style={{ borderRadius: '50% / 50%' }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 p-3 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
        aria-label="Scroll to about"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
