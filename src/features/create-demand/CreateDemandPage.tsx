import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { categories } from '../../data/categories';
import { imageIds } from '../../data/images';
import type { CategoryId } from '../../data/types';
import { getUser } from '../../services/catalogService';
import { formatPrice, shortName } from '../../utils/format';
import { demandPath, userBase } from '../../utils/routes';
import { DemandCardView } from '../demands/DemandCardView';
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
  const [price, setPrice] = useState(0);
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const photoCount = 0;
  const navigate = useNavigate();
  const { createDemand } = useAppData();

  function publish() {
    const demand = createDemand({ ownerId: activeUser.id, categoryId, title, description, price, city });
    navigate(demandPath(activeUser.username, demand));
  }

  const filteredCities = useMemo(() => {
    const q = citySearch.trim().toLocaleLowerCase('tr-TR');
    return q ? CITIES.filter((name) => name.toLocaleLowerCase('tr-TR').includes(q)) : CITIES;
  }, [citySearch]);

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

      <div className="create-banner">
        <b>Ücretsiz · 2 dakika.</b> Talebini aç, satıcılar sana ürün sunsun — kararı sen ver.
      </div>

      <div className="create-cols">
        <div className="create-form">
          <div className="field-label">Kategori</div>
          <div className="card-block chip-row">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`chip${category.id === categoryId ? ' active' : ''}`}
                onClick={() => setCategoryId(category.id)}
              >
                <Icon name={category.icon as IconName} size={15} /> {category.shortName}
              </button>
            ))}
          </div>

          <div className="field-label">Ne arıyorsun?</div>
          <div className="card-block stack">
            <div className="field-input">
              <Icon name="Search" size={16} />
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Leica M6 35mm film makinesi" />
            </div>
            <div className="field-area">
              <label>Detay</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                placeholder="Durum, orijinallik, kusur, teslimat tercihi…"
              />
            </div>
          </div>

          <div className="city-price">
            <div className="cp-col">
              <div className="field-label">Şehir</div>
              <div className={`card-block city-card${cityOpen ? ' open' : ''}`}>
                <button type="button" className="city-trigger" onClick={() => setCityOpen((open) => !open)}>
                  <Icon name="MapPin" size={16} />
                  <span className="city-label">{city}</span>
                  <span className="city-chev">
                    <Icon name="ChevronRight" size={16} />
                  </span>
                </button>
                {cityOpen && (
                  <>
                    <button type="button" className="city-backdrop" aria-label="Kapat" onClick={() => setCityOpen(false)} />
                    <div className="city-panel">
                    <input
                      className="city-search"
                      value={citySearch}
                      onChange={(event) => setCitySearch(event.target.value)}
                      placeholder="Şehir ara…"
                      autoFocus
                    />
                    <div className="city-list">
                      {filteredCities.map((name) => (
                        <button
                          key={name}
                          type="button"
                          className={`city-opt${name === city ? ' sel' : ''}`}
                          onClick={() => {
                            setCity(name);
                            setCityOpen(false);
                            setCitySearch('');
                          }}
                        >
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
              <div className="field-label">Sabit fiyat</div>
              <div className="card-block">
                <div className="field-input">
                  <span className="fic-tl">₺</span>
                  <input
                    value={price || ''}
                    onChange={(event) => setPrice(Number(event.target.value.replace(/[^0-9]/g, '')) || 0)}
                    inputMode="numeric"
                    placeholder="Alım fiyatı"
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
          </div>

          <div className="field-label">
            Referans fotoğraf · <span className="muted-count">{photoCount}/10</span>
          </div>
          <div className="card-block ref-grid">
            <button type="button" className="ref-add">
              <Icon name="Plus" size={18} />
              <span>Foto ekle</span>
            </button>
          </div>
          <div className="ref-hint">
            Aradığın ürünün görselleri — ilki <b>kapak</b> olur.
          </div>
        </div>

        <aside className="create-side">
          <div className="field-label">Önizleme · satıcılar böyle görecek</div>
          <div className="demand-card preview-card">
            <DemandCardView
              coverImage={CATEGORY_COVER[categoryId]}
              title={title.trim() || 'Talep başlığın burada görünecek'}
              price={price ? formatPrice(price) : 'Fiyat belirt'}
              timeLabel="az önce"
              views={16}
              ownerName={shortName(activeUser.name)}
              ownerAvatar={activeUser.avatar}
              ownerScore={activeUser.score}
              presentationCount={0}
              mine={false}
              progress={34}
            />
          </div>
          <div className="side-hint">
            Satıcılar bu kartı <b>Talepler</b> akışında görür; dokununca açıklama, tüm fotoğraflar ve <b>Ürün Sun</b> açılır.
          </div>
          <button type="button" className="button primary wide side-cta" onClick={publish}>
            <Icon name="Send" size={17} />
            Talebi Yayınla
          </button>
        </aside>
      </div>
    </div>
  );
}
