import { Calendar, Clock, Copy, ExternalLink, Edit3, Trash2, Link2 } from 'lucide-react';

export interface Meet {
  id: string;
  title: string;
  group: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  link: string;
  status: 'Live' | 'Upcoming';
}

interface MeetCardProps {
  meet: Meet;
  onCopy: (link: string) => void;
  onEdit: (meet: Meet) => void;
  onDelete: (id: string) => void;
}

export default function MeetCard({ meet, onCopy, onEdit, onDelete }: MeetCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row justify-between gap-6 hover:border-slate-300 transition-all">
      <div className="space-y-3 flex-1">
        {/* Status va Guruh belligi */}
        <div className="flex items-center gap-3">
          {meet.status === 'Live' ? (
            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">Jonli 🔴</span>
          ) : (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Kutilmoqda</span>
          )}
          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">{meet.group}</span>
          <span className="text-xs text-slate-400 font-medium">• {meet.platform}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900">{meet.title}</h3>

        {/* Link bloki */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl max-w-xl">
          <Link2 className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="text-xs font-mono text-slate-700 truncate flex-1">{meet.link}</span>
          <button
            onClick={() => onCopy(meet.link)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            <Copy className="w-3 h-3" /> Nusxalash
          </button>
        </div>

        {/* Vaqt va Sana */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{meet.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{meet.time} ({meet.duration} min)</span>
        </div>
      </div>

      {/* Amallar tugmalari */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={meet.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Kirish
        </a>
        <button onClick={() => onEdit(meet)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          <Edit3 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(meet.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}