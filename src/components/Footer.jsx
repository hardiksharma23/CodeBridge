import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { RiGithubLine } from "react-icons/ri";
import { LuLinkedin } from "react-icons/lu";
import { SlSocialTwitter } from "react-icons/sl";

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-700 border-t-2 border-t-gray-400 h-[210px] text-white'>
      <div className='flex flex-col md:flex-row justify-between items-center w-11/12 max-w-[1260px]'>
        {/* Logo and Copyright */}
        <div className='flex flex-col items-center md:items-start'>
          <Link to='/'>
            {/* logo */}
            <img src={logo} alt='CodeBridge Logo' width={300} height={42} loading='lazy'/>
          </Link>

          <div className='text-gray-400 pl-2 mt-2 md:mt-4'>
            <p>© 2025 CODEBRIDGE. All rights reserved.</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className='flex gap-x-10 pt-2 md:pt-0'>
          <a href='https://github.com/hardiksharma23' className='hover:text-green-500' aria-label='GitHub'>
            <RiGithubLine size={30}/>
          </a>
          
          <a href='https://www.linkedin.com/in/hardik-sharma-b67aba25a/' className='hover:text-green-500' aria-label='LinkedIn'>
            <LuLinkedin size={30}/>
          </a>
          
          <a href='https://x.com/?lang=en' className='hover:text-green-500' aria-label='Twitter'>
            <SlSocialTwitter size={30}/>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
