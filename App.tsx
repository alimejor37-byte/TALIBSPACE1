
import React, { useState, useEffect } from 'react';
import { Language, Theme, User, CallType, FriendRequest } from './types';
import Layout from './components/Layout';
import Feed from './components/Feed';
import Library from './components/Library';
import Opportunities from './components/Opportunities';
import Profile from './components/Profile';
import RandomConnect from './components/RandomConnect';
import Announcements from './components/Announcements';
import Activities from './components/Activities';
import Messages from './components/Messages';
import Groups from './components/Groups';
import LiveEvents from './components/LiveEvents';
import AIStudyAssistant from './components/AIStudyAssistant';
import CallOverlay from './components/CallOverlay';
import Logo from './components/Logo';
import Friends from './components/Friends';
import { STRINGS } from './constants';

const INITIAL_USER: User = {
  id: 'u1',
  name: 'Amine El Fassi',
  specialty: 'Digital',
  year: 1,
  bio: 'Passionné par le développement Web et l\'IA. 🚀 Let\'s build the future of CMC together.',
  avatar: 'https://i.pravatar.cc/150?u=amine',
  skills: ['React', 'TypeScript', 'Node.js', 'UI Design'],
  points: 1250,
  level: 'Contributor',
  badges: ['Early Adopter', 'Mentor', 'Coder'],
  friends: [],
  friendRequests: [
    { id: 'req1', fromId: 'u5', fromName: 'Sara Bennani', fromAvatar: 'https://i.pravatar.cc/150?u=sara', timestamp: '10m ago' },
    { id: 'req2', fromId: 'u9', fromName: 'Anas Lahlou', fromAvatar: 'https://i.pravatar.cc/150?u=anas', timestamp: '1h ago' },
  ]
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState<Language>(Language.AR);
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [activeTab, setActiveTab] = useState('feed');
  const [isLoading, setIsLoading] = useState(true);
  const [callType, setCallType] = useState<CallType>('none');
  const [activePartner, setActivePartner] = useState<{name: string, avatar: string} | undefined>();
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleLang = () => {
    setLang(prev => {
      if (prev === Language.AR) return Language.EN;
      if (prev === Language.EN) return Language.FR;
      return Language.AR;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const handleStartCall = (type: CallType, partner?: {name: string, avatar: string}) => {
    setActivePartner(partner);
    setCallType(type);
  };

  const handleAcceptRequest = (request: FriendRequest) => {
    setUser(prev => ({
      ...prev,
      friends: [...(prev.friends || []), request.fromId],
      friendRequests: prev.friendRequests?.filter(r => r.id !== request.id),
      points: prev.points + 50 // Reward for networking
    }));
  };

  const handleDeclineRequest = (requestId: string) => {
    setUser(prev => ({
      ...prev,
      friendRequests: prev.friendRequests?.filter(r => r.id !== requestId)
    }));
  };

  const handleAddFriend = (id: string) => {
    setSentRequests(prev => [...prev, id]);
    // In a real app, this would be an API call
    console.log(`Friend request sent to ${id}!`);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] transition-colors overflow-hidden">
        <div className="relative animate-in zoom-in duration-700">
          <div className="absolute -inset-10 premium-gradient rounded-full blur-[80px] opacity-20 animate-pulse"></div>
          <Logo size={120} showText={false} className="relative z-10 animate-bounce" />
        </div>
        <div className="mt-16 flex flex-col items-center">
           <h2 className="text-4xl font-black tracking-tighter text-white mb-2">TALIBSPACE</h2>
           <p className="text-orange-500 font-black text-xs tracking-[0.5em] uppercase animate-pulse">Initializing Digital Campus...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    const t = STRINGS[lang];
    const isRtl = lang === Language.AR;
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 ${isRtl ? 'rtl' : 'ltr'} bg-[#0a0a0a]`}>
        <div className="max-w-md w-full relative group">
          <div className="absolute -inset-4 premium-gradient rounded-[4rem] blur-[60px] opacity-10 animate-pulse"></div>
          <div className="relative glass rounded-[4rem] shadow-2xl overflow-hidden border border-orange-500/10">
            <div className="p-16 text-center premium-gradient text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
              <Logo size={80} showText={false} className="mx-auto mb-8 relative z-10" />
              <h1 className="text-4xl font-black mb-3 tracking-tighter relative z-10">TALIBSPACE</h1>
              <p className="text-orange-50 font-bold opacity-80 relative z-10">{t.welcome}</p>
            </div>
            
            <div className="p-12 space-y-10 bg-black/40">
              <div className="bg-orange-500/5 border-r-4 border-orange-500 p-6 rounded-3xl animate-in fade-in slide-in-from-right-8 duration-1000">
                <p className="text-sm text-orange-200 font-black tracking-tight leading-relaxed">
                  🔒 {t.studentOnly}
                </p>
              </div>
              
              <div className="space-y-5">
                <input 
                  type="email" 
                  placeholder="Student Email (@cmc.ac.ma)" 
                  className="w-full px-6 py-5 rounded-3xl bg-white/5 border-2 border-transparent focus:border-orange-500 focus:bg-white/10 outline-none text-white font-bold transition-all placeholder:text-slate-600 shadow-inner"
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full px-6 py-5 rounded-3xl bg-white/5 border-2 border-transparent focus:border-orange-500 focus:bg-white/10 outline-none text-white font-bold transition-all placeholder:text-slate-600 shadow-inner"
                />
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full premium-gradient hover:opacity-90 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-orange-500/40 transition-all active:scale-95 text-xl mt-4 active-glow flex items-center justify-center space-x-3 space-x-reverse"
                >
                  <span>{t.login}</span>
                  <span>🚀</span>
                </button>
              </div>
              
              <div className="flex flex-col items-center space-y-6">
                <button onClick={toggleLang} className="text-orange-400 font-black text-xs uppercase tracking-[0.2em] hover:text-orange-300 transition-colors">
                   {lang === Language.AR ? 'Switch Language' : lang === Language.EN ? 'Changer de Langue' : 'تبديل اللغة'}
                </button>
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.3em] opacity-40">TalibSpace Community v4.0 Premium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      lang={lang} 
      theme={theme} 
      onToggleTheme={toggleTheme} 
      onToggleLang={toggleLang} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      user={user}
    >
      <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
        {activeTab === 'feed' && <Feed lang={lang} />}
        {activeTab === 'random' && <RandomConnect lang={lang} onStartCall={handleStartCall} />}
        {activeTab === 'friends' && (
          <Friends 
            lang={lang} 
            user={user} 
            onAccept={handleAcceptRequest} 
            onDecline={handleDeclineRequest} 
            onAddFriend={handleAddFriend}
            sentRequests={sentRequests}
          />
        )}
        {activeTab === 'resources' && <Library lang={lang} />}
        {activeTab === 'opportunities' && <Opportunities lang={lang} />}
        {activeTab === 'profile' && <Profile user={user} lang={lang} />}
        {activeTab === 'announcements' && <Announcements lang={lang} />}
        {activeTab === 'activities' && <Activities lang={lang} />}
        {activeTab === 'messages' && <Messages lang={lang} onStartCall={handleStartCall} />}
        {activeTab === 'groups' && <Groups lang={lang} onStartCall={handleStartCall} />}
        {activeTab === 'live' && <LiveEvents lang={lang} />}
        {activeTab === 'aiAssistant' && <AIStudyAssistant lang={lang} />}
      </div>

      {callType !== 'none' && (
        <CallOverlay 
          type={callType} 
          partnerName={activePartner?.name} 
          partnerAvatar={activePartner?.avatar} 
          lang={lang} 
          onEnd={() => setCallType('none')} 
        />
      )}
    </Layout>
  );
};

export default App;
