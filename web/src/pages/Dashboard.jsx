import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeWorkflows: 3,
    totalExecutions: 154,
    connectedServices: 4,
    uptime: '99.9%'
  });

  const recentActivity = [
    { id: 1, action: 'GitHub Commit', reaction: 'Discord Notify', status: 'Success', time: '2 mins ago' },
    { id: 2, action: 'Spotify Track', reaction: 'Slack Message', status: 'Success', time: '15 mins ago' },
    { id: 3, action: 'Gmail Received', reaction: 'Drive Backup', status: 'Failed', time: '1 hour ago' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
          <p className="text-slate-400 mt-2">Welcome back, Samuel. Here's what's happening.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-900/40 transition-all transform hover:scale-105">
          + New AREA
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Workflows" value={stats.activeWorkflows} icon="⚡" />
        <StatCard title="Total Executions" value={stats.totalExecutions} icon="🔄" />
        <StatCard title="Services Linked" value={stats.connectedServices} icon="🔗" />
        <StatCard title="Engine Uptime" value={stats.uptime} icon="🛡️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-card">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/20 rounded-xl text-xl">🚀</div>
                  <div>
                    <p className="font-semibold">{activity.action} → {activity.reaction}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activity.status === 'Success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="glass-card">
          <h3 className="text-xl font-bold mb-6">Service Health</h3>
          <div className="space-y-6">
            <ServiceStatus name="GitHub" status="Online" color="green" />
            <ServiceStatus name="Discord" status="Online" color="green" />
            <ServiceStatus name="Google" status="Warning" color="yellow" />
            <ServiceStatus name="Spotify" status="Online" color="green" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="glass-card flex items-center justify-between">
    <div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold mt-1 tracking-tight">{value}</p>
    </div>
    <div className="text-3xl p-3 bg-white/5 rounded-2xl">{icon}</div>
  </div>
);

const ServiceStatus = ({ name, status, color }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full bg-${color}-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse`}></div>
      <span className="font-medium">{name}</span>
    </div>
    <span className="text-sm text-slate-500">{status}</span>
  </div>
);

export default Dashboard;
