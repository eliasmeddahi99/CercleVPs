export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string; // Hashed in production
}

export interface Ticket {
  id: string;
  sellerId: string;
  anonymousSellerId: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  status: 'available' | 'sold';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}