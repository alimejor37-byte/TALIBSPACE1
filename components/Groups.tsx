
import React, { useState } from 'react';
import { Language, Specialty, CallType } from '../types';
import { STRINGS } from '../constants';
import VoiceRecorder from './VoiceRecorder';
import AudioMessageBubble from './AudioMessageBubble';

interface GroupMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  type: 'text' | 'audio';
  content?: string;
  audioUrl?: string;
  duration?: string;
  timestamp: string;
}

// Fix: Define the missing GroupsProps interface
interface GroupsProps {
  lang: Language;
  onStartCall: (type: CallType, partner?: { name: string; avatar: string }) => void;
}

const Groups: React.FC<GroupsProps> = ({ lang, onStartCall }) => {
  const t = STRINGS[lang];
  const [activeGroup, setActiveGroup] = useState<Specialty | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([
    { id: '1', senderName: 'Mehdi Bennani', senderAvatar: 'https://i.pravatar.cc/100?u=mehdi', type: 'text', content: "Guys, I uploaded the new summaries for Digital Marketing. Check the resources tab!", timestamp: '12:45' },
    { id: '2', senderName: 'Sara El Amrani', senderAvatar: 'https://i.pravatar.cc/100?u=sara', type: 'text', content: "Thanks Mehdi! Let's review them in the group call tonight at 9PM. Who's in?", timestamp: '12:50' }
  ]);
  const [input, setInput] = useState('');

  const handleSendText = () => {
    if (!input.trim()) return;
    const newMessage: GroupMessage = {
      id: Date.now().toString(),
      senderName: 'Amine El Fassi',
      senderAvatar: 'https://i.pravatar.cc/100?u=amine',
      type: 'text',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setGroupMessages([...groupMessages, newMessage]);
    setInput('');
  };

  const handleSendAudio = (url: string, duration: string) => {
    const newMessage: GroupMessage = {
      id: Date.now().toString(),
      senderName: 'Amine El Fassi',
      senderAvatar: 'https://i.pravatar.cc/100?u=amine',
      type: 'audio',
      audioUrl: url,
      duration: duration,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setGroupMessages([...groupMessages, newMessage]);
    setIsRecording(false);
  };

  const filieres: Specialty[] = ['Digital', 'Industrie', 'Tourisme', 'Santé', 'BTP', 'Agriculture'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {!activeGroup ? (
        <>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-black tracking-tighter text-white">{t.groups} 👥</h2>
              <p className="text-orange-400 mt-2 font-medium">Join your Specialty lounge and study together.</p>
            </div>
            <button className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest">
               Search Groups
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filieres.map(f => (
              <div 
                key={f} 
                onClick={() => setActiveGroup(f)}
                className="group relative glass p-10 rounded-[3rem] border border-orange-500/10 hover:border-orange-500/40 transition-all cursor-pointer overflow-hidden shadow-2xl"
              >
                 <div className="absolute top-0 left-0 w-full h-1 premium-gradient opacity-20 group-hover:opacity-100 transition-opacity"></div>
                 <div className="w-20 h-20 bg-orange-500/10 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-xl border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                    {f === 'Digital' ? '💻' : f === 'Industrie' ? '⚙️' : f === 'Tourisme' ? '🌍' : f === 'Santé' ? '🏥' : f === 'BTP' ? '🏗️' : '🌱'}
                 </div>
                 
                 <h3 className="text-2xl font-black mb-3 text-white tracking-tight">{f} Lounge</h3>
                 <div className="flex items-center text-xs text-slate-500 font-black uppercase tracking-widest mb-8">
                    <div className="flex -space-x-3 mr-4">
                       {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${f}${i}`} className="w-8 h-8 rounded-full border-4 border-zinc-900 shadow-xl" />)}
                    </div>
                    <span className="text-orange-500">12 Active</span>
                 </div>
                 
                 <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Private Campus</span>
                    <button className="px-6 py-2.5 rounded-xl bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active-glow">Open</button>
                 </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-6 animate-in slide-in-from-right-8 duration-500">
           <div className="flex items-center justify-between glass p-8 rounded-[3rem] border border-orange-500/10 shadow-2xl">
              <div className="flex items-center space-x-6 space-x-reverse">
                 <button onClick={() => setActiveGroup(null)} className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-2xl hover:bg-orange-500/10 transition-all active:scale-90">🔙</button>
                 <div>
                   <h2 className="text-3xl font-black text-white tracking-tighter">{activeGroup} Lounge</h2>
                   <p className="text-orange-500 text-xs font-black uppercase tracking-[0.3em]">Official Study Group</p>
                 </div>
              </div>
              <button 
                onClick={() => onStartCall('video', {name: `${activeGroup} Group Call`, avatar: ''})}
                className="premium-gradient px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/30 active:scale-95 transition-all active-glow flex items-center space-x-3 space-x-reverse"
              >
                <span>{t.joinCall}</span>
                <span className="animate-pulse">🔊</span>
              </button>
           </div>

           <div className="h-[60vh] flex flex-col glass rounded-[4rem] border border-orange-500/10 p-10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 premium-gradient opacity-10"></div>
              <div className="flex-1 overflow-y-auto space-y-8 custom-scroll pr-4">
                 {groupMessages.map(msg => (
                   <div key={msg.id} className={`flex items-start gap-4 ${msg.senderName.includes('Amine') ? 'flex-row-reverse' : ''}`}>
                      <img src={msg.senderAvatar} className="w-10 h-10 rounded-xl border-2 border-orange-500/20" alt="avatar" />
                      <div className={`flex flex-col ${msg.senderName.includes('Amine') ? 'items-end' : 'items-start'}`}>
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{msg.senderName}</span>
                            <span className="text-[8px] text-slate-600 font-bold">{msg.timestamp}</span>
                         </div>
                         {msg.type === 'text' ? (
                           <div className={`p-5 rounded-[2.5rem] bg-white/5 border border-white/10 ${msg.senderName.includes('Amine') ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                              <p className="text-sm font-medium text-slate-200 leading-relaxed">{msg.content}</p>
                           </div>
                         ) : (
                           <AudioMessageBubble audioUrl={msg.audioUrl!} duration={msg.duration!} isMe={msg.senderName.includes('Amine')} />
                         )}
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="pt-8 border-t border-white/5">
                {isRecording ? (
                  <VoiceRecorder onSend={handleSendAudio} onCancel={() => setIsRecording(false)} />
                ) : (
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-xl hover:bg-white/5 transition-all">📎</div>
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                      placeholder="Chat with your classmates..." 
                      className="flex-1 bg-white/5 border border-white/10 rounded-3xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white font-medium" 
                    />
                    {input.trim() ? (
                      <button onClick={handleSendText} className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-xl shadow-xl shadow-orange-500/30 active:scale-95 active-glow">🚀</button>
                    ) : (
                      <button onClick={() => setIsRecording(true)} className="w-14 h-14 rounded-2xl bg-orange-600/10 border border-orange-500/20 text-orange-500 flex items-center justify-center text-xl hover:bg-orange-500 hover:text-white transition-all active-glow">🎙️</button>
                    )}
                  </div>
                )}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
