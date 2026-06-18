import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { unsplash } from '../../data/images';

export interface DemandCardViewProps {
  coverImage: string;
  title: string;
  /** Already-formatted price string (e.g. "55.000₺") or a placeholder ("Fiyat belirt"). */
  price: string;
  timeLabel: string;
  views: number;
  ownerName: string;
  ownerAvatar: string;
  ownerScore: number;
  presentationCount: number;
  mine: boolean;
  progress: number;
}

/** Inner content of a demand grid card — shared by the feed (DemandCard) and the create-page preview so they stay identical. */
export function DemandCardView({
  coverImage,
  title,
  price,
  timeLabel,
  views,
  ownerName,
  ownerAvatar,
  ownerScore,
  presentationCount,
  mine,
  progress,
}: DemandCardViewProps) {
  return (
    <>
      <div className="demand-image">
        <img src={unsplash(coverImage, 620)} alt="" />
        <span className="floating-meta">
          <Icon name="Clock" size={12} /> {timeLabel}
        </span>
        <span className="floating-meta meta-right">
          <Icon name="Eye" size={12} /> {views}
        </span>
      </div>
      <div className="demand-card-body">
        <div className="demand-card-title">{title}</div>
        <div className="card-label">{mine ? 'Senin fiyatın' : 'Fiyat'}</div>
        <div className="price-line">{price}</div>
        <div className="card-footer">
          {mine ? (
            <>
              <span className="mine-chip">
                <span className="mine-dot" /> Senin
              </span>
              <span className="footer-stat">{presentationCount} sunum</span>
            </>
          ) : (
            <>
              <Avatar label={ownerAvatar} size="sm" />
              <span className="owner-name">{ownerName}</span>
              <span className="card-rate">
                <Icon name="Star" size={11} /> {ownerScore.toFixed(1)}
              </span>
            </>
          )}
        </div>
        <div className="card-prog">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="card-pline">
          {mine
            ? presentationCount
              ? `${presentationCount} teklif geldi`
              : 'Sunum bekleniyor'
            : presentationCount
              ? `${presentationCount} satıcı sundu`
              : 'İlk sunan ol'}
        </div>
      </div>
    </>
  );
}
