
import React, { useState } from 'react';
import { Language, ChatThread, CallType } from '../types';
import { STRINGS, MOCK_CHATS } from '../constants';
import VoiceRecorder from './VoiceRecorder';
import AudioMessageBubble from './AudioMessageBubble';

interface Message {
  id: string;
  sender: 'me' | 'partner';
  type: 'text' | 'audio';
  content?: string;
  audioUrl?: string;
  duration?: string;
  timestamp: string;
}

// Fix: Define the missing MessagesProps interface
interface MessagesProps {
  lang: Language;
  onStartCall: (type: CallType, partner?: { name: string; avatar: string }) => void;
}

const Messages: React.FC<MessagesProps> = ({ lang, onStartCall }) => {
  const t = STRINGS[lang];
  const [activeChat, setActiveChat] = useState<ChatThread | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({
    'c1': [
      { id: '1', sender: 'partner', type: 'text', content: "Khoya, weslti f l'exercice dyal Python? Shuf hadak l-lien li seft lik.", timestamp: '12:30' },
      { id: '2', sender: 'me', type: 'text', content: "Hani m3ak! I found the bug in the loop. It's working perfectly now. 🚀", timestamp: '12:31' }
    ]
  });

  const [messageInput, setMessageInput] = useState('');

  const handleSendText = () => {
    if (!messageInput.trim() || !activeChat) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      type: 'text',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }));
    setMessageInput('');
  };

  const handleSendAudio = (url: string, duration: string) => {
    if (!activeChat) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      type: 'audio',
      audioUrl: url,
      duration: duration,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }));
    setIsRecording(false);
  };

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
               {(chatMessages[activeChat.id] || []).map((msg) => (
                 <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                   {msg.type === 'text' ? (
                     <div className={`max-w-[80%] p-5 rounded-[2.5rem] ${msg.sender === 'me' ? 'premium-gradient rounded-tr-none shadow-xl shadow-orange-500/10' : 'bg-white/5 border border-white/10 rounded-tl-none'}`}>
                        <p className={`text-sm leading-relaxed ${msg.sender === 'me' ? 'font-black text-white' : 'font-medium text-slate-200'}`}>
                          {msg.content}
                        </p>
                     </div>
                   ) : (
                     <AudioMessageBubble 
                       audioUrl={msg.audioUrl!} 
                       duration={msg.duration!} 
                       isMe={msg.sender === 'me'} 
                     />
                   )}
                   <span className="text-[9px] font-black text-slate-600 uppercase mt-2 px-2">{msg.timestamp}</span>
                 </div>
               ))}
            </div>
            
            <div className="p-8 border-t border-white/5">
              {isRecording ? (
                <VoiceRecorder onSend={handleSendAudio} onCancel={() => setIsRecording(false)} />
              ) : (
                <div className="flex items-center space-x-4 space-x-reverse">
                  <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-xl hover:scale-110 transition-transform">📎</button>
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                    placeholder="Type a message..." 
                    className="flex-1 bg-white/5 border border-white/10 rounded-3xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-medium" 
                  />
                  
                  {messageInput.trim() ? (
                    <button 
                      onClick={handleSendText}
                      className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all active-glow"
                    >
                      🚀
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsRecording(true)}
                      className="w-14 h-14 rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center text-xl hover:bg-orange-500 hover:text-white transition-all active-glow"
                    >
                      🎙️
                    </button>
                  )}
                </div>
              )}
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
