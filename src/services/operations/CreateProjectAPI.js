import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { createProjectEndpoints } from "../apis"
import { setLoading } from "../../slices/authSlice";

const { CREATE_PROJECT_API } = createProjectEndpoints;

export function createProject(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", CREATE_PROJECT_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      // console.log("CREATE_PROJECT_API Response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create project");
      }

      toast.success("Project Uploaded Successfully");
      const newProject = response.data.data;
      // console.log("Project created successfully:", newProject);

      return newProject; 
    } catch (error) {
      console.error("Error creating project:", error.response?.data || error.message);
      toast.error(error.message);
      throw error; 
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
