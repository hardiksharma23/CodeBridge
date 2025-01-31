import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-white">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-gray-300 bg-gray-950 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-white">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>
        <button
          className='font-serif mt-5 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
          onClick={() => {
            navigate("/dashboard/settings")
          }}
        >
          Edit
        </button>
      </div>
      <div className="my-8 flex flex-col gap-y-2 rounded-md border-[1px] border-gray-300 bg-gray-950 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">About</p>
          <button
            className='font-serif mt-5 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            onClick={() => {
              navigate("/dashboard/settings")
            }}
          >
            Edit
          </button>
        </div>
        <p
          className={`${
            user?.additionaldetails?.about
              ? "text-gray-400"
              : "text-gray-400"
          } text-sm font-medium`}
        >
          {user?.additionaldetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-gray-300 bg-gray-950 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-white">
            Personal Details
          </p>
          <button
            className='font-serif mt-5 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            onClick={() => {
              navigate("/dashboard/settings")
            }}
          >
            Edit
          </button>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-gray-400">First Name</p>
              <p className="text-sm font-medium text-white">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-400">Email</p>
              <p className="text-sm font-medium text-white">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-400">Gender</p>
              <p className="text-sm font-medium text-white">
                {user?.additionaldetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-gray-400">Last Name</p>
              <p className="text-sm font-medium text-white">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-gray-400">GitHub Profile</p>
              <a href={user?.additionaldetails?.githubProfile} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
                {user?.additionaldetails?.githubProfile ?? "Add GitHub Profile"}
              </a>
              
            </div>
            
            <div>
              <p className="mb-2 text-sm text-gray-400">Tech Stack</p>
              <p className="text-sm font-medium text-white">
                {user?.additionaldetails?.techStack ?? "Add Tech Stack"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile