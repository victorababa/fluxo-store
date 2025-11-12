import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, UseProductsProps } from '../types';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  totalItems: number;
}

export function useProducts(filters: UseProductsProps): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Construir query params
        const params = new URLSearchParams();
        
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.sortBy) params.append('sortBy', filters.sortBy);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.pageSize) params.append('pageSize', filters.pageSize.toString());

        // Aqui você faria a chamada para sua API
        // const response = await api.get(`/products?${params.toString()}`);
        
        // Dados mockados - 24 produtos no total (3 páginas de 8 produtos)
        const allMockProducts: Product[] = Array(24).fill(0).map((_, index) => ({
          id: `${index + 1}`,
          name: `Produto ${index + 1}`,
          price: Math.floor(Math.random() * 1000) + 100,
          originalPrice: Math.floor(Math.random() * 1200) + 100,
          rating: Math.floor(Math.random() * 5) + 1,
          reviewCount: Math.floor(Math.random() * 100),
          image: `https://via.placeholder.com/300?text=Produto+${index + 1}`,
          images: [
            `https://via.placeholder.com/800x600?text=Produto+${index + 1}+1`,
            `https://via.placeholder.com/800x600?text=Produto+${index + 1}+2`,
            `https://via.placeholder.com/800x600?text=Produto+${index + 1}+3`,
          ],
          category: ['Eletrônicos', 'Jogos', 'Acessórios', 'Periféricos'][Math.floor(Math.random() * 4)],
          inStock: Math.random() > 0.2, // 80% de chance de estar em estoque
          description: `Descrição detalhada do Produto ${index + 1}. Este é um produto de alta qualidade com ótimo custo-benefício.`,
          specifications: [
            { name: 'Marca', value: 'Exemplo' },
            { name: 'Modelo', value: `MOD-${Math.floor(Math.random() * 1000)}` },
            { name: 'Cor', value: ['Preto', 'Branco', 'Prata', 'Azul', 'Vermelho'][Math.floor(Math.random() * 5)] },
            { name: 'Peso', value: `${(Math.random() * 2 + 0.5).toFixed(1)} kg` },
          ],
          features: [
            'Alta durabilidade',
            'Design moderno',
            'Fácil instalação',
            'Garantia de 1 ano',
            'Compatível com vários dispositivos'
          ]
        }));

        // Lógica de paginação
        const itemsPerPage = filters.pageSize || 8;
        const currentPage = filters.page || 1;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        // Filtrar produtos por categoria se necessário
        let filteredProducts = [...allMockProducts];
        if (filters.category) {
          filteredProducts = filteredProducts.filter(
            product => product.category.toLowerCase() === filters.category?.toLowerCase()
          );
        }
        
        // Aplicar paginação
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        // Calcular total de itens e páginas
        const itemsCount = filteredProducts.length;
        const pagesCount = Math.ceil(itemsCount / itemsPerPage);
        
        setProducts(paginatedProducts);
        setTotalPages(pagesCount);
        setTotalItems(itemsCount);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchParams]);

  return { products, loading, error, totalPages, totalItems };
}
