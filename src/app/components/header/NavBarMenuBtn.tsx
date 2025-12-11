"use client"
import React, { useState } from 'react'
import {X, Menu} from 'lucide-react'
import { useGlobalContext } from '@/app/context/GlobalContext'

export default function NavBarMenuBtn() {
  const {isShowMenu, toggleMenu} = useGlobalContext()


  return (
    <button onClick={toggleMenu} className='w-10 md:hidden group h-10 cursor-pointer hover:bg-blue-600 bg-blue-500 items-center flex flex-col justify-center gap-1 rounded-md'>
      {isShowMenu ? <X className='text-white group-hover:rotate-z-180 duration-200'/> : <Menu className='text-white'/>}
    </button>
  )
}
