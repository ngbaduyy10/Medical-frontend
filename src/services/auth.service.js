import * as request from "../utils/request";

export const register = async (data) => {
    return await request.post("/auth/register", data);
}

export const login = async (data) => {
    return await request.post("/auth/login", data);
}