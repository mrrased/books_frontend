import { useAppSelector } from '@/redux/hooks';
import { ReactNode, useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const PrivateRoutes = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.reducer.user);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // When the user data is available (user.email exists), set isUserDataLoaded to true
    setTimeout(() => {
      setIsUserDataLoaded(true);
    }, 1500);
  }, [user]);

  if (!isUserDataLoaded || isLoading) {
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
  if (!user.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoutes;
