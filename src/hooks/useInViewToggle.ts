import { useEffect, useRef, useState } from 'react';

/**
 * Like useInView but tracks both enter AND leave.
 * Useful for starting/pausing auto-play when a section scrolls in/out of view.
 */
export function useInViewToggle(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
