import type { User } from './types';

export const users: User[] = [
  {
    id: 'ahmetsafak',
    username: 'ahmetsafak',
    name: 'Ahmet Şafak',
    avatar: 'AŞ',
    city: 'İstanbul',
    score: 4.8,
    reviews: 38,
    sales: 34,
    responseTime: '~1 saat',
    completionRate: 98,
    trustSignals: ['Doğrulanmış', 'Güvenilir Satıcı', 'Hızlı Kargolayan', 'Sunum Kalitesi Yüksek'],
  },
  {
    id: 'furkan',
    username: 'furkan',
    name: 'Furkan Aydeniz',
    avatar: 'FD',
    city: 'İstanbul',
    score: 4.6,
    reviews: 21,
    sales: 18,
    responseTime: '~2 saat',
    completionRate: 95,
    trustSignals: ['Doğrulanmış', 'Sunum Kalitesi Yüksek'],
  },
  { id: 'derya', username: 'derya', name: 'Derya Soysal', avatar: 'DS', city: 'İzmir', score: 4.9, reviews: 42, sales: 51, responseTime: '~45 dk', completionRate: 99, trustSignals: ['Doğrulanmış', 'Hızlı Kargolayan'] },
  { id: 'emre', username: 'emre', name: 'Emre Kaya', avatar: 'EK', city: 'İstanbul', score: 4.7, reviews: 18, sales: 28, responseTime: '~3 saat', completionRate: 94, trustSignals: ['Sunum Kalitesi Yüksek'] },
];
