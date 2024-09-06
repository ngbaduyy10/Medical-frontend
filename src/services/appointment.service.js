import * as request from '../utils/request';

export const getAppointments = async () => {
    return await request.get(`/appointment`);
}

export const getListAppointments = async (data) => {
    return await request.post(`/appointment`, data);
}

export const getTimeListByDate = async (data) => {
    return await request.post(`/appointment/time-list`, data);
}

export const createAppointment = async (data) => {
    return await request.post(`/appointment/create`, data);
}

export const updateAppointment = async (id, data) => {
    return await request.patch(`/appointment/update/${id}`, data);
}

export const deleteAppointment = async (id) => {
    return await request.patch(`/appointment/delete`, {id});
}

export const updateStatusAppointment = async (data) => {
    return await request.patch(`/appointment/update-status`, data);
}