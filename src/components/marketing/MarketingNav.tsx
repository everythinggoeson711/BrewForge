import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const MarketingNav = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <header className="marketing-nav">
      <Link to="/" className="marketing-nav__brand">
        BREWFORGE
      </Link>
      <nav className="marketing-nav__links">
        <NavLink to="/" end className="marketing-nav__link">
          Home
        </NavLink>
        <a href="#pillars" className="marketing-nav__link">
          Product
        </a>
        <a href="#about" className="marketing-nav__link">
          About
        </a>
      </nav>
      {currentUser ? (
        <Link to="/app" className="marketing-nav__cta">
          Dashboard
        </Link>
      ) : (
        <Link to="/login" className="marketing-nav__cta">
          Sign In
        </Link>
      )}
    </header>
  );
};
