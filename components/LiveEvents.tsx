
import React from 'react';
import { Language, LiveEvent } from '../types';
import { STRINGS, MOCK_LIVE_EVENTS } from '../constants';

interface LiveEventsProps {
  lang: Language;
}

const LiveEvents: React.FC<LiveEventsProps> = ({ lang }) => {
  const t = STRINGS[lang];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">{t.live} 🎥</h2>
          <p className="text-orange-400 mt-2 font-medium">Join real-time workshops and campus talks.</p>
        </div>
        <button className="bg-orange-600/10 text-orange-500 border border-orange-500/20 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest animate-pulse active-glow">
           Go Live Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {MOCK_LIVE_EVENTS.map(ev => (
          <div key={ev.id} className="group cursor-pointer">
             <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-orange-500/10 glass mb-6 shadow-2xl">
                <img src={ev.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="thumb" />
                <div className="absolute top-6 left-6 premium-gradient px-4 py-1.5 rounded-full flex items-center space-x-2 space-x-reverse shadow-xl active-glow">
                   <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">Live</span>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                  👁️ {ev.viewers} viewers
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500">
                   <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-4xl shadow-2xl scale-75 group-hover:scale-100 transition-transform">▶️</div>
                </div>
             </div>
             <div className="flex items-start space-x-5 space-x-reverse px-2">
                <div className="w-16 h-16 rounded-[1.5rem] premium-gradient flex items-center justify-center text-2xl shadow-xl font-black text-white active-glow">
                  {ev.host.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors tracking-tight">{ev.title}</h3>
                  <p className="text-sm font-bold text-slate-500 mt-1">{ev.host} • Hosted by Talent Hub</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveEvents;
