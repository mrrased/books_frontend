import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const PrivateRoutes = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (!user.email && !isLoading) {
    return <Navigate to="login" state={{ path: pathname }} />;
  }
  return children;
};

export default PrivateRoutes;
