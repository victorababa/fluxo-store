import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  // Dados de produtos em destaque
  const featuredProducts = [
    {
      id: 1,
      name: 'PlayStation 5',
      price: 4499.99,
      originalPrice: 4999.99,
      discount: 10,
      image: 'https://images.unsplash.com/photo-1606813907291-d84a4c7d5b3d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Xbox Series X',
      price: 4299.99,
      originalPrice: 4599.99,
      discount: 7,
      image: 'https://images.unsplash.com/photo-1637775297209-2f6f1a5d3c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Nintendo Switch OLED',
      price: 2799.99,
      originalPrice: 2999.99,
      discount: 7,
      image: 'https://images.unsplash.com/photo-1637775359083-0a9a3f2f1e0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Destaques</h2>
          <Link to="/products" className="text-neon-green hover:underline flex items-center">
            Ver todos <ArrowRight className="ml-1" size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-dark-700 rounded-xl overflow-hidden shadow-lg hover:shadow-neon-green/20 transition-all duration-300"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                {product.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-1">({product.rating})</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-neon-green">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="ml-2 text-gray-400 line-through text-sm">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <button className="w-full mt-4 bg-dark-600 hover:bg-neon-green hover:text-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                  Adicionar ao Carrinho
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
