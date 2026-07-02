import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon, type IconName } from '../../components/Icon';
import { Modal } from '../../components/Modal';
import { imageSrc } from '../../data/images';
import { filesToDataUrls } from '../../lib/imageUpload';
import { getCategory, getUser } from '../../services/catalogService';
import { categoryPath, demandPath, demandPresentationsPath, presentationPath, userBase } from '../../utils/routes';
import { StatusBadge } from '../../components/StatusBadge';
import { formatPrice, locationLabel } from '../../utils/format';
import { useAppData } from '../../store/appData';
import { recordCategoryView } from '../../services/browsingHistory';

const TRUST_ITEMS: Array<{ icon: IconName; title: string; copy: string }> = [
  { icon: 'ShieldCheck', title: 'Sistem içi teklif', copy: 'Fiyat, pazarlık ve onay akışı kayıt altında ilerler.' },
  { icon: 'Camera', title: 'Kanıtlı sunum', copy: 'Fotoğraf, durum notu ve varsa video ile ürün doğrulanır.' },
  { icon: 'Truck', title: 'Kargo takibi', copy: 'Onay sonrası teslimat ve takip bilgisi sistemde tutulur.' },
];

const CONDITIONS = ['Sıfır (yeni)', 'Etiketli', 'Az kullanılmış', 'İkinci el · iyi durumda', 'İkinci el'];
const COLORS = ['Siyah', 'Beyaz', 'Gri', 'Gümüş', 'Altın', 'Kırmızı', 'Mavi', 'Yeşil', 'Sarı', 'Turuncu', 'Mor', 'Pembe', 'Kahverengi', 'Bej', 'Lacivert'];
const DEFECT_OPTIONS = ['Var', 'Yok'];
const MIN_PHOTOS = 3;
const MAX_PHOTOS = 10;
const NOTE_MIN = 10;
const NOTE_MAX = 250;

