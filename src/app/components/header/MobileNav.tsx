"use client"
import { useGlobalContext } from '@/app/context/GlobalContext'
import Link from 'next/link'
import React, { FormEvent, useEffect, useRef } from 'react'

const links = [
  {
    id: 1,
    path: "/",
    title: "Home"
  },

  {
    id: 2,
    path: "#work",
    title: "Work"
  },

  {
    id: 3,
    path: "#skills",
    title: "Skills"
  },

  {
    id: 4,
    path: "#about",
    title: "About"
  },
]

export default function MobileNav() {
  const {isShowMenu, setIsShowMenu} = useGlobalContext()
  const menuRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      if(menuRef.current && (!menuRef.current.contains(e.target as Node))) {
        setIsShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOut)

    return () => document.removeEventListener('mousedown', handleClickOut)
  }, [setIsShowMenu])

  return (
    <nav ref={menuRef} className={`md:hidden -z-1 ${isShowMenu ? " opacity-100 translate-y-0" : "-translate-y-full opacity-0"}  flex flex-col text-white font-semibold duration-200 ease-in-out gap-2 py-5 fixed bg-[#101621] top-20 w-full left-0`}>
      {
        links.map(link => {
          return (
            <Link onClick={() => setIsShowMenu(false)} className='text-center py-2  hover:text-gray-200 duration-200 ' key={link.id} href={link.path}>
              {link.title}
            </Link>
          )
        })
      }
    </nav>
  )
}
