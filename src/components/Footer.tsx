import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Twitch, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Institucional',
      links: [
        { name: 'Quem Somos', url: '/about' },
        { name: 'Nossa História', url: '/about#history' },
        { name: 'Trabalhe Conosco', url: '/careers' },
        { name: 'Política de Privacidade', url: '/privacy' },
        { name: 'Termos de Uso', url: '/terms' },
      ],
    },
    {
      title: 'Ajuda',
      links: [
        { name: 'Central de Ajuda', url: '/help' },
        { name: 'Como Comprar', url: '/how-to-buy' },
        { name: 'Entregas', url: '/shipping' },
        { name: 'Trocas e Devoluções', url: '/returns' },
        { name: 'Dúvidas Frequentes', url: '/faq' },
      ],
    },
    {
      title: 'Atendimento',
      links: [
        { name: 'Fale Conosco', url: '/contact' },
        { name: 'Meus Pedidos', url: '/orders' },
        { name: 'Minha Conta', url: '/profile' },
        { name: 'Segurança', url: '/security' },
        { name: 'Reclamações', url: '/complaints' },
      ],
    },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: 'visa' },
    { name: 'Mastercard', icon: 'mastercard' },
    { name: 'Pix', icon: 'pix' },
    { name: 'Boleto', icon: 'barcode' },
    { name: 'PayPal', icon: 'paypal' },
  ];

  const socialMedia = [
    { name: 'Facebook', icon: <Facebook size={20} />, url: '#' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: '#' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: '#' },
    { name: 'YouTube', icon: <Youtube size={20} />, url: '#' },
    { name: 'Twitch', icon: <Twitch size={20} />, url: '#' },
    { name: 'Mensagem', icon: <MessageCircle size={20} />, url: '#' },
  ];

  return (
    <footer className="bg-dark-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo e Slogan */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-neon-green">Fluxo</span>
              <span className="text-2xl font-bold text-white">Store</span>
            </div>
            <p className="text-gray-400 mb-6">
              Tudo o que você precisa para o seu mundo gamer em um só lugar. As melhores ofertas e lançamentos para você.
            </p>
            
            <div className="flex space-x-4 mb-6">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-neon-green transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Phone className="mr-2" size={16} />
                <span>(11) 1234-5678</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="mr-2" size={16} />
                <span>contato@fluxostore.com.br</span>
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="mr-2 mt-1 flex-shrink-0" size={16} />
                <span>Av. Paulista, 1000 - São Paulo/SP</span>
              </div>
            </div>
          </div>

          {/* Links do rodapé */}
          {footerLinks.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-neon-green">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.url}
                      className="text-gray-400 hover:text-neon-green transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Métodos de pagamento */}
        <div className="border-t border-gray-700 pt-6">
          <h4 className="text-sm font-medium text-gray-400 mb-4">FORMAS DE PAGAMENTO</h4>
          <div className="flex flex-wrap gap-3 mb-6">
            {paymentMethods.map((method) => (
              <div 
                key={method.name}
                className="bg-dark-700 rounded-md px-3 py-2 flex items-center justify-center"
              >
                <span className="text-xs font-medium text-gray-300">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright e links legais */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} FluxoStore. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Termos de Uso
            </Link>
            <Link to="/returns" className="text-gray-500 hover:text-white text-sm transition-colors duration-300">
              Trocas e Devoluções
            </Link>
          </div>
        </div>

        {/* Selos de segurança */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="bg-dark-700 rounded-md px-4 py-2">
            <span className="text-xs text-gray-400">Site Seguro</span>
          </div>
          <div className="bg-dark-700 rounded-md px-4 py-2">
            <span className="text-xs text-gray-400">Compra Protegida</span>
          </div>
          <div className="bg-dark-700 rounded-md px-4 py-2">
            <span className="text-xs text-gray-400">Ambiente Seguro</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
