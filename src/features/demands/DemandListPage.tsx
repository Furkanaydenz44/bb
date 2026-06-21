import { Link, NavLink, useParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { categories } from '../../data/categories';
import { getCategory, getUser } from '../../services/catalogService';
import { categoryPath, userBase } from '../../utils/routes';
import { DemandCard } from './DemandCard';
import { useAppData } from '../../store/appData';

export function DemandListPage() {
  const { username = '@ahmetsafak', categoryId } = useParams();
  const activeUser = getUser(username);
  const { getDemands } = useAppData();
  const activeCategory = getCategory(categoryId);
  const base = userBase(activeUser.username);
  const demands = getDemands(categoryId);
  const featured = getDemands()
    .filter((demand) => demand.featured || demand.price >= 50000)
    .slice(0, 5);

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
          <p>Bütçesine uygun ürünü olan satıcılar bu taleplere sunum gönderir.</p>
        </div>
        <span className="muted-count">{demands.length} talep</span>
      </div>
      <div className="demand-grid">
        {demands.map((demand) => (
          <DemandCard key={demand.id} demand={demand} />
        ))}
      </div>
    </div>
  );
}
