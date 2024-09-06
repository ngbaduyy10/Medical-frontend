import * as request from "../utils/request";

export const changePassword = async (data) => {
    return await request.patch('/password/change', data);
}