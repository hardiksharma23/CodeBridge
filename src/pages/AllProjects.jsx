import React, { useEffect, useState } from 'react';
import { projects } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import ProjectCard from '../components/ProjectCard';

const AllProjects = () => {
  const [project, setProjects] = useState([]);

  const fetchprojects = async () => {
    try {
      const result = await apiConnector("GET", projects.PROJECTS_API);
      console.log("printing the projects:", result);
      setProjects(result.data.data);
    } catch (error) {
      console.log("Could not fetch the Projects");
    }
  };

  useEffect(() => {
    fetchprojects();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen text-white gap-y-8">
      <div className="font-serif text-4xl font-bold text-gray-100 border-b-2 border-gray-700 pb-2">
        Projects
      </div>

      <div className="flex flex-col gap-6 w-full max-w-5xl">
        {project && project.length > 0 ? (
          project.map((project) => (
            <ProjectCard key={project._id} project={project} /> // Use ProjectCard here
          ))
        ) : (
          <p className="text-lg text-gray-500 font-medium">No Project found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProjects;