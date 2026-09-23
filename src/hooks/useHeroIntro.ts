import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Plays a one-time entrance timeline for direct children carrying
 * `data-hero-item`, staggered top to bottom, on mount.
 */
export const useHeroIntro = <T extends HTMLElement>() => {
  const containerRef = useRef<T>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('[data-hero-item]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1 },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
};
