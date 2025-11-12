import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';
import { FilterSidebar } from './components/FilterSidebar';
import { Pagination } from '../../components/Pagination';
import { useProducts } from '../../hooks/useProducts';

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'relevance',
    page: parseInt(searchParams.get('page') || '1'),
  });

  const { products, loading, error, totalPages } = useProducts(filters);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 1,
    };
    
    // Atualiza o estado local
    setFilters(updatedFilters);
    
    // Atualiza a URL
    const params = new URLSearchParams();
    if (updatedFilters.category) params.set('category', updatedFilters.category);
    if (updatedFilters.minPrice) params.set('minPrice', updatedFilters.minPrice);
    if (updatedFilters.maxPrice) params.set('maxPrice', updatedFilters.maxPrice);
    if (updatedFilters.sortBy) params.set('sortBy', updatedFilters.sortBy);
    if (updatedFilters.page > 1) params.set('page', updatedFilters.page.toString());
    
    // Navega para a nova URL sem recarregar a página
    navigate(`?${params.toString()}`, { replace: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        Ocorreu um erro ao carregar os produtos. Por favor, tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-1/4">
          <FilterSidebar 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Lista de Produtos */}
        <div className="w-full md:w-3/4">
          {/* Ordenação */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Mostrando {products.length} produtos
            </p>
            <select 
              className="border rounded p-2"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
            >
              <option value="relevance">Relevância</option>
              <option value="price_asc">Preço: Menor para maior</option>
              <option value="price_desc">Preço: Maior para menor</option>
              <option value="newest">Mais recentes</option>
              <option value="best_sellers">Mais vendidos</option>
            </select>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination 
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={(page) => handleFilterChange({ page })}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
