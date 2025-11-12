import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { sendVerificationEmail } from '../../services/emailService';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{success?: boolean; message?: string}>({});
  const { email, name, token } = (location.state as { email: string; name: string; token: string }) || {};

  useEffect(() => {
    if (!email || !name || !token) {
      navigate('/cadastro');
    }
  }, [email, name, token, navigate]);

  const handleResendEmail = async () => {
    if (!email || !name || !token) return;
    
    try {
      setIsResending(true);
      setResendStatus({});
      
      const response = await sendVerificationEmail({
        to: email,
        token,
        name
      });
      
      if (response.success) {
        setResendStatus({
          success: true,
          message: 'E-mail de verificação reenviado com sucesso!'
        });
      } else {
        throw new Error('Falha ao reenviar o e-mail');
      }
    } catch (error) {
      console.error('Erro ao reenviar e-mail:', error);
      setResendStatus({
        success: false,
        message: 'Erro ao reenviar o e-mail. Tente novamente mais tarde.'
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-dark-800 p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Mail size={32} className="text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Verifique seu e-mail</h2>
          
          <p className="text-gray-300 mb-6">
            Enviamos um link de verificação para <span className="font-semibold text-white">{email}</span>.
            Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
          </p>
          
          <p className="text-sm text-gray-400 mb-4">
            Não recebeu o e-mail? Verifique sua pasta de spam ou 
            <button 
              onClick={handleResendEmail}
              disabled={isResending}
              className="text-neon-green hover:underline ml-1 disabled:opacity-50 flex items-center gap-1"
            >
              {isResending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : 'reenviar e-mail'}
            </button>
          </p>
          
          {resendStatus.message && (
            <div className={`p-3 rounded-lg text-sm mb-6 ${
              resendStatus.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}>
              {resendStatus.message}
            </div>
          )}
          
          <div className="border-t border-gray-700 pt-4 mt-6">
            <p className="text-sm text-gray-400">
              Já verificou seu e-mail?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-neon-green hover:underline"
              >
                Fazer login
              </button>
            </p>
          </div>
          
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

export default VerifyEmail;
