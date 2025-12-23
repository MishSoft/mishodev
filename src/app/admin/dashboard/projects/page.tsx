import React from 'react';
import sql from '@/lib/db';
import { deleteProject, toggleVisibility } from './action';
import { Pencil, Trash2, EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectsPage() {
  const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;

  return (
    <div className="p-8 bg-[#0B0F1A] min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
          <p className="text-gray-400 mt-1">მართე შენი პორტფოლიოს ნამუშევრები</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#161B26] rounded-2xl border border-slate-800 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-800/30">
              <th className="p-5 text-gray-400 font-semibold text-sm uppercase">Project</th>
              <th className="p-5 text-gray-400 font-semibold text-sm uppercase">Status</th>
              <th className="p-5 text-gray-400 font-semibold text-sm uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-[#1C2230] transition-colors group">
                {/* სურათი და სათაური */}
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">No Img</div>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-100 font-medium block">{project.title}</span>
                      <span className="text-xs text-gray-500">ID: #{project.id}</span>
                    </div>
                  </div>
                </td>

                {/* სტატუსის ბეიჯი */}
                <td className="p-5">
                  {project.is_visible ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> Visible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div> Hidden
                    </span>
                  )}
                </td>

                {/* ღილაკები */}
                <td className="p-5">
                  <div className="flex justify-end gap-3">
                    <form action={toggleVisibility.bind(null, project.id, project.is_visible)}>
                      <button type="submit" className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all" title="ჩვენება/დამალვა">
                        {project.is_visible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </form>

                    <Link href={`/admin/dashboard/projects/edit/${project.id}`} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all">
                      <Pencil size={18} />
                    </Link>

                    <form action={deleteProject.bind(null, project.id)}>
                      <button
                        type="submit"
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </form>
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
