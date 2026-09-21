import { Link } from 'react-router-dom';
import { useStaggerReveal } from '../../hooks/useStaggerReveal';

const pillars = [
  {
    index: '01',
    title: 'Structured Recipe & Equipment Model',
    copy: 'Ingredients, per-branch dosing equipment, ordering rules and shelf-life windows as one versioned constraint base.',
  },
  {
    index: '02',
    title: 'AI-Assisted SOP Drafting',
    copy: 'R&D drafts a formula, an LLM proposes steps, a validator checks every step before a human accepts it.',
  },
  {
    index: '03',
    title: 'Branch-Aware Training',
    copy: 'Trainees get SOPs resolved to their store’s real equipment and earn certification per capability gate.',
  },
  {
    index: '04',
    title: 'Change Propagation & Audit',
    copy: 'A recipe or equipment change recomputes which branch SOPs and certified staff are now out of date.',
  },
];

const marqueeWords = [
  'SPECIALTY TEA',
  'SPECIALTY COFFEE',
  'MULTI-BRANCH',
  'VALIDATED SOP',
  'SAFE POUR',
  'ZERO GUESSWORK',
];

export const HomePage = () => {
  const pillarsRef = useStaggerReveal<HTMLDivElement>('.pillar-card');
  const statsRef = useStaggerReveal<HTMLDivElement>('.stat-block');

  return (
    <main className="marketing-home">
      <section className="hero">
        <p className="hero__eyebrow">Capstone Project &middot; BrewForge</p>
        <h1 className="hero__title">
          Every Pour.
          <br />
          Standardized.
        </h1>
        <p className="hero__subtitle">
          A structured, validated recipe and training platform for multi-branch specialty tea and coffee
          chains &mdash; so a drink is safe and consistent no matter which branch makes it.
        </p>
        <div className="hero__actions">
          <Link to="/login" className="btn btn--solid">
            Sign In
          </Link>
          <a href="#pillars" className="btn btn--outline">
            See How It Works
          </a>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee__track">
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span className="marquee__item" key={`${word}-${i}`}>
              {word}
            </span>
          ))}
        </div>
      </div>

      <section id="about" className="about">
        <h2 className="section-heading">The Problem With Slide-Deck SOPs</h2>
        <p className="about__copy">
          Today a chain&apos;s formulas live in slide decks: photographed machines, highlighted warnings,
          and bullet-point rules a trainer must manually reconcile against whatever equipment a given
          branch actually has installed. Nothing checks a new formula against existing rules before it
          reaches the floor.
        </p>
      </section>

      <section id="pillars" className="pillars">
        <h2 className="section-heading">Four Pillars</h2>
        <div className="pillars__grid" ref={pillarsRef}>
          {pillars.map((pillar) => (
            <div className="pillar-card" key={pillar.index}>
              <span className="pillar-card__index">{pillar.index}</span>
              <h3 className="pillar-card__title">{pillar.title}</h3>
              <p className="pillar-card__copy">{pillar.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="stats__grid" ref={statsRef}>
          <div className="stat-block">
            <div className="stat-block__value">5s</div>
            <div className="stat-block__label">Validator Response Target</div>
          </div>
          <div className="stat-block">
            <div className="stat-block__value">4</div>
            <div className="stat-block__label">Capability Gates Per Drink</div>
          </div>
          <div className="stat-block">
            <div className="stat-block__value">100%</div>
            <div className="stat-block__label">SOPs Version-Locked</div>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2 className="cta__title">
          Ready to Standardize
          <br />
          Your Bar?
        </h2>
        <Link to="/login" className="btn btn--solid">
          Sign In to BrewForge
        </Link>
      </section>
    </main>
  );
};
