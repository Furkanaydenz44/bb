import { Link, useParams } from 'react-router-dom';
import { Icon, type IconName } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { categories } from '../../data/categories';
import { imageSrc, imageIds } from '../../data/images';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { categoryPath } from '../../utils/routes';

const categoryImages: Record<string, string> = {
  foto: imageIds.camera,
  muzik: imageIds.guitar,
  sneaker: imageIds.sneaker,
  saat: imageIds.watch2,
  koleksiyon: imageIds.vinyl,
  teknoloji: imageIds.drone,
  oto: imageIds.car,
};

export function CategoriesPage() {
  const { username = '@ahmetsafak' } = useParams();
  const activeUser = getUser(username);
  const { getDemands } = useAppData();
  const demands = getDemands();

  return (
    <div className="page-stack">
      <PageHeader title="Kategoriler" description="Aradığın ürünün kategorisine göz at." />

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
    </div>
  );
}
