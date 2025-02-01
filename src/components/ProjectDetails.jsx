import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await apiConnector("GET", BASE_URL + `/project/${projectId}`);
        console.log("Project Details Response:", response);
        setProject(response.data.data);
      } catch (error) {
        console.error("Failed to fetch project details", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const handleHeadClick = () => {
    navigate(`/auth/${project.projectHead._id}`);
  };

  return (
    <div className="flex flex-col w-11/12 max-w-[1260px] mx-auto p-8 bg-gray-900 rounded-lg shadow-lg text-white mt-10 mb-10">
      <h1 className="flex justify-center font-serif text-4xl font-bold mb-6 items-center">{project.projectName}</h1>
      
      <div className='w-[100%] flex gap-x-10'>
        <div className='w-[50%] mt-3 mb-3'>
          <img src={project.thumbnail} width={500} alt="Project Thumbnail" className="mb-6 rounded-md shadow-md" />
        </div>

        <div className='w-[50%] mt-3 mb-3'>
          <p className="mb-6 text-lg"> <span className='text-gray-400'>Project Description : </span>{project.projectDescription}</p>
          <div className="mb-7 ">
            <span className="font-semibold text-gray-400">Tech Stack : </span> {project.techStack}
          </div>
          <div className="mb-7">
            <span className="font-semibold text-gray-400">Project Head : </span> 
            <span className="text-blue-400 hover:underline cursor-pointer" onClick={handleHeadClick}>
              {project.projectHead.firstName} {project.projectHead.lastName}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-400">GitHub URL : </span> 
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
              {project.githubUrl}
            </a>
          </div>
        </div>
      </div>
      
      
      
      
    </div>
  );
};

export default ProjectDetails;