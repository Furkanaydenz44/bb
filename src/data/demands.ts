import { imageIds } from './images';
import type { Demand, Offer, Presentation } from './types';

export const demands: Demand[] = [
  {
    id: 'd1',
    ownerId: 'furkan',
    categoryId: 'foto',
    title: 'Leica M6 35mm film makinesi arıyorum',
    description: 'Tercihen 0.72 vizör, temiz optik, ışık ölçer çalışır durumda. İstanbul içi elden teslim.',
    price: 55000,
    city: 'İstanbul',
    badge: 'Aktif Alıcı',
    createdAtLabel: '2 saat önce',
    coverImage: imageIds.camera,
    referenceImages: [imageIds.camera, imageIds.lens, imageIds.polaroid, '1452780212940-6f5c0d14d848', '1606986628253-05620e9b1b1a'],
  },
  { id: 'd2', ownerId: 'ahmetsafak', categoryId: 'sneaker', title: "Air Jordan 1 'Chicago' OG - US 10", description: '2015 veya OG baskı, deadstock tercih. Kutu ve orijinal bağcıklar tam olsun.', price: 22000, city: 'Ankara', badge: 'Güçlü Alıcı', createdAtLabel: '4 saat önce', coverImage: imageIds.jordan, referenceImages: [imageIds.jordan, imageIds.sneaker] },
  { id: 'd8', ownerId: 'derya', categoryId: 'foto', title: 'Polaroid SX-70 + film stoğu arıyorum', description: 'Çalışır durumda body, körük sızdırmasın. Yanında birkaç paket film olursa tercih.', price: 9000, city: 'İzmir', badge: 'Aktif Alıcı', createdAtLabel: '5 saat önce', coverImage: imageIds.polaroid, referenceImages: [imageIds.polaroid, imageIds.camera] },
  { id: 'd9', ownerId: 'emre', categoryId: 'sneaker', title: 'Yeezy 350 V2 Zebra - US 9', description: 'Orijinal, deadstock ya da çok temiz. StockX/Goat faturası ideal.', price: 11500, city: 'İstanbul', badge: 'Doğrulanmış', createdAtLabel: '1 saat önce', coverImage: imageIds.sneaker, referenceImages: [imageIds.sneaker, imageIds.jordan] },
  { id: 'd3', ownerId: 'murat', categoryId: 'muzik', title: "Fender Stratocaster '72 reissue", description: 'Japonya veya Meksika üretimi, orijinal pickup. Kılıf dahil.', price: 42500, city: 'İzmir', badge: 'Doğrulanmış', createdAtLabel: '1 gün önce', coverImage: imageIds.guitar, referenceImages: [imageIds.guitar, imageIds.studio] },
  { id: 'd11', ownerId: 'selin', categoryId: 'muzik', title: 'Roland Juno-106 analog synth', description: 'Servis görmüş, tüm tuşlar çalışsın. Voice chip sorunu olmasın.', price: 32500, city: 'İstanbul', badge: 'Güçlü Alıcı', createdAtLabel: '1 gün önce', coverImage: imageIds.synth, referenceImages: [imageIds.synth, imageIds.studio] },
  { id: 'd5', ownerId: 'kaan', categoryId: 'koleksiyon', title: 'Orijinal baskı jazz plak koleksiyonu', description: 'Blue Note / Impulse orijinal baskılar. VG+ ve üzeri. Liste karşılığı teklif beklerim.', price: 14000, city: 'İstanbul', badge: 'Aktif Alıcı', createdAtLabel: '3 saat önce', coverImage: imageIds.vinyl, referenceImages: [imageIds.vinyl], featured: true },
  { id: 'd14', ownerId: 'derya', categoryId: 'koleksiyon', title: 'Pink Floyd ilk baskı LP seti', description: 'DSOTM, Wish You Were Here ilk baskılar. Kapak ve plak durumu önemli.', price: 10000, city: 'Ankara', badge: 'Aktif Alıcı', createdAtLabel: '6 saat önce', coverImage: imageIds.vinyl, referenceImages: [imageIds.vinyl] },
  { id: 'd6', ownerId: 'selin', categoryId: 'saat', title: "Vintage Omega Seamaster 60'lar", description: 'Orijinal kadran, servis görmüş mekanizma. Ekspertize açık olmalı.', price: 42500, city: 'İstanbul', badge: 'Güçlü Alıcı', createdAtLabel: '2 gün önce', coverImage: imageIds.watch2, referenceImages: [imageIds.watch2, imageIds.watch] },
  { id: 'd10', ownerId: 'murat', categoryId: 'saat', title: 'Seiko SKX007 dalış saati', description: 'Orijinal, modifiye olmayan. Bracelet veya kauçuk fark etmez.', price: 9500, city: 'Ankara', badge: 'Aktif Alıcı', createdAtLabel: '7 saat önce', coverImage: imageIds.watch, referenceImages: [imageIds.watch] },
  { id: 'd7', ownerId: 'can', categoryId: 'teknoloji', title: 'DJI Mavic 3 Pro drone faturalı', description: 'Fly More combo tercih. Düşük uçuş saati, hasarsız gimbal.', price: 52500, city: 'Bursa', badge: 'Doğrulanmış', createdAtLabel: '3 gün önce', coverImage: imageIds.drone, referenceImages: [imageIds.drone] },
  { id: 'd12', ownerId: 'can', categoryId: 'teknoloji', title: 'PS5 + 2 kol + 3 oyun bundle', description: 'Disk sürümü tercih, faturalı. Az kullanılmış olsun.', price: 17000, city: 'Bursa', badge: 'Aktif Alıcı', createdAtLabel: '2 saat önce', coverImage: imageIds.controller, referenceImages: [imageIds.controller] },
  { id: 'd13', ownerId: 'kaan', categoryId: 'oto', title: 'Klasik VW Beetle 1303 proje', description: 'Restorasyona uygun, motoru çalışan. Ruhsat temiz olsun.', price: 150000, city: 'İstanbul', badge: 'Doğrulanmış', createdAtLabel: '1 gün önce', coverImage: imageIds.car, referenceImages: [imageIds.car] },
];

export const presentations: Presentation[] = [
  {
    id: 'p1',
    demandId: 'd1',
    sellerId: 'ahmetsafak',
    condition: 'İkinci el - kutulu',
    city: 'İstanbul',
    coverImage: imageIds.camera,
    images: [imageIds.camera, imageIds.lens, imageIds.polaroid, '1452780212940-6f5c0d14d848', '1606986628253-05620e9b1b1a'],
    videos: 1,
    description: 'Leica M6 0.72, 1998 üretim. Işık ölçer kalibre edildi, optik tertemiz, pirinç gövde temiz. Kutulu; fatura ve 3 ay garanti ile teslim.',
    status: 'submitted',
  },
];

export const offers: Offer[] = [];
