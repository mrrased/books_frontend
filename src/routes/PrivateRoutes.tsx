import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { Puff } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const PrivateRoutes = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.reducer.user);

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoutes;
