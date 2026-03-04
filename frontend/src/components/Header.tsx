import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "surface-glass py-4 shadow-sm" : "py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-xl font-serif font-medium tracking-tight text-foreground"
        >
          <img src="/logo.svg" alt="Logo" className="h-8 w-8 invert dark:invert-0" />
        </button>

        <nav className="hidden md:flex items-center gap-8 ml-24">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground link-underline transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="mailto:hello@johndoe.dev"
            className="hidden sm:inline text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Let's talk
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
