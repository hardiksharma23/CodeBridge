import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/operations/CreateProjectAPI"; // Import your API function

const CreateProject = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProjectForm = async (data) => {
    // Convert form data into FormData object for file uploads
    const formData = new FormData();
  
    // Append all fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (key === "thumbnail") {
        // Make sure to use 'thumbnailImage' as the key for the file field
        formData.append("thumbnailImage", value[0]); // Assuming value is a FileList
      } else {
        formData.append(key, value);
      }
    });
  
    console.log("Payload being sent to the backend:", formData);
  
    try {
      // Call the API function
      dispatch(createProject(token, formData));
  
      console.log("Project created successfully:");
      navigate("/projects");
    } catch (error) {
      console.error("Error during project creation:", error.response?.data || error.message);
    }
  };
  

  return (
    <>
      <div>
        <h1>Create Project</h1>
      </div>
      <form onSubmit={handleSubmit(submitProjectForm)} className="text-white">
        {/* Project Details */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Project Details</h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="projectName" className="label-style">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                id="projectName"
                placeholder="Enter project name"
                className="form-style text-black"
                {...register("projectName", { required: true })}
              />
              {errors.projectName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter the project name.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="projectDescription" className="label-style">
                Project Description
              </label>
              <textarea
                name="projectDescription"
                id="projectDescription"
                placeholder="Enter project description"
                className="form-style text-black"
                {...register("projectDescription", { required: true })}
              />
              {errors.projectDescription && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter the project description.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="techStack" className="label-style">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                name="techStack"
                id="techStack"
                placeholder="E.g., HTML, CSS, React"
                className="form-style text-black"
                {...register("techStack", { required: true })}
              />
              {errors.techStack && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter the tech stack.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="githubUrl" className="label-style">
                GitHub URL
              </label>
              <input
                type="text"
                name="githubUrl"
                id="githubUrl"
                placeholder="Enter GitHub repository URL"
                className="form-style text-black"
                {...register("githubUrl", { required: true })}
              />
              {errors.githubUrl && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter the GitHub URL.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="tag" className="label-style">
                Tag
              </label>
              <input
                type="text"
                name="tag"
                id="tag"
                placeholder="Enter a tag for the project"
                className="form-style text-black"
                {...register("tag", { required: true })}
              />
              {errors.tag && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter a tag.
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="thumbnail" className="label-style">
                Thumbnail Image
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="form-style text-black"
                {...register("thumbnail", { required: true })}
              />
              {errors.thumbnail && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please upload a thumbnail image.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 py-2 px-5 font-semibold text-white"
          >
            Create Project
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProject;
