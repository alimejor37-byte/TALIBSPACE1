
import React, { useState, useEffect, useRef } from 'react';
import { CallType, CallState, Language } from '../types';
import { STRINGS } from '../constants';

interface CallOverlayProps {
  type: CallType;
  partnerName?: string;
  partnerAvatar?: string;
  lang: Language;
  onEnd: () => void;
}

const CallOverlay: React.FC<CallOverlayProps> = ({ type, partnerName, partnerAvatar, lang, onEnd }) => {
  const t = STRINGS[lang];
  const [state, setState] = useState<CallState>(type === 'random' ? 'searching' : 'connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        
        if (type === 'random') {
          setTimeout(() => {
            setState('connected');
          }, 3000);
        } else {
          setTimeout(() => setState('connected'), 1500);
        }
      } catch (err) {
        console.error("Media error:", err);
      }
    };

    startMedia();
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, [type]);

  if (type === 'none') return null;

  return (
    <div className="fixed inset-0 z-[100] glass flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in zoom-in duration-300">
      <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-between">
        
        {/* Header Information */}
        <div className="w-full flex justify-between items-center bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-orange-500/10">
          <div className="flex items-center space-x-4 space-x-reverse">
             {partnerAvatar && <img src={partnerAvatar} className="w-12 h-12 rounded-full border-2 border-orange-500 shadow-lg shadow-orange-500/20" alt="partner" />}
             <div>
               <h3 className="text-xl font-black text-white">{partnerName || (state === 'searching' ? t.searching : 'CMC Student')}</h3>
               <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                 {state === 'searching' ? t.searching : state === 'connecting' ? 'Connecting...' : t.ongoingCall}
               </p>
             </div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
             <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse active-glow"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Secure Peer-to-Peer</span>
          </div>
        </div>

        {/* Call Content Area */}
        <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 py-8">
           {/* Partner Slot */}
           <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900 border border-orange-500/10 shadow-2xl flex items-center justify-center">
              {state === 'searching' ? (
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-4 border-orange-500 pulse-neon mb-6"></div>
                  <p className="text-orange-400 font-black animate-pulse">{t.searching}</p>
                </div>
              ) : (
                <>
                  <img src={partnerAvatar || "https://i.pravatar.cc/400?u=random"} className="absolute inset-0 w-full h-full object-cover opacity-60 blur-md" />
                  <div className="relative z-10 flex flex-col items-center">
                    <img src={partnerAvatar || "https://i.pravatar.cc/150?u=random"} className="w-32 h-32 rounded-full border-4 border-orange-500 shadow-2xl mb-4" />
                    <h4 className="text-2xl font-black text-white">{partnerName || "Student Match"}</h4>
                  </div>
                </>
              )}
           </div>

           {/* Self Slot */}
           <div className="relative rounded-[3rem] overflow-hidden bg-zinc-800 border border-orange-500/10 shadow-2xl group">
              <video ref={videoRef} autoPlay muted className={`w-full h-full object-cover transition-opacity ${isCamOff ? 'opacity-0' : 'opacity-100'}`} />
              {isCamOff && (
                <div className="absolute inset-0 flex items-center justify-center text-6xl">👤</div>
              )}
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest text-orange-400">You</div>
           </div>
        </div>

        {/* Controls Bar */}
        <div className="w-full flex justify-center items-center space-x-6 space-x-reverse bg-black/50 backdrop-blur-2xl p-8 rounded-[3.5rem] border border-orange-500/20">
           <button 
             onClick={() => setIsMuted(!isMuted)}
             className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all active:scale-90 ${isMuted ? 'bg-red-500 text-white' : 'glass hover:bg-orange-500/20'}`}
           >
             {isMuted ? '🔇' : '🎙️'}
           </button>
           
           <button 
             onClick={onEnd}
             className="w-24 h-24 rounded-full bg-orange-600 hover:bg-orange-700 shadow-2xl shadow-orange-600/40 flex items-center justify-center text-4xl transition-all active:scale-90 group active-glow"
           >
             <span className="group-hover:rotate-135 transition-transform duration-500">🔚</span>
           </button>

           <button 
             onClick={() => setIsCamOff(!isCamOff)}
             className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all active:scale-90 ${isCamOff ? 'bg-orange-500 text-white active-glow' : 'glass hover:bg-orange-500/20'}`}
           >
             {isCamOff ? '🙈' : '📹'}
           </button>

           {type === 'random' && state === 'connected' && (
             <button onClick={() => setState('searching')} className="ml-8 px-8 py-4 rounded-2xl premium-gradient text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/30 active:scale-95 transition-all active-glow">
               {t.skip} ⏭️
             </button>
           )}
        </div>

      </div>
    </div>
  );
};

export default CallOverlay;
