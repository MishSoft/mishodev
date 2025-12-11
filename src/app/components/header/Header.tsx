import React from 'react'
import {Code, CodeXml} from "lucide-react"
import Logo from './Logo'
import Nav from './Nav'
import TalkBtn from './TalkBtn'
import NavBarMenuBtn from './NavBarMenuBtn'
import MobileNav from './MobileNav'
export default function Header() {
  return (
    <header className='flex items-center justify-between py-5 px-10 fixed w-full bg-[#101621]'>
      <Logo/>

      <Nav/>
      <div className='flex items-center gap-2'>
        <TalkBtn />
        <NavBarMenuBtn />
      </div>
      <MobileNav/>
    </header>
  )
}
