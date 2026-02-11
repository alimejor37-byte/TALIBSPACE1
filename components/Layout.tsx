
import React from 'react';
import { Language, Theme, User } from '../types';
import { STRINGS } from '../constants';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  theme: Theme;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, lang, theme, onToggleTheme, onToggleLang, activeTab, setActiveTab, user 
}) => {
  const t = STRINGS[lang];
  const isRtl = lang === Language.AR;

  const navItems = [
    { id: 'feed', label: t.feed, icon: '🏠', color: 'text-orange-400' },
    { id: 'announcements', label: t.announcements, icon: '📢', color: 'text-red-400' },
    { id: 'messages', label: t.messages, icon: '💬', color: 'text-amber-400' },
    { id: 'random', label: t.random, icon: '✨', color: 'text-orange-300' },
    { id: 'groups', label: t.groups, icon: '👥', color: 'text-orange-500' },
    { id: 'activities', label: t.activities, icon: '🏕️', color: 'text-yellow-500' },
    { id: 'resources', label: t.resources, icon: '📚', color: 'text-orange-200' },
    { id: 'aiAssistant', label: t.aiAssistant, icon: '🧠', color: 'text-orange-600' },
    { id: 'live', label: t.live, icon: '🎥', color: 'text-orange-400' },
    { id: 'opportunities', label: t.opportunities, icon: '💼', color: 'text-amber-600' },
    { id: 'profile', label: t.profile, icon: '👤', color: 'text-orange-100' },
  ];

  return (
    <div className={`min-h-screen flex ${isRtl ? 'rtl' : 'ltr'} bg-[#0a0a0a] text-slate-100`}>
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 ${isRtl ? 'right-6' : 'left-6'} my-6 w-80 glass rounded-[3rem] hidden xl:flex z-30 transition-all shadow-2xl flex-col`}>
        <div className="p-8 flex flex-col h-full">
          <div className="mb-10 p-2">
            <Logo size={42} />
          </div>
          
          <nav className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scroll mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-4 space-x-reverse px-5 py-3 rounded-[1.2rem] transition-all duration-300 group ${
                  activeTab === item.id 
                    ? 'bg-orange-500/10 border border-orange-500/20 shadow-lg scale-[1.02]' 
                    : 'hover:bg-white/5 opacity-60'
                }`}
              >
                <span className={`text-xl transition-transform group-hover:scale-110 ${activeTab === item.id ? 'active-glow ' + item.color : 'grayscale opacity-70'}`}>{item.icon}</span>
                <span className={`font-black text-xs uppercase tracking-widest ${activeTab === item.id ? 'text-orange-400' : 'text-slate-400'}`}>{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="pt-6 border-t border-white/5 space-y-4">
            {/* Gamification Indicator */}
            <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{user.level}</span>
                 <span className="text-xs font-black">{user.points} {t.points}</span>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full premium-gradient" style={{ width: '65%' }}></div>
               </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse p-3 rounded-2xl bg-white/5 border border-white/5">
               <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover border-2 border-orange-500/30" alt="avatar" />
               <div className={`overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
                 <p className="text-xs font-black truncate">{user.name}</p>
                 <p className="text-[9px] uppercase font-black text-orange-400 tracking-widest">{user.specialty}</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button onClick={onToggleTheme} className="flex items-center justify-center p-3 rounded-2xl glass hover:bg-orange-500/10 transition-all">
                {theme === Theme.LIGHT ? '🌙' : '☀️'}
              </button>
              <button onClick={onToggleLang} className="flex items-center justify-center p-3 rounded-2xl glass hover:bg-orange-500/10 transition-all font-black text-[10px] uppercase">
                {lang === Language.AR ? 'EN' : lang === Language.EN ? 'FR' : 'AR'}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isRtl ? 'xl:mr-[22rem]' : 'xl:ml-[22rem]'} min-h-screen pb-32 xl:pb-12`}>
        <header className="sticky top-0 z-20 glass px-6 py-4 flex justify-between items-center xl:hidden border-b border-orange-500/10">
            <div className="flex items-center space-x-3 space-x-reverse">
                <Logo size={32} showText={true} className="scale-75 origin-right" />
            </div>
            <div className="flex space-x-2">
                 <button onClick={onToggleLang} className="w-10 h-10 flex items-center justify-center rounded-xl glass font-black text-[10px] uppercase"> {lang === Language.AR ? 'EN' : lang === Language.EN ? 'FR' : 'AR'} </button>
            </div>
        </header>

        <div className="max-w-6xl mx-auto p-4 md:p-10">
          {children}
        </div>

        {/* Floating Mobile Nav */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-lg xl:hidden z-40">
          <nav className="glass rounded-[2.5rem] flex items-center p-3 h-20 shadow-2xl overflow-x-auto no-scrollbar gap-2 px-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center justify-center flex-shrink-0 w-12 h-12 rounded-xl transition-all duration-500 ${
                    activeTab === item.id 
                      ? 'bg-orange-600 text-white scale-110 -translate-y-2 shadow-2xl shadow-orange-600/40 active-glow' 
                      : 'text-slate-500'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                </button>
              ))}
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Layout;
