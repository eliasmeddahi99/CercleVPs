import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { CONFIG } from '../src/config/constants.js';

const app = express();
app.use(cors());
app.use(express.json());

// Configuration email
const transporter = nodemailer.createTransport({
  service: CONFIG.email.service,
  auth: {
    user: CONFIG.email.sender,
    pass: CONFIG.email.password
  }
});

// Base de données simulée
let tickets = [];
let transactions = [];

// Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const token = CONFIG.auth.tokenPrefix + Math.random().toString(36).substr(2, 9);
  res.json({ token, user: { id: uuidv4(), email } });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const token = CONFIG.auth.tokenPrefix + Math.random().toString(36).substr(2, 9);
  res.json({ token, user: { id: uuidv4(), email, firstName, lastName } });
});

app.post('/api/tickets/:ticketId/purchase', async (req, res) => {
  const { ticketId } = req.params;
  const { buyerEmail, alternateEmail } = req.body;
  
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) {
    return res.status(404).json({ message: 'Billet non trouvé' });
  }

  const transaction = {
    id: uuidv4(),
    ticketId,
    buyerEmail: alternateEmail || buyerEmail,
    sellerEmail: ticket.sellerEmail,
    status: CONFIG.transaction.statuses.PENDING,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + CONFIG.transaction.expirationTime)
  };

  transactions.push(transaction);

  try {
    // Email au vendeur
    const sellerMailOptions = {
      from: CONFIG.email.sender,
      to: ticket.sellerEmail,
      subject: 'Nouvelle vente - Action requise',
      html: `
        <h1>Nouvelle vente confirmée</h1>
        <p>Un acheteur a réservé votre accès pour ${ticket.title}.</p>
        <p>Email de l'acheteur: ${transaction.buyerEmail}</p>
        <p>Vous avez 24h pour confirmer la transaction et fournir l'accès.</p>
        <a href="${CONFIG.api.baseUrl}/seller/confirm/${transaction.id}">
          Confirmer la transaction
        </a>
      `
    };

    // Email à l'acheteur
    const buyerMailOptions = {
      from: CONFIG.email.sender,
      to: transaction.buyerEmail,
      subject: 'Confirmation de paiement - VIP Sales Access',
      html: `
        <h1>Paiement confirmé</h1>
        <p>Votre paiement pour ${ticket.title} a été confirmé.</p>
        <p>Le vendeur a été notifié et doit vous fournir l'accès sous 24h.</p>
        <p>Vous serez notifié par email à chaque étape.</p>
        <a href="${CONFIG.api.baseUrl}/transaction/${transaction.id}">
          Suivre ma transaction
        </a>
      `
    };

    await Promise.all([
      transporter.sendMail(sellerMailOptions),
      transporter.sendMail(buyerMailOptions)
    ]);

    res.json({ transaction });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi des emails' });
  }
});

app.post('/api/transactions/:transactionId/confirm', async (req, res) => {
  const { transactionId } = req.params;
  const transaction = transactions.find(t => t.id === transactionId);
  
  if (!transaction) {
    return res.status(404).json({ message: 'Transaction non trouvée' });
  }

  transaction.status = CONFIG.transaction.statuses.CONFIRMED;

  const mailOptions = {
    from: CONFIG.email.sender,
    to: transaction.buyerEmail,
    subject: 'Accès confirmé - VIP Sales Access',
    html: `
      <h1>Le vendeur a confirmé votre accès</h1>
      <p>Le vendeur est en train de préparer votre accès.</p>
      <p>Vous recevrez les instructions finales très prochainement.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ transaction });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
  }
});

const PORT = CONFIG.api.baseUrl.split(':')[2];
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});