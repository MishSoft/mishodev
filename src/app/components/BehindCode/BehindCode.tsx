import React from 'react'
import TextSide from './TextSide'
import CodeSide from './CodeSide'

export default function BehindCode() {
  return (
    <div className='flex-col xl:flex-row w-full minh-h-screen flex items-center px-10 py-16 gap-10'>
      <TextSide/>
      <CodeSide/>
    </div>
  )
}
