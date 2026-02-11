
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">{t.opportunities}</h2>
        <div className="flex space-x-2 space-x-reverse">
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">{t.internships}</span>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{t.jobs}</span>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_OPPS.map(opp => (
          <div key={opp.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-lg transition-all">
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm ${
                opp.type === 'Internship' ? 'bg-green-50 text-green-600' : 
                opp.type === 'Job' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
              }`}>
                {opp.type === 'Internship' ? '🌱' : opp.type === 'Job' ? '💼' : '🎓'}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{opp.title}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{opp.company}</p>
                <div className="flex items-center space-x-3 space-x-reverse text-xs text-gray-500 mt-1">
                  <span>📍 {opp.location}</span>
                  <span>⏰ {opp.posted}</span>
                </div>
              </div>
            </div>
            <button className="mt-4 sm:mt-0 bg-slate-900 dark:bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 p-8 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Need career advice?</h3>
          <p className="text-indigo-100 mb-6 max-w-sm">Contact the CMC Career Center directly through this platform to schedule a mock interview.</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
            Book Appointment
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 right-12 w-16 h-16 bg-indigo-400 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default Opportunities;
