import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Extensão da interface ServerOptions para incluir allowedHosts
import type { ServerOptions } from 'vite';
declare module 'vite' {
  interface ServerOptions {
    allowedHosts?: string[];
  }
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    cors: true,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000
    },
    watch: {
      usePolling: true
    },
    allowedHosts: [
      'impendent-salic-song.ngrok-free.dev',
      'localhost',
      '127.0.0.1'
    ],
    proxy: {
      // Configuração para evitar problemas de CORS
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  // Configuração para o build de produção
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  // Configuração de preview
  preview: {
    port: 3000,
    host: true,
    cors: true,
    strictPort: true,
  },
});
