import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Reveals matching children with a fade/slide stagger once the container
 * scrolls into view. Falls back to an immediate mount animation for
 * containers already on screen (e.g. above-the-fold widgets).
 */
export const useStaggerReveal = <T extends HTMLElement>(itemSelector: string, deps: unknown[] = []) => {
  const containerRef = useRef<T>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
};
