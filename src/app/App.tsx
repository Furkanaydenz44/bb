import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { DemandListPage } from '../features/demands/DemandListPage';
import { DemandDetailPage } from '../features/demands/DemandDetailPage';
import { PresentationDetailPage } from '../features/presentations/PresentationDetailPage';
import { ExplorePage } from '../features/demands/ExplorePage';
import { CreateDemandPage } from '../features/create-demand/CreateDemandPage';
import { MessagesPage } from '../features/messages/MessagesPage';
import { ProfilePage } from '../features/profile/ProfilePage';
import { CreditsPage } from '../features/credits/CreditsPage';
import { CreditCalculatorPage } from '../features/credits/CreditCalculatorPage';
import { LoginPage } from '../features/auth/LoginPage';
import { getCurrentUser } from '../services/session';
import { userBase } from '../utils/routes';

function RootRedirect() {
  const current = getCurrentUser();
  return <Navigate to={current ? userBase(current.username) : '/giris'} replace />;
}

export function App() {
  return (
    <Routes>
      <Route path="/giris" element={<LoginPage />} />
      <Route path="/" element={<RootRedirect />} />
      <Route path="/bulbana-web" element={<RootRedirect />} />
      <Route path="/bulbana-web/:username" element={<AppLayout />}>
        <Route index element={<DemandListPage />} />
        <Route path="kategori/:categoryId" element={<DemandListPage />} />
        <Route path="kesfet" element={<ExplorePage />} />
        <Route path="talep-ac" element={<CreateDemandPage />} />
        <Route path="ilan/:demandSlug" element={<DemandDetailPage />} />
        <Route path="ilan/:demandSlug/sunum/:presentationId" element={<PresentationDetailPage />} />
        <Route path="mesajlar" element={<MessagesPage />} />
        <Route path="mesajlar/:threadId" element={<MessagesPage />} />
        <Route path="profil" element={<ProfilePage />} />
        <Route path="kredi" element={<CreditsPage />} />
        <Route path="araclar/teklif-kredisi" element={<CreditCalculatorPage />} />
      </Route>
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
