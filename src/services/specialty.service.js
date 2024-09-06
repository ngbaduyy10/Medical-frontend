import * as request from '../utils/request';

export const getSpecialties = async () => {
    return await request.get("/specialty");
}