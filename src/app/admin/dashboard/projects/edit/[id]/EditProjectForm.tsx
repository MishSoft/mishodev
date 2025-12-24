// src/app/admin/dashboard/projects/edit/[id]/EditProjectForm.tsx
'use client'
import React, { useState, KeyboardEvent } from 'react';
import { updateProject } from './action';
import { Save, Globe, Github, Type, Image as ImageIcon, AlignLeft, Wrench, X, Plus } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

export default function EditProjectForm({ project }: { project: any }) {
  // დაცული State-ები
  const [images, setImages] = useState<string[]>(Array.isArray(project?.images) ? project.images : []);
  const [tools, setTools] = useState<string[]>(Array.isArray(project?.tools) ? project.tools : []);
  const [toolInput, setToolInput] = useState('');

  // თუ პროექტი რაიმე მიზეზით undefined-ია
  if (!project) return null;

  const handleAddTool = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && toolInput.trim()) {
      e.preventDefault();
      if (!tools.includes(toolInput.trim())) {
        setTools([...tools, toolInput.trim()]);
      }
      setToolInput('');
    }
  };

  async function clientAction(formData: FormData) {
    // მასივების გასუფთავება და თავიდან შევსება
    formData.delete('images');
    formData.delete('tools');
    images.forEach(url => formData.append('images', url));
    tools.forEach(tool => formData.append('tools', tool));

    await updateProject(project.id, formData);
  }

  return (
    <form action={clientAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* მარცხენა სვეტი */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-[#161B26] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Type size={16} className="text-blue-500" /> პროექტის სახელი
            </label>
            <input
              name="title"
              defaultValue={project.title}
              required
              className="w-full bg-[#0B0F1A] border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Wrench size={16} className="text-blue-500" /> ტექნოლოგიები
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tools.map((t, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-bold flex items-center gap-2">
                  {t}
                  <X size={14} className="cursor-pointer hover:text-red-400" onClick={() => setTools(tools.filter((_, idx) => idx !== i))} />
                </span>
              ))}
            </div>
            <input
              value={toolInput}
              onChange={e => setToolInput(e.target.value)}
              onKeyDown={handleAddTool}
              placeholder="მაგ: React, Next.js (Enter)"
              className="w-full bg-[#0B0F1A] border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <AlignLeft size={16} className="text-blue-500" /> დეტალური აღწერა
            </label>
            <textarea
              name="long_description"
              rows={12}
              defaultValue={project.long_description}
              className="w-full bg-[#0B0F1A] border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* მარჯვენა სვეტი */}
      <div className="space-y-6">
        <div className="bg-[#161B26] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <ImageIcon size={16} className="text-blue-500" /> გალერეა
            </label>
            <div className="grid grid-cols-2 gap-3">
              {images.map((url, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 group">
                  <img src={url} className="object-cover w-full h-full" alt="" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-red-500 p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <CldUploadWidget
                uploadPreset="portfolio_uploads"
                onSuccess={(res: any) => setImages([...images, res.info.secure_url])}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="aspect-video border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-blue-500 hover:border-blue-500 transition-all"
                  >
                    <Plus size={24} />
                    <span className="text-[10px] mt-1 font-bold">ADD PHOTO</span>
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-800 pt-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase">Live URL</label>
              <input name="project_link" defaultValue={project.project_link} className="w-full bg-[#0B0F1A] border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase">GitHub URL</label>
              <input name="github_link" defaultValue={project.github_link} className="w-full bg-[#0B0F1A] border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-5 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95"
        >
          <Save size={20} /> შენახვა
        </button>
      </div>
    </form>
  );
}
