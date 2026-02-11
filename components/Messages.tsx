
import React, { useState } from 'react';
import { Language, ChatThread, CallType } from '../types';
import { STRINGS, MOCK_CHATS } from '../constants';

interface MessagesProps {
  lang: Language;
  onStartCall: (type: CallType, partner?: {name: string, avatar: string}) => void;
}

const Messages: React.FC<MessagesProps> = ({ lang, onStartCall }) => {
  const t = STRINGS[lang];
  const [activeChat, setActiveChat] = useState<ChatThread | null>(null);

  return (
    <div className="h-[75vh] flex rounded-[3.5rem] overflow-hidden border border-orange-500/10 glass relative shadow-2xl">
      {/* Sidebar: Chats List */}
      <div className={`w-full md:w-80 flex-shrink-0 border-orange-500/10 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'} border-r bg-black/20`}>
        <div className="p-8 border-b border-white/5">
          <h2 className="text-3xl font-black tracking-tighter mb-6">{t.messages}</h2>
          <div className="relative">
             <input type="text" placeholder="Search..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-2">
          {MOCK_CHATS.map(chat => (
            <button 
              key={chat.id} 
              onClick={() => setActiveChat(chat as any)}
              className={`w-full p-5 flex items-center space-x-4 space-x-reverse rounded-[2rem] transition-all ${activeChat?.id === chat.id ? 'bg-orange-500/10 border border-orange-500/20 active-glow' : 'hover:bg-white/5'}`}
            >
              <img src={chat.partnerAvatar} className="w-14 h-14 rounded-2xl border-2 border-orange-500/20 shadow-lg" alt="avatar" />
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                   <h4 className="font-black text-sm text-white truncate">{chat.partnerName}</h4>
                   <span className="text-[10px] text-slate-500 font-bold">12:30</span>
                </div>
                <p className={`text-xs truncate ${chat.unread ? 'text-orange-400 font-black' : 'text-slate-500 font-medium'}`}>{chat.lastMessage}</p>
              </div>
              {chat.unread && <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,106,0,0.8)]"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Main: Active Chat */}
      <div className={`flex-1 flex flex-col bg-black/40 ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
        {activeChat ? (
          <>
            <div className="p-6 border-b border-white/5 flex justify-between items-center glass z-10">
               <div className="flex items-center space-x-4 space-x-reverse">
                  <button onClick={() => setActiveChat(null)} className="md:hidden text-2xl p-2">🔙</button>
                  <div className="relative">
                    <img src={activeChat.partnerAvatar} className="w-12 h-12 rounded-2xl border-2 border-orange-500/20" alt="partner" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-black rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-white">{activeChat.partnerName}</h4>
                    <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest">Digital / Year 1</p>
                  </div>
               </div>
               <div className="flex space-x-3 space-x-reverse">
                  <button onClick={() => onStartCall('audio', {name: activeChat.partnerName, avatar: activeChat.partnerAvatar})} className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-orange-500/20 text-orange-400 transition-all active:scale-90">🎙️</button>
                  <button onClick={() => onStartCall('video', {name: activeChat.partnerName, avatar: activeChat.partnerAvatar})} className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-orange-500/20 text-orange-400 transition-all active:scale-90 active-glow">📹</button>
               </div>
            </div>
            
            <div className="flex-1 p-10 overflow-y-auto flex flex-col space-y-6 custom-scroll bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.03),transparent)]">
               <div className="self-start max-w-[80%] bg-white/5 border border-white/10 p-5 rounded-[2.5rem] rounded-tl-none">
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">Khoya, weslti f l'exercice dyal Python? Shuf hadak l-lien li seft lik.</p>
               </div>
               <div className="self-end max-w-[80%] premium-gradient p-5 rounded-[2.5rem] rounded-tr-none shadow-xl shadow-orange-500/10">
                  <p className="text-sm font-black text-white leading-relaxed">Hani m3ak! I found the bug in the loop. It's working perfectly now. 🚀</p>
               </div>
            </div>
            
            <div className="p-8 border-t border-white/5">
              <div className="flex items-center space-x-4 space-x-reverse">
                 <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-xl hover:scale-110 transition-transform">📎</button>
                 <input type="text" placeholder="Type a message..." className="flex-1 bg-white/5 border border-white/10 rounded-3xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-medium" />
                 <button className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all active-glow">🚀</button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
             <div className="w-24 h-24 rounded-[2rem] border-4 border-orange-500/50 flex items-center justify-center text-6xl mb-8 pulse-neon">💬</div>
             <h3 className="text-3xl font-black text-white tracking-tighter">Start collaborating</h3>
             <p className="mt-4 font-medium text-slate-400 max-w-xs">Select a peer from the list to start a real-time student chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
