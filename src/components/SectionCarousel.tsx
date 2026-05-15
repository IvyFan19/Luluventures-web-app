import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';

interface SectionCarouselProps {
  items: ReactNode[];
  durations?: number[];
  autoPlayOnView?: boolean;
  pauseOnHover?: boolean;
  showDots?: boolean;
  showProgress?: boolean;
  isVisible?: boolean;
  className?: string;
}

export function SectionCarousel({
  items,
  durations,
  autoPlayOnView = true,
  pauseOnHover = true,
  showDots = true,
  showProgress = true,
  isVisible = false,
  className = '',
}: SectionCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const getDuration = useCallback(
    (index: number) => durations?.[index] ?? 5000,
    [durations]
  );

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex || index < 0 || index >= items.length) return;
      setExitingIndex(activeIndex);
      setActiveIndex(index);
      setTimeout(() => setExitingIndex(null), 800);
    },
    [activeIndex, items.length]
  );

  const next = useCallback(() => {
    const nextIndex = (activeIndex + 1) % items.length;
    goTo(nextIndex);
  }, [activeIndex, items.length, goTo]);

  // Progress bar animation
  const animateProgress = useCallback(() => {
    if (!progressRef.current) return;
    const elapsed = performance.now() - startTimeRef.current;
    const duration = getDuration(activeIndex);
    const pct = Math.min((elapsed / duration) * 100, 100);
    progressRef.current.style.width = `${pct}%`;
    if (pct < 100) {
      rafRef.current = requestAnimationFrame(animateProgress);
    }
  }, [activeIndex, getDuration]);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlayOnView || !isVisible || isPausedRef.current) return;

    startTimeRef.current = performance.now();
    if (showProgress) {
      rafRef.current = requestAnimationFrame(animateProgress);
    }

    timerRef.current = setTimeout(() => {
      next();
    }, getDuration(activeIndex));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, isVisible, autoPlayOnView, next, getDuration, showProgress, animateProgress]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (!pauseOnHover) return;
    isPausedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);
  };

  const handleMouseLeave = () => {
    if (!pauseOnHover) return;
    isPausedRef.current = false;
    // Restart timer for remaining duration
    startTimeRef.current = performance.now();
    if (showProgress) {
      rafRef.current = requestAnimationFrame(animateProgress);
    }
    timerRef.current = setTimeout(() => {
      next();
    }, getDuration(activeIndex));
  };

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0) {
      // Swipe left → next
      goTo((activeIndex + 1) % items.length);
    } else {
      // Swipe right → prev
      goTo((activeIndex - 1 + items.length) % items.length);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-viewport">
        {items.map((item, i) => (
          <div
            key={i}
            className={`carousel-slide ${
              i === activeIndex ? 'active' : ''
            } ${i === exitingIndex ? 'exiting' : ''}`}
            aria-hidden={i !== activeIndex}
          >
            {item}
          </div>
        ))}
      </div>

      {showDots && items.length > 1 && (
        <div className="carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {showProgress && (
        <div className="carousel-progress-track">
          <div ref={progressRef} className="carousel-progress-bar" />
        </div>
      )}
    </div>
  );
}
