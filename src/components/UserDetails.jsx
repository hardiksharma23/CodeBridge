import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiConnector("GET", BASE_URL + `/auth/${userId}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="flex flex-col w-11/12 max-w-[1260px] mx-auto p-8 bg-gray-900 rounded-lg shadow-lg text-white mt-24 mb-10">
      <h1 className="text-4xl font-bold mb-6 font-serif">{user.firstName} {user.lastName}</h1>
      <p className="mb-4"><span className="font-semibold text-gray-400">Email:</span> {user.email}</p>
      <p className="mb-4"><span className="font-semibold text-gray-400">About:</span> {user.additionaldetails.about}</p>
      <p className="mb-4"><span className="font-semibold text-gray-400">Tech Stack:</span> {user.additionaldetails.techStack.join(', ')}</p>

      <div>
        <p className="mb-2 text-sm text-gray-400">GitHub Profile: <a href={user?.additionaldetails?.githubProfile} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
          {user?.additionaldetails?.githubProfile ?? "Add GitHub Profile"}
        </a></p>
      </div>

      <h2 className="text-3xl font-bold mt-8 mb-4 font-serif">Projects</h2>
      {user.projects.length > 0 ? (
        user.projects.map((project) => (
          <div
            key={project._id}
            className="flex flex-col sm:flex-row gap-6 mb-4 p-4 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
            onClick={() => handleProjectClick(project._id)}
          >
            <img
              src={project.thumbnail}
              alt="Project-Thumbnail"
              className="rounded-md shadow-md w-full sm:w-1/2 h-auto"
            />
            <div className="sm:w-1/2">
              <h3 className="text-2xl font-semibold text-green-400 font-serif">{project.projectName}</h3>
              <p className="mb-6 mt-6 text-lg"><span className='text-gray-400'>Project Description:</span> {project.projectDescription}</p>
              <div className="mb-7">
                <span className="font-semibold text-gray-400">Tech Stack:</span> {project.techStack}
              </div>
              <div className="mb-4">
                <span className="font-semibold text-gray-400">GitHub URL:</span>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1 break-word break-all">
                  {project.githubUrl}
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default UserDetails;
