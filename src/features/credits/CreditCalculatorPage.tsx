import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { categories } from '../../data/categories';
import type { CategoryId } from '../../data/types';
import { getUser, offerCreditEstimate } from '../../services/catalogService';
import { formatPrice } from '../../utils/format';
import { userBase } from '../../utils/routes';

export function CreditCalculatorPage() {
  const { username = '@ahmetsafak' } = useParams();
  const user = getUser(username);
  const [categoryId, setCategoryId] = useState<CategoryId>('foto');
  const [price, setPrice] = useState(55000);
  const estimate = useMemo(() => offerCreditEstimate(price, categoryId), [price, categoryId]);
  const category = categories.find((item) => item.id === categoryId)!;

  return (
    <div className="page-stack">
      <PageHeader
        title="Teklif Kredisi Hesaplayıcı"
        description="Bir talebe resmi teklif vermeden önce yaklaşık kredi maliyetini hesapla."
        actions={
          <Link className="button ghost" to={`${userBase(user.username)}/kredi`}>
            <Icon name="ArrowLeft" size={17} />
            Kredi Merkezine Dön
          </Link>
        }
      />

      <section className="calculator-layout">
        <div className="calculator-panel">
          <label>
            Kategori
            <select value={categoryId} onChange={(event) => setCategoryId(event.target.value as CategoryId)}>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Alıcı bütçesi
            <input value={price} onChange={(event) => setPrice(Number(event.target.value) || 0)} inputMode="numeric" />
          </label>
          <input
            aria-label="Bütçe aralığı"
            type="range"
            min="1000"
            max="150000"
            step="500"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </div>

        <aside className="result-panel">
          <span className="eyebrow">{category.name}</span>
          <strong className="hero-price">{estimate} kredi</strong>
          <p>{formatPrice(price)} bütçeli talep için tahmini resmi teklif maliyeti.</p>
          <div className="action-metrics">
            <div>
              <strong>{user.credits}</strong>
              <span>mevcut</span>
            </div>
            <div>
              <strong>{Math.max(0, user.credits - estimate)}</strong>
              <span>kalan</span>
            </div>
          </div>
          <Link className="button primary wide" to={userBase(user.username)}>
            <Icon name="Search" size={17} />
            Talep Bul
          </Link>
        </aside>
      </section>
    </div>
  );
}
