import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import toast, { Toaster } from 'react-hot-toast';
import { SAMPLE_TICKETS } from '../data/sampleTickets';
import useAuthStore from '../store/authStore';

const stripePromise = loadStripe('pk_test_your_key');

function Checkout() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { user } = useAuthStore();
  const [isGift, setIsGift] = useState(false);
  const [giftEmail, setGiftEmail] = useState('');

  useEffect(() => {
    const loadTicket = () => {
      const foundTicket = SAMPLE_TICKETS[ticketId];
      if (foundTicket) {
        setTicket(foundTicket);
      } else {
        toast.error('Billet non trouvé');
      }
      setLoading(false);
    };

    loadTicket();
  }, [ticketId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    const emailToUse = isGift ? giftEmail : user.email;

    if (!emailToUse) {
      toast.error('Veuillez entrer une adresse email');
      return;
    }

    setProcessing(true);
    
    try {
      // Simuler le paiement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Rediriger vers la confirmation
      navigate(`/confirmation/${ticketId}`, {
        state: { 
          buyerEmail: emailToUse,
          sellerEmail: ticket.sellerEmail,
          ticketDetails: ticket
        }
      });
    } catch (error) {
      toast.error('Erreur lors du paiement. Veuillez réessayer.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-300">Billet non trouvé</h2>
        <button
          onClick={() => navigate('/buy')}
          className="mt-4 text-amber-500 hover:text-amber-400"
        >
          Retour aux ventes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Toaster position="top-center" />
      
      <div className="bg-dark-200 rounded-2xl shadow-xl overflow-hidden border border-dark-300">
        <div className="relative h-64">
          <img 
            src={ticket.image} 
            alt={ticket.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-200 to-transparent"></div>
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-3xl font-bold">{ticket.title}</h1>
            <p className="text-lg opacity-90">{ticket.date}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-200">Détails de la vente</h2>
              <div className="space-y-3 text-gray-400">
                <p>{ticket.description}</p>
                <p className="font-medium">Date: {ticket.date}</p>
                <p className="font-medium">Réduction: {ticket.discount}</p>
              </div>
            </div>

            <div className="bg-dark-300 p-6 rounded-xl border border-dark-400">
              <h2 className="text-xl font-semibold mb-4 text-gray-200">Paiement sécurisé</h2>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email pour recevoir l'accès
                  </label>
                  <input
                    type="email"
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border border-dark-400 bg-dark-200 text-gray-300"
                    value={user.email}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isGift"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="rounded border-dark-400 bg-dark-300 text-amber-500 focus:ring-amber-500"
                  />
                  <label htmlFor="isGift" className="text-sm text-gray-300">
                    Acheter pour quelqu'un d'autre
                  </label>
                </div>

                {isGift && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email du destinataire
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-dark-400 bg-dark-200 text-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="destinataire@email.com"
                      value={giftEmail}
                      onChange={(e) => setGiftEmail(e.target.value)}
                    />
                  </div>
                )}

                <div className="border-t border-dark-400 pt-4 mt-6">
                  <div className="flex justify-between mb-2 text-gray-300">
                    <span>Prix de l'accès</span>
                    <span className="font-semibold">{ticket.price}€</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>Frais de service</span>
                    <span>Inclus</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-amber-500">
                    <span>Total</span>
                    <span>{ticket.price}€</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg 
                    ${processing ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90 transform hover:scale-[1.02] transition-all'}`}
                >
                  {processing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Traitement en cours...
                    </span>
                  ) : (
                    `Payer ${ticket.price}€`
                  )}
                </button>

                <p className="text-sm text-gray-400 text-center mt-4">
                  Paiement sécurisé par Stripe
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;