import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { Modal } from '../../components/Modal';
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
  const [offering, setOffering] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [offerNote, setOfferNote] = useState('');
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const {
    getDemandByRoute,
    getPresentation,
    requestOffer,
    rejectPresentation,
    cancelPresentation,
    sendOffer,
    getOfferForPresentation,
    getDealForPresentation,
    findThread,
  } = useAppData();
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

  const seller = getUser(presentation.sellerId);
  const isBuyer = routeUser.id === demand.ownerId;
  const isSeller = routeUser.id === presentation.sellerId;
  const status = presentation.status;
  const thread = findThread(demand.id, demand.ownerId, presentation.sellerId);
  const messagesBase = `${userBase(routeUser.username)}/mesajlar`;

  const offer = getOfferForPresentation(presentation.id);
  const dealForPres = getDealForPresentation(presentation.id);
  const canCancel = isSeller && !dealForPres;

  function submitOffer() {
    if (!presentation || offerPrice <= 0) return;
    const created = sendOffer({ presentationId: presentation.id, price: offerPrice, note: offerNote }, routeUser.id);
    setOffering(false);
    setOfferNote('');
    if (created) navigate(`${messagesBase}/${created.id}`);
  }

  function confirmCancelPresentation() {
    if (!demand || !presentation) return;
    const removed = cancelPresentation(presentation.id, routeUser.id);
    setCancelConfirmOpen(false);
    if (removed) navigate(demandPath(routeUser.username, demand));
  }

  return (
    <div className="page-stack">
      <div className="detail-topline">
        <Link className="back-link" to={demandPath(routeUser.username, demand)}>
          <Icon name="ArrowLeft" size={17} />
          Talebe dön
        </Link>
      </div>

      <section className="presentation-layout">
        <div className="presentation-media">
          {(() => {
            const allImages = Array.from(new Set([presentation.coverImage, ...presentation.images]));
            const safeIdx = Math.min(activeIdx, allImages.length - 1);
            return (
              <>
                <img
                  className="presentation-cover"
                  src={imageSrc(allImages[safeIdx], 1120)}
                  alt={demand.title}
                  onClick={() => setLightboxSrc(allImages[safeIdx])}
                  style={{ cursor: 'zoom-in' }}
                />
                {allImages.length > 1 && (
                  <div className="media-strip">
                    {allImages.map((imageId, index) => (
                      <img
                        key={index}
                        src={imageSrc(imageId, 220)}
                        alt=""
                        onClick={() => setActiveIdx(index)}
                        style={{ cursor: 'pointer', outline: index === safeIdx ? '2px solid var(--primary)' : 'none', borderRadius: 4 }}
                      />
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>

        <div className="presentation-content">
          <span className="pres-page-eyebrow">Ürün Sunumu</span>
          <h1>{demand.title}</h1>
          <p>{presentation.description}</p>
          <div className="pres-condition-chip">
            <Icon name="PackageCheck" size={14} />
            <span>Ürün durumu:</span>
            <strong>{presentation.condition}</strong>
          </div>
          <div className="pres-condition-chip">
            <Icon name="Calendar" size={14} />
            <span>Yıl:</span>
            <strong>{presentation.year ?? '—'}</strong>
          </div>
          <div className="pres-condition-chip">
            <Icon name="Eye" size={14} />
            <span>Renk:</span>
            <strong>{presentation.color ?? '—'}</strong>
          </div>
          <div className="pres-condition-chip">
            <Icon name="Eye" size={14} />
            <span>Ürün defosu:</span>
            <strong>{presentation.hasDefect ?? '—'}</strong>
          </div>
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
          <section className="pres-price-box">
            <span className="pres-price-box-label">Alıcının fiyat beklentisi</span>
            <div className="pres-price-box-value">{formatPrice(demand.price)}</div>
          </section>

          {isBuyer && status === 'submitted' ? (
            <>
              <button className="button primary wide" type="button" onClick={() => requestOffer(presentation.id, routeUser.id)}>
                <Icon name="Handshake" size={17} />
                Teklif İste
              </button>
              <button
                className="button ghost wide"
                type="button"
                onClick={() => {
                  rejectPresentation(presentation.id, routeUser.id);
                  navigate(demandPath(routeUser.username, demand));
                }}
              >
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
                onClick={() => {
                  setOfferPrice(demand.price);
                  setOffering(true);
                }}
              >
                <Icon name="Handshake" size={17} />
                Resmi Teklif Ver
              </button>
              <div className="pres-offer-requested-badge">
                <span className="pres-offer-dot" />
                Alıcı sunumu beğendi ve teklif talep etti
              </div>
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
              Sunumun iletildi. Alıcı teklif isterse, resmi teklifini verirsin ve sohbet açılır.
            </p>
          ) : null}

          {canCancel ? (
            <button type="button" className="button ghost wide pres-cancel-btn" onClick={() => setCancelConfirmOpen(true)}>
              <Icon name="X" size={17} />
              Sunumu İptal Et
            </button>
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
              <Icon name="Handshake" size={16} /> Teklif Gönder
            </button>
          </>
        }
      >
        <div className="present-form">
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--muted)' }}>
            Alıcının ilan fiyatı <b style={{ color: 'var(--ink)' }}>{formatPrice(demand.price)}</b>. Resmi teklifini gir — pazarlık ücretsizdir.
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

      {lightboxSrc ? (
        <div className="detail-photo-lightbox" onClick={() => setLightboxSrc(null)}>
          <button type="button" className="detail-photo-lightbox-x" onClick={() => setLightboxSrc(null)}>
            <Icon name="X" size={18} />
          </button>
          <img src={imageSrc(lightboxSrc, 1600)} alt={demand.title} />
        </div>
      ) : null}

      <Modal
        open={cancelConfirmOpen}
        onClose={() => setCancelConfirmOpen(false)}
        title="Sunumu iptal et"
        footer={
          <>
            <button type="button" className="button ghost" onClick={() => setCancelConfirmOpen(false)}>
              Vazgeç
            </button>
            <button type="button" className="button danger" onClick={confirmCancelPresentation}>
              Evet, iptal et
            </button>
          </>
        }
      >
        <p>Bu sunumu iptal etmek üzeresin. Bu işlem geri alınamaz ve sunum kaldırılır.</p>
      </Modal>
    </div>
  );
}
