import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
    UPDATE_PROFILE_API,
} = settingsEndpoints

export function updateProfile(token, formData) {
  return async (dispatch) => {
      try {
          const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
              Authorization: `Bearer ${token}`,
          });
          console.log("UPDATE_PROFILE_API API RESPONSE............", response)


          if (!response.data.success) {
              throw new Error(response.data.message || "Something went wrong");
          }

          const updatedProfile = response.data.updatedUserDetails;

          // Normalize the profile object
          const normalizedProfile = {
              ...updatedProfile,
              techStack: updatedProfile.techStack || [],
              image: updatedProfile.image || `https://api.dicebear.com/5.x/initials/svg?seed=${updatedProfile.firstName} ${updatedProfile.lastName}`,
          };

          // Dispatch to Redux
          dispatch(setUser(normalizedProfile));

          console.log("User profile updated in Redux:", normalizedProfile);
      } catch (error) {
          console.error("Error updating profile:", error.response?.data || error.message);
      }
  };
}






