import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted = () => {
  return (
    <div className='relative group bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200 cursor-pointer'>
      Get Started

      <div className='invisible absolute left-1/2 transform -translate-x-1/2 -top-1/2 translate-y-[70%] flex flex-col rounded-md bg-gray-800 p-4 text-white opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-52'>

        <div className='absolute left-1/2 transform -translate-x-1/2 -top-3 h-6 w-6 rotate-45 bg-gray-800'></div>

        <div className='space-y-2'>
          <Link to="/projects">
            <div className='p-2 hover:bg-gray-700 rounded-md'>
              <p className='text-sm'>Projects</p>
            </div>
          </Link>
          
          <Link to="/uploadProject">
            <div className='p-2 hover:bg-gray-700 rounded-md'>
              <p className='text-sm'>Upload Project</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
