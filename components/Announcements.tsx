
import React, { useState } from 'react';
import { Language, Specialty } from '../types';
import { STRINGS, MOCK_ANNOUNCEMENTS } from '../constants';

interface AnnouncementsProps {
  lang: Language;
}

const Announcements: React.FC<AnnouncementsProps> = ({ lang }) => {
  const t = STRINGS[lang];
  const [filter, setFilter] = useState<Specialty | 'All'>('All');

  const filtered = filter === 'All' 
    ? MOCK_ANNOUNCEMENTS 
    : MOCK_ANNOUNCEMENTS.filter(a => a.filiere === filter || a.filiere === 'All');

  const filieres: (Specialty | 'All')[] = ['All', 'Digital', 'Industrie', 'Tourisme', 'Santé', 'BTP', 'Agriculture'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">{t.announcements} 📢</h2>
          <p className="text-orange-400 mt-2 font-medium">Keep track of your campus life & exams.</p>
        </div>
        
        <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar pb-2">
          {filieres.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                filter === f 
                  ? 'premium-gradient border-transparent shadow-lg text-white active-glow' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-orange-500/10'
              }`}
            >
              {f === 'All' ? t.allFilieres : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filtered.map(a => (
          <div key={a.id} className="group relative glass rounded-[2.5rem] p-8 border border-orange-500/10 hover:border-orange-500/30 transition-all hover:translate-x-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full premium-gradient opacity-20 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                  a.type === 'urgent' ? 'bg-orange-600/20 text-orange-500 border-orange-500/30 active-glow animate-pulse' : 
                  a.type === 'event' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 
                  'bg-white/5 text-slate-400 border-white/10'
                }`}>
                  {a.type === 'urgent' ? t.urgent : a.type}
                </span>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{a.filiere} • {a.date}</span>
              </div>
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-orange-400 transition-colors">🔖</button>
            </div>
            
            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-orange-400 transition-colors tracking-tight">{a.title}</h3>
            <p className="text-slate-400 leading-relaxed font-medium text-lg">{a.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
