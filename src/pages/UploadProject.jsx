import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/operations/CreateProjectAPI";
import { useState } from "react";

const CreateProject = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProjectForm = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "thumbnail") {
        formData.append("thumbnailImage", value[0]);
      } else {
        formData.append(key, value);
      }
    });

    // console.log("Payload being sent to the backend:", formData);

    setLoading(true);  // Set loading state

    try {
      await dispatch(createProject(token, formData));
      // console.log("Project created successfully");
      navigate("/projects");
    } catch (error) {
      console.error("Error during project creation:", error.response?.data || error.message);
    } finally {
      setLoading(false);  
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen text-white mb-20 mt-24">
      <div className="w-11/12 max-w-[1260px] mx-auto rounded-xl shadow-lg">
        <h1 className="text-gray-300 font-serif text-3xl font-bold mb-12 mt-6">Upload Your Project</h1>
        <form onSubmit={handleSubmit(submitProjectForm)} className="space-y-8 border-2 border-gray-500 p-6 rounded-2xl bg-gray-950 mb-6">
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="projectName" className="block text-lg font-medium">Project Name</label>
              <input
                type="text"
                name="projectName"
                id="projectName"
                className="w-full mt-2 p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                placeholder="Enter project name"
                {...register("projectName", { required: true })}
              />
              {errors.projectName && (
                <p className="text-red-500 text-sm mt-1">Please enter the project name.</p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="projectDescription" className="block text-lg font-medium">Project Description</label>
              <textarea
                name="projectDescription"
                id="projectDescription"
                className="w-full mt-2 p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                placeholder="Enter project description"
                {...register("projectDescription", { required: true })}
              />
              {errors.projectDescription && (
                <p className="text-red-500 text-sm mt-1">Please enter the project description.</p>
              )}
            </div>

            {/* Tech Stack */}
            <div>
              <label htmlFor="techStack" className="block text-lg font-medium">Tech Stack (comma-separated)</label>
              <input
                type="text"
                name="techStack"
                id="techStack"
                className="w-full mt-2 p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                placeholder="E.g., HTML, CSS, React"
                {...register("techStack", { required: true })}
              />
              {errors.techStack && (
                <p className="text-red-500 text-sm mt-1">Please enter the tech stack.</p>
              )}
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="githubUrl" className="block text-lg font-medium">GitHub URL</label>
              <input
                type="text"
                name="githubUrl"
                id="githubUrl"
                className="w-full mt-2 p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                placeholder="Enter GitHub repository URL"
                {...register("githubUrl", { required: true })}
              />
              {errors.githubUrl && (
                <p className="text-red-500 text-sm mt-1">Please enter the GitHub URL.</p>
              )}
            </div>

            {/* Tag */}
            <div>
              <label htmlFor="tag" className="block text-lg font-medium">Tag</label>
              <input
                type="text"
                name="tag"
                id="tag"
                className="w-full mt-2 p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                placeholder="Enter a tag for the project"
                {...register("tag", { required: true })}
              />
              {errors.tag && (
                <p className="text-red-500 text-sm mt-1">Please enter a tag.</p>
              )}
            </div>

            {/* Thumbnail Image */}
            <div>
              <label htmlFor="thumbnail" className="block text-lg font-medium">Thumbnail Image</label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="w-full mt-2 p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                {...register("thumbnail", { required: true })}
                onChange={handleThumbnailChange}
              />
              {errors.thumbnail && (
                <p className="text-red-500 text-sm mt-1">Please upload a thumbnail image.</p>
              )}
              {thumbnailPreview && (
                <div className="mt-4">
                  <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-32 h-32 object-cover rounded-md" />
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate("/")}
              type="button"
              className="font-serif py-3 px-4 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
