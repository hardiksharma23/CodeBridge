import React from 'react';
import { logout } from '../../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ setConfirmationModal, toggleSidebar }) => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (authLoading || profileLoading) {
    return (
      <div className="grid h-full min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex flex-col w-64 h-full border-r-[1px] border-t-[1px] border-r-gray-400 border-t-gray-400 bg-gray-950 py-10">
      <div className="flex flex-col">
        {/* My Profile */}
        <NavLink
          to="/dashboard/my-profile"
          className={({ isActive }) =>
            `relative px-8 py-2 text-sm font-medium ${
              isActive ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-opacity-0 text-gray-400'
            } transition-all duration-200`
          }
          onClick={toggleSidebar}
        >
          <span
            className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
              matchRoute('/dashboard/my-profile') ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
          <div className="flex items-center gap-x-2">
            <span>My Profile</span>
          </div>
        </NavLink>

        {/* My Projects */}
        <NavLink
          to="/dashboard/my-projects"
          className={({ isActive }) =>
            `relative px-8 py-2 text-sm font-medium ${
              isActive ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-opacity-0 text-gray-400'
            } transition-all duration-200`
          }
          onClick={toggleSidebar}
        >
          <span
            className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
              matchRoute('/dashboard/my-projects') ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
          <div className="flex items-center gap-x-2">
            <span>My Projects</span>
          </div>
        </NavLink>

        {/* Home Page */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative px-8 py-2 text-sm font-medium ${
              isActive ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-opacity-0 text-gray-400'
            } transition-all duration-200`
          }
          onClick={toggleSidebar}
        >
          <span
            className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
              matchRoute('/') ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
          <div className="flex items-center gap-x-2">
            <span>Home Page</span>
          </div>
        </NavLink>
      </div>

      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-400"></div>

      <div className="flex flex-col">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `relative px-8 py-2 text-sm font-medium ${
              isActive ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 'bg-opacity-0 text-gray-400'
            } transition-all duration-200`
          }
          onClick={toggleSidebar}
        >
          <span
            className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
              matchRoute('/dashboard/settings') ? 'opacity-100' : 'opacity-0'
            }`}
          ></span>
          <div className="flex items-center gap-x-2">
            <span>Settings</span>
          </div>
        </NavLink>

        <button
          onClick={() => {
            setConfirmationModal({
              text1: 'Are you sure?',
              text2: 'You will be logged out of your account.',
              btn1Text: 'Logout',
              btn2Text: 'Cancel',
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            });
            toggleSidebar();
          }}
          className="px-8 py-2 text-sm font-medium text-richblack-300"
        >
          <div className="flex items-center gap-x-2 text-red-500">
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;