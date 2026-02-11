
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
    <div className="h-[75vh] flex rounded-[3rem] overflow-hidden border border-white/10 glass relative">
      {/* Sidebar: Chats List */}
      <div className={`w-full md:w-80 flex-shrink-0 border-white/10 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'} border-r`}>
        <div className="p-8 border-b border-white/5">
          <h2 className="text-2xl font-black tracking-tight mb-6">{t.messages}</h2>
          <div className="relative">
             <input type="text" placeholder="Search..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scroll">
          {MOCK_CHATS.map(chat => (
            <button 
              key={chat.id} 
              onClick={() => setActiveChat(chat as any)}
              className={`w-full p-6 flex items-center space-x-4 space-x-reverse hover:bg-white/5 transition-all ${activeChat?.id === chat.id ? 'bg-white/5 border-l-4 border-indigo-50' : ''}`}
            >
              <img src={chat.partnerAvatar} className="w-12 h-12 rounded-2xl border-2 border-indigo-500/20 shadow-lg" alt="avatar" />
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                   <h4 className="font-black text-sm">{chat.partnerName}</h4>
                   <span className="text-[10px] text-slate-500">12:30</span>
                </div>
                <p className={`text-xs truncate ${chat.unread ? 'text-white font-black' : 'text-slate-500 font-medium'}`}>{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main: Active Chat */}
      <div className={`flex-1 flex flex-col bg-black/20 ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
        {activeChat ? (
          <>
            <div className="p-6 border-b border-white/5 flex justify-between items-center glass z-10">
               <div className="flex items-center space-x-4 space-x-reverse">
                  <button onClick={() => setActiveChat(null)} className="md:hidden text-2xl">🔙</button>
                  <img src={activeChat.partnerAvatar} className="w-10 h-10 rounded-xl" alt="partner" />
                  <div>
                    <h4 className="font-black text-sm">{activeChat.partnerName}</h4>
                    <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Online</p>
                  </div>
               </div>
               <div className="flex space-x-3">
                  <button onClick={() => onStartCall('audio', {name: activeChat.partnerName, avatar: activeChat.partnerAvatar})} className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-500/20 transition-all active:scale-90">🎙️</button>
                  <button onClick={() => onStartCall('video', {name: activeChat.partnerName, avatar: activeChat.partnerAvatar})} className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-indigo-500/20 transition-all active:scale-90">📹</button>
               </div>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto flex flex-col space-y-4 custom-scroll">
               <div className="self-start max-w-[80%] bg-white/5 p-4 rounded-3xl rounded-tl-none">
                  <p className="text-sm font-medium">Fin weslti f l'exercice dyal Python? Shuf hadak l-lien li seft lik.</p>
               </div>
               <div className="self-end max-w-[80%] premium-gradient p-4 rounded-3xl rounded-tr-none shadow-xl shadow-indigo-500/10">
                  <p className="text-sm font-black">Almost done! I found the bug in the loop. 🚀</p>
               </div>
            </div>
            
            <div className="p-6 border-t border-white/5">
              <div className="flex items-center space-x-4 space-x-reverse">
                 <button className="text-2xl hover:scale-110 transition-transform">📎</button>
                 <input type="text" placeholder="Type a message..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                 <button className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-xl shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">🚀</button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
             <div className="text-6xl mb-6">💬</div>
             <h3 className="text-2xl font-black">Select a peer to start chatting</h3>
             <p className="mt-2 font-medium">Real-time student collaboration.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
