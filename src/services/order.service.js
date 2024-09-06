import * as request from '../utils/request';

export const getListOrders = async (data) => {
    return request.post('/order', data);
}

export const createOrder = async (data) => {
    return request.post('/order/create', data);
}

export const updateOrder = async (id, data) => {
    return request.patch(`/order/update/${id}`, data);
}