import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import ProductsPage from './pages/products';
import { ProductDetails } from './pages/product/[id]/index';
import { Login, Register, ForgotPassword, SuccessRegister } from './pages/auth';
import VerifyEmail from './pages/auth/VerifyEmail';
import VerifyToken from './pages/auth/VerifyToken';
import { Navbar, Footer, ScrollToTop } from './components';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Componente de animação de página
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Componente para rotas públicas que redirecionam se autenticado
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar autenticação de forma síncrona
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);

    if (token) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true, state: { from: location } });
    }
  }, [location, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // O redirecionamento já foi tratado no useEffect
  }

  return <>{children}</>;
};

function App() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <ScrollToTop />
      <Navbar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Rotas Públicas */}
            <Route path="/" element={
              <PageTransition>
                <Home />
              </PageTransition>
            } />
            
            {/* Página de Produtos - Redireciona /products para /produtos */}
            <Route path="/products" element={
              <Navigate to="/produtos" replace />
            } />
            
            <Route path="/produtos" element={
              <PageTransition>
                <ProductsPage />
              </PageTransition>
            } />
            
            <Route path="/categoria/:category" element={
              <PageTransition>
                <ProductsPage />
              </PageTransition>
            } />
            
            <Route path="/category/:category" element={
              <PageTransition>
                <ProductsPage />
              </PageTransition>
            } />
            
            {/* Rota para detalhes do produto */}
            <Route path="/produto/:id" element={
              <PageTransition>
                <ProductDetails />
              </PageTransition>
            } />
            
            {/* Rotas de Autenticação */}
            <Route path="/login" element={
              <PublicRoute>
                <PageTransition>
                  <Login />
                </PageTransition>
              </PublicRoute>
            } />
            
            <Route path="/cadastro" element={
              <PublicRoute>
                <PageTransition>
                  <Register />
                </PageTransition>
              </PublicRoute>
            } />
            
            <Route path="/cadastro/sucesso" element={<SuccessRegister />} />
            <Route path="/verificar-email" element={<VerifyEmail />} />
            <Route path="/verificar-email/:token" element={<VerifyToken />} />
            <Route path="/cadastro/sucesso" element={
              <PublicRoute>
                <PageTransition>
                  <SuccessRegister />
                </PageTransition>
              </PublicRoute>
            } />
            
            <Route path="/esqueci-minha-senha" element={
              <PublicRoute>
                <PageTransition>
                  <ForgotPassword />
                </PageTransition>
              </PublicRoute>
            } />
            
            {/* Exemplo de rota protegida */}
            <Route path="/perfil" element={
              <ProtectedRoute>
                <PageTransition>
                  <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>
                    <p>Conteúdo protegido - apenas usuários autenticados podem ver esta página.</p>
                  </div>
                </PageTransition>
              </ProtectedRoute>
            } />
            
            {/* Exemplo de rota protegida apenas para admin */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <PageTransition>
                  <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
                    <p>Conteúdo restrito apenas para administradores.</p>
                  </div>
                </PageTransition>
              </ProtectedRoute>
            } />
            
            {/* Rota de fallback */}
            <Route path="*" element={
              <PageTransition>
                <div className="container mx-auto p-4 text-center">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-xl">Página não encontrada</p>
                </div>
              </PageTransition>
            } />
            </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
