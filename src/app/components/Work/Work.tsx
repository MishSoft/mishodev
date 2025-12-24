import React from 'react';
import sql from '@/lib/db';
import WorkItem from './WorkItem';

// ინტერფეისის გასწორება ბაზის სვეტების მიხედვით
export interface Project {
  id: number;
  title: string;
  long_description: string;
  images: string[]; // images არის მასივი
  is_visible: boolean;
  project_link?: string;
  github_link?: string;
}

export default async function Work() {
  // მონაცემების წამოღება - სვეტების სახელების გასწორება
  const projects = await sql`
    SELECT id, title, long_description, images, is_visible, project_link, github_link
    FROM projects
    WHERE is_visible = true
    ORDER BY created_at DESC
  `;

  return (
    <div id='work' className="px-2 flex flex-col items-start justify-center w-full md:px-10 min-h-screen py-10 bg-[#0B0F1A] relative">
      <div className="relative w-full">
        {/* თუ პროექტები საერთოდ არ არის */}
        {projects.length === 0 ? (
          <p className="text-gray-500 text-center w-full">პროექტები ჯერ არ არის დამატებული.</p>
        ) : (
          <div className="sccr flex items-center overflow-x-auto gap-8 scroll-smooth py-10 no-scrollbar">
            {projects.map((project) => (
              <WorkItem
                key={project.id}
                project={project as unknown as Project}
              />
            ))}
            </div>
        )}
      </div>
    </div>
  );
}
