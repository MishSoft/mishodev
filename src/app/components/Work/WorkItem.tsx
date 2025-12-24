'use client'
import React from 'react'
import Link from 'next/link'
import { FaRegImage } from "react-icons/fa6";

// ინტერფეისს აქვე აღვწერთ, რომ ზუსტად დაემთხვეს ბაზიდან წამოსულ მონაცემებს
interface ProjectProps {
  project: {
    id: number;
    title: string;
    long_description: string; // ბაზაში ასე გვიწერია
    images: string[]; // სურათები მასივია
    project_link?: string;
    github_link?: string;
  }
}

export default function WorkItem({ project }: ProjectProps) {
  // ავიღოთ პირველი სურათი მასივიდან, თუ არსებობს
  const displayImage = project.images && project.images.length > 0 ? project.images[0] : null;

  return (
    <Link
      href={`/projects/${project.id}`}
      className='max-w-md w-72 md:w-96 shrink-0 bg-gray-900/50 border border-gray-800 z-50 rounded-2xl overflow-hidden hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/10 transition-all group'
    >
      {/* სურათის სექცია */}
      <div className='relative h-56 w-full overflow-hidden flex items-center justify-center bg-gray-800'>
        {displayImage ? (
          <img
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out'
            src={displayImage}
            alt={project.title}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <FaRegImage size={40} className='text-gray-600' />
            <span className="text-xs text-gray-600 font-bold uppercase tracking-widest">No Image</span>
          </div>
        )}
        {/* Tailwind 3-ისთვის gradient სინტაქსი */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
      </div>

      {/* ტექსტის სექცია */}
      <div className='flex flex-col p-6 gap-3'>
        <h1 className='text-2xl text-gray-100 font-bold group-hover:text-pink-400 transition-colors'>
          {project.title}
        </h1>

        {/* description-ის ნაცვლად ვიყენებთ long_description-ს */}
        <p className='text-gray-400 text-sm line-clamp-2 leading-relaxed min-h-[40px]'>
          {project.long_description}
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
