
import React, { useState, useEffect, useRef } from 'react';

interface VoiceRecorderProps {
  onSend: (audioUrl: string, duration: string) => void;
  onCancel: () => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onSend, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    startRecording();
    return () => stopRecording();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        // In a real app, you'd upload this blob. Here we use the local URL.
        onSend(url, formatTime(duration));
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      timerRef.current = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Mic access denied", err);
      onCancel();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4 w-full bg-orange-600/10 border border-orange-500/20 p-2 rounded-3xl animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3 px-4">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
        <span className="text-sm font-black text-white tabular-nums">{formatTime(duration)}</span>
      </div>
      
      <div className="flex-1 h-8 flex items-center justify-center gap-1">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 bg-orange-500 rounded-full transition-all duration-150"
            style={{ 
              height: isRecording ? `${Math.random() * 80 + 20}%` : '20%',
              opacity: isRecording ? 1 : 0.3
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onCancel}
          className="w-10 h-10 rounded-2xl glass hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all"
        >
          ✕
        </button>
        <button 
          onClick={stopRecording}
          className="w-10 h-10 rounded-2xl premium-gradient text-white flex items-center justify-center shadow-xl active-glow transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;
