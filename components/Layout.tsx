
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
  onOpenPremium: () => void;
}

const IconWrapper: React.FC<{ children: React.ReactNode; active: boolean }> = ({ children, active }) => (
  <div className={`relative flex items-center justify-center icon-premium ${active ? 'active-glow' : 'opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}>
    {children}
  </div>
);

const PremiumBadge: React.FC = () => (
  <div className="absolute -top-1 -right-1 flex items-center justify-center">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="active-glow animate-pulse">
      <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" fill="#FFB300" stroke="#FF6A00" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ 
  children, lang, theme, onToggleTheme, onToggleLang, activeTab, setActiveTab, user, onOpenPremium
}) => {
  const t = STRINGS[lang];
  const isRtl = lang === Language.AR;

  const navItems = [
    { 
      id: 'feed', 
      label: t.feed, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 4L21 9.5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9.5Z" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V12H15V21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'languageRoom', 
      label: t.languageRoom, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5"/>
          <path d="M12 3C12 3 16 7 16 12C16 17 12 21 12 21M12 3C12 3 8 7 8 12C8 17 12 21 12 21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 12H21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2"/>
          <path d="M12 9L15 12L12 15" stroke={active ? "#FFB300" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={active ? 1 : 0.5}/>
        </svg>
      )
    },
    { 
      id: 'announcements', 
      label: t.announcements, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {active && <circle cx="18" cy="6" r="3" fill="#FFB300" className="animate-pulse"/>}
        </svg>
      )
    },
    { 
      id: 'messages', 
      label: t.messages, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 11.5C21 15.5868 17.6421 18.9 13.5 18.9C11.9702 18.9 10.5518 18.441 9.36671 17.6549L4 19L5.34509 13.6333C4.48422 12.4346 4 10.9754 4 9.4C4 5.31319 7.35786 2 11.5 2C15.6421 2 19 5.31319 19 9.4" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 9H14" stroke={active ? "#FFB300" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
          <path d="M8 13H11" stroke={active ? "#FFB300" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
        </svg>
      )
    },
    { 
      id: 'friends', 
      label: t.friends, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8.5" cy="7" r="4" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2524 22.1614 16.5523C21.6184 15.8521 20.8581 15.3516 20 15.13" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
          <circle cx="17" cy="7" r="3" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
        </svg>
      )
    },
    { 
      id: 'random', 
      label: t.random, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={active ? "rgba(255, 106, 0, 0.2)" : "none"} stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" className={active ? "glow-path" : ""} stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'groups', 
      label: t.groups, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="2" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5"/>
          <rect x="14" y="3" width="7" height="7" rx="2" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5"/>
          <rect x="3" y="14" width="7" height="7" rx="2" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5"/>
          <rect x="14" y="14" width="7" height="7" rx="2" stroke={active ? "#FFB300" : "currentColor"} strokeWidth="2.5" strokeDasharray="2 2" opacity={active ? 1 : 0.5}/>
        </svg>
      )
    },
    { 
      id: 'activities', 
      label: t.activities, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 22 12 22C12 22 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke={active ? "#FFB300" : "currentColor"} strokeWidth="2.5"/>
        </svg>
      )
    },
    { 
      id: 'profile', 
      label: t.profile, 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          {active && <PremiumBadge/>}
        </svg>
      )
    },
  ];

  return (
    <div className={`min-h-screen flex ${isRtl ? 'rtl' : 'ltr'} bg-[#050505] text-slate-100`}>
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 ${isRtl ? 'right-6' : 'left-6'} my-6 w-80 glass rounded-[3rem] hidden xl:flex z-30 transition-all shadow-2xl flex-col`}>
        <div className="p-8 flex flex-col h-full">
          <div className="mb-10 p-2 flex items-center justify-between">
            <Logo size={42} />
            <button 
              onClick={onOpenPremium}
              title={(t as any).subscribeTooltip}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-xl ${
                user.isPremium ? 'premium-gradient text-white active-glow' : 'glass border-orange-500/30 text-orange-500 hover:bg-orange-500/10'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" fill="currentColor" stroke="none"/>
              </svg>
            </button>
          </div>
          
          <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scroll mb-4 no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-4 space-x-reverse px-6 py-5 rounded-[2rem] transition-all duration-300 group nav-item-btn ${
                  activeTab === item.id 
                    ? 'bg-orange-500/10 border border-orange-500/20 shadow-lg scale-[1.02] nav-item-active' 
                    : 'hover:bg-white/5 opacity-80'
                }`}
              >
                <IconWrapper active={activeTab === item.id}>
                  {item.icon(activeTab === item.id)}
                  {item.id === 'friends' && user.friendRequests && user.friendRequests.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-[#050505] active-glow animate-pulse"></span>
                  )}
                </IconWrapper>
                <span className={`font-black text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${activeTab === item.id ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-200'}`}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Premium Call to Action if not subscribed */}
          {!user.isPremium && (
            <div className="mb-6 px-2">
              <button 
                onClick={onOpenPremium}
                className="w-full p-6 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/30 group hover:border-orange-500 transition-all text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">👑</div>
                <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1">Exclusive Plan</p>
                <p className="text-xs font-black text-white">{(t as any).premiumUnlock}</p>
                <div className="mt-3 w-8 h-1 premium-gradient rounded-full"></div>
              </button>
            </div>
          )}
          
          <div className="pt-6 border-t border-white/5 space-y-4">
            <div className="p-5 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 hover-3d">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{user.level}</span>
                 <div className="flex items-center gap-1.5">
                   <span className="text-xs font-black">{user.points}</span>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB300"><circle cx="12" cy="12" r="10"/></svg>
                 </div>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full premium-gradient shadow-[0_0_10px_rgba(255,106,0,0.5)]" style={{ width: '65%' }}></div>
               </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse p-4 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
               <div className="relative">
                 <img src={user.avatar} className="w-11 h-11 rounded-2xl object-cover border-2 border-orange-500/30" alt="avatar" />
                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#050505] rounded-full"></div>
               </div>
               <div className={`overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
                 <p className="text-xs font-black truncate">{user.name}</p>
                 <p className="text-[9px] uppercase font-black text-orange-400 tracking-widest">{user.specialty}</p>
               </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isRtl ? 'xl:mr-[22rem]' : 'xl:ml-[22rem]'} min-h-screen pb-36 xl:pb-12`}>
        <header className="sticky top-0 z-20 glass px-6 py-5 flex justify-between items-center xl:hidden border-b border-orange-500/10">
            <Logo size={32} showText={true} className="scale-75 origin-right" />
            <div className="flex space-x-3">
                 <button onClick={onToggleLang} className="w-10 h-10 flex items-center justify-center rounded-xl glass font-black text-[10px] uppercase text-orange-400 border-orange-500/30"> {lang === Language.AR ? 'EN' : lang === Language.EN ? 'FR' : 'AR'} </button>
                 <button 
                  onClick={onOpenPremium}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl glass ${user.isPremium ? 'premium-gradient text-white active-glow border-none' : 'text-orange-500 border-orange-500/30'}`}
                 >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z"/></svg>
                 </button>
            </div>
        </header>

        <div className="max-w-6xl mx-auto p-4 md:p-10 relative z-10">
          {children}
        </div>

        {/* Floating Mobile Nav */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-lg xl:hidden z-40">
          <nav className="glass rounded-[3rem] flex items-center p-3 h-22 shadow-3xl overflow-x-auto no-scrollbar gap-3 px-6 justify-between">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center justify-center flex-shrink-0 w-14 h-14 rounded-[1.5rem] transition-all duration-500 group ${
                    activeTab === item.id 
                      ? 'bg-orange-600 text-white scale-110 -translate-y-2 shadow-2xl shadow-orange-600/40 active-glow' 
                      : 'text-slate-500'
                  }`}
                >
                  <div className="icon-premium">
                    {item.icon(activeTab === item.id)}
                  </div>
                </button>
              ))}
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Layout;
