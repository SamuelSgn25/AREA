import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Workflows from './pages/Workflows';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Mock Auth Check
const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return { isAuthenticated: !!token, setToken };
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const NavigationLink = ({ to, icon, label }) => (
  <NavLink to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{label}</span>
  </NavLink>
);

const AppShell = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isAuthPage) return children;

  return (
    <div className="flex min-h-screen">
      <div className="noise-bg" />
      
      {/* Sidebar */}
      <aside className="w-80 fixed h-screen glass border-r border-white/5 flex flex-col z-50">
        <div className="p-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl shadow-indigo-500/20">A</div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">AREA</h1>
            <p className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">Automation Hub</p>
          </div>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          <NavigationLink to="/dashboard" icon="📊" label="Dashboard" />
          <NavigationLink to="/services" icon="🔌" label="Integrations" />
          <NavigationLink to="/workflows" icon="⚡" label="Workflows" />
          <NavigationLink to="/profile" icon="👤" label="Settings" />
        </nav>

        <div className="p-8">
          <div className="glass-card !p-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold">S</div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">Samuel SGN</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase">Online</p>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full py-3 px-4 glass-button text-rose-400 hover:bg-rose-500/10 border-rose-500/20 transition-all text-xs font-bold uppercase tracking-widest"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-80 flex-1 relative overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto p-12 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/workflows" element={<ProtectedRoute><Workflows /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-9xl font-black text-white/5 absolute -z-10">404</h1>
            <h2 className="text-4xl font-bold text-white mb-4">Lost in the void?</h2>
            <p className="text-slate-400 mb-8 max-w-md">The integration you're looking for doesn't seem to exist or moved somewhere else.</p>
            <button onClick={() => window.history.back()} className="primary-button">Take me back</button>
          </div>} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};

export default App;
