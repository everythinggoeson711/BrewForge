import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Animates each `[data-count-to]` element's text from 0 up to its target
 * number once the container scrolls into view, preserving any non-numeric
 * suffix (e.g. "5s", "100%").
 */
export const useCountUp = <T extends HTMLElement>(deps: unknown[] = []) => {
  const containerRef = useRef<T>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>('[data-count-to]');
    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const raw = el.dataset.countTo ?? '0';
        const match = raw.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
        if (!match) return;
        const target = Number(match[1]);
        const suffix = match[2];
        const counter = { value: 0 };

        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          },
        });
      });
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
};
