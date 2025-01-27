import { apiConnector } from "../apiConnector";
import { createProjectEndpoints } from "../apis"
import { setLoading } from "../../slices/authSlice";

const { CREATE_PROJECT_API } = createProjectEndpoints;

export function createProject(token, formData) {
  return async (dispatch) => {
    try {
      // Set loading to true
      dispatch(setLoading(true));

      // API call to create a project
      const response = await apiConnector("POST", CREATE_PROJECT_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      console.log("CREATE_PROJECT_API Response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to create project");
      }

      const newProject = response.data.data;

      console.log("Project created successfully:", newProject);

      // Stop loading
      dispatch(setLoading(false));

      return newProject; // Return created project for further use
    } catch (error) {
      console.error("Error creating project:", error.response?.data || error.message);

      // Stop loading in case of error
      dispatch(setLoading(false));

      throw error; // Rethrow the error for handling at the component level
    }
  };
}
