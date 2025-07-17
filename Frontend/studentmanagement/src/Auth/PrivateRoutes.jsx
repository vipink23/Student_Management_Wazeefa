import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  console.log();
  

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default PrivateRoute