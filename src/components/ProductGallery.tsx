import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  className?: string;
}

export function ProductGallery({ images, className = '' }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  }, [isZoomed, nextImage, prevImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (images.length === 0) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center aspect-square ${className}`}>
        <span className="text-gray-400">Sem imagem</span>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Imagem principal com zoom */}
      <div 
        ref={imageRef}
        className={`relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${
          isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onClick={toggleZoom}
        role="button"
        tabIndex={0}
        aria-label={isZoomed ? 'Reduzir imagem' : 'Ampliar imagem'}
        onKeyDown={(e) => e.key === 'Enter' && toggleZoom()}
      >
        <div 
          className={`relative w-full h-0 pb-[100%] ${
            isZoomed ? 'overflow-hidden' : ''
          }`}
        >
          <img
            src={images[currentIndex]}
            alt={`Produto ${currentIndex + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={{
              transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
            }}
            draggable="false"
          />
        </div>
        
        {/* Botão de zoom */}
        {!isZoomed && showZoom && (
          <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
            <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>
        )}
        
        {/* Navegação */}
        {images.length > 1 && !isZoomed && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-700 rounded-full p-2 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-700 rounded-full p-2 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && !isZoomed && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`relative h-20 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-blue-500 dark:border-blue-600' 
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              aria-label={`Ver imagem ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            >
              <img
                src={image}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
      
      {/* Overlay de zoom */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={toggleZoom}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] h-full">
            <img
              src={images[currentIndex]}
              alt={`Produto ${currentIndex + 1} (ampliado)`}
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Fechar zoom"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectImage(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
