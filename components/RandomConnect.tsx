
import React from 'react';
import { Language, CallType } from '../types';
import { STRINGS } from '../constants';

interface RandomConnectProps {
  lang: Language;
  onStartCall: (type: CallType) => void;
}

const RandomConnect: React.FC<RandomConnectProps> = ({ lang, onStartCall }) => {
  const t = STRINGS[lang];

  return (
    <div className="h-full min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-12 animate-in zoom-in duration-500">
        <div className="relative mx-auto w-48 h-48">
          <div className="absolute inset-0 premium-gradient rounded-[3.5rem] blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative w-full h-full glass rounded-[3.5rem] flex items-center justify-center text-7xl shadow-2xl shadow-indigo-500/20 rotate-3 border border-white/10">
            ✨
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-5xl font-black tracking-tighter">{t.random}</h2>
          <p className="text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
            {t.safetyNotice} Connect with fellow CMC students randomly for study or chat.
          </p>
        </div>

        <div className="flex flex-col gap-6">
           <button 
              onClick={() => onStartCall('random')}
              className="premium-gradient hover:scale-105 active:scale-95 text-white font-black px-16 py-6 rounded-[2.5rem] text-xl shadow-2xl shadow-indigo-500/40 transition-all uppercase tracking-widest"
           >
             {t.startCall} 🚀
           </button>
           
           <div className="flex items-center justify-center space-x-4 space-x-reverse bg-white/5 p-4 rounded-3xl border border-white/5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-black text-emerald-400">84 Students Online</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RandomConnect;
