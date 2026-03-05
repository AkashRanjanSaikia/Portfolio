import { Github, Linkedin, Mail } from "lucide-react";
import Twitter from "@/components/ui/twitter";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: Github, href: "https://github.com/AkashRanjanSaikia", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/akash-ranjan-saikia/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/arsaikia26", label: "Twitter" },
  { icon: Mail, href: "mailto:akashranjansaikia21@gmail.com", label: "Email" },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="min-h-[100svh] py-20 md:py-32 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background decoration for subtle flair */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container px-4 relative z-10 w-full">
        <div ref={contentRef} className="max-w-2xl mx-auto text-center">
          <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary mb-4">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6 leading-tight">
            Let's work together
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-10 md:mb-12 max-w-lg mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message 
            and let's create something amazing together.
          </p>

          <a
            href="mailto:akashranjansaikia21@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-primary text-primary-foreground rounded-full text-sm md:text-base font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] mb-12 shadow-lg shadow-primary/20"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5" />
            <span className="truncate max-w-[200px] xs:max-w-none">akashranjansaikia21@gmail.com</span>
          </a>

          <div className="flex items-center justify-center gap-3 md:gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-secondary/50 backdrop-blur-sm flex items-center justify-center hover:text-primary hover:bg-primary/10 transition-all hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
