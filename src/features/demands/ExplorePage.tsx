import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { categories } from '../../data/categories';
import { getDemands, getUser } from '../../services/catalogService';
import { categoryPath, demandPath, userBase } from '../../utils/routes';
import { formatPrice, locationLabel } from '../../utils/format';

export function ExplorePage() {
  const { username = '@ahmetsafak' } = useParams();
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') ?? '').trim();
  const activeUser = getUser(username);
  const demands = getDemands();
  const base = userBase(activeUser.username);

  const qLower = q.toLocaleLowerCase('tr-TR');
  const results = q
    ? demands.filter((d) =>
        [d.title, d.description, d.city, d.district ?? '', categories.find((c) => c.id === d.categoryId)?.name ?? '']
          .join(' ')
          .toLocaleLowerCase('tr-TR')
          .includes(qLower),
      )
    : [];

  return (
    <div className="page-stack">
      <PageHeader
        title="Keşfet"
        description="Aradığın ürünü üstteki çubuktan ara ya da kategoriden gözat."
        actions={
          <Link className="button primary" to={`${base}/talep-ac`}>
            <Icon name="Plus" size={17} />
            Talep Aç
          </Link>
        }
      />

      {q ? (
        <>
          <section className="section-heading">
            <div>
              <h2>“{q}” için {results.length} sonuç</h2>
              <p>Talep başlığı, açıklama, şehir ve kategoride eşleşen talepler.</p>
            </div>
            <Link className="button ghost" to={`${base}/kesfet`}>
              <Icon name="X" size={16} />
              Aramayı temizle
            </Link>
          </section>
          <div className="opportunity-list">
            {results.length ? (
              results.map((demand) => {
                const owner = getUser(demand.ownerId);
                return (
                  <Link key={demand.id} className="opportunity-row" to={demandPath(activeUser.username, demand)}>
                    <div>
                      <strong>{demand.title}</strong>
                      <span>@{owner.username} · {locationLabel(demand.city, demand.district)}</span>
                    </div>
                    <b>{formatPrice(demand.price)}</b>
                    <Icon name="ChevronRight" size={18} />
                  </Link>
                );
              })
            ) : (
              <div className="empty-inline">Eşleşen talep bulunamadı. Farklı bir kelime dene.</div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="section-heading">
            <div>
              <h2>Kategoriler</h2>
              <p>Bir kategoriye gir, o kategorideki açık alıcı taleplerini gör.</p>
            </div>
          </div>
          <section className="category-board">
            {categories.map((category) => {
              const count = demands.filter((demand) => demand.categoryId === category.id).length;
              return (
                <Link key={category.id} className="category-tile" to={categoryPath(activeUser.username, category.id)}>
                  <Icon name={category.icon as IconName} size={22} />
                  <strong>{category.name}</strong>
                  <span>{count} aktif talep</span>
                  <Icon name="ChevronRight" size={18} />
                </Link>
              );
            })}
          </section>

          <div className="section-heading">
            <div>
              <h2>Araçlar</h2>
              <p>Talebe sunum yapmadan önce kredi maliyetini hesapla.</p>
            </div>
          </div>
          <section className="explore-tools">
            <Link className="tool-row" to={`${base}/araclar/teklif-kredisi`}>
              <Icon name="Calculator" size={18} />
              <span>Teklif kredisi hesaplayıcı</span>
              <Icon name="ChevronRight" size={16} />
            </Link>
            <Link className="tool-row" to={`${base}/kredi`}>
              <Icon name="WalletCards" size={18} />
              <span>Kredi paketleri</span>
              <Icon name="ChevronRight" size={16} />
            </Link>
          </section>
        </>
      )}
    </div>
  );
}
