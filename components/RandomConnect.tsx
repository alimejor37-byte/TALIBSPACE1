
import React from 'react';
import { Language, CallType, User } from '../types';
import { STRINGS } from '../constants';

interface RandomConnectProps {
  lang: Language;
  onStartCall: (type: CallType) => void;
  user: User;
}

const RandomConnect: React.FC<RandomConnectProps> = ({ lang, onStartCall, user }) => {
  const t = STRINGS[lang];

  return (
    <div className="h-full min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-12 animate-in zoom-in duration-500">
        <div className="relative mx-auto w-56 h-56">
          <div className="absolute inset-0 premium-gradient rounded-[4rem] blur-[60px] opacity-20 animate-pulse"></div>
          <div className="relative w-full h-full glass rounded-[4rem] flex items-center justify-center text-8xl shadow-2xl shadow-orange-500/20 rotate-3 border border-orange-500/10">
            {user.isPremium ? '👑' : '✨'}
          </div>
          {user.isPremium && (
            <div className="absolute -bottom-4 -right-4 bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest active-glow">
               Priority Mode
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-6xl font-black tracking-tighter text-white">Random Connect</h2>
          <p className="text-slate-400 max-w-sm mx-auto font-medium leading-relaxed text-lg">
            {t.safetyNotice} Connect with fellow CMC students randomly for study or chat.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center">
           <button 
              onClick={() => onStartCall('random')}
              className="premium-gradient hover:scale-105 active:scale-95 text-white font-black px-20 py-7 rounded-[2.5rem] text-2xl shadow-2xl shadow-orange-500/40 transition-all uppercase tracking-[0.2em] active-glow"
           >
             {t.startCall} 🚀
           </button>
           
           <div className="flex items-center justify-center space-x-4 space-x-reverse bg-orange-500/5 px-8 py-3 rounded-full border border-orange-500/10 shadow-xl">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-sm font-black text-orange-400 uppercase tracking-widest">84 Students Live Now</span>
           </div>

           {user.isPremium ? (
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Premium Active: Unlimited Matches Unlock</p>
           ) : (
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">3 Matches remaining today</p>
           )}
        </div>
      </div>
    </div>
  );
};

export default RandomConnect;
