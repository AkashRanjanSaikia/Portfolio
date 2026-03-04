import { ArrowDown, Download, Linkedin, Github, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(titleRef.current, { y: 50, opacity: 0, delay: 0.2 })
        .from(nameRef.current, { y: 50, opacity: 0 }, "-=0.8")
        .from(descriptionRef.current, { y: 50, opacity: 0 }, "-=0.8")
        .from(actionsRef.current, { y: 50, opacity: 0 }, "-=0.8")
        .from(imageRef.current, { scale: 0.8, opacity: 0, duration: 1.2 }, "-=1");

      // Floating animation for the image
      gsap.to(imageRef.current, {
        y: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
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
            <h2 
              ref={titleRef}
              className="text-3xl md:text-4xl font-serif font-medium mb-2"
            >
              Hello, It's Me
            </h2>

            <h1 
              ref={nameRef}
              className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-[1.1] mb-6"
            >
              Akash Ranjan Saikia
            </h1>

            <p 
              ref={descriptionRef}
              className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8"
            >
              I'm a full-stack developer with hands-on experience in both frontend and backend. 
              I enjoy <br />
              turning cool ideas into real, working web apps. I focus on  <br />
              creating seamless, user-friendly websites.
            </p>

            <div 
              ref={actionsRef}
              className="flex flex-col gap-6"
            >
              <Button 
                className="w-fit rounded-full px-6 gap-2"
                asChild
              >
                <a href="/resume.pdf" target="_blank" >
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
                  href="https://x.com/arsaikia26"
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
          <div 
            ref={imageRef}
            className="flex-[0.3] flex justify-center md:justify-end relative"
          >
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/10 rounded-full blur-3xl opacity-60" />
            
            <div className="relative z-10">
              <div 
                className="relative overflow-hidden "
                style={{ 
                  borderRadius: '60% 40% 30% 80% / 60% 30% 70% 40%',
                  border: '4px solid hsl(var(--primary) / 0.1)'
                  
                }}
              >
                <img 
                  src="/Img1.jpg" 
                  alt="Akash Ranjan Saikia" 
                  className="w-56 h-80 md:w-80 md:h-[450px] object-cover"
                />
              </div>
              
              {/* Subtle accent border */}
              <div 
                className="absolute -inset-3 border border-primary/10 -z-10" 
                style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-20">
        <ArrowDown 
          className="w-6 h-6 text-muted-foreground"
          onClick={scrollToAbout}
        />
      </div>
    </section>
  );
};

export default Hero;
