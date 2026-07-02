import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { categories } from '../../data/categories';
import { imageSrc, imageIds } from '../../data/images';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { categoryPath, demandPath, userBase } from '../../utils/routes';
import { formatPrice, locationLabel } from '../../utils/format';
import { DemandCard } from './DemandCard';
import { getTopCategories } from '../../services/browsingHistory';

const categoryImages: Record<string, string> = {
  foto: imageIds.camera,
  muzik: imageIds.guitar,
  sneaker: imageIds.sneaker,
  saat: imageIds.watch2,
  koleksiyon: imageIds.vinyl,
  teknoloji: imageIds.drone,
  oto: imageIds.car,
};

export function ExplorePage() {
  const { username = '@ahmetsafak' } = useParams();
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') ?? '').trim();
  const activeUser = getUser(username);
  const { getDemands } = useAppData();
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

  const recentDemands = demands.slice(0, 4);

  const topCategoryIds = getTopCategories(activeUser.id, 2);
  const topCategoryNames = topCategoryIds
    .map((id) => categories.find((c) => c.id === id)?.shortName)
    .filter((name): name is string => Boolean(name));
  const recommendedDemands = topCategoryIds.length
    ? topCategoryIds
        .flatMap((id) => demands.filter((d) => d.categoryId === id))
        .filter((d, index, all) => all.findIndex((other) => other.id === d.id) === index)
        .slice(0, 4)
    : [];

  return (
    <div className="page-stack">
      <PageHeader
        title="Keşfet"
        description="Aradığın ürünü üstteki arama çubuğundan arat ya da kategorilere göz at."
      />

      {q ? (
        <>
          <section className="section-heading">
            <div>
              <h2>"{q}" için {results.length} sonuç</h2>
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
          {recommendedDemands.length > 0 && (
            <>
              {/* Sana Özel */}
              <div className="section-heading">
                <div>
                  <h2>Sana Özel</h2>
                  <p>{topCategoryNames.join(' ve ')} kategorilerinde gezindin — bunlar ilgini çekebilir.</p>
                </div>
              </div>
              <section className="demand-grid">
                {recommendedDemands.map((demand) => (
                  <DemandCard key={demand.id} demand={demand} />
                ))}
              </section>
            </>
          )}

          {/* Kategoriler */}
          <div className="section-heading">
            <div>
              <h2>Kategoriler</h2>
            </div>
          </div>
          <section className="category-visual-grid">
            {categories.map((category) => {
              const count = demands.filter((demand) => demand.categoryId === category.id).length;
              const img = categoryImages[category.id];
              return (
                <Link
                  key={category.id}
                  className="category-visual-card"
                  to={categoryPath(activeUser.username, category.id)}
                >
                  <img src={imageSrc(img, 600)} alt={category.name} />
                  <div className="category-visual-overlay">
                    <div className="category-visual-icon">
                      <Icon name={category.icon as IconName} size={20} />
                    </div>
                    <div className="category-visual-info">
                      <strong>{category.name}</strong>
                      <span>{count} aktif talep</span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="category-visual-arrow" />
                  </div>
                </Link>
              );
            })}
          </section>

          {/* Son Talepler */}
          <div className="section-heading">
            <div>
              <h2>Son Talepler</h2>
              <p>Platformdaki en yeni alıcı talepleri — sunum yapmaya başla.</p>
            </div>
          </div>
          <section className="demand-grid">
            {recentDemands.map((demand) => (
              <DemandCard key={demand.id} demand={demand} />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
