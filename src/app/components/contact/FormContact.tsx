'use client'
import React, { useRef, useState } from 'react'
import { sendContactMessage } from '@/lib/action/contact'
import { Loader2 } from 'lucide-react'

export default function FormContact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await sendContactMessage(formData);
    setLoading(false);

    if (result.success) {
      alert(result.success); // აქ შეგიძლია უფრო ლამაზი Toast გამოიყენო
      formRef.current?.reset();
    } else {
      alert(result.error);
    }
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="w-full md:w-[500px] bg-gray-900/20 backdrop-blur-xs p-8 rounded-xl shadow-lg shadow-black/30 flex flex-col gap-6 border border-white/5"
    >
      <div className="flex flex-col">
        <label className="mb-2 text-gray-300 font-medium">Name</label>
        <input
          name="name" // აუცილებელია Action-ისთვის
          required
          type="text"
          placeholder="Full name"
          className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-300 font-medium">Email</label>
        <input
          name="email" // აუცილებელია Action-ისთვის
          required
          type="email"
          placeholder="name@example.com"
          className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-300 font-medium">Message</label>
        <textarea
          name="message" // აუცილებელია Action-ისთვის
          required
          placeholder="Tell me about your project..."
          className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition h-32"
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all shadow-md shadow-blue-500/30 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  )
}
