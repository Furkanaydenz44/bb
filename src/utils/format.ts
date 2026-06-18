export function formatPrice(value: number) {
  return `${Math.round(value).toLocaleString('tr-TR')}₺`;
}

export function compactPrice(value: number) {
  return formatPrice(value);
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toLocaleUpperCase('tr-TR');
}

export function hashNum(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function viewersOf(seed: string) {
  return 4 + (hashNum(seed) % 21);
}

export function progressPct(presentationCount: number, mine: boolean) {
  return Math.min(100, presentationCount * 26 + (mine ? 15 : 34));
}

export function shortName(name: string) {
  const parts = String(name).split(' ');
  return parts[0] + (parts[1] ? ` ${parts[1][0]}.` : '');
}
