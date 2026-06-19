import { useRef, useState, type ChangeEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { Modal } from '../../components/Modal';
import { imageSrc } from '../../data/images';
import { filesToDataUrls } from '../../lib/imageUpload';
import { getCategory, getUser, offerCreditEstimate } from '../../services/catalogService';
import { categoryPath, presentationPath, userBase } from '../../utils/routes';
import { formatPrice, viewersOf } from '../../utils/format';
import { useAppData } from '../../store/appData';

const TRUST_ITEMS: Array<{ icon: IconName; title: string; copy: string }> = [
  { icon: 'ShieldCheck', title: 'Sistem içi teklif', copy: 'Fiyat, pazarlık ve onay akışı kayıt altında ilerler.' },
  { icon: 'Camera', title: 'Kanıtlı sunum', copy: 'Fotoğraf, durum notu ve varsa video ile ürün doğrulanır.' },
  { icon: 'Truck', title: 'Kargo takibi', copy: 'Onay sonrası teslimat ve takip bilgisi sistemde tutulur.' },
];

export function DemandDetailPage() {
  const { username = '@ahmetsafak', demandSlug = '' } = useParams();
  const routeUser = getUser(username);
  const { getDemandByRoute, getDemandPresentations, getDemandOffers, createPresentation } = useAppData();
  const demand = getDemandByRoute(demandSlug);
  const [activeImage, setActiveImage] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [presentPhotos, setPresentPhotos] = useState<string[]>([]);
  const [presentNote, setPresentNote] = useState('');
  const [presentCondition, setPresentCondition] = useState('İkinci el · iyi durumda');
  const presentFileRef = useRef<HTMLInputElement>(null);

  if (!demand) {
    return (
      <div className="empty-state">
        <Icon name="Search" size={28} />
        <h1>İlan bulunamadı</h1>
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
  async function onPickPresentFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    const urls = await filesToDataUrls(files, { maxDim: 1400 });
    setPresentPhotos((prev) => [...prev, ...urls].slice(0, 8));
    event.target.value = '';
  }
  function submitPresentation() {
    if (!demand || !presentPhotos.length) return;
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
    setPresentNote('');
  }

  const images = Array.from(new Set([demand.coverImage, ...demand.referenceImages]));
  const safeIndex = Math.min(activeImage, images.length - 1);
  const thumbs = images.slice(0, 6);
  const step = (delta: number) => setActiveImage((index) => (index + delta + images.length) % images.length);

  const listTitle = offers.length ? 'Resmi teklifler' : isOwner ? 'Ürün sunumları' : 'Sunum ve teklif';
  const listCount = offers.length ? `${offers.length} teklif` : `${visiblePresentations.length} sunum`;

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
          <div className="detail-hero">
            <img src={imageSrc(images[safeIndex], 1040)} alt={demand.title} />
            <div className="detail-scrim" />
            <span className="detail-pin">
              {category ? <Icon name={category.icon as IconName} size={12} /> : null} {category?.name ?? 'Kategori'}
            </span>
            <span className="detail-fresh">
              <span className="detail-dot" /> {isOwner ? 'Senin talebin' : 'Yeni talep'}
            </span>
            {images.length > 1 && (
              <>
                <button type="button" className="detail-nav prev" aria-label="Önceki görsel" onClick={() => step(-1)}>
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button type="button" className="detail-nav next" aria-label="Sonraki görsel" onClick={() => step(1)}>
                  <Icon name="ChevronRight" size={20} />
                </button>
                <span className="detail-count">
                  {safeIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>
          <div className="detail-media-foot">
            <span>
              <Icon name="Image" size={14} /> {images.length} referans görsel
            </span>
            <div className="detail-thumbs">
              {thumbs.map((imageId, index) => (
                <button
                  key={imageId}
                  type="button"
                  className={`detail-thumb${index === safeIndex ? ' on' : ''}`}
                  aria-label={`Görsel ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={imageSrc(imageId, 160)} alt="" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <main className="detail-main">
          <section className="detail-info-card">
            <div className="detail-eyebrow">
              <span className="detail-cat-badge">
                {category ? <Icon name={category.icon as IconName} size={12} /> : null} {category?.name ?? 'Kategori'}
              </span>
              <span className="detail-trust-badge">
                <Icon name="Sparkles" size={11} /> {demand.badge}
              </span>
            </div>
            <h1 className="detail-title">{demand.title}</h1>
            <p className="detail-desc">{demand.description}</p>

            <div className="detail-trust-band">
              {TRUST_ITEMS.map((item) => (
                <div key={item.title} className="detail-trust-item">
                  <span className="detail-trust-icon">
                    <Icon name={item.icon} size={17} />
                  </span>
                  <div>
                    <b>{item.title}</b>
                    <span>{item.copy}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="detail-meta-row">
              <span>
                <Icon name="MapPin" size={13} /> {demand.city}
              </span>
              <span>
                <Icon name="Clock" size={13} /> {demand.createdAtLabel}
              </span>
              <span>
                <Icon name="Eye" size={13} /> {viewersOf(demand.id)} izliyor
              </span>
              <span>
                <Icon name="Inbox" size={13} /> {presentations.length} sunum
              </span>
            </div>
          </section>

          <section className="detail-spec-card">
            <div className="detail-card-title">
              <h3>Aranan ürün kriterleri</h3>
              <span className="detail-cat-chip">{category?.name ?? 'Kategori'}</span>
            </div>
            <div className="detail-spec-grid">
              <div className="detail-spec">
                <b>Bütçe net</b>
                <span>{formatPrice(demand.price)} seviyesine uygun ürün bekleniyor.</span>
              </div>
              <div className="detail-spec">
                <b>Orijinallik kanıtı</b>
                <span>Koleksiyon için seri no veya net fotoğraf avantajı sağlar.</span>
              </div>
              <div className="detail-spec">
                <b>Teslimat bölgesi</b>
                <span>{demand.city} içi hızlı teslimat öne çıkar.</span>
              </div>
              <div className="detail-spec">
                <b>Teklif maliyeti</b>
                <span>Alıcı teklif isterse resmi fiyat {creditEstimate} kredi.</span>
              </div>
            </div>
          </section>

          <section className="detail-assurance-card">
            <h3>Bulbana güven akışı</h3>
            <div className="detail-assurance-list">
              <span>
                <i>1</i> Sunum ücretsiz gönderilir
              </span>
              <span>
                <i>2</i> Alıcı beğenirse resmi teklif ister
              </span>
              <span>
                <i>3</i> Anlaşma sonrası kargo takibi açılır
              </span>
            </div>
          </section>
        </main>

        <aside className="detail-aside">
          <section className="detail-price-panel">
            <div className="detail-price-label">Alıcının net fiyatı</div>
            <div className="detail-price-value">{formatPrice(demand.price)}</div>
            <p className="detail-price-sub">Alıcı bu bütçeye uygun, doğrulanabilir ürün sunumu bekliyor.</p>
            <div className="detail-cta">
              {isOwner ? (
                <div className="detail-hint">
                  Bu senin talebin. Satıcılar ürün sunduğunda <b>Teklif İste</b> diyebilirsin.
                </div>
              ) : myPresentation ? (
                <div className="detail-hint">
                  <b>Sunumun iletildi.</b> Alıcı beğenip <b>Teklif İste</b> derse resmi teklif verirsin (≈{creditEstimate} kredi).
                </div>
              ) : (
                <>
                  <button type="button" className="detail-sun-btn" onClick={() => setPresenting(true)}>
                    <Icon name="Store" size={17} /> Ürün Sun
                  </button>
                  <div className="detail-hint">
                    Ücretsiz sunum gönder. Alıcı beğenip <b>Teklif İste</b> derse resmi teklif verirsin.
                  </div>
                </>
              )}
            </div>
            <div className="detail-kpis">
              <div className="detail-kpi">
                <b>{presentations.length}</b>
                <span>Sunum</span>
              </div>
              <div className="detail-kpi">
                <b>{offers.length}</b>
                <span>Teklif</span>
              </div>
              <div className="detail-kpi">
                <b>{creditEstimate}</b>
                <span>Kredi</span>
              </div>
            </div>
          </section>

          <section className="detail-offers-panel">
            <div className="detail-offers-head">
              <h3>{listTitle}</h3>
              <span>{listCount}</span>
            </div>
            <div className="detail-offer-list">
              {visiblePresentations.length ? (
                visiblePresentations.map((presentation) => {
                  const seller = getUser(presentation.sellerId);
                  return (
                    <Link
                      key={presentation.id}
                      className="detail-offer-row"
                      to={presentationPath(routeUser.username, demand, seller.username)}
                    >
                      <span className="detail-offer-thumb">
                        <img src={imageSrc(presentation.coverImage, 120)} alt="" />
                      </span>
                      <span className="detail-offer-copy">
                        <b>{isOwner ? seller.name : 'Senin sunumun'}</b>
                        <small>
                          {presentation.images.length} görsel · {presentation.condition}
                        </small>
                      </span>
                      <Icon name="ChevronRight" size={15} />
                    </Link>
                  );
                })
              ) : (
                <div className="detail-empty-list">
                  <b>Henüz sunum yok</b>
                  <span>Uygun ürün sunulduğunda burada görünür.</span>
                </div>
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
            <button type="button" className="button primary" disabled={!presentPhotos.length} onClick={submitPresentation}>
              <Icon name="Send" size={16} /> Sunumu Gönder
            </button>
          </>
        }
      >
        <div className="present-form">
          <div className="field-label">Ürün görselleri · {presentPhotos.length}/8</div>
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
            {presentPhotos.length < 8 ? (
              <button type="button" className="ref-add" onClick={() => presentFileRef.current?.click()}>
                <Icon name="Plus" size={18} />
                <span>Foto ekle</span>
              </button>
            ) : null}
            <input ref={presentFileRef} type="file" accept="image/*" multiple hidden onChange={onPickPresentFiles} />
          </div>
          <label className="present-field">
            <span>Durum</span>
            <input value={presentCondition} onChange={(event) => setPresentCondition(event.target.value)} placeholder="İkinci el · iyi durumda" />
          </label>
          <label className="present-field">
            <span>Açıklama / not</span>
            <textarea
              value={presentNote}
              onChange={(event) => setPresentNote(event.target.value)}
              rows={3}
              placeholder="Ürünün durumu, orijinallik, teslimat…"
            />
          </label>
        </div>
      </Modal>
    </div>
  );
}
