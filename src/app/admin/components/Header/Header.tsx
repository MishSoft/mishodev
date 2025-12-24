'use client'
import React, { useState } from 'react'
import Nav from './Nav'
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { logout } from '@/app/(auth)/logout/action'; // დააიმპორტე ექშენი

export default function Header({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    if (confirm("ნამდვილად გსურთ გამოსვლა?")) {
      await logout();
    }
  };

  return (
    <header className='sticky top-0 z-50 bg-[#0B0F1A]/80 backdrop-blur-md px-6 md:px-10 py-4 border-b border-slate-800 flex items-center justify-between'>
      <h1 className='text-2xl text-white font-bold tracking-tight'>
        Admin<span className='text-blue-500'>.</span>
      </h1>

      <div className='hidden md:block'>
        <Nav />
      </div>

      <div className='flex items-center gap-3 md:gap-5'>
        {children}

        {/* განახლებული Log Out ღილაკი */}
        <button
          onClick={handleLogout}
          className='hidden md:block py-2 px-6 cursor-pointer bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-lg transition-all font-medium text-sm'
        >
          Log Out
        </button>

        <button className='md:hidden text-gray-300 text-2xl' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
    </header>
  )
}
