import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../services/operations/SettingsApi"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const Settings = () => {
    const { user } = useSelector((state) => state.profile)
    console.log("User object from Redux:", user);
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitProfileForm = async (data) => {
      if (!user) {
        return <div>Loading...</div>; // Handle uninitialized user state
      }
        // Check if techstack is a string, then convert it to an array
        if (data.techStack && typeof data.techStack === 'string') {
            console.log("Before splitting techstack:", data.techStack);
            data.techStack = data.techStack.split(',').map(item => item.trim());
            console.log("After splitting techstack:", data.techStack);
        }

        console.log("Payload being sent to the backend:", data);

        try {
            // Dispatch updateProfile action and wait for response
            dispatch(updateProfile(token, data));

            // Optionally, you could log after dispatch to confirm the update was successful
            console.log("Profile updated successfully!");
            navigate("/dashboard/my-profile");

            console.log(user);
        } catch (error) {
            console.error("Error during profile update:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <div>
                <h1>Edit Profile</h1>
            </div>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                {/* Profile Information */}
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="lable-style">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter first name"
                                className="form-style text-black"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your first name.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className="lable-style">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter last name"
                                className="form-style text-black"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                            />
                            {errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your last name.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="githubProfile" className="lable-style">
                                Enter Your Github Profile
                            </label>
                            <input
                                type="text"
                                name="githubProfile"
                                id="githubProfile"
                                placeholder="Enter Your Github Profile"
                                className="form-style text-black"
                                {...register("githubProfile", { required: true })}
                                defaultValue={user?.additionaldetails?.githubProfile}
                            />
                            {errors.githubProfile && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Github Profile.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="lable-style">
                                Gender
                            </label>
                            <select
                                type="text"
                                name="gender"
                                id="gender"
                                className="form-style text-black"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionaldetails?.gender}
                            >
                                {genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Gender.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="techStack" className="lable-style">
                                Enter Your Techstack
                            </label>
                            <input
                                type="text"
                                name="techStack"
                                id="techStack"
                                placeholder="Enter Your Techstack (comma-separated)"
                                className="form-style text-black"
                                {...register("techStack", { required: true })}
                                defaultValue={user?.additionaldetails?.techStack?.join(", ")} // Convert array to string
                            />
                            {errors.techStack && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Techstack.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="lable-style">
                                About
                            </label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                className="form-style text-black"
                                {...register("about", { required: true })}
                                defaultValue={user?.additionaldetails?.about}
                            />
                            {errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your About.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => navigate("/dashboard/my-profile")}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <button type="submit">
                        Update
                    </button>
                </div>
            </form>
        </>
    );
}

export default Settings;