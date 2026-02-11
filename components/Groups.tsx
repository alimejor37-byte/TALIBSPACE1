
import React, { useState } from 'react';
import { Language, Specialty, CallType } from '../types';
import { STRINGS } from '../constants';

interface GroupsProps {
  lang: Language;
  onStartCall: (type: CallType, partner?: {name: string, avatar: string}) => void;
}

const filieres: Specialty[] = ['Digital', 'Industrie', 'Tourisme', 'Santé', 'BTP', 'Agriculture'];

const Groups: React.FC<GroupsProps> = ({ lang, onStartCall }) => {
  const t = STRINGS[lang];
  const [activeGroup, setActiveGroup] = useState<Specialty | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {!activeGroup ? (
        <>
          <div>
            <h2 className="text-4xl font-black tracking-tighter">{t.groups} 👥</h2>
            <p className="text-slate-400 mt-2 font-medium">Join your Specialty lounge and study together.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filieres.map(f => (
              <div 
                key={f} 
                onClick={() => setActiveGroup(f)}
                className="group relative glass p-8 rounded-[2.5rem] border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer overflow-hidden"
              >
                 <div className="absolute top-0 left-0 w-full h-1 premium-gradient opacity-20"></div>
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-xl border border-white/10 group-hover:scale-110 transition-transform">
                    {f === 'Digital' ? '💻' : f === 'Industrie' ? '⚙️' : f === 'Tourisme' ? '🌍' : f === 'Santé' ? '🏥' : f === 'BTP' ? '🏗️' : '🌱'}
                 </div>
                 
                 <h3 className="text-xl font-black mb-2">{f}</h3>
                 <div className="flex items-center text-xs text-slate-500 font-bold mb-6">
                    <div className="flex -space-x-2 mr-3">
                       {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 shadow-lg"></div>)}
                    </div>
                    <span className="text-indigo-400">12 Active Now</span>
                 </div>
                 
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-500">Lounge Open</span>
                    <button className="px-4 py-2 rounded-xl bg-white/5 text-xs font-black hover:bg-white/10 transition-all">Open</button>
                 </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-6">
           <div className="flex items-center justify-between glass p-6 rounded-[2rem] border border-white/10">
              <div className="flex items-center space-x-4 space-x-reverse">
                 <button onClick={() => setActiveGroup(null)} className="text-2xl p-2 hover:bg-white/5 rounded-xl">🔙</button>
                 <h2 className="text-2xl font-black">{activeGroup} Lounge</h2>
              </div>
              <button 
                onClick={() => onStartCall('video', {name: `${activeGroup} Group Call`, avatar: ''})}
                className="premium-gradient px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
              >
                {t.joinCall} 🔊
              </button>
           </div>

           <div className="h-[50vh] flex flex-col glass rounded-[3rem] border border-white/10 p-8">
              <div className="flex-1 overflow-y-auto space-y-4">
                 <div className="bg-white/5 p-4 rounded-2xl max-w-[70%]">
                    <p className="text-xs font-black text-indigo-400 mb-1">Mehdi</p>
                    <p className="text-sm font-medium">Guys, I uploaded the new summaries for Digital Marketing.</p>
                 </div>
                 <div className="bg-white/5 p-4 rounded-2xl max-w-[70%]">
                    <p className="text-xs font-black text-indigo-400 mb-1">Sara</p>
                    <p className="text-sm font-medium">Thanks! Let's review them in the call tonight at 9PM.</p>
                 </div>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center space-x-4 space-x-reverse">
                 <input type="text" placeholder="Chat with the group..." className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none" />
                 <button className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center">🚀</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
