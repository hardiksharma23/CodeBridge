import Computer from '../components/canvas/Computer'
import { Link } from 'react-router-dom'
import nextjs from '../assets/nextjs.svg'
import react from '../assets/react.svg'
import python from '../assets/file-type-python.svg'
import mongodb from '../assets/mongodb-original-wordmark.svg'
import nodejs from '../assets/nodejs.svg'
import android from '../assets/android-os.svg'
import CodeBlocks from '../components/CodeBlocks'
import CodeBlocks_2 from '../components/CodeBlocks_2'
import TechSlider from '../components/TechSlider'


const Home = () => {
  return (
    <div className='mt-28'>
      {/* Hero section */}
      <div className='flex flex-col mt-3 relative mx-auto items-center'>

        <div className='hidden md:flex items-center justify-center'>
          <div className='flex absolute left-10 md:left-72 top-10 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
            <img src={nextjs} alt="nextjs" className="w-[40px] md:w-[50px]" />
          </div>

          <div className='flex absolute left-16 md:left-32 top-52 md:top-80 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
            <img src={react} alt="react" className="w-[40px] md:w-[50px]" />
          </div>

          <div className='flex absolute left-10 md:left-72 bottom-10 md:bottom-20 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
            <img src={nodejs} alt="nodejs" className="w-[40px] md:w-[50px]" />
          </div>

          <div className='flex absolute right-10 md:right-72 bottom-10 md:bottom-20 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
            <img src={python} alt="python" className="w-[40px] md:w-[50px]" />
          </div>

          <div className='flex absolute right-16 md:right-32 top-52 md:top-80 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
            <img src={android} alt="android" className="w-[40px] md:w-[50px]" />
          </div>

          <div className='flex absolute right-10 md:right-72 top-10 border-2 bg-white p-2 rounded-lg shadow-2xl shadow-slate-50'>
            <img src={mongodb} alt="mongodb" className="w-[40px] md:w-[50px]" />
          </div>
        </div>

        {/* Tag line */}
        <div className='font-serif text-2xl md:text-4xl font-semibold leading-snug text-center px-4'>
          <p className='text-white'>
            Find <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>projects</span>
          </p>
          <p className='text-white'>
            that <span className='bg-gradient-to-r from-green-600 via-[#6ec888] to-emerald-600 text-transparent bg-clip-text font-bold'>match</span> your passion
          </p>
        </div>

        {/* Sample line */}
        <div className='text-gray-400 font-serif text-center pt-4 text-sm md:text-base'>
          <p>The ultimate web app to discover your perfect project</p>
        </div>

        {/* 3D model */}
        <div className='w-full h-[200px] md:h-[400px] flex justify-center items-center'>
          <Computer />
        </div>

        {/* Buttons */}
        <div className='flex flex-col md:flex-row items-center text-lg md:text-2xl justify-between mb-12 gap-6 md:gap-28 mx-auto text-white mt-24'>
          <Link to={"/projects"}>
            <div className='bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-6 py-4 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:text-white transition-all duration-200'>
              See All Projects
            </div>
          </Link>

          <Link to={"/uploadProject"}>
            <div className='bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-6 py-4 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:text-white transition-all duration-200'>
              Upload Your Project
            </div>
          </Link>
        </div>
      </div>

      {/* Section 2 */}
      <div className='flex flex-col gap-y-12 md:gap-y-36 items-center justify-center mt-12 md:mt-24 mb-12 md:mb-24'>
        <div className='flex flex-col md:flex-row w-11/12 max-w-[1260px] justify-between gap-y-8 md:gap-x-10'>
          <div className='w-full md:w-1/2'>
            <CodeBlocks />
          </div>

          {/* Highlighted Heading */}
          <div className='flex flex-col justify-center text-white font-serif p-5 text-center md:text-left'>
            <p className='text-2xl md:text-4xl font-bold'>Where <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>Passion</span></p>
            <p className='text-2xl md:text-4xl font-bold'>Meets <span className='bg-gradient-to-r from-green-600 via-[#6ec888] to-emerald-600 text-transparent bg-clip-text font-bold'>Collaboration.</span></p>

            <p className='text-sm text-gray-400 mt-4 md:mt-10'>
              Find projects that inspire you, and join forces with like-minded developers.
              Showcase your expertise, contribute to meaningful innovations, and be part of a thriving developer community where ideas transform into reality. Learn, collaborate, and grow as you build solutions together.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Slider */}
      <div className='mt-12 md:mt-40 mb-12 md:mb-40'>
        <TechSlider />
      </div>

      {/* Section 3 */}
      <div className='flex flex-col gap-y-12 md:gap-y-36 items-center justify-center mt-12 md:mt-24 mb-12 md:mb-24'>
        <div className='flex flex-col md:flex-row w-11/12 max-w-[1260px] justify-between gap-y-8 md:gap-x-10'>
          {/* Highlighted Heading */}
          <div className='flex flex-col justify-center text-white font-serif p-5 gap-y-4 text-center md:text-left'>
            <p className='text-2xl md:text-4xl font-bold'>Find <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>Projects,</span></p>
            <p className='text-2xl md:text-4xl font-bold'>Share <span className='bg-gradient-to-r from-green-600 via-[#6ec888] to-emerald-600 text-transparent bg-clip-text font-bold'>Knowledge,</span></p>
            <p className='text-2xl md:text-4xl font-bold'>Build <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>Connections.</span></p>
          </div>

          <div className='w-full md:w-1/2'>
            <CodeBlocks_2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
