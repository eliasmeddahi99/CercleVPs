import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ChooseRole() {
  const navigate = useNavigate();

  const showMessage = (message, onClose) => {
    toast.dismiss(); // Ferme tous les toasts existants
    toast((t) => (
      <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 rounded-lg p-4 relative">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <p className="text-red-700 font-medium pr-6">
          {message}
        </p>
      </div>
    ), {
      duration: 2000, // Réduit à 2 secondes
      position: 'top-center',
      style: {
        background: 'none',
        boxShadow: 'none',
        padding: 0,
        maxWidth: '500px'
      },
      onClose
    });
  };

  const handleRoleClick = (role) => {
    const messages = {
      buyer: "IMPORTANT : Nous insistons sur l'importance de garder l'anonymat du vendeur. " +
             "Toute information demandée du vendeur en cas de rupture de cet anonymat lui seront accordées.",
      seller: "IMPORTANT : Nous mettons un point d'honneur à assurer votre anonymat. " +
             "Un maximum de préventions sont mises en avant pour dissuader des potentiels acheteurs de divulguer vos identités."
    };

    showMessage(messages[role], () => {
      navigate(role === 'buyer' ? '/buy' : '/sell');
    });
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Je souhaite...</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          onClick={() => handleRoleClick('buyer')}
          className="bg-dark-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-dark-300 group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-5 transition-opacity rounded-xl" />
          <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-100">Acheter un billet</h3>
          <p className="text-gray-400 mb-6">
            Trouvez et achetez des billets pour vos événements préférés
          </p>
        </div>

        <div 
          onClick={() => handleRoleClick('seller')}
          className="bg-dark-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-dark-300 group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-5 transition-opacity rounded-xl" />
          <div className="h-16 w-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-100">Vendre un billet</h3>
          <p className="text-gray-400 mb-6">
            Revendez vos billets en toute sécurité et anonymement
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;