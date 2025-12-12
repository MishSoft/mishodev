import React from 'react'
import TextSide from './TextSide'
import FormContact from './FormContact'

export default function Contact() {
  return (
    <div id='contact' className='w-full flex-col gap-10 md:flex-row min-h-screen flex items-start md:items-center justify-between px-2 md:px-10 py-16'>
      <TextSide/>
      <FormContact/>
    </div>
  )
}
