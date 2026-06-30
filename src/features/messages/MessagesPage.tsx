import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import type { Message, Thread } from '../../data/types';
import { userBase } from '../../utils/routes';
import { formatPrice } from '../../utils/format';

const CARRIERS = ['Aras Kargo', 'Yurtiçi Kargo', 'MNG Kargo', 'PTT Kargo', 'Sürat Kargo', 'UPS', 'HepsiJet', 'Trendyol Express'];

const num = (v: number) => Math.round(v).toLocaleString('tr-TR');

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
  const otherUser = (t: Thread) => getUser(t.buyerId === me.id ? t.sellerId : t.buyerId);

  function send() {
    if (!active || !draft.trim()) return;
    sendMessage(active.id, me.id, draft);
    setDraft('');
  }

  const offer = active ? getOfferForPresentation(active.presentationId) : undefined;
  const deal = active ? getDealForPresentation(active.presentationId) : undefined;
  const iAmBuyer = active ? active.buyerId === me.id : false;
  const msgs = active ? getThreadMessages(active.id) : [];
  const offerMsgs = msgs.filter((m) => m.kind === 'offer');
  const latestOfferId = offerMsgs.length ? offerMsgs[offerMsgs.length - 1].id : null;
  const originalPrice = offer?.history?.[0]?.price ?? offerMsgs[0]?.price ?? 0;

  function doCounter() {
    if (!offer || counterPrice <= 0) return;
    counterOffer(offer.id, counterPrice, me.id);
    setCounterMode(false);
    setCounterPrice(0);
  }
  function openCounter() {
    setCounterPrice(offer?.price ?? 0);
    setCounterMode(true);
  }
  function ship() {
    if (!deal || !carrier || !trackingNo.trim()) return;
    markShipped(deal.id, { carrier, trackingNo: trackingNo.trim() }, me.id);
    setCarrier('');
    setTrackingNo('');
  }

  // --- Teklif / pazarlık kartı ---
  function offerCard(m: Message) {
    const isMine = m.senderId === me.id;
    const idx = offerMsgs.findIndex((x) => x.id === m.id);
    const isFirst = idx === 0;
    const isLatest = m.id === latestOfferId;
    const accepted = isLatest && offer?.status === 'accepted';
    const rejected = isLatest && offer?.status === 'rejected';
    const superseded = !isLatest || rejected;
    const live = isLatest && !accepted && !rejected && (offer?.status === 'pending' || offer?.status === 'countered');
    const showActions = live && !isMine;
    const showAwaiting = live && isMine;
    const inCounter = showActions && counterMode;

    const variant = accepted ? 'ocard--accepted' : superseded ? 'ocard--superseded' : '';
    const eyebrow = accepted ? 'Anlaşma' : isFirst ? 'Resmî teklif' : isMine ? 'Gönderdiğin pazarlık' : 'Karşı teklif';
    const pill = accepted
      ? { cls: 'is-deal', txt: 'Tamam' }
      : rejected
        ? { cls: 'is-old', txt: 'Reddedildi' }
        : superseded
          ? { cls: 'is-old', txt: 'Geçersiz' }
          : showAwaiting
            ? { cls: 'is-wait', txt: 'Bekliyor' }
            : { cls: 'is-open', txt: 'Açık' };

    const prev = idx > 0 ? offerMsgs[idx - 1].price ?? 0 : 0;
    const delta = isLatest && !isFirst && prev ? (m.price ?? 0) - prev : 0;
    const waitingFor = iAmBuyer ? 'Satıcı' : 'Alıcı';

    return (
      <div className={`ocard ${variant}`.trim()}>
        <div className="ocard-inner">
          <div className="ocard-head">
            <span className="ocard-eyebrow"><span className="ocard-dot" />{eyebrow}</span>
            <span className={`ocard-pill ${pill.cls}`}>{pill.txt}</span>
          </div>

          <p className="ocard-price">
            <span className="ocard-cur">₺</span>{num(m.price ?? 0)}
            {delta ? (
              <span className={`ocard-delta ${delta < 0 ? 'down' : ''}`.trim()}>
                <Icon name={delta > 0 ? 'ArrowUp' : 'ArrowDown'} size={13} />{num(Math.abs(delta))}₺
              </span>
            ) : null}
          </p>

          {!accepted && m.body ? <p className="ocard-note">{m.body}</p> : null}

          {accepted ? (
            <div className="ocard-accepted">
              <span className="ocard-check"><Icon name="Check" size={16} /></span>
              Kabul edildi · anlaşma sağlandı
            </div>
          ) : superseded ? (
            <div className="ocard-meta">
              <span>{rejected ? 'Teklif reddedildi' : 'Güncellendi · '}</span>
              {!rejected ? <strong>{formatPrice(offer?.price ?? m.price ?? 0)}</strong> : null}
            </div>
          ) : isFirst ? (
            <div className="ocard-meta">
              <span>İlk teklif</span>
              <span className="ocard-sep" />
              <span><Icon name="Coins" size={13} /> {offer?.creditCost ?? '—'} kredi</span>
            </div>
          ) : (
            <div className="ocard-meta">
              <span>İlk teklif:</span>
              <strong>{formatPrice(originalPrice)}</strong>
            </div>
          )}

          {inCounter ? (
            <div className="ocard-counter">
              <label className="ocard-counter-field">
                <span className="ocard-counter-cur">₺</span>
                <input
                  inputMode="numeric"
                  value={counterPrice ? counterPrice.toLocaleString('tr-TR') : ''}
                  onChange={(e) => setCounterPrice(Number(e.target.value.replace(/[^0-9]/g, '')) || 0)}
                  placeholder="0"
                  aria-label="Karşı teklif tutarı"
                  autoFocus
                />
              </label>
              <button className="ocard-counter-send" type="button" disabled={counterPrice <= 0} onClick={doCounter}>Gönder</button>
              <button className="ocard-counter-cancel" type="button" aria-label="Vazgeç" onClick={() => setCounterMode(false)}>
                <Icon name="X" size={16} />
              </button>
            </div>
          ) : showActions ? (
            <div className="ocard-actions">
              <button className="ocard-btn ocard-btn--accept" type="button" onClick={() => acceptOffer(offer!.id, me.id)}>
                <Icon name="Check" size={16} /> Kabul Et
              </button>
              <button className="ocard-btn ocard-btn--counter" type="button" onClick={openCounter}>
                <Icon name="ArrowLeftRight" size={16} /> Pazarlık
              </button>
              <button className="ocard-btn ocard-btn--reject" type="button" aria-label="Reddet" onClick={() => rejectOffer(offer!.id, me.id)}>
                <Icon name="X" size={16} />
              </button>
            </div>
          ) : showAwaiting ? (
            <div className="ocard-status"><span className="ocard-pulse" /> {waitingFor} yanıtı bekleniyor…</div>
          ) : null}
        </div>
      </div>
    );
  }

  // --- Kargo kartı ---
  function shippingCard() {
    const shipped = deal?.status === 'shipped';
    return (
      <div className="ocard ocard--shipping">
        <div className="ocard-inner">
          <div className="ocard-head">
            <span className="ocard-eyebrow"><span className="ocard-dot" />Kargo</span>
            <span className={`ocard-pill is-ship`}>{deal?.status === 'delivered' ? 'Teslim' : 'Yolda'}</span>
          </div>
          <div className="ocard-ship">
            <span className="ocard-ship-route" aria-hidden="true">
              <span className="r-line" />
              <span className="r-truck"><Icon name="Truck" size={18} /></span>
              <span className="r-line" />
              <Icon name="PackageCheck" size={18} />
            </span>
            <div className="ocard-ship-info">
              <div className="ocard-ship-carrier">{deal?.carrier ?? 'Kargo'}</div>
              <div className="ocard-ship-track">{deal?.trackingNo ?? '—'}</div>
            </div>
          </div>
          {shipped && iAmBuyer ? (
            <div className="ocard-actions">
              <button className="ocard-btn ocard-btn--accept" type="button" onClick={() => deal && markDelivered(deal.id, me.id)}>
                <Icon name="PackageCheck" size={16} /> Teslim Aldım
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // --- Alt bar: yalnız anlaşma sonrası satıcı kargo formu / alıcı mühlet durumu ---
  function renderBottomBar() {
    if (!active || !deal || deal.status !== 'awaiting_shipment') return null;
    if (!iAmBuyer) {
      return (
        <div className="chat-action ship-box">
          <div className="deadline-pill"><Icon name="Clock" size={14} /> Kargo için {deadlineLabel(deal.deadlineAt)}</div>
          <div className="ship-grid">
            <select value={carrier} onChange={(e) => setCarrier(e.target.value)} aria-label="Kargo firması">
              <option value="">Kargo firması…</option>
              {CARRIERS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={trackingNo} onChange={(e) => setTrackingNo(e.target.value)} placeholder="Kargo takip numarası" aria-label="Kargo takip numarası" />
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

  return (
    <div className="page-stack">
      <PageHeader title="Mesajlar" description="Anlaşma ve teklif sohbetlerini tek yerden yönet." />
      <div className="inbox-layout">
        <aside className="thread-list">
          <div className="thread-list-head">Sohbetler · {threads.length}</div>
          {threads.length ? (
            threads.map((t) => {
              const o = otherUser(t);
              const tmsgs = getThreadMessages(t.id);
              const last = tmsgs[tmsgs.length - 1];
              const lastText = last
                ? last.kind === 'offer'
                  ? `Teklif: ${formatPrice(last.price ?? 0)}`
                  : last.kind === 'shipping'
                    ? 'Kargolandı'
                    : last.body.slice(0, 42)
                : '';
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
                    {lastText ? <small className="thread-last">{lastText}</small> : null}
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
                <Avatar label={otherUser(active).avatar} />
                <div style={{ minWidth: 0 }}>
                  <strong>{otherUser(active).name}</strong>
                  <small>{demandTitle(active.demandId)}</small>
                </div>
              </div>

              <div className="chat-scroll">
                {msgs.map((m) =>
                  m.kind === 'system' ? (
                    <div key={m.id} className="chat-system">{m.body}</div>
                  ) : m.kind === 'offer' ? (
                    <div key={m.id} className={`chat-row ${m.senderId === me.id ? 'me' : 'them'}`}>
                      {offerCard(m)}
                    </div>
                  ) : m.kind === 'shipping' ? (
                    <div key={m.id} className={`chat-row ${m.senderId === me.id ? 'me' : 'them'}`}>
                      {shippingCard()}
                    </div>
                  ) : (
                    <div key={m.id} className={`chat-row ${m.senderId === me.id ? 'me' : 'them'}`}>
                      <div className="chat-bubble">{m.body}</div>
                    </div>
                  ),
                )}
              </div>

              {renderBottomBar()}

              <div className="chat-compose">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') send();
                  }}
                  placeholder="Mesaj yaz…"
                  aria-label="Mesaj yaz"
                />
                <button className="button primary" type="button" onClick={send} aria-label="Gönder">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <Icon name="MessageCircle" size={28} />
              <h2>Sohbet seç</h2>
              <p>Soldan bir sohbet seç. Teklif verilince yeni sohbet burada açılır.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
