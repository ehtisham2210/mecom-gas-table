import React from 'react'
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='flex  bg-blue-900 mb-10 text-xl justify-between items-center px-6 py-3'>
        <h3>ehtisham</h3>
        <div className='flex gap-6'>
            <Link href='/'>home</Link>
            <Link href='/about'>about</Link>
            
        </div>
    </div>
  )
}
export default Navbar