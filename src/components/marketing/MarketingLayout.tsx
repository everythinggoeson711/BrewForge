import { Outlet } from 'react-router-dom';
import { MarketingNav } from './MarketingNav';
import { MarketingFooter } from './MarketingFooter';

export const MarketingLayout = () => {
  return (
    <div className="marketing">
      <MarketingNav />
      <Outlet />
      <MarketingFooter />
    </div>
  );
};
