import React from 'react'

export default function Footer() {
  return (
    <footer className='w-full text-gray-300 backdrop-blur-2xl px-10 py-5 bg-[#101621]/50'>
      © {new Date().getFullYear()} Mishiko Aspanidze. All rights reserved.
    </footer>
  )
}
