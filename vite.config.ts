import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // ngrok/tünel paylaşımı için host kısıtını kaldır (yerel demo).
    // Daraltmak istersen: allowedHosts: ['.ngrok-free.app']
    allowedHosts: true,
  },
});
