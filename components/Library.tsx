
import React, { useState } from 'react';
import { Language, Specialty } from '../types';
import { STRINGS, MOCK_RESOURCES } from '../constants';

interface LibraryProps {
  lang: Language;
}

const Library: React.FC<LibraryProps> = ({ lang }) => {
  const t = STRINGS[lang];
  const [filter, setFilter] = useState<Specialty | 'All'>('All');

  const filteredResources = filter === 'All' 
    ? MOCK_RESOURCES 
    : MOCK_RESOURCES.filter(r => r.specialty === filter);

  const specialties: Specialty[] = ['Digital', 'Industrie', 'Tourisme', 'Santé', 'BTP', 'Agriculture'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">{t.resources}</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none">
          + Upload Resource
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            filter === 'All' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          الكل
        </button>
        {specialties.map(spec => (
          <button
            key={spec}
            onClick={() => setFilter(spec)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === spec ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredResources.map(res => (
          <div key={res.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-md">
                  {res.fileType}
                </span>
                <span className="text-[10px] text-gray-400">{res.specialty}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">{res.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{res.description}</p>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-[10px]">👤</div>
                <span className="text-xs text-gray-500">{res.sharedBy}</span>
              </div>
              <button className="bg-gray-50 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:text-indigo-400 p-2 rounded-lg transition-all">
                📥
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
