import React from 'react';

const Profile = () => {
  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
      <header className="max-w-2xl">
        <h1 className="text-6xl font-black tracking-tighter text-white">System Settings</h1>
        <p className="mt-4 text-slate-400 font-medium leading-relaxed">
          Configure your personal identity and environment variables. These settings define how nodes perceive your identity during cross-protocol authentication.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Info */}
          <section className="glass-card space-y-8">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Identity
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-600 tracking-widest ml-1">Username</label>
                <input className="glass-input" value="samuelsgn25" disabled />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black text-slate-600 tracking-widest ml-1">Display Name</label>
                <input className="glass-input" defaultValue="Samuel SGN" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase font-black text-slate-600 tracking-widest ml-1">Email Protocol Address</label>
                <input className="glass-input" value="samuel@example.com" disabled />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button className="primary-button !px-8">Update Identity</button>
            </div>
          </section>

          {/* Security */}
          <section className="glass-card space-y-8">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
              Security Protocol
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <div>
                  <p className="font-bold text-white">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Secure your account with an secondary biometric passkey.</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-slate-800 p-1 flex items-center cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-slate-600"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                <div>
                  <p className="font-bold text-white">Advanced Session Encryption</p>
                  <p className="text-xs text-slate-500">Rotate JWT tokens every 12 hours for maximum security.</p>
                </div>
                <div className="w-12 h-6 rounded-full bg-indigo-500/20 p-1 flex items-center justify-end cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-indigo-400"></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <button className="glass-button text-rose-400 border-rose-500/20 hover:bg-rose-500/5">Reset Password Cluster</button>
            </div>
          </section>
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
          <div className="glass-card p-10 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 mb-6 shadow-2xl shadow-indigo-500/40">
              <div className="w-full h-full rounded-full bg-slate-900 border-4 border-[#030712] flex items-center justify-center text-5xl font-black text-white">S</div>
            </div>
            <h4 className="text-2xl font-black text-white">Samuel SGN</h4>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Administrator Node</p>
            
            <div className="mt-8 w-full space-y-3">
              <div className="flex justify-between text-xs py-3 border-b border-white/5">
                <span className="text-slate-500 font-bold uppercase tracking-tighter">System ID</span>
                <span className="text-white font-mono">NODE-88.XP.42</span>
              </div>
              <div className="flex justify-between text-xs py-3 border-b border-white/5">
                <span className="text-slate-500 font-bold uppercase tracking-tighter">Uptime</span>
                <span className="text-white font-mono">152 Days</span>
              </div>
              <div className="flex justify-between text-xs py-3">
                <span className="text-slate-500 font-bold uppercase tracking-tighter">Integrations</span>
                <span className="text-emerald-400 font-black">All operational</span>
              </div>
            </div>
          </div>

          <div className="glass-card !bg-indigo-600/10 border-indigo-500/20">
            <h4 className="text-lg font-black text-indigo-300 mb-2">Enterprise Plan</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              You are currently on the Pro Tier. Upgrade to Enterprise for multi-tenant orchestration and advanced webhook routing.
            </p>
            <button className="w-full mt-6 py-3 glass-button bg-indigo-500/20 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500/30">
              Upgrade System
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
