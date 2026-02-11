
import React, { useState } from 'react';
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
          systemInstruction: "You are an expert Study Buddy for CMC (Cité des Métiers et des Compétences) students. Use a mix of Arabic (Darija), French, and English as appropriate. Be helpful, clear, and encouraging. Focus on Digital, Industrial, and Tourism specialties if relevant."
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
              <p className="text-[10px] uppercase font-black tracking-widest text-orange-400">Powered by Gemini 3</p>
            </div>
         </div>
         <div className="flex space-x-2">
            <span className="bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-[10px] font-black">24/7 Academic Support</span>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scroll">
         {messages.length === 0 && (
           <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
              <div className="text-7xl">✍️</div>
              <div>
                <h3 className="text-2xl font-black text-orange-100">Ask anything about your courses</h3>
                <p className="max-w-xs mx-auto font-medium text-orange-200/60">Explain Python loops, summarize PDFs, or prepare for exams.</p>
              </div>
           </div>
         )}
         {messages.map((m, i) => (
           <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
              <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm font-medium leading-relaxed ${
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
           <input 
             value={query}
             onChange={e => setQuery(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && askAI()}
             type="text" 
             placeholder="Kteb l-query dyalk..." 
             className="flex-1 bg-white/5 border border-orange-500/20 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white" 
           />
           <button 
             onClick={askAI}
             disabled={loading || !query.trim()}
             className="w-14 h-14 rounded-2xl premium-gradient flex items-center justify-center text-xl shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
           >
             🚀
           </button>
        </div>
      </div>
    </div>
  );
};

export default AIStudyAssistant;
