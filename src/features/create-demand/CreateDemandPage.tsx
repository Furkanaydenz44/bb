import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { categories } from '../../data/categories';
import { districtsByCity } from '../../data/districts';
import { imageIds, imageSrc } from '../../data/images';
import { filesToDataUrls } from '../../lib/imageUpload';
import type { CategoryId } from '../../data/types';
import { getUser } from '../../services/catalogService';
import { formatPrice, shortName } from '../../utils/format';
import { demandPath, userBase } from '../../utils/routes';
import { DemandCardView } from '../demands/DemandCardView';
import { Modal } from '../../components/Modal';
import { useAppData } from '../../store/appData';

const CITIES = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan',
  'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu',
  'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne',
  'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkâri', 'Hatay',
  'Iğdır', 'Isparta', 'İstanbul', 'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu',
  'Kayseri', 'Kilis', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
  'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize',
  'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon',
  'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak',
];

const PRESETS: Array<[string, number]> = [
  ['₺5B', 5000],
  ['₺10B', 10000],
  ['₺25B', 25000],
  ['₺50B', 50000],
  ['₺100B', 100000],
];

const CATEGORY_COVER: Record<CategoryId, string> = {
  foto: imageIds.polaroid,
  muzik: imageIds.guitar,
  sneaker: imageIds.sneaker,
  saat: imageIds.watch,
  koleksiyon: imageIds.vinyl,
  teknoloji: imageIds.drone,
  oto: imageIds.car,
};

