import { motion } from 'framer-motion';
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SuccessRegister = () => {
  const location = useLocation();
  const email = location.state?.email || 'seu e-mail';

  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/20 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Conta criada com sucesso!</h1>
        
        <div className="bg-dark-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-neon-green mr-2" />
            <p className="text-lg">Verifique seu e-mail</p>
          </div>
          
          <p className="text-gray-300 mb-6">
            Enviamos um link de confirmação para <span className="text-white font-medium">{email}</span>.
            Clique no link para ativar sua conta.
          </p>
          
          <p className="text-sm text-gray-400">
            Não recebeu o e-mail?{' '}
            <button className="text-neon-green hover:underline">Reenviar</button>
          </p>
        </div>
        
        <Link 
          to="/login" 
          className="inline-flex items-center justify-center w-full bg-neon-green hover:bg-green-500 text-dark font-bold py-3 px-4 rounded-lg transition-colors duration-300"
        >
          Ir para o login
        </Link>
        
        <div className="mt-8 border-t border-gray-800 pt-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Voltar para a página inicial
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessRegister;
