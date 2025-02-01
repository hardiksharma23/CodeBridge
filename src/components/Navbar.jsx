import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileDropDown from './ProfileDropDown';
import GetStarted from './GetStarted';
import { apiConnector } from '../services/apiConnector';
import useOnClickOutside from '../hook/useOnclickOutside';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await apiConnector("GET", BASE_URL + `/project/showAlltags`);
        setTags(response.data.allTags);
      } catch (error) {
        console.error("Failed to fetch tags", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    setFilteredTags(
      tags.filter(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handleSearch = (tagName) => {
    if (tagName.trim()) {
      setSearchTerm(tagName); // Update input field with selected tag
      navigate(`/project/search?tagName=${tagName}`);
      setFilteredTags([]);
    }
  };

  useOnClickOutside(ref, () => setFilteredTags([]));

  return (
    <div className='flex h-14 items-center justify-center mt-2'>
      <div className='flex w-11/12 max-w-[1260px] items-center justify-between'>
        <Link to='/'>
          <img src={logo} alt='Logo' width={300} height={42} loading='lazy' />
        </Link>

        <div className='flex items-center gap-x-7 pt-2'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchTerm);
            }}
            className="flex items-center relative"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tag"
              className="p-2 text-white rounded-md border-2 bg-gray-950 border-gray-500"
            />
            {filteredTags.length > 0 && (
              <ul ref={ref} className="absolute top-full mt-1 bg-gray-950 text-white border border-gray-300 rounded-md w-full z-10">
                {filteredTags.map(tag => (
                  <li
                    key={tag._id}
                    onClick={() => handleSearch(tag.name)}
                    className="p-2 cursor-pointer hover:bg-gray-900"
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            )}
          </form>

          <GetStarted />

          {token === null && (
            <>
              <Link to='/login'>
                <button className='bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-[12px] py-[8px] rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:text-white transition-all duration-200'>
                  Log in
                </button>
              </Link>
              <Link to='/signup'>
                <button className='bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-[12px] py-[8px] rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-700 hover:text-white transition-all duration-200'>
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;