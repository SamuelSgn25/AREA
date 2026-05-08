import React, { useState } from 'react';

const ServiceCard = ({ name, icon, description, category, triggers, reactions, isConnected, color }) => (
  <div className="glass-card group flex flex-col h-full hover:shadow-indigo-500/10">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div className={`pill ${isConnected ? 'pill-success' : 'pill-danger opacity-50'}`}>
        {isConnected ? 'Active' : 'Disconnected'}
      </div>
    </div>
    
    <div className="flex-1 space-y-4">
      <div>
        <h3 className="text-xl font-black text-white">{name}</h3>
        <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">{category}</p>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed font-medium">
        {description}
      </p>
      
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
        <div>
          <p className="text-[10px] uppercase font-black text-slate-600 tracking-tighter mb-1">Triggers</p>
          <p className="text-lg font-black text-white">{triggers}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-black text-slate-600 tracking-tighter mb-1">Reactions</p>
          <p className="text-lg font-black text-white">{reactions}</p>
        </div>
      </div>
    </div>

    <div className="mt-8 flex gap-3">
      <button className="flex-1 glass-button text-xs py-3">Details</button>
      {isConnected ? (
        <button className="flex-1 danger-button text-xs py-3">Pause</button>
      ) : (
        <button className="flex-1 primary-button text-xs py-3">Connect</button>
      )}
    </div>
  </div>
);

const Services = () => {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'productivity', 'development', 'communication', 'social'];

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className="text-6xl font-black tracking-tighter text-white">Integrations</h1>
          <p className="mt-4 text-slate-400 font-medium leading-relaxed">
            Expand your ecosystem by connecting to secondary nodes. Each integration provides a unique set of triggers and reactions specialized for the platform's API protocols.
          </p>
        </div>
        
        <div className="flex gap-2 p-1.5 glass rounded-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-white/10 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <ServiceCard 
          name="GitHub"
          icon="🐙"
          description="Access your repositories, issues, and pull requests. Trigger workflows on every commit or star."
          category="development"
          triggers={3}
          reactions={1}
          isConnected={true}
          color="indigo"
        />
        <ServiceCard 
          name="Discord"
          icon="💬"
          description="Send automated messages, create webhooks, and listen to server events in real-time."
          category="communication"
          triggers={2}
          reactions={2}
          isConnected={true}
          color="fuchsia"
        />
        <ServiceCard 
          name="Google"
          icon="🔵"
          description="Connect Gmail, Calendar, and Drive. Automate your office suite with advanced protocols."
          category="productivity"
          triggers={4}
          reactions={3}
          isConnected={false}
          color="blue"
        />
        <ServiceCard 
          name="Spotify"
          icon="🎵"
          description="Control your playlists and playback. Trigger reactions based on your listening habits."
          category="social"
          triggers={2}
          reactions={2}
          isConnected={false}
          color="emerald"
        />
        <ServiceCard 
          name="Twitter / X"
          icon="🐦"
          description="Monitor mentions and hashtags. Post updates automatically based on system triggers."
          category="social"
          triggers={1}
          reactions={1}
          isConnected={false}
          color="sky"
        />
        <div className="glass-card border-dashed border-2 border-white/5 flex flex-col items-center justify-center text-center p-12 group cursor-pointer hover:border-white/10 transition-all">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">➕</div>
          <h3 className="text-xl font-black text-white">Custom Node</h3>
          <p className="text-xs text-slate-500 font-medium max-w-[180px] mt-2">Create your own API connector via Webhooks</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
