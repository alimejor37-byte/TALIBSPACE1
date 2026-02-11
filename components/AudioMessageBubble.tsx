
import React, { useState, useRef, useEffect } from 'react';

interface AudioMessageBubbleProps {
  audioUrl: string;
  duration: string;
  isMe?: boolean;
}

const AudioMessageBubble: React.FC<AudioMessageBubbleProps> = ({ audioUrl, duration, isMe }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
    setPlaybackSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <div className={`flex items-center gap-4 p-4 rounded-[2rem] min-w-[240px] ${isMe ? 'bg-orange-600/20 text-white border border-orange-500/20' : 'bg-white/5 text-slate-200 border border-white/10'}`}>
      <audio ref={audioRef} src={audioUrl} />
      
      <button 
        onClick={togglePlay}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90 ${isMe ? 'bg-orange-500' : 'bg-orange-500/20 text-orange-500'}`}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>

      <div className="flex-1 space-y-2">
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-100 ${isMe ? 'bg-white' : 'premium-gradient'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] font-black opacity-60 tabular-nums">{duration}</span>
          <button 
            onClick={handleSpeed}
            className="text-[9px] font-black uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-lg hover:bg-black/40 transition-colors"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 h-8 justify-center">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`w-0.5 rounded-full ${isMe ? 'bg-white/30' : 'bg-orange-500/30'}`}
            style={{ height: `${Math.random() * 100 + 20}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioMessageBubble;
