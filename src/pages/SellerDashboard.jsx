import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SellerDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les tickets depuis localStorage
    const storedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(storedTickets);
    setLoading(false);

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
        <h3 className="text-red-800 font-semibold mb-2 pr-6">🔒 Protection de votre anonymat</h3>
        <p className="text-red-700">
          Nous mettons un point d'honneur à assurer votre anonymat. 
          Un maximum de préventions sont mises en avant pour dissuader 
          des potentiels acheteurs de divulguer vos identités.
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-400">Chargement des annonces...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Mes Annonces</h1>
        <button
          onClick={() => navigate('/new-ticket')}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Nouvelle Annonce
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12 bg-dark-200 rounded-lg shadow-sm border border-dark-300">
          <p className="text-gray-400 mb-4">Vous n'avez pas encore créé d'annonce</p>
          <button
            onClick={() => navigate('/new-ticket')}
            className="text-amber-500 hover:text-amber-400 font-medium"
          >
            Créer ma première annonce
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-dark-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-dark-300">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-100">{ticket.title}</h2>
                  <p className="text-gray-400 mb-3">{ticket.description}</p>
                  <p className="text-sm text-gray-500">
                    ID Vendeur: {ticket.anonymousSellerId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-500">{ticket.price} €</p>
                  <span className={`text-sm ${
                    ticket.status === 'available' ? 'text-green-500' : 'text-gray-500'
                  }`}>
                    {ticket.status === 'available' ? 'Disponible' : 'Vendu'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;