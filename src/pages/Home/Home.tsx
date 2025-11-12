import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Star } from 'lucide-react';
import { 
  HeroCarousel, 
  Categories, 
  FeaturedProducts, 
  BrandsShowcase, 
  Testimonials, 
  BlogSection, 
  CountdownTimer 
} from './components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-neon-green animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Carregando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <HeroCarousel />
      <Categories />
      <BrandsShowcase />
      <FeaturedProducts />
      <Testimonials />
      <BlogSection />
      
      {/* Ofertas do Dia */}
      <section className="py-12 bg-dark-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Ofertas do Dia</h2>
            <CountdownTimer 
              targetDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // 24 horas a partir de agora
              onComplete={() => console.log('Ofertas encerradas!')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 4,
                name: 'Teclado Mecânico Gamer',
                price: 499.99,
                originalPrice: 699.99,
                discount: 29,
                image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                timeLeft: '08:30:45',
              },
              {
                id: 5,
                name: 'Mouse Gamer RGB',
                price: 199.99,
                originalPrice: 299.99,
                discount: 33,
                image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                timeLeft: '05:15:22',
              },
              {
                id: 6,
                name: 'Headset Gamer 7.1',
                price: 349.99,
                originalPrice: 499.99,
                discount: 30,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                timeLeft: '12:45:15',
              },
            ].map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-dark-700 rounded-xl overflow-hidden shadow-lg hover:shadow-neon-green/20 transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={deal.image} 
                    alt={deal.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{deal.discount}%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{deal.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < 4 ? 'currentColor' : 'none'}
                            className={i < 4 ? 'text-yellow-400' : 'text-gray-600'}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm ml-1">(4.5)</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Restam: {Math.floor(Math.random() * 20) + 5} un.
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-neon-green">
                      R$ {deal.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="ml-2 text-gray-400 line-through text-sm">
                      R$ {deal.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Vendido: {Math.floor(Math.random() * 50) + 10}%</span>
                      <span>{deal.timeLeft}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full" 
                        style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-gradient-to-r from-red-600 to-yellow-500 hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
                    Aproveitar Oferta
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-dark-800 to-dark-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Cadastre-se e ganhe <span className="text-neon-green">10% OFF</span> na primeira compra!
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Além do desconto, receba ofertas exclusivas e seja o primeiro a saber sobre nossos lançamentos!
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="px-6 py-3 rounded-lg bg-dark-700 border border-gray-600 focus:border-neon-green focus:outline-none text-white w-full sm:max-w-md"
            />
            <button className="bg-neon-green hover:bg-green-500 text-dark font-bold py-3 px-8 rounded-lg transition-colors duration-300 whitespace-nowrap">
              Quero meu desconto!
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
