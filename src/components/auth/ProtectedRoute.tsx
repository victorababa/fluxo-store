import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Verificar autenticação de forma síncrona
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    const isAuth = !!token;
    setIsAuthenticated(isAuth);
    
    // Verificar se o usuário é admin se necessário
    if (requireAdmin && userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role !== 'admin') {
          // Redirecionar para a página inicial se não for admin
          navigate('/', { replace: true });
          return;
        }
      } catch (error) {
        console.error('Erro ao analisar dados do usuário:', error);
      }
    }
    
    setIsLoading(false);
    
    // Redirecionar se não estiver autenticado
    if (!isAuth) {
      navigate(redirectTo, {
        state: { from: location },
        replace: true
      });
    }
  }, [location, navigate, redirectTo, requireAdmin]);

  // Se estiver carregando, mostra um loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Se não estiver autenticado, não renderiza nada (o redirecionamento já foi tratado no useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Se estiver tudo certo, renderiza os children
  return <>{children}</>;
};

export default ProtectedRoute;
