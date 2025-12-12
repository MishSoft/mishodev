import React from 'react'
import TextSide from './TextSide'
import CodeSide from './CodeSide'

export default function BehindCode() {
  return (
    <div id='about' className='flex-col xl:flex-row w-full min-h-screen flex items-center px-2 md:px-10 py-16 gap-10'>
      <TextSide/>
      <CodeSide/>
    </div>
  )
}
