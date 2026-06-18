interface AvatarProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ label, size = 'md' }: AvatarProps) {
  return <span className={`avatar avatar-${size}`}>{label}</span>;
}
