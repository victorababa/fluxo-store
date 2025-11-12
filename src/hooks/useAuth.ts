import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  login as loginAction, 
  register as registerAction, 
  logout as logoutAction, 
  forgotPassword as forgotPasswordAction, 
  selectCurrentUser, 
  selectIsAuthenticated, 
  selectAuthError, 
  selectAuthLoading,
  clearError as clearErrorAction
} from '../store/slices/authSlice';
import type { AppDispatch } from '../store';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  // Limpar erros quando o local mudar
  useEffect(() => {
    return () => {
      if (error) {
        dispatch(clearErrorAction());
      }
    };
  }, [dispatch, error, location.pathname]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      await dispatch(loginAction({ email, password })).unwrap();
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  }, [dispatch, navigate, location.state]);

  const register = useCallback(async (userData: { name: string; email: string; password: string }) => {
    try {
      await dispatch(registerAction(userData)).unwrap();
      navigate('/cadastro/sucesso', { replace: true });
      return true;
    } catch (err) {
      console.error('Registration failed:', err);
      throw err;
    }
  }, [dispatch, navigate]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await dispatch(forgotPasswordAction(email)).unwrap();
      return true;
    } catch (err) {
      console.error('Password reset failed:', err);
      throw err;
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    error,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
  };
};

export default useAuth;
