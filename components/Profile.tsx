
import React, { useState, useEffect } from 'react';
import { User, Language } from '../types';
import { STRINGS } from '../constants';
import { geminiAssistant } from '../services/geminiService';

interface ProfileProps {
  user: User;
  lang: Language;
}

const Profile: React.FC<ProfileProps> = ({ user, lang }) => {
  const t = STRINGS[lang];
  const [tip, setTip] = useState('...');

  useEffect(() => {
    geminiAssistant.suggestStudyTip(user.specialty).then(setTip);
  }, [user.specialty]);

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Profile Header */}
      <div className="glass rounded-[4rem] overflow-hidden border border-orange-500/10 shadow-2xl relative">
        <div className="h-56 premium-gradient relative overflow-hidden">
           <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
           <div className="absolute top-8 right-8 flex space-x-3 space-x-reverse z-10">
              <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90">⚙️</button>
           </div>
           {/* Decorative elements */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
        </div>
        <div className="px-10 pb-12 flex flex-col items-center -mt-24 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 premium-gradient rounded-[3rem] blur-2xl opacity-40 animate-pulse"></div>
            <img src={user.avatar} className="w-48 h-48 rounded-[3rem] border-[8px] border-[#0a0a0a] shadow-2xl object-cover relative z-10" alt="avatar" />
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-500 border-4 border-[#0a0a0a] rounded-full z-20 shadow-xl"></div>
          </div>
          
          <div className="mt-8 text-center">
            <h2 className="text-4xl font-black text-white tracking-tighter leading-tight">{user.name}</h2>
            <div className="flex items-center justify-center space-x-3 space-x-reverse mt-2">
              <span className="bg-orange-600 text-white text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-[0.2em] shadow-lg shadow-orange-600/20">{user.specialty}</span>
              <span className="text-slate-500 font-black text-xs uppercase tracking-widest">• {user.year}ème Année</span>
            </div>
          </div>

          {/* User Stats Section - Refined for "Premium" feel and prominent Friend Count */}
          <div className="grid grid-cols-3 gap-6 w-full mt-12 p-8 glass rounded-[3rem] border border-white/5 shadow-2xl relative">
            <div className="absolute inset-0 shimmer rounded-[3rem] pointer-events-none opacity-10"></div>
            <div className="text-center relative z-10">
              <p className="text-3xl font-black text-white drop-shadow-lg">{user.points}</p>
              <p className="text-[9px] font-black text-orange-400 uppercase tracking-[0.2em] mt-1">{t.points}</p>
            </div>
            <div className="text-center border-x border-white/10 relative z-10">
              <p className="text-3xl font-black text-orange-500 drop-shadow-[0_0_10px_rgba(255,106,0,0.5)]">{user.friends?.length || 0}</p>
              <p className="text-[9px] font-black text-orange-400 uppercase tracking-[0.2em] mt-1">{t.friends}</p>
            </div>
            <div className="text-center relative z-10">
              <p className="text-3xl font-black text-white drop-shadow-lg">{user.badges.length}</p>
              <p className="text-[9px] font-black text-orange-400 uppercase tracking-[0.2em] mt-1">Badges</p>
            </div>
          </div>
          
          <p className="mt-8 text-slate-400 font-medium max-w-md text-center leading-relaxed text-lg">
            {user.bio}
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {user.skills.map(skill => (
              <span key={skill} className="px-6 py-2.5 bg-orange-500/5 text-orange-400 rounded-2xl text-xs font-black uppercase tracking-widest border border-orange-500/10 hover:border-orange-500/30 transition-all cursor-default">
                #{skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Mentor Shimmering Card */}
      <div className="relative group">
        <div className="absolute -inset-1 premium-gradient rounded-[3.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
        <div className="relative glass rounded-[3.5rem] p-10 border border-orange-500/10 shadow-2xl">
          <div className="flex items-center space-x-6 space-x-reverse mb-8">
            <div className="w-16 h-16 premium-gradient rounded-3xl flex items-center justify-center text-4xl shadow-2xl active-glow">🤖</div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">AI Mentor Insight</h3>
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Personalized for {user.specialty}</p>
            </div>
          </div>
          <div className="p-8 bg-orange-500/5 rounded-[2.5rem] border-r-8 border-orange-500 italic text-orange-100 text-lg font-medium leading-relaxed shadow-inner">
            "{tip}"
          </div>
        </div>
      </div>

      <button className="w-full py-6 text-red-500 font-black bg-white/5 border-2 border-red-500/10 rounded-[2.5rem] hover:bg-red-500/10 hover:border-red-500/30 transition-all active:scale-[0.98] shadow-2xl uppercase tracking-[0.3em] text-sm">
        {t.logout}
      </button>
    </div>
  );
};

export default Profile;
