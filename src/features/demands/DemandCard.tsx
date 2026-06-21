import { Link, useParams } from 'react-router-dom';
import type { Demand } from '../../data/types';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import { formatPrice, progressPct, shortName } from '../../utils/format';
import { demandPath } from '../../utils/routes';
import { DemandCardView } from './DemandCardView';

interface DemandCardProps {
  demand: Demand;
}

export function DemandCard({ demand }: DemandCardProps) {
  const { username = '@ahmetsafak' } = useParams();
  const activeUser = getUser(username);
  const { getDemandPresentations } = useAppData();
  const owner = getUser(demand.ownerId);
  const presentations = getDemandPresentations(demand.id);
  const isMine = activeUser.id === demand.ownerId;

  return (
    <Link className="demand-card" to={demandPath(activeUser.username, demand)}>
      <DemandCardView
        coverImage={demand.coverImage}
        title={demand.title}
        price={formatPrice(demand.price)}
        timeLabel={demand.createdAtLabel}
        ownerName={shortName(owner.name)}
        ownerAvatar={owner.avatar}
        ownerScore={owner.score}
        presentationCount={presentations.length}
        mine={isMine}
        progress={progressPct(presentations.length, isMine)}
      />
    </Link>
  );
}
