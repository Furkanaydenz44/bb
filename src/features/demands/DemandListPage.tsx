import { Link, NavLink, useParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { categories } from '../../data/categories';
import { getCategory, getUser } from '../../services/catalogService';
import { categoryPath, demandPath, userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';
import { DemandCard } from './DemandCard';
import { useAppData } from '../../store/appData';

export function DemandListPage() {
  const { username = '@ahmetsafak', categoryId } = useParams();
  const activeUser = getUser(username);
  const { getDemands, getDemandPresentations } = useAppData();
  const activeCategory = getCategory(categoryId);
  const base = userBase(activeUser.username);
  const demands = getDemands(categoryId);
  const featured = getDemands()
    .filter((demand) => demand.featured || demand.price >= 50000)
    .slice(0, 5);
  const totalBudget = demands.reduce((sum, demand) => sum + demand.price, 0);
  const presentationCount = demands.reduce((sum, demand) => sum + getDemandPresentations(demand.id).length, 0);

  return (
    <div className="page-stack">
      <PageHeader
        title={activeCategory ? activeCategory.name : 'Talep Pazarı'}
        description={`${activeUser.name} bağlamında açık alıcı taleplerini, kategori fırsatlarını ve sunum akışlarını yönet.`}
        actions={
          <>
            <Link className="button ghost" to={`${base}/araclar/teklif-kredisi`}>
              <Icon name="Calculator" size={17} />
              Kredi Hesapla
            </Link>
            <Link className="button primary" to={`${base}/talep-ac`}>
              <Icon name="Plus" size={17} />
              Talep Aç
            </Link>
          </>
        }
      />

      <nav className="category-nav" aria-label="Kategoriler">
        <NavLink to={base} end className="category-chip">
          <Icon name="LayoutDashboard" size={16} />
          Tümü
        </NavLink>
        {categories.map((category) => (
          <NavLink key={category.id} to={categoryPath(activeUser.username, category.id)} className="category-chip">
            <Icon name={category.icon as IconName} size={16} />
            {category.shortName}
          </NavLink>
        ))}
      </nav>

      <section className="insight-strip" aria-label="Talep özeti">
        <div>
          <span>Aktif talep</span>
          <strong>{demands.length}</strong>
        </div>
        <div>
          <span>Toplam bütçe</span>
          <strong>{formatPrice(totalBudget)}</strong>
        </div>
        <div>
          <span>Sistemde sunum</span>
          <strong>{presentationCount}</strong>
        </div>
        <div>
          <span>Ortalama bütçe</span>
          <strong>{formatPrice(demands.length ? totalBudget / demands.length : 0)}</strong>
        </div>
      </section>

      <section className="workbench">
        <div className="main-column">
          <div className="section-heading">
            <div>
              <h2>Şimdi ilgi gören</h2>
              <p>Yüksek bütçeli ve hızlı aksiyon bekleyen talepler.</p>
            </div>
            <StatusBadge tone="green">canlı</StatusBadge>
          </div>
          <div className="demand-grid compact">
            {featured.map((demand) => (
              <DemandCard key={demand.id} demand={demand} />
            ))}
          </div>

          <div className="section-heading">
            <div>
              <h2>{activeCategory ? `${activeCategory.shortName} talepleri` : 'Tüm talepler'}</h2>
              <p>Her karta tıklandığında ilan sahibinin gerçek URL yapısı açılır.</p>
            </div>
            <span className="muted-count">{demands.length} ilan</span>
          </div>
          <div className="demand-grid">
            {demands.map((demand) => (
              <DemandCard key={demand.id} demand={demand} />
            ))}
          </div>
        </div>

        <aside className="rail-panel" aria-label="Operasyon özeti">
          <div className="rail-section">
            <span className="eyebrow">Bugünkü öncelik</span>
            <h3>Net bütçesi yüksek taleplerden başla.</h3>
            <p>Sunum maliyeti düşük, doğrulama ihtimali yüksek talepler teklif akışında öne alınır.</p>
          </div>
          <div className="rail-list">
            {featured.slice(0, 3).map((demand, index) => (
              <Link key={demand.id} className="rail-row" to={demandPath(activeUser.username, demand)}>
                <span>{index + 1}</span>
                <div>
                  <strong>{demand.title}</strong>
                  <small>{formatPrice(demand.price)} · {demand.city}</small>
                </div>
                <Icon name="ChevronRight" size={17} />
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
