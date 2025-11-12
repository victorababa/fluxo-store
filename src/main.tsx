import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { store } from './store';
import { loadCart } from './store/slices/cartSlice';
import { AppProviders } from './providers';

// Carregar o carrinho do localStorage imediatamente
if (typeof window !== 'undefined') {
  store.dispatch(loadCart() as any);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>);
