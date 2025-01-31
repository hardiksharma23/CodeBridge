import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyProjects = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  console.log('User Projects:', user?.projects); // Debugging line

  return (
    <div className="flex flex-col items-center p-6 min-h-screen text-white gap-y-8">
      <div className="font-serif text-4xl font-bold text-gray-100 border-b-2 border-gray-700 pb-2">
        My Projects
      </div>

      <div className="flex flex-col gap-6 w-full max-w-5xl">
        {user?.projects?.length > 0 ? (
          user.projects.map((myProject) => {
            console.log('Project:', myProject); // Debugging line
            return (
              <div
                key={myProject._id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border border-gray-700 rounded-lg p-6 bg-gray-950 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCardClick(myProject._id)}
              >
                <div className="flex-shrink-0">
                  <img
                    src={myProject.thumbnail || 'default-thumbnail.jpg'} // fallback to a default thumbnail if not available
                    alt="Project-Thumbnail"
                    className="rounded-md shadow-md"
                    width={200}
                    height={42}
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col gap-2 text-left">
                  <h1 className="text-xl font-semibold text-blue-400">
                    Name: <span className="text-gray-100">{myProject.projectName}</span>
                  </h1>
                  <p className="text-sm text-gray-400">
                    Technology used:{" "}
                    <span className="text-gray-300">{myProject.techStack}</span>
                  </p>

                  <a
                    href={myProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub Link
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-lg text-gray-500 font-medium">No Project found.</p>
        )}
      </div>
    </div>
  );
};

export default MyProjects;