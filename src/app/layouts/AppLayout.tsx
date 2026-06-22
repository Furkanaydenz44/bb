import { useRef, useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon, type IconName } from '../../components/Icon';
import { getAllUsers, getCurrentUser, login, logout } from '../../services/session';
import { useAppData } from '../../store/appData';
import { categories, categoryGroups } from '../../data/categories';
import { categoryPath, userBase } from '../../utils/routes';

const primaryNav: Array<{ label: string; icon: IconName; path: string }> = [
  { label: 'Talepler', icon: 'Home', path: '' },
  { label: 'Keşfet', icon: 'Search', path: 'kesfet' },
  { label: 'Talep Aç', icon: 'Plus', path: 'talep-ac' },
];

export function AppLayout() {
  const { username = '' } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [catOpen, setCatOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const catTriggerRef = useRef<HTMLButtonElement>(null);
  const session = getCurrentUser();
  const { creditsOf, unreadCount, getUserNotifications, markNotificationsRead } = useAppData();

  // Giriş yoksa giriş ekranına; URL başka bir kullanıcıyı gösteriyorsa kendi alanına döndür.
  if (!session) return <Navigate to="/giris" replace />;
  if (username.replace(/^@/, '') !== session.username) {
    return <Navigate to={userBase(session.username)} replace />;
  }

  const activeUser = session;
  const base = userBase(activeUser.username);
  const accounts = getAllUsers();
  const credits = creditsOf(activeUser.id);
  const unread = unreadCount(activeUser.id);
  const notifs = getUserNotifications(activeUser.id).slice(0, 10);

  function switchTo(userId: string, uname: string) {
    setMenuOpen(false);
    login(userId);
    navigate(userBase(uname));
  }
  function signOut() {
    setMenuOpen(false);
    logout();
    navigate('/giris');
  }
  function onSearch(event: React.FormEvent) {
    event.preventDefault();
    const q = query.trim();
    navigate(`${base}/kesfet${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  }
  function toggleNotif() {
    setNotifOpen((open) => {
      const next = !open;
      if (next && unread) markNotificationsRead(activeUser.id);
      return next;
    });
  }

  return (
    <div className="app-shell">
      <header className="topbar2">
        <div className="topbar2-main">
          <NavLink className="wordmark2" to={base} aria-label="Bulbana ana sayfa">
            <span className="brand-mark small">
              <Icon name="Search" size={18} />
            </span>
            Bulbana
          </NavLink>

          <form className="topsearch" onSubmit={onSearch} role="search">
            <Icon name="Search" size={20} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Talep, kategori veya ürün ara"
              aria-label="Ara"
            />
            <button type="submit" className="topsearch-btn">Ara</button>
          </form>

          <div className="topactions">
            <div className="bell-wrap">
              <button type="button" className="icon-btn" onClick={toggleNotif} aria-label="Bildirimler">
                <Icon name="Bell" size={19} />
                {unread ? <span className="bell-badge">{unread > 9 ? '9+' : unread}</span> : null}
              </button>
              {notifOpen && (
                <>
                  <button type="button" className="acct-backdrop" aria-label="Kapat" onClick={() => setNotifOpen(false)} />
                  <div className="notif-menu">
                    <div className="acct-menu-label">Bildirimler</div>
                    {notifs.length ? (
                      notifs.map((n) => (
                        <NavLink
                          key={n.id}
                          className="notif-item"
                          to={`${base}${n.href ?? ''}`}
                          onClick={() => setNotifOpen(false)}
                        >
                          <span className="notif-dot" />
                          <span className="notif-text">{n.text}</span>
                        </NavLink>
                      ))
                    ) : (
                      <div className="notif-empty">Henüz bildirim yok.</div>
                    )}
                  </div>
                </>
              )}
            </div>

            <NavLink className="icon-btn" to={`${base}/mesajlar`} aria-label="Mesajlar">
              <Icon name="MessageCircle" size={19} />
            </NavLink>

            <div className="acct">
              <button type="button" className="acct-trigger acct-trigger-avatar" onClick={() => setMenuOpen((open) => !open)}>
                <Avatar label={activeUser.avatar} />
              </button>
              {menuOpen && (
                <>
                  <button type="button" className="acct-backdrop" aria-label="Kapat" onClick={() => setMenuOpen(false)} />
                  <div className="acct-menu">
                    <div className="acct-profile-head">
                      <span className="acct-av acct-av-lg">{activeUser.avatar}</span>
                      <div className="acct-profile-info">
                        <b>{activeUser.name}</b>
                        <small>@{activeUser.username}</small>
                      </div>
                    </div>
                    <NavLink className="acct-credit-row" to={`${base}/kredi`} onClick={() => setMenuOpen(false)}>
                      <Icon name="WalletCards" size={15} />
                      <span>{credits} kredi</span>
                      <Icon name="ChevronRight" size={14} />
                    </NavLink>
                    <NavLink className="acct-menu-link" to={`${base}/profil`} onClick={() => setMenuOpen(false)}>
                      <Icon name="User" size={15} />
                      <span>Profil</span>
                    </NavLink>
                    <div className="acct-divider" />
                    <div className="acct-menu-label">Hesap değiştir</div>
                    {accounts.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        className={`acct-item${user.id === activeUser.id ? ' on' : ''}`}
                        onClick={() => switchTo(user.id, user.username)}
                      >
                        <span className="acct-av">{user.avatar}</span>
                        <span className="acct-item-copy">
                          <b>{user.name}</b>
                          <small>@{user.username}</small>
                        </span>
                        {user.id === activeUser.id ? <Icon name="Check" size={15} /> : null}
                      </button>
                    ))}
                    <button type="button" className="acct-logout" onClick={signOut}>
                      <Icon name="ArrowLeft" size={15} /> Çıkış yap
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <nav className="topbar2-nav" aria-label="Ana menü">
          <div
            className="cat-mega-wrap"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && catOpen) {
                setCatOpen(false);
                catTriggerRef.current?.focus();
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) setCatOpen(false);
            }}
          >
            <button
              ref={catTriggerRef}
              type="button"
              className={`topnav-link cat-trigger${catOpen ? ' active' : ''}`}
              onClick={() => setCatOpen((open) => !open)}
              aria-expanded={catOpen}
              aria-haspopup="true"
              aria-controls="cat-mega"
            >
              <Icon name="Menu" size={17} />
              Kategoriler
            </button>

            {catOpen && (
              <div className="cat-mega" id="cat-mega" aria-label="Kategoriler">
                <div className="cat-rail">
                  {categories.map((c) => (
                    <NavLink
                      key={c.id}
                      to={categoryPath(activeUser.username, c.id)}
                      className={`cat-rail-item${activeCat === c.id ? ' on' : ''}`}
                      onMouseEnter={() => setActiveCat(c.id)}
                      onClick={() => setCatOpen(false)}
                    >
                      <Icon name={c.icon as IconName} size={18} />
                      <span>{c.name}</span>
                      <Icon name="ChevronRight" size={16} />
                    </NavLink>
                  ))}
                </div>
                <div className="cat-cols">
                  {categoryGroups[activeCat].map((group) => (
                    <div key={group.title} className="cat-col">
                      <NavLink
                        className="cat-col-head"
                        to={categoryPath(activeUser.username, activeCat)}
                        onClick={() => setCatOpen(false)}
                      >
                        {group.title}
                        <Icon name="ChevronRight" size={14} />
                      </NavLink>
                      {group.items.map((item) => (
                        <NavLink
                          key={item}
                          className="cat-col-item"
                          to={`${base}/kesfet?q=${encodeURIComponent(item)}`}
                          onClick={() => setCatOpen(false)}
                        >
                          {item}
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {primaryNav.map((item) => (
            <NavLink
              key={item.path || 'home'}
              to={item.path ? `${base}/${item.path}` : base}
              end={item.path === ''}
              className={({ isActive }) =>
                `topnav-link${item.path === '' ? ' topnav-talepler' : ''}${isActive ? ' active' : ''}`
              }
            >
              <Icon name={item.icon} size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  );
}
