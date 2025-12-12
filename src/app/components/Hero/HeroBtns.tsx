import React from 'react'
import { ArrowDownToLine, ChevronDown } from "lucide-react"


export default function HeroBtns() {
  return (
    <div className='flex flex-col md:flex-row items-center gap-5 my-10'>
      <button className='px-5 md:px-10 md:py-4 text-white hover:bg-blue-700 duration-200 cursor-pointer py-2 flex items-center gap-2 bg-blue-500 rounded-xl'>
        View Work
        <ChevronDown size={20} />
      </button>

      <button className='px-5 md:px-10 md:py-4 text-white flex items-center gap-2 py-2 bg-gray-700 hover:bg-gray-800 duration-200 cursor-pointer border border-gray-500 rounded-xl'>
        <ArrowDownToLine size={20} />
        Resume
      </button>
    </div>
  )
}
