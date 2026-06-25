import { useRef, useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { Modal } from '../../components/Modal';
import { imageSrc } from '../../data/images';
import { filesToDataUrls } from '../../lib/imageUpload';
import { getCategory, getUser, offerCreditEstimate } from '../../services/catalogService';
import { categoryPath, demandPath, presentationPath, userBase } from '../../utils/routes';
import { StatusBadge } from '../../components/StatusBadge';
import { formatPrice, locationLabel } from '../../utils/format';
import { useAppData } from '../../store/appData';

const TRUST_ITEMS: Array<{ icon: IconName; title: string; copy: string }> = [
  { icon: 'ShieldCheck', title: 'Sistem içi teklif', copy: 'Fiyat, pazarlık ve onay akışı kayıt altında ilerler.' },
  { icon: 'Camera', title: 'Kanıtlı sunum', copy: 'Fotoğraf, durum notu ve varsa video ile ürün doğrulanır.' },
  { icon: 'Truck', title: 'Kargo takibi', copy: 'Onay sonrası teslimat ve takip bilgisi sistemde tutulur.' },
];

const CONDITIONS = ['Sıfır (yeni)', 'Etiketli', 'Az kullanılmış', 'İkinci el · iyi durumda', 'İkinci el'];
const MIN_PHOTOS = 3;
const MAX_PHOTOS = 10;
const NOTE_MIN = 10;
const NOTE_MAX = 250;

export function DemandDetailPage() {
  const { username = '@ahmetsafak', demandSlug = '' } = useParams();
  const routeUser = getUser(username);
  const { getDemandByRoute, getDemandPresentations, getDemandOffers, createPresentation } = useAppData();
  const demand = getDemandByRoute(demandSlug);
  const [activeImage, setActiveImage] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [presentPhotos, setPresentPhotos] = useState<string[]>([]);
  const [presentVideos, setPresentVideos] = useState<string[]>([]);
  const [presentNote, setPresentNote] = useState('');
  const [presentCondition, setPresentCondition] = useState('İkinci el · iyi durumda');
  const presentFileRef = useRef<HTMLInputElement>(null);
  const presentVideoRef = useRef<HTMLInputElement>(null);

  if (!demand) {
    return (
      <div className="empty-state">
        <Icon name="Search" size={28} />
        <h1>Talep bulunamadı</h1>
        <p>Bu talep kaldırılmış olabilir ya da URL eksik yazılmıştır.</p>
        <Link className="button primary" to={userBase(routeUser.username)}>
          Taleplere Dön
        </Link>
      </div>
    );
  }

  const owner = getUser(demand.ownerId);
  const category = getCategory(demand.categoryId);
  const presentations = getDemandPresentations(demand.id);
  const offers = getDemandOffers(demand.id);
  const creditEstimate = offerCreditEstimate(demand.price, demand.categoryId);
  const isOwner = routeUser.id === demand.ownerId;
  const visiblePresentations = isOwner ? presentations : presentations.filter((p) => p.sellerId === routeUser.id);
  const myPresentation = presentations.find((p) => p.sellerId === routeUser.id);
  const noteLen = presentNote.trim().length;
  const presentValid =
    presentPhotos.length >= MIN_PHOTOS && noteLen >= NOTE_MIN && noteLen <= NOTE_MAX && !!presentCondition;

  async function onPickPresentFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    const urls = await filesToDataUrls(files, { maxDim: 1400 });
    setPresentPhotos((prev) => [...prev, ...urls].slice(0, MAX_PHOTOS));
    event.target.value = '';
  }
  function onPickPresentVideos(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPresentVideos((prev) => [...prev, ...urls].slice(0, 5));
    event.target.value = '';
  }

  function submitPresentation() {
    if (!demand || !presentValid) return;
    createPresentation({
      demandId: demand.id,
      sellerId: routeUser.id,
      city: routeUser.city,
      images: presentPhotos,
      description: presentNote,
      condition: presentCondition,
    });
    setPresenting(false);
    setPresentPhotos([]);
    setPresentVideos([]);
    setPresentNote('');
  }

  const images = Array.from(new Set([demand.coverImage, ...demand.referenceImages]));
  const safeIndex = Math.min(activeImage, images.length - 1);
  const thumbs = images.slice(0, 6);
  const step = (delta: number) => setActiveImage((index) => (index + delta + images.length) % images.length);


  return (
    <div className="page-stack">
      <div className="detail-topline">
        <Link className="back-link" to={category ? categoryPath(routeUser.username, category.id) : userBase(routeUser.username)}>
          <Icon name="ArrowLeft" size={17} />
          Geri
        </Link>
        <div className="breadcrumb-lite">
          <Link to={userBase(routeUser.username)}>@{owner.username}</Link>
          <span>/</span>
          <span>Talep</span>
        </div>
      </div>

      <div className="detail-page">
        <section className="detail-media-card">
          <div className="detail-media-slots">
            <div className="detail-photo-main">
              {images[safeIndex] ? (
                <img src={imageSrc(images[safeIndex], 800)} alt={demand.title} />
              ) : (
                <div className="detail-photo-main-empty"><Icon name="Camera" size={32} /></div>
              )}
            </div>
            <p className="detail-media-section-label">Fotoğraflar</p>
            <div className="detail-photo-grid">
              {Array.from({ length: 5 }, (_, i) => {
                const src = images[i];
                return src ? (
                  <button
                    key={src}
                    type="button"
                    className={`detail-slot detail-slot-photo${i === safeIndex ? ' on' : ''}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={imageSrc(src, 400)} alt={`Fotoğraf ${i + 1}`} />
                  </button>
                ) : (
                  <div key={i} className="detail-slot detail-slot-empty">
                    <Icon name="Camera" size={20} />
                  </div>
                );
              })}
            </div>
            <p className="detail-media-section-label" style={{ marginTop: 14 }}>Videolar</p>
            <div className="detail-video-grid">
              {Array.from({ length: 3 }, (_, i) => {
                const src = demand.videos?.[i];
                return src ? (
                  <div key={src} className="detail-slot detail-slot-video">
                    <video src={src} muted playsInline controls className="detail-slot-video-el" />
                  </div>
                ) : (
                  <div key={i} className="detail-slot detail-slot-empty">
                    <Icon name="Video" size={20} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <main className="detail-main">
          <section className="detail-info-card">
            <span className="detail-box-label">Başlık</span>
            <h1 className="detail-title">{demand.title}</h1>
          </section>

          <section className="detail-price-pill">
            <div className="detail-price-pill-top">
              <span className="detail-price-pill-label">Fiyat</span>
            </div>
            <div className="detail-price-pill-bottom">
              <div className="detail-price-pill-value">{formatPrice(demand.price)}</div>
            </div>
          </section>

          <section className="detail-spec-card">
            <span className="detail-box-label">Açıklama</span>
            <p className="detail-desc">{demand.description}</p>
          </section>

          <section className="detail-assurance-card">
            <h3>Bulbana güven akışı</h3>
            <div className="detail-assurance-list">
              <span><i>1</i> Sunum ücretsiz gönderilir</span>
              <span><i>2</i> Alıcı beğenirse resmi teklif ister</span>
              <span><i>3</i> Anlaşma sonrası kargo takibi açılır</span>
            </div>
          </section>

        </main>

        <aside className="detail-aside">
          <section className="detail-price-panel">
            <div className="detail-info-chips">
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">Şehir</span>
                <span className="detail-info-chip-value">{demand.city}</span>
              </div>
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">İlçe</span>
                <span className="detail-info-chip-value">{demand.district ?? '—'}</span>
              </div>
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">Kategori</span>
                <span className="detail-info-chip-value">{category?.name ?? '—'}</span>
              </div>
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">Marka</span>
                <span className="detail-info-chip-value">{demand.brand ?? '—'}</span>
              </div>
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">Model</span>
                <span className="detail-info-chip-value">{demand.model ?? '—'}</span>
              </div>
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">Yıl</span>
                <span className="detail-info-chip-value">{demand.year ?? '—'}</span>
              </div>
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">Renk</span>
                <span className="detail-info-chip-value">{demand.color ?? '—'}</span>
              </div>
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">Ürün Defosu</span>
                <span className="detail-info-chip-value">{demand.hasDefect ?? '—'}</span>
              </div>
              <div className="detail-info-chip">
                <span className="detail-info-chip-label">Ürün Durumu</span>
                <span className="detail-info-chip-value">{demand.condition ?? '—'}</span>
              </div>
            </div>

            <div className="detail-cta">
              {isOwner ? (
                <div className="detail-hint">
                  Bu senin talebin. Satıcılar ürün sunduğunda <b>Teklif İste</b> diyebilirsin.
                </div>
              ) : myPresentation ? (
                <div className="detail-hint">
                  <b>Sunumun iletildi.</b> Alıcı beğenip <b>Teklif İste</b> derse resmi teklif verirsin.
                </div>
              ) : (
                <button type="button" className="detail-sun-btn" onClick={() => setPresenting(true)}>
                  <Icon name="Store" size={17} /> Ürün Sun
                </button>
              )}
            </div>
          </section>

        </aside>
      </div>

      {isOwner && (
        <section className="pres-list-panel">
          <h2 className="pres-list-title">
            <Icon name="Inbox" size={20} />
            Sunumlar
            {presentations.length > 0 && (
              <span className="pres-list-count">{presentations.length}</span>
            )}
          </h2>
          {presentations.length === 0 ? (
            <div className="pres-list-empty">
              <Icon name="PackageOpen" size={28} />
              <p>Henüz sunum yok. Satıcılar ürün sunduğunda burada görünür.</p>
            </div>
          ) : (
            <div className="pres-list-grid">
              {presentations.map((pres) => {
                const seller = getUser(pres.sellerId);
                const statusTone = pres.status === 'offer_requested' ? 'green' : pres.status === 'rejected' ? 'warning' : 'purple';
                const statusLabel = pres.status === 'offer_requested' ? 'Teklif İstendi' : pres.status === 'rejected' ? 'Reddedildi' : 'İnceleniyor';
                return (
                  <Link
                    key={pres.id}
                    className="pres-card"
                    to={presentationPath(routeUser.username, demand, pres.id)}
                  >
                    <div className="pres-card-cover">
                      <img src={imageSrc(pres.coverImage, 400)} alt="" />
                    </div>
                    <div className="pres-card-body">
                      <div className="pres-card-seller">
                        <span className="pres-card-avatar">{seller.avatar}</span>
                        <div>
                          <strong>{seller.name}</strong>
                          <small>@{seller.username} · {seller.city}</small>
                        </div>
                      </div>
                      <p className="pres-card-desc">{pres.description}</p>
                      <div className="pres-card-meta">
                        <span><Icon name="PackageCheck" size={13} /> {pres.condition}</span>
                        <span><Icon name="Image" size={13} /> {pres.images.length} fotoğraf</span>
                      </div>
                    </div>
                    <div className="pres-card-status">
                      <StatusBadge tone={statusTone}>{statusLabel}</StatusBadge>
                      <Icon name="ChevronRight" size={18} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      )}

      <Modal
        open={presenting}
        onClose={() => setPresenting(false)}
        title="Ürün Sun"
        footer={
          <>
            <button type="button" className="button ghost" onClick={() => setPresenting(false)}>
              Vazgeç
            </button>
            <button type="button" className="button primary" disabled={!presentValid} onClick={submitPresentation}>
              <Icon name="Send" size={16} /> Sunumu Gönder
            </button>
          </>
        }
      >
        <div className="present-form">
          <div className="present-media-row">
            <div className="present-media-col">
              <div className="field-label">
                Fotoğraflar ·{' '}
                <span className={`muted-count${presentPhotos.length < MIN_PHOTOS ? ' warn' : ''}`}>
                  {presentPhotos.length}/{MAX_PHOTOS} · en az {MIN_PHOTOS}
                </span>
              </div>
              <div className="ref-grid">
                {presentPhotos.map((src, index) => (
                  <div key={index} className="ref-thumb">
                    <img src={imageSrc(src, 220)} alt="" />
                    {index === 0 ? <span className="ref-cap">Kapak</span> : null}
                    <button
                      type="button"
                      className="ref-x"
                      aria-label="Kaldır"
                      onClick={() => setPresentPhotos((prev) => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {presentPhotos.length < MAX_PHOTOS ? (
                  <button type="button" className="ref-add" onClick={() => presentFileRef.current?.click()}>
                    <Icon name="Image" size={18} />
                    <span>Foto ekle</span>
                  </button>
                ) : null}
                <input ref={presentFileRef} type="file" accept="image/*" multiple hidden onChange={onPickPresentFiles} />
              </div>
            </div>
            <div className="present-media-col">
              <div className="field-label">
                Videolar · <span className="muted-count">{presentVideos.length}/5</span>
              </div>
              <div className="ref-grid">
                {presentVideos.map((src, index) => (
                  <div key={index} className="ref-thumb ref-thumb-video">
                    <video src={src} muted playsInline className="ref-video-preview" />
                    <span className="ref-cap ref-cap-video">Video</span>
                    <button
                      type="button"
                      className="ref-x"
                      aria-label="Kaldır"
                      onClick={() => setPresentVideos((prev) => prev.filter((_, i) => i !== index))}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {presentVideos.length < 5 ? (
                  <button type="button" className="ref-add ref-add-video" onClick={() => presentVideoRef.current?.click()}>
                    <Icon name="Video" size={18} />
                    <span>Video ekle</span>
                  </button>
                ) : null}
                <input ref={presentVideoRef} type="file" accept="video/*" multiple hidden onChange={onPickPresentVideos} />
              </div>
            </div>
          </div>
          <label className="present-field">
            <span>Ürün durumu</span>
            <select value={presentCondition} onChange={(event) => setPresentCondition(event.target.value)}>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="present-field">
            <span>
              Açıklama / not ·{' '}
              <span className={`muted-count${noteLen > 0 && noteLen < NOTE_MIN ? ' warn' : ''}`}>{noteLen}/{NOTE_MAX}</span>
            </span>
            <textarea
              value={presentNote}
              onChange={(event) => setPresentNote(event.target.value.slice(0, NOTE_MAX))}
              rows={3}
              maxLength={NOTE_MAX}
              placeholder={`Ürünün durumu, orijinallik, teslimat… (en az ${NOTE_MIN} karakter)`}
            />
          </label>
        </div>
      </Modal>
    </div>
  );
}
