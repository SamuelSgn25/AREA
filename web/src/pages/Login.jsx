import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse-slow transition-all delay-1000"></div>

      <div className="w-full max-w-md glass-card !p-12 z-10 space-y-10">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-2xl shadow-indigo-500/20">A</div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Access Node</h2>
          <p className="text-slate-400 font-medium text-sm">Enter your credentials to synchronize.</p>
        </div>
        
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest text-center animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Email Endpoint</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
              placeholder="user@system.io"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Secret Key</label>
              <a href="#" className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">Forgot?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full primary-button !py-4 font-black uppercase tracking-widest text-xs mt-4 group"
          >
            {loading ? 'Decrypting...' : 'Authorize Access'}
            {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
          </button>
        </form>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/5"></div>
            <span className="text-[8px] uppercase font-black text-slate-600 tracking-[0.2em]">Third Party Auth</span>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <button className="glass-button !py-3 hover:bg-white/10">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            </button>
            <button className="glass-button !py-3 hover:bg-white/10">
              <img src="https://www.svgrepo.com/show/448234/microsoft.svg" className="w-5 h-5" alt="Microsoft" />
            </button>
            <button className="glass-button !py-3 hover:bg-white/10">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
            </button>
          </div>
        </div>

        <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">
          No account assigned?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Register New Node
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
