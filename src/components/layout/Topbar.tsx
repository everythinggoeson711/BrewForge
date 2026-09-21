import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

export const Topbar = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="topbar">
      <div className="topbar__title">Beverage Preparation Training &amp; Recipe Standardization</div>
      <div className="topbar__user">
        <div className="topbar__user-info">
          <span className="topbar__user-name">{currentUser?.name ?? 'Guest'}</span>
          <span className="topbar__user-role">{currentUser?.role ?? 'unknown'}</span>
        </div>
        <button type="button" className="topbar__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};