export function DemandDetailPage() {
  const { username = '@ahmetsafak', demandSlug = '' } = useParams();
  const routeUser = getUser(username);
  const navigate = useNavigate();
  const { getDemandByRoute, getDemandPresentations, getDemandOffers, createPresentation, deleteDemand, deals } = useAppData();
  const demand = getDemandByRoute(demandSlug);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [presentPhotos, setPresentPhotos] = useState<string[]>([]);
  const [presentVideos, setPresentVideos] = useState<string[]>([]);
  const [presentNote, setPresentNote] = useState('');
  const [presentCondition, setPresentCondition] = useState('İkinci el · iyi durumda');
  const [presentYear, setPresentYear] = useState('');
  const [presentColor, setPresentColor] = useState('');
  const [presentDefect, setPresentDefect] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const presentFileRef = useRef<HTMLInputElement>(null);
  const presentVideoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (demand) recordCategoryView(routeUser.id, demand.categoryId);
  }, [demand, routeUser.id]);

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
  const isOwner = routeUser.id === demand.ownerId;
  const demandDeals = deals.filter((d) => d.demandId === demand.id);
  const hasActiveDeal = demandDeals.some((d) => d.status !== 'delivered');
  const visiblePresentations = isOwner ? presentations : presentations.filter((p) => p.sellerId === routeUser.id);
  const myPresentation = presentations.find((p) => p.sellerId === routeUser.id);
  const noteLen = presentNote.trim().length;
  const presentValid =
    presentPhotos.length >= MIN_PHOTOS && noteLen >= NOTE_MIN && noteLen <= NOTE_MAX && !!presentCondition;

  async function onPickPresentFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    const urls = await filesToDataUrls(files, { maxDim: 900, quality: 0.7 });
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
      year: presentYear,
      color: presentColor,
      hasDefect: presentDefect,
    });
    setPresenting(false);
    setPresentPhotos([]);
    setPresentVideos([]);
    setPresentNote('');
    setPresentYear('');
    setPresentColor('');
    setPresentDefect('');
  }

  function confirmDeleteDemand() {
    if (!demand) return;
    const removed = deleteDemand(demand.id, routeUser.id);
    setDeleteConfirmOpen(false);
    if (removed) navigate(`${userBase(routeUser.username)}/taleplerim`);
  }

  const images = Array.from(new Set([demand.coverImage, ...demand.referenceImages]));
  const safeIndex = Math.min(activeImage, images.length - 1);
  const thumbs = images.slice(0, 6);
  const step = (delta: number) => setActiveImage((index) => (index + delta + images.length) % images.length);


  return (
    <div className="page-stack">
      <div className="detail-topline">
        <div className="detail-topline-left">
          <Link className="back-link" to={category ? categoryPath(routeUser.username, category.id) : userBase(routeUser.username)}>
            <Icon name="ArrowLeft" size={17} />
            Geri
          </Link>
        </div>
        <div className="detail-topline-right">
          {isOwner && (
            <Link className="pres-shortcut-btn" to={demandPresentationsPath(routeUser.username, demand)}>
              <Icon name="Inbox" size={16} />
              Sunumlar
              {presentations.length > 0 && <span className="pres-list-count">{presentations.length}</span>}
            </Link>
          )}
          <Link className="detail-owner-chip" to={userBase(owner.username)}>
            <Avatar label={owner.avatar} size="sm" />
            <span>@{owner.username}</span>
          </Link>
        </div>
      </div>

      <div className="detail-page">
        <section className="detail-media-card">
          <div className="detail-media-slots">
            <div className="detail-photo-main">
              {images[safeIndex] ? (
                <img
                  src={imageSrc(images[safeIndex], 800)}
                  alt={demand.title}
                  onClick={() => setLightboxOpen(true)}
                />
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

          <section className="detail-info-card">
            <span className="detail-box-label">Fiyat</span>
            <div className="detail-price-value">{formatPrice(demand.price)}</div>
          </section>

          <section className="detail-spec-card">
            <span className="detail-box-label">Açıklama</span>
            <p className="detail-desc">{demand.description}</p>
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
                hasActiveDeal ? (
                  <div className="detail-hint">
                    <Icon name="LockKeyhole" size={14} /> Devam eden bir anlaşma olduğu için bu talep silinemez.
                  </div>
                ) : (
                  <button type="button" className="detail-delete-btn" onClick={() => setDeleteConfirmOpen(true)}>
                    <Icon name="X" size={16} /> Talebi Sil
                  </button>
                )
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
            <span>Yıl</span>
            <input
              inputMode="numeric"
              value={presentYear}
              onChange={(event) => setPresentYear(event.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
              placeholder="Örn. 2019"
            />
          </label>
          <label className="present-field">
            <span>Renk</span>
            <select value={presentColor} onChange={(event) => setPresentColor(event.target.value)}>
              <option value="">Seç</option>
              {COLORS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="present-field">
            <span>Ürün defosu</span>
            <select value={presentDefect} onChange={(event) => setPresentDefect(event.target.value)}>
              <option value="">Seç</option>
              {DEFECT_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
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

      {lightboxOpen && images[safeIndex] ? (
        <div className="detail-photo-lightbox" onClick={() => setLightboxOpen(false)}>
          <button type="button" className="detail-photo-lightbox-x" onClick={() => setLightboxOpen(false)}>
            <Icon name="X" size={18} />
          </button>
          <img src={imageSrc(images[safeIndex], 1600)} alt={demand.title} />
        </div>
      ) : null}

      <Modal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Talebi sil"
        footer={
          <>
            <button type="button" className="button ghost" onClick={() => setDeleteConfirmOpen(false)}>
              Vazgeç
            </button>
            <button type="button" className="button danger" onClick={confirmDeleteDemand}>
              Evet, sil
            </button>
          </>
        }
      >
        <p>Bu talebi silmek üzeresin. Bu işlem geri alınamaz ve talep herkes için kaldırılır.</p>
      </Modal>
    </div>
  );
}
