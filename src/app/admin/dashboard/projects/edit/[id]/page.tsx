import React from 'react';
import sql from '@/lib/db';
import { updateProject } from './action';
import { Save, ArrowLeft, Globe, Github, Type, Image as ImageIcon, AlignLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  // 1. "გახსენი" params (Next.js 15-ის მოთხოვნა)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. წამოიღე პროექტის არსებული მონაცემები ბაზიდან
  const projects = await sql`SELECT * FROM projects WHERE id = ${id}`;
  const project = projects[0];

  // თუ პროექტი ვერ მოიძებნა
  if (!project) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl text-white font-bold">პროექტი ვერ მოიძებნა</h2>
        <Link href="/admin/dashboard/projects" className="text-blue-500 hover:underline mt-4 block">
          უკან დაბრუნება
        </Link>
      </div>
    );
  }

  // 3. ფორმის გაგზავნის ჰენდლერი (Server Action Wrapper)
  async function handleSubmit(formData: FormData) {
    'use server'
    await updateProject(id, formData);
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen">
      {/* Header ნაწილი */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/projects"
            className="p-2.5 bg-slate-800 text-gray-400 hover:text-white rounded-xl transition-all border border-slate-700"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">რედაქტირება</h1>
            <p className="text-gray-400 text-sm">პროექტის ID: #{id}</p>
          </div>
        </div>
      </div>

      {/* ფორმა */}
      <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* მარცხენა, მთავარი სვეტი */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#161B26] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">

            {/* სათაური */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Type size={16} /> პროექტის დასახელება
              </label>
              <input
                name="title"
                type="text"
                defaultValue={project.title}
                required
                className="w-full bg-[#0B0F1A] border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="მაგ: My Awesome App"
              />
            </div>

            {/* აღწერა */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <AlignLeft size={16} /> პროექტის აღწერა
              </label>
              <textarea
                name="description"
                rows={6}
                defaultValue={project.description}
                className="w-full bg-[#0B0F1A] border border-slate-700 rounded-xl p-3.5 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                placeholder="დაწერეთ დეტალურად პროექტის შესახებ..."
              />
            </div>
          </div>
        </div>

        {/* მარჯვენა, დამხმარე სვეტი */}
        <div className="space-y-6">
          <div className="bg-[#161B26] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">

            {/* სურათის URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <ImageIcon size={16} /> სურათის ლინკი
              </label>
              <input
                name="image_url"
                type="text"
                defaultValue={project.image_url}
                className="w-full bg-[#0B0F1A] border border-slate-700 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 transition-all"
              />
              {project.image_url && (
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-700 aspect-video relative">
                  <img src={project.image_url} alt="Preview" className="object-cover w-full h-full opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-widest">Preview Mode</div>
                </div>
              )}
            </div>

            {/* ლინკები */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Globe size={16} /> Live Demo
                </label>
                <input
                  name="project_link"
                  type="url"
                  defaultValue={project.project_link}
                  className="w-full bg-[#0B0F1A] border border-slate-700 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Github size={16} /> GitHub
                </label>
                <input
                  name="github_link"
                  type="url"
                  defaultValue={project.github_link}
                  className="w-full bg-[#0B0F1A] border border-slate-700 rounded-xl p-3 text-white text-sm outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* შენახვის ღილაკი */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/10 active:scale-[0.98]"
          >
            <Save size={20} /> ცვლილებების შენახვა
          </button>
        </div>
      </form>
    </div>
  );
}
