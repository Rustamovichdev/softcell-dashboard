import React from 'react';
import { Search, List, Calendar } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGroupFilter: string;
  setSelectedGroupFilter: (group: string) => void;
  groups: string[];
  viewMode: 'list' | 'calendar';
  setViewMode: (mode: 'list' | 'calendar') => void;
}

export default function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  selectedGroupFilter, 
  setSelectedGroupFilter, 
  groups, 
  viewMode, 
  setViewMode 
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4 flex-1 min-w-[280px]">
        {/* Qidiruv kiritish */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Ssilka yoki uchrashuv nomi..." 
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Guruhlar bo'yicha filter */}
        <select 
          value={selectedGroupFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedGroupFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg text-sm py-2 px-3 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">Barcha guruhlar</option>
          {groups.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {/* Ko'rinish rejimini o'zgartirish */}
      <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <List className="w-4 h-4" /> Ro'yxat
        </button>
        <button
          onClick={() => setViewMode('calendar')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            viewMode === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" /> Kalendar
        </button>
      </div>
    </div>
  );
}