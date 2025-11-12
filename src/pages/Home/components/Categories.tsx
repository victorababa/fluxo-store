import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Headphones, Keyboard, Mouse, Monitor, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = () => {
  // Dados de categorias
  const categories = [
    { id: 1, name: 'Consoles', icon: <Gamepad2 size={32} />, link: '/products?category=consoles' },
    { id: 2, name: 'Headsets', icon: <Headphones size={32} />, link: '/products?category=headsets' },
    { id: 3, name: 'Teclados', icon: <Keyboard size={32} />, link: '/products?category=keyboards' },
    { id: 4, name: 'Mouses', icon: <Mouse size={32} />, link: '/products?category=mice' },
    { id: 5, name: 'Monitores', icon: <Monitor size={32} />, link: '/products?category=monitors' },
    { id: 6, name: 'Hardware', icon: <Cpu size={32} />, link: '/products?category=hardware' },
  ];

  return (
    <section className="py-12 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Categorias</h2>
          <Link to="/categories" className="text-neon-green hover:underline flex items-center">
            Ver todas <ArrowRight className="ml-1" size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-dark-700 rounded-lg p-6 text-center cursor-pointer hover:bg-dark-600 transition-all duration-300"
            >
              <Link to={category.link} className="flex flex-col items-center">
                <div className="mb-3">{category.icon}</div>
                <span className="font-medium">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
