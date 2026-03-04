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
    <section id="contact" ref={sectionRef} className="py-24 md:pt-32 md:pb-48">
      <div className="container">
        <div ref={contentRef} className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-primary mb-4">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6">
            Let's work together
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Have a project in mind? I'd love to hear about it. Send me a message 
            and let's create something amazing together.
          </p>

          <a
            href="mailto:akashranjansaikia21@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-base font-medium hover:bg-primary/90 transition-colors mb-12"
          >
            <Mail className="w-5 h-5" />
            akashranjansaikia21@gmail.com
          </a>

          <div className="flex items-center justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center  hover:text-foreground hover:bg-accent transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
