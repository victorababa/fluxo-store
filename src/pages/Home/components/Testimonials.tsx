import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Carlos Silva',
      role: 'Gamer Profissional',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      content: 'Produtos de altíssima qualidade e entrega super rápida! Comprei meu teclado mecânico e estou amando a experiência.'
    },
    {
      id: 2,
      name: 'Ana Oliveira',
      role: 'Streamer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      content: 'Atendimento excepcional! Meu headset quebrou e a troca foi super tranquila. Recomendo demais a Fluxo Store!'
    },
    {
      id: 3,
      name: 'Pedro Santos',
      role: 'Editor de Vídeo',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 4,
      content: 'Ótimo custo-benefício. Comprei um monitor gamer e veio tudo perfeito. Só não ganhou 5 estrelas porque a entrega atrasou um dia.'
    }
  ];

  return (
    <section className="py-16 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Veja a opinião de quem já comprou na nossa loja</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-dark-800 rounded-xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-yellow-400 opacity-10">
                <Quote size={60} />
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}
                  />
                ))}
              </div>
              
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-neon-green hover:bg-green-500 text-dark font-bold py-3 px-8 rounded-lg transition-colors duration-300">
            Deixe seu depoimento
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
