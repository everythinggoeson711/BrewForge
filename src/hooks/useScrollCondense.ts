import { useLayoutEffect, useRef } from 'react';
import { ScrollTrigger } from '../lib/gsap';

/**
 * Toggles `condensed` on the element once the page scrolls past a small
 * threshold, letting the nav tighten up as the user reads on.
 */
export const useScrollCondense = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      start: 40,
      onUpdate: (self) => {
        element.classList.toggle('condensed', self.scroll() > 40);
      },
    });

    return () => trigger.kill();
  }, []);

  return elementRef;
};
