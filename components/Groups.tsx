
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
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-white">{t.groups} 👥</h2>
              <p className="text-orange-400 mt-2 font-medium">Join your Specialty lounge and study together.</p>
            </div>
            <button className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest">
               Search Groups
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filieres.map(f => (
              <div 
                key={f} 
                onClick={() => setActiveGroup(f)}
                className="group relative glass p-10 rounded-[3rem] border border-orange-500/10 hover:border-orange-500/40 transition-all cursor-pointer overflow-hidden shadow-2xl"
              >
                 <div className="absolute top-0 left-0 w-full h-1 premium-gradient opacity-20 group-hover:opacity-100 transition-opacity"></div>
                 <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-xl border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                    {f === 'Digital' ? '💻' : f === 'Industrie' ? '⚙️' : f === 'Tourisme' ? '🌍' : f === 'Santé' ? '🏥' : f === 'BTP' ? '🏗️' : '🌱'}
                 </div>
                 
                 <h3 className="text-2xl font-black mb-3 text-white tracking-tight">{f} Lounge</h3>
                 <div className="flex items-center text-xs text-slate-500 font-black uppercase tracking-widest mb-8">
                    <div className="flex -space-x-3 mr-4">
                       {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${f}${i}`} className="w-8 h-8 rounded-full border-4 border-zinc-900 shadow-xl" />)}
                    </div>
                    <span className="text-orange-500">12 Active</span>
                 </div>
                 
                 <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Private Campus</span>
                    <button className="px-6 py-2.5 rounded-xl bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active-glow">Open</button>
                 </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-6 animate-in slide-in-from-right-8 duration-500">
           <div className="flex items-center justify-between glass p-8 rounded-[3rem] border border-orange-500/10 shadow-2xl">
              <div className="flex items-center space-x-6 space-x-reverse">
                 <button onClick={() => setActiveGroup(null)} className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-2xl hover:bg-orange-500/10 transition-all active:scale-90">🔙</button>
                 <div>
                   <h2 className="text-3xl font-black text-white tracking-tighter">{activeGroup} Lounge</h2>
                   <p className="text-orange-500 text-xs font-black uppercase tracking-[0.3em]">Official Study Group</p>
                 </div>
              </div>
              <button 
                onClick={() => onStartCall('video', {name: `${activeGroup} Group Call`, avatar: ''})}
                className="premium-gradient px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/30 active:scale-95 transition-all active-glow flex items-center space-x-3 space-x-reverse"
              >
                <span>{t.joinCall}</span>
                <span className="animate-pulse">🔊</span>
              </button>
           </div>

           <div className="h-[60vh] flex flex-col glass rounded-[4rem] border border-orange-500/10 p-10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 premium-gradient opacity-10"></div>
              <div className="flex-1 overflow-y-auto space-y-6 custom-scroll pr-4">
                 <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] max-w-[70%] rounded-tl-none">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                       <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Mehdi Bennani</span>
                       <span className="text-[9px] text-slate-600 font-bold">12:45</span>
                    </div>
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">Guys, I uploaded the new summaries for Digital Marketing. Check the resources tab!</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] max-w-[70%] rounded-tl-none">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                       <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Sara El Amrani</span>
                       <span className="text-[9px] text-slate-600 font-bold">12:50</span>
                    </div>
                    <p className="text-sm font-medium text-slate-200 leading-relaxed">Thanks Mehdi! Let's review them in the group call tonight at 9PM. Who's in?</p>
                 </div>
              </div>
              <div className="pt-8 border-t border-white/5 flex items-center space-x-4 space-x-reverse">
                 <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-xl hover:bg-white/5 transition-all">📎</div>
                 <input type="text" placeholder="Chat with your classmates..." className="flex-1 bg-white/5 border border-white/10 rounded-3xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-medium" />
                 <button className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-xl shadow-xl shadow-orange-500/30 active:scale-95 active-glow">🚀</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
