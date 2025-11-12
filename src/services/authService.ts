import axios from 'axios';

type AxiosResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
};

interface User {
  id: string;
  name: string;
  email: string;
  // Adicione outros campos conforme necessário
}

interface AuthResponse {
  user: User;
  token: string;
}

const API_URL = 'http://localhost:3001/api/auth'; // Atualize com sua URL da API

// Configuração padrão do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona o token JWT às requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funções de autenticação
export const authService = {
  // Login com e-mail e senha
  async login(email: string, password: string): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await api.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Cadastro de novo usuário
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await api.post('/register', userData);
    return response.data;
  },

  // Solicitação de recuperação de senha
  async forgotPassword(email: string) {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },

  // Redefinição de senha
  async resetPassword(token: string, password: string) {
    const response = await api.post('/reset-password', { token, password });
    return response.data;
  },

  // Verificação de e-mail
  async verifyEmail(token: string) {
    const response = await api.get(`/verify-email/${token}`);
    return response.data;
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obter usuário atual
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) as User : null;
  },

  // Verificar se o usuário está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Atualizar token
  async refreshToken() {
    const response = await api.post<{ token: string }>('/refresh-token');
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
};

export default api;
