import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "./ProfileDropDown";
import GetStarted from "./GetStarted";
import { apiConnector } from "../services/apiConnector";
import useOnClickOutside from "../hook/useOnclickOutside";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; 
import { IoIosSearch } from "react-icons/io";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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
    setFilteredTags(tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm,]);

  const handleSearch = (tagName) => {
    if (tagName.trim()) {
      setSearchTerm(tagName);
      navigate(`/project/search?tagName=${tagName}`);
      setFilteredTags([]);
      setIsOpen(false);  // Close menu after search
    }
  };

  useOnClickOutside(ref, () => setFilteredTags([]));

  return (
    <div className="bg-bg2 mb-11 text-white fixed w-full top-0 z-50 shadow-md">
      <div className="flex w-11/12 max-w-[1260px] items-center justify-between mx-auto py-4">
        
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Logo" width={250} height={42} loading="lazy" />
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-x-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchTerm);
            }}
            className="relative w-64"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tag"
              className="p-2 text-white rounded-md border-2 bg-bg2 border-gray-500 w-full"
            />
            <div  className="absolute w-7 h-7 top-3 right-4 text-gray-500">
              <IoIosSearch size={23} />
            </div>
            {filteredTags.length > 0 && (
              <ul ref={ref} className="absolute top-full mt-1 bg-gray-950 text-white border border-gray-300 rounded-md w-full z-10">
                {filteredTags.map((tag) => (
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

          {token === null ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="bg-primary border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
                  Log in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <button className="bg-primary border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center py-4 space-y-4 md:hidden">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchTerm);
              }}
              className="w-10/12"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by tag"
                className="p-2 text-white rounded-md border-2 bg-gray-950 border-gray-500 w-full"
              />
              {filteredTags.length > 0 && (
                <ul ref={ref} className="bg-gray-950 text-white border border-gray-300 rounded-md w-full mt-2 z-10">
                  {filteredTags.map((tag) => (
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

            {token === null ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="bg-primary border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <button className="bg-primary border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropDown />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
