import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowLeft, ArrowRight, ShoppingCart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componente de seta personalizada
const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} hidden sm:block`}
      style={{ ...style, display: 'block', right: '20px', zIndex: 1 }}
      onClick={onClick}
    >
      <div className="bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
        <ArrowRight className="text-white" size={20} />
      </div>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} hidden sm:block`}
      style={{ ...style, display: 'block', left: '20px', zIndex: 1 }}
      onClick={onClick}
    >
      <div className="bg-black/50 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
        <ArrowLeft className="text-white" size={20} />
      </div>
    </div>
  );
};

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: any) => (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {dots}
      </div>
    ),
    customPaging: (i: number) => (
      <div className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300"></div>
    ),
  };

  const slides = [
    {
      id: 1,
      title: 'Promoções de Black Friday',
      subtitle: 'Até 70% de desconto em produtos selecionados',
      buttonText: 'Aproveite as Ofertas',
      buttonLink: '/black-friday',
      buttonIcon: <Zap size={18} className="mr-2" />,
      image: 'https://images.unsplash.com/photo-1606813907291-d84a4c7d5b3d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 2,
      title: 'Nova Coleção de Periféricos',
      subtitle: 'Os melhores acessórios para seu setup gamer',
      buttonText: 'Comprar Agora',
      buttonLink: '/products?category=peripherals',
      buttonIcon: <ShoppingCart size={18} className="mr-2" />,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    },
    {
      id: 3,
      title: 'Frete Grátis em Toda Loja',
      subtitle: 'Em compras a partir de R$ 299,90',
      buttonText: 'Ver Produtos',
      buttonLink: '/products',
      buttonIcon: <ShoppingCart size={18} className="mr-2" />,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
    },
  ];

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[80vh] w-full">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="container mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
                <motion.div 
                  className="max-w-2xl text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-200 mb-8">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.buttonLink}
                    className="inline-flex items-center bg-neon-green hover:bg-green-500 text-dark font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    {slide.buttonIcon}
                    {slide.buttonText}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
