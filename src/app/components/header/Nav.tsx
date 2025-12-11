import Link from 'next/link'
import React from 'react'

const links = [
  {
    id:1,
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

export default function Nav() {
  return (
    <nav className='hidden md:flex z-50 items-center text-white gap-5 font-semibold'>
      {
        links.map(link => {
          return (
            <Link className='hover:text-gray-200 duration-200' href={link.path} key={link.id}>
              {link.title}
            </Link>
          )
        })
      }
    </nav>
  )
}
