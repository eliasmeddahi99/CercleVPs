import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import ChooseRole from './pages/ChooseRole';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import NewTicket from './pages/NewTicket';
import Checkout from './pages/Checkout';
import PaymentConfirmation from './pages/PaymentConfirmation';
import AuthPage from './pages/AuthPage';
import TransactionStatus from './pages/TransactionStatus';

function App() {
  return (
    <Layout>
      <Navbar />
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1E1E1E',
            color: '#fff',
            border: '1px solid rgba(184, 134, 11, 0.2)'
          }
        }}
      />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/choose-role"
            element={
              <PrivateRoute>
                <ChooseRole />
              </PrivateRoute>
            }
          />
          <Route
            path="/buy"
            element={
              <PrivateRoute>
                <BuyerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <PrivateRoute>
                <SellerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-ticket"
            element={
              <PrivateRoute>
                <NewTicket />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout/:ticketId"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/confirmation/:ticketId"
            element={
              <PrivateRoute>
                <PaymentConfirmation />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionStatus />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </Layout>
  );
}

export default App;