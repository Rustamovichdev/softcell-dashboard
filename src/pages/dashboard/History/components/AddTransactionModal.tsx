import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface TransactionFormData {
  sourceTitle: string;
  category: string;
  clientOrGroup: string;
  amount: string;
  date: string;
  time: string;
  method: string;
  description: string;
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TransactionFormData) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    sourceTitle: '',
    category: 'Project Sale',
    clientOrGroup: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    method: 'Click',
    description: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.sourceTitle || !formData.amount) {
      return alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
    }
    onSave(formData);
    setFormData({
      sourceTitle: '',
      category: 'Project Sale',
      clientOrGroup: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      method: 'Click',
      description: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-bold text-slate-900">Yangi Tranzaksiya Qo'shish</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Manba / Qayerdan Keldi? *</label>
            <input 
              type="text" 
              name="sourceTitle" 
              required 
              value={formData.sourceTitle} 
              onChange={handleInputChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Masalan: CRM Loyihasi sotildi"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Turkum</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm">
                <option value="Project Sale">Proekt Sotuvi</option>
                <option value="Group Fee">Guruh To'lovi</option>
                <option value="Consulting">Konsultatsiya</option>
                <option value="Other">Boshqa</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">To'lov Usuli</label>
              <select name="method" value={formData.method} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm">
                <option value="Click">Click</option>
                <option value="Payme">Payme</option>
                <option value="Bank Transfer">Bank O'tkazmasi</option>
                <option value="Cash">Naqd</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Mijoz / Guruh Nomi</label>
              <input 
                type="text" 
                name="clientOrGroup" 
                value={formData.clientOrGroup} 
                onChange={handleInputChange} 
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm" 
                placeholder="Masalan: Softcell LLC"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Summa (so'mda) *</label>
              <input 
                type="number" 
                name="amount" 
                required 
                value={formData.amount} 
                onChange={handleInputChange} 
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-bold text-emerald-600" 
                placeholder="1000000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Sana</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Vaqt</label>
              <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Izoh (ixtiyoriy)</label>
            <textarea 
              name="description" 
              rows={2} 
              value={formData.description} 
              onChange={handleInputChange} 
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm"
              placeholder="Loyiha yoki to'lov haqida qo'shimcha ma'lumot..."
            />
          </div>

          <div className="flex justify-end gap-2 border-t pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg text-sm font-medium">Bekor qilish</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium">Saqlash</button>
          </div>
        </form>
      </div>
    </div>
  );
};