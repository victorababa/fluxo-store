import { store } from '.';

// Tipos base
export type UserRole = 'user' | 'admin';

// Interfaces de domínio
export interface User {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tipos de estado
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Tipos de ações
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

// Tipos de retorno da API
export interface AuthResponse {
  user: User;
  token: string;
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
}

// Tipos do Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Tipos de hooks
export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
}
