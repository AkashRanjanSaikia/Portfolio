import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  velocity: { x: number; y: number };
  life: number;
  maxLife: number;
}

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 }); // Current smoothed position
  const lastPos = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";
  
  // Colors for click burst - different shades of green
const burstColors = useMemo(() => [
  '#ECFDF5', // very pale mint
  '#D1FAE5', // soft mint
  '#A7F3D0', // light emerald
  '#6EE7B7', // fresh green
  '#34D399', // emerald 400
  '#86EFAC', // soft lime green
  '#BBF7D0', // pastel green
  '#CFFFE5', // airy mint
  '#B7F7C6', // muted fresh green
  '#9AE6B4', // soft jade
], []);
  
  // Colors based on theme
  const colors = useMemo(() => ({
    primary: isDarkMode ? '#22c55e' : '#166534', // Green-500 or Green-800
    glow: isDarkMode ? 'rgba(34, 197, 94, 0.4)' : 'rgba(22, 101, 52, 0.2)',
    trailGlow: isDarkMode ? 'rgba(34, 197, 94, 0)' : 'rgba(22, 101, 52, 0)',
    blendMode: (isDarkMode ? 'screen' : 'multiply') as GlobalCompositeOperation
  }), [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = (e: MouseEvent) => {
      // Create a burst of particles on click with different colors
      const burstSize = 25;
      for (let i = 0; i < burstSize; i++) {
        const randomColor = burstColors[Math.floor(Math.random() * burstColors.length)];
        const p = createParticle(e.clientX, e.clientY, randomColor);
        p.velocity.x *= 4; // Faster burst
        p.velocity.y *= 4;
        p.maxLife *= 2;
        p.size *= 1.2;
        particlesRef.current.push(p);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    handleResize();

    // GSAP quickTo for smooth mouse following
    const xTo = gsap.quickTo(pos.current, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(pos.current, "y", { duration: 0.3, ease: "power3.out" });

    const createParticle = (x: number, y: number, color?: string) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2;
      return {
        x,
        y,
        size: Math.random() * 6 + 2,
        color: color || colors.primary,
        alpha: isDarkMode ? 0.6 : 0.4,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        life: 0,
        maxLife: 40 + Math.random() * 20
      };
    };

    const update = () => {
      // Smoothly update the "head" position
      xTo(mouse.current.x);
      yTo(mouse.current.y);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only add particles if mouse moved significantly or is moving
      const dx = pos.current.x - lastPos.current.x;
      const dy = pos.current.y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1) {
        // Add a few particles along the path for smoothness if moving fast
        const steps = Math.min(Math.floor(dist / 5), 5);
        for (let i = 0; i < steps; i++) {
          const interpX = lastPos.current.x + (dx * i) / steps;
          const interpY = lastPos.current.y + (dy * i) / steps;
          particlesRef.current.push(createParticle(interpX, interpY));
        }
      } else if (Math.random() > 0.8) {
        // Add occasional particles even when idle but mouse is active
        particlesRef.current.push(createParticle(pos.current.x, pos.current.y));
      }

      lastPos.current = { ...pos.current };

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.life++;
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.alpha = 1 - (p.life / p.maxLife);
        
        if (p.life >= p.maxLife) return false;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife), 0, Math.PI * 2);
        
        // Add glow effect with the particle's own color
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, p.color);
        
        // Create a transparent version of the color for the outer glow
        // If color is hex, we just use it with 0 alpha
        gradient.addColorStop(1, p.color + '00'); 
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();

        return true;
      });

      // Draw main glow at smoothed position
      const mainGlowSize = isDarkMode ? 20 : 15;
      const mainGlow = ctx.createRadialGradient(pos.current.x, pos.current.y, 0, pos.current.x, pos.current.y, mainGlowSize);
      mainGlow.addColorStop(0, colors.glow);
      mainGlow.addColorStop(1, 'rgba(34, 197, 94, 0)');
      
      ctx.beginPath();
      ctx.arc(pos.current.x, pos.current.y, mainGlowSize, 0, Math.PI * 2);
      ctx.fillStyle = mainGlow;
      ctx.fill();

      // Precision dot
      ctx.beginPath();
      ctx.arc(pos.current.x, pos.current.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = colors.primary;
      ctx.fill();
    };

    // Use GSAP ticker for synchronized animation
    gsap.ticker.add(update);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      gsap.ticker.remove(update);
    };
  }, [colors, isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: isDarkMode ? 'screen' : 'multiply' }}
    />
  );
};

export default CursorTrail;
