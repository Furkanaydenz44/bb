import { Link, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { getCategory, getUser } from '../../services/catalogService';
import { userBase } from '../../utils/routes';
import { DemandCard } from './DemandCard';
import { useAppData } from '../../store/appData';

export function DemandListPage() {
  const { username = '@ahmetsafak', categoryId } = useParams();
  const activeUser = getUser(username);
  const { getDemands } = useAppData();
  const activeCategory = getCategory(categoryId);
  const base = userBase(activeUser.username);
  const demands = getDemands(categoryId);
  const featured = getDemands(categoryId)
    .filter((demand) => demand.featured || demand.price >= 50000)
    .slice(0, 5);

  return (
    <div className="page-stack">
      <PageHeader
        title={activeCategory ? activeCategory.name : 'Talep Pazarı'}
        className="page-header-lime"
        description=""
        actions={
          <Link className="button ghost" to={`${base}/araclar/teklif-kredisi`}>
            <Icon name="Calculator" size={17} />
            Kredi Hesapla
          </Link>
        }
      />

      <div className="section-heading">
        <div>
          <h2>Şimdi ilgi gören</h2>
          <p>Aksiyon bekleyen talepler.</p>
        </div>
      </div>
      <div className="demand-grid compact">
        {featured.map((demand) => (
          <DemandCard key={demand.id} demand={demand} />
        ))}
      </div>

      <div className="section-heading">
        <div>
          <h2>{activeCategory ? `${activeCategory.shortName} talepleri` : 'Tüm talepler'}</h2>
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
