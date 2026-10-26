// BORRADOR — pendiente de revisión del área jurídica antes de considerarse definitivo.
// Confirmar: razón social del responsable, domicilio y correo para solicitudes ARCO.

import Link from "next/link";

export const metadata = {
  title: "Aviso de Privacidad | Grupo Mercahorro",
  description: "Aviso de privacidad de Grupo Mercahorro para los datos recabados en grupomercahorro.com.",
  alternates: { canonical: "https://grupomercahorro.com/aviso-de-privacidad" },
};

const h2 = { fontSize: 18, fontWeight: 800, color: "#111", margin: "32px 0 10px" };
const p = { fontSize: 15, color: "#374151", lineHeight: 1.75, margin: "0 0 12px" };
const li = { fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 6 };

export default function AvisoDePrivacidad() {
  return (
    <main style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif", background: "#fff", minHeight: "100vh" }}>
      <div style={{ borderBottom: "2px solid #1A5C33", padding: "18px 24px" }}>
        <Link href="/" style={{ fontSize: 14, fontWeight: 700, color: "#1A5C33", textDecoration: "none" }}>← Grupo Mercahorro</Link>
      </div>
      <article style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 900, color: "#111", margin: "0 0 8px" }}>Aviso de Privacidad</h1>
        <p style={{ ...p, color: "#6b7280", fontSize: 13 }}>Última actualización: 26 de octubre de 2026</p>

        <h2 style={h2}>1. Responsable</h2>
        <p style={p}>
          Promotora Mercahorro S.A. de C.V. (&ldquo;Grupo Mercahorro&rdquo;), con domicilio en Terranova 329, oficina 306, Monterrey, Nuevo León, México,
          es responsable del tratamiento de los datos personales que nos proporcionas a través de grupomercahorro.com, de acuerdo con la
          Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su normativa aplicable.
        </p>

        <h2 style={h2}>2. Datos que recabamos</h2>
        <ul>
          <li style={li}>Nombre completo, número de teléfono o WhatsApp y, si lo proporcionas, correo electrónico.</li>
          <li style={li}>Tu interés comercial: si buscas invertir, comprar o rentar, el tipo de unidad, la plaza y un rango aproximado de presupuesto.</li>
          <li style={li}>Datos de origen de tu visita, como la campaña o anuncio desde el que llegaste.</li>
        </ul>
        <p style={p}>No solicitamos datos personales sensibles.</p>

        <h2 style={h2}>3. Para qué usamos tus datos</h2>
        <p style={p}><strong>Finalidades necesarias:</strong></p>
        <ul>
          <li style={li}>Atender tu solicitud de información sobre locales y bodegas.</li>
          <li style={li}>Contactarte por WhatsApp, teléfono o correo para darte seguimiento comercial.</li>
          <li style={li}>Agendar visitas o videollamadas con un asesor.</li>
        </ul>
        <p style={p}><strong>Finalidades adicionales:</strong></p>
        <ul>
          <li style={li}>Enviarte información sobre nuevos proyectos y disponibilidad de Grupo Mercahorro.</li>
          <li style={li}>Medir la efectividad de nuestros anuncios y mejorar nuestra comunicación.</li>
        </ul>
        <p style={p}>
          Si no deseas que usemos tus datos para las finalidades adicionales, escríbenos a contacto@mercahorro.com.mx. Esto no afectará la atención de tu solicitud.
        </p>

        <h2 style={h2}>4. Con quién compartimos tus datos</h2>
        <p style={p}>
          Para operar este sitio y dar seguimiento a tu solicitud usamos proveedores tecnológicos que tratan los datos por nuestra cuenta, como servicios de alojamiento web,
          gestión de contactos y mensajería. No vendemos tus datos ni los transferimos a terceros para fines distintos a los descritos en este aviso, salvo en los casos
          que la ley permita o exija.
        </p>

        <h2 style={h2}>5. Tus derechos (ARCO) y revocación</h2>
        <p style={p}>
          Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso, así como revocar tu consentimiento, enviando una solicitud a
          contacto@mercahorro.com.mx con tu nombre, el derecho que deseas ejercer y un medio para responderte. Te responderemos en los plazos que establece la ley.
        </p>

        <h2 style={h2}>6. Tecnologías de seguimiento</h2>
        <p style={p}>
          Este sitio registra los parámetros de campaña de la dirección web (por ejemplo, el anuncio desde el que llegaste) para saber qué medios funcionan mejor.
          Esta información se guarda solo durante tu visita en tu navegador y se envía junto con tu solicitud si llenas el formulario.
        </p>

        <h2 style={h2}>7. Cambios a este aviso</h2>
        <p style={p}>Cualquier cambio a este aviso de privacidad se publicará en esta misma página.</p>

        <h2 style={h2}>Contacto</h2>
        <p style={p}>contacto@mercahorro.com.mx · 81 2000 8031</p>
      </article>
    </main>
  );
}
