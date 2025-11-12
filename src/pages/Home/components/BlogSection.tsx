import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Os Melhores Periféricos para Seu Setup Gamer em 2025',
      excerpt: 'Confira nossa seleção dos melhores teclados, mouses e headsets para turbinar seu setup gamer este ano.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      date: '15/11/2025',
      readTime: '5 min',
      category: 'Dicas',
      url: '/blog/melhores-perifericos-2025'
    },
    {
      id: 2,
      title: 'Como Montar um PC Gamer com Orçamento Ajustado',
      excerpt: 'Guia completo para montar um PC gamer potente sem gastar uma fortuna. Confira nossas dicas e sugestões de peças.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      date: '10/11/2025',
      readTime: '8 min',
      category: 'Tutoriais',
      url: '/blog/montar-pc-gamer-orcamento'
    },
    {
      id: 3,
      title: 'Novos Lançamentos de Hardware que Chegam em Dezembro',
      excerpt: 'Fique por dentro das novidades que as principais marcas trarão para o mercado no final do ano.',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6701?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80',
      date: '05/11/2025',
      readTime: '4 min',
      category: 'Notícias',
      url: '/blog/novos-lancamentos-dezembro'
    }
  ];

  return (
    <section className="py-16 bg-dark-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Últimas do Blog</h2>
            <p className="text-gray-400">Fique por dentro das novidades e dicas do mundo gamer</p>
          </div>
          <Link 
            to="/blog" 
            className="mt-4 md:mt-0 flex items-center text-neon-green hover:text-green-400 transition-colors"
          >
            Ver todas as publicações <ArrowRight className="ml-1" size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-neon-green/10 transition-all duration-300"
            >
              <Link to={post.url}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <span className="inline-block bg-neon-green/20 text-neon-green text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  
                  <h3 className="text-xl font-bold mb-3 hover:text-neon-green transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime} de leitura
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
