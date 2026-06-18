export const unsplash = (id: string, width = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=78`;

/**
 * Bir görsel referansını gerçek <img src> değerine çevirir.
 * - Yüklenmiş görseller base64 data URL ('data:...') -> olduğu gibi
 * - http(s)/blob URL -> olduğu gibi
 * - Aksi halde Unsplash foto id -> unsplash() ile genişlet
 */
export function imageSrc(idOrUrl: string | undefined, width = 900): string {
  if (!idOrUrl) return '';
  if (
    idOrUrl.startsWith('data:') ||
    idOrUrl.startsWith('http://') ||
    idOrUrl.startsWith('https://') ||
    idOrUrl.startsWith('blob:') ||
    idOrUrl.startsWith('/')
  ) {
    return idOrUrl;
  }
  return unsplash(idOrUrl, width);
}

export const imageIds = {
  camera: '1516035069371-29a1b244cc32',
  lens: '1495707902641-75cac588d2e9',
  polaroid: '1526170375885-4d8ecf77b99f',
  vinyl: '1539375665275-f9de415ef9ac',
  sneaker: '1542291026-7eec264c27ff',
  jordan: '1556906781-9a412961c28c',
  watch: '1523275335684-37898b6baf30',
  watch2: '1547996160-81dfa63595aa',
  guitar: '1510915361894-db8b60106cb1',
  drone: '1473968512647-3e447244af8f',
  synth: '1598488035139-bdbb2231ce04',
  car: '1503376780353-7e6692767b70',
  controller: '1606144042614-b2417e99c4e3',
  studio: '1564186763535-ebb21ef5277f',
};
