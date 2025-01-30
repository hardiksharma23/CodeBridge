import React from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { RiGithubLine } from "react-icons/ri";
import { LuLinkedin } from "react-icons/lu";
import { SlSocialTwitter } from "react-icons/sl";

const Footer = () => {
  return (
    <div className='flex flex-row justify-center items-center w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-700 border-t-2 border-t-gray-400 h-[210px] text-white'>
      <div className='flex flex-row justify-between items-center w-11/12 max-w-[1260px]'>
          <div>
            <div className=''>
              <Link to='/'>
                  {/* logo */}
                  <img src={logo} alt='Logo' width={300} height={42} loading='lazy'/>
              </Link>
            </div>

            

            <div className='text-gray-400 pl-2'>
              <p>© 2025 CODEBRIDGE. All rights reserved.</p>
            </div>
          </div>

          <div className='flex px-5 gap-x-10 pt-2'>
            <a href='https://github.com/hardiksharma23' className='hover:text-green-500'>
              <RiGithubLine size={30}/>
            </a>
            
            <a href='https://www.linkedin.com/in/hardik-sharma-b67aba25a/' className='hover:text-green-500'>
              <LuLinkedin size={30}/>
            </a>
            
            <a href='https://x.com/?lang=en' className='hover:text-green-500'>
              <SlSocialTwitter size={30}/>
            </a>
            

          </div>
          
      </div>
    </div>
  )
}

export default Footer