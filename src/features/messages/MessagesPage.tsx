import { Link, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon } from '../../components/Icon';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { getDemands, getUser } from '../../services/catalogService';
import { demandPath } from '../../utils/routes';

const threads = [
  {
    user: 'furkan',
    demandId: 'd1',
    title: 'Leica M6 için ek lens fotoğrafı',
    message: 'Vizör ve seri numarası fotoğrafını da ekleyebilir misin?',
    status: 'Yanıt bekliyor',
  },
  {
    user: 'derya',
    demandId: 'd8',
    title: 'Polaroid SX-70 sunum kontrolü',
    message: 'Körük sızdırmazlık videosu yeterli görünüyor.',
    status: 'Okundu',
  },
  {
    user: 'selin',
    demandId: 'd11',
    title: 'Juno-106 teslimat planı',
    message: 'İstanbul içi ekspertiz sonrası aynı gün teslim edebiliriz.',
    status: 'Aktif',
  },
] as const;

export function MessagesPage() {
  const { username = '@ahmetsafak' } = useParams();
  const activeUser = getUser(username);
  const demands = getDemands();

  return (
    <div className="page-stack">
      <PageHeader
        title="Mesajlar"
        description={`${activeUser.name} için sunum, teklif ve teslimat konuşmalarını tek yerden takip et.`}
      />

      <section className="inbox-layout">
        <div className="thread-list">
          {threads.map((thread) => {
            const participant = getUser(thread.user);
            const demand = demands.find((item) => item.id === thread.demandId)!;
            const owner = getUser(demand.ownerId);
            return (
              <Link key={thread.demandId} className="thread-row" to={demandPath(activeUser.username, demand)}>
                <Avatar label={participant.avatar} />
                <div>
                  <strong>{thread.title}</strong>
                  <span>{thread.message}</span>
                  <small>@{participant.username} · {demand.title}</small>
                </div>
                <StatusBadge tone={thread.status === 'Aktif' ? 'green' : 'neutral'}>{thread.status}</StatusBadge>
              </Link>
            );
          })}
        </div>

        <aside className="rail-panel">
          <div className="rail-section">
            <span className="eyebrow">Gelen kutusu kuralı</span>
            <h3>Teklif öncesi tüm kanıtları mesajda topla.</h3>
            <p>Fatura, seri numarası, kondisyon videosu ve teslimat planı tamamlanmadan resmi teklif isteme.</p>
          </div>
          <div className="trust-list">
            <span><Icon name="FileCheck2" size={15} /> Kanıt kontrolü</span>
            <span><Icon name="ShieldCheck" size={15} /> Sistem içi kayıt</span>
            <span><Icon name="Truck" size={15} /> Teslimat takibi</span>
          </div>
        </aside>
      </section>
    </div>
  );
}
