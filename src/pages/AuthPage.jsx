import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';

function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sponsorshipCode, setSponsorshipCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    identifier: '', // Pour le login (email ou username)
    username: '',
    email: '',
    password: ''
  });

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sponsorshipCode !== 'XXX') {
      toast.error('Code de parrainage invalide');
      return;
    }

    setLoading(true);

    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (isLogin) {
        // Vérifier si l'identifiant correspond à un email ou un username
        const user = existingUsers.find(u => 
          u.email === formData.identifier || u.username === formData.identifier
        );

        if (!user) {
          throw new Error('Identifiants incorrects');
        }

        setAuth(user, 'fake_token_' + Math.random().toString(36).substr(2, 9));
        toast.success('Connexion réussie!');
      } else {
        const isEmailTaken = existingUsers.some(user => user.email === formData.email);
        const isUsernameTaken = existingUsers.some(user => user.username === formData.username);

        if (isEmailTaken || isUsernameTaken) {
          throw new Error(
            isEmailTaken ? 'Cet email est déjà utilisé' : 'Ce nom d\'utilisateur est déjà pris'
          );
        }

        const userData = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email
        };

        existingUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        setAuth(userData, 'fake_token_' + Math.random().toString(36).substr(2, 9));
        toast.success('Compte créé avec succès!');
      }

      const from = location.state?.from?.pathname || '/choose-role';
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full bg-dark-200 rounded-lg shadow-xl p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Code de parrainage
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-dark-400 bg-dark-300 text-gray-100 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2"
              value={sponsorshipCode}
              onChange={(e) => setSponsorshipCode(e.target.value)}
              required
              placeholder="Entrez votre code de parrainage"
            />
          </div>

          {isLogin ? (
            <div>
              <label className="block text-sm font-medium text-gray-200">Email ou nom d'utilisateur</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-dark-400 bg-dark-300 text-gray-100 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2"
                value={formData.identifier}
                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                required
                placeholder="Entrez votre email ou nom d'utilisateur"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-200">Nom d'utilisateur</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-dark-400 bg-dark-300 text-gray-100 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="^[a-zA-Z0-9_-]+$"
                  title="Lettres, chiffres, tirets et underscores uniquement"
                  placeholder="Choisissez un nom d'utilisateur"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Ce nom sera affiché publiquement
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Prénom</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-dark-400 bg-dark-300 text-gray-100 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Nom</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-dark-400 bg-dark-300 text-gray-100 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-dark-400 bg-dark-300 text-gray-100 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="votre@email.com"
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-200">Mot de passe</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-dark-400 bg-dark-300 text-gray-100 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </span>
            ) : (
              isLogin ? 'Se connecter' : "S'inscrire"
            )}
          </button>
        </form>

        <button
          className="mt-4 w-full text-sm text-amber-400 hover:text-amber-300"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Créer un compte" : "Déjà inscrit ?"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;