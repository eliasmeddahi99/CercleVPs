import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

export function Home() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
  }, []);

  return (
    <div className="text-center max-w-6xl mx-auto">
      <div className="mb-16 pt-8">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-transparent bg-clip-text animate-fade-in">
          Cercle des VPs
        </h1>
        {showText && (
          <p className="text-2xl text-gray-400 mb-8 animate-typewriter">
            Votre passeport pour le luxe à prix privilégié
          </p>
        )}
        {user && (
          <p className="text-xl text-gray-400 animate-fade-in" style={{animationDelay: '1s'}}>
            Bienvenue, <span className="font-semibold text-amber-500">{user.username}</span> !
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="luxury-card" style={{animationDelay: '0.3s'}}>
          <div className="luxury-image">
            <img 
              src="https://resize.elle.fr/original/var/plain_site/storage/images/mode/accessoires-de-mode/on-a-degote-pour-vous-les-plus-beaux-sacs-de-luxe-a-shopper-en-seconde-main/98668580-1-fre-FR/On-a-degote-pour-vous-les-plus-beaux-sacs-de-luxe-a-shopper-en-seconde-main.jpg" 
              alt="Luxury Bags" 
              className="w-full h-52 object-cover" 
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-amber-500">Maroquinerie de Luxe</h3>
            <p className="text-gray-400">Birkin, Kelly, Capucines, Lady Dior</p>
          </div>
        </div>

        <div className="luxury-card" style={{animationDelay: '0.6s'}}>
          <div className="luxury-image">
            <img 
              src="https://img-3.journaldesfemmes.fr/OVpMYeLDHVaPVtIME8ex_tokd3E=/1500x/smart/71481f4ba21d4260b09723bd3782ea25/ccmcms-jdf/22824404.jpg" 
              alt="Haute Joaillerie" 
              className="w-full h-52 object-cover" 
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-amber-500">Haute Joaillerie</h3>
            <p className="text-gray-400">Cartier, Van Cleef & Arpels, Bulgari</p>
          </div>
        </div>

        <div className="luxury-card" style={{animationDelay: '0.9s'}}>
          <div className="luxury-image">
            <img 
              src="https://a.storyblok.com/f/200283/1600x900/571d34bddb/wethenew-balenciaga.png" 
              alt="Prêt-à-porter" 
              className="w-full h-52 object-cover" 
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-amber-500">Prêt-à-porter</h3>
            <p className="text-gray-400">Hermès, Chanel, Louis Vuitton</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6 max-w-lg mx-auto">
        {!user ? (
          <button
            onClick={() => navigate('/auth')}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-all transform hover:scale-105 animate-fade-in shadow-lg"
            style={{animationDelay: '1.2s'}}
          >
            Accéder aux Ventes Privées
          </button>
        ) : (
          <button
            onClick={() => navigate('/buy')}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-all transform hover:scale-105 animate-fade-in shadow-lg"
            style={{animationDelay: '1.2s'}}
          >
            Voir les Ventes Disponibles
          </button>
        )}
        
        <div className="relative animate-fade-in" style={{animationDelay: '1.4s'}}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-dark text-gray-400">ou</span>
          </div>
        </div>

        <button
          onClick={() => navigate(user ? '/sell' : '/auth')}
          className="w-full bg-dark-200 text-gray-300 px-8 py-5 rounded-xl font-bold text-lg border-2 border-amber-500 hover:bg-dark-300 transition-all transform hover:scale-105 animate-fade-in"
          style={{animationDelay: '1.6s'}}
        >
          Revendre mon accès
        </button>
      </div>
    </div>
  );
}