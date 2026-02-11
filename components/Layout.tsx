
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

const IconWrapper: React.FC<{ children: React.ReactNode; active: boolean; color: string }> = ({ children, active, color }) => (
  <div className={`relative flex items-center justify-center transition-all duration-300 icon-premium ${active ? 'scale-110 active-glow' : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'}`}>
    {children}
  </div>
);

const Layout: React.FC<LayoutProps> = ({ 
  children, lang, theme, onToggleTheme, onToggleLang, activeTab, setActiveTab, user 
}) => {
  const t = STRINGS[lang];
  const isRtl = lang === Language.AR;

  const navItems = [
    { 
      id: 'feed', 
      label: t.feed, 
      color: 'from-orange-400 to-orange-600',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 4L21 9.5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9.5Z" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 21V12H15V21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'announcements', 
      label: t.announcements, 
      color: 'from-red-400 to-red-600',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke={active ? "#FF4B4B" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" stroke={active ? "#FF4B4B" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15.54 8.46C16.4771 9.39764 17.0039 10.669 17.0039 11.995C17.0039 13.321 16.4771 14.5924 15.54 15.53" stroke={active ? "#FF4B4B" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'messages', 
      label: t.messages, 
      color: 'from-amber-400 to-amber-600',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={active ? "#FFB300" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8" cy="10" r="1" fill={active ? "#FFB300" : "currentColor"}/>
          <circle cx="12" cy="10" r="1" fill={active ? "#FFB300" : "currentColor"}/>
          <circle cx="16" cy="10" r="1" fill={active ? "#FFB300" : "currentColor"}/>
        </svg>
      )
    },
    { 
      id: 'friends', 
      label: t.friends, 
      color: 'from-orange-500 to-orange-700',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2524 22.1614 16.5523C21.6184 15.8521 20.8581 15.3516 20 15.13" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'random', 
      label: t.random, 
      color: 'from-orange-300 to-orange-500',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={active ? "#FFB300" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'groups', 
      label: t.groups, 
      color: 'from-orange-500 to-orange-800',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="7" r="4" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5.5 21C5.5 17.134 8.41015 14 12 14C15.5899 14 18.5 17.134 18.5 21" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="19" cy="11" r="3" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
          <circle cx="5" cy="11" r="3" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
      )
    },
    { 
      id: 'activities', 
      label: t.activities, 
      color: 'from-yellow-400 to-yellow-600',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22H22L12 2Z" stroke={active ? "#FFD600" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="14" r="3" stroke={active ? "#FFD600" : "currentColor"} strokeWidth="1.5"/>
        </svg>
      )
    },
    { 
      id: 'resources', 
      label: t.resources, 
      color: 'from-orange-200 to-orange-400',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.4696 11.7893 19.9609 11.4142 19.5858C11.0391 19.2107 10.5304 19 10 19H2V3Z" stroke={active ? "#FFE0B2" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.4696 12.2107 19.9609 12.5858 19.5858C12.9609 19.2107 13.4696 19 14 19H22V3Z" stroke={active ? "#FFE0B2" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'aiAssistant', 
      label: t.aiAssistant, 
      color: 'from-orange-600 to-orange-900',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={active ? "#E65100" : "currentColor"} strokeWidth="2"/>
          <path d="M12 8V16M8 12H16" stroke={active ? "#E65100" : "currentColor"} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      id: 'live', 
      label: t.live, 
      color: 'from-orange-400 to-orange-700',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 7L16 12L23 17V7Z" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H15C16.1046 19 17 18.1046 17 17V7C17 5.89543 16.1046 5 15 5Z" stroke={active ? "#FF6A00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'opportunities', 
      label: t.opportunities, 
      color: 'from-amber-600 to-amber-900',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="7" width="20" height="14" rx="2" stroke={active ? "#FF8F00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke={active ? "#FF8F00" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'profile', 
      label: t.profile, 
      color: 'from-orange-100 to-orange-300',
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={active ? "#FFCCBC" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke={active ? "#FFCCBC" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  ];

  return (
    <div className={`min-h-screen flex ${isRtl ? 'rtl' : 'ltr'} bg-[#0a0a0a] text-slate-100`}>
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 ${isRtl ? 'right-6' : 'left-6'} my-6 w-80 glass rounded-[3rem] hidden xl:flex z-30 transition-all shadow-2xl flex-col`}>
        <div className="p-8 flex flex-col h-full">
          <div className="mb-10 p-2">
            <Logo size={42} />
          </div>
          
          <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scroll mb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-4 space-x-reverse px-5 py-4 rounded-[1.5rem] transition-all duration-300 group nav-item-btn ${
                  activeTab === item.id 
                    ? 'bg-orange-500/10 border border-orange-500/20 shadow-lg scale-[1.02] nav-item-active' 
                    : 'hover:bg-white/5 opacity-80'
                }`}
              >
                <IconWrapper active={activeTab === item.id} color={item.color}>
                  {item.icon(activeTab === item.id)}
                  {item.id === 'friends' && user.friendRequests && user.friendRequests.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-[#0a0a0a] active-glow animate-pulse"></span>
                  )}
                </IconWrapper>
                <span className={`font-black text-xs uppercase tracking-widest transition-colors duration-300 ${activeTab === item.id ? 'text-orange-400' : 'text-slate-400 group-hover:text-slate-200'}`}>{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="pt-6 border-t border-white/5 space-y-4">
            {/* Gamification Indicator */}
            <div className="p-4 rounded-3xl bg-orange-500/5 border border-orange-500/10">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{user.level}</span>
                 <span className="text-xs font-black">{user.points} {t.points}</span>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full premium-gradient" style={{ width: '65%' }}></div>
               </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse p-3 rounded-3xl bg-white/5 border border-white/5">
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
          <nav className="glass rounded-[3rem] flex items-center p-3 h-22 shadow-2xl overflow-x-auto no-scrollbar gap-2 px-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center justify-center flex-shrink-0 w-14 h-14 rounded-2xl transition-all duration-500 group ${
                    activeTab === item.id 
                      ? 'bg-orange-600 text-white scale-110 -translate-y-2 shadow-2xl shadow-orange-600/40 active-glow' 
                      : 'text-slate-500'
                  }`}
                >
                  <div className="icon-premium">
                    {item.icon(activeTab === item.id)}
                    {item.id === 'friends' && user.friendRequests && user.friendRequests.length > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full active-glow animate-pulse"></span>
                    )}
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
