import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { DemandCard } from './DemandCard';

export function FavoritesPage() {
  const { username = '@ahmetsafak' } = useParams();
  const activeUser = getUser(username);
  const { getUserFavoriteDemands } = useAppData();
  const favoriteDemands = getUserFavoriteDemands(activeUser.id);

  return (
    <div className="page-stack">
      <PageHeader title="Favorilerim" description="Kalp ile işaretlediğin talepler." />

      <div className="section-heading">
        <div>
          <h2>Favorilerim</h2>
        </div>
        <span className="muted-count">{favoriteDemands.length} talep</span>
      </div>
      {favoriteDemands.length ? (
        <section className="demand-grid">
          {favoriteDemands.map((demand) => (
            <DemandCard key={demand.id} demand={demand} />
          ))}
        </section>
      ) : (
        <div className="empty-inline">Henüz favorilere eklediğin bir talep yok.</div>
      )}
    </div>
  );
}
