import { USERS } from './Endpoints';
import httpService from './http-interceptor';
import { type User } from "../types/types";

export const getAllUsers = (limit: string | null = null) => {
    return httpService
        .get<User[]>(`${USERS}?_sort=firstName&_order=asc&_limit=${limit}`)
        .then((res) => res.data);
};


export const getUserById = (id: string) => {
    return httpService
        .get<User>(`${USERS}/${id}`)
        .then((res) => res.data);
}
export const createNewUser = (user: User) => {
    return httpService
        .post<User>(`${USERS}`, user)
        .then((res) => res.data);
}
export const deleteUserById = (id: string) => {
    return httpService
        .delete<User>(`${USERS}/${id}`)
        .then((res) => res.data);
}
export const updateUserInfo = (user: User) => {
    return httpService
        .put<User>(`${USERS}/${user.id}`, user)
        .then((res) => res.data);
}
