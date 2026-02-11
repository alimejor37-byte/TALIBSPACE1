
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { STRINGS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface AIStudyAssistantProps {
  lang: Language;
}

const AIStudyAssistant: React.FC<AIStudyAssistantProps> = ({ lang }) => {
  const t = STRINGS[lang];
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === Language.AR ? 'ar-MA' : lang === Language.FR ? 'fr-FR' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const askAI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          thinkingConfig: { thinkingBudget: 0 },
          systemInstruction: `You are an ultra-efficient Study Buddy for CMC students. 
          STRICT RULES:
          1. LANGUAGE MATCHING: Respond strictly in the SAME language the user uses. If they ask in Arabic (or Darija), reply in Arabic. If they ask in French, reply in French.
          2. Answer only in PLAIN TEXT. 
          3. NEVER use markdown like bolding, italics, or asterisks (*** or **).
          4. Structure your response in short, simple paragraphs (fa9arat bsat).
          5. Be EXTREMELY concise and direct.
          6. No long introductions or conclusions.`
        }
      });
      
      const aiText = response.text || "Sorry, I couldn't process that. Try again!";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI. Please check your internet." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[75vh] flex flex-col glass rounded-[3rem] border border-orange-500/10 overflow-hidden">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-orange-500/5">
         <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-orange-500/20">🧠</div>
            <div>
              <h2 className="text-2xl font-black">{t.aiAssistant}</h2>
              <p className="text-[10px] uppercase font-black tracking-widest text-orange-400">Fast Language Match ⚡</p>
            </div>
         </div>
         <div className="flex space-x-2">
            <span className="bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-[10px] font-black">Multi-Lingual Mode</span>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scroll">
         {messages.length === 0 && (
           <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
              <div className="text-7xl">⚡</div>
              <div>
                <h3 className="text-2xl font-black text-orange-100">Ask in any language</h3>
                <p className="max-w-xs mx-auto font-medium text-orange-200/60">The AI will automatically reply in the same language you use.</p>
              </div>
           </div>
         )}
         {messages.map((m, i) => (
           <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
              <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm font-medium leading-relaxed whitespace-pre-wrap ${
                m.role === 'user' 
                  ? 'premium-gradient text-white rounded-tr-none shadow-lg' 
                  : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none'
              }`}>
                {m.text}
              </div>
           </div>
         ))}
         {loading && (
           <div className="flex justify-start">
             <div className="bg-white/5 p-5 rounded-[2rem] rounded-tl-none border border-orange-500/10">
               <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce delay-200"></div>
               </div>
             </div>
           </div>
         )}
      </div>

      <div className="p-8 border-t border-white/5 bg-orange-500/5">
        <div className="flex items-center space-x-4 space-x-reverse">
           <div className="relative flex-1">
             <input 
               value={query}
               onChange={e => setQuery(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && askAI()}
               type="text" 
               placeholder={isListening ? "Listening..." : "Sowl b ay logha..."} 
               className={`w-full bg-white/5 border border-orange-500/20 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white transition-all ${isListening ? 'ring-2 ring-orange-500/50 placeholder:text-orange-400' : ''}`} 
             />
             <button
               onClick={toggleListening}
               className={`absolute inset-y-2 ${lang === Language.AR ? 'left-2' : 'right-2'} w-10 flex items-center justify-center rounded-xl transition-all duration-300 ${isListening ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(255,106,0,0.4)] scale-110' : 'text-slate-500 hover:text-orange-400 hover:bg-white/5'}`}
             >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isListening ? 'animate-pulse' : ''}>
                 <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                 <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                 <line x1="12" y1="19" x2="12" y2="22"/>
               </svg>
             </button>
           </div>
           <button 
             onClick={askAI}
             disabled={loading || !query.trim()}
             className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 active-glow"
           >
             🚀
           </button>
        </div>
      </div>
    </div>
  );
};

export default AIStudyAssistant;
