import Link from 'next/link'
import React from 'react'

export default function TalkBtn() {
  return (
    <Link href='#contact' className='bg-blue-500 hidden sm:block px-5 py-2 rounded-md text-white font-semibold hover:bg-blue-600 duration-200 cursor-pointer'>Let's Talk</Link>
  )
}
