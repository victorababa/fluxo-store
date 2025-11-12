import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

const VerifyToken = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Aqui você faria a chamada para a API para verificar o token
        // const response = await api.get(`/verify-email/${token}`);
        // setIsVerified(response.data.verified);
        
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsVerified(true);
        
        // Atualizar o status de verificação do usuário no localStorage
        // localStorage.setItem('isEmailVerified', 'true');
        
      } catch (err) {
        setError('Token inválido ou expirado. Por favor, solicite um novo link de verificação.');
        console.error('Erro ao verificar token:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setError('Token não fornecido');
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-green mx-auto mb-4"></div>
          <p>Verificando seu e-mail...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-dark-800 p-8 rounded-xl shadow-lg">
          {isVerified ? (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">E-mail verificado com sucesso!</h2>
              
              <p className="text-gray-300 mb-6">
                Seu endereço de e-mail foi verificado com sucesso. Agora você pode fazer login na sua conta.
              </p>
              
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-neon-green hover:bg-green-500 text-dark font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Ir para o login
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <XCircle size={32} className="text-red-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Falha na verificação</h2>
              
              <p className="text-gray-300 mb-6">
                {error || 'Ocorreu um erro ao verificar seu e-mail.'}
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Tentar novamente
                </button>
                
                <button
                  onClick={() => navigate('/cadastro')}
                  className="w-full bg-dark-700 hover:bg-dark-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Voltar para o cadastro
                </button>
              </div>
            </>
          )}
          
          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft size={16} className="mr-1" />
              Voltar para a página inicial
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyToken;
