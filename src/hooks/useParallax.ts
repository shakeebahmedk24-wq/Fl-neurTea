import { useEffect, useState } from 'react';

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user's OS reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial scroll position
    setScrollY(window.scrollY || window.pageYOffset);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * Get CSS transform value for given speed factor
   * @param speed Speed multiplier (e.g., 0.15 for background, 0.35 for middle, 0.6 for foreground)
   * @param maxOffset Optional clamp limit in pixels
   */
  const getTransform = (speed: number, maxOffset = 300) => {
    if (prefersReducedMotion) return 'none';
    const offset = Math.min(Math.max(scrollY * speed, -maxOffset), maxOffset);
    return `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  };

  return { scrollY, prefersReducedMotion, getTransform };
}
