import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-dark-200 shadow-lg border-b border-dark-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-transparent bg-clip-text hover:scale-105 transition-transform">
            Cercle des VPs
          </Link>
          
          <div className="flex-1 flex justify-center space-x-12">
            <Link to="/buy" className="text-gray-300 hover:text-amber-500 transition-colors font-medium text-lg">
              Ventes Privées
            </Link>
            <Link to="/sell" className="text-gray-300 hover:text-amber-500 transition-colors font-medium text-lg">
              Revendre
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-6">
                <span className="text-gray-300">
                  Bonjour, <span className="font-semibold text-amber-500">{user.username}</span>
                </span>
                <button 
                  onClick={logout}
                  className="bg-dark-300 text-gray-300 hover:text-amber-500 px-4 py-2 rounded-lg transition-all hover:bg-dark-400"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link to="/auth" className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 shadow-md">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}