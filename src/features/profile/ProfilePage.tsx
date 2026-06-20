import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { imageSrc } from '../../data/images';
import { getDemands, getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { demandPath, userBase } from '../../utils/routes';
import { formatPrice, locationLabel } from '../../utils/format';

export function ProfilePage() {
  const { username = '@ahmetsafak' } = useParams();
  const user = getUser(username);
  const { creditsOf } = useAppData();
  const ownedDemands = getDemands().filter((demand) => demand.ownerId === user.id);
  const totalBudget = ownedDemands.reduce((sum, demand) => sum + demand.price, 0);
  const base = userBase(user.username);

  const stats = [
    { value: String(user.sales), label: 'İşlem' },
    { value: String(user.reviews), label: 'Değerlendirme' },
    { value: `%${user.completionRate}`, label: 'Tamamlama' },
    { value: String(creditsOf(user.id)), label: 'Kredi' },
    { value: formatPrice(totalBudget), label: 'Bütçe' },
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

      <div className="pf">
        <div className="pf-id">
          <Avatar label={user.avatar} size="lg" />
          <div className="pf-id-main">
            <h1>{user.name}</h1>
            <div className="pf-id-sub">
              <span>@{user.username}</span>
              <span className="pf-dot">·</span>
              <span className="pf-star"><Icon name="Star" size={14} /> {user.score}</span>
              <span className="pf-dot">·</span>
              <span className="pf-city"><Icon name="MapPin" size={13} /> {user.city}</span>
            </div>
            <div className="pf-id-meta">{user.responseTime} ortalama yanıt · %{user.completionRate} tamamlama</div>
            {user.trustSignals.length ? (
              <div className="pf-trust">
                {user.trustSignals.map((signal) => (
                  <span key={signal} className="pf-chip">
                    <Icon name="BadgeCheck" size={13} />
                    {signal}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="pf-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="pf-stat">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="pf-block">
          <div className="pf-block-head">
            <h2>Talepleri</h2>
            <span className="muted-count">{ownedDemands.length} ilan</span>
          </div>
          {ownedDemands.length ? (
            <div className="pf-talep-list">
              {ownedDemands.map((demand) => (
                <Link key={demand.id} className="pf-talep-row" to={demandPath(user.username, demand)}>
                  <img className="pf-talep-thumb" src={imageSrc(demand.coverImage, 220)} alt="" />
                  <div className="pf-talep-info">
                    <strong>{demand.title}</strong>
                    <span>{locationLabel(demand.city, demand.district)}</span>
                  </div>
                  <b className="pf-talep-price">{formatPrice(demand.price)}</b>
                  <Icon name="ChevronRight" size={18} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="pf-empty">Bu kullanıcıya bağlı açık talep yok.</div>
          )}
        </div>
      </div>
    </div>
  );
}
