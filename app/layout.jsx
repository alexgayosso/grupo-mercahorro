import "./globals.css";
import CustomCursor from "./components/CustomCursor";

export const metadata = {
  metadataBase: new URL("https://grupomercahorro.com"),
  title: "Grupo Mercahorro | Desarrollo y operación de centros de abasto",
  description:
    "Grupo Mercahorro diseña, desarrolla, construye, comercializa, administra y opera centros especializados en distribución y abasto de alimentos en México.",
  alternates: {
    canonical: "https://grupomercahorro.com/",
  },
  openGraph: {
    title: "Grupo Mercahorro | Desarrollo y operación de centros de abasto",
    description:
      "Grupo Mercahorro diseña, desarrolla, construye, comercializa, administra y opera centros especializados en distribución y abasto de alimentos en México.",
    url: "https://grupomercahorro.com/",
    siteName: "Grupo Mercahorro",
    images: [
      {
        url: "/images/mercahorro-torreon-aerea.jpg",
        alt: "Vista aérea Mercahorro Torreón",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Mercahorro | Desarrollo y operación de centros de abasto",
    description:
      "Grupo Mercahorro diseña, desarrolla, construye, comercializa, administra y opera centros especializados en distribución y abasto de alimentos en México.",
    images: ["/images/mercahorro-torreon-aerea.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Guarda los UTM de la URL de llegada ANTES de que Next.js hidrate la página,
// porque en producción la URL pierde los parámetros al cargar.
const CAPTURA_ORIGEN = `(function(){try{var p=new URLSearchParams(location.search);var k=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","fbclid"];var o={};k.forEach(function(x){var v=p.get(x);if(v)o[x]=v.slice(0,200)});if(Object.keys(o).length){sessionStorage.setItem("mh_origen",JSON.stringify(o));sessionStorage.setItem("mh_landing",location.href.slice(0,200))}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <head>
        <script dangerouslySetInnerHTML={{ __html: CAPTURA_ORIGEN }} />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
