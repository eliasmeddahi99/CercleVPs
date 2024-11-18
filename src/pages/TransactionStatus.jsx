import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TRANSACTION_STATUSES = {
  PENDING: {
    label: 'En attente',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Le vendeur a été notifié et doit confirmer la transaction'
  },
  CONFIRMED: {
    label: 'Confirmé',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Le vendeur a confirmé la transaction et prépare votre accès'
  },
  COMPLETED: {
    label: 'Terminé',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'La transaction est terminée, vérifiez votre email'
  },
  EXPIRED: {
    label: 'Expiré',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Le vendeur n\'a pas répondu dans les délais'
  }
};

function TransactionStatus() {
  const { transactionId } = useParams();
  const [status, setStatus] = useState('PENDING');
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 heures en secondes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setStatus('EXPIRED');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const currentStatus = TRANSACTION_STATUSES[status];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Statut de la Transaction</h1>
        
        <div className={`${currentStatus.bgColor} rounded-lg p-6 mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`${currentStatus.color} font-semibold text-lg`}>
              {currentStatus.label}
            </span>
            {status === 'PENDING' && (
              <span className="text-gray-600 text-sm">
                Temps restant: {formatTimeLeft()}
              </span>
            )}
          </div>
          <p className="text-gray-700">{currentStatus.description}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              status === 'PENDING' ? 'bg-yellow-500' : 'bg-gray-300'
            } text-white`}>1</div>
            <div className="ml-4">
              <h3 className="font-semibold">Paiement effectué</h3>
              <p className="text-sm text-gray-600">Le vendeur a été notifié par email</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              status === 'CONFIRMED' ? 'bg-blue-500' : 'bg-gray-300'
            } text-white`}>2</div>
            <div className="ml-4">
              <h3 className="font-semibold">Confirmation du vendeur</h3>
              <p className="text-sm text-gray-600">Le vendeur prépare votre accès</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              status === 'COMPLETED' ? 'bg-green-500' : 'bg-gray-300'
            } text-white`}>3</div>
            <div className="ml-4">
              <h3 className="font-semibold">Accès transmis</h3>
              <p className="text-sm text-gray-600">Vérifiez votre email pour les instructions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionStatus;