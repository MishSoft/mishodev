import React from 'react'
import TextSide from './TextSide'
import FormContact from './FormContact'

export default function Contact() {
  return (
    <div className='w-full flex-col md:flex-row min-h-screen flex items-start justify-between  px-10 py-16'>
      <TextSide/>
      <FormContact/>
    </div>
  )
}
