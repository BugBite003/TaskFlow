import API from "./api";


// REGISTER USER
export const registerUser = async (userData) => {
  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};


// LOGIN USER
export const loginUser = async (userData) => {
  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};