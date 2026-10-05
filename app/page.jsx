"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ══════════════════════════════════════════
   COUNTER HOOK
══════════════════════════════════════════ */
function useCounter(target, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

/* ══════════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════════ */
function ProgressBar({ pct }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setW(pct); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div ref={ref} style={{ background: "#e5e7eb", borderRadius: 4, height: 8, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${w}%`, background: "#1A5C33", borderRadius: 4, transition: "width 1.2s ease" }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   MODAL GALERÍA
══════════════════════════════════════════ */
function Modal({ data, onClose }) {
  const [idx, setIdx] = useState(0);
  const fotos = data.fotos || [];

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const BADGE = {
    "en-obra":       { label: "En Obra",      color: "#9B1C1C" },
    "operando":      { label: "Operando",      color: "#1A5C33" },
    "en-desarrollo": { label: "En desarrollo", color: "#1A5C33" },
    "por-iniciar":   { label: "En desarrollo", color: "#1A5C33" },
  };
  const badge = BADGE[data.status] || BADGE["en-obra"];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.80)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 820, maxHeight: "88vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ background: badge.color, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4 }}>{badge.label}</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#111" }}>{data.proyecto}</h2>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: "#6b7280" }}>{data.ciudad}, {data.estado} · {data.fase}</p>
          </div>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", borderRadius: 8, width: 36, height: 36, cursor: "pointer", fontSize: 16, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {fotos.length > 0 ? (
            <>
              <div style={{ position: "relative", background: "#111", height: 340 }}>
                <img key={fotos[idx]} src={fotos[idx]} alt={data.altImg || `${data.proyecto} foto ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                {data.altImg && (
                  <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.72)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 4, letterSpacing: "0.08em" }}>
                    🖼 {data.altImg}
                  </div>
                )}
                {fotos.length > 1 && (
                  <>
                    <button onClick={() => setIdx(i => (i - 1 + fotos.length) % fotos.length)} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: 8, width: 38, height: 38, fontSize: 20, cursor: "pointer" }}>‹</button>
                    <button onClick={() => setIdx(i => (i + 1) % fotos.length)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: 8, width: 38, height: 38, fontSize: 20, cursor: "pointer" }}>›</button>
                    <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 12, padding: "3px 10px", borderRadius: 6 }}>{idx + 1} / {fotos.length}</div>
                  </>
                )}
              </div>
              {fotos.length > 1 && (
                <div style={{ display: "flex", gap: 8, padding: "10px 14px", background: "#f9fafb", borderTop: "1px solid #e5e7eb", overflowX: "auto" }}>
                  {fotos.map((f, i) => (
                    <div key={i} onClick={() => setIdx(i)} style={{ flexShrink: 0, width: 70, height: 52, borderRadius: 6, overflow: "hidden", border: `2px solid ${i === idx ? "#1A5C33" : "transparent"}`, cursor: "pointer", opacity: i === idx ? 1 : 0.55, transition: "all 0.2s" }}>
                      <img src={f} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: "56px 32px", textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>📷</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, color: "#111" }}>Galería en preparación</h3>
              <p style={{ margin: "0 auto", fontSize: 14, color: "#6b7280", maxWidth: 320 }}>Las fotos de avance de {data.proyecto} estarán disponibles próximamente.</p>
            </div>
          )}
          {data.status === "en-obra" && typeof data.pct === "number" && data.pct > 0 && (
            <div style={{ padding: "14px 22px", borderTop: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>Avance físico documentado</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#1A5C33" }}>{data.pct}%</span>
              </div>
              <div style={{ background: "#e5e7eb", borderRadius: 4, height: 10 }}>
                <div style={{ height: "100%", width: `${data.pct}%`, background: "#1A5C33", borderRadius: 4 }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   OBRA CARD
══════════════════════════════════════════ */
function ObraCard({ data, onOpen }) {
  const BADGE = {
    "en-obra":       { label: "En Obra",      color: "#9B1C1C" },
    "operando":      { label: "Operando",      color: "#1A5C33" },
    "en-desarrollo": { label: "En desarrollo", color: "#1A5C33" },
    "por-iniciar":   { label: "En desarrollo", color: "#1A5C33" },
  };
  const badge = BADGE[data.status] || BADGE["en-obra"];
  const showBar = data.status === "en-obra" && typeof data.pct === "number" && data.pct > 0;

  return (
    <div
      role="button" tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === "Enter") onOpen(); }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.13)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
      style={{ background: "#fff", border: "1px solid #d1d5db", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", outline: "none" }}
    >
      <div style={{ position: "relative", height: 180, background: "#1A5C33", overflow: "hidden", flexShrink: 0 }}>
        <img src={data.img} alt={data.altImg || data.proyecto} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
        <div style={{ position: "absolute", top: 10, left: 10, background: badge.color, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4 }}>{badge.label}</div>
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.58)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 4 }}>
          {data.altImg ? "🖼 Ver render" : "📷 Ver fotos"}
        </div>
        {data.status === "en-obra" && typeof data.pct === "number" && data.pct > 0 && (
          <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.75)", color: "#fff", fontSize: 22, fontWeight: 900, padding: "4px 12px", borderRadius: 6 }}>{data.pct}%</div>
        )}
      </div>
      <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#1A5C33", letterSpacing: "0.2em", textTransform: "uppercase" }}>{data.ciudad}, {data.estado}</p>
          <h3 style={{ margin: "4px 0 0", fontSize: 17, fontWeight: 800, color: "#111", lineHeight: 1.2 }}>{data.proyecto}</h3>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>{data.fase}</p>
        {showBar && (
          <div>
            <ProgressBar pct={data.pct} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ fontSize: 12, color: "#6b7280" }}>Avance físico</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A5C33" }}>{data.pct}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PROYECTOS DATA
══════════════════════════════════════════ */
const PROYECTOS = [
  {
    ciudad: "Monterrey", estado: "N.L.",
    proyecto: "Mercahorro Monterrey",
    pct: 100, fase: "Plaza mayorista en operación continua",
    img: "/images/obra-monterrey.jpg", status: "operando",
    fotos: ["/images/obra-monterrey.jpg"],
  },
  {
    ciudad: "Torreón", estado: "Coah.",
    proyecto: "Mercahorro Torreón",
    pct: 100, fase: "Plaza mayorista en operación continua",
    img: "/images/obra-torreon.jpg", status: "operando",
    fotos: [
      "/images/obra-torreon.jpg",
      "/images/bitacora/torreon-01.jpg",
      "/images/bitacora/torreon-02.jpg",
      "/images/bitacora/torreon-03.jpg",
      "/images/bitacora/torreon-04.jpg",
    ],
  },
  {
    ciudad: "Gómez Palacio", estado: "Dgo.",
    proyecto: "Mercahorro Gómez Palacio",
    pct: null, fase: "Proyecto en desarrollo",
    img: "/images/obra-gomez-palacio.jpg", status: "en-desarrollo",
    fotos: [
      "/images/obra-gomez-palacio.jpg",
      "/images/bitacora/gomez-01.jpg",
      "/images/bitacora/gomez-02.jpg",
      "/images/bitacora/gomez-03.jpg",
      "/images/bitacora/gomez-04.jpg",
    ],
  },
  {
    ciudad: "Torreón", estado: "Coah.",
    proyecto: "Plaza Abastos Torreón",
    pct: 100, fase: "Centro comercial de abasto en operación",
    img: "/images/obra-plaza-abastos-torreon.jpg", status: "operando",
    fotos: [
      "/images/obra-plaza-abastos-torreon.jpg",
      "/images/bitacora/plaza-abastos-01.jpg",
      "/images/bitacora/plaza-abastos-02.jpg",
      "/images/bitacora/plaza-abastos-03.jpg",
      "/images/bitacora/plaza-abastos-04.jpg",
    ],
  },
  {
    ciudad: "Silao", estado: "Gto.",
    proyecto: "Plaza Mercahorro Abastos Silao",
    pct: null, fase: "Proyecto en desarrollo",
    img: "/images/obra-silao-render.jpg", status: "en-desarrollo",
    altImg: "Render del proyecto",
    fotos: ["/images/obra-silao-render.jpg"],
  },
];

/* ══════════════════════════════════════════
   AGENDA FORM
══════════════════════════════════════════ */
function AgendaForm() {
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", interes: "", presupuesto: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleTel = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm({ ...form, telefono: digits });
    if (errors.telefono) setErrors({ ...errors, telefono: "" });
  };

  const emailRef = useRef(null);

  const validate = () => {
    const next = {};
    if (!form.nombre.trim()) next.nombre = "Ingresa tu nombre completo.";
    if (form.telefono.length !== 10) next.telefono = "Ingresa exactamente 10 dígitos.";
    const emailTrimmed = form.email.trim();
    if (emailTrimmed && emailRef.current && emailRef.current.validity.typeMismatch) {
      next.email = "Ingresa un correo electrónico válido.";
    }
    if (!form.interes) next.interes = "Selecciona una opción.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) { setErrors(next); return; }
    const emailTrimmed = form.email.trim();
    const msg = encodeURIComponent(
      `Hola Mercahorro, soy ${form.nombre.trim()}. Me interesa: ${form.interes}. Presupuesto: ${form.presupuesto || "No especificado"}. Tel: ${form.telefono}. Email: ${emailTrimmed || "No proporcionado"}.`
    );
    window.location.href = `https://wa.me/528141948410?text=${msg}`;
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", fontSize: 15,
    border: "1.5px solid #d1d5db", borderRadius: 8,
    outline: "none", background: "#fff", color: "#111",
    boxSizing: "border-box", fontFamily: "inherit",
  };
  const errorStyle = { fontSize: 12, color: "#dc2626", marginTop: 4, display: "block" };

  return (
    <form onSubmit={handleSubmit} noValidate className="mh-form" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label htmlFor="form-nombre" style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Nombre completo *</label>
        <input
          id="form-nombre" name="nombre" type="text"
          value={form.nombre} onChange={handleChange}
          placeholder="Tu nombre completo"
          autoComplete="name"
          required
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "error-nombre" : undefined}
          style={{ ...inputStyle, borderColor: errors.nombre ? "#dc2626" : "#d1d5db" }}
        />
        {errors.nombre && <span id="error-nombre" role="alert" style={errorStyle}>{errors.nombre}</span>}
      </div>
      <div>
        <label htmlFor="form-telefono" style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>WhatsApp *</label>
        <input
          id="form-telefono" name="telefono" type="tel"
          value={form.telefono} onChange={handleTel}
          placeholder="10 dígitos"
          inputMode="numeric"
          autoComplete="tel-national"
          required
          aria-invalid={!!errors.telefono}
          aria-describedby={errors.telefono ? "error-telefono" : undefined}
          style={{ ...inputStyle, borderColor: errors.telefono ? "#dc2626" : "#d1d5db" }}
        />
        {errors.telefono && <span id="error-telefono" role="alert" style={errorStyle}>{errors.telefono}</span>}
      </div>
      <div>
        <label htmlFor="form-email" style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Correo electrónico</label>
        <input
          ref={emailRef}
          id="form-email" name="email" type="email"
          value={form.email} onChange={handleChange}
          placeholder="tu@email.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : undefined}
          style={{ ...inputStyle, borderColor: errors.email ? "#dc2626" : "#d1d5db" }}
        />
        {errors.email && <span id="error-email" role="alert" style={errorStyle}>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="form-interes" style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>¿Qué te interesa? *</label>
        <select
          id="form-interes" name="interes"
          value={form.interes} onChange={handleChange}
          required
          aria-invalid={!!errors.interes}
          aria-describedby={errors.interes ? "error-interes" : undefined}
          style={{ ...inputStyle, color: form.interes ? "#111" : "#9ca3af", borderColor: errors.interes ? "#dc2626" : "#d1d5db" }}
        >
          <option value="" disabled>Selecciona una opción</option>
          <option value="Local para operar mi negocio">🏪 Local para operar mi negocio</option>
          <option value="Local ya rentado como inversión">📈 Local ya rentado (inversión)</option>
          <option value="Bodega mayorista">🏭 Bodega mayorista</option>
        </select>
        {errors.interes && <span id="error-interes" role="alert" style={errorStyle}>{errors.interes}</span>}
      </div>
      <div>
        <label htmlFor="form-presupuesto" style={{ fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Rango de presupuesto</label>
        <select
          id="form-presupuesto" name="presupuesto"
          value={form.presupuesto} onChange={handleChange}
          style={{ ...inputStyle, color: form.presupuesto ? "#111" : "#9ca3af" }}
        >
          <option value="" disabled>Selecciona un rango</option>
          <option value="Menos de $500,000 MXN">Menos de $500,000 MXN</option>
          <option value="$500,000 – $1,000,000 MXN">$500,000 – $1,000,000 MXN</option>
          <option value="$1,000,000 – $3,000,000 MXN">$1,000,000 – $3,000,000 MXN</option>
          <option value="Más de $3,000,000 MXN">Más de $3,000,000 MXN</option>
          <option value="Solo renta / Prefiero no decir">Solo renta / Prefiero no decir</option>
        </select>
      </div>
      <button type="submit" style={{
        background: "#1A5C33", color: "#fff", border: "none", borderRadius: 8,
        padding: "16px", fontSize: 15, fontWeight: 800,
        letterSpacing: "0.08em", textTransform: "uppercase",
        cursor: "pointer", transition: "background 0.2s", marginTop: 4,
        fontFamily: "inherit",
      }}>
        CONTINUAR EN WHATSAPP →
      </button>
      <p style={{ margin: 0, fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
        Al continuar, los datos que ingreses se incluirán en un mensaje de WhatsApp. Deberás enviarlo para completar tu solicitud.
      </p>
    </form>
  );
}

/* ══════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════ */
function StatCard({ value, suffix, unit, label, sub }) {
  return (
    <div className="mh-stat-cell" style={{ textAlign: "center", padding: "36px 16px", minWidth: 0 }}>
      <div style={{
        fontSize: "clamp(30px, 3.8vw, 58px)", fontWeight: 900,
        color: "#1A5C33", lineHeight: 1,
        whiteSpace: "nowrap",
      }}>
        {value}
        {suffix}
        {unit && (
          <span style={{ fontSize: "0.42em", fontWeight: 900, verticalAlign: "baseline", marginLeft: "0.12em" }}>
            {unit}
          </span>
        )}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#111", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function MercahorroPage() {
  const [statsOn, setStatsOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const statsRef = useRef(null);

  const centros  = useCounter(3,   1200, statsOn);
  const comerc   = useCounter(300, 2000, statsOn);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToForm = () => {
    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", margin: 0, padding: 0, color: "#111" }}>

      {/* ══ MODAL ══ */}
      {modalData && <Modal data={modalData} onClose={() => setModalData(null)} />}

      {/* ══ NAV ══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "#ffffff", borderBottom: "2px solid #1A5C33", height: 80, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0, background: "#fff" }}>
            <img src="/images/logo-mercahorro.png" alt="Grupo Mercahorro"
              style={{ height: 60, width: "auto", display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }} />
            <div style={{ display: "none", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "#1A5C33", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>M</span>
              </div>
              <span style={{ fontWeight: 900, fontSize: 15, color: "#111", textTransform: "uppercase" }}>Grupo Mercahorro</span>
            </div>
          </Link>

          <div className="nav-desktop" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {[
              { label: "Proyectos",  href: "#proyectos" },
              { label: "Inversión",  href: "#inversion" },
              { label: "Contacto",   href: "#agenda" },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                style={{ fontSize: 13, fontWeight: 600, color: "#374151", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}
                onMouseEnter={e => e.currentTarget.style.color = "#1A5C33"}
                onMouseLeave={e => e.currentTarget.style.color = "#374151"}
              >{label}</a>
            ))}
            <a href="#"
              onClick={(e) => { e.preventDefault(); setModalData(PROYECTOS[2]); }}
              style={{ fontSize: 13, fontWeight: 600, color: "#374151", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = "#1A5C33"}
              onMouseLeave={e => e.currentTarget.style.color = "#374151"}
            >Bitácora</a>
            <a href="https://mercacapital.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: "1px solid #e5e7eb", paddingBottom: 1 }}
              onMouseEnter={e => e.currentTarget.style.color = "#9B1C1C"}
              onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
            >Inversionistas Institucionales</a>
            <button onClick={scrollToForm}
              style={{ background: "#1A5C33", color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 22px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Agendar Cita →
            </button>
          </div>

          <button className="nav-mobile-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }} aria-label="Menú">
            <div style={{ width: 22, height: 2, background: "#111", marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: "#111", marginBottom: 5 }} />
            <div style={{ width: 22, height: 2, background: "#111" }} />
          </button>
        </div>

        {menuOpen && (
          <div style={{ position: "absolute", top: 80, left: 0, right: 0, backgroundColor: "#ffffff", borderBottom: "2px solid #1A5C33", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18, zIndex: 200 }}>
            {[
              { label: "Proyectos", href: "#proyectos" },
              { label: "Inversión", href: "#inversion" },
              { label: "Contacto",  href: "#agenda" },
            ].map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                style={{ fontSize: 16, fontWeight: 700, color: "#111", textDecoration: "none" }}>{label}</a>
            ))}
            <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); setModalData(PROYECTOS[2]); }}
              style={{ fontSize: 16, fontWeight: 700, color: "#111", textDecoration: "none" }}>Bitácora</a>
            <a href="https://mercacapital.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, fontWeight: 600, color: "#9B1C1C", textDecoration: "none" }}>Inversionistas Institucionales →</a>
            <button onClick={() => { setMenuOpen(false); scrollToForm(); }}
              style={{ background: "#1A5C33", color: "#fff", padding: "14px 16px", borderRadius: 8, border: "none", fontWeight: 800, fontSize: 15, cursor: "pointer", textTransform: "uppercase", fontFamily: "inherit" }}>
              Agendar Cita →
            </button>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "#0d2016", overflow: "hidden" }}>
          <img src="/images/mercahorro-torreon-aerea.jpg" alt="Mercahorro Torreón — Infraestructura real en operación"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: 0.85, display: "block" }}
            onError={e => { e.currentTarget.style.display = "none"; }} />
          {/* Gradiente direccional — oscurece izquierda donde va el texto, abre derecha para mostrar la infraestructura */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(6,20,9,0.75) 0%, rgba(6,20,9,0.55) 50%, rgba(6,20,9,0.30) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%" }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 3, background: "#9B1C1C" }} />
              <span style={{ color: "#9B1C1C", fontSize: 11, fontWeight: 800, letterSpacing: "0.35em", textTransform: "uppercase" }}>Desarrollo inmobiliario · Abasto de alimentos</span>
            </div>
            <h1 style={{ margin: 0, lineHeight: 1.0, fontWeight: 900, textTransform: "uppercase", fontSize: "clamp(22px, 7vw, 82px)", textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}>
              <span style={{ display: "block", color: "#fff" }}>DESARROLLAMOS</span>
              <span style={{ display: "block", color: "#4ADE80" }}>INFRAESTRUCTURA</span>
              <span style={{ display: "block", color: "#fff" }}>PARA EL ABASTO</span>
            </h1>
            <p style={{ marginTop: 28, marginBottom: 0, fontSize: "clamp(16px, 2.2vw, 20px)", color: "#d1fae5", lineHeight: 1.7, maxWidth: 600, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
              Grupo Mercahorro diseña, desarrolla, construye, comercializa y opera centros especializados en distribución y abasto de alimentos. Integramos experiencia inmobiliaria y conocimiento del comerciante para crear espacios donde productores, distribuidores y negocios puedan operar.
            </p>
            <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14 }}>
              <button onClick={scrollToForm}
                style={{ background: "#1A5C33", color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", padding: "16px 32px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Ver opciones disponibles →
              </button>
              <a href="https://mercahorro.com.mx" target="_blank" rel="noopener noreferrer"
                style={{ background: "transparent", color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "16px 28px", borderRadius: 8, textDecoration: "none", border: "2px solid rgba(255,255,255,0.45)", display: "inline-flex", alignItems: "center" }}>
                Conoce el mercado →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ESTADÍSTICAS ══ */}
      <section ref={statsRef} style={{ background: "#fff", borderTop: "4px solid #1A5C33", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div className="mh-stats-grid">
            <StatCard value={centros} suffix=""   label="Centros en operación"   sub="Dos en Torreón y uno en Monterrey" />
            <StatCard value={comerc}  suffix="+"  label="Comerciantes activos"   sub="En nuestros centros" />
            <StatCard value="≈52,000" unit="m²"   label="Superficie desarrollada" sub="En nuestros desarrollos" />
            <StatCard value="≈20"     unit="años"  label="Experiencia del equipo"  sub="En desarrollo inmobiliario" />
          </div>
        </div>
      </section>

      {/* ══ SEGMENTACIÓN ══ */}
      <section style={{ background: "#f9fafb", padding: "96px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#9B1C1C", letterSpacing: "0.3em", textTransform: "uppercase" }}>Encuentra tu lugar</span>
              <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "#111", textTransform: "uppercase" }}>
              ¿Qué buscas en <span style={{ color: "#1A5C33" }}>Mercahorro</span>?
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>

            {/* Tarjeta A — Negocios */}
            <div
              onClick={scrollToForm}
              style={{ background: "#fff", border: "2px solid #1A5C33", borderRadius: 20, padding: "48px 36px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(26,92,51,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#1A5C33" }} />
              <div style={{ fontSize: 52, marginBottom: 20 }}>🏪</div>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 900, color: "#111", lineHeight: 1.2 }}>
                Quiero un espacio para operar mi negocio
              </h3>
              <p style={{ margin: "0 0 28px", fontSize: 16, color: "#374151", lineHeight: 1.7 }}>
                Locales y bodegas dentro de centros especializados en abasto, para comerciantes, productores y distribuidores.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {["Espacios para comercio y distribución de alimentos", "Opciones de compra o renta, sujetas a disponibilidad", "Asesoría comercial según las necesidades de tu negocio"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 20, height: 20, background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: "#1A5C33" }}>✓</span>
                    </div>
                    <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#1A5C33", color: "#fff", textAlign: "center", padding: "14px", borderRadius: 10, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Ver locales disponibles →
              </div>
            </div>

            {/* Tarjeta B — Inversión */}
            <div
              onClick={scrollToForm}
              style={{ background: "#fff", border: "2px solid #9B1C1C", borderRadius: 20, padding: "48px 36px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(155,28,28,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#9B1C1C" }} />
              <div style={{ fontSize: 52, marginBottom: 20 }}>📈</div>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 900, color: "#111", lineHeight: 1.2 }}>
                Quiero invertir en un activo comercial
              </h3>
              <p style={{ margin: "0 0 28px", fontSize: 16, color: "#374151", lineHeight: 1.7 }}>
                Compra de locales y bodegas como patrimonio inmobiliario, con condiciones específicas para cada espacio y proyecto.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {["Compra directa de un inmueble comercial", "Disponibilidad y condiciones por proyecto", "Información comercial para evaluar cada opción"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 20, height: 20, background: "#fef2f2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: "#9B1C1C" }}>✓</span>
                    </div>
                    <span style={{ fontSize: 14, color: "#374151" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#9B1C1C", color: "#fff", textAlign: "center", padding: "14px", borderRadius: 10, fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Ver opciones de inversión →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FORMULARIO AGENDA ══ */}
      <section id="agenda" style={{ background: "#fff", padding: "96px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#9B1C1C", letterSpacing: "0.3em", textTransform: "uppercase" }}>Sin compromisos</span>
              <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
            </div>
            <h2 style={{ margin: "0 0 12px", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "#111", textTransform: "uppercase" }}>
              Contacto <span style={{ color: "#1A5C33" }}>Comercial</span>
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
              Cuéntanos qué espacio buscas. Continúa en WhatsApp para consultar disponibilidad o solicitar una cita con un asesor.
            </p>
          </div>
          <div style={{ background: "#f9fafb", borderRadius: 20, padding: "40px 36px", border: "1px solid #e5e7eb", boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}>
            <AgendaForm />
          </div>
        </div>
      </section>

      {/* ══ PROYECTOS / BITÁCORA ══ */}
      <section id="proyectos" style={{ background: "#f9fafb", padding: "96px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#9B1C1C", letterSpacing: "0.3em", textTransform: "uppercase" }}>Cartera de Desarrollo</span>
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, color: "#111", textTransform: "uppercase", lineHeight: 1 }}>
              Nuestros <span style={{ color: "#1A5C33" }}>Proyectos</span>
            </h2>
            <p style={{ margin: "10px 0 0", fontSize: 14, color: "#6b7280", maxWidth: 480, lineHeight: 1.6 }}>
              Conoce nuestros centros en operación y proyectos en desarrollo.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {PROYECTOS.map((p) => (
              <ObraCard key={p.proyecto} data={p} onOpen={() => setModalData(p)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIOS — retirado temporalmente ══ */}
      {false && <section style={{ background: "#fff", padding: "96px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#9B1C1C", letterSpacing: "0.3em", textTransform: "uppercase" }}>Experiencia Real</span>
              <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#111", textTransform: "uppercase" }}>
              Lo que dicen nuestros <span style={{ color: "#1A5C33" }}>clientes</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              {
                texto: "La comunidad del mercado es muy unida. Los clientes regresan porque saben que aquí encuentran calidad y buen trato.",
                autor: "Sr. Víctor E.",
                plaza: "Mercahorro Torreón",
                años: "8 años operando",
              },
              {
                texto: "Invertir en Mercahorro fue la mejor decisión patrimonial que tomé. La renta llega puntual cada mes y el local siempre está ocupado.",
                autor: "Miguel G.",
                plaza: "Plaza Abastos Torreón",
                años: "Desde 2019",
              },
              {
                texto: "Llevo años en Mercahorro Torreón y sé cómo funciona el modelo. Cuando vi el proyecto de Gómez Palacio no dudé. La ubicación y el tráfico que van a generar van a superar a Torreón.",
                autor: "Ivonne G.",
                plaza: "Mercahorro Gómez Palacio",
                años: "3 años operando",
              },
            ].map(({ texto, autor, plaza, años }) => (
              <div key={autor} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 16, padding: "32px 28px", position: "relative" }}>
                <div style={{ fontSize: 40, color: "#1A5C33", lineHeight: 1, marginBottom: 16, fontFamily: "Georgia, serif" }}>&ldquo;</div>
                <p style={{ margin: "0 0 24px", fontSize: 16, color: "#374151", lineHeight: 1.7, fontStyle: "italic" }}>{texto}</p>
                <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>{autor}</div>
                  <div style={{ fontSize: 12, color: "#1A5C33", fontWeight: 600, marginTop: 2 }}>{plaza}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>{años}</div>
                </div>
                <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 2 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>}

      {/* ══ LEGITIMIDAD ══ */}
      <section id="inversion" style={{ background: "#f9fafb", padding: "96px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 24, height: 3, background: "#9B1C1C" }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: "#9B1C1C", letterSpacing: "0.3em", textTransform: "uppercase" }}>Experiencia operativa · Torreón, Coahuila</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#111", textTransform: "uppercase", lineHeight: 1.1 }}>
                <span style={{ color: "#1A5C33" }}>Infraestructura en operación</span>
              </h2>
              <p style={{ margin: "20px 0", fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
                Los centros Mercahorro reúnen comerciantes y distribuidores en espacios especializados para el abasto de alimentos.
              </p>
              <p style={{ margin: "0 0 32px", fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
                Grupo Mercahorro integra desarrollo inmobiliario, comercialización, administración y operación. La experiencia de nuestros centros orienta el desarrollo de nuevos proyectos.
              </p>
              <a href="https://mercacapital.com" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", background: "#9B1C1C", color: "#fff", fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", borderRadius: 8, textDecoration: "none" }}>
                Conoce Merca Capital →
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ background: "#1A5C33", borderRadius: 16, overflow: "hidden", aspectRatio: "1 / 1" }}>
                <img src="/images/mercahorro-torreon-aerea.jpg" alt="Vista aérea Mercahorro Torreón"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={e => { e.currentTarget.style.display = "none"; }} />
              </div>
              <div style={{ position: "absolute", bottom: 16, left: 16, background: "#fff", border: "1px solid #d1d5db", borderRadius: 10, padding: "12px 18px", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#1A5C33", letterSpacing: "0.15em", textTransform: "uppercase" }}>Mercahorro Torreón</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2, fontFamily: "monospace" }}>25.5479° N, 103.4068° W</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ECOSISTEMA ══ */}
      <section style={{ background: "#fff", padding: "96px 24px", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 24, height: 3, background: "#1A5C33" }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: "#1A5C33", letterSpacing: "0.3em", textTransform: "uppercase" }}>Funciones y relaciones institucionales</span>
              <div style={{ width: 24, height: 3, background: "#1A5C33" }} />
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "#111", textTransform: "uppercase" }}>
              El <span style={{ color: "#1A5C33" }}>Ecosistema</span>
            </h2>
            <p style={{ margin: "12px auto 0", fontSize: 15, color: "#6b7280", maxWidth: 520, lineHeight: 1.6 }}>
              Grupo Mercahorro desarrolla y opera los centros Mercahorro. Merca Capital estructura vehículos de inversión y canaliza capital. La participación institucional en el sector de abasto tiene un ámbito distinto.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { key: "mercahorro", img: "/images/logo-mercahorro.png",    title: "Grupo Mercahorro", accent: "#1A5C33", link: null, linkLabel: null,                      desc: "Desarrollador y operador de centros especializados en distribución y abasto de alimentos. Integra diseño, construcción, comercialización, venta, renta, administración y operación.", maxH: 70 },
              { key: "mexico",     img: "/images/logo-merca-mexico.png",  title: "Merca México",     accent: "#3D1C02", link: "https://mercamexico.mx",  linkLabel: "mercamexico.mx →",  desc: "Consulta información sobre Merca México y su actividad en el sector de abasto.", maxH: 75 },
              { key: "capital",    img: "/images/logo-merca-capital.png", title: "Merca Capital",    accent: "#9B1C1C", link: "https://mercacapital.com", linkLabel: "mercacapital.com →", desc: "Plataforma que estructura y administra vehículos privados de inversión y canaliza capital hacia proyectos inmobiliarios. El desarrollo y la operación de los centros corresponden a Grupo Mercahorro.", maxH: 75 },
            ].map(({ key, img, title, accent, link, linkLabel, desc, maxH }) => (
              <div key={key} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px", borderTop: `4px solid ${accent}`, display: "flex", flexDirection: "column" }}>
                <div style={{ height: 90, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, background: "#fff" }}>
                  <img src={img} alt={title} style={{ maxHeight: maxH, maxWidth: "100%", width: "auto", objectFit: "contain", display: "block" }} />
                </div>
                <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: "#111" }}>{title}</h3>
                <p style={{ margin: "0 0 16px", fontSize: 14, color: "#6b7280", lineHeight: 1.7, flex: 1 }}>{desc}</p>
                {link && <a href={link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 700, color: accent, textDecoration: "none" }}>{linkLabel}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#0d1a10", borderTop: "4px solid #1A5C33" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 44px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 44 }}>
            <div>
              <div style={{ marginBottom: 18 }}>
                <img src="/images/logo-mercahorro-blanco.png" alt="Grupo Mercahorro"
                  style={{ height: 56, width: "auto", display: "block", objectFit: "contain" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "block"; }} />
                <div style={{ display: "none", fontWeight: 900, fontSize: 16, color: "#fff", textTransform: "uppercase" }}>Grupo Mercahorro</div>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>
                Desarrollamos, comercializamos, administramos y operamos infraestructura comercial especializada en abasto de alimentos.
              </p>
              <a href="https://mercacapital.com" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: "#6b7280", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 2, display: "inline-block" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
              >Inversionistas Institucionales y Patrimoniales →</a>
            </div>
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.25em", textTransform: "uppercase" }}>Centros y proyectos</p>
              {[{ c: "Torreón", e: "En operación" }, { c: "Monterrey", e: "En operación" }, { c: "Gómez Palacio", e: "En desarrollo" }, { c: "Silao", e: "En desarrollo" }].map(({ c, e }) => (
                <div key={c} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6" }}>{c}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{e}</div>
                </div>
              ))}
            </div>
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.25em", textTransform: "uppercase" }}>Ecosistema</p>
              {[
                { label: "Merca México",  sub: "Sector de abasto",        href: "https://mercamexico.mx" },
                { label: "Merca Capital", sub: "Plataforma de inversión",  href: "https://mercacapital.com" },
                { label: "Mercahorro",    sub: "Red de centros de abasto", href: "#" },
                { label: "Plaza Abastos", sub: "Marca regional",           href: "#" },
              ].map(({ label, sub, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ display: "block", marginBottom: 12, textDecoration: "none" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6" }}>{label}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{sub}</div>
                </a>
              ))}
            </div>
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.25em", textTransform: "uppercase" }}>Contacto Inmediato</p>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>Para consultas sobre renta, compra o inversión en locales comerciales.</p>
              <button onClick={scrollToForm}
                style={{ background: "#1A5C33", color: "#fff", fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Agendar Cita →
              </button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>© 2026 Grupo Mercahorro · Promotora Mercahorro S.A. de C.V. · Todos los derechos reservados.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Aviso de Privacidad", "Términos de Uso"].map(t => (
                <a key={t} href="#" style={{ fontSize: 12, color: "#6b7280", textDecoration: "none" }}>{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 640px) { .nav-desktop { display: none !important; } .nav-mobile-btn { display: block !important; } }
        @media (min-width: 641px) { .nav-mobile-btn { display: none !important; } }
        * { box-sizing: border-box; }
        .mh-form input:focus-visible,
        .mh-form select:focus-visible,
        .mh-form button:focus-visible {
          outline: 2px solid #1A5C33 !important;
          outline-offset: 2px !important;
        }

        /* ── Estadísticas: grid responsive ── */
        .mh-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .mh-stat-cell {
          border-right: 1px solid #e5e7eb;
        }
        .mh-stat-cell:last-child {
          border-right: none;
        }

        /* Tablet: 2 columnas */
        @media (max-width: 1023px) {
          .mh-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .mh-stat-cell:nth-child(2) {
            border-right: none;
          }
          .mh-stat-cell:nth-child(1),
          .mh-stat-cell:nth-child(2) {
            border-bottom: 1px solid #e5e7eb;
          }
          .mh-stat-cell:nth-child(4) {
            border-right: none;
          }
        }

        /* Móvil estrecho: 1 columna */
        @media (max-width: 479px) {
          .mh-stats-grid {
            grid-template-columns: 1fr;
          }
          .mh-stat-cell {
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }
          .mh-stat-cell:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
}
