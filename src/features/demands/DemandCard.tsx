import { Link, useParams } from 'react-router-dom';
import type { Demand } from '../../data/types';
import { getUser } from '../../services/catalogService';
import { formatPrice, shortName } from '../../utils/format';
import { demandPath } from '../../utils/routes';
import { DemandCardView } from './DemandCardView';

interface DemandCardProps {
  demand: Demand;
}

export function DemandCard({ demand }: DemandCardProps) {
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
        timeLabel={demand.createdAtLabel}
        ownerName={shortName(owner.name)}
      />
    </Link>
  );
}
