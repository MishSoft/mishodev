// src/app/admin/dashboard/projects/edit/[id]/page.tsx
import React from 'react';
import sql from '@/lib/db';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import EditProjectForm from './EditProjectForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  // მონაცემების წამოღება
  const projects = await sql`SELECT * FROM projects WHERE id = ${id}`;
  const project = projects[0];

  if (!project) {
    return (
      <div className="p-20 text-center text-white">
        <h2 className="text-2xl font-bold">პროექტი ვერ მოიძებნა</h2>
        <Link href="/admin/dashboard/projects" className="text-blue-500 hover:underline mt-4 block">
          უკან დაბრუნება
        </Link>
      </div>
    );
  }

  // ვამზადებთ "უსაფრთხო" ობიექტს კლიენტისთვის
  const safeProject = {
    id: project.id,
    title: project.title || '',
    long_description: project.long_description || '',
    project_link: project.project_link || '',
    github_link: project.github_link || '',
    images: Array.isArray(project.images) ? project.images : [],
    tools: Array.isArray(project.tools) ? project.tools : []
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen bg-[#0B0F1A]">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/dashboard/projects"
          className="p-2.5 bg-slate-800 text-gray-400 hover:text-white rounded-xl border border-slate-700 transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">პროექტის რედაქტირება</h1>
          <p className="text-gray-500 text-xs font-mono mt-1 uppercase leading-none">ID: {id}</p>
        </div>
      </div>

      <EditProjectForm project={safeProject} />
    </div>
  );
}
