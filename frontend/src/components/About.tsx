import { User } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isMobile } = context.conditions as any;

        if (isMobile) {
          // In mobile view, trigger content first, then image separately
          gsap.from(contentRef.current, {
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 95%",
              end: "top 20%",
              scrub: 1,
            },
            scale: 0.8,
            opacity: 0,
            ease: "power3.inOut",
          });

          gsap.from(imageRef.current, {
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 95%",
              end: "top 30%",
              scrub: 1,
            },
            scale: 0.8,
            opacity: 0,
            ease: "power3.inOut",
          });
        } else {
          // In desktop view, trigger both together as a timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
              end: "top 20%",
              scrub: 1,
            },
          });

          tl.from(imageRef.current, {
            scale: 0.8,
            opacity: 0,
            ease: "power3.inOut",
          }).from(
            contentRef.current,
            {
              scale: 0.8,
              opacity: 0,
              ease: "power3.inOut",
            },
            "-=0.5",
          );
        }

        ScrollTrigger.refresh();
      },
      sectionRef,
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className=" py-6 md:py-32 overflow-hidden">
      <div className="container mt-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <div ref={imageRef} className="order-2 lg:order-1 lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-80 lg:w-80 lg:h-[26rem] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 flex items-center justify-center">
              <img
                src="/aboutMe.jpg"
                alt="Profile photo"
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105 brightness-105 contrast-110"
                style={{ borderRadius: "1.5rem" }}
              />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2 lg:col-span-8">
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8">
              About Me
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p className="text-[14px] ">
                I'm Akash Ranjan Saikia, a third-year B.Tech student in Computer
                Science at Jorhat Engineering College and a passionate
                full-stack developer. I have a strong command of both frontend
                and backend technologies, <br /> enabling me to build seamless,
                end-to-end web applications. Alongside web development, I am
                exploring machine learning and Generative AI to create
                intelligent solutions for real-world problems. <br />I am always eager
                to learn new technologies, take on challenges, and grow as a
                developer. For me, continuous learning and building meaningful
                tech solutions go hand in hand.
              </p>
            </div>
            <Button
              className="w-fit rounded-full px-6 gap-2"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <User className="w-4 h-4" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
