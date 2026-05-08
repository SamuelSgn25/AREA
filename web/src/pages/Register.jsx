import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:8080/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Check system constraints.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse-slow transition-all delay-1000"></div>

      <div className="w-full max-w-lg glass-card !p-12 z-10 space-y-10">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-2xl shadow-indigo-500/20">A</div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Initialize Node</h2>
          <p className="text-slate-400 font-medium text-sm">Register your identity within the AREA protocol.</p>
        </div>
        
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">First Name</label>
            <input
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="glass-input"
              placeholder="E.g. John"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Last Name</label>
            <input
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="glass-input"
              placeholder="E.g. Doe"
              required
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Universal Identifier</label>
            <input
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="glass-input"
              placeholder="johndoe_node"
              required
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Email Endpoint</label>
            <input
              type="email"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="glass-input"
              placeholder="user@system.io"
              required
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Encryption Secret</label>
            <input
              type="password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="glass-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 primary-button !py-4 font-black uppercase tracking-widest text-xs mt-4 group"
          >
            {loading ? 'Processing...' : 'Establish Identity'}
            {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
          </button>
        </form>

        <p className="text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">
          Identity already exists?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Authorize Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
