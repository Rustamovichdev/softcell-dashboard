import React from 'react';
import { X, Wand2 } from 'lucide-react';

export default function MeetModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  onChange, 
  groups, 
  isEditing, 
  onAutoGenerateLink 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-bold">{isEditing ? "Uchrashuvni Tahrirlash" : "Yangi Uchrashuv Yaratish"}</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Mavzu *</label>
            <input 
              type="text" 
              name="title" 
              required 
              value={formData.title} 
              onChange={onChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              placeholder="Masalan: React Hooks darsi"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Guruh</label>
              <select name="group" value={formData.group} onChange={onChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none">
                {groups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Platforma</label>
              <select name="platform" value={formData.platform} onChange={onChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none">
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Softcell Live">Softcell Live</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-600">Havola (Link) *</label>
              <button 
                type="button" 
                onClick={onAutoGenerateLink}
                className="text-xs text-indigo-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Wand2 className="w-3 h-3" /> Avto-yaratish
              </button>
            </div>
            <input 
              type="url" 
              name="link" 
              required 
              value={formData.link} 
              onChange={onChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-mono focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Sana</label>
              <input type="date" name="date" value={formData.date} onChange={onChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Vaqt</label>
              <input type="time" name="time" value={formData.time} onChange={onChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none" />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50">Bekor qilish</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-sm">Saqlash</button>
          </div>
        </form>
      </div>
    </div>
  );
}