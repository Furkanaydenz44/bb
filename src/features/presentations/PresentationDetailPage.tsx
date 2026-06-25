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
          Talebe Dön
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
    if (!presentation || offerPrice <= 0) return;
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
          <span className="pres-page-title">Ürün Sunumu</span>
          <hr className="pres-page-title-divider" />
          <h1>{demand.title}</h1>
          <hr className="pres-page-title-divider" />
          <p>{presentation.description}</p>


        </div>

        <aside className="action-panel">
          <div className="pres-seller-info">
            <span className="pres-seller-avatar">{seller.avatar}</span>
            <div className="pres-seller-stats">
              <strong className="pres-seller-name">{seller.name}</strong>
              <div className="pres-seller-metrics">
                <span><strong>{seller.score}</strong> puan</span>
                <span><strong>{seller.sales}</strong> işlem</span>
              </div>
            </div>
          </div>
          <section className="detail-price-pill">
            <div className="detail-price-pill-top">
              <span className="detail-price-pill-label">Alıcının Ortalama Fiyat Beklentisi</span>
            </div>
            <div className="detail-price-pill-bottom">
              <div className="detail-price-pill-value">{formatPrice(demand.price)}</div>
            </div>
          </section>

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
              <div className="pres-offer-requested-badge">
                <span className="pres-offer-dot" />
                Alıcı sunumu beğendi ve teklif talep etti
              </div>
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
