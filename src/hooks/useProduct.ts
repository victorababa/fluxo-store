import { useState, useEffect } from 'react';
import { Product } from '../types';

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(id: string): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('ID do produto não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Simulando uma chamada de API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Gerar dados de avaliações mockadas
        const reviews = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => ({
          id: `review-${i + 1}`,
          user: `Usuário ${Math.floor(Math.random() * 1000)}`,
          rating: Math.floor(Math.random() * 5) + 1,
          date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          comment: ['Ótimo produto!', 'Recomendo!', 'Bom custo-benefício', 'Entrega rápida', 'Produto de qualidade'][Math.floor(Math.random() * 5)]
        }));
        
        // Calcular média das avaliações
        const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
        
        // Dados mockados para o produto
        const mockProduct: Product = {
          id,
          name: `Produto ${id}`,
          price: Math.floor(Math.random() * 1000) + 100,
          originalPrice: Math.floor(Math.random() * 200) + 1000, // Garantindo que o preço original seja maior
          rating: parseFloat(averageRating.toFixed(1)),
          reviewCount: reviews.length,
          image: `https://via.placeholder.com/300?text=Produto+${id}`,
          images: [
            `https://via.placeholder.com/800x600?text=Produto+${id}+1`,
            `https://via.placeholder.com/800x600?text=Produto+${id}+2`,
            `https://via.placeholder.com/800x600?text=Produto+${id}+3`,
            `https://via.placeholder.com/800x600?text=Produto+${id}+4`,
          ],
          category: ['Eletrônicos', 'Jogos', 'Acessórios', 'Periféricos'][Math.floor(Math.random() * 4)],
          inStock: Math.random() > 0.2, // 80% de chance de estar em estoque
          description: `Descrição detalhada do Produto ${id}. Este é um produto de alta qualidade com ótimo custo-benefício. Ideal para quem busca desempenho e durabilidade.`,
          specifications: [
            { name: 'Marca', value: 'Exemplo' },
            { name: 'Modelo', value: `MOD-${Math.floor(Math.random() * 1000)}` },
            { name: 'Cor', value: ['Preto', 'Branco', 'Prata', 'Azul', 'Vermelho'][Math.floor(Math.random() * 5)] },
            { name: 'Peso', value: `${(Math.random() * 2 + 0.5).toFixed(1)} kg` },
            { name: 'Dimensões', value: '15 x 10 x 5 cm' },
            { name: 'Material', value: 'Plástico de alta resistência' },
            { name: 'Garantia', value: '12 meses' },
            { name: 'Origem', value: 'Brasil' },
          ],
          features: [
            'Alta durabilidade',
            'Design moderno',
            'Fácil instalação',
            'Garantia de 1 ano',
            'Compatível com vários dispositivos',
            'Alto desempenho',
            'Baixo consumo de energia',
            'Leve e portátil'
          ],
          reviews
        };
        
        setProduct(mockProduct);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setError('Não foi possível carregar o produto. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
