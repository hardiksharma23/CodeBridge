import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-full">
      <h1 className="mb-8 text-3xl font-medium text-white">My Profile</h1>

      {/* Profile Info Card */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-950 border-[1px] border-gray-300 p-6 rounded-md">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-[78px] h-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white break-words">
              {user?.firstName + ' ' + user?.lastName}
            </p>
            <p className="text-sm text-gray-400 break-all">
              {user?.email}
            </p>
          </div>
        </div>
        <button
          className="mt-2 sm:mt-0 py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700"
          onClick={() => navigate('/dashboard/settings')}
        >
          Edit
        </button>
      </div>

      {/* About Section */}
      <div className="my-8 bg-gray-950 border-[1px] border-gray-300 p-6 rounded-md">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-white">About</p>
          <button
            className="py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700"
            onClick={() => navigate('/dashboard/settings')}
          >
            Edit
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {user?.additionaldetails?.about ?? 'Write Something About Yourself'}
        </p>
      </div>

      {/* Details Section */}
      <div className="my-10 bg-gray-950 border-[1px] border-gray-300 p-6 rounded-md">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-white">Details</p>
          <button
            className="py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700"
            onClick={() => navigate('/dashboard/settings')}
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-400">First Name</p>
            <p className="text-sm font-medium text-white">
              {user?.firstName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Last Name</p>
            <p className="text-sm font-medium text-white">
              {user?.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-sm font-medium text-white break-all">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">GitHub Profile</p>
            <a
              href={user?.additionaldetails?.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline break-words break-all"
            >
              {user?.additionaldetails?.githubProfile ?? 'Add GitHub Profile'}
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-400">Gender</p>
            <p className="text-sm font-medium text-white">
              {user?.additionaldetails?.gender ?? 'Add Gender'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Tech Stack</p>
            <p className="text-sm font-medium text-white">
              {user?.additionaldetails?.techStack?.join(', ') ??
                'Add Tech Stack'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
