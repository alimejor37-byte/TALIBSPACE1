
import React, { useState } from 'react';
import { Language, Specialty } from '../types';
import { STRINGS, MOCK_RESOURCES } from '../constants';

interface LibraryProps {
  lang: Language;
}

const Library: React.FC<LibraryProps> = ({ lang }) => {
  const t = STRINGS[lang];
  const [filter, setFilter] = useState<Specialty | 'All'>('All');

  const filteredResources = filter === 'All' 
    ? MOCK_RESOURCES 
    : MOCK_RESOURCES.filter(r => r.specialty === filter);

  const specialties: Specialty[] = ['Digital', 'Industrie', 'Tourisme', 'Santé', 'BTP', 'Agriculture'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">{t.resources} 📚</h2>
          <p className="text-orange-400 mt-2 font-medium">Download summaries, PDFs, and exam prep.</p>
        </div>
        <button className="premium-gradient text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all active-glow">
          + Upload
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-4 no-scrollbar">
        <button
          onClick={() => setFilter('All')}
          className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
            filter === 'All' 
              ? 'premium-gradient border-transparent text-white shadow-lg active-glow' 
              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-orange-500/10'
          }`}
        >
          الكل
        </button>
        {specialties.map(spec => (
          <button
            key={spec}
            onClick={() => setFilter(spec)}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
              filter === spec 
                ? 'premium-gradient border-transparent text-white shadow-lg active-glow' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-orange-500/10'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map(res => (
          <div key={res.id} className="glass p-6 rounded-[2.5rem] border border-orange-500/10 hover:border-orange-500/30 transition-all flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 -mr-12 -mt-12 rounded-full blur-2xl"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 px-3 py-1 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  {res.fileType}
                </span>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{res.specialty}</span>
              </div>
              <h3 className="text-xl font-black text-white mb-2 group-hover:text-orange-400 transition-colors">{res.title}</h3>
              <p className="text-sm text-slate-400 font-medium line-clamp-2 leading-relaxed">{res.description}</p>
            </div>
            
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-sm">👤</div>
                <span className="text-xs font-black text-slate-400">{res.sharedBy}</span>
              </div>
              <button className="w-12 h-12 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white flex items-center justify-center transition-all active:scale-90 active-glow">
                📥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
