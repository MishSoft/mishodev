import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function WorkText() {
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='font-bold text-4xl text-white'>Featured Work</h1>
      <div className='flex items-center justify-between gap-10'>
        <p className='text-xs md:text-md text-gray-300'>
          A section of projects that demonstrate my ability to solve complex problems and deliver polished products.
        </p>

        <Link className='flex md:text-sm text-xs  items-center gap-2 font-semibold text-blue-500' href={'https://github.com/MishSoft'}>
          View GitHub
          <ArrowRight size={20}/>
        </Link>
      </div>
    </div>
  )
}
