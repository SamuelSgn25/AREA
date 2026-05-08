import React, { useState, useEffect } from 'react';

const StatCard = ({ title, value, change, icon, color }) => (
  <div className="glass-card flex flex-col justify-between group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-4 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 text-2xl group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-lg ${change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
        {change}
      </div>
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <p className="text-4xl font-black text-white">{value}</p>
    </div>
  </div>
);

const ActivityRow = ({ action, reaction, status, time, delay }) => (
  <div 
    className="flex items-center justify-between p-5 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.06] transition-all duration-300 group"
    style={{ animation: `fadeIn 0.5s ease-out forwards ${delay}s`, opacity: 0 }}
  >
    <div className="flex items-center gap-5">
      <div className="flex -space-x-4">
        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#030712] flex items-center justify-center text-lg shadow-lg">⚡</div>
        <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-[#030712] flex items-center justify-center text-lg shadow-lg group-hover:translate-x-2 transition-transform duration-500">🔗</div>
      </div>
      <div>
        <p className="font-bold text-slate-200">
          <span className="text-indigo-400">{action}</span>
          <span className="mx-2 text-slate-600">→</span>
          <span className="text-fuchsia-400">{reaction}</span>
        </p>
        <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">{time}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className={`pill ${status === 'Success' ? 'pill-success' : 'pill-danger'}`}>
        {status}
      </div>
      <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 text-slate-500 hover:text-white transition-all">
        ⋮
      </button>
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-black tracking-tighter text-white">System Status</h1>
          <p className="mt-4 text-slate-400 max-w-lg font-medium leading-relaxed">
            All systems are operational. Your active automation nodes are processing events in real-time with an average latency of <span className="text-emerald-400">24ms</span>.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="glass-button">View logs</button>
          <button className="primary-button group">
            + New Automation
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Workflows" value="12" change="+2.4%" icon="🚀" color="indigo" />
        <StatCard title="Requests/Hr" value="1.2k" change="+12%" icon="📉" color="fuchsia" />
        <StatCard title="Success Rate" value="99.9%" change="+0.1%" icon="💎" color="emerald" />
        <StatCard title="Credits Used" value="450" change="-5%" icon="💳" color="amber" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Activity Feed */}
        <div className="xl:col-span-2 glass-card space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black text-white">Real-time Stream</h3>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Live Output</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <ActivityRow action="GitHub Push" reaction="Discord Webhook" status="Success" time="2 mins ago" delay={0.1} />
            <ActivityRow action="Spotify Save" reaction="Google Sheets" status="Success" time="14 mins ago" delay={0.2} />
            <ActivityRow action="Gmail Receive" reaction="Notion Create" status="Failed" time="1 hour ago" delay={0.3} />
            <ActivityRow action="Twitter Mention" reaction="Slack Notify" status="Success" time="3 hours ago" delay={0.4} />
            <ActivityRow action="Crypto Price" reaction="Phone Call" status="Success" time="5 hours ago" delay={0.5} />
          </div>
          
          <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors border-t border-white/5 pt-8">
            Load full execution history
          </button>
        </div>

        {/* Integration Health */}
        <div className="glass-card space-y-8">
          <h3 className="text-2xl font-black text-white">Connected Nodes</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">🐙</div>
                <div>
                  <p className="font-bold text-sm">GitHub API</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black">v3 Rest API</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>
            
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">💬</div>
                <div>
                  <p className="font-bold text-sm">Discord Bot</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Websocket 10</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>

            <div className="flex items-center justify-between group opacity-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl grayscale group-hover:grayscale-0 transition-all">🔵</div>
                <div>
                  <p className="font-bold text-sm">Google Workspace</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Not connected</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/5">
            <p className="text-xs text-slate-500 leading-relaxed">
              Your system is currently consuming <span className="text-white font-bold">14/20</span> available node slots. Upgrade to Enterprise for unlimited nodes.
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default Dashboard;
