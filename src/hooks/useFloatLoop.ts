import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Applies a gentle, endless bob-and-rotate drift to each `[data-float]`
 * child, with per-element timing offsets so the group never moves in sync.
 */
export const useFloatLoop = <T extends HTMLElement>() => {
  const containerRef = useRef<T>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('[data-float]');
    const ctx = gsap.context(() => {
      items.forEach((el, i) => {
        const distance = Number(el.dataset.floatDistance ?? 14);
        const rotate = Number(el.dataset.floatRotate ?? 6);
        gsap.to(el, {
          y: `+=${distance}`,
          rotate: `+=${rotate}`,
          duration: 2.6 + (i % 4) * 0.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.15,
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
};
