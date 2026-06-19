import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon, type IconName } from '../../components/Icon';
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
  const credits = creditsOf(user.id);

  const metrics: Array<{ icon: IconName; value: string; label: string }> = [
    { icon: 'Star', value: String(user.score), label: 'Puan' },
    { icon: 'Handshake', value: String(user.sales), label: 'İşlem' },
    { icon: 'MessageCircle', value: String(user.reviews), label: 'Değerlendirme' },
    { icon: 'Clock', value: user.responseTime, label: 'Ort. yanıt' },
  ];
  const summary: Array<{ icon: IconName; label: string; value: string }> = [
    { icon: 'WalletCards', label: 'Kredi', value: String(credits) },
    { icon: 'CircleDollarSign', label: 'Talep bütçesi', value: formatPrice(totalBudget) },
    { icon: 'Inbox', label: 'Aktif ilan', value: String(ownedDemands.length) },
    { icon: 'MapPin', label: 'Şehir', value: user.city },
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
        <div className="prof-cover" aria-hidden="true" />
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

      <div className="prof-grid">
        <div className="prof-col-main">
          <section className="prof-panel">
            <div className="prof-panel-head">
              <h2>Performans</h2>
              <span className="muted-count">güven & hız</span>
            </div>
            <div className="prof-perf">
              <div className="prof-ring" style={{ '--pct': user.completionRate } as CSSProperties}>
                <div className="prof-ring-c">
                  <strong>{user.completionRate}<small>%</small></strong>
                  <span>Tamamlama</span>
                </div>
              </div>
              <div className="prof-perf-metrics">
                {metrics.map((m) => (
                  <div key={m.label} className="prof-metric">
                    <span className="prof-metric-ic"><Icon name={m.icon} size={16} /></span>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
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

        <aside className="prof-col-side">
          <section className="prof-panel">
            <div className="prof-panel-head">
              <h2>Hesap özeti</h2>
            </div>
            <ul className="prof-summary">
              {summary.map((s) => (
                <li key={s.label}>
                  <span className="prof-sum-ic"><Icon name={s.icon} size={16} /></span>
                  <span className="prof-sum-l">{s.label}</span>
                  <b>{s.value}</b>
                </li>
              ))}
            </ul>
            <Link className="button ghost wide" to={`${base}/kredi`}>
              <Icon name="WalletCards" size={16} />
              Kredi yönet
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
