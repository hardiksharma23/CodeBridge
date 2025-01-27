import React, { useEffect, useState } from 'react'
import { projects } from '../services/apis';
import { apiConnector } from '../services/apiConnector';

const AllProjects = () => {

    const[project, setProjects] = useState([]);

    const fetchprojects = async() => {
        try {
          const result = await apiConnector("GET", projects.PROJECTS_API);
        //   console.log("printing the projects:", result);
          setProjects(result.data.data);
        }
        catch(error) {
          console.log("Could not fetch the Projects")
        }
    }

    useEffect( () => {
        fetchprojects();
    },[] )

    // useEffect(() => {
    //     console.log("Current projects state:", project);
    // }, [project]);


  return (
    <div className="flex flex-col items-center p-6 min-h-screen text-white gap-y-8">
        <div className="font-serif text-4xl font-bold text-gray-100 border-b-2 border-gray-700 pb-2">
            Projects
        </div>

        <div className="flex flex-col gap-6 w-full max-w-5xl">
            {project && project.length > 0 ? (
            project.map((project) => (
                <div
                key={project._id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-gray-700 rounded-lg p-6 bg-gray-950 hover:shadow-lg transition-shadow"
                >

                <div className="flex-shrink-0">
                    <img
                    src={project.thumbnail}
                    alt="Project-Thumbnail"
                    className="rounded-md shadow-md"
                    width={200}
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
            <p className="text-lg text-gray-500 font-medium">No Project found.</p>
            )}
        </div>
    </div>
  )
}

export default AllProjects