import { useParams } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import { ProductGallery } from '../../../components/ProductGallery';
import { ProductInfo } from '../../../components/ProductInfo';
import { ProductTabs } from '../../../components/ProductTabs';
import { RelatedProducts } from '../../../components/RelatedProducts';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || '');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-12 bg-gray-200 rounded w-1/2 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">Produto não encontrado</h2>
        <p className="mt-2">O produto que você está procurando não existe ou foi removido.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navegação (breadcrumb) */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-gray-700 hover:text-blue-600">Início</a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <a href={`/categoria/${product.category.toLowerCase()}`} className="text-gray-700 hover:text-blue-600">
                {product.category}
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-500 ml-1 md:ml-2">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Galeria de imagens */}
        <div className="w-full lg:w-1/2">
          <ProductGallery images={product.images || [product.image]} />
        </div>

        {/* Informações do produto */}
        <div className="w-full lg:w-1/2">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Abas de detalhes */}
      <div className="mt-12">
        <ProductTabs product={product} />
      </div>

      {/* Produtos relacionados */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </div>
    </div>
  );
}
