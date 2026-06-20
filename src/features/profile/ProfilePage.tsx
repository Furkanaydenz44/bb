import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { getDemands, getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';
import { DemandCard } from '../demands/DemandCard';

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

      <div className="prof-grid">
        {/* Sol: dikey kimlik kartı + hesap özeti */}
        <aside className="prof-side">
          <section className="prof-card">
            <div className="prof-card-cover" aria-hidden="true" />
            <div className="prof-card-body">
              <Avatar label={user.avatar} size="lg" />
              <h1>{user.name}</h1>
              <span className="prof-card-handle">@{user.username}</span>
              <div className="prof-card-rating">
                <Icon name="Star" size={15} /> {user.score}
                <span>· {user.reviews} değerlendirme</span>
              </div>
              <div className="prof-card-meta">
                <span><Icon name="MapPin" size={14} /> {user.city}</span>
                <span><Icon name="Clock" size={14} /> {user.responseTime} ortalama yanıt</span>
                <span><Icon name="BadgeCheck" size={14} /> %{user.completionRate} tamamlama</span>
              </div>
              {user.trustSignals.length ? (
                <div className="prof-card-trust">
                  {user.trustSignals.map((signal) => (
                    <span key={signal} className="prof-chip">
                      <Icon name="BadgeCheck" size={13} />
                      {signal}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="prof-card-stats">
                <div>
                  <strong>{credits}</strong>
                  <span>Kredi</span>
                </div>
                <div>
                  <strong>{formatPrice(totalBudget)}</strong>
                  <span>Bütçe</span>
                </div>
                <div>
                  <strong>{ownedDemands.length}</strong>
                  <span>İlan</span>
                </div>
              </div>

              <Link className="button ghost wide prof-card-cta" to={`${base}/kredi`}>
                <Icon name="WalletCards" size={16} />
                Kredi yönet
              </Link>
            </div>
          </section>
        </aside>

        {/* Sağ: performans + talepler */}
        <div className="prof-main">
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

          <section className="prof-panel">
            <div className="prof-panel-head">
              <h2>Kullanıcının talepleri</h2>
              <span className="muted-count">{ownedDemands.length} ilan</span>
            </div>
            {ownedDemands.length ? (
              <div className="demand-grid">
                {ownedDemands.map((demand) => (
                  <DemandCard key={demand.id} demand={demand} />
                ))}
              </div>
            ) : (
              <div className="empty-inline">
                <Icon name="Inbox" size={22} />
                <span>Bu kullanıcıya bağlı açık talep yok.</span>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
