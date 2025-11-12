import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Por favor, insira seu e-mail');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulando chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Se chegou aqui, o e-mail foi enviado com sucesso
      setIsSubmitted(true);
      
    } catch (err) {
      setError('Ocorreu um erro ao enviar o e-mail. Tente novamente mais tarde.');
      console.error('Erro ao recuperar senha:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500/20 p-4 rounded-full">
              <Mail className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">E-mail enviado!</h1>
          
          <div className="bg-dark-800 rounded-xl p-6 mb-8">
            <p className="text-gray-300 mb-4">
              Enviamos um link de redefinição de senha para <span className="text-white font-medium">{email}</span>.
            </p>
            
            <p className="text-sm text-gray-400">
              Não recebeu o e-mail? Verifique sua pasta de spam ou{' '}
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-neon-green hover:underline"
              >
                tente novamente
              </button>
            </p>
          </div>
          
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center w-full bg-neon-green hover:bg-green-500 text-dark font-bold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Voltar para o login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          to="/login" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" /> Voltar para login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Esqueceu sua senha?</h1>
          <p className="text-gray-400">Digite seu e-mail para redefinir sua senha</p>
        </div>

        {error && (
          <motion.div 
            className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent"
                placeholder="seu@email.com"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-neon-green hover:bg-green-500 text-dark font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              'Enviar link de recuperação'
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Lembrou sua senha?{' '}
            <Link to="/login" className="text-neon-green hover:underline font-medium">
              Faça login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
