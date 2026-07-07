import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { getCategory, getUser } from '../../services/catalogService';
import { DemandCard } from './DemandCard';
import { useAppData } from '../../store/appData';
import { categoryGroups } from '../../data/categories';
import type { CategoryId } from '../../data/types';
import { recordCategoryView } from '../../services/browsingHistory';

export function DemandListPage() {
  const { username = '@ahmetsafak', categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const groupParam = searchParams.get('group');
  const activeUser = getUser(username);
  const { getDemands } = useAppData();
  const activeCategory = getCategory(categoryId);
  const allDemands = getDemands(categoryId);

  useEffect(() => {
    if (activeCategory) recordCategoryView(activeUser.id, activeCategory.id);
  }, [activeCategory, activeUser.id]);

  // Grup modu: gruptaki tüm öğeleri metin eşleşmesiyle tara
  const groupData = categoryId && groupParam
    ? (categoryGroups[categoryId as CategoryId] ?? []).find((g) => g.title === groupParam)
    : null;

  const demandLabels = new Map<string, string>();
  if (groupData) {
    for (const demand of allDemands) {
      const text = [demand.title, demand.description].join(' ').toLocaleLowerCase('tr-TR');
      const matched = groupData.items.find((item) => text.includes(item.toLocaleLowerCase('tr-TR')));
      if (matched) demandLabels.set(demand.id, matched);
    }
  }

  const demands = groupData
    ? allDemands.filter((d) => demandLabels.has(d.id))
    : allDemands;

  const featuredFiltered = demands
    .filter((demand) => demand.featured || demand.price >= 50000)
    .slice(0, 5);
  const featured = featuredFiltered.length > 0 ? featuredFiltered : demands.slice(0, 5);

  const pageTitle = groupParam || (activeCategory ? activeCategory.name : 'Talep Pazarı');

  return (
    <div className="page-stack">
      <PageHeader title={pageTitle} className="page-header-lime" description="" />

      <div className="section-heading">
        <div>
          <h2>Şimdi ilgi gören</h2>
          <p>Aksiyon bekleyen talepler.</p>
        </div>
      </div>
      <div className="demand-grid compact">
        {featured.map((demand) => (
          <DemandCard key={demand.id} demand={demand} subcategoryLabel={demandLabels.get(demand.id)} />
        ))}
      </div>

      <div className="section-heading">
        <div>
          <h2>{groupParam ? `${groupParam} ilanları` : activeCategory ? `${activeCategory.shortName} talepleri` : 'Tüm talepler'}</h2>
        </div>
        <span className="muted-count">{demands.length} talep</span>
      </div>
      <div className="demand-grid">
        {demands.map((demand) => (
          <DemandCard key={demand.id} demand={demand} subcategoryLabel={demandLabels.get(demand.id)} />
        ))}
      </div>
    </div>
  );
}
