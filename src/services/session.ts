import { users as seedUsers } from '../data/users';
import type { User } from '../data/types';
import { initials } from '../utils/format';
import { slugify } from '../utils/routes';

/**
 * Demo oturum + kullanıcı deposu.
 * Kalıcılık tarayıcının localStorage'ında tutulur ("hayali txt dosyası"):
 *  - bulbana.currentUserId : o an giriş yapmış kullanıcının id'si
 *  - bulbana.customUsers   : kayıt olan yeni hesaplar (seed kullanıcılara ek)
 * Sunucu/veritabanı yok; gerçek ürün için bu katman API ile değişecek.
 */

const CURRENT_KEY = 'bulbana.currentUserId';
const CUSTOM_KEY = 'bulbana.customUsers';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getCustomUsers(): User[] {
  return read<User[]>(CUSTOM_KEY, []);
}

export function getAllUsers(): User[] {
  return [...seedUsers, ...getCustomUsers()];
}

export function findUser(usernameOrId?: string): User | undefined {
  const key = (usernameOrId ?? '').replace(/^@/, '').toLocaleLowerCase('tr-TR');
  return getAllUsers().find(
    (u) => u.username.toLocaleLowerCase('tr-TR') === key || u.id.toLocaleLowerCase('tr-TR') === key,
  );
}

export function getCurrentUser(): User | null {
  const id = localStorage.getItem(CURRENT_KEY);
  if (!id) return null;
  return getAllUsers().find((u) => u.id === id) ?? null;
}

export function login(userId: string) {
  localStorage.setItem(CURRENT_KEY, userId);
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY);
}

export function createAccount(input: { name: string; city: string }): User {
  const name = input.name.trim() || 'Yeni Üye';
  const taken = new Set(getAllUsers().map((u) => u.username));
  let username = slugify(name) || 'uye';
  if (taken.has(username)) {
    let n = 2;
    while (taken.has(`${username}-${n}`)) n += 1;
    username = `${username}-${n}`;
  }
  const user: User = {
    id: `u-${Date.now()}`,
    username,
    name,
    avatar: initials(name),
    city: input.city.trim() || 'İstanbul',
    score: 5,
    reviews: 0,
    sales: 0,
    responseTime: 'yeni',
    completionRate: 100,
    trustSignals: ['Yeni üye'],
  };
  localStorage.setItem(CUSTOM_KEY, JSON.stringify([...getCustomUsers(), user]));
  login(user.id);
  return user;
}
