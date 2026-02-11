
import React, { useState } from 'react';
import { Activity, Language } from '../types';
import { STRINGS, MOCK_ACTIVITIES } from '../constants';

interface ActivitiesProps {
  lang: Language;
}

const Activities: React.FC<ActivitiesProps> = ({ lang }) => {
  const t = STRINGS[lang];
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES as any);

  const toggleJoin = (id: string) => {
    setActivities(activities.map(act => {
      if (act.id === id) {
        return { 
          ...act, 
          isJoined: !act.isJoined, 
          participants: act.isJoined ? act.participants - 1 : act.participants + 1 
        };
      }
      return act;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">{t.activities} 🏕️</h2>
          <p className="text-orange-400 mt-2 font-medium">Connect in real life. Travel. Play. Grow.</p>
        </div>
        <button className="premium-gradient px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 transition-all active-glow">
          + Organiser
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map(act => (
          <div key={act.id} className="glass rounded-[3rem] overflow-hidden border border-orange-500/10 hover:border-orange-500/30 transition-all group">
            <div className="h-48 bg-zinc-900 relative overflow-hidden">
               <div className="absolute inset-0 premium-gradient opacity-10 group-hover:opacity-20 transition-opacity"></div>
               <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                 {act.type === 'Trip' ? '🏔️' : act.type === 'Sport' ? '⚽' : act.type === 'Workshop' ? '💡' : '🤝'}
               </div>
               <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-400">
                 {act.date}
               </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-2">
                 <h3 className="text-2xl font-black group-hover:text-orange-400 transition-colors text-white">{act.title}</h3>
                 <span className="text-xs font-black text-orange-500 px-3 py-1 bg-orange-500/10 rounded-lg">{act.location}</span>
              </div>
              <p className="text-slate-400 font-medium mb-6 line-clamp-2">{act.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex -space-x-3 space-x-reverse">
                   {[1,2,3].map(i => (
                     <img key={i} src={`https://i.pravatar.cc/150?u=${act.id}${i}`} className="w-10 h-10 rounded-full border-4 border-zinc-900 shadow-xl" alt="avatar" />
                   ))}
                   <div className="w-10 h-10 rounded-full bg-orange-950 flex items-center justify-center text-[10px] font-bold border-4 border-zinc-900 text-orange-400">
                     +{act.participants}
                   </div>
                </div>
                
                <button 
                  onClick={() => toggleJoin(act.id)}
                  className={`px-8 py-3 rounded-2xl font-black transition-all active:scale-95 ${
                    act.isJoined 
                      ? 'bg-white/5 text-orange-400 border border-orange-500/20' 
                      : 'premium-gradient text-white shadow-xl shadow-orange-500/20 active-glow'
                  }`}
                >
                  {act.isJoined ? t.joined : t.join}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
