import * as request from '../utils/request';

export const getMedicines = async (data) => {
    return request.post('/medicine', data);
}

export const createMedicine = async (data) => {
    return request.post('/medicine/create', data);
}

export const updateMedicine = async (id, data) => {
    return request.patch(`/medicine/update/${id}`, data);
}

export const deleteMedicine = async (id) => {
    return request.patch(`/medicine/delete/${id}`);
}