import React from 'react'
import Available from './Available'
import HeroText from './HeroText'
import HeroBtns from './HeroBtns'

export default function Hero() {
  return (
    <div className='w-full z-50  flex flex-col gap-2 items-center justify-center  px-2 md:px-10 min-h-screen'>
      <Available/>
      <HeroText/>
      <HeroBtns/>
    </div>
  )
}
