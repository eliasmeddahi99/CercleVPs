import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewTicket() {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!ticketData.title || !ticketData.description || !ticketData.price) {
        throw new Error('Veuillez remplir tous les champs');
      }

      const ticket = {
        id: crypto.randomUUID(),
        sellerId: crypto.randomUUID(),
        anonymousSellerId: `SELLER-${crypto.randomUUID().slice(0, 6).toUpperCase()}`,
        title: ticketData.title,
        description: ticketData.description,
        price: parseFloat(ticketData.price),
        createdAt: new Date().toISOString(),
        status: 'available'
      };

      // Récupérer les tickets existants
      const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
      
      // Ajouter le nouveau ticket
      existingTickets.push(ticket);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('tickets', JSON.stringify(existingTickets));

      navigate('/sell');
    } catch (err) {
      setError(err.message || 'Erreur lors de la création de l\'annonce');
      console.error('Error creating ticket:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nouvelle Annonce</h1>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Titre de l'annonce
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2"
            value={ticketData.title}
            onChange={(e) => setTicketData({...ticketData, title: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2"
            rows="4"
            value={ticketData.description}
            onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 p-2"
            value={ticketData.price}
            onChange={(e) => setTicketData({...ticketData, price: e.target.value})}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/sell')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:opacity-90 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publication...' : 'Publier l\'annonce'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTicket;