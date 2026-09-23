import { useState } from 'react';
import { useFloatLoop } from '../../hooks/useFloatLoop';
import { useStaggerReveal } from '../../hooks/useStaggerReveal';
import { CupIcon, LeafIcon, ShieldCheckIcon, ThermometerIcon, TimerIcon } from './icons';

export interface ShowcaseItem {
  index: string;
  name: string;
  tagline: string;
  copy: string;
}

const items: ShowcaseItem[] = [
  {
    index: '01',
    name: 'Structured Recipe Model',
    tagline: 'Every Formula. One Source Of Truth.',
    copy: 'Ingredients, dosing equipment, ordering rules and shelf-life windows live as one versioned constraint base.',
  },
  {
    index: '02',
    name: 'AI-Assisted Drafting',
    tagline: 'Fluent Drafts. Validator Approved.',
    copy: 'An LLM proposes preparation steps; a constraint validator checks each one before a human accepts it.',
  },
  {
    index: '03',
    name: 'Branch-Aware Training',
    tagline: 'Resolved To Real Equipment.',
    copy: 'Trainees see SOPs matched to their store’s actual machines and certify per capability gate.',
  },
  {
    index: '04',
    name: 'Change Propagation',
    tagline: 'Nothing Goes Stale Quietly.',
    copy: 'A recipe or equipment change recomputes which branch SOPs and certified staff are now out of date.',
  },
];

const floatIcons = [
  { Icon: LeafIcon, style: { top: '6%', left: '10%' }, distance: 16, rotate: 10 },
  { Icon: TimerIcon, style: { top: '14%', right: '8%' }, distance: 20, rotate: -8 },
  { Icon: ThermometerIcon, style: { bottom: '18%', left: '4%' }, distance: 14, rotate: 6 },
  { Icon: ShieldCheckIcon, style: { bottom: '8%', right: '12%' }, distance: 18, rotate: -10 },
];

export const ProductShowcase = () => {
  const [active, setActive] = useState(0);
  const floatRef = useFloatLoop<HTMLDivElement>();
  const headingRef = useStaggerReveal<HTMLDivElement>('.showcase__bleed-heading');

  const current = items[active];

  const goTo = (delta: number) => {
    setActive((prev) => (prev + delta + items.length) % items.length);
  };

  return (
    <section id="pillars" className="showcase">
      <div className="showcase__bleed" ref={headingRef}>
        <h2 className="showcase__bleed-heading">
          Every Other
          <br />
          SOP Feels Outdated
        </h2>
      </div>

      <div className="showcase__stage" ref={floatRef}>
        <div className="showcase__orb">
          <CupIcon className="showcase__orb-icon" />
        </div>
        {floatIcons.map(({ Icon, style, distance, rotate }, i) => (
          <span
            className="showcase__float"
            key={i}
            data-float
            data-float-distance={distance}
            data-float-rotate={rotate}
            style={style}
          >
            <Icon className="showcase__float-icon" />
          </span>
        ))}
      </div>

      <div className="showcase__bar">
        <span className="showcase__bar-label">PILLAR N&deg;{current.index}</span>
        <span className="showcase__bar-line" />
        <span className="showcase__bar-label showcase__bar-label--right">{current.name}</span>
      </div>

      <div className="showcase__controls">
        <button type="button" className="showcase__arrow" onClick={() => goTo(-1)} aria-label="Previous pillar">
          &#8592;
        </button>
        <div className="showcase__copy">
          <h3 className="showcase__tagline">{current.tagline}</h3>
          <p className="showcase__description">{current.copy}</p>
        </div>
        <button type="button" className="showcase__arrow" onClick={() => goTo(1)} aria-label="Next pillar">
          &#8594;
        </button>
      </div>

      <div className="showcase__dots">
        {items.map((item, i) => (
          <button
            key={item.index}
            type="button"
            className={`showcase__dot${i === active ? ' showcase__dot--active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Go to ${item.name}`}
          />
        ))}
      </div>
    </section>
  );
};
