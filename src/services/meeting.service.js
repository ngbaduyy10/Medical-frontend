import * as request from '../utils/request';

export const getMeetings = async (data) => {
    return request.post('/meeting', data);
}

export const createMeeting = async (data) => {
    return request.post('/meeting/create', data);
}

export const updateMeeting = async (id, data) => {
    return request.patch(`/meeting/update/${id}`, data);
}

export const deleteMeeting = async (id) => {
    return request.patch(`/meeting/delete/${id}`);
}