import React from 'react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300 bg-[#283044] text-[#eef0ff] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-slate-700 pointer-events-auto">
      <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
      <span className="text-[13px] font-semibold">{message}</span>
    </div>
  );
};
