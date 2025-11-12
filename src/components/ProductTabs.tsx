import { useState } from 'react';
import { Product, Review } from '../types';

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'specifications':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Especificações Técnicas</h3>
            {product.specifications && product.specifications.length > 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {product.specifications.map((spec, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 w-1/3">
                          {spec.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-white">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-white/80">Nenhuma especificação disponível.</p>
            )}
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="text-4xl font-bold mr-4 text-gray-900 dark:text-white">
                  {product.rating?.toFixed(1) || '0.0'}
                </div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {product.reviewCount || 0} {product.reviewCount === 1 ? 'avaliação' : 'avaliações'}
                  </div>
                </div>
              </div>
            </div>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review: Review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-600 font-medium">
                            {review.user?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{review.user || 'Usuário Anônimo'}</div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < (review.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-white">
                        {review.date ? new Date(review.date).toLocaleDateString('pt-BR') : 'Data não disponível'}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="mt-3 text-white">{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-white">Nenhuma avaliação disponível. Seja o primeiro a avaliar!</p>
            )}
          </div>
        );
      default:
        return (
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-4">Descrição do Produto</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'Nenhuma descrição disponível para este produto.'}
            </p>
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-2">Características:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="mt-12">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'description'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Descrição
          </button>
          <button
            onClick={() => setActiveTab('specifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'specifications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Especificações
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reviews'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Avaliações ({product.reviewCount || 0})
          </button>
        </nav>
      </div>

      <div className="py-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
