import * as request from "../utils/request";

export const getListMedicalRecord = async (data) => {
    return await request.post("/medical-record", data);
}

export const createMedicalRecord = async (data) => {
    return await request.post("/medical-record/create", data);
}

export const updateMedicalRecord = async (id, data) => {
    return await request.patch(`/medical-record/update/${id}`, data);
}