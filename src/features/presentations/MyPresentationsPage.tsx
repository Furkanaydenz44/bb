import { Link, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { formatPrice, locationLabel } from '../../utils/format';
import { presentationPath } from '../../utils/routes';
import type { PresentationStatus } from '../../data/types';

const STATUS_LABEL: Record<PresentationStatus, string> = {
  submitted: 'İnceleniyor',
  offer_requested: 'Teklif İstendi',
};

const STATUS_TONE: Record<PresentationStatus, 'purple' | 'green'> = {
  submitted: 'purple',
  offer_requested: 'green',
};

export function MyPresentationsPage() {
  const { username = '@ahmetsafak' } = useParams();
  const activeUser = getUser(username);
  const { presentations, demands } = useAppData();
  const myPresentations = presentations.filter((presentation) => presentation.sellerId === activeUser.id);

  return (
    <div className="page-stack">
      <PageHeader title="Sunumlarım" description="Alıcı taleplerine yaptığın sunumlar ve durumları." />

      <div className="section-heading">
        <div>
          <h2>Sunumlarım</h2>
        </div>
        <span className="muted-count">{myPresentations.length} sunum</span>
      </div>
      {myPresentations.length ? (
        <div className="opportunity-list">
          {myPresentations.map((presentation) => {
            const demand = demands.find((d) => d.id === presentation.demandId);
            if (!demand) return null;
            return (
              <Link
                key={presentation.id}
                className="opportunity-row opportunity-row-pres"
                to={presentationPath(activeUser.username, demand, presentation.id)}
              >
                <div>
                  <strong>{demand.title}</strong>
                  <span>{locationLabel(demand.city, demand.district)}</span>
                </div>
                <StatusBadge tone={STATUS_TONE[presentation.status]}>{STATUS_LABEL[presentation.status]}</StatusBadge>
                <b>{formatPrice(demand.price)}</b>
                <Icon name="ChevronRight" size={18} />
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="empty-inline">Henüz bir sunum yapmadın.</div>
      )}
    </div>
  );
}
