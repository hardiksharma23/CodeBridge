import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SearchProjects = () => {
  const [projects, setProjects] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const tagName = query.get('tagName');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectsByTag = async () => {
      try {
        const response = await apiConnector("GET", BASE_URL + `/project/search?tagName=${tagName}`);
        setProjects(response.data.data);
      } catch (error) {
        console.error("Failed to search projects by tag name", error);
      }
    };

    if (tagName) {
      fetchProjectsByTag();
    }
  }, [tagName]);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="w-11/12 max-w-[1260px] h-screen mx-auto p-8 rounded-lg shadow-lg text-white mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{tagName}"</h1>
      <div className=''>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col md:flex-row gap-x-10 mb-4 p-4 my-5 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
              onClick={() => handleProjectClick(project._id)}
            >
              <div className="flex-shrink-0">
                <img
                  src={project.thumbnail}
                  alt="Project-Thumbnail"
                  className="rounded-md shadow-md"
                  width={400}
                  height={42}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <h1 className="text-xl font-semibold text-blue-400">
                  Name: <span className="text-gray-100">{project.projectName}</span>
                </h1>
                <p className="text-sm text-gray-400">
                  Technology used:{" "}
                  <span className="text-gray-300">{project.techStack}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Project Head:{" "}
                  <span className="text-gray-300">
                    {project.projectHead?.firstName} {project.projectHead?.lastName}
                  </span>
                </p>
                <p className="text-sm text-gray-400">
                  Tag:{" "}
                  <span className="text-gray-300">{project.tag?.name}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found for this tag.</p>
        )}
      </div>
      
    </div>
  );
};

export default SearchProjects;