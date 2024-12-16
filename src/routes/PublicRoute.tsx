import {PropsWithChildren, useContext, useEffect} from 'react';
import {AuthContext} from '../contexts/AuthContext.tsx';
import {useNavigate} from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;

export default function PublicRoute({ children }: ProtectedRouteProps) {
  const {isLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', {replace: true});
    }
  }, [isLoggedIn, navigate]);
  return children;
}