import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import type { Thread } from '../../data/types';
import { userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';

const CARRIERS = ['Aras Kargo', 'Yurtiçi Kargo', 'MNG Kargo', 'PTT Kargo', 'Sürat Kargo', 'UPS', 'HepsiJet', 'Trendyol Express'];

function deadlineLabel(deadlineAt?: number) {
  if (!deadlineAt) return '3 gün';
  const ms = deadlineAt - Date.now();
  if (ms <= 0) return 'süre doldu';
  const hours = Math.floor(ms / 3_600_000);
  const days = Math.floor(hours / 24);
  if (days >= 1) return `${days} gün ${hours % 24} saat kaldı`;
  return `${hours} saat kaldı`;
}

export function MessagesPage() {
  const { username = '@ahmetsafak', threadId } = useParams();
  const me = getUser(username);
  const {
    getUserThreads,
    getThread,
    getThreadMessages,
    getDemands,
    sendMessage,
    getOfferForPresentation,
    getDealForPresentation,
    acceptOffer,
    counterOffer,
    rejectOffer,
    markShipped,
    markDelivered,
  } = useAppData();
  const base = userBase(me.username);
  const threads = getUserThreads(me.id);
  const active = threadId ? getThread(threadId) : threads[0];

  const [draft, setDraft] = useState('');
  const [counterMode, setCounterMode] = useState(false);
  const [counterPrice, setCounterPrice] = useState(0);
  const [carrier, setCarrier] = useState('');
  const [trackingNo, setTrackingNo] = useState('');

  const demandTitle = (demandId: string) => getDemands().find((d) => d.id === demandId)?.title ?? 'Talep';
  const other = (t: Thread) => getUser(t.buyerId === me.id ? t.sellerId : t.buyerId);

  function send() {
    if (!active || !draft.trim()) return;
    sendMessage(active.id, me.id, draft);
    setDraft('');
  }

  const offer = active ? getOfferForPresentation(active.presentationId) : undefined;
  const deal = active ? getDealForPresentation(active.presentationId) : undefined;
  const iAmBuyer = active ? active.buyerId === me.id : false;
  const myRole: 'buyer' | 'seller' = iAmBuyer ? 'buyer' : 'seller';

  function doCounter() {
    if (!offer || counterPrice <= 0) return;
    counterOffer(offer.id, counterPrice, me.id);
    setCounterMode(false);
    setCounterPrice(0);
  }

  function ship() {
    if (!deal || !carrier || !trackingNo.trim()) return;
    markShipped(deal.id, { carrier, trackingNo: trackingNo.trim() }, me.id);
    setCarrier('');
    setTrackingNo('');
  }

  function renderAction() {
    if (!active) return null;

    // ---- Anlaşma sonrası: kargo / takip / teslim ----
    if (deal) {
      if (deal.status === 'delivered') {
        return <div className="chat-action done"><Icon name="CheckCircle2" size={16} /> İşlem tamamlandı · {formatPrice(deal.price)}</div>;
      }
      if (deal.status === 'shipped') {
        return (
          <div className="chat-action">
            <div className="ship-track">
              <Icon name="Truck" size={16} />
              <span>{deal.carrier ?? 'Kargo'} · Takip: <b>{deal.trackingNo ?? '—'}</b></span>
            </div>
            {iAmBuyer ? (
              <button className="button primary" type="button" onClick={() => markDelivered(deal.id, me.id)}>
                <Icon name="PackageCheck" size={16} /> Teslim Aldım
              </button>
            ) : (
              <span className="chat-action-hint">Alıcının teslim almasını bekliyor…</span>
            )}
          </div>
        );
      }
      // awaiting_shipment
      if (!iAmBuyer) {
        return (
          <div className="chat-action ship-box">
            <div className="deadline-pill"><Icon name="Clock" size={14} /> Kargo için {deadlineLabel(deal.deadlineAt)}</div>
            <div className="ship-grid">
              <select value={carrier} onChange={(e) => setCarrier(e.target.value)}>
                <option value="">Kargo firması…</option>
                {CARRIERS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input value={trackingNo} onChange={(e) => setTrackingNo(e.target.value)} placeholder="Kargo takip numarası" />
              <button className="button primary" type="button" disabled={!carrier || !trackingNo.trim()} onClick={ship}>
                <Icon name="Truck" size={16} /> Kargoladım
              </button>
            </div>
          </div>
        );
      }
      return (
        <div className="chat-action">
          <div className="deadline-pill"><Icon name="Clock" size={14} /> Satıcı kargolamalı · {deadlineLabel(deal.deadlineAt)}</div>
        </div>
      );
    }

    // ---- Pazarlık: kabul / karşı teklif / reddet ----
    if (offer && (offer.status === 'pending' || offer.status === 'countered')) {
      const lastActor = offer.history[offer.history.length - 1]?.actor ?? 'seller';
      const waiting = lastActor === myRole;

      if (waiting) {
        return (
          <div className="chat-action">
            <span className="chat-action-hint">Güncel teklif <b>{formatPrice(offer.price)}</b> · karşı tarafın yanıtı bekleniyor…</span>
          </div>
        );
      }
      if (counterMode) {
        return (
          <div className="chat-action ship-box">
            <div className="ship-grid">
              <input
                inputMode="numeric"
                value={counterPrice || ''}
                onChange={(e) => setCounterPrice(Number(e.target.value.replace(/[^0-9]/g, '')) || 0)}
                placeholder="Karşı teklif (₺)"
              />
              <button className="button primary" type="button" disabled={counterPrice <= 0} onClick={doCounter}>Gönder</button>
              <button className="button ghost" type="button" onClick={() => setCounterMode(false)}>Vazgeç</button>
            </div>
          </div>
        );
      }
      return (
        <div className="chat-action">
          <span className="chat-action-price">Güncel teklif <b>{formatPrice(offer.price)}</b></span>
          <div className="chat-action-row">
            <button className="button primary" type="button" onClick={() => acceptOffer(offer.id, me.id)}>
              <Icon name="Check" size={16} /> Kabul Et
            </button>
            <button className="button ghost" type="button" onClick={() => { setCounterPrice(offer.price); setCounterMode(true); }}>
              Karşı Teklif
            </button>
            <button className="button ghost danger" type="button" onClick={() => rejectOffer(offer.id, me.id)}>
              Reddet
            </button>
          </div>
        </div>
      );
    }

    if (offer && offer.status === 'rejected') {
      return <div className="chat-action muted">Teklif reddedildi.</div>;
    }
    return null;
  }

  return (
    <div className="page-stack">
      <PageHeader title="Mesajlar" description="Anlaşma ve teklif sohbetlerini tek yerden yönet." />
      <div className="inbox-layout">
        <aside className="thread-list">
          <div className="thread-list-head">Sohbetler · {threads.length}</div>
          {threads.length ? (
            threads.map((t) => {
              const o = other(t);
              const msgs = getThreadMessages(t.id);
              const last = msgs[msgs.length - 1];
              return (
                <Link
                  key={t.id}
                  to={`${base}/mesajlar/${t.id}`}
                  className={`thread-row${active && active.id === t.id ? ' on' : ''}`}
                >
                  <Avatar label={o.avatar} />
                  <div style={{ minWidth: 0 }}>
                    <strong>{o.name}</strong>
                    <small>{demandTitle(t.demandId)}</small>
                    {last ? <small className="thread-last">{last.body.slice(0, 42)}</small> : null}
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="empty-inline">Henüz sohbet yok. Teklif verilince burada açılır.</div>
          )}
        </aside>

        <section className="chat-panel">
          {active ? (
            <>
              <div className="chat-head">
                <Avatar label={other(active).avatar} />
                <div style={{ minWidth: 0 }}>
                  <strong>{other(active).name}</strong>
                  <small>{demandTitle(active.demandId)}</small>
                </div>
              </div>

              <div className="chat-scroll">
                {getThreadMessages(active.id).map((m) =>
                  m.kind === 'system' ? (
                    <div key={m.id} className="chat-system">{m.body}</div>
                  ) : (
                    <div key={m.id} className={`chat-row ${m.senderId === me.id ? 'me' : 'them'}`}>
                      <div className={`chat-bubble${m.kind === 'offer' ? ' offer' : ''}${m.kind === 'shipping' ? ' shipping' : ''}`}>
                        {m.body}
                      </div>
                    </div>
                  ),
                )}
              </div>

              {renderAction()}

              <div className="chat-compose">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') send();
                  }}
                  placeholder="Mesaj yaz…"
                />
                <button className="button primary" type="button" onClick={send} aria-label="Gönder">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <Icon name="MessageCircle" size={28} />
              <h1>Sohbet seç</h1>
              <p>Soldan bir sohbet seç. Teklif verilince yeni sohbet burada açılır.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
