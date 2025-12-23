import React from 'react'
import Link from 'next/link'
import { Project } from '@/types';

interface ProjectProps {
  project: Project
}

export default function WorkItem({ project }: ProjectProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className='max-w-md w-72 md:w-96 shrink-0 bg-gray-900/50 border border-gray-800 z-50 rounded-2xl overflow-hidden hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 transition-all group'
    >
      {/* სურათის სექცია */}
      <div className='relative h-56 w-full overflow-hidden'>
        <img
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out'
          src={project.image_url || 'https://via.placeholder.com/600x400'}
          alt={project.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* ტექსტის სექცია */}
      <div className='flex flex-col p-6 gap-3'>
        <h1 className='text-2xl text-gray-100 font-bold group-hover:text-pink-400 transition-colors'>
          {project.title}
        </h1>
        <p className='text-gray-400 text-sm line-clamp-2 leading-relaxed'>
          {project.description}
        </p>

        <div className='flex items-center gap-3 mt-4'>
          <span className='px-4 py-1.5 bg-pink-500/10 text-pink-500 text-[10px] font-bold uppercase tracking-wider rounded-full border border-pink-500/20 group-hover:bg-pink-500 group-hover:text-white transition-all'>
            View Case Study
          </span>
        </div>
      </div>
    </Link>
  )
}
