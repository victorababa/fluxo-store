import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
  className?: string;
}

export function RelatedProducts({ 
  category, 
  currentProductId, 
  className = '' 
}: RelatedProductsProps) {
  // Busca produtos da mesma categoria, excluindo o produto atual
  const { products, loading } = useProducts({
    category,
    page: 1,
    pageSize: 4
  });

  // Filtra para remover o produto atual da lista de relacionados
  const relatedProducts = products.filter(product => product.id !== currentProductId);

  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg"></div>
            <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">Nenhum produto relacionado encontrado.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {relatedProducts.slice(0, 4).map((product: Product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          className="hover:-translate-y-1 transition-transform duration-300"
        />
      ))}
    </div>
  );
}

export default RelatedProducts;
