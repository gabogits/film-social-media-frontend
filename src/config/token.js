import axiosClient from "./axios";

const tokenAuth = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["auth-token"] = token;
  } else {
    delete axiosClient.defaults.headers.common["auth-token"];
  }
};
export default tokenAuth;
