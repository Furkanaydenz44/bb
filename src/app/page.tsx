export default function DesignGatePage() {
  return (
    <div style={{ padding: 32, maxWidth: 920, margin: '0 auto' }}>
      <div className="page-header">
        <h1>Bulbana — tasarım kontrolü</h1>
      </div>
      <p style={{ color: 'var(--muted)', marginTop: 6 }}>
        Next.js 15 üzerinde global.css ve fontlar (Plus Jakarta Sans + Figtree) birebir mi?
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 18, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="button primary">Mor buton</button>
        <button className="button ghost">Ghost buton</button>
        <span className="status-badge status-green">canlı</span>
        <span className="status-badge status-purple">mor rozet</span>
      </div>

      <div className="demand-card" style={{ maxWidth: 280, marginTop: 26 }}>
        <div className="demand-image" style={{ background: 'var(--surface-soft)' }} />
        <div className="demand-card-body">
          <div className="demand-card-title">Leica M6 35mm film makinesi arıyorum</div>
          <div className="card-label">Fiyat</div>
          <div className="price-line">55.000₺</div>
          <div className="card-pline">İlk sunan ol</div>
        </div>
      </div>
    </div>
  );
}
