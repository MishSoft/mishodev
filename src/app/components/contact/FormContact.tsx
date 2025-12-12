import React from 'react'

export default function FormContact() {
  return (
    <form className="w-full md:w-200 bg-gray-900/80 p-8 rounded-xl shadow-lg shadow-black/30 flex flex-col gap-6">
      <div className="flex flex-col">
        <label className="mb-2 text-gray-300 font-medium">Name</label>
        <input
          type="text"
          placeholder="Full name"
          className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-300 font-medium">Email</label>
        <input
          type="email"
          placeholder="name@example.com"
          className="px-4 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-300 font-medium">Message</label>
        <textarea
          placeholder="Tell me about your project..."
          className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition h-32"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-md shadow-pink-500/30"
      >
        Send Message
      </button>

    </form>
  )
}

/*
  


*/
