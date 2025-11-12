import { motion } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container mx-auto px-4">
        <div className={styles.heroContent}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bem-vindo à <span className={styles.floating}>Fluxo Store</span>
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Os melhores produtos de tecnologia com os melhores preços. 
            Encontre tudo para o seu setup gamer em um só lugar.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/products" 
              className="bg-neon-green hover:bg-green-500 text-dark font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Comprar Agora
            </Link>
            <Link 
              to="/categories" 
              className="border-2 border-neon-green text-neon-green hover:bg-neon-green/10 font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Zap size={20} />
              Ofertas Relâmpago
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
