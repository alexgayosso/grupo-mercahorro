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
    <div className="bg-white border border-zinc-200 overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300">
      <div className="relative h-64 bg-zinc-100">
        <img src={imageSrc} alt={ciudad} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute top-4 left-4 bg-[#1A5C33] px-3 py-1 z-20">
          <span className="text-[10px] text-white font-black uppercase tracking-widest">{fase}</span>
        </div>
      </div>
      <div className="p-8">
        <h4 className="text-[#1A5C33] text-3xl mb-1 font-black uppercase tracking-tighter">{ciudad}</h4>
        <p className="text-zinc-500 text-xs mb-6 uppercase font-bold tracking-widest">{proyecto}</p>
        <div className="flex justify-between items-end mb-3">
          <span className="text-[10px] text-zinc-400 uppercase font-black">Avance de Obra</span>
          <span className="text-[#1A5C33] text-2xl font-black">{porcentaje}%</span>
        </div>
        <div className="h-3 bg-zinc-100 w-full rounded-full overflow-hidden border border-zinc-200">
          <div className="h-full bg-[#1A5C33]" style={{ width: `${porcentaje}%` }} />
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

  if (!mounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* HERO - MANTENIDO POR ÉXITO VISUAL */}
      <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <img src="/images/hero-obra.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-90" style={{ filter: "brightness(0.9) contrast(1.1)" }} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-white text-6xl md:text-9xl font-black uppercase leading-none drop-shadow-2xl">CONSTRUIMOS <br /><span className="text-[#2fa159]">EL ABASTO</span></h1>
          <p className="text-white bg-[#1A5C33] inline-block px-8 py-3 mt-8 rounded-full text-lg font-bold uppercase tracking-widest">Líderes en Red Logística</p>
        </div>
      </section>

      {/* STATS - FONDO CLARO PARA VISIBILIDAD TOTAL */}
      <section ref={statsRef} className="py-40 bg-zinc-50 border-y border-zinc-200">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
          {[ [years, "Años de Éxito"], [properties, "Propiedades"], [influence, "Puntos de Red"] ].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-9xl font-black text-[#1A5C33] tracking-tighter leading-none">
                {label === "Propiedades" ? `+${val}` : val}
              </span>
              <div className="h-1.5 w-24 bg-[#2fa159] my-8" />
              <p className="text-zinc-500 text-sm uppercase tracking-[0.4em] font-black">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BITÁCORA - DISEÑO LIMPIO */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8 mb-24">
            <div className="h-2 w-32 bg-[#1A5C33]" />
            <h2 className="text-[#1A5C33] text-6xl font-black uppercase tracking-tighter">Bitácora</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <ObraCard ciudad="Monterrey" proyecto="Abastos Estrella" porcentaje={72} fase="Estructura" imageSrc="/images/obra-monterrey.jpg" />
            <ObraCard ciudad="Torreón" proyecto="Mercahorro Central" porcentaje={88} fase="Acabados" imageSrc="/images/obra-torreon.jpg" />
            <ObraCard ciudad="Gómez Palacio" proyecto="Plaza Abastos" porcentaje={45} fase="Cimentación" imageSrc="/images/obra-gomez-palacio.jpg" />
          </div>
        </div>
      </section>

      <footer className="py-20 bg-zinc-100 border-t border-zinc-200 text-center">
        <p className="text-zinc-400 text-xs font-black uppercase tracking-[1em]">Grupo Mercahorro 2026</p>
      </footer>
    </main>
  );
}