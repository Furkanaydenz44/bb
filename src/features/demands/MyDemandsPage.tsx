import { Link, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { userBase } from '../../utils/routes';
import { DemandCard } from './DemandCard';

export function MyDemandsPage() {
  const { username = '@ahmetsafak' } = useParams();
  const activeUser = getUser(username);
  const { demands } = useAppData();
  const base = userBase(activeUser.username);
  const myDemands = demands.filter((demand) => demand.ownerId === activeUser.id);

  return (
    <div className="page-stack">
      <PageHeader
        title="Taleplerim"
        actions={
          <Link className="button primary" to={`${base}/talep-ac`}>
            <Icon name="Plus" size={17} />
            Yeni Talep
          </Link>
        }
      />

      <div className="section-heading">
        <div>
          <h2>Mevcut Taleplerim</h2>
        </div>
        <span className="muted-count">{myDemands.length} talep</span>
      </div>
      {myDemands.length ? (
        <section className="demand-grid">
          {myDemands.map((demand) => (
            <DemandCard key={demand.id} demand={demand} />
          ))}
        </section>
      ) : (
        <div className="empty-inline">Henüz bir talep açmadın.</div>
      )}
    </div>
  );
}
