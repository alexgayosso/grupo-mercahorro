"use client";
import { useEffect, useRef, useState } from "react";

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function ObraCard({ ciudad, proyecto, porcentaje, fase, imageSrc }) {
  return (
    <div className="border border-[#1A5C33]/40 bg-[#0d1a10] overflow-hidden group hover:border-[#1A5C33] transition-colors duration-300">
      <div className="relative h-48 overflow-hidden bg-[#1a1a1a]">
        <img
          src={imageSrc}
          alt={ciudad}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          style={{ filter: "brightness(0.9)" }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute top-4 left-4 bg-[#1A5C33] px-3 py-1">
          <span className="text-[10px] text-white font-bold tracking-widest uppercase">{fase}</span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-white font-display text-xl mb-1 tracking-tight uppercase">{ciudad}</h4>
        <p className="text-[#8a9a8b] text-xs mb-4 uppercase tracking-wider">{proyecto}</p>
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] text-[#8a9a8b] uppercase tracking-tighter">Progreso</span>
            <span className="text-white font-display text-lg">{porcentaje}%</span>
          </div>
          <div className="h-1 bg-white/5 w-full">
            <div className="h-full bg-[#1A5C33] transition-all duration-1000" style={{ width: `${porcentaje}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const years = useCounter(17, 2500, statsVisible);
  const properties = useCounter(300, 2500, statsVisible);
  const influence = useCounter(89, 2500, statsVisible);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(([entry]) => { 
      if (entry.isIntersecting) setStatsVisible(true); 
    }, { threshold: 0.1 });
    
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#060d07]" />;

  return (
    <main className="relative min-h-screen bg-[#060d07] text-white font-sans">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-obra.jpg"
            alt="Infraestructura Mercahorro"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.65) contrast(1.1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060d07] via-transparent to-transparent opacity-80"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="font-display text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-none">
            CONSTRUIMOS <br /> <span className="text-[#1A5C33]">EL ABASTO</span>
          </h1>
          <p className="text-[#c0cfc1] max-w-2xl mx-auto text-lg font-light mb-10">
            Desarrollador inmobiliario especializado en la red logística agroalimentaria del norte de México.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} className="py-24 bg-[#0a140c] border-y border-[#1A5C33]/20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <span className="text-6xl font-display font-black text-white">{years}</span>
            <p className="text-[#8a9a8b] text-xs uppercase tracking-[0.2em] mt-2">Años de Trayectoria</p>
          </div>
          <div>
            <span className="text-6xl font-display font-black text-white">+{properties}</span>
            <p className="text-[#8a9a8b] text-xs uppercase tracking-[0.2em] mt-2">Propiedades</p>
          </div>
          <div>
            <span className="text-6xl font-display font-black text-white">{influence}</span>
            <p className="text-[#8a9a8b] text-xs uppercase tracking-[0.2em] mt-2">Puntos de Influencia</p>
          </div>
        </div>
      </section>

      {/* BITÁCORA SECTION */}
      <section className="py-32 bg-[#060d07]">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[2px] w-12 bg-[#1A5C33]"></div>
            <h2 className="font-display text-4xl font-black uppercase tracking-tight">Bitácora de Desarrollo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ObraCard ciudad="Monterrey" proyecto="Abastos Estrella" porcentaje={72} fase="Estructura" imageSrc="/images/obra-monterrey.jpg" />
            <ObraCard ciudad="Torreón" proyecto="Mercahorro Central" porcentaje={88} fase="Acabados" imageSrc="/images/obra-torreon.jpg" />
            <ObraCard ciudad="Gómez Palacio" proyecto="Plaza Abastos" porcentaje={45} fase="Cimentación" imageSrc="/images/obra-gomez-palacio.jpg" />
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="py-12 bg-[#050a06] border-t border-white/5 text-center">
        <p className="text-[#4a5a4b] text-[10px] uppercase tracking-[0.3em]">
          © 2026 Grupo Mercahorro • Infraestructura Agroalimentaria
        </p>
      </footer>
    </main>
  );
}