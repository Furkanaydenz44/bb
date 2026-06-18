'use client';

import dynamic from 'next/dynamic';

// react-router SSR'da window ister; ssr:false ile yalnız client'ta render et.
const SpaApp = dynamic(() => import('../SpaApp'), { ssr: false });

export default function CatchAllPage() {
  return <SpaApp />;
}
