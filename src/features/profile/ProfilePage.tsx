import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { getDemands, getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { demandPath, userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';

export function ProfilePage() {
  const { username = '@ahmetsafak' } = useParams();
  const user = getUser(username);
  const { creditsOf } = useAppData();
  const ownedDemands = getDemands().filter((demand) => demand.ownerId === user.id);
  const totalBudget = ownedDemands.reduce((sum, demand) => sum + demand.price, 0);
  const base = userBase(user.username);

  const stats = [
    { label: 'İşlem', value: String(user.sales), icon: 'Handshake' as const },
    { label: 'Değerlendirme', value: String(user.reviews), icon: 'Star' as const },
    { label: 'Kredi', value: String(creditsOf(user.id)), icon: 'WalletCards' as const },
    { label: 'Talep bütçesi', value: formatPrice(totalBudget), icon: 'CircleDollarSign' as const },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        title="Profil"
        description="Güven sinyalleri, işlem performansı ve kullanıcıya bağlı ilan görünümü."
        actions={
          <Link className="button ghost" to={`${base}/kredi`}>
            <Icon name="WalletCards" size={17} />
            Krediler
          </Link>
        }
      />

      <section className="prof-hero">
        <div className="prof-id">
          <Avatar label={user.avatar} size="lg" />
          <div className="prof-id-main">
            <span className="prof-handle">@{user.username}</span>
            <h1>{user.name}</h1>
            <p className="prof-meta">
              <span><Icon name="MapPin" size={14} /> {user.city}</span>
              <span><Icon name="Clock" size={14} /> {user.responseTime} yanıt</span>
              <span><Icon name="BadgeCheck" size={14} /> %{user.completionRate} tamamlama</span>
            </p>
          </div>
          <div className="prof-rating">
            <strong><Icon name="Star" size={16} /> {user.score}</strong>
            <span>{user.reviews} değerlendirme</span>
          </div>
        </div>

        {user.trustSignals.length ? (
          <div className="prof-trust">
            <span className="prof-trust-label">Güven sinyalleri</span>
            {user.trustSignals.map((signal) => (
              <span key={signal} className="prof-chip">
                <Icon name="BadgeCheck" size={14} />
                {signal}
              </span>
            ))}
          </div>
        ) : null}
      </section>

      <section className="prof-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="prof-stat">
            <span className="prof-stat-ic">
              <Icon name={stat.icon} size={18} />
            </span>
            <div>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="prof-block">
        <div className="section-heading">
          <div>
            <h2>Kullanıcının talepleri</h2>
            <p>Bu kullanıcı adına bağlı açık ilanlar.</p>
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
      </section>
    </div>
  );
}
