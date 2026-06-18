'use client';

// GEÇİCİ MİGRASYON KÖPRÜSÜ:
// Mevcut react-router + demo store uygulamasını Next içinde client-only mount eder,
// böylece tüm sayfalar 3100'de gezilebilir kalır. Sayfalar gerçek Next route'larına +
// Supabase'e taşındıkça bu köprü kaldırılacak.
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AppDataProvider } from '../store/appData';

export default function SpaApp() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <App />
      </AppDataProvider>
    </BrowserRouter>
  );
}
