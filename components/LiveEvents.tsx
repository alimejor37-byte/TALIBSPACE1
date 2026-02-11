
import React from 'react';
import { Language, LiveEvent } from '../types';
import { STRINGS, MOCK_LIVE_EVENTS } from '../constants';

interface LiveEventsProps {
  lang: Language;
}

const LiveEvents: React.FC<LiveEventsProps> = ({ lang }) => {
  const t = STRINGS[lang];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black tracking-tighter">{t.live} 🎥</h2>
          <p className="text-slate-400 mt-2 font-medium">Join real-time workshops and campus talks.</p>
        </div>
        <button className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest animate-pulse">
           Go Live
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_LIVE_EVENTS.map(ev => (
          <div key={ev.id} className="group cursor-pointer">
             <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 glass mb-4">
                <img src={ev.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="thumb" />
                <div className="absolute top-4 left-4 bg-red-600 px-4 py-1.5 rounded-full flex items-center space-x-2 space-x-reverse">
                   <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">Live</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-white">
                  👁️ {ev.viewers} viewers
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-3xl">▶️</div>
                </div>
             </div>
             <div className="flex items-start space-x-4 space-x-reverse px-2">
                <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center text-xl shadow-lg font-black text-white">
                  {ev.host.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black group-hover:text-indigo-400 transition-colors">{ev.title}</h3>
                  <p className="text-sm font-bold text-slate-500">{ev.host} • 1h ago</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveEvents;
