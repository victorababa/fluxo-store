import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discount = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Lógica para adicionar ao carrinho
    console.log(`Adicionando produto ${product.id} ao carrinho`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Lógica para adicionar aos favoritos
    console.log(`Adicionando produto ${product.id} aos favoritos`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${className}`}>
      {/* Imagem do Produto */}
      <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Badge de Desconto */}
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        
        {/* Botões de Ação */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
          <button 
            onClick={handleAddToCart}
            className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Adicionar ao carrinho"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={handleAddToWishlist}
            className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Adicionar aos favoritos"
          >
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
          <Link 
            to={`/produto/${product.id}`}
            className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Ver detalhes do produto"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </Link>
        </div>
      </div>
      
      {/* Detalhes do Produto */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/produto/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Avaliação */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({product.reviewCount})
          </span>
        </div>
        
        {/* Preço */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Parcelamento */}
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            em até <span className="font-medium">10x de {formatPrice(product.price / 10)}</span> sem juros
          </div>
        </div>
        
        {/* Botão de Adicionar ao Carrinho */}
        <button 
          onClick={handleAddToCart}
          className={`mt-4 w-full py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 ${
            product.inStock 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
          aria-label={product.inStock ? 'Adicionar ao carrinho' : 'Produto fora de estoque'}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.inStock ? 'Adicionar ao carrinho' : 'Fora de estoque'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
