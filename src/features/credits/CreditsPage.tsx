import { Link, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { getUser } from '../../services/catalogService';
import { userBase } from '../../utils/routes';

const packages = [
  { name: 'Başlangıç', credits: 50, price: '249₺', note: 'Ara sıra sunum yapan satıcılar' },
  { name: 'Profesyonel', credits: 160, price: '699₺', note: 'Düzenli teklif ve hızlı dönüş' },
  { name: 'Kurumsal', credits: 500, price: '1.990₺', note: 'Ekip kullanımı ve yüksek hacim' },
] as const;

export function CreditsPage() {
  const { username = '@ahmetsafak' } = useParams();
  const user = getUser(username);
  const base = userBase(user.username);

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

      <section className="credit-balance">
        <div>
          <span className="eyebrow">Mevcut bakiye</span>
          <strong>{user.credits} kredi</strong>
          <p>Krediler yalnızca sistem içinde resmi teklif ve doğrulama işlemlerinde kullanılır.</p>
        </div>
        <StatusBadge tone="green">Aktif hesap</StatusBadge>
      </section>

      <section className="package-grid">
        {packages.map((item) => (
          <article key={item.name} className="package-card">
            <div>
              <Icon name="WalletCards" size={22} />
              <h2>{item.name}</h2>
              <p>{item.note}</p>
            </div>
            <strong>{item.credits} kredi</strong>
            <span>{item.price}</span>
            <button className="button primary wide" type="button">Paketi Seç</button>
          </article>
        ))}
      </section>

      <section className="policy-band">
        <div>
          <Icon name="LockKeyhole" size={18} />
          <strong>Teklif kredisi iade kuralı</strong>
          <span>Alıcı resmi teklif istemeden kredi düşmez. Hatalı veya spam sunumlar görünürlüğü düşürür.</span>
        </div>
        <div>
          <Icon name="ReceiptText" size={18} />
          <strong>Kurumsal fatura</strong>
          <span>Kurumsal paketlerde ekip ve faturalandırma bilgisi ayrı yönetilir.</span>
        </div>
      </section>
    </div>
  );
}
