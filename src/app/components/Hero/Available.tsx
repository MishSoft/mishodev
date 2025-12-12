import React from 'react'

export default function Available() {
  return (
    <div className='flex items-center gap-2 rounded-full p-2 bg-gray-900 border border-gray-700'>
      <div className='w-2 animate-pulse h-2 bg-green rounded-full bg-green-500' />
      <h2 className='text-sm uppercase font-semibold text-gray-200'>Available for freelance</h2>
    </div>
  )
}
