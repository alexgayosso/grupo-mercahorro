"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const rafRef  = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Z-index por encima de cualquier modal
    dot.style.zIndex  = "10001";
    ring.style.zIndex = "10000";

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    // Tracking del cursor — siempre activo
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";
    };

    // Animación del anillo
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top  = ringY + "px";
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    // Event delegation — captura a, button aunque sean dinámicos (modal)
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        ring.style.width       = "52px";
        ring.style.height      = "52px";
        ring.style.borderColor = "#9B1C1C";
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        ring.style.width       = "32px";
        ring.style.height      = "32px";
        ring.style.borderColor = "#1A5C33";
      }
    };

    // Ocultar cursor al salir de la ventana
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const onEnter = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseover",  onOver,  { passive: true });
    document.addEventListener("mouseout",   onOut,   { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
