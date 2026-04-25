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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <div className="w-full max-w-lg p-8 m-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-6 tracking-tight">Create Account</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-purple-100 mb-2 ml-1">First Name</label>
            <input
              name="firstName"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
              placeholder="John"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-purple-100 mb-2 ml-1">Last Name</label>
            <input
              name="lastName"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
              placeholder="Doe"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-purple-100 mb-2 ml-1">Username</label>
            <input
              name="username"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
              placeholder="johndoe123"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-purple-100 mb-2 ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-purple-100 mb-2 ml-1">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/10 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="col-span-2 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg transform hover:scale-[1.01] transition-all mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-purple-100/70 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
