import React, { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const SidebarLink = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `flex items-center gap-4 px-6 py-4 transition-all duration-300 border-r-4 ${
        isActive 
          ? 'bg-white/10 text-white border-indigo-500 font-bold' 
          : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-slate-200'
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    <span className="tracking-wide text-sm uppercase">{label}</span>
  </NavLink>
);

const AppShell = ({ children }) => {
  const { pathname } = useLocation();
  const isAuth = pathname === '/login' || pathname === '/register';

  if (isAuth) return children;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 glass border-r border-white/10 flex flex-col fixed h-full z-50">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-indigo-500/20">A</div>
            <h1 className="text-2xl font-black tracking-tighter text-white">AREA</h1>
          </div>
        </div>

        <nav className="flex-1 mt-6">
          <SidebarLink to="/dashboard" icon="📊" label="Dashboard" />
          <SidebarLink to="/services" icon="🔌" label="Services" />
          <SidebarLink to="/workflows" icon="⚡" label="Workflows" />
          <SidebarLink to="/profile" icon="👤" label="Profile" />
        </nav>

        <div className="p-6">
          <div className="glass-card !p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center border border-white/20">S</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Samuel SGN</p>
              <p className="text-xs text-slate-500 truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1 relative bg-[#0f172a]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="relative z-10">{children}</div>
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add more routes as needed */}
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};

export default App;
