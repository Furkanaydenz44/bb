import { Link, useParams } from 'react-router-dom';
import type { Demand } from '../../data/types';
import { getUser } from '../../services/catalogService';
import { formatPrice, shortName } from '../../utils/format';
import { demandPath } from '../../utils/routes';
import { DemandCardView } from './DemandCardView';
import { FavoriteButton } from '../../components/FavoriteButton';

interface DemandCardProps {
  demand: Demand;
  subcategoryLabel?: string;
}

export function DemandCard({ demand, subcategoryLabel }: DemandCardProps) {
  const { username = '@ahmetsafak' } = useParams();
  const activeUser = getUser(username);
  const owner = getUser(demand.ownerId);

  return (
    <Link className="demand-card" to={demandPath(activeUser.username, demand)}>
      <DemandCardView
        coverImage={demand.coverImage}
        title={demand.title}
        description={demand.description}
        price={formatPrice(demand.price)}
        ownerName={shortName(owner.name)}
        subcategoryLabel={subcategoryLabel}
        favoriteButton={<FavoriteButton demandId={demand.id} userId={activeUser.id} />}
      />
    </Link>
  );
}
