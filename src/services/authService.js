import * as api from "../services/requester.js";

const endpoints = {
  base: "http://localhost:3030",
  login: "/users/login",
  logout: "/users/logout",
  register: "/users/register",
};

const login = async (email, password) => {
  const user = await api.post(endpoints.base + endpoints.login, {
    email,
    password,
  });
  //save user
  localStorage.setItem("user", JSON.stringify(user));
  console.log(user);
};
const register = async (email, password) => {
  const user = await api.post(endpoints.base + endpoints.register, {
    email,
    password,
  });
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

const logOut = async () => {
  await api.get(endpoints.base + endpoints.logout);  
  localStorage.removeItem('user')
};

const getUser = () => {
  const user = localStorage.getItem("user");;
  if (user) {
    return JSON.parse(user);
  }
};

export { login, register, logOut, getUser };
