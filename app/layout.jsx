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

// Guarda los UTM de la URL de llegada ANTES de que Next.js hidrate la página.
// Lee tanto ?utm_... como #agenda?utm_... : el dominio redirige (307) y descarta el query,
// pero lo que va después de # sobrevive a la redirección.
const CAPTURA_ORIGEN = `(function(){try{var q=location.search;var h=location.hash||"";var k=h.indexOf("?");var base=h;if(k>-1){q=(q?q+"&":"?")+h.slice(k+1);base=h.slice(0,k)}var p=new URLSearchParams(q);var ks=["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","fbclid"];var o={};ks.forEach(function(x){var v=p.get(x);if(v)o[x]=v.slice(0,200)});if(Object.keys(o).length){sessionStorage.setItem("mh_origen",JSON.stringify(o));sessionStorage.setItem("mh_landing",location.href.slice(0,200))}if(k>-1){history.replaceState(null,"",location.pathname+location.search+base)}}catch(e){}})();`;

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
