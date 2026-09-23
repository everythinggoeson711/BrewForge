import { Link, NavLink } from 'react-router-dom';
import { useStaggerReveal } from '../../hooks/useStaggerReveal';

const navItems = [
  { to: '/app', label: 'Dashboard', index: '01' },
  { to: '/app/recipes', label: 'Recipes', index: '02' },
  { to: '/app/branches', label: 'Branches', index: '03' },
  { to: '/app/training', label: 'Training', index: '04' },
  { to: '/app/certifications', label: 'Certifications', index: '05' },
];

export const Sidebar = () => {
  const navRef = useStaggerReveal<HTMLElement>('.sidebar__link');

  return (
    <aside className="sidebar">
      <Link to="/" className="sidebar__brand">
        BREW
        <br />
        FORGE
      </Link>
      <nav className="sidebar__nav" ref={navRef}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/app'}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            <span className="sidebar__link-index">{item.index}</span>
            <span className="sidebar__link-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar__foot">Recipe &amp; Training System</div>
    </aside>
  );
};
