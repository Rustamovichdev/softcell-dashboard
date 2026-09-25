import { Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
      <Sparkles className="w-5 h-5 text-indigo-400" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}