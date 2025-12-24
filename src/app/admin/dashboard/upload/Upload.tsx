'use client'
import React, { useState, KeyboardEvent } from 'react';
import { createProject } from './actions';
import { AlertCircle, Loader2, ImageIcon, Plus, X, Wrench, Globe, Github } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

export default function Upload() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Tools-ის ლოგიკა
  const [tools, setTools] = useState<string[]>([]);
  const [toolInput, setToolInput] = useState('');

  const handleAddTool = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && toolInput.trim()) {
      e.preventDefault(); // რომ ფორმა არ დაასუბმიტოს Enter-ზე
      if (!tools.includes(toolInput.trim())) {
        setTools([...tools, toolInput.trim()]);
      }
      setToolInput('');
    }
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    // მასივების დამატება formData-ში
    if (images.length === 0) {
      setError("გთხოვთ ატვირთოთ მინიმუმ ერთი სურათი.");
      setLoading(false);
      return;
    }

    images.forEach(url => formData.append('images', url));
    tools.forEach(tool => formData.append('tools', tool));

    const result = await createProject(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // წარმატების შემთხვევაში 'actions.ts' თავად გააკეთებს redirect-ს
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#0B0F1A] min-h-screen text-white">
      <div className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ImageIcon className="text-blue-500" /> Upload New Project
        </h1>
        <p className="text-gray-400 mt-2">დაამატე ახალი სტარტაპი ან პროექტი შენს პორტფოლიოში</p>
      </div>

      <form action={handleSubmit} className="space-y-6 bg-[#161B26] p-8 rounded-xl border border-slate-800 shadow-xl">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 font-semibold text-slate-300">Project Name</label>
            <input
              name="title"
              type="text"
              required
              placeholder="მაგ: EchoRecall AI"
              className="w-full p-3 bg-[#0B0F1A] border border-slate-700 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-200"
            />
          </div>

          {/* Tools & Tech Section */}
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2 font-semibold text-slate-300">
              <Wrench size={16} className="text-blue-500" /> Tools & Technologies
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tools.map((tool, index) => (
                <span key={index} className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium transition-all hover:bg-blue-500/20">
                  {tool}
                  <button type="button" onClick={() => removeTool(index)} className="hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              onKeyDown={handleAddTool}
              placeholder="ჩაწერე ტექნოლოგია და დააჭირე Enter-ს (მაგ: Next.js, OpenAI)"
              className="w-full p-3 bg-[#0B0F1A] border border-slate-700 rounded-lg outline-none focus:border-blue-500 transition-all text-gray-200"
            />
          </div>

          {/* Image Gallery */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 font-semibold text-slate-300">Project Gallery (Upload multiple)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 font-semibold text-slate-300">
              {images.map((url, index) => (
                <div key={index} className="relative h-32 rounded-lg overflow-hidden border border-slate-700 group">
                  <img src={url} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              <CldUploadWidget
                uploadPreset="portfolio_uploads" // ჩაწერე აქ შენი preset-ის სახელი
                onSuccess={(result: any) => {
                  if (result.event === 'success') {
                    setImages((prev) => [...prev, result.info.secure_url]);
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="h-32 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-500/5 transition-all text-gray-500 hover:text-blue-500"
                  >
                    <Plus size={24} />
                    <span className="text-xs mt-2 font-medium">Add Image</span>
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          {/* Long Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Detailed Case Study</label>
            <textarea
              name="long_description"
              rows={6}
              placeholder="აღწერე რა პრობლემას ჭრის პროექტი, შენი როლი და ტექნიკური გამოწვევები..."
              className="w-full p-4 bg-[#0B0F1A] border border-slate-700 rounded-lg outline-none focus:border-blue-500 resize-none text-gray-200"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Globe className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input
                name="project_link"
                placeholder="Live Demo URL"
                className="w-full p-3 pl-10 bg-[#0B0F1A] border border-slate-700 rounded-lg outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="relative">
              <Github className="absolute left-3 top-3.5 text-gray-500" size={18} />
              <input
                name="github_link"
                placeholder="GitHub Repo URL"
                className="w-full p-3 pl-10 bg-[#0B0F1A] border border-slate-700 rounded-lg outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Saving to Database...
            </>
          ) : (
            "Publish Project"
          )}
        </button>
      </form>
    </div>
  );
}
