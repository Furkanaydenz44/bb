import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { Modal } from '../../components/Modal';
import { StatusBadge } from '../../components/StatusBadge';
import { imageSrc } from '../../data/images';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { offerCreditCost } from '../../lib/credits';
import { demandPath, userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';

export function PresentationDetailPage() {
  const { username = '@ahmetsafak', demandSlug = '', presentationId = '' } = useParams();
  const routeUser = getUser(username);
  const navigate = useNavigate();
  const [offering, setOffering] = useState(false);
  const [offerPrice, setOfferPrice] = useState(0);
  const [offerNote, setOfferNote] = useState('');
  const { getDemandByRoute, getPresentation, requestOffer, rejectPresentation, sendOffer, creditsOf, getOfferForPresentation, findThread } =
    useAppData();
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

  const offer = getOfferForPresentation(presentation.id);
  const cost = offerCreditCost(demand, buyer.score);
  const balance = creditsOf(routeUser.id);

  function submitOffer() {
    if (offerPrice <= 0) return;
    const created = sendOffer({ presentationId: presentation.id, price: offerPrice, note: offerNote }, routeUser.id);
    setOffering(false);
    setOfferNote('');
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
          {status === 'offer_requested' ? (
            <StatusBadge tone="green">{offer ? 'Teklif verildi · sohbet açık' : 'Teklif istendi'}</StatusBadge>
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
              <span>Teklif iste → satıcı teklif verir → sohbet → pazarlık → kargo.</span>
            </div>
          </div>
        </div>

        <aside className="action-panel">
          <span className="eyebrow">Alıcı bütçesi</span>
          <strong className="hero-price">{formatPrice(demand.price)}</strong>
          <p>Beğendiğin sunumdan teklif iste; satıcı krediyle resmi teklif verince sohbet açılır.</p>
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
              <button className="button primary wide" type="button" onClick={() => requestOffer(presentation.id, routeUser.id)}>
                <Icon name="Handshake" size={17} />
                Teklif İste
              </button>
              <button className="button ghost wide" type="button" onClick={() => rejectPresentation(presentation.id, routeUser.id)}>
                <Icon name="X" size={17} />
                Reddet
              </button>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--muted)' }}>
                Beğendiğin sunumdan teklif iste; satıcı resmi fiyatını verir.
              </p>
            </>
          ) : null}

          {isBuyer && status === 'offer_requested' && !offer ? (
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--muted)' }}>
              Teklif istedin — satıcının resmi teklifi bekleniyor.
            </p>
          ) : null}

          {isSeller && status === 'offer_requested' && !offer ? (
            <>
              <button
                className="button primary wide"
                type="button"
                disabled={balance < cost}
                onClick={() => {
                  setOfferPrice(demand.price);
                  setOffering(true);
                }}
              >
                <Icon name="Handshake" size={17} />
                Resmi Teklif Ver · {cost} kredi
              </button>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: balance < cost ? '#b5462e' : 'var(--muted)' }}>
                {balance < cost
                  ? `Kredin yetersiz (${balance}/${cost}). Kredi yalnız ilk teklifte ödenir; pazarlık ücretsiz.`
                  : `Bakiyen ${balance} kredi. Teklif maliyeti ${cost} kredi (ilanda 1 kez); revize/pazarlık ücretsiz.`}
              </p>
            </>
          ) : null}

          {offer && thread ? (
            <Link className="button primary wide" to={`${messagesBase}/${thread.id}`}>
              <Icon name="MessageCircle" size={17} />
              Sohbete Git
            </Link>
          ) : null}

          {isSeller && status === 'submitted' ? (
            <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--muted)' }}>
              Sunumun iletildi. Alıcı teklif isterse, krediyle resmi teklifini verirsin ve sohbet açılır.
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

      <Modal
        open={offering}
        onClose={() => setOffering(false)}
        title="Resmi Teklif Ver"
        footer={
          <>
            <button type="button" className="button ghost" onClick={() => setOffering(false)}>
              Vazgeç
            </button>
            <button type="button" className="button primary" disabled={offerPrice <= 0} onClick={submitOffer}>
              <Icon name="Handshake" size={16} /> Teklif Gönder · {cost} kredi
            </button>
          </>
        }
      >
        <div className="present-form">
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--muted)' }}>
            Alıcının ilan fiyatı <b style={{ color: 'var(--ink)' }}>{formatPrice(demand.price)}</b>. Resmi teklifini gir — bu bedel <b style={{ color: 'var(--ink)' }}>{cost} kredi</b> (yalnız ilk teklifte; pazarlık ücretsiz). Bakiyen: {balance} kredi.
          </p>
          <label className="present-field">
            <span>Teklif fiyatı (₺)</span>
            <input
              inputMode="numeric"
              value={offerPrice || ''}
              onChange={(event) => setOfferPrice(Number(event.target.value.replace(/[^0-9]/g, '')) || 0)}
              placeholder={String(demand.price)}
            />
          </label>
          <label className="present-field">
            <span>Not (opsiyonel)</span>
            <textarea value={offerNote} onChange={(event) => setOfferNote(event.target.value)} rows={2} placeholder="Teslimat, pazarlık payı…" />
          </label>
        </div>
      </Modal>
    </div>
  );
}
