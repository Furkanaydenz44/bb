import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { StatusBadge } from '../../components/StatusBadge';
import { unsplash } from '../../data/images';
import { getDemandBySlug, getPresentation, getUser, offerCreditEstimate } from '../../services/catalogService';
import { demandPath, userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';

export function PresentationDetailPage() {
  const { username = '@ahmetsafak', demandSlug = '', presentationId = '' } = useParams();
  const routeUser = getUser(username);
  const demand = getDemandBySlug(demandSlug);
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
  const creditEstimate = offerCreditEstimate(demand.price, demand.categoryId);

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
          <img className="presentation-cover" src={unsplash(presentation.coverImage, 1120)} alt={demand.title} />
          <div className="media-strip">
            {presentation.images.map((imageId) => (
              <img key={imageId} src={unsplash(imageId, 220)} alt="" />
            ))}
          </div>
        </div>

        <div className="presentation-content">
          <StatusBadge tone="green">Sunuldu · İnceleniyor</StatusBadge>
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
              <Icon name="CreditCard" size={17} />
              <strong>Teklif maliyeti</strong>
              <span>Resmi teklif isteği yaklaşık {creditEstimate} kredi.</span>
            </div>
          </div>
        </div>

        <aside className="action-panel">
          <span className="eyebrow">Alıcı bütçesi</span>
          <strong className="hero-price">{formatPrice(demand.price)}</strong>
          <p>Alıcı ürünü uygun bulursa resmi teklif akışı başlar.</p>
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
              <strong>{creditEstimate}</strong>
              <span>kredi</span>
            </div>
          </div>
          <button className="button primary wide" type="button">
            <Icon name="Handshake" size={17} />
            Resmi Teklif İste
          </button>
          <button className="button ghost wide" type="button">
            <Icon name="MessageCircle" size={17} />
            Satıcıya Mesaj Yaz
          </button>
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
