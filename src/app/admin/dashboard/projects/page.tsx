import React from 'react';
import sql from '@/lib/db';
import { toggleVisibility } from './action';
import { Pencil, EyeOff, Eye, Calendar, Plus } from 'lucide-react';
import Link from 'next/link';
import DeleteButton from './DeleteButton'; // იმპორტი ახალი ფაილიდან

export default async function ProjectsPage() {
  const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;

  return (
    <div className="p-8 bg-[#0B0F1A] min-h-screen text-white font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent">
            Manage Projects
          </h1>
          <p className="text-gray-400 mt-2 font-medium">მართე შენი პორტფოლიოს ნამუშევრები</p>
        </div>
        <Link
          href="/admin/dashboard/"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={20} /> New Project
        </Link>
      </div>

      <div className="overflow-x-auto bg-[#161B26] rounded-2xl border border-slate-800 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-800/30">
              <th className="p-5 text-gray-400 font-bold text-xs uppercase tracking-widest">Project Details</th>
              <th className="p-5 text-gray-400 font-bold text-xs uppercase tracking-widest">Created At</th>
              <th className="p-5 text-gray-400 font-bold text-xs uppercase tracking-widest">Status</th>
              <th className="p-5 text-gray-400 font-bold text-xs uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-[#1C2230] transition-all group">
                <td className="p-5">
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
                      {project.images && project.images.length > 0 ? (
                        <img src={project.images[0]} alt="" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-600 font-black">NO IMAGE</div>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-100 font-bold block text-lg group-hover:text-blue-400 transition-colors">{project.title}</span>
                      <span className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">ID: {project.id.toString().slice(0, 12)}...</span>
                    </div>
                  </div>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
                    <Calendar size={16} className="text-blue-500/70" />
                    {new Date(project.created_at).toLocaleDateString('ka-GE')}
                  </div>
                </td>

                <td className="p-5">
                  {project.is_visible ? (
                    <span className="inline-flex items-center gap-2 text-emerald-400 text-[10px] font-black bg-emerald-400/10 px-4 py-1.5 rounded-full border border-emerald-400/20 uppercase tracking-widest">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Visible
                    </span>
                  ) : (
                      <span className="inline-flex items-center gap-2 text-slate-500 text-[10px] font-black bg-slate-500/10 px-4 py-1.5 rounded-full border border-slate-500/20 uppercase tracking-widest">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div> Hidden
                    </span>
                  )}
                </td>

                <td className="p-5">
                  <div className="flex justify-end items-center gap-3">
                    {/* Toggle Form */}
                    <form action={async () => { "use server"; await toggleVisibility(project.id, project.is_visible); }}>
                      <button type="submit" className="p-3 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-all">
                        {project.is_visible ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </form>

                    {/* Edit Link */}
                    <Link href={`/admin/dashboard/projects/edit/${project.id}`} className="p-3 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all">
                      <Pencil size={20} />
                    </Link>

                    {/* New Delete Button Component */}
                    <DeleteButton id={project.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
