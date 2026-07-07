import type { ReactNode } from 'react';
import { imageSrc } from '../../data/images';

export interface DemandCardViewProps {
  coverImage: string;
  title: string;
  description: string;
  price: string;
  ownerName: string;
  subcategoryLabel?: string;
  favoriteButton?: ReactNode;
}

export function DemandCardView({
  coverImage,
  title,
  description,
  price,
  subcategoryLabel,
  favoriteButton,
}: DemandCardViewProps) {
  const shortDesc = description.length > 72 ? description.slice(0, 72).trimEnd() + '…' : description;

  return (
    <>
      <div className="demand-image">
        <img src={imageSrc(coverImage, 620)} alt="" />
        {favoriteButton}
      </div>
      <div className="demand-card-body">
        {subcategoryLabel && <span className="demand-subcat-label">{subcategoryLabel}</span>}
        <div className="demand-card-title">{title}</div>
        <div className="demand-card-desc">{shortDesc}</div>
        <div className="price-line">{price}</div>
      </div>
    </>
  );
}
