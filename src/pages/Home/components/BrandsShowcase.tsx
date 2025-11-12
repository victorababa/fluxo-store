import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrandsShowcase = () => {
  // Logos das marcas (substitua por imagens reais posteriormente)
  const brands = [
    {
      id: 1,
      name: 'Razer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Razer_snake_logo.svg/1200px-Razer_snake_logo.svg.png',
      url: '/brands/razer'
    },
    {
      id: 2,
      name: 'Logitech',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Logitech_logo_2016.svg/2560px-Logitech_logo_2016.svg.png',
      url: '/brands/logitech'
    },
    {
      id: 3,
      name: 'Corsair',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Corsair_logo_black.svg/1200px-Corsair_logo_black.svg.png',
      url: '/brands/corsair'
    },
    {
      id: 4,
      name: 'HyperX',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/HyperX_Symbol_Burgundy.png/800px-HyperX_Symbol_Burgundy.png',
      url: '/brands/hyperx'
    },
    {
      id: 5,
      name: 'SteelSeries',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Steelseries_logo.svg/1200px-Steelseries_logo.svg.png',
      url: '/brands/steelseries'
    },
    {
      id: 6,
      name: 'ASUS ROG',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/ROG_Republic_of_Gamers_logo_2019.svg/1200px-ROG_Republic_of_Gamers_logo_2019.svg.png',
      url: '/brands/rog'
    },
  ];

  return (
    <section className="py-12 bg-dark-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold">Nossas Marcas Parceiras</h2>
            <p className="text-gray-400">As melhores marcas de tecnologia em um só lugar</p>
          </div>
          <Link 
            to="/brands" 
            className="flex items-center text-neon-green hover:text-green-400 transition-colors"
          >
            Ver todas as marcas <ArrowRight className="ml-1" size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-dark-700 rounded-xl p-6 flex items-center justify-center h-32 hover:bg-dark-600 transition-all duration-300"
            >
              <Link to={brand.url} className="w-full h-full flex items-center justify-center">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  title={brand.name}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
