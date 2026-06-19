import { Link, useParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { userBase } from '../../utils/routes';

interface Pack {
  name: string;
  credits: number;
  price: string;
  priceNum: number;
  note: string;
  icon: IconName;
  popular?: boolean;
  feats: string[];
}

const packages: Pack[] = [
  {
    name: 'Başlangıç',
    credits: 50,
    price: '249₺',
    priceNum: 249,
    note: 'Ara sıra sunum yapan satıcılar',
    icon: 'WalletCards',
    feats: ['~7 resmi teklif hakkı', 'Temel ilan görünürlüğü', 'E-posta destek'],
  },
  {
    name: 'Profesyonel',
    credits: 160,
    price: '699₺',
    priceNum: 699,
    note: 'Düzenli teklif ve hızlı dönüş',
    icon: 'Sparkles',
    popular: true,
    feats: ['~22 resmi teklif hakkı', 'Öne çıkan sunum rozeti', 'Öncelikli destek', '%12 bonus kredi'],
  },
  {
    name: 'Kurumsal',
    credits: 500,
    price: '1.990₺',
    priceNum: 1990,
    note: 'Ekip kullanımı ve yüksek hacim',
    icon: 'Building2',
    feats: ['~70 resmi teklif hakkı', 'Çoklu ekip kullanıcısı', 'Kurumsal fatura', 'Özel hesap yöneticisi'],
  },
];

const perCredit = (p: Pack) => (p.priceNum / p.credits).toFixed(2).replace('.', ',');

export function CreditsPage() {
  const { username = '@ahmetsafak' } = useParams();
  const user = getUser(username);
  const { creditsOf } = useAppData();
  const base = userBase(user.username);
  const credits = creditsOf(user.id);
  const approxOffers = Math.max(1, Math.round(credits / 7));

  return (
    <div className="page-stack">
      <PageHeader
        title="Kredi Merkezi"
        description="Resmi teklif isteği, öne çıkarma ve güven doğrulama adımlarında kullanılan kredi bakiyesi."
        actions={
          <Link className="button ghost" to={`${base}/araclar/teklif-kredisi`}>
            <Icon name="Calculator" size={17} />
            Maliyet Hesapla
          </Link>
        }
      />

      {/* Hero bakiye */}
      <section className="kredi-hero">
        <div className="kredi-hero-main">
          <span className="kredi-eyebrow">
            <span className="kredi-dot" />
            Mevcut bakiye
          </span>
          <div className="kredi-balance">
            {credits}
            <small>kredi</small>
          </div>
          <p>
            Krediler yalnızca sistem içinde <b>resmi teklif</b> ve doğrulama işlemlerinde kullanılır. Alıcı resmi teklif
            istemeden kredin düşmez.
          </p>
        </div>

        <div className="kredi-hero-side">
          <span className="kredi-badge">
            <Icon name="ShieldCheck" size={14} />
            Aktif hesap
          </span>
          <div className="kredi-hero-stat">
            <strong>≈ {approxOffers}</strong>
            <span>bakiyenle resmi teklif hakkın</span>
          </div>
          <Link className="kredi-hero-cta" to={`${base}/araclar/teklif-kredisi`}>
            <Icon name="Calculator" size={16} />
            Maliyeti hesapla
          </Link>
        </div>

        <span className="kredi-hero-blob a" aria-hidden="true" />
        <span className="kredi-hero-blob b" aria-hidden="true" />
      </section>

      {/* Paketler */}
      <div className="kredi-section-head">
        <h2>Kredi paketleri</h2>
        <p>Daha büyük paket, kredi başına daha düşük maliyet.</p>
      </div>
      <section className="kredi-packages">
        {packages.map((item) => (
          <article key={item.name} className={`kredi-pack${item.popular ? ' popular' : ''}`}>
            {item.popular ? (
              <span className="kredi-pack-badge">
                <Icon name="Sparkles" size={13} /> En popüler
              </span>
            ) : null}
            <div className="kredi-pack-head">
              <span className="kredi-pack-ic">
                <Icon name={item.icon} size={22} />
              </span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.note}</p>
              </div>
            </div>

            <div className="kredi-pack-price">
              <span className="kredi-pack-credits">
                {item.credits}
                <small>kredi</small>
              </span>
              <div className="kredi-pack-cost">
                <b>{item.price}</b>
                <span>≈ {perCredit(item)}₺ / kredi</span>
              </div>
            </div>

            <ul className="kredi-pack-feats">
              {item.feats.map((f) => (
                <li key={f}>
                  <Icon name="Check" size={15} />
                  {f}
                </li>
              ))}
            </ul>

            <button className="kredi-pack-btn" type="button">
              Paketi Seç
            </button>
          </article>
        ))}
      </section>
      <p className="kredi-pay-note">
        <Icon name="LockKeyhole" size={13} />
        Ödeme entegrasyonu yakında · şu an krediler demo bakiyesiyle çalışır.
      </p>

      {/* Politika */}
      <section className="kredi-policy">
        <div className="kredi-policy-item">
          <span className="kredi-policy-ic"><Icon name="LockKeyhole" size={18} /></span>
          <div>
            <strong>Teklif kredisi iade kuralı</strong>
            <p>Alıcı resmi teklif istemeden kredi düşmez. Hatalı veya spam sunumlar görünürlüğü düşürür.</p>
          </div>
        </div>
        <div className="kredi-policy-item">
          <span className="kredi-policy-ic"><Icon name="ReceiptText" size={18} /></span>
          <div>
            <strong>Kurumsal fatura</strong>
            <p>Kurumsal paketlerde ekip ve faturalandırma bilgisi ayrı yönetilir.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
