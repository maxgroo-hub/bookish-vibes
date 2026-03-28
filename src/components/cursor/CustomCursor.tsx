import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    document.documentElement.classList.add('custom-cursor-active');

    const mouse = { x: 0, y: 0 };
    const outerPos = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }

      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]');
      if (outerRef.current) {
        if (interactive) {
          outerRef.current.style.width = '48px';
          outerRef.current.style.height = '48px';
          outerRef.current.style.backgroundColor = 'hsl(50, 100%, 50%)';
          outerRef.current.style.opacity = '0.6';
        } else {
          outerRef.current.style.width = '32px';
          outerRef.current.style.height = '32px';
          outerRef.current.style.backgroundColor = 'transparent';
          outerRef.current.style.opacity = '1';
        }
      }
    };

    const onDown = () => {
      if (innerRef.current) {
        innerRef.current.style.width = '16px';
        innerRef.current.style.height = '16px';
      }
    };

    const onUp = () => {
      if (innerRef.current) {
        innerRef.current.style.width = '8px';
        innerRef.current.style.height = '8px';
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    let raf: number;
    const lerp = () => {
      outerPos.x += (mouse.x - outerPos.x) * 0.15;
      outerPos.y += (mouse.y - outerPos.y) * 0.15;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.x}px, ${outerPos.y}px)`;
      }
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="fixed pointer-events-none z-[9999] rounded-full border-2 border-foreground transition-[width,height,background-color,opacity] duration-150"
        style={{
          width: 32,
          height: 32,
          top: 0,
          left: 0,
          marginLeft: '-16px',
          marginTop: '-16px',
          willChange: 'transform',
        }}
      />
      <div
        ref={innerRef}
        className="fixed pointer-events-none z-[9999] rounded-full bg-foreground transition-[width,height] duration-100"
        style={{
          width: 8,
          height: 8,
          top: 0,
          left: 0,
          marginLeft: '-4px',
          marginTop: '-4px',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
