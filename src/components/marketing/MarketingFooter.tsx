export const MarketingFooter = () => {
  return (
    <footer className="marketing-footer">
      <div className="marketing-footer__brand">BREWFORGE</div>
      <div className="marketing-footer__meta">
        <span>Beverage Preparation Training &amp; Recipe Standardization System</span>
        <span>&copy; {new Date().getFullYear()} BrewForge Capstone Project</span>
      </div>
    </footer>
  );
};
