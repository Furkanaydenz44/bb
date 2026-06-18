import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { createAccount, getAllUsers, login } from '../../services/session';
import { userBase } from '../../utils/routes';

export function LoginPage() {
  const navigate = useNavigate();
  const accounts = getAllUsers();
  const [name, setName] = useState('');
  const [city, setCity] = useState('İstanbul');

  function enter(userId: string, username: string) {
    login(userId);
    navigate(userBase(username));
  }

  function create() {
    if (!name.trim()) return;
    const user = createAccount({ name, city });
    navigate(userBase(user.username));
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-mark">
            <Icon name="Search" size={20} />
          </span>
          Bulbana
        </div>
        <h1 className="auth-title">Giriş yap</h1>
        <p className="auth-sub">
          Bulbana'da <b>tek hesap</b> kullanırsın. Kendi talebinde <b>alıcı</b>, başkasının talebine ürün sununca{' '}
          <b>satıcı</b> olursun — ayrı rol ya da ayrı hesap yok.
        </p>

        <div className="auth-label">Demo hesabıyla devam et</div>
        <div className="auth-accounts">
          {accounts.map((user) => (
            <button key={user.id} type="button" className="auth-account" onClick={() => enter(user.id, user.username)}>
              <span className="auth-av">{user.avatar}</span>
              <span className="auth-acc-copy">
                <b>{user.name}</b>
                <small>
                  @{user.username} · {user.city} · {user.credits} kredi
                </small>
              </span>
              <Icon name="ChevronRight" size={16} />
            </button>
          ))}
        </div>

        <div className="auth-divider">
          <span>veya yeni hesap oluştur</span>
        </div>

        <div className="auth-create">
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ad Soyad" />
          <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Şehir" />
          <button type="button" className="button primary" disabled={!name.trim()} onClick={create}>
            <Icon name="UserCheck" size={16} /> Hesap oluştur
          </button>
        </div>

        <p className="auth-note">Demo: hesaplar yalnızca bu tarayıcıda saklanır (localStorage). Sunucu/şifre yok.</p>
      </div>
    </div>
  );
}
