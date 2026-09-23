import { Link } from 'react-router-dom';
import { useStaggerReveal } from '../../hooks/useStaggerReveal';
import { useHeroIntro } from '../../hooks/useHeroIntro';
import { useCountUp } from '../../hooks/useCountUp';
import { ProductShowcase } from '../../components/marketing/ProductShowcase';
import { ClaimsStack } from '../../components/marketing/ClaimsStack';

const marqueeWords = [
  'SPECIALTY TEA',
  'SPECIALTY COFFEE',
  'MULTI-BRANCH',
  'VALIDATED SOP',
  'SAFE POUR',
  'ZERO GUESSWORK',
];

const statBlocks = [
  { countTo: '5s', label: 'Validator Response Target' },
  { countTo: '4', label: 'Capability Gates Per Drink' },
  { countTo: '100%', label: 'SOPs Version-Locked' },
];

export const HomePage = () => {
  const heroRef = useHeroIntro<HTMLElement>();
  const aboutRef = useStaggerReveal<HTMLElement>('[data-reveal]');
  const statsRef = useCountUp<HTMLDivElement>();
  const ctaRef = useStaggerReveal<HTMLElement>('[data-reveal]');

  return (
    <main className="marketing-home">
      <section className="hero" ref={heroRef}>
        <p className="hero__eyebrow" data-hero-item>
          Capstone Project &middot; BrewForge
        </p>
        <h1 className="hero__title" data-hero-item>
          Every Pour.
          <br />
          Standardized.
        </h1>
        <p className="hero__subtitle" data-hero-item>
          A structured, validated recipe and training platform for multi-branch specialty tea and coffee
          chains &mdash; so a drink is safe and consistent no matter which branch makes it.
        </p>
        <div className="hero__actions" data-hero-item>
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

      <ProductShowcase />

      <section id="about" className="about" ref={aboutRef}>
        <h2 className="section-heading" data-reveal>
          The Problem With Slide-Deck SOPs
        </h2>
        <p className="about__copy" data-reveal>
          Today a chain&apos;s formulas live in slide decks: photographed machines, highlighted warnings,
          and bullet-point rules a trainer must manually reconcile against whatever equipment a given
          branch actually has installed. Nothing checks a new formula against existing rules before it
          reaches the floor.
        </p>
      </section>

      <ClaimsStack />

      <section className="stats">
        <div className="stats__grid" ref={statsRef}>
          {statBlocks.map((stat) => (
            <div className="stat-block" key={stat.label}>
              <div className="stat-block__value" data-count-to={stat.countTo}>
                0
              </div>
              <div className="stat-block__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta" ref={ctaRef}>
        <h2 className="cta__title" data-reveal>
          Ready to Standardize
          <br />
          Your Bar?
        </h2>
        <Link to="/login" className="btn btn--solid" data-reveal>
          Sign In to BrewForge
        </Link>
      </section>
    </main>
  );
};
