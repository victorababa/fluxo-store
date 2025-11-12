import { useState, useCallback } from 'react';
import { ShoppingCart, Heart, Share2, Truck, ShieldCheck, CreditCard, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Product } from '../types';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount && product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
    
  const rating = product.rating || 0;
  const reviewCount = product.reviewCount || 0;

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }, []);

  const incrementQuantity = useCallback(() => {
    setQuantity(prev => Math.min(prev + 1, product.inStock ? 10 : 0));
  }, [product.inStock]);
  
  const decrementQuantity = useCallback(() => {
    setQuantity(prev => Math.max(prev - 1, 1));
  }, []);
  
  const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 1;
    setQuantity(Math.min(Math.max(1, value), product.inStock ? 10 : 1));
  }, [product.inStock]);

  const handleAddToCart = useCallback(() => {
    // Implementar lógica de adicionar ao carrinho
    console.log(`Adicionando ${quantity} unidade(s) do produto ${product.id} ao carrinho`);
    // Exemplo de feedback visual
    const button = document.querySelector('.add-to-cart-button');
    if (button) {
      button.classList.add('bg-green-600');
      setTimeout(() => {
        button.classList.remove('bg-green-600');
      }, 1000);
    }
  }, [quantity, product.id]);

  const handleAddToWishlist = useCallback(() => {
    setIsWishlisted(!isWishlisted);
    console.log(`${isWishlisted ? 'Removendo' : 'Adicionando'} produto ${product.id} ${isWishlisted ? 'dos' : 'aos'} favoritos`);
  }, [isWishlisted, product.id]);

  const handleShare = useCallback(async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Confira ${product.name} na nossa loja!`,
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      } else {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    } finally {
      setIsSharing(false);
    }
  }, [isSharing, product.name]);

  const renderRating = useCallback(() => {
    return (
      <div className="flex items-center">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= Math.floor(rating) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-400 dark:text-white/60'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-500 dark:text-white/80">
          {reviewCount} {reviewCount === 1 ? 'avaliação' : 'avaliações'}
          {reviewCount > 0 && (
            <a 
              href="#reviews" 
              className="ml-2 text-blue-600 hover:underline dark:text-blue-400"
            >
              Ver avaliações
            </a>
          )}
        </span>
      </div>
    );
  }, [rating, reviewCount]);

  return (
    <div className="mt-6 space-y-4 text-gray-700 dark:text-white">
      {/* Título e avaliação */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{product.name}</h1>
        {renderRating()}
      </div>

      {/* Preço */}
      <div className="space-y-2">
        {hasDiscount && product.originalPrice && (
          <div className="flex items-center">
            <p className="text-sm text-gray-500 dark:text-white/80 line-through ml-2">{formatPrice(product.originalPrice)}</p>
            <span className="ml-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-medium px-2 py-0.5 rounded">
              {discountPercentage}% OFF
            </span>
          </div>
        )}
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-3xl font-bold text-green-600 dark:text-green-500">{formatPrice(product.price)}</p>
          {hasDiscount && (
            <p className="text-sm text-gray-600 dark:text-white">ou 10x de {formatPrice(product.price / 10)} sem juros</p>
          )}
        </div>
        <p className="text-sm text-gray-700 dark:text-white mb-4">Cor: <span className="font-medium">{product.color || 'Preto'}</span></p>
        <div className="text-sm text-green-600 dark:text-green-400 font-medium">
          {product.inStock 
            ? 'Em estoque' 
            : 'Produto esgotado'}
        </div>
        {product.inStock && (
          <div className="text-xs text-gray-500 dark:text-white/80">
            Frete grátis para todo o Brasil em compras acima de {formatPrice(199)}
          </div>
        )}
      </div>

      {/* Quantidade */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-gray-700 dark:text-white">Quantidade:</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <button
              onClick={decrementQuantity}
              className="px-3 py-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
              aria-label="Diminuir quantidade"
              disabled={quantity <= 1}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <input
              type="number"
              min="1"
              max={product.inStock ? '10' : '1'}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-12 text-center bg-transparent border-x border-gray-200 dark:border-gray-600 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Quantidade"
            />
            <button
              onClick={incrementQuantity}
              className="px-3 py-2 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
              aria-label="Aumentar quantidade"
              disabled={!product.inStock || quantity >= 10}
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
          {product.inStock && (
            <span className="text-sm text-gray-500 dark:text-white/80">
              {10 - quantity} {10 - quantity === 1 ? 'unidade' : 'unidades'} disponíveis
            </span>
          )}
        </div>
      </div>

      {/* Disponibilidade */}
      <div className="flex items-center">
        {product.inStock ? (
          <span className="text-green-600 font-medium flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Em estoque
          </span>
        ) : (
          <span className="text-red-600 font-medium flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Fora de estoque
          </span>
        )}
      </div>

      {/* Descrição */}
      {product.description && (
        <div className="space-y-2">
          <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-100">Descrição do Produto</h3>
          <div className="relative">
            <p className="text-gray-700 dark:text-white mb-4">
              {product.description}
            </p>
            {product.description.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center focus:outline-none"
              >
                {showFullDescription ? (
                  <>
                    <span>Mostrar menos</span>
                    <ChevronUp className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Ler mais</span>
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex flex-col space-y-3 pt-2">
        <Button 
          onClick={handleAddToCart}
          className={`w-full py-4 text-lg font-medium transition-colors duration-300 add-to-cart-button ${
            product.inStock 
              ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800' 
              : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
          aria-label={product.inStock ? 'Adicionar ao carrinho' : 'Produto indisponível'}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className={`py-4 text-lg transition-colors duration-300 ${
              isWishlisted 
                ? 'border-pink-500 bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/30 dark:hover:bg-pink-800/50' 
                : ''
            }`}
            onClick={handleAddToWishlist}
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart 
              className={`mr-2 h-5 w-5 ${
                isWishlisted 
                  ? 'fill-pink-500 text-pink-500 dark:fill-pink-400 dark:text-pink-400' 
                  : ''
              }`} 
            />
            {isWishlisted ? 'Favoritado' : 'Favoritar'}
          </Button>
          
          <Button 
            variant="outline" 
            className="py-4 text-lg transition-colors duration-300"
            onClick={handleShare}
            disabled={isSharing}
            aria-label="Compartilhar produto"
          >
            <Share2 className={`mr-2 h-5 w-5 ${isSharing ? 'animate-pulse' : ''}`} />
            {isSharing ? 'Compartilhando...' : 'Compartilhar'}
          </Button>
        </div>
      </div>

      {/* Benefícios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
        {[
          {
            icon: <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />,
            title: 'Frete Grátis',
            description: 'Para todo o Brasil em compras acima de R$ 199',
          },
          {
            icon: <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />,
            title: 'Garantia',
            description: '12 meses de garantia direto com o fabricante',
          },
          {
            icon: <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />,
            title: 'Pagamento Seguro',
            description: 'Seus dados estão protegidos',
          },
          {
            icon: (
              <svg 
                className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            title: 'Entrega Rápida',
            description: 'Envio em até 2 dias úteis',
          },
        ].map((benefit, index) => (
          <div key={index} className="flex items-start group">
            <div className="p-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 mr-3 mt-0.5 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
              {benefit.icon}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{benefit.title}</div>
              <div className="text-sm text-gray-500 dark:text-white/80">{benefit.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
