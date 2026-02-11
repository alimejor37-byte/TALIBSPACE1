
import React from 'react';
import { Language, User, FriendRequest } from '../types';
import { STRINGS } from '../constants';

interface FriendsProps {
  lang: Language;
  user: User;
  onAccept: (request: FriendRequest) => void;
  onDecline: (requestId: string) => void;
  onAddFriend: (id: string) => void;
  sentRequests: string[];
}

const MOCK_SUGGESTIONS = [
  { id: 's1', name: 'Youssef Filali', avatar: 'https://i.pravatar.cc/150?u=youssef', specialty: 'Digital', year: 1 },
  { id: 's2', name: 'Hajar Bennani', avatar: 'https://i.pravatar.cc/150?u=hajar', specialty: 'Industrie', year: 2 },
  { id: 's3', name: 'Omar Mansouri', avatar: 'https://i.pravatar.cc/150?u=omar', specialty: 'Tourisme', year: 1 },
  { id: 's4', name: 'Mounir El Fassi', avatar: 'https://i.pravatar.cc/150?u=mounir', specialty: 'BTP', year: 2 },
];

const Friends: React.FC<FriendsProps> = ({ lang, user, onAccept, onDecline, onAddFriend, sentRequests }) => {
  const t = STRINGS[lang];
  const isRtl = lang === Language.AR;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">{t.friends} 🤝</h2>
          <p className="text-orange-400 mt-2 font-medium">Grow your professional network within CMC.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
           <div className="flex -space-x-3">
              {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=avatar${i}`} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a]" />)}
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Join 500+ Talibs</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Dedicated Incoming Friend Requests Section */}
        <div className="lg:col-span-1 space-y-10">
          <section className="glass p-8 rounded-[3.5rem] border border-orange-500/10 shadow-2xl relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,106,0,0.05),transparent)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-lg shadow-lg shadow-orange-500/10">
                  <span className="animate-pulse">📬</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white leading-tight">Incoming Friend Requests</h3>
                  <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Pending connections</p>
                </div>
              </div>
              {user.friendRequests && user.friendRequests.length > 0 && (
                <span className="px-3 py-1 bg-orange-600 text-white text-[10px] font-black rounded-full shadow-lg shadow-orange-600/40">
                  {user.friendRequests.length}
                </span>
              )}
            </div>
            
            <div className="space-y-4">
              {!user.friendRequests || user.friendRequests.length === 0 ? (
                <div className="py-12 px-6 rounded-[2.5rem] border border-dashed border-white/10 text-center bg-black/20">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{t.noRequests}</p>
                </div>
              ) : (
                user.friendRequests.map(req => (
                  <div key={req.id} className="p-5 rounded-[2.5rem] bg-white/5 border border-white/5 animate-in slide-in-from-right-6 duration-500 hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative">
                        <img src={req.fromAvatar} className="w-14 h-14 rounded-2xl border-2 border-orange-500/20 shadow-xl object-cover transition-transform group-hover:scale-105" alt="avatar" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0a0a0a] rounded-full"></div>
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-black text-white truncate text-base">{req.fromName}</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{req.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onAccept(req)}
                        className="flex-1 premium-gradient text-white py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest active-glow hover:opacity-90 transition-all shadow-xl shadow-orange-500/10 active:scale-95"
                      >
                        {t.accept}
                      </button>
                      <button 
                        onClick={() => onDecline(req.id)}
                        className="flex-1 bg-white/5 text-slate-400 py-3.5 rounded-2xl font-black text-[9px] uppercase tracking-widest border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all active:scale-95"
                      >
                        {t.decline}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Suggested Friends Section */}
          <section className="glass p-8 rounded-[3.5rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black text-white flex items-center gap-3 mb-8">
              <span className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-lg">✨</span>
              {t.suggested}
            </h3>
            <div className="space-y-4">
              {MOCK_SUGGESTIONS.map(s => {
                const isSent = sentRequests.includes(s.id);
                return (
                  <div key={s.id} className="flex items-center justify-between p-4 rounded-[2rem] hover:bg-white/5 transition-all group border border-transparent hover:border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={s.avatar} className="w-12 h-12 rounded-xl border border-orange-500/10 group-hover:rotate-3 transition-transform" alt="avatar" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-black text-white truncate">{s.name}</p>
                        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-[0.2em]">{s.specialty}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => !isSent && onAddFriend(s.id)}
                      disabled={isSent}
                      className={`px-4 py-3 rounded-xl font-black text-[8px] uppercase tracking-widest transition-all ${
                        isSent 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default flex items-center gap-1' 
                          : 'bg-orange-600/10 text-orange-500 hover:bg-orange-600 hover:text-white active:scale-90 active-glow'
                      }`}
                    >
                      {isSent ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          Request Sent
                        </>
                      ) : t.addFriend}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Friends List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-8 bg-white/5 p-8 rounded-[3.5rem] border border-white/5 shadow-inner">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-2xl">👥</div>
              <div>
                <h3 className="text-2xl font-black text-white tracking-tighter">My Squad</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Your connections at CMC</p>
              </div>
            </div>
            <div className="glass px-6 py-3 rounded-2xl border border-orange-500/10 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{user.friends?.length || 0} Connected</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {user.friends && user.friends.length > 0 ? (
              user.friends.map((friendId, idx) => (
                <div key={friendId} className="glass p-8 rounded-[3.5rem] border border-orange-500/10 hover:border-orange-500/40 transition-all flex items-center gap-6 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 -mr-16 -mt-16 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <img src={`https://i.pravatar.cc/150?u=${friendId}`} className="w-24 h-24 rounded-[2rem] border-2 border-orange-500/20 shadow-2xl group-hover:scale-105 transition-transform duration-500 object-cover" alt="avatar" />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-[6px] border-[#0a0a0a] rounded-full shadow-lg"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl font-black text-white group-hover:text-orange-400 transition-colors truncate">CMC Peer {idx + 1}</h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Digital / Year 1</p>
                    <div className="flex gap-3">
                      <button className="flex-1 p-3.5 rounded-2xl bg-orange-500/10 text-orange-500 text-xs hover:bg-orange-500 hover:text-white transition-all active:scale-90 shadow-lg">💬</button>
                      <button className="flex-1 p-3.5 rounded-2xl bg-orange-500/10 text-orange-500 text-xs hover:bg-orange-500 hover:text-white transition-all active:scale-90 active-glow shadow-lg">📹</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
               <div className="col-span-full py-24 text-center glass rounded-[4rem] border border-dashed border-white/5 opacity-40">
                  <div className="text-6xl mb-6">🏝️</div>
                  <p className="text-2xl font-black text-slate-500 tracking-tight">Your squad is currently empty.</p>
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-[0.3em] mt-3">Expand your network to unlock collaboration!</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
