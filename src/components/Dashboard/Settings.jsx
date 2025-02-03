import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../services/operations/SettingsApi";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const Settings = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    if (!user) {
      return <div>Loading...</div>;
    }

    if (data.techStack && typeof data.techStack === "string") {
      data.techStack = data.techStack.split(",").map((item) => item.trim());
    }

    try {
      dispatch(updateProfile(token, data));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("Error during profile update:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-6 sm:p-8 bg-gray-950 text-white rounded-xl shadow-md">
      <h1 className="font-serif text-2xl md:text-4xl font-bold mb-8 text-center md:text-left">Edit Profile</h1>
      <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-6">
        {/* Profile Information */}
        <div className="p-6 rounded-lg shadow-md bg-gray-800">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-2 border border-gray-600 bg-gray-900 rounded-md text-gray-300"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && <span className="text-red-400 text-sm">Please enter your first name.</span>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-2 border border-gray-600 bg-gray-900 rounded-md text-gray-300"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && <span className="text-red-400 text-sm">Please enter your last name.</span>}
            </div>
          </div>

          {/* Github and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="githubProfile" className="block text-sm font-medium mb-1">
                GitHub Profile
              </label>
              <input
                type="text"
                id="githubProfile"
                className="w-full p-2 border border-gray-600 bg-gray-900 rounded-md text-gray-300 break-words break-all"
                {...register("githubProfile", { required: true })}
                defaultValue={user?.additionaldetails?.githubProfile}
              />
              {errors.githubProfile && <span className="text-red-400 text-sm">Please enter your GitHub profile.</span>}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
                className="w-full p-2 border border-gray-600 bg-gray-900 rounded-md text-gray-300"
                {...register("gender", { required: true })}
                defaultValue={user?.additionaldetails?.gender}
              >
                {genders.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && <span className="text-red-400 text-sm">Please select your gender.</span>}
            </div>
          </div>

          {/* TechStack and About */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label htmlFor="techStack" className="block text-sm font-medium mb-1">
                Tech Stack (Comma-separated)
              </label>
              <input
                type="text"
                id="techStack"
                className="w-full p-2 border border-gray-600 bg-gray-900 rounded-md text-gray-300"
                {...register("techStack", { required: true })}
                defaultValue={user?.additionaldetails?.techStack?.join(", ")}
              />
              {errors.techStack && <span className="text-red-400 text-sm">Please enter your tech stack.</span>}
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium mb-1">
                About
              </label>
              <input
                type="text"
                id="about"
                className="w-full p-2 border border-gray-600 bg-gray-900 rounded-md text-gray-300"
                {...register("about", { required: true })}
                defaultValue={user?.additionaldetails?.about}
              />
              {errors.about && <span className="text-red-400 text-sm">Please enter bio details.</span>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-profile")}
            className="py-3 px-4 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
