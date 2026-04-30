"use client";

import { useEffect, useRef, useState } from "react";

/* ─── COUNTER HOOK ─── */
function useCounter(target, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

/* ─── PROGRESS BAR ─── */
function ProgressBar({ pct }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setWidth(pct); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref} style={{ background: "#e5e7eb", borderRadius: 4, height: 8, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: "#1A5C33",
          borderRadius: 4,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

/* ─── OBRA CARD ─── */
function ObraCard({ ciudad, estado, proyecto, pct, fase, img }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #d1d5db",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Imagen */}
      <div
        style={{
          position: "relative",
          height: 180,
          background: "#1A5C33",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={img}
          alt={`Avance ${ciudad}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        {/* Badge estado */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "#9B1C1C",
            color: "#fff",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "3px 10px",
            borderRadius: 4,
          }}
        >
          En Obra
        </div>
        {/* Porcentaje superpuesto */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: "rgba(0,0,0,0.75)",
            color: "#fff",
            fontSize: 22,
            fontWeight: 900,
            padding: "4px 12px",
            borderRadius: 6,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {pct}%
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#1A5C33", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {ciudad}, {estado}
          </p>
          <h3 style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 800, color: "#111", lineHeight: 1.2 }}>
            {proyecto}
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{fase}</p>
        <div>
          <ProgressBar pct={pct} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>Avance físico</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1A5C33" }}>{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ value, suffix = "", label, sub }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "32px 24px",
        borderRight: "1px solid #e5e7eb",
        flex: "1 1 0",
      }}
    >
      <div style={{ fontSize: "clamp(52px, 7vw, 80px)", fontWeight: 900, color: "#1A5C33", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {value}{suffix}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginTop: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}

/* ─── MAIN ─── */
export default function MercahorroPage() {
  const [statsOn, setStatsOn] = useState(false);
  const statsRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const anos = useCounter(17, 1600, statsOn);
  const props = useCounter(300, 2000, statsOn);
  const puntos = useCounter(89, 1800, statsOn);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", margin: 0, padding: 0, color: "#111" }}>

      {/* ══ NAV ══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#fff", borderBottom: "2px solid #1A5C33",
        height: 60, display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, background: "#1A5C33",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, flexShrink: 0,
            }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>M</span>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 15, color: "#111", letterSpacing: "0.05em", textTransform: "uppercase", lineHeight: 1.1 }}>
                Grupo Mercahorro
              </div>
              <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Infraestructura de Abasto
              </div>
            </div>
          </div>

          {/* Nav links — desktop */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="nav-desktop">
            {["Proyectos", "Bitácora", "Inversión", "Contacto"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontSize: 13, fontWeight: 600, color: "#374151",
                textDecoration: "none", letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#1A5C33"}
                onMouseLeave={e => e.currentTarget.style.color = "#374151"}
              >
                {item}
              </a>
            ))}
            <a href="https://mercacapital.mx" target="_blank" rel="noopener noreferrer"
              style={{
                background: "#1A5C33", color: "#fff", fontSize: 12,
                fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "8px 18px", borderRadius: 6, textDecoration: "none",
              }}
            >
              Invertir →
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
            className="nav-mobile-btn"
            aria-label="Menú"
          >
            <div style={{ width: 22, height: 2, background: "#111", marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: "#111", marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: "#111" }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: "absolute", top: 60, left: 0, right: 0,
            background: "#fff", borderBottom: "2px solid #1A5C33",
            padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16,
          }}>
            {["Proyectos", "Bitácora", "Inversión", "Contacto"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: 15, fontWeight: 700, color: "#111", textDecoration: "none" }}
              >
                {item}
              </a>
            ))}
            <a href="https://mercacapital.mx" style={{
              background: "#1A5C33", color: "#fff", padding: "10px 16px",
              borderRadius: 6, textDecoration: "none", fontWeight: 700, fontSize: 14,
            }}>
              Invertir →
            </a>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 60 }}>
        {/* Imagen de fondo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#0d2016", overflow: "hidden" }}>
          <img
            src="/images/hero-obra.jpg"
            alt="Obra en construcción Mercahorro"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.45, display: "block" }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
          {/* Overlay sólido — sin filtros */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(6,20,9,0.62)" }} />
        </div>

        {/* Contenido Hero */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 3, background: "#9B1C1C" }} />
            <span style={{
              color: "#9B1C1C", fontSize: 11, fontWeight: 800,
              letterSpacing: "0.35em", textTransform: "uppercase",
            }}>
              Norte de México · Desde 2007
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            margin: 0, lineHeight: 0.92, fontWeight: 900,
            textTransform: "uppercase",
            fontSize: "clamp(56px, 11vw, 130px)",
            textShadow: "0 2px 12px rgba(0,0,0,0.8)",
          }}>
            <span style={{ display: "block", color: "#ffffff" }}>CONSTRUIMOS</span>
            <span style={{ display: "block", color: "#4ADE80" }}>EL ABASTO</span>
          </h1>

          {/* Subcopía */}
          <p style={{
            marginTop: 28, marginBottom: 0,
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: "#d1fae5", lineHeight: 1.6, maxWidth: 600,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}>
            17 años transformando la infraestructura agroalimentaria del norte de México.
            Más de 300 propiedades comerciales en operación continua.
          </p>

          {/* CTAs */}
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
            <a href="#proyectos" style={{
              background: "#1A5C33", color: "#fff",
              fontSize: 14, fontWeight: 800, letterSpacing: "0.15em",
              textTransform: "uppercase", padding: "14px 32px",
              borderRadius: 8, textDecoration: "none",
              border: "2px solid #1A5C33",
            }}>
              Ver Proyectos →
            </a>
            <a href="#bitacora" style={{
              background: "transparent", color: "#fff",
              fontSize: 14, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", padding: "14px 32px",
              borderRadius: 8, textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.5)",
            }}>
              Bitácora de Obra
            </a>
          </div>

          {/* CVCs */}
          <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["CVC Occidente", "CVC Centro", "CVC Norte"].map(c => (
              <div key={c} style={{
                display: "flex", alignItems: "center", gap: 6,
                border: "1px solid rgba(74,222,128,0.35)",
                padding: "6px 14px", borderRadius: 6,
              }}>
                <div style={{ width: 7, height: 7, background: "#4ADE80", borderRadius: "50%" }} />
                <span style={{ color: "#d1fae5", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ESTADÍSTICAS ══ */}
      <section ref={statsRef} id="proyectos" style={{ background: "#fff", borderTop: "4px solid #1A5C33", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <StatCard value={anos} label="Años de Experiencia" sub="Desde 2007 en operación" />
            <StatCard value={props} suffix="+" label="Propiedades Desarrolladas" sub="Locales comerciales activos" />
            <StatCard value={puntos} label="Puntos de Influencia" sub="Red nacional de abasto" />
            <div style={{
              flex: "1 1 0", textAlign: "center", padding: "32px 24px",
            }}>
              <div style={{ fontSize: "clamp(52px, 7vw, 80px)", fontWeight: 900, color: "#1A5C33", lineHeight: 1 }}>3</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginTop: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Centros de Validación
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Occidente · Centro · Norte</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BITÁCORA ══ */}
      <section id="bitacora" style={{ background: "#f9fafb", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 48, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#9B1C1C", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                  Transparencia Operacional
                </span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "#111", textTransform: "uppercase", lineHeight: 1 }}>
                Bitácora de{" "}
                <span style={{ color: "#1A5C33" }}>Obra</span>
              </h2>
              <p style={{ margin: "12px 0 0", fontSize: 15, color: "#6b7280", maxWidth: 480, lineHeight: 1.6 }}>
                Avances físicos verificados. Sin renders. Sin proyecciones. Solo obra ejecutada en campo.
              </p>
            </div>
            <a href="/bitacora" style={{
              border: "2px solid #1A5C33", color: "#1A5C33",
              fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "10px 22px",
              borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap",
            }}>
              Ver Todo →
            </a>
          </div>

          {/* Grid de tarjetas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            <ObraCard
              ciudad="Monterrey" estado="N.L."
              proyecto="Mercahorro Monterrey Fase II"
              pct={72} fase="Estructura — Nivel 3 completado"
              img="/images/obra-monterrey.jpg"
            />
            <ObraCard
              ciudad="Torreón" estado="Coah."
              proyecto="Plaza Abastos Torreón Ampliación"
              pct={88} fase="Acabados — Instalaciones en proceso"
              img="/images/obra-torreon.jpg"
            />
            <ObraCard
              ciudad="Gómez Palacio" estado="Dgo."
              proyecto="Mercahorro Gómez Palacio"
              pct={45} fase="Cimentación — Primera etapa"
              img="/images/obra-gomez-palacio.jpg"
            />
          </div>
        </div>
      </section>

      {/* ══ LEGITIMIDAD ══ */}
      <section style={{ background: "#fff", padding: "80px 24px", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
            {/* Texto */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#9B1C1C", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                  Activo Probado · Torreón, Coahuila
                </span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "#111", textTransform: "uppercase", lineHeight: 1.1 }}>
                Un clúster comercial vivo.{" "}
                <span style={{ color: "#1A5C33" }}>No un prospecto.</span>
              </h2>
              <p style={{ margin: "20px 0", fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
                Mercahorro Torreón es infraestructura de abasto en operación: más de
                150 locales activos, flujo constante de mayoristas, y demanda estructural
                que no depende de ciclos especulativos.
              </p>
              <p style={{ margin: "0 0 28px", fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
                Los activos de mercado mayorista son anticíclicos por definición.
                La cadena de alimentos no para. Los flujos de renta tampoco.
              </p>

              {/* Métricas */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
                {[
                  { v: "24–28%", l: "TIR proyectada" },
                  { v: "8–12%", l: "Renta anual" },
                  { v: "15 años", l: "Historial" },
                ].map(({ v, l }) => (
                  <div key={l} style={{
                    background: "#f0fdf4", border: "1px solid #bbf7d0",
                    borderRadius: 10, padding: "16px 12px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#1A5C33" }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                  </div>
                ))}
              </div>

              <a href="https://mercacapital.mx" target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-block", background: "#9B1C1C", color: "#fff",
                  fontSize: 14, fontWeight: 800, letterSpacing: "0.1em",
                  textTransform: "uppercase", padding: "14px 28px",
                  borderRadius: 8, textDecoration: "none",
                }}
              >
                Perfil de Inversión — Merca Capital →
              </a>
            </div>

            {/* Imagen aérea */}
            <div style={{ position: "relative" }}>
              <div style={{
                background: "#1A5C33", borderRadius: 12, overflow: "hidden",
                aspectRatio: "1 / 1",
              }}>
                <img
                  src="/images/mercahorro-torreon-aerea.jpg"
                  alt="Vista aérea Mercahorro Torreón"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              {/* Etiqueta */}
              <div style={{
                position: "absolute", bottom: 16, left: 16,
                background: "#fff", border: "1px solid #d1d5db",
                borderRadius: 8, padding: "10px 16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#1A5C33", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Mercahorro Torreón
                </div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2, fontFamily: "monospace" }}>
                  25.5479° N, 103.4068° W
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ECOSISTEMA ══ */}
      <section style={{ background: "#f9fafb", padding: "80px 24px", borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#111", textTransform: "uppercase" }}>
              El <span style={{ color: "#1A5C33" }}>Ecosistema</span>
            </h2>
            <p style={{ margin: "12px auto 0", fontSize: 15, color: "#6b7280", maxWidth: 520, lineHeight: 1.6 }}>
              Tres entidades que operan de forma coordinada para garantizar transparencia,
              validación y gestión institucional del capital.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              {
                icon: "G", color: "#1A5C33", title: "Grupo Mercahorro",
                desc: "Desarrollador de infraestructura de abasto mayorista. Marcas Mercahorro y Plaza Abastos en operación en Torreón, Gómez Palacio y Monterrey.",
                link: null, linkLabel: null,
              },
              {
                icon: "MM", color: "#3D1C02", title: "Merca México",
                desc: "Órgano validador del Registro de Activos Verificados (RAV). Certifica autenticidad y estado operativo de cada propiedad dentro del ecosistema.",
                link: "https://mercamexico.mx", linkLabel: "mercamexico.mx →",
              },
              {
                icon: "MC", color: "#9B1C1C", title: "Merca Capital",
                desc: "Gestión institucional de inversión. Fondo SAPI con objetivo de 100 millones USD. Para inversores calificados con visión patrimonial de largo plazo.",
                link: "https://mercacapital.mx", linkLabel: "mercacapital.mx →",
              },
            ].map(({ icon, color, title, desc, link, linkLabel }) => (
              <div key={title} style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: 12, padding: "28px 24px",
                borderTop: `4px solid ${color}`,
              }}>
                <div style={{
                  width: 44, height: 44, background: color,
                  borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <span style={{ color: "#fff", fontWeight: 900, fontSize: 14 }}>{icon}</span>
                </div>
                <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: "#111" }}>{title}</h3>
                <p style={{ margin: "0 0 16px", fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{desc}</p>
                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, fontWeight: 700, color, textDecoration: "none", letterSpacing: "0.05em" }}
                  >
                    {linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0d1a10", borderTop: "4px solid #1A5C33" }}>
        {/* Footer principal */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 24px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
            {/* Marca */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, background: "#1A5C33", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>M</span>
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: 14, color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Grupo Mercahorro
                  </div>
                  <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    La estructura que sostiene el comercio
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>
                Infraestructura de abasto mayorista en el norte de México.
                17 años de operación ininterrumpida.
              </p>
            </div>

            {/* Plazas */}
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Plazas en Operación
              </p>
              {[
                { c: "Torreón", e: "Coahuila" },
                { c: "Gómez Palacio", e: "Durango" },
                { c: "Monterrey", e: "Nuevo León" },
              ].map(({ c, e }) => (
                <div key={c} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6" }}>{c}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{e}</div>
                </div>
              ))}
            </div>

            {/* Ecosistema */}
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Ecosistema
              </p>
              {[
                { label: "Merca México", sub: "Validación RAV", href: "https://mercamexico.mx" },
                { label: "Merca Capital", sub: "Gestión de inversión", href: "https://mercacapital.mx" },
                { label: "Mercahorro", sub: "Desarrollo comercial", href: "#" },
                { label: "Plaza Abastos", sub: "Marca regional", href: "#" },
              ].map(({ label, sub, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{ display: "block", marginBottom: 10, textDecoration: "none" }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#4ADE80"}
                    onMouseLeave={e => e.currentTarget.style.color = "#f3f4f6"}
                  >{label}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{sub}</div>
                </a>
              ))}
            </div>

            {/* Contacto */}
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                Contacto Institucional
              </p>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>
                Para consultas sobre inversión, adquisición de locales comerciales o
                información de desarrollos.
              </p>
              <a href="mailto:contacto@mercahorro.com" style={{
                display: "inline-block", background: "#1A5C33", color: "#fff",
                fontSize: 13, fontWeight: 700, padding: "10px 20px",
                borderRadius: 6, textDecoration: "none",
              }}>
                Enviar Mensaje →
              </a>
            </div>
          </div>
        </div>

        {/* Barra de copyright */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
              © 2026 Grupo Mercahorro · Promotora Mercahorro S.A. de C.V. · Todos los derechos reservados.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Aviso de Privacidad", "Términos de Uso"].map(t => (
                <a key={t} href="#" style={{ fontSize: 12, color: "#6b7280", textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
                >{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Estilos responsivos inline ── */}
      <style>{`
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 641px) {
          .nav-mobile-btn { display: none !important; }
        }
        * { box-sizing: border-box; }
        a { cursor: pointer; }
      `}</style>
    </div>
  );
}
