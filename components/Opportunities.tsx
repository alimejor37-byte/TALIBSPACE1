
import React from 'react';
import { Language } from '../types';
import { STRINGS } from '../constants';

interface OpportunitiesProps {
  lang: Language;
}

const MOCK_OPPS = [
  { id: 'o1', title: 'Stagiaire Développeur Web', company: 'OCP Group', type: 'Internship', location: 'Jorf Lasfar', posted: '2 days ago' },
  { id: 'o2', title: 'Technicien Industrie 4.0', company: 'Renault Group', type: 'Job', location: 'Tanger', posted: '1 week ago' },
  { id: 'o3', title: 'Atelier: Soft Skills & Career', company: 'CMC Staff', type: 'Workshop', location: 'Agadir Campus', posted: '3 days ago' },
];

const Opportunities: React.FC<OpportunitiesProps> = ({ lang }) => {
  const t = STRINGS[lang];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">{t.opportunities} 💼</h2>
          <p className="text-orange-400 mt-2 font-medium">Kickstart your career with exclusive CMC partners.</p>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">{t.internships}</span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">{t.jobs}</span>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_OPPS.map(opp => (
          <div key={opp.id} className="glass p-8 rounded-[3rem] border border-orange-500/10 flex flex-col sm:flex-row sm:items-center justify-between hover:border-orange-500/40 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-1 premium-gradient opacity-20 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-start space-x-6 space-x-reverse">
              <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-xl transition-transform group-hover:scale-110 ${
                opp.type === 'Internship' ? 'bg-orange-500/10 text-orange-400' : 
                opp.type === 'Job' ? 'bg-amber-500/10 text-amber-400' : 'bg-orange-900/30 text-orange-300'
              }`}>
                {opp.type === 'Internship' ? '🌱' : opp.type === 'Job' ? '🎯' : '🎓'}
              </div>
              <div>
                <h3 className="text-xl font-black text-white group-hover:text-orange-400 transition-colors">{opp.title}</h3>
                <p className="text-orange-500 font-bold text-sm mb-2">{opp.company}</p>
                <div className="flex items-center space-x-4 space-x-reverse text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span>📍 {opp.location}</span>
                  <span>⏰ {opp.posted}</span>
                </div>
              </div>
            </div>
            <button className="mt-6 sm:mt-0 premium-gradient text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all active-glow">
              Postuler
            </button>
          </div>
        ))}
      </div>

      <div className="relative group overflow-hidden">
        <div className="absolute -inset-1 premium-gradient rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative glass p-12 rounded-[3rem] border border-orange-500/10 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-3xl font-black mb-4">Besoin d'aide ? 🚀</h3>
            <p className="text-slate-400 font-medium leading-relaxed">Contacte le Career Center du CMC directement pour préparer ton entretien ou ton CV.</p>
          </div>
          <button className="mt-8 md:mt-0 bg-white text-orange-600 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl active-glow">
            Prendre RDV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
