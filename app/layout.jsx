import "./globals.css";

export const metadata = {
  title: "Grupo Mercahorro — Infraestructura de Abasto",
  description:
    "19 años construyendo infraestructura agroalimentaria en el norte de México. Más de 300 propiedades comerciales en operación en Torreón, Gómez Palacio y Monterrey.",
  keywords: "mercahorro, mercado mayorista, infraestructura de abasto, plaza abastos, torreón, monterrey, inversión inmobiliaria",
  openGraph: {
    title: "Grupo Mercahorro — Construimos el Abasto",
    description: "El desarrollador de infraestructura mayorista más consolidado del norte de México.",
    url: "https://mercahorro.com",
    siteName: "Grupo Mercahorro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Grupo Mercahorro — Vista aérea del clúster comercial",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Mercahorro",
    description: "Infraestructura de abasto mayorista. Norte de México.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body>
        {/* Cursor personalizado — solo desktop */}
        <div className="cursor-dot" id="cursor-dot" />
        <div className="cursor-ring" id="cursor-ring" />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const dot = document.getElementById('cursor-dot');
                const ring = document.getElementById('cursor-ring');
                if (!dot || !ring) return;

                // Z-index por encima de cualquier modal (9999)
                dot.style.zIndex = '10001';
                ring.style.zIndex = '10000';

                let mouseX = 0, mouseY = 0;
                let ringX = 0, ringY = 0;

                // Tracking del cursor — siempre activo
                document.addEventListener('mousemove', (e) => {
                  mouseX = e.clientX;
                  mouseY = e.clientY;
                  dot.style.left = mouseX + 'px';
                  dot.style.top = mouseY + 'px';
                }, { passive: true });

                // Animación del anillo
                function animateRing() {
                  ringX += (mouseX - ringX) * 0.12;
                  ringY += (mouseY - ringY) * 0.12;
                  ring.style.left = ringX + 'px';
                  ring.style.top = ringY + 'px';
                  requestAnimationFrame(animateRing);
                }
                animateRing();

                // Event delegation — captura a, button aunque sean dinámicos (modal)
                document.addEventListener('mouseover', (e) => {
                  const target = e.target.closest('a, button, [role="button"]');
                  if (target) {
                    ring.style.width = '52px';
                    ring.style.height = '52px';
                    ring.style.borderColor = '#9B1C1C';
                  }
                }, { passive: true });

                document.addEventListener('mouseout', (e) => {
                  const target = e.target.closest('a, button, [role="button"]');
                  if (target) {
                    ring.style.width = '32px';
                    ring.style.height = '32px';
                    ring.style.borderColor = '#1A5C33';
                  }
                }, { passive: true });

                // Ocultar cursor al salir de la ventana
                document.addEventListener('mouseleave', () => {
                  dot.style.opacity = '0';
                  ring.style.opacity = '0';
                });
                document.addEventListener('mouseenter', () => {
                  dot.style.opacity = '1';
                  ring.style.opacity = '1';
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
