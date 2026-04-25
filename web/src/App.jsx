import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { NotificationCenter, useNotification } from './components/Notification';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Workflows from './pages/Workflows';
import Profile from './pages/Profile';
import Modal from './components/Modal';
import { useAuthStore, useNotificationStore } from './store/store';
import { authAPI, notificationsAPI } from './services/api';

const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/services', label: 'Services' },
  { to: '/workflows', label: 'Workflows' },
  { to: '/profile', label: 'Profil' }
];

function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const token = useAuthStore((state) => state.token);
  return token ? <Navigate to="/" replace /> : children;
}

function AppShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const notify = useNotification();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const seenApiNotificationIds = useNotificationStore((state) => state.seenApiNotificationIds);
  const markApiNotificationSeen = useNotificationStore((state) => state.markApiNotificationSeen);
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    authAPI
      .getProfile()
      .then((response) => {
        setUser(response.data.data);
      })
      .catch(() => {
        logout();
      });
  }, [logout, setUser, token]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    const syncNotifications = () => {
      notificationsAPI
        .list()
        .then((response) => {
          (response.data.data || [])
            .filter((entry) => !entry.read && !seenApiNotificationIds.includes(entry.id))
            .slice(0, 2)
            .forEach((entry) => {
              addNotification({
                title: entry.title,
                message: entry.message,
                type: entry.type || 'info'
              });
              markApiNotificationSeen(entry.id);
            });
        })
        .catch(() => undefined);
    };

    syncNotifications();
    const timer = window.setInterval(syncNotifications, 12000);
    return () => window.clearInterval(timer);
  }, [addNotification, markApiNotificationSeen, seenApiNotificationIds, token]);

  const handleLogout = () => {
    logout();
    notify.info('Session fermee', 'Vous avez ete deconnecte avec succes.');
    navigate('/login');
  };

  const isAuthScreen = pathname === '/login' || pathname === '/register';

  return (
    <div className={`app-shell ${isAuthScreen ? 'auth-shell' : ''}`}>
      <div className="app-glow app-glow-left" />
      <div className="app-glow app-glow-right" />
      {!isAuthScreen && (
        <header className="topbar">
          <div>
            <p className="eyebrow">AREA platform</p>
            <h1>Automatisations vivantes</h1>
          </div>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen((value) => !value)}>
            Menu
          </button>
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="topbar-actions">
            <button type="button" className="ghost-button" onClick={() => setHelpOpen(true)}>
              Raccourcis
            </button>
            {user ? (
              <>
                <div className="user-chip">
                  <span>{user.firstName?.[0] || user.username?.[0] || 'A'}</span>
                  <strong>{user.firstName || user.username}</strong>
                </div>
                <button type="button" className="ghost-button" onClick={handleLogout}>
                  Deconnexion
                </button>
              </>
            ) : null}
          </div>
        </header>
      )}

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workflows"
            element={
              <ProtectedRoute>
                <Workflows />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </main>

      <NotificationCenter />

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Guidage rapide" accent="sunrise">
        <div className="shortcut-grid">
          <div className="shortcut-card">
            <h3>1. Connecter un service</h3>
            <p>Ouvrez l'onglet services, lancez une connexion OAuth2 ou une liaison locale.</p>
          </div>
          <div className="shortcut-card">
            <h3>2. Composer un workflow</h3>
            <p>Choisissez un trigger, une reaction, puis activez votre scenario.</p>
          </div>
          <div className="shortcut-card">
            <h3>3. Suivre les signaux</h3>
            <p>Le tableau de bord et les notifications affichent les evenements en direct.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
