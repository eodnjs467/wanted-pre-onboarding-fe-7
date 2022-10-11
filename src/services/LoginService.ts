import { API } from "./api";

export const signUp = (data: any) => {
    const url = 'auth/signup';
    return API.post(url, data);
}

export const signIn = (data: any) => {
    const url = 'auth/signin';
    return API.post(url, data);
}