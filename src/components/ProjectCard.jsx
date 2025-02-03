import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${project._id}`);
  };

  return (
    <div
      key={project._id}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-gray-700 rounded-lg p-6 bg-gray-950 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0">
        <img
          src={project.thumbnail}
          alt="Project-Thumbnail"
          className="rounded-md shadow-md w-full sm:w-32 lg:w-48"
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
  );
};

export default ProjectCard;
