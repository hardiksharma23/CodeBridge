import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = ({setIsOpen}) => {
  return (
    <div className="relative group">
      {/* Button */}
      <div className="bg-primary font-serif font-bold border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-200 cursor-pointer">
        Get Started
      </div>

      {/* Dropdown */}
      <div className="invisible absolute left-0 top-full mt-2 w-40 flex flex-col rounded-md bg-gray-800 p-3 text-white opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 z-50">
        
        {/* Triangle Arrow */}
        <div className="absolute left-4 -top-2 h-4 w-4 rotate-45 bg-gray-800"></div>

        {/* Links */}
        <div className="space-y-2">
          <Link to="/projects"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <div className="p-2 hover:bg-gray-700 rounded-md">
              <p className="text-sm">Projects</p>
            </div>
          </Link>
          
          <Link to="/uploadProject"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <div className="p-2 hover:bg-gray-700 rounded-md">
              <p className="text-sm">Upload Project</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
