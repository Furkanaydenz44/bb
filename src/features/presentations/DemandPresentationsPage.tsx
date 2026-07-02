import { Link, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { imageSrc } from '../../data/images';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { demandPath, presentationPath, userBase } from '../../utils/routes';

export function DemandPresentationsPage() {
  const { username = '@ahmetsafak', demandSlug = '' } = useParams();
  const routeUser = getUser(username);
  const { getDemandByRoute, getDemandPresentations } = useAppData();
  const demand = getDemandByRoute(demandSlug);

  if (!demand || demand.ownerId !== routeUser.id) {
    return (
      <div className="empty-state">
        <Icon name="Search" size={28} />
        <h1>Talep bulunamadı</h1>
        <p>Bu talep kaldırılmış olabilir ya da bu sunumları görüntüleme yetkin yok.</p>
        <Link className="button primary" to={userBase(routeUser.username)}>
          Taleplere Dön
        </Link>
      </div>
    );
  }

  const presentations = getDemandPresentations(demand.id);

  return (
    <div className="page-stack">
      <PageHeader
        title="Sunumlar"
        description={demand.title}
        actions={
          <Link className="button ghost" to={demandPath(routeUser.username, demand)}>
            <Icon name="ArrowLeft" size={16} />
            Talebe Dön
          </Link>
        }
      />

      <section className="pres-list-panel">
        <h2 className="pres-list-title">
          <Icon name="Inbox" size={20} />
          Sunumlar
          {presentations.length > 0 && <span className="pres-list-count">{presentations.length}</span>}
        </h2>
        {presentations.length === 0 ? (
          <div className="pres-list-empty">
            <Icon name="PackageOpen" size={28} />
            <p>Henüz sunum yok. Satıcılar ürün sunduğunda burada görünür.</p>
          </div>
        ) : (
          <div className="pres-list-grid">
            {presentations.map((pres) => {
              const seller = getUser(pres.sellerId);
              const statusTone = pres.status === 'offer_requested' ? 'green' : 'purple';
              const statusLabel = pres.status === 'offer_requested' ? 'Teklif İstendi' : 'İnceleniyor';
              return (
                <Link
                  key={pres.id}
                  className="pres-card"
                  to={presentationPath(routeUser.username, demand, pres.id)}
                >
                  <div className="pres-card-cover">
                    <img src={imageSrc(pres.coverImage, 400)} alt="" />
                  </div>
                  <div className="pres-card-body">
                    <div className="pres-card-seller">
                      <span className="pres-card-avatar">{seller.avatar}</span>
                      <div>
                        <strong>{seller.name}</strong>
                        <small>@{seller.username} · {seller.city}</small>
                      </div>
                    </div>
                    <p className="pres-card-desc">{pres.description}</p>
                    <div className="pres-card-meta">
                      <span><Icon name="PackageCheck" size={13} /> {pres.condition}</span>
                      <span><Icon name="Image" size={13} /> {pres.images.length} fotoğraf</span>
                    </div>
                  </div>
                  <div className="pres-card-status">
                    <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
                    <Icon name="ChevronRight" size={18} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
