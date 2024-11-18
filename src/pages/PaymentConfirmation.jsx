import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

function PaymentConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const { buyerEmail, sellerEmail, ticketDetails } = location.state || {};

  useEffect(() => {
    // Lance le confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Compte à rebours pour la redirection
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Redirection après 5 secondes
    const redirect = setTimeout(() => {
      navigate('/buy');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  if (!ticketDetails) {
    return <Navigate to="/buy" />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Paiement confirmé !
        </h1>

        <div className="animate-fade-in space-y-4 mb-8">
          <p className="text-lg text-gray-600">
            Votre accès à <span className="font-semibold">{ticketDetails.title}</span> a été réservé.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-amber-800 mb-2">Prochaines étapes :</h3>
            <ol className="list-decimal list-inside text-amber-700 space-y-2">
              <li>Le vendeur va recevoir une notification à {sellerEmail}</li>
              <li>Il vous enverra les accès à {buyerEmail}</li>
              <li>Vous recevrez les informations dans les prochaines minutes</li>
            </ol>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Redirection automatique dans {countdown} secondes...
        </div>

        <button
          onClick={() => navigate('/buy')}
          className="mt-6 text-amber-500 hover:text-amber-600 font-medium"
        >
          Retour aux ventes privées
        </button>
      </div>
    </div>
  );
}

export default PaymentConfirmation;