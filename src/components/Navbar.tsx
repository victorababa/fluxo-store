import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, User, Search, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items: cartItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Buscando por:', searchQuery);
  };

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Produtos', path: '/products' },
    { name: 'Promoções', path: '/deals' },
    { name: 'Novidades', path: '/new-arrivals' },
    { name: 'Contato', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-sm border-b border-primary/20' : 'bg-dark/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-neon-green">Fluxo</span>
            <span className="text-2xl font-bold text-white">Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative group text-white hover:text-neon-green transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-neon-green' : ''
                }`}
              >
                {link.name}
                <span 
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? 'w-full' : ''
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full bg-dark-700 text-white px-4 py-2 pl-10 pr-4 rounded-full border border-gray-700 focus:border-neon-green focus:ring-1 focus:ring-neon-green outline-none transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-white hover:text-neon-green transition-colors duration-300 hidden md:block"
            >
              <User size={24} />
            </Link>
            
            <Link 
              to="/cart" 
              className="relative text-white hover:text-neon-green transition-colors duration-300"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-green text-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full bg-dark-700 text-white px-4 py-2 pl-10 pr-4 rounded-full border border-gray-700 focus:border-neon-green focus:ring-1 focus:ring-neon-green outline-none transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-800 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-neon-green'
                      : 'text-white hover:bg-dark-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-700">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 py-2 px-3 text-white hover:bg-dark-700 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={18} />
                  <span>Minha Conta</span>
                </Link>
                <button
                  className="flex items-center space-x-2 w-full py-2 px-3 text-left text-white hover:bg-dark-700 rounded-md transition-colors duration-200"
                  onClick={() => {
                    // Implementar logout
                    setIsOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
