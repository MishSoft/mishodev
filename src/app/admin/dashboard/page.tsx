"use client"
import { useRouter } from 'next/navigation'

import { AiOutlineLoading } from "react-icons/ai";
import { TbError404 } from "react-icons/tb";
import Header from '../components/Header/Header';
import Upload from './upload/Upload';


export default function page() {
  return (
    <div className='w-full min-h-screen'>
      <div className='px-10 py-5'>
        <Upload/>
      </div>
      {/* <Posts/>
      <Upload/> */}
    </div>
  )
}
