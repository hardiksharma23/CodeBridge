import React, { useEffect, useState } from 'react'
import Computer from '../components/canvas/Computer'
import { Link } from 'react-router-dom'
import nextjs from '../assets/nextjs.svg'
import react from '../assets/react.svg'
import python from '../assets/file-type-python.svg'
import mongodb from '../assets/mongodb-original-wordmark.svg'
import nodejs from '../assets/nodejs.svg'
import android from '../assets/android-os.svg'
import { apiConnector } from '../services/apiConnector'
import { categories } from '../services/apis'

const Home = () => {

  // category function
  const [subLinks, setSubLinks] = useState([]);

  const fetchcategories = async() => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing the sublinks result:", result);
      setSubLinks(result.data.allTags);
    }
    catch(error) {
      console.log("Could not fetch the category links")
    }
  }

  useEffect( () => {
    fetchcategories();
  },[] )



  return (
    <div className='pt-16'>
      {/* Hero section */}
      <div className='flex flex-col mt-3 relative mx-auto items-center'>

        <div className='flex items-center justify-center md:opacity-100 sm:opacity-0'>
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
        </div>

        {/* tag line */}
        <div className='font-serif text-4xl font-semibold leading-snug text-center'>
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
            <div className='bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-[12px] py-[8px] rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:text-white transition-all duration-200'>
              <p className='ml-4 mr-4'>See All Projects</p>
            </div>
          </Link>
          
          <Link to={"/uploadProject"}>
            <div className='bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-[12px] py-[8px] rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:text-white transition-all duration-200'>
              <p className='ml-4 mr-4'>Upload Your Project</p>
            </div>
          </Link>
        </div>
        
      </div>

      {/* section 2 */}
      <div className='flex flex-col items-center justify-center mt-12 mb-12'>

        {/* category */}
        <div className=' flex items-center justify-center font-serif text-4xl text-white border-2 font-semibold leading-snug text-center pt-2 mb-2 p-4 rounded-xl'>
          Catagory  
        </div> 
        <div className='text-white'>
          {subLinks && subLinks.length > 0 ? (
            subLinks.map((category) => (
              <div key={category._id} className="category-item">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>

      </div>

    </div>
  )
}

export default Home