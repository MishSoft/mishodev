import React from 'react';
import sql from '@/lib/db';
import WorkItem from './WorkItem';

// 1. ჯერ აღვწეროთ Project ინტერფეისი ზუსტად
export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  is_visible: boolean;
  project_link?: string;
  github_link?: string;
}

export default async function Work() {
  // 2. მონაცემების წამოღება
  const projects = await sql`
    SELECT id, title, description, image_url, is_visible
    FROM projects
    WHERE is_visible = true
    ORDER BY created_at DESC
  `;

  return (
    <div id='work' className="px-2 flex flex-col items-start justify-center w-full md:px-10 min-h-screen py-10 bg-gray-900/20 backdrop-blur-2xl relative">
      <div className="relative w-full">
        <div className="sccr flex items-center overflow-x-auto gap-6 scroll-smooth py-10">

          {/* 3. აი აქ არის გამოსავალი: (project as unknown as Project) */}
          {projects.map((project) => (
            <WorkItem
              key={(project as any).id}
              project={project as unknown as Project}
            />
          ))}

        </div>
      </div>
    </div>
  );
}
