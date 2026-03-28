import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export interface DomeItem {
  title: string;
  author: string;
  genre: string;
  rating: number;
  color: string;
  days: number;
  imageUrl: string;
}

const ITEM_CONFIGS = [
  { phi: 0,   theta: -22 },
  { phi: 120, theta: -22 },
  { phi: 240, theta: -22 },
  { phi: 60,  theta:  22 },
  { phi: 180, theta:  22 },
  { phi: 300, theta:  22 },
];

interface HoverCard {
  item: DomeItem;
  x: number;
  y: number;
}

interface DomeGalleryProps {
  items: DomeItem[];
  radius?: number;
  dragDampening?: number;
  grayscale?: boolean;
}

export function DomeGallery({
  items,
  radius = 360,
  dragDampening = 2,
  grayscale = true,
}: DomeGalleryProps) {
  const [rotY, setRotY] = useState(0);
  const [hoverCard, setHoverCard] = useState<HoverCard | null>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const rotYRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    let running = true;
    const loop = () => {
      if (!isDragging.current) {
        velocityRef.current *= 0.96;
        rotYRef.current += velocityRef.current + 0.12;
        setRotY(rotYRef.current);
      }
      if (running) rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    velocityRef.current = 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    rotYRef.current += dx / dragDampening;
    velocityRef.current = dx / dragDampening;
    setRotY(rotYRef.current);
    lastX.current = e.clientX;
  }, [dragDampening]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    lastX.current = e.touches[0].clientX;
    velocityRef.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastX.current;
    rotYRef.current += dx / dragDampening;
    velocityRef.current = dx / dragDampening;
    setRotY(rotYRef.current);
    lastX.current = e.touches[0].clientX;
  }, [dragDampening]);

  return (
    <div
      className="relative w-full h-[480px] cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: "900px" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => { onMouseUp(); setHoverCard(null); }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      <div
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d", transform: `rotateY(${rotY}deg)` }}
      >
        {items.map((item, i) => {
          const { phi, theta } = ITEM_CONFIGS[i] ?? { phi: 0, theta: 0 };
          const isHovered = hoverCard?.item.title === item.title;

          return (
            <div
              key={item.title}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "150px",
                height: "195px",
                marginTop: "-97px",
                marginLeft: "-75px",
                transformStyle: "preserve-3d",
                transform: `rotateY(${phi}deg) rotateX(${theta}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
                transition: "filter 0.35s ease, transform 0.2s ease",
                filter: grayscale && !isHovered ? "grayscale(100%) brightness(0.85)" : "grayscale(0%) brightness(1)",
                zIndex: isHovered ? 20 : 1,
              }}
              onMouseEnter={(e) => {
                if (isDragging.current) return;
                setHoverCard({ item, x: e.clientX, y: e.clientY });
              }}
              onMouseMove={(e) => {
                if (isDragging.current) { setHoverCard(null); return; }
                setHoverCard({ item, x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoverCard(null)}
            >
              <div
                className={`${item.color} w-full h-full brutal-border rounded-lg overflow-hidden relative cursor-pointer`}
                style={{ boxShadow: isHovered ? "0 20px 60px rgba(0,0,0,0.4)" : "none", transition: "box-shadow 0.3s" }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3">
                  <p className="text-white font-heading font-black text-[11px] leading-tight line-clamp-2">{item.title}</p>
                  <p className="text-white/70 font-body text-[10px] mt-0.5">{item.genre}</p>
                </div>
                <span className="absolute top-2 left-2 bg-foreground text-background font-heading font-black text-[9px] px-1.5 py-0.5 rounded inline-flex items-center gap-0.5">
                  <Sparkles className="w-2 h-2" /> New
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hover card — fixed in screen space, follows cursor */}
      <AnimatePresence>
        {hoverCard && (
          <motion.div
            key={hoverCard.item.title}
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="brutal-card rounded-lg overflow-hidden bg-background shadow-2xl pointer-events-none"
            style={{
              position: "fixed",
              left: hoverCard.x + 18,
              top: hoverCard.y - 220,
              width: "220px",
              zIndex: 9999,
            }}
          >
            <div className={`${hoverCard.item.color} h-28 relative`}>
              <span className="absolute top-2 left-2 bg-foreground text-background font-heading font-black text-[10px] px-2 py-0.5 rounded inline-flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Just Dropped
              </span>
              <span className="text-[10px] font-heading font-bold opacity-70 absolute top-2 right-2">
                {hoverCard.item.days}d ago
              </span>
              <BookOpen className="w-8 h-8 opacity-20 absolute bottom-3 right-3" />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-wider">
                  {hoverCard.item.genre}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] font-heading font-bold">
                  <Star className="w-3 h-3 fill-current text-yellow-500" /> {hoverCard.item.rating}
                </span>
              </div>
              <h3 className="font-heading font-black text-sm leading-tight mb-0.5">{hoverCard.item.title}</h3>
              <p className="text-xs text-muted-foreground font-body mb-3">{hoverCard.item.author}</p>
              <Link
                to="/dashboard/books"
                className="brutal-btn bg-foreground text-background rounded-md font-heading text-xs w-full inline-flex items-center justify-center gap-1 pointer-events-auto"
              >
                Borrow Now <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag hint */}
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-body opacity-60 select-none pointer-events-none">
        drag to rotate · hover to preview
      </p>
    </div>
  );
}
