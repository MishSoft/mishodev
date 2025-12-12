import Image from 'next/image'
import React from 'react'

export default function WorkItem() {
  return (
    <div className='max-w-md w-full md:w-auto bg-gray-900 border border-gray-700 z-50 my-5 rounded-xl'>
      <Image className='w-full object-cover rounded-t-xl' src={'https://i.insider.com/66a9152faab37011780bb4cc?width=1200&format=jpeg'} width={100} height={100} alt='image' />
      <div className='flex flex-col p-5 my-2 items-start justify-center gap-2'>
        <h1 className='text-xl  text-gray-100 font-semibold'>Meta clone</h1>
        <p className='text-gray-300 text-sm'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus facere ratione porro harum? Veniam
        </p>
        <div className='flex items-center gap-2'>
          <div className='px-2 md:px-5 py-1 bg-gray-800 text-gray-300 rounded-md'>
            React
          </div>
          <div className='px-2 md:px-5 py-1 bg-gray-800 text-gray-300 rounded-md'>
            TypeScript
          </div>
          <div className='px-2 md:px-5 py-1 bg-gray-800 text-gray-300 rounded-md'>
            Tailwind
          </div>
        </div>
      </div>
    </div>
  )
}
