"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   OBRA PROGRESS CARD
───────────────────────────────────────────── */
function ObraCard({ ciudad, proyecto, porcentaje, fase, imageSrc }) {
  return (
    <div className="border border-[#1A5C33]/40 bg-[#0d1a10] overflow-hidden group hover:border-[#1A5C33] transition-colors duration-300">
      <div className="relative h-48 overflow-hidden bg-[#1a1a1a]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`Avance de obra ${ciudad}`}
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A5C33]/20 to-[#3D1C02]/20" />
        )}
        <div className="absolute top-4 left-4 bg-[#1A5C33] px-3 py-1">
          <span className="text-[10px] text-white font-bold tracking-widest uppercase">
            {fase}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-white font-display text-xl mb-1 tracking-tight">{ciudad}</h4>
        <p className="text-[#8a9a8b] text-xs mb-4 uppercase tracking-wider">{proyecto}</p>
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-[10px] text-[#8a9a8b] uppercase tracking-tighter">Progreso de Obra</span>
            <span className="text-white font-display text-lg">{porcentaje}%</span>
          </div>
          <div className="h-1 bg-white/5 w-full">
            <div 
              className="h-full bg-[#1A5C33] transition-all duration-1000 ease-out"
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const years = useCounter(17, 2500, statsVisible);
  const properties = useCounter(300, 2500, statsVisible);
  const influence = useCounter(89, 2500, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="relative min-h-screen">
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-obra.jpg"
              alt="Obra en construcción Mercahorro"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.35) contrast(1.1)" }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="mb-8 flex justify-center">
              <div className="h-px w-12 bg-[#1A5C33] self-center" />
              <span className="mx-4 text-[#1A5C33] font-bold tracking-[0.4em] text-xs uppercase">
                Infraestructura y Capital
              </span>
              <div className="h-px w-12 bg-[#1A5C33] self-center" />
            </div>
            <h1 className="text-white font-display text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tighter">
              CONSTRUIMOS <br /> EL ABASTO
            </h1>
            <p className="text-[#c0cfc1] max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-10">
              Desarrollador inmobiliario especializado en la red logística agroalimentaria 
              más sólida del norte de México. 17 años de certeza patrimonial.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="bg-[#1A5C33] hover:bg-[#2a7a45] text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all">
                Ver Portafolio de Activos
              </button>
              <button className="border border-white/20 hover:border-white text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all backdrop-blur-sm">
                Inversión Patrimonial
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-px h-16 bg-gradient-to-b from-[#1A5C33] to-transparent" />
          </div>
        </section>

        {/* STATS SECTION */}
        <section ref={statsRef} className="py-24 bg-[#0a140c] border-y border-[#1A5C33]/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-2">
                <span className="text-6xl md:text-7xl font-display text-white font-black">{years}</span>
                <p className="text-[#8a9a8b] text-xs uppercase tracking-[0.3em] font-bold">Años de Trayectoria</p>
              </div>
              <div className="space-y-2">
                <span className="text-6xl md:text-7xl font-display text-white font-black">+{properties}</span>
                <p className="text-[#8a9a8b] text-xs uppercase tracking-[0.3em] font-bold">Propiedades Desarrolladas</p>
              </div>
              <div className="space-y-2">
                <span className="text-6xl md:text-7xl font-display text-white font-black">{influence}</span>
                <p className="text-[#8a9a8b] text-xs uppercase tracking-[0.3em] font-bold">Puntos de Influencia</p>
              </div>
            </div>
          </div>
        </section>

        {/* BITÁCORA DE OBRA */}
        <section className="py-32 bg-[#060d07]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-white font-display text-4xl md:text-6xl font-black tracking-tight mb-4">
                  BITÁCORA DE <br /> DESARROLLO
                </h2>
                <p className="text-[#8a9a8b] max-w-md uppercase text-xs tracking-widest leading-loose">
                  Seguimiento técnico de infraestructura en ejecución. La prueba tangible de nuestro compromiso constructivo.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[#1A5C33] font-display text-8xl font-black opacity-20">2024</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ObraCard 
                ciudad="Monterrey" 
                proyecto="Abastos Estrella" 
                porcentaje={72} 
                fase="Estructura Metálica"
                imageSrc="/images/obra-monterrey.jpg"
              />
              <ObraCard 
                ciudad="Torreón" 
                proyecto="Mercahorro Central" 
                porcentaje={88} 
                fase="Acabados e Instalación"
                imageSrc="/images/obra-torreon.jpg"
              />
              <ObraCard 
                ciudad="Gómez Palacio" 
                proyecto="Plaza Abastos" 
                porcentaje={45} 
                fase="Cimentación y Firme"
                imageSrc="/images/obra-gomez-palacio.jpg"
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN TRAYECTORIA / FLAGSHIP */}
        <section className="relative py-40 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/mercahorro-torreon-aerea.jpg"
              alt="Vista aérea Mercahorro Torreón"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.2) saturate(0.8)" }}
            />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <h2 className="text-white font-display text-5xl md:text-7xl font-black mb-8 leading-none">
                INFRAESTRUCTURA <br /> ANTICÍCLICA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <p className="text-[#c0cfc1] text-lg leading-relaxed font-light">
                  No construimos activos vacíos. Creamos ecosistemas de abasto donde el comercio y el capital 
                  convergen en activos de ladrillo real, protegidos contra la volatilidad del mercado.
                </p>
                <div className="border-l border-[#1A5C33] pl-8 flex flex-col justify-center">
                  <span className="text-[#1A5C33] font-bold text-sm tracking-widest uppercase mb-2">Certeza Jurídica</span>
                  <p className="text-[#8a9a8b] text-sm italic">
                    "La solidez del norte de México reflejada en cada metro cuadrado de concreto entregado."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ECOSISTEMA DE MARCAS */}
        <section className="py-32 bg-[#0a140c]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-white font-display text-4xl font-bold mb-6">INTEGRACIÓN ESTRATÉGICA</h3>
                <p className="text-[#8a9a8b] mb-10 leading-relaxed">
                  Grupo Mercahorro es el motor físico. Nuestro ecosistema se extiende a través de 
                  entidades especializadas que garantizan el cumplimiento fiscal y la gestión inteligente de capital.
                </p>
                <div className="space-y-6">
                  <div className="group p-6 border border-white/5 hover:border-[#1A5C33]/50 transition-colors">
                    <h4 className="text-white font-bold mb-2 tracking-wider">MERCA MÉXICO</h4>
                    <p className="text-[#8a9a8b] text-sm">Organismo Validador de cumplimiento fiscal y formalización del sector abasto.</p>
                  </div>
                  <div className="group p-6 border border-white/5 hover:border-[#9B1C1C]/50 transition-colors">
                    <h4 className="text-white font-bold mb-2 tracking-wider">MERCA CAPITAL</h4>
                    <p className="text-[#8a9a8b] text-sm">Gestión de fondos de inversión y banca ética para el desarrollo de infraestructura.</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square border border-[#1A5C33]/20 flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-[#1A5C33]/5 animate-pulse" />
                <div className="text-center relative z-10">
                  <div className="text-[#1A5C33] text-8xl font-black font-display mb-4">M</div>
                  <div className="text-white font-bold tracking-[0.5em] uppercase text-xl">Mercahorro</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#060d07] pt-20 pb-10 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              <div className="md:col-span-2">
                <h2 className="text-white font-display text-3xl font-black mb-6">GRUPO MERCAHORRO</h2>
                <p className="text-[#8a9a8b] max-w-sm text-sm leading-relaxed mb-8">
                  La infraestructura que sostiene el comercio en México. 
                  Sede corporativa en el corazón de la zona logística del norte.
                </p>
              </div>
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-widest mb-6">Unidades</p>
                <ul className="space-y-4">
                  {["Merca México", "Merca Capital", "Promotora Mercahorro"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[#8a9a8b] hover:text-[#1A5C33] text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white font-bold text-xs uppercase tracking-widest mb-6">Plazas</p>
                <ul className="space-y-3">
                  {[
                    { ciudad: "Torreón", estado: "Coahuila" },
                    { ciudad: "Gómez Palacio", estado: "Durango" },
                    { ciudad: "Monterrey", estado: "Nuevo León" },
                  ].map(({ ciudad, estado }) => (
                    <li key={ciudad} className="flex flex-col">
                      <span className="text-white text-sm font-medium">{ciudad}</span>
                      <span className="text-[#8a9a8b] text-xs">{estado}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[#1A5C33]/20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-[#8a9a8b] text-xs">
                © 2024 Grupo Mercahorro · Promotora Mercahorro S.A. de C.V.
              </p>
              <div className="flex gap-6">
                {["Aviso de Privacidad", "Términos de Uso", "Contacto"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-[#8a9a8b] hover:text-white text-xs tracking-[0.15em] transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}