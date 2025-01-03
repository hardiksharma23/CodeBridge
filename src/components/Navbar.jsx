import React from 'react'
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-10 bg-bg2 mt-0 p-2 shadow-md'>
        <div className='flex justify-between mx-7'>
            {/* logo */}
            <div className='flex'>
                <img src={logo} alt='Logo' width={300}/>
            </div>

            <div className='flex text-gray-300 items-center font-medium text-sm'>
                <p className='ml-4 mr-4 pt-2 pb-2 pl-4 pr-4 border-2 border-gray-500 rounded-2xl transition-all duration-200 hover:bg-gray-300 hover:text-black hover:scale-105 '>Register</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar;
