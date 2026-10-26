// Recibe los contactos del formulario y los guarda ANTES de abrir WhatsApp.
// Destinos (se configuran en Vercel → Settings → Environment Variables; nunca en el código,
// porque el repositorio es público):
//   GHL_WEBHOOK_URL     → webhook de entrada de un workflow de GoHighLevel
//   FORMSPREE_ENDPOINT  → respaldo, p. ej. https://formspree.io/f/xxxxxxx
// Si los dos están configurados, el contacto se envía a ambos.

const MAX_LEN = 200;

const clean = (v) => (typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "");

const CAMPOS = [
  "nombre", "telefono", "email", "objetivo", "producto", "proyecto", "presupuesto",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
  "gclid", "fbclid", "pagina", "referer",
];

async function enviar(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "json" }, { status: 400 });
  }

  // Campo trampa para bots: un humano nunca lo llena.
  if (clean(body.empresa_web)) return Response.json({ ok: true });

  const data = Object.fromEntries(CAMPOS.map((k) => [k, clean(body[k])]));
  data.telefono = data.telefono.replace(/\D/g, "").slice(-10);

  if (!data.nombre || data.telefono.length !== 10 || !data.objetivo) {
    return Response.json({ ok: false, error: "datos" }, { status: 422 });
  }
  if (body.consentimiento !== true) {
    return Response.json({ ok: false, error: "consentimiento" }, { status: 422 });
  }

  const lead = {
    ...data,
    telefono_e164: `+52${data.telefono}`,
    consentimiento_privacidad: "sí",
    origen: "grupomercahorro.com",
    fecha: new Date().toISOString(),
  };

  const destinos = [process.env.GHL_WEBHOOK_URL, process.env.FORMSPREE_ENDPOINT].filter(Boolean);
  if (destinos.length === 0) {
    console.error("[lead] Sin destino configurado: GHL_WEBHOOK_URL / FORMSPREE_ENDPOINT");
    return Response.json({ ok: false, error: "sin_destino" }, { status: 503 });
  }

  const resultados = await Promise.allSettled(destinos.map((url) => enviar(url, lead)));
  const guardado = resultados.some((r) => r.status === "fulfilled");
  resultados.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] Falló destino ${i + 1}:`, r.reason?.message);
  });

  return Response.json({ ok: guardado }, { status: guardado ? 200 : 502 });
}
