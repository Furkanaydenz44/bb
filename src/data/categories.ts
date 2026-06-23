import type { Category, CategoryId } from './types';

export const categories: Category[] = [
  { id: 'foto', name: 'Foto & Kamera', shortName: 'Foto', icon: 'Camera' },
  { id: 'muzik', name: 'Müzik & Enstrüman', shortName: 'Müzik', icon: 'Music' },
  { id: 'sneaker', name: 'Sneaker & Moda', shortName: 'Sneaker', icon: 'Footprints' },
  { id: 'saat', name: 'Saat & Mücevher', shortName: 'Saat', icon: 'Watch' },
  { id: 'koleksiyon', name: 'Koleksiyon & Plak', shortName: 'Koleksiyon', icon: 'Disc3' },
  { id: 'teknoloji', name: 'Teknoloji & Drone', shortName: 'Teknoloji', icon: 'Cpu' },
  { id: 'oto', name: 'Yedek Parça & Aksesuar', shortName: 'Parça', icon: 'Settings' },
];

export interface CategoryGroup {
  title: string;
  items: string[];
}

// Mega-menü alt kategorileri: her grup başlığı kategoriye, her madde aramaya (?q=) gider.
export const categoryGroups: Record<CategoryId, CategoryGroup[]> = {
  foto: [
    { title: 'Analog Makineler', items: ['Leica', 'Film Makineleri', 'Polaroid', 'Orta Format', 'Telemetre'] },
    { title: 'Lens & Ekipman', items: ['Vintage Lens', 'Tripod', 'Flaş', 'Çanta', 'Filtre'] },
    { title: 'Sarf & Banyo', items: ['Film', 'Banyo Kiti', 'Fotoğraf Kağıdı'] },
  ],
  muzik: [
    { title: 'Tel & Klavye', items: ['Elektro Gitar', 'Akustik Gitar', 'Bas Gitar', 'Synthesizer', 'Piyano'] },
    { title: 'Ses & Efekt', items: ['Vintage Amfi', 'Efekt Pedalı', 'Mikrofon', 'Plak Çalar'] },
    { title: 'Vurmalı & Üflemeli', items: ['Davul', 'Saksofon', 'Trompet'] },
  ],
  sneaker: [
    { title: 'Sneaker', items: ['Jordan', 'Yeezy', 'Dunk', 'Vintage Sneaker', 'Limited Drop'] },
    { title: 'Giyim', items: ['Streetwear', 'Vintage Ceket', 'Tişört', 'Denim'] },
    { title: 'Aksesuar', items: ['Çanta', 'Şapka', 'Gözlük'] },
  ],
  saat: [
    { title: 'Saat', items: ['Mekanik Saat', 'Vintage Saat', 'Dalış Saati', 'Cep Saati', 'Otomatik'] },
    { title: 'Mücevher', items: ['Pırlanta', 'Altın', 'Gümüş', 'Antika Yüzük'] },
    { title: 'Koleksiyon', items: ['İmzalı Saat', 'Sınırlı Üretim'] },
  ],
  koleksiyon: [
    { title: 'Plak & Müzik', items: ['Vinyl', '45’lik', 'Vintage Kaset', 'Box Set'] },
    { title: 'Kart & Figür', items: ['TCG Kart', 'Figür', 'Pokemon', 'Aksiyon Figürü'] },
    { title: 'Antika', items: ['Pul', 'Para', 'Poster', 'İmzalı Ürün'] },
  ],
  teknoloji: [
    { title: 'Drone & Kamera', items: ['Drone', 'Gimbal', 'Aksiyon Kamera'] },
    { title: 'Retro', items: ['Retro Konsol', 'Vintage Bilgisayar', 'Atari', 'Amiga'] },
    { title: 'Ses & Telefon', items: ['Hi-Fi', 'Vintage Telefon', 'Kulaklık'] },
  ],
  oto: [
    { title: 'Araç', items: ['Klasik Otomobil', 'Motosiklet', 'Vespa', 'Cabrio'] },
    { title: 'Parça', items: ['Yedek Parça', 'Vintage Jant', 'Motor'] },
    { title: 'Aksesuar', items: ['Plaka', 'Oto Radyo', 'Maket'] },
  ],
};
