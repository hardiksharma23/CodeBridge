import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
    SIGNUP_API,
    SENDOTP_API,
    LOGIN_API,
} = endpoints;

export function sendOtp(email, navigate) {
    return async () => {

      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        navigate("/verify-email")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
      }
    }
  }


export function signup(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async () => {
        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("Signup response", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            navigate("/login");
        }
        catch(error) {
            console.log("SIGNUP API ERROR............", error)
            navigate("/signup");
        }
    }
}


export function login(email, password, navigate) {
    return async (dispatch) => {
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            }) 

            console.log("Login response .....", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")

        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            // navigate("/login");
        }
    };
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/")
    }
  }

