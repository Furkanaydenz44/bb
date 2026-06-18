// Dosyaları base64 data URL'e çevirir (Supabase Storage gelene kadar localStorage'da saklanır).
// Büyük görseller canvas ile küçültülür ki localStorage kotasını şişirmesin.

export async function filesToDataUrls(
  files: FileList | File[],
  opts: { maxDim?: number; quality?: number } = {},
): Promise<string[]> {
  const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
  return Promise.all(list.map((f) => fileToDataUrl(f, opts)));
}

export function fileToDataUrl(
  file: File,
  opts: { maxDim?: number; quality?: number } = {},
): Promise<string> {
  const maxDim = opts.maxDim ?? 1200;
  const quality = opts.quality ?? 0.82;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const longest = Math.max(img.width, img.height);
        if (longest <= maxDim) {
          resolve(dataUrl);
          return;
        }
        const scale = maxDim / longest;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
