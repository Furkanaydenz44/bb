import { Icon } from './Icon';
import { useAppData } from '../store/appData';
import type { UserId } from '../data/types';

interface FavoriteButtonProps {
  demandId: string;
  userId: UserId;
  size?: 'sm' | 'lg';
}

export function FavoriteButton({ demandId, userId, size = 'sm' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useAppData();
  const active = isFavorite(userId, demandId);

  return (
    <button
      type="button"
      className={`favorite-btn favorite-btn-${size}${active ? ' active' : ''}`}
      aria-label={active ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(userId, demandId);
      }}
    >
      <Icon name="Heart" size={size === 'lg' ? 20 : 16} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
