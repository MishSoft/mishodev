'use client' // აუცილებელია, რომ error state ვმართოთ

import React, { useState } from 'react';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { loginAdmin } from './action';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    try {
      const result = await loginAdmin(formData);

      if (result?.error) {
        setError(result.error);
      }
    } catch (e: any) {
      // redirect() ისვრის NEXT_REDIRECT exception-ს — ეს ნორმალურია
      // Next.js-ის redirect-ი ამ გზით მუშაობს, ამიტომ ვერ ვიჭერთ
      if (e?.digest?.startsWith('NEXT_REDIRECT')) {
        return; // redirect მიმდინარეობს, loading-ის reset არ სჭირდება
      }
      setError('მოხდა შეცდომა. სცადეთ თავიდან.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#0B0F1A] p-6'>
      <div className="absolute w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -top-10 -left-10"></div>
      <div className="absolute w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -bottom-10 -right-10"></div>

      <div className='w-full max-w-md z-10'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-white tracking-tight'>Welcome Back</h1>
          <p className='text-gray-400 mt-2 text-sm'>ავტორიზაცია ადმინ პანელში შესასვლელად</p>
        </div>

        {/* Action-ში გადავცემთ ჩვენს ფუნქციას */}
        <form action={handleSubmit} className='flex flex-col gap-6 bg-[#161B26] border border-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur-sm'>

          {/* შეცდომის შეტყობინება */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm flex items-center gap-2 animate-shake">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1'>Email Address</label>
            <div className='relative flex items-center'>
              <Mail className='absolute left-3 text-gray-500' size={18} />
              <input
                name="email" // <--- მნიშვნელოვანია!
                className='p-3 pl-10 w-full bg-[#0B0F1A] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600'
                type="email"
                placeholder='admin@portfolio.com'
                required
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1'>Password</label>
            <div className='relative flex items-center'>
              <Lock className='absolute left-3 text-gray-500' size={18} />
              <input
                name="password" // <--- მნიშვნელოვანია!
                className='p-3 pl-10 w-full bg-[#0B0F1A] border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600'
                type="password"
                placeholder='••••••••'
                required
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className={`py-3.5 w-full bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold transition-all transform active:scale-[0.98] shadow-lg shadow-blue-900/20 mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Checking...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

