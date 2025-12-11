import { Code, CodeXml } from 'lucide-react'
import React from 'react'

export default function Logo() {
  return (
    <div className='flex items-center gap-2'>
        <Code size={17} className='text-blue-500' />
        <h1 className='text-2xl text-white pb-2 font-bold uppercase'>mishos<span className='text-blue-500'>.dev</span>
        </h1>
        <CodeXml size={17} className='text-blue-500' />
    </div>
  )
}
