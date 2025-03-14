const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    CATEGORIES_API: BASE_URL + "/project/showAlltags",
};

export const projects = {
    PROJECTS_API: BASE_URL + "/project/showAllProjects",
}



export const createProjectEndpoints = {
    CREATE_PROJECT_API: BASE_URL + "/project/createProject",
}


export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
}

export const settingsEndpoints = {
    UPDATE_PROFILE_API: BASE_URL + "/Profile/updateProfile",
}