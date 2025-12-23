import React from 'react'
import { IoMdNotifications } from "react-icons/io";
import sql from '@/lib/db';
import Link from 'next/link';

export default async function Notifications() {
  // 1. დავთვალოთ რამდენი წაუკითხავი მესიჯია
  const data = await sql`
    SELECT COUNT(*) as count
    FROM messages
    WHERE is_read = false
  `;

  const unreadCount = data[0].count;

  return (
    <Link
      href="/admin/dashboard/message"
      className='relative cursor-pointer text-gray-400 hover:text-white px-2.5 py-2.5 rounded-xl flex items-center justify-center bg-slate-800/50 border border-slate-700 transition-all hover:border-slate-500'
    >
      {/* 2. წითელი წერტილი გამოჩნდება მხოლოდ მაშინ, თუ მესიჯი არსებობს */}
      {unreadCount > 0 && (
        <span className='absolute -top-1 -right-1 flex h-4 w-4'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center text-[10px] text-white font-bold'>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </span>
      )}

      <IoMdNotifications size={22} />
    </Link>
  )
}
