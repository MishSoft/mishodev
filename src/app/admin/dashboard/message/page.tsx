import React from 'react';
import sql from '@/lib/db';
import { deleteMessage } from './action';
import { Mail, Trash2, Clock, AtSign, Inbox } from 'lucide-react';

// ეს ხაზი აიძულებს Next.js-ს, რომ ყოველ შესვლაზე თავიდან ჩატვირთოს მონაცემები
export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  // 1. მესიჯების "წაკითხულად" მონიშვნა
  await sql`
    UPDATE messages
    SET is_read = true
    WHERE is_read = false
  `;

  // 2. მონაცემების წამოღება
  const messages = await sql`SELECT * FROM messages ORDER BY created_at DESC`;

  return (
    <div className="p-6">
      <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Inbox className="text-blue-500" /> შეტყობინებები
          </h1>
          <p className="text-gray-400 text-sm mt-1">თქვენს საიტზე დატოვებული წერილები</p>
        </div>
        <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">
          სულ: {messages.length}
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-[#161B26] border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all shadow-sm"
          >
            <div className="p-5 flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  {msg.sender_name ? msg.sender_name[0].toUpperCase() : '?'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">{msg.sender_name}</h3>
                    <span className="text-[10px] text-gray-500 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded">
                      <Clock size={10} /> {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-blue-400 text-sm flex items-center gap-1.5 mt-0.5">
                    <AtSign size={14} /> {msg.sender_email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <a href={`mailto:${msg.sender_email}`} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-medium rounded-lg transition-colors">
                  პასუხი
                </a>
                <form action={deleteMessage.bind(null, msg.id)}>
                  <button type="submit" className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
            <div className="px-5 pb-5 ml-1 md:ml-16">
              <div className="bg-[#0B0F1A] p-4 rounded-lg border border-slate-800 text-gray-300 text-sm leading-relaxed">
                {msg.message}
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-20 bg-[#161B26] rounded-xl border-2 border-dashed border-slate-800">
            <Mail className="mx-auto text-slate-700 mb-2" size={40} />
            <p className="text-gray-500">Inbox ცარიელია</p>
          </div>
        )}
      </div>
    </div>
  );
}
