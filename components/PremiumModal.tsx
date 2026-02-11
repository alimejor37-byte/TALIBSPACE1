
import React, { useState } from 'react';
import { Language } from '../types';
import { STRINGS } from '../constants';

interface PremiumModalProps {
  lang: Language;
  onClose: () => void;
  onSubscribe: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ lang, onClose, onSubscribe }) => {
  const t = STRINGS[lang];
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');

  const handleSubscribe = () => {
    setLoading(true);
    // Simulate payment process
    setTimeout(() => {
      setLoading(false);
      onSubscribe();
    }, 2500);
  };

  const plans = [
    { id: 'weekly', name: (t as any).weekly, price: '49 DH', period: '/week' },
    { id: 'monthly', name: (t as any).monthly, price: '149 DH', period: '/month', popular: true },
    { id: 'yearly', name: (t as any).yearly, price: '999 DH', period: '/year' },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-2xl glass rounded-[4.5rem] border border-orange-500/20 overflow-hidden shadow-[0_0_150px_rgba(255,106,0,0.15)] bg-[#0a0a0a] relative">
        <div className="absolute top-0 left-0 w-full h-2 premium-gradient shadow-2xl"></div>
        
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center animate-in zoom-in duration-500">
             <div className="w-24 h-24 border-8 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-8"></div>
             <h2 className="text-3xl font-black text-white">Processing Subscription...</h2>
             <p className="text-orange-400 font-bold uppercase tracking-widest mt-2 animate-pulse">Connecting to Secure Gateway</p>
          </div>
        ) : (
          <div className="p-12 md:p-16">
            <div className="flex justify-between items-start mb-12">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-xl shadow-xl active-glow">👑</span>
                     <h2 className="text-4xl font-black text-white tracking-tighter">TalibSpace Premium</h2>
                  </div>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">Level up your campus experience with exclusive tools and boosts.</p>
               </div>
               <button onClick={onClose} className="w-12 h-12 rounded-full glass hover:bg-white/10 transition-all flex items-center justify-center text-xl">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
               {/* Features List */}
               <div className="space-y-6">
                  {(t as any).premiumFeatures.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">✓</div>
                       <p className="text-slate-300 font-bold text-sm">{f}</p>
                    </div>
                  ))}
               </div>

               {/* Plans Selection */}
               <div className="space-y-4">
                  {plans.map(plan => (
                    <button 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full p-5 rounded-[2rem] border transition-all relative overflow-hidden flex items-center justify-between ${
                        selectedPlan === plan.id 
                          ? 'bg-orange-500/10 border-orange-500 active-glow' 
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {plan.popular && <span className="absolute top-0 right-0 bg-orange-500 text-white text-[8px] font-black uppercase px-3 py-1 rounded-bl-xl">Best Value</span>}
                      <div className="text-left">
                         <p className="text-xs font-black text-orange-400 uppercase tracking-widest">{plan.name}</p>
                         <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-2xl font-black text-white">{plan.price}</span>
                            <span className="text-[10px] text-slate-500 font-bold">{plan.period}</span>
                         </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${selectedPlan === plan.id ? 'border-orange-500 bg-orange-500 shadow-lg' : 'border-white/10'}`}>
                         {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                    </button>
                  ))}
               </div>
            </div>

            <div className="space-y-6">
               <button 
                onClick={handleSubscribe}
                className="w-full py-6 premium-gradient text-white rounded-[2.5rem] font-black text-lg shadow-3xl shadow-orange-500/40 active:scale-[0.98] transition-all active-glow flex items-center justify-center gap-4"
               >
                 <span>Subscribe Now</span>
                 <span className="text-2xl">⚡</span>
               </button>
               <p className="text-center text-[10px] text-slate-600 font-black uppercase tracking-widest">Secure checkout powered by TalibPay</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumModal;
