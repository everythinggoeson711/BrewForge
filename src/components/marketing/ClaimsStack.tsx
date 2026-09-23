import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useFloatLoop } from '../../hooks/useFloatLoop';
import { BranchIcon, LeafIcon, ShieldCheckIcon, TimerIcon } from './icons';

const claims = [
  {
    title: 'No Guesswork',
    Icon: ShieldCheckIcon,
    copy: 'Every AI-drafted step is checked by the constraint validator against real branch equipment before it can be published.',
  },
  {
    title: 'No Stale Ingredients',
    Icon: TimerIcon,
    copy: 'Shelf-life windows are enforced rules, not a line in a slide deck someone forgot to reread this quarter.',
  },
  {
    title: 'No Wrong Machine',
    Icon: BranchIcon,
    copy: 'A branch only ever sees SOPs resolved to the dosing equipment actually installed on its floor.',
  },
  {
    title: 'No Unverified Staff',
    Icon: LeafIcon,
    copy: 'Certification is earned gate by gate, with a structured record — not a supervisor’s memory.',
  },
];

const scatterIcons = [
  { Icon: LeafIcon, style: { top: '8%', left: '6%' }, distance: 18, rotate: 12 },
  { Icon: TimerIcon, style: { top: '18%', right: '10%' }, distance: 14, rotate: -10 },
  { Icon: BranchIcon, style: { bottom: '14%', left: '10%' }, distance: 20, rotate: 8 },
  { Icon: ShieldCheckIcon, style: { bottom: '22%', right: '6%' }, distance: 16, rotate: -12 },
];

export const ClaimsStack = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scatterRef = useFloatLoop<HTMLDivElement>();

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.claim-card', stage);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: `+=${cards.length * 480}`,
          scrub: 0.6,
          pin: stage,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        tl.to(card, { yPercent: -130, rotate: i % 2 === 0 ? -10 : 10, opacity: 0, ease: 'power1.in' }, i);
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section className="claims" ref={wrapperRef}>
      <div className="claims__stage" ref={stageRef}>
        <div className="claims__scatter" ref={scatterRef}>
          {scatterIcons.map(({ Icon, style, distance, rotate }, i) => (
            <span
              className="claims__scatter-icon"
              key={i}
              data-float
              data-float-distance={distance}
              data-float-rotate={rotate}
              style={style}
            >
              <Icon />
            </span>
          ))}
        </div>

        <h2 className="claims__heading">What BrewForge Refuses To Ship</h2>

        <div className="claims__deck">
          {claims.map((claim, i) => (
            <article
              className="claim-card"
              key={claim.title}
              style={{
                zIndex: claims.length - i,
                transform: `rotate(${i % 2 === 0 ? -3 : 3}deg) translateY(${i * 10}px)`,
              }}
            >
              <div className="claim-card__bar">
                <span>&bull;</span>
                <span>{claim.title.toUpperCase()}</span>
                <span>&bull;</span>
              </div>
              <div className="claim-card__body">
                <claim.Icon className="claim-card__icon" />
                <p className="claim-card__copy">{claim.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
