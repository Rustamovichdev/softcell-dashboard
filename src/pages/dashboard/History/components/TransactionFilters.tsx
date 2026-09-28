import React from 'react';
import { Search } from 'lucide-react';

interface TransactionFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedMethod,
  setSelectedMethod
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Sarlavha yoki mijoz nomi..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg text-sm py-2 px-3 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">Barcha Turkumlar</option>
          <option value="Project Sale">Proekt Sotuvi</option>
          <option value="Group Fee">Guruh To'lovi</option>
          <option value="Consulting">Konsultatsiya</option>
        </select>

        <select 
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg text-sm py-2 px-3 text-slate-700 font-medium focus:outline-none"
        >
          <option value="All">Barcha To'lov Turlari</option>
          <option value="Click">Click</option>
          <option value="Payme">Payme</option>
          <option value="Bank Transfer">Bank O'tkazmasi</option>
          <option value="Cash">Naqd</option>
        </select>
      </div>
    </div>
  );
};