
import React, { useState, useEffect } from 'react';
import { User, Language } from '../types';
import { STRINGS } from '../constants';
import { geminiAssistant } from '../services/geminiService';

interface ProfileProps {
  user: User;
  lang: Language;
}

const Profile: React.FC<ProfileProps> = ({ user, lang }) => {
  const t = STRINGS[lang];
  const [tip, setTip] = useState('...');

  useEffect(() => {
    geminiAssistant.suggestStudyTip(user.specialty).then(setTip);
  }, [user.specialty]);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden hala-shadow border border-white dark:border-slate-800">
        <div className="h-48 hala-gradient relative">
           <div className="absolute top-6 right-6 flex space-x-2 space-x-reverse">
              <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all">⚙️</button>
           </div>
        </div>
        <div className="px-8 pb-10 flex flex-col items-center -mt-20">
          <div className="relative">
            <img src={user.avatar} className="w-40 h-40 rounded-[2.5rem] border-[6px] border-white dark:border-slate-950 hala-shadow object-cover" alt="avatar" />
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-white dark:border-slate-950 rounded-full"></div>
          </div>
          
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">{user.name}</h2>
            <div className="flex items-center justify-center space-x-2 space-x-reverse mt-1">
              <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest">{user.specialty}</span>
              <span className="text-slate-400 font-bold">• {user.year}ème Année</span>
            </div>
          </div>
          
          <p className="mt-6 text-slate-600 dark:text-slate-400 font-medium max-w-sm text-center leading-relaxed">
            {user.bio}
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {user.skills.map(skill => (
              <span key={skill} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl text-sm font-black border border-gray-100 dark:border-slate-700 hover:scale-105 transition-all">
                #{skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI Mentor Shimmering Card */}
      <div className="relative group">
        <div className="absolute -inset-1 hala-gradient rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] p-8 hala-shadow border border-white/50 dark:border-slate-800">
          <div className="flex items-center space-x-4 space-x-reverse mb-6">
            <div className="w-14 h-14 hala-gradient rounded-2xl flex items-center justify-center text-3xl hala-shadow">🤖</div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">AI Mentor Tip</h3>
              <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Personalized for {user.specialty}</p>
            </div>
          </div>
          <div className="p-5 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl border-r-4 border-indigo-500 italic text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            "{tip}"
          </div>
        </div>
      </div>

      {/* Modern Rules Section */}
      <div className="bg-slate-900 dark:bg-indigo-950 p-8 rounded-[2.5rem] text-white hala-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16"></div>
        <h3 className="text-xl font-black mb-6 flex items-center space-x-3 space-x-reverse">
          <span className="text-2xl">🛡️</span>
          <span>Community Guide</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '✨', text: 'Respect your peers' },
            { icon: '📂', text: 'Share valid resources' },
            { icon: '🚫', text: 'No commercial ads' },
            { icon: '🤝', text: 'Stay helpful' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 space-x-reverse bg-white/5 p-3 rounded-2xl">
              <span className="text-xl">{item.icon}</span>
              <span className="font-bold text-sm text-indigo-100">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-5 text-red-500 font-black bg-white dark:bg-slate-900 border-2 border-red-50 dark:border-red-900/30 rounded-3xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-all active:scale-[0.98] hala-shadow">
        {t.logout}
      </button>
    </div>
  );
};

export default Profile;
