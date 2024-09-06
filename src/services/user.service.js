import * as request from "../utils/request";

export const getUsers = async (data) => {
    return await request.post("/user", data);
}

export const getUserById = async (id) => {
    return await request.get(`/user/${id}`);
}

export const tempDelete = async (data) => {
    return await request.patch('/user/temp-delete', data);
}

export const changeStatus = async (data) => {
    return await request.patch('/user/change-status', data);
}

export const createUser = async (data) => {
    return await request.post('/user/create', data);
}

export const updateUser = async (formData) => {
    const response = await fetch(process.env.REACT_APP_API_DOMAIN + `/user/update`, {
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
    });

    return response.json();
}