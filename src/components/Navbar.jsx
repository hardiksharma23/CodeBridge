import React from 'react'
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropDown from './ProfileDropDown';

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);


  return (
    <div className='flex h-14 items-center justify-center mt-2'>
        <div className='flex w-11/12 max-w-[1260px] items-center justify-between'>
          <Link to='/'>
            {/* logo */}
            <img src={logo} alt='Logo' width={300} height={42} loading='lazy'/>
          </Link>

            <div className='flex items-center gap-x-7 pt-2'>

              {/* log in */}
              {
                token === null && (
                  <Link to='/login'>
                    <button className='bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-[12px] py-[8px] rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:text-white transition-all duration-200'>
                      Log in
                    </button>
                  </Link>
                )
              }

              {/* sign up */}
              {
                token === null && (
                  <Link to='/signup'>
                    <button className='bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-[12px] py-[8px] rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:text-white transition-all duration-200'>
                      Sign Up
                    </button>
                  </Link>
                )
              }

              {
                token !== null && <ProfileDropDown />
              }
            </div>
            
        </div>
    </div>
  )
}

export default Navbar;
