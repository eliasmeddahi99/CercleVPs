import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SAMPLE_TICKETS } from '../data/sampleTickets';

function BuyerDashboard() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadTickets = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTickets(Object.values(SAMPLE_TICKETS));
    };
    loadTickets();

    // Afficher le message une seule fois après le montage du composant
    const toastId = toast((t) => (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 relative">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h3 className="text-red-800 font-semibold mb-2 pr-6">⚠️ Important : Protection de l'anonymat</h3>
        <p className="text-red-700">
          Nous insistons sur l'importance absolue de garder l'anonymat du vendeur. 
          En cas de rupture de cet anonymat, toutes les informations vous concernant 
          seront transmises au vendeur à sa demande.
        </p>
      </div>
    ), {
      duration: 10000,
      position: 'top-center',
      style: {
        background: 'none',
        boxShadow: 'none',
        padding: 0,
        maxWidth: '500px',
        marginTop: '100px'
      }
    });

    return () => toast.dismiss(toastId);
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const searchLower = search.toLowerCase();
    return (
      ticket.title.toLowerCase().includes(searchLower) ||
      ticket.description.toLowerCase().includes(searchLower) ||
      ticket.price.toString().includes(searchLower)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text">
          Ventes Privées Disponibles
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher une vente privée..."
            className="w-full p-5 border-2 border-amber-200 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg bg-dark-300 text-gray-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTickets.map((ticket, index) => (
          <div 
            key={ticket.id} 
            className="bg-dark-200 rounded-xl shadow-lg overflow-hidden animate-fade-in hover:shadow-xl transition-all transform hover:-translate-y-2 border border-dark-300"
            style={{animationDelay: `${index * 0.2}s`}}
          >
            <div className="relative">
              <img 
                src={ticket.image} 
                alt={ticket.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                -{ticket.discount}
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-100">{ticket.title}</h3>
                <span className="text-3xl font-bold text-amber-500">{ticket.price}€</span>
              </div>
              <p className="text-gray-400 mb-4">{ticket.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-amber-500 font-semibold">{ticket.date}</span>
                <button
                  onClick={() => navigate(`/checkout/${ticket.id}`)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-md"
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerDashboard;