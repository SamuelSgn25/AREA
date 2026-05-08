import React from 'react';

const WorkflowCard = ({ name, description, trigger, reaction, isActive, color, delay }) => (
  <div 
    className="glass-card group hover:scale-[1.01] transition-all duration-500"
    style={{ animation: `fadeInRight 0.6s ease-out forwards ${delay}s`, opacity: 0 }}
  >
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
            ⚡
          </div>
          <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">{name}</h3>
          <div className={`pill ${isActive ? 'pill-success' : 'pill-warning opacity-50'}`}>
            {isActive ? 'Active' : 'Paused'}
          </div>
        </div>
        <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-6 p-4 glass rounded-2xl border-white/5 bg-white/[0.02]">
        <div className="flex flex-col items-center">
          <p className="text-[8px] uppercase font-black text-slate-600 mb-2">Source</p>
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform duration-500">
            {trigger}
          </div>
        </div>
        <div className="text-slate-700 text-xl">→</div>
        <div className="flex flex-col items-center">
          <p className="text-[8px] uppercase font-black text-slate-600 mb-2">Export</p>
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover:-rotate-12 transition-transform duration-500">
            {reaction}
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <button className="flex-1 md:flex-none glass-button !px-4">Edit</button>
        <button className={`flex-1 md:flex-none glass-button !px-4 ${isActive ? 'text-rose-400 border-rose-500/20' : 'text-emerald-400 border-emerald-500/20'}`}>
          {isActive ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <p className="text-[10px] uppercase font-black text-slate-600 mb-1">Last Run</p>
        <p className="text-xs font-bold text-slate-300">2 minutes ago</p>
      </div>
      <div>
        <p className="text-[10px] uppercase font-black text-slate-600 mb-1">Total Executions</p>
        <p className="text-xs font-bold text-slate-300">1,245</p>
      </div>
      <div>
        <p className="text-[10px] uppercase font-black text-slate-600 mb-1">Average Delay</p>
        <p className="text-xs font-bold text-slate-300">12ms</p>
      </div>
      <div>
        <p className="text-[10px] uppercase font-black text-slate-600 mb-1">Reliability</p>
        <p className="text-xs font-bold text-emerald-400">100%</p>
      </div>
    </div>
  </div>
);

const Workflows = () => (
  <div className="space-y-12">
    <header className="flex justify-between items-end">
      <div className="max-w-2xl">
        <h1 className="text-6xl font-black tracking-tighter text-white">Automation Nodes</h1>
        <p className="mt-4 text-slate-400 font-medium leading-relaxed">
          Manage your active logic processing nodes. Each workflow runs in an isolated sandbox environment ensuring maximum security and throughput for your business logic.
        </p>
      </div>
      <button className="primary-button !px-8">Create New Logic Node</button>
    </header>

    <div className="space-y-6">
      <WorkflowCard 
        name="GitHub to Discord Sync"
        description="Automatically mirror GitHub repository events to a dedicated Discord channel for real-time team collaboration and monitoring."
        trigger="🐙"
        reaction="💬"
        isActive={true}
        delay={0.1}
      />
      <WorkflowCard 
        name="Media Backup Protocol"
        description="Detect new Spotify saves and catalogue metadata into Google Sheets for archival purposes and data analysis."
        trigger="🎵"
        reaction="🔵"
        isActive={true}
        delay={0.2}
      />
      <WorkflowCard 
        name="Inbound Filtering"
        description="Scan incoming Gmail messages for specific keywords and trigger a Slack notification for priority escalations."
        trigger="📧"
        reaction="💬"
        isActive={false}
        delay={0.3}
      />
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `}} />
  </div>
);

export default Workflows;
