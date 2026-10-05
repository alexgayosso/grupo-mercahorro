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

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
