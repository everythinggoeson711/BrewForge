import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
