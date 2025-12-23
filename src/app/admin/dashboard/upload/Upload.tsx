'use client'

import React, { useState } from 'react';
import { createProject } from './actions';
import { AlertCircle, Loader2, ImageIcon } from 'lucide-react';

export default function Upload() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null); // დაამატე ეს

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await createProject(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // წარმატების შემთხვევაში redirect-ს თავად action აკეთებს
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#0B0F1A] min-h-screen">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <ImageIcon className="text-blue-500" /> Upload Project
        </h1>
        <p className="text-gray-400 mt-2">შეავსე მონაცემები პროექტის დასამატებლად</p>
      </div>

      <form action={handleSubmit} className="space-y-6 bg-[#161B26] p-8 rounded-xl border border-slate-800 shadow-xl">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title და Description იგივე რჩება */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
            <input name="title" type="text" required className="w-full p-3 bg-[#0B0F1A] border border-slate-700 text-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all" />
          </div>

          {/* აქ ჩასვი ახალი Image URL ინპუტი */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Project Image URL</label>
            <input
              name="image_url"
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              onChange={(e) => setImageUrlPreview(e.target.value)}
              className="w-full p-3 bg-[#0B0F1A] border border-slate-700 text-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all"
            />
            {imageUrlPreview && (
              <div className="mt-4 rounded-lg overflow-hidden border border-slate-700 h-40">
                <img src={imageUrlPreview} className="w-full h-full object-cover" alt="Preview" />
              </div>
            )}
          </div>

          {/* დანარჩენი ინპუტები (Demo, GitHub, Tech) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Live Demo Link</label>
            <input name="project_link" type="url" className="w-full p-3 bg-[#0B0F1A] border border-slate-700 text-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Repository</label>
            <input name="github_link" type="url" className="w-full p-3 bg-[#0B0F1A] border border-slate-700 text-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all" />
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "პროექტის გამოქვეყნება"}
        </button>
      </form>
    </div>
  );
}
