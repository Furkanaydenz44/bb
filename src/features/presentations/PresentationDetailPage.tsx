import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { StatusBadge } from '../../components/StatusBadge';
import { imageSrc } from '../../data/images';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { demandPath, userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';

export function PresentationDetailPage() {
  const { username = '@ahmetsafak', demandSlug = '', presentationId = '' } = useParams();
  const routeUser = getUser(username);
  const navigate = useNavigate();
  const { getDemandByRoute, getPresentation, approvePresentation, rejectPresentation, findThread } = useAppData();
  const demand = getDemandByRoute(demandSlug);
  const presentation = getPresentation(presentationId.replace(/^@/, ''));

  if (!demand || !presentation || presentation.demandId !== demand.id) {
    return (
      <div className="empty-state">
        <Icon name="Inbox" size={28} />
        <h1>Sunum bulunamadı</h1>
        <p>Bu sunum kaldırılmış olabilir ya da talep ile eşleşmiyor.</p>
        <Link className="button primary" to={demand ? demandPath(routeUser.username, demand) : userBase(routeUser.username)}>
          İlan Detayına Dön
        </Link>
      </div>
    );
  }

  const buyer = getUser(demand.ownerId);
  const seller = getUser(presentation.sellerId);
  const isBuyer = routeUser.id === demand.ownerId;
  const isSeller = routeUser.id === presentation.sellerId;
  const status = presentation.status;
  const thread = findThread(demand.id, demand.ownerId, presentation.sellerId);
  const messagesBase = `${userBase(routeUser.username)}/mesajlar`;

  function approve() {
    const created = approvePresentation(presentation.id, routeUser.id);
    if (created) navigate(`${messagesBase}/${created.id}`);
  }

  return (
    <div className="page-stack">
      <div className="detail-topline">
        <Link className="back-link" to={demandPath(routeUser.username, demand)}>
          <Icon name="ArrowLeft" size={17} />
          Talebe dön
        </Link>
        <div className="breadcrumb-lite">
          <Link to={userBase(routeUser.username)}>@{buyer.username}</Link>
          <span>/ sunum /</span>
          <Link to={userBase(routeUser.username)}>@{seller.username}</Link>
        </div>
      </div>

      <section className="presentation-layout">
        <div className="presentation-media">
          <img className="presentation-cover" src={imageSrc(presentation.coverImage, 1120)} alt={demand.title} />
          <div className="media-strip">
            {presentation.images.map((imageId, index) => (
              <img key={index} src={imageSrc(imageId, 220)} alt="" />
            ))}
          </div>
        </div>

        <div className="presentation-content">
          {status === 'approved' ? (
            <StatusBadge tone="green">Onaylandı · sohbet açık</StatusBadge>
          ) : status === 'rejected' ? (
            <StatusBadge tone="warning">Reddedildi</StatusBadge>
          ) : (
            <StatusBadge tone="purple">Sunuldu · inceleniyor</StatusBadge>
          )}
          <h1>{demand.title}</h1>
          <p>{presentation.description}</p>

          <div className="seller-panel">
            <Avatar label={seller.avatar} size="lg" />
            <div>
              <span>Satıcı</span>
              <strong>{seller.name}</strong>
              <small>@{seller.username} · {seller.city} · {seller.responseTime} yanıt</small>
            </div>
            <StatusBadge tone="purple">{seller.completionRate}% tamamlama</StatusBadge>
          </div>

          <div className="criteria-grid">
            <div>
              <Icon name="PackageCheck" size={17} />
              <strong>Ürün durumu</strong>
              <span>{presentation.condition}</span>
            </div>
            <div>
              <Icon name="Image" size={17} />
              <strong>Kanıt seti</strong>
              <span>{presentation.images.length} görsel · {presentation.videos} video</span>
            </div>
            <div>
              <Icon name="MapPin" size={17} />
              <strong>Konum</strong>
              <span>{presentation.city} teslimat opsiyonu</span>
            </div>
            <div>
              <Icon name="ShieldCheck" size={17} />
              <strong>Akış</strong>
              <span>Onay → sohbet → resmi teklif → pazarlık → kargo.</span>
            </div>
          </div>
        </div>

        <aside className="action-panel">
          <span className="eyebrow">Alıcı bütçesi</span>
          <strong className="hero-price">{formatPrice(demand.price)}</strong>
          <p>Görselleri onaylarsan satıcıyla sohbet açılır ve resmi teklif akışı başlar.</p>
          <div className="action-metrics">
            <div>
              <strong>{seller.score}</strong>
              <span>puan</span>
            </div>
            <div>
              <strong>{seller.sales}</strong>
              <span>işlem</span>
            </div>
            <div>
              <strong>{presentation.images.length}</strong>
              <span>görsel</span>
            </div>
          </div>

          {isBuyer && status === 'submitted' ? (
            <>
              <button className="button primary wide" type="button" onClick={approve}>
                <Icon name="CheckCircle2" size={17} />
                Görselleri Onayla
              </button>
              <button className="button ghost wide" type="button" onClick={() => rejectPresentation(presentation.id, routeUser.id)}>
                <Icon name="X" size={17} />
                Reddet
              </button>
            </>
          ) : null}

          {status === 'approved' && thread ? (
            <Link className="button primary wide" to={`${messagesBase}/${thread.id}`}>
              <Icon name="MessageCircle" size={17} />
              Sohbete Git
            </Link>
          ) : null}

          {isSeller && status === 'submitted' ? (
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--muted)' }}>
              Sunumun iletildi. Alıcı görselleri onaylarsa sohbet açılır ve resmi teklifini verebilirsin.
            </p>
          ) : null}

          {status === 'rejected' ? (
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--muted)' }}>Alıcı bu sunumu beğenmedi.</p>
          ) : null}

          <div className="trust-list">
            {seller.trustSignals.map((signal) => (
              <span key={signal}>
                <Icon name="CheckCircle2" size={15} />
                {signal}
              </span>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
