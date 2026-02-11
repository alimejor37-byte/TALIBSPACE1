
import React, { useState, useEffect } from 'react';
import { Language, CallType, User } from '../types';
import { STRINGS, LANGUAGE_ROOMS, PREMIUM_ROOMS, MOCK_QUIZ, WORD_OF_THE_DAY } from '../constants';

interface LanguageRoomProps {
  lang: Language;
  onStartCall: (type: CallType, partner?: {name: string, avatar: string}) => void;
  onAwardXP: (amount: number) => void;
  user: User;
  onOpenPremium: () => void;
}

const LanguageRoom: React.FC<LanguageRoomProps> = ({ lang, onStartCall, onAwardXP, user, onOpenPremium }) => {
  const t = STRINGS[lang];
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(false);

  // Combine rooms for easier lookup
  const allRooms = [...LANGUAGE_ROOMS, ...PREMIUM_ROOMS];
  const currentRoom = allRooms.find(r => r.id === activeRoom);
  const quiz = activeRoom ? (MOCK_QUIZ as any)[activeRoom] || MOCK_QUIZ.en : null;
  const word = activeRoom ? (WORD_OF_THE_DAY as any)[activeRoom] || WORD_OF_THE_DAY.en : null;

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    onAwardXP(100);
    setTimeout(() => {
        setShowQuiz(false);
        setQuizFinished(false);
    }, 3000);
  };

  const handleEnterRoom = (room: any) => {
    if (room.premium && !user.isPremium) {
      onOpenPremium();
      return;
    }
    setActiveRoom(room.id);
  };

  if (!activeRoom) {
    return (
      <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-20 relative z-10">
        {/* Header Section */}
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                 <span className="w-12 h-1.5 premium-gradient rounded-full shadow-lg active-glow"></span>
                 <p className="text-[11px] font-black uppercase tracking-[0.5em] text-orange-500">Global Campus Hub</p>
              </div>
              <h2 className="text-6xl font-black tracking-tighter text-white mb-4">Language Lounge</h2>
              <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed">
                Experience high-end immersion. Practice with peers in a safe, moderated, and professional virtual environment.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
               <button 
                onClick={() => onStartCall('random')}
                className="premium-gradient text-white px-12 py-6 rounded-[3rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-orange-500/40 active:scale-95 transition-all active-glow flex items-center space-x-4 space-x-reverse hover:translate-y-[-5px]"
               >
                 <span>1v1 Skill Match</span>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>
               </button>
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{user.isPremium ? 'Unlimited Matches' : 'Matches: 3/3'}</p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-20">
             {/* Public Rooms */}
             <section>
                <div className="flex items-center justify-between mb-10 px-4">
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
                     <span className="w-10 h-10 glass rounded-xl flex items-center justify-center text-lg">🌍</span>
                     Public Communities
                   </h3>
                   <div className="h-[1px] flex-1 mx-8 bg-white/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {LANGUAGE_ROOMS.map(room => (
                    <div 
                      key={room.id}
                      onClick={() => handleEnterRoom(room)}
                      className="group relative glass p-12 rounded-[4rem] border border-white/5 hover:border-orange-500/50 transition-all duration-700 cursor-pointer overflow-hidden shadow-3xl hover:scale-[1.03] hover:-translate-y-3"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${room.bg} opacity-10 group-hover:opacity-30 transition-opacity duration-700`}></div>
                      <div className="relative z-10 flex flex-col h-full items-center text-center">
                         <div className="text-8xl mb-12 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">{room.icon}</div>
                         <h4 className="text-2xl font-black text-white mb-2">{room.name}</h4>
                         <span className="text-[10px] font-black uppercase text-orange-500 tracking-[0.3em] mb-10">{room.level}</span>
                         
                         <div className="mt-auto w-full flex items-center justify-between pt-10 border-t border-white/5">
                            <div className="flex items-center space-x-2 space-x-reverse">
                               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                               <span className="text-xs font-black text-slate-500">{room.students} Live</span>
                            </div>
                            <div className="w-14 h-14 rounded-[2rem] bg-white/5 group-hover:bg-orange-500 text-orange-400 group-hover:text-white flex items-center justify-center transition-all shadow-xl group-hover:shadow-orange-500/40">
                               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
             </section>

             {/* Premium / Specialty Rooms */}
             <section>
                <div className="flex items-center justify-between mb-10 px-4">
                   <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
                     <span className="w-10 h-10 glass rounded-xl flex items-center justify-center text-lg">👑</span>
                     Specialized Hubs
                   </h3>
                   <div className="h-[1px] flex-1 mx-8 bg-white/5"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {PREMIUM_ROOMS.map(room => (
                    <div 
                      key={room.id}
                      onClick={() => handleEnterRoom(room)}
                      className={`group glass p-12 rounded-[4.5rem] border border-white/5 hover:border-amber-500/40 transition-all duration-700 cursor-pointer shadow-3xl relative overflow-hidden bg-black/60 hover:-translate-y-4 ${!user.isPremium ? 'opacity-70 saturate-50' : ''}`}
                    >
                      {!user.isPremium && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="premium-gradient p-5 rounded-[2rem] shadow-2xl flex items-center gap-3 active-glow">
                              <span className="text-2xl">🔒</span>
                              <span className="text-xs font-black uppercase text-white tracking-widest">Premium Only</span>
                           </div>
                        </div>
                      )}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all"></div>
                      <div className="flex justify-between items-start mb-10">
                         <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 border border-white/10 flex items-center justify-center text-4xl shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-6">{room.icon}</div>
                         <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-5 py-2 rounded-full border border-amber-500/20 shadow-lg">{room.type}</span>
                         </div>
                      </div>
                      <h4 className="text-3xl font-black text-white mb-4 tracking-tighter">{room.name}</h4>
                      <p className="text-slate-500 font-medium text-base leading-relaxed mb-12">{room.desc}</p>
                      
                      <div className="flex items-center justify-between pt-10 border-t border-white/5">
                         <div className="flex -space-x-4">
                            {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=premium${room.id}${i}`} className="w-10 h-10 rounded-2xl border-4 border-[#0a0a0a] shadow-xl" alt="participant" />)}
                         </div>
                         <button className="px-10 py-4 rounded-[1.5rem] glass font-black text-[10px] uppercase tracking-[0.2em] text-white hover:bg-amber-500 hover:text-black hover:shadow-2xl hover:shadow-amber-500/30 transition-all active:scale-95">Enter Lounge</button>
                      </div>
                    </div>
                  ))}
                </div>
             </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[85vh] flex flex-col md:flex-row rounded-[4.5rem] overflow-hidden border border-orange-500/10 glass shadow-3xl animate-in slide-in-from-right-12 duration-700 bg-[#050505] relative z-20">
      
      {/* Sidebar: Chat & Status */}
      <div className="w-full md:w-96 flex-shrink-0 border-r border-orange-500/10 flex flex-col bg-black/70 relative">
         <div className="p-12 border-b border-white/5 flex items-center justify-between bg-orange-500/5">
            <button onClick={() => setActiveRoom(null)} className="w-14 h-14 rounded-[1.5rem] glass flex items-center justify-center hover:bg-white/10 transition-all shadow-2xl active:scale-90 border border-orange-500/20">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div className="text-right">
               <h4 className="text-2xl font-black text-white tracking-tight">{currentRoom?.name}</h4>
               <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] mt-1.5">{currentRoom?.type}</p>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scroll no-scrollbar">
            {/* Word of the Day Redesign */}
            {word && (
              <div className="relative group p-10 rounded-[3rem] bg-orange-500/5 border border-orange-500/10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" strokeWidth="1"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5A2.5 2.5 0 0 1 6.5 2.5H20v14.5H6.5a2.5 2.5 0 0 1-2.5 2.5z"/></svg>
                </div>
                <div className="flex justify-between items-center mb-8">
                   <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">Lexicon Daily</span>
                   <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-orange-400 hover:bg-orange-500/20 transition-all">🔊</button>
                </div>
                <h3 className="text-5xl font-black text-white mb-2 leading-none">{word.word}</h3>
                <p className="text-xl text-orange-200/40 font-bold mb-8">{word.translation}</p>
                <div className="bg-black/50 p-6 rounded-[1.5rem] border border-white/5 shadow-inner">
                   <p className="text-sm italic text-slate-300 leading-relaxed font-medium">"{word.example}"</p>
                </div>
              </div>
            )}

            {/* Assessment Link */}
            <div className="p-10 rounded-[3rem] glass border border-white/5 text-center relative overflow-hidden group hover:border-orange-500/30 transition-all">
               <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-500">🏆</div>
               <h4 className="font-black text-white text-xl mb-3 leading-tight tracking-tight">Skill Assessment</h4>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10">{user.isPremium ? '+225 XP REWARD' : '+150 XP REWARD'}</p>
               <button 
                onClick={() => setShowQuiz(true)}
                className="w-full py-5 premium-gradient rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-3xl shadow-orange-500/40 active:scale-95 active-glow transition-all"
               >
                 Take Challenge ➔
               </button>
            </div>
         </div>
      </div>

      {/* Main Interaction Stage */}
      <div className="flex-1 flex flex-col relative bg-black/30 overflow-hidden">
         <div className="flex-1 p-12 overflow-y-auto custom-scroll flex flex-col items-center justify-center gap-16 relative">
            
            {/* Stage Grid */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Speaker 1 (Host) */}
               <div className="group relative aspect-video rounded-[4rem] bg-zinc-900 border-2 border-orange-500/10 overflow-hidden shadow-4xl flex flex-col items-center justify-center transition-all hover:scale-[1.02] hover:border-orange-500/50">
                  <div className="absolute inset-0 premium-gradient opacity-10"></div>
                  <div className="relative z-10 flex flex-col items-center">
                     <div className="w-36 h-36 rounded-[2.5rem] border-[6px] border-orange-500 shadow-[0_0_30px_rgba(255,106,0,0.5)] mb-8 p-1 bg-black pulse-neon">
                        <img src="https://i.pravatar.cc/150?u=prof" className="w-full h-full rounded-[2rem] object-cover" alt="host" />
                     </div>
                     <h4 className="text-3xl font-black text-white tracking-tight">Prof. Emily Smith</h4>
                     <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] mt-3 bg-orange-500/10 px-6 py-2 rounded-full border border-orange-500/20">Principal Host</p>
                  </div>
                  <div className="absolute bottom-10 right-10">
                     <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-2xl shadow-3xl border border-white/10 active-glow">🎙️</div>
                  </div>
               </div>

               {/* Self Slot */}
               <div className="group relative aspect-video rounded-[4rem] bg-zinc-800 border border-white/10 overflow-hidden shadow-4xl flex flex-col items-center justify-center transition-all hover:bg-white/5">
                  <div className="absolute inset-0 shimmer opacity-10"></div>
                  {!isCamOn ? (
                    <div className="flex flex-col items-center cursor-pointer group-hover:scale-110 transition-all duration-500" onClick={() => setIsCamOn(true)}>
                       <div className="w-28 h-28 rounded-[2.5rem] glass border border-white/10 flex items-center justify-center text-6xl mb-8 shadow-4xl group-hover:active-glow">📹</div>
                       <p className="text-slate-500 font-black text-[11px] uppercase tracking-[0.4em]">Enable Video Stream</p>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                       <img src="https://i.pravatar.cc/150?u=amine" className="w-full h-full object-cover grayscale opacity-30 blur-[4px]" alt="self" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-24 h-24 rounded-full border-4 border-orange-500/40 flex items-center justify-center text-orange-500 text-4xl animate-pulse active-glow shadow-[0_0_30px_rgba(255,106,0,0.3)]">📡</div>
                          <p className="text-white font-black uppercase tracking-[0.4em] text-[11px] mt-8 bg-black/60 px-6 py-2 rounded-full">Encrypted Link Active</p>
                       </div>
                    </div>
                  )}
               </div>
            </div>
         </div>

         {/* Bottom Control Dock - Redesigned with custom icons */}
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6">
            <div className="glass px-12 py-8 rounded-[4rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.9)] flex items-center justify-between gap-12 bg-black/80 backdrop-blur-3xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent"></div>
               
               {/* Controls */}
               <div className="flex items-center gap-6 pr-12 border-r border-white/10 relative z-10">
                  <button onClick={() => setIsMicOn(!isMicOn)} className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all active:scale-90 ${isMicOn ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/40 active-glow' : 'glass border-red-500/40 text-red-500'}`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>
                    </svg>
                  </button>
                  <button onClick={() => setIsCamOn(!isCamOn)} className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all active:scale-90 ${isCamOn ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/40 active-glow' : 'glass border-slate-500/40 text-slate-500'}`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </button>
               </div>
               
               {/* Central Large Buttons */}
               <div className="flex items-center gap-10 relative z-10">
                  <button onClick={() => setHandRaised(!handRaised)} className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl transition-all active:scale-90 ${handRaised ? 'bg-amber-500 text-white shadow-3xl shadow-amber-500/50 active-glow scale-110' : 'glass hover:bg-white/10'}`}>✋</button>
                  <button onClick={() => setActiveRoom(null)} className="w-28 h-28 rounded-[3rem] bg-red-600/20 border-2 border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all active:scale-90 shadow-4xl shadow-red-600/30">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                  </button>
               </div>

               {/* Extra Tools */}
               <div className="flex items-center gap-6 pl-12 border-l border-white/10 relative z-10">
                  <button className="w-16 h-16 rounded-[1.5rem] glass flex items-center justify-center hover:bg-white/10 transition-all text-2xl">⚙️</button>
                  <button className="w-16 h-16 rounded-[1.5rem] glass flex items-center justify-center hover:bg-white/10 transition-all text-2xl relative">
                    💬
                    <span className="absolute top-3 right-3 w-3 h-3 bg-orange-500 rounded-full border-2 border-black active-glow animate-pulse"></span>
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default LanguageRoom;