export function CreateDemandPage() {
  const { username = '@ahmetsafak' } = useParams();
  const activeUser = getUser(username);
  const [categoryId, setCategoryId] = useState<CategoryId>('foto');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('İstanbul');
  const [district, setDistrict] = useState('');
  const [price, setPrice] = useState(0);
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [districtOpen, setDistrictOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [colorOpen, setColorOpen] = useState(false);
  const [condition, setCondition] = useState('');
  const [conditionOpen, setConditionOpen] = useState(false);
  const [hasDefect, setHasDefect] = useState('');
  const [defectOpen, setDefectOpen] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { createDemand } = useAppData();

  async function onPickFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    const urls = await filesToDataUrls(files, { maxDim: 1200 });
    setPhotos((prev) => [...prev, ...urls].slice(0, 10));
    event.target.value = '';
  }

  function onPickVideos(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setVideos((prev) => [...prev, ...urls].slice(0, 5));
    event.target.value = '';
  }

  const missingFields: string[] = [];
  if (!title.trim()) missingFields.push('Başlık (Ne arıyorsun?)');
  if (!description.trim()) missingFields.push('Açıklama (Detay)');
  if (!price) missingFields.push('Fiyat');
  if (!brand.trim()) missingFields.push('Marka');
  if (!model.trim()) missingFields.push('Model');
  if (!year.trim()) missingFields.push('Yıl');
  if (!color) missingFields.push('Renk');
  if (!hasDefect) missingFields.push('Ürün Defosu');
  if (!condition) missingFields.push('Ürün Durumu');
  if (photos.length < 3) missingFields.push('En az 3 fotoğraf');

  function openConfirm() { setShowConfirm(true); }

  function publish() {
    const demand = createDemand({ ownerId: activeUser.id, categoryId, title, description, price, city, district, brand, model, year, color, condition, hasDefect, referenceImages: photos, videos });
    setShowConfirm(false);
    navigate(demandPath(activeUser.username, demand));
  }

  const filteredCities = useMemo(() => {
    const q = citySearch.trim().toLocaleLowerCase('tr-TR');
    return q ? CITIES.filter((name) => name.toLocaleLowerCase('tr-TR').includes(q)) : CITIES;
  }, [citySearch]);

  const districts = districtsByCity[city] ?? [];
  const filteredDistricts = useMemo(() => {
    const q = districtSearch.trim().toLocaleLowerCase('tr-TR');
    return q ? districts.filter((name) => name.toLocaleLowerCase('tr-TR').includes(q)) : districts;
  }, [districtSearch, districts]);

  return (
    <div className="page-stack">
      <PageHeader
        title="Talep Aç"
        description="Aradığın ürünü yayınla"
        actions={
          <Link className="button ghost" to={userBase(activeUser.username)}>
            <Icon name="ArrowLeft" size={17} />
            Vazgeç
          </Link>
        }
      />

      <img
        src="/create-banner.png"
        alt="Ücretsiz! — Talebini aç — Satıcılar sana sunum yapsın — Son kararı sen ver."
        className="create-banner-img"
      />

      <div className="create-cols">
        <div className="create-form">
          {/* 1. Ne arıyorsun? */}
          <div className="field-label">Ne arıyorsun?</div>
          <div className="card-block stack">
            <div className="field-input">
              <Icon name="Search" size={16} />
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Leica M6 35mm film makinesi" />
            </div>
            <div className="field-area">
              <label>Detay</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Durum, orijinallik, kusur, teslimat tercihi…" />
            </div>
          </div>

          {/* 2. Fiyat | Kategori */}
          <div className="city-price">
            <div className="cp-col">
              <div className="field-label">Fiyat</div>
              <div className="card-block">
                <div className="field-input">
                  <span className="fic-tl">₺</span>
                  <input
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value.replace(/[^0-9]/g, '')) || 0)}
                    inputMode="numeric"
                    placeholder="Hedef fiyat giriniz"
                  />
                </div>
              </div>
              <div className="preset-row">
                {PRESETS.map(([label, value]) => (
                  <button key={value} type="button" className={`preset${price === value ? ' on' : ''}`} onClick={() => setPrice(value)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="cp-col">
              <div className="field-label">Kategori</div>
              <div className="card-block chip-row">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`chip${cat.id === categoryId ? ' active' : ''}`}
                    onClick={() => setCategoryId(cat.id)}
                  >
                    <Icon name={cat.icon as IconName} size={15} /> {cat.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Marka | Model */}
          <div className="city-price">
            <div className="cp-col">
              <div className="field-label">Marka</div>
              <div className="card-block city-card">
                <div className="city-trigger" style={{ cursor: 'text' }}>
                  <Icon name="Search" size={16} />
                  <input
                    className={`city-label${brand ? '' : ' ph'}`}
                    style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, font: 'inherit', cursor: 'text' }}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Örn. Leica, Nike…"
                  />
                </div>
              </div>
            </div>
            <div className="cp-col">
              <div className="field-label">Model</div>
              <div className="card-block city-card">
                <div className="city-trigger" style={{ cursor: 'text' }}>
                  <Icon name="SlidersHorizontal" size={16} />
                  <input
                    className={`city-label${model ? '' : ' ph'}`}
                    style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, font: 'inherit', cursor: 'text' }}
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Örn. M6, Air Max 90…"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Yıl | Renk */}
          <div className="city-price">
            <div className="cp-col">
              <div className="field-label">Yıl</div>
              <div className="card-block city-card">
                <div className="city-trigger" style={{ cursor: 'text' }}>
                  <Icon name="Calendar" size={16} />
                  <input
                    className={`city-label${year ? '' : ' ph'}`}
                    style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, font: 'inherit', cursor: 'text' }}
                    value={year}
                    onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                    inputMode="numeric"
                    placeholder="Örn. 2019"
                  />
                </div>
              </div>
            </div>
            <div className="cp-col">
              <div className="field-label">Renk</div>
              <div className={`card-block city-card${colorOpen ? ' open' : ''}`}>
                <button type="button" className="city-trigger" onClick={() => setColorOpen((o) => !o)}>
                  <Icon name="Eye" size={16} />
                  <span className={`city-label${color ? '' : ' ph'}`}>{color || 'Renk seç'}</span>
                  <span className="city-chev"><Icon name="ChevronRight" size={16} /></span>
                </button>
                {colorOpen && (
                  <>
                    <button type="button" className="city-backdrop" aria-label="Kapat" onClick={() => setColorOpen(false)} />
                    <div className="city-panel">
                      <div className="city-list">
                        {['Siyah', 'Beyaz', 'Gri', 'Gümüş', 'Altın', 'Kırmızı', 'Mavi', 'Yeşil', 'Sarı', 'Turuncu', 'Mor', 'Pembe', 'Kahverengi', 'Bej', 'Lacivert'].map((opt) => (
                          <button key={opt} type="button" className={`city-opt${color === opt ? ' sel' : ''}`} onClick={() => { setColor(opt); setColorOpen(false); }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 5. Ürün Defosu | Ürün Durumu */}
          <div className="city-price">
            <div className="cp-col">
              <div className="field-label">Ürün Defosu</div>
              <div className={`card-block city-card${defectOpen ? ' open' : ''}`}>
                <button type="button" className="city-trigger" onClick={() => setDefectOpen((o) => !o)}>
                  <Icon name="Eye" size={16} />
                  <span className={`city-label${hasDefect ? '' : ' ph'}`}>{hasDefect || 'Seç'}</span>
                  <span className="city-chev"><Icon name="ChevronRight" size={16} /></span>
                </button>
                {defectOpen && (
                  <>
                    <button type="button" className="city-backdrop" aria-label="Kapat" onClick={() => setDefectOpen(false)} />
                    <div className="city-panel">
                      <div className="city-list">
                        {['Evet', 'Hayır'].map((opt) => (
                          <button key={opt} type="button" className={`city-opt${hasDefect === opt ? ' sel' : ''}`} onClick={() => { setHasDefect(opt); setDefectOpen(false); }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="cp-col">
              <div className="field-label">Ürün Durumu</div>
              <div className={`card-block city-card${conditionOpen ? ' open' : ''}`}>
                <button type="button" className="city-trigger" onClick={() => setConditionOpen((o) => !o)}>
                  <Icon name="PackageCheck" size={16} />
                  <span className={`city-label${condition ? '' : ' ph'}`}>{condition || 'Durum seç'}</span>
                  <span className="city-chev"><Icon name="ChevronRight" size={16} /></span>
                </button>
                {conditionOpen && (
                  <>
                    <button type="button" className="city-backdrop" aria-label="Kapat" onClick={() => setConditionOpen(false)} />
                    <div className="city-panel">
                      <div className="city-list">
                        {['Yeni', 'Etiketli', 'Az kullanılmış'].map((opt) => (
                          <button key={opt} type="button" className={`city-opt${condition === opt ? ' sel' : ''}`} onClick={() => { setCondition(opt); setConditionOpen(false); }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Şehir | İlçe */}
          <div className="city-price">
            <div className="cp-col">
              <div className="field-label">Şehir</div>
              <div className={`card-block city-card${cityOpen ? ' open' : ''}`}>
                <button type="button" className="city-trigger" onClick={() => setCityOpen((o) => !o)}>
                  <Icon name="MapPin" size={16} />
                  <span className="city-label">{city}</span>
                  <span className="city-chev"><Icon name="ChevronRight" size={16} /></span>
                </button>
                {cityOpen && (
                  <>
                    <button type="button" className="city-backdrop" aria-label="Kapat" onClick={() => setCityOpen(false)} />
                    <div className="city-panel">
                      <input className="city-search" value={citySearch} onChange={(e) => setCitySearch(e.target.value)} placeholder="Şehir ara…" autoFocus />
                      <div className="city-list">
                        {filteredCities.map((name) => (
                          <button key={name} type="button" className={`city-opt${name === city ? ' sel' : ''}`} onClick={() => { setCity(name); setDistrict(''); setCityOpen(false); setCitySearch(''); }}>
                            {name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="cp-col">
              <div className="field-label">İlçe</div>
              <div className={`card-block city-card${districtOpen ? ' open' : ''}`}>
                <button type="button" className="city-trigger" onClick={() => setDistrictOpen((o) => !o)}>
                  <Icon name="MapPin" size={16} />
                  <span className={`city-label${district ? '' : ' ph'}`}>{district || 'İlçe seç (opsiyonel)'}</span>
                  <span className="city-chev"><Icon name="ChevronRight" size={16} /></span>
                </button>
                {districtOpen && (
                  <>
                    <button type="button" className="city-backdrop" aria-label="Kapat" onClick={() => setDistrictOpen(false)} />
                    <div className="city-panel">
                      <input className="city-search" value={districtSearch} onChange={(e) => setDistrictSearch(e.target.value)} placeholder={`${city} ilçesi ara…`} autoFocus />
                      <div className="city-list">
                        <button type="button" className={`city-opt${district === '' ? ' sel' : ''}`} onClick={() => { setDistrict(''); setDistrictOpen(false); setDistrictSearch(''); }}>
                          İlçe farketmez
                        </button>
                        {filteredDistricts.map((name) => (
                          <button key={name} type="button" className={`city-opt${name === district ? ' sel' : ''}`} onClick={() => { setDistrict(name); setDistrictOpen(false); setDistrictSearch(''); }}>
                            {name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="field-label">
            Fotoğraf ve Video ekle · <span className="muted-count">{photos.length}/10 fotoğraf · {videos.length}/5 video</span>
          </div>
          <div className="card-block ref-grid">
            {photos.map((src, index) => (
              <div key={`photo-${index}`} className="ref-thumb">
                <img src={imageSrc(src, 220)} alt="" />
                {index === 0 ? <span className="ref-cap">Kapak</span> : null}
                <button
                  type="button"
                  className="ref-x"
                  aria-label="Kaldır"
                  onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}
                >
                  ×
                </button>
              </div>
            ))}
            {photos.length < 10 ? (
              <button type="button" className="ref-add" onClick={() => fileRef.current?.click()}>
                <Icon name="Image" size={18} />
                <span>Foto ekle</span>
              </button>
            ) : null}
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={onPickFiles} />

            {videos.map((src, index) => (
              <div key={`video-${index}`} className="ref-thumb ref-thumb-video">
                <video src={src} muted playsInline className="ref-video-preview" />
                <span className="ref-cap ref-cap-video">Video</span>
                <button
                  type="button"
                  className="ref-x"
                  aria-label="Kaldır"
                  onClick={() => setVideos((prev) => prev.filter((_, i) => i !== index))}
                >
                  ×
                </button>
              </div>
            ))}
            {videos.length < 5 ? (
              <button type="button" className="ref-add ref-add-video" onClick={() => videoRef.current?.click()}>
                <Icon name="Video" size={18} />
                <span>Video ekle</span>
              </button>
            ) : null}
            <input ref={videoRef} type="file" accept="video/*" multiple hidden onChange={onPickVideos} />
          </div>
          <div className="ref-hint">
            İlk fotoğraf <b>kapak</b> olur. Videolar satıcılara ürün hakkında daha iyi fikir verir.
          </div>
        </div>

        <aside className="create-side">
          <div className="preview-label">
            <span className="preview-label-main">ÖNİZLEME</span>
            <span className="preview-label-sep"> · </span>
            <span className="preview-label-sub">SATICILAR BÖYLE GÖRECEK</span>
          </div>
          <div className="demand-card preview-card">
            <DemandCardView
              coverImage={photos[0] ?? CATEGORY_COVER[categoryId]}
              title={title.trim() || 'Talep başlığın burada görünecek'}
              description={description.trim() || 'Açıklaman burada kısaltılarak görünecek.'}
              price={price ? formatPrice(price) : 'Fiyat belirt'}
              ownerName={shortName(activeUser.name)}
            />
          </div>
          <div className="side-hint">
            Satıcılar bu kartı{' '}
            <span style={{ color: 'var(--purple)', fontWeight: 900 }}>Talepler</span>{' '}
            akışında görür; tıklanınca ilan detaylarına yönlendirilir.
          </div>
          <button type="button" className="button primary wide side-cta" onClick={openConfirm}>
            <Icon name="Send" size={17} />
            Talebi Yayınla
          </button>
        </aside>
      </div>

      <Modal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title={missingFields.length ? 'Eksik alanlar var' : 'İlanınız paylaşılacak'}
        footer={
          missingFields.length ? (
            <button type="button" className="button ghost" onClick={() => setShowConfirm(false)}>
              Geri dön, düzelt
            </button>
          ) : (
            <>
              <button type="button" className="button ghost" onClick={() => setShowConfirm(false)}>
                Vazgeç
              </button>
              <button type="button" className="button primary" onClick={publish}>
                <Icon name="Send" size={15} /> Evet, Yayınla
              </button>
            </>
          )
        }
      >
        {missingFields.length ? (
          <div className="publish-warnings">
            <p className="publish-warn-intro">Lütfen aşağıdaki alanları doldurun:</p>
            <ul className="publish-warn-list">
              {missingFields.map((field) => (
                <li key={field}>
                  <Icon name="X" size={14} /> {field}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="publish-confirm">
            <p className="publish-confirm-text">Emin misiniz? İlan aşağıdaki şekilde yayınlanacak.</p>
            <div className="demand-card publish-confirm-card">
              <DemandCardView
                coverImage={photos[0] ?? CATEGORY_COVER[categoryId]}
                title={title.trim()}
                description={description.trim() || '—'}
                price={formatPrice(price)}
                ownerName={shortName(activeUser.name)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
