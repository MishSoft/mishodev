'use client'

import { Trash2 } from 'lucide-react';
import { deleteProject } from './action';

export default function DeleteButton({ id }: { id: number }) {
  return (
    <button
      type="button"
      className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all shadow-sm"
      onClick={async () => {
        if (window.confirm("ნამდვილად გსურთ ამ პროექტის წაშლა?")) {
          await deleteProject(id);
        }
      }}
    >
      <Trash2 size={20} />
    </button>
  );
}
