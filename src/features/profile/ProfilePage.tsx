import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { getDemands, getUser } from '../../services/catalogService';
import { demandPath, userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';

export function ProfilePage() {
  const { username = '@ahmetsafak' } = useParams();
  const user = getUser(username);
  const ownedDemands = getDemands().filter((demand) => demand.ownerId === user.id);
  const totalBudget = ownedDemands.reduce((sum, demand) => sum + demand.price, 0);

  return (
    <div className="page-stack">
      <PageHeader
        title="Profil"
        description="Güven sinyalleri, işlem performansı ve kullanıcıya bağlı ilan görünümü."
        actions={
          <Link className="button ghost" to={`${userBase(user.username)}/kredi`}>
            <Icon name="WalletCards" size={17} />
            Krediler
          </Link>
        }
      />

      <section className="profile-hero">
        <Avatar label={user.avatar} size="lg" />
        <div>
          <span className="eyebrow">@{user.username}</span>
          <h1>{user.name}</h1>
          <p>{user.city} · {user.responseTime} ortalama yanıt · {user.completionRate}% tamamlama</p>
        </div>
        <StatusBadge tone="green">{user.score} / 5 puan</StatusBadge>
      </section>

      <section className="insight-strip">
        <div>
          <span>İşlem</span>
          <strong>{user.sales}</strong>
        </div>
        <div>
          <span>Değerlendirme</span>
          <strong>{user.reviews}</strong>
        </div>
        <div>
          <span>Kredi</span>
          <strong>{user.credits}</strong>
        </div>
        <div>
          <span>Talep bütçesi</span>
          <strong>{formatPrice(totalBudget)}</strong>
        </div>
      </section>

      <section className="workbench two-column">
        <div className="main-column">
          <div className="section-heading">
            <div>
              <h2>Kullanıcının talepleri</h2>
              <p>URL’deki kullanıcı adına bağlı açık ilanlar.</p>
            </div>
            <span className="muted-count">{ownedDemands.length} ilan</span>
          </div>
          <div className="opportunity-list">
            {ownedDemands.length ? (
              ownedDemands.map((demand) => (
                <Link key={demand.id} className="opportunity-row" to={demandPath(user.username, demand)}>
                  <div>
                    <strong>{demand.title}</strong>
                    <span>{demand.city} · {demand.badge}</span>
                  </div>
                  <b>{formatPrice(demand.price)}</b>
                  <Icon name="ChevronRight" size={18} />
                </Link>
              ))
            ) : (
              <div className="empty-inline">
                <Icon name="Inbox" size={22} />
                <span>Bu kullanıcıya bağlı açık talep yok.</span>
              </div>
            )}
          </div>
        </div>

        <aside className="rail-panel">
          <div className="rail-section">
            <span className="eyebrow">Güven sinyalleri</span>
            <h3>Profil güven puanı ile teklif dönüşünü artırır.</h3>
          </div>
          <div className="trust-list">
            {user.trustSignals.map((signal) => (
              <span key={signal}>
                <Icon name="BadgeCheck" size={15} />
                {signal}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
