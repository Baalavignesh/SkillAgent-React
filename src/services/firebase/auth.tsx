import axios from "axios";

let CreateUser = (newUser: RegisterInfo) => {
  return axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/auth/register`,
    newUser
  );
};

let LoginUser = (existingUser: LoginInfo) => {
  return axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/auth/login`,
    existingUser
  );
};

let LogoutUser = () => {
  return axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/logout`);
};

export { CreateUser, LoginUser, LogoutUser };
