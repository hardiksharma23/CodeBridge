import React from 'react'
import Computer from '../components/canvas/Computer'
import { Link } from 'react-router-dom'
import nextjs from '../assets/nextjs.svg'
import react from '../assets/react.svg'
import python from '../assets/file-type-python.svg'
import mongodb from '../assets/mongodb-original-wordmark.svg'
import nodejs from '../assets/nodejs.svg'
import android from '../assets/android-os.svg'

const Home = () => {
  return (
    <div className='pt-16'>
      {/* Hero section */}
      <div className='flex flex-col mt-11 relative mx-auto items-center'>

        <div className='flex absolute left-72 top-10 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
          <img src={nextjs} alt="nextjs" width={50} />
        </div>

        <div className='flex absolute left-32 top-80 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
          <img src={react} alt="nextjs" width={50} />
        </div>

        <div className='flex absolute left-72 bottom-20 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
          <img src={nodejs} alt="nextjs" width={50} />
        </div>

        <div className='flex absolute right-72 bottom-20 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
          <img src={python} alt="nextjs" width={50} />
        </div>

        <div className='flex absolute right-32 top-80 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
          <img src={android} alt="nextjs" width={50} />
        </div>

        <div className='flex absolute right-72 top-10 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
          <img src={mongodb} alt="nextjs" width={50} />
        </div>
        

        {/* tag line */}
        <div className='font-serif text-4xl font-semibold leading-snug text-center pt-8'>
          <p className='text-white'>Find projects </p>
          <p className='text-white'>that match your passion</p>
        </div>

        {/* sample line */}
        <div className='text-gray-400 font-serif text-center pt-4'>
          <p>The ultimate web app to discover your perfect project</p>
        </div>

        {/* 3d model */}
        <div className='m-[-50px] w-full h-[400px] flex justify-center items-center'>
          <Computer />
        </div>

        {/* button for project */}
        <div className='flex items-center text-2xl justify-between mb-12 gap-28 mx-auto text-white mt-44'>
          <Link to={"/projects"}>
            <div className='font-serif border-2 border-gray-500 p-3 rounded-lg transition-all duration-200 hover:bg-gray-300 hover:text-black'>
              <p className='ml-4 mr-4'>See All Projects</p>
            </div>
          </Link>
          
          <Link to={"/signup"}>
            <div className='font-serif border-2 border-gray-500 p-3 rounded-lg transition-all duration-200 hover:bg-gray-300 hover:text-black'>
              <p className='ml-4 mr-4'>Upload Your Project</p>
            </div>
          </Link>
        </div>
        
      </div>

      {/* section 2 */}
      <div>
        
      </div>

    </div>
  )
}

export default Home