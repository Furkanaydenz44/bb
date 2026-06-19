import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { getUser } from '../../services/catalogService';
import { useAppData } from '../../store/appData';
import type { Thread } from '../../data/types';
import { userBase } from '../../utils/routes';

export function MessagesPage() {
  const { username = '@ahmetsafak', threadId } = useParams();
  const me = getUser(username);
  const { getUserThreads, getThread, getThreadMessages, getDemands, sendMessage } = useAppData();
  const base = userBase(me.username);
  const threads = getUserThreads(me.id);
  const active = threadId ? getThread(threadId) : threads[0];
  const [draft, setDraft] = useState('');

  const demandTitle = (demandId: string) => getDemands().find((d) => d.id === demandId)?.title ?? 'Talep';
  const other = (t: Thread) => getUser(t.buyerId === me.id ? t.sellerId : t.buyerId);

  function send() {
    if (!active || !draft.trim()) return;
    sendMessage(active.id, me.id, draft);
    setDraft('');
  }

  return (
    <div className="page-stack">
      <PageHeader title="Mesajlar" description="Anlaşma ve teklif sohbetlerini tek yerden yönet." />
      <div className="inbox-layout">
        <aside className="thread-list">
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
            <div className="empty-inline">Henüz sohbet yok. Bir sunumu onaylayınca burada açılır.</div>
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
              <p>Soldan bir sohbet seç ya da bir sunumu onaylayınca yeni sohbet açılır.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
