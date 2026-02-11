
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
          <h2 className="text-4xl font-black tracking-tighter">{t.announcements} 📢</h2>
          <p className="text-slate-400 mt-2 font-medium">Keep track of your campus life & exams.</p>
        </div>
        
        <div className="flex space-x-2 space-x-reverse overflow-x-auto no-scrollbar pb-2">
          {filieres.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                filter === f 
                  ? 'premium-gradient border-transparent shadow-lg text-white' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
            >
              {f === 'All' ? t.allFilieres : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 transition-all hover:translate-x-2">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  a.type === 'urgent' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 
                  a.type === 'event' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 
                  'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                }`}>
                  {a.type === 'urgent' ? t.urgent : a.type}
                </span>
                <span className="text-xs font-bold text-slate-500">{a.filiere} • {a.date}</span>
              </div>
              <button className="text-slate-500 hover:text-indigo-400 transition-colors">🔖</button>
            </div>
            
            <h3 className="text-xl font-black mb-2 group-hover:text-indigo-400 transition-colors">{a.title}</h3>
            <p className="text-slate-400 leading-relaxed font-medium">{a.content}</p>
            
            {a.type === 'urgent' && (
              <div className="absolute left-0 top-0 h-full w-1 premium-gradient rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
