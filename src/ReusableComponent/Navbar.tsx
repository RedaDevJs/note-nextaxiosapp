import Link from 'next/link';
import React from 'react'
import { FaRegPenToSquare } from "react-icons/fa6";



const Navbar = () => {
  return (
    <div>
        <div className='py-4 px-16 bg-neutral-100'>
            <Link href="/public" className='flex'>
                <FaRegPenToSquare size={30}  />
                <h1 className='font-bold text-lg mt-1'>Notes</h1>
            </Link>
        </div>
    </div>
  )
}

export default Navbar
