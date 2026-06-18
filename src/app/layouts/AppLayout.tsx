import { useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../components/Avatar';
import { Icon, type IconName } from '../../components/Icon';
import { getAllUsers, getCurrentUser, login, logout } from '../../services/session';
import { userBase } from '../../utils/routes';

const primaryNav: Array<{ label: string; icon: IconName; path: string }> = [
  { label: 'Talepler', icon: 'Home', path: '' },
  { label: 'Keşfet', icon: 'Search', path: 'kesfet' },
  { label: 'Talep Aç', icon: 'Plus', path: 'talep-ac' },
  { label: 'Mesajlar', icon: 'MessageCircle', path: 'mesajlar' },
  { label: 'Profil', icon: 'User', path: 'profil' },
];

export function AppLayout() {
  const { username = '' } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const session = getCurrentUser();

  // Giriş yoksa giriş ekranına; URL başka bir kullanıcıyı gösteriyorsa kendi alanına döndür.
  if (!session) return <Navigate to="/giris" replace />;
  if (username.replace(/^@/, '') !== session.username) {
    return <Navigate to={userBase(session.username)} replace />;
  }

  const activeUser = session;
  const base = userBase(activeUser.username);
  const accounts = getAllUsers();

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

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand-block" to={base} aria-label="Bulbana">
          <span className="brand-mark">
            <Icon name="Search" size={21} />
          </span>
        </NavLink>
        <nav className="side-nav" aria-label="Ana menü">
          {primaryNav.map((item) => (
            <NavLink
              key={item.path || 'home'}
              to={item.path ? `${base}/${item.path}` : base}
              end={item.path === ''}
              className="nav-icon"
              title={item.label}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="app-main">
        <header className="topbar-app">
          <NavLink className="wordmark" to={base}>
            <span className="brand-mark small">
              <Icon name="Search" size={18} />
            </span>
            Bulbana
          </NavLink>

          <div className="role-note">
            <Icon name="ShieldCheck" size={14} />
            Tek hesap · işleme göre alıcı/satıcı
          </div>

          <div className="user-cluster">
            <NavLink className="credit-pill" to={`${base}/kredi`}>
              <Icon name="CreditCard" size={15} />
              {activeUser.credits} kredi
            </NavLink>
            <div className="acct">
              <button type="button" className="acct-trigger" onClick={() => setMenuOpen((open) => !open)}>
                <Avatar label={activeUser.avatar} />
                <span className="user-name">{activeUser.name}</span>
                <Icon name="ChevronRight" size={15} className="acct-chev" />
              </button>
              {menuOpen && (
                <>
                  <button type="button" className="acct-backdrop" aria-label="Kapat" onClick={() => setMenuOpen(false)} />
                  <div className="acct-menu">
                    <div className="acct-menu-label">Demo hesabı değiştir</div>
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
        </header>

        <main className="content-shell">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
