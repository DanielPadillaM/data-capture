import axiosIns from "./axios";

export const registerRequest = (user) => axiosIns.post("/register", user);
export const loginRequest = (user) => axiosIns.post("/login", user);
export const logoutRequest = () => axiosIns.post("/logout");
export const verifyTokenRequest = () => axiosIns.get("/verify");
