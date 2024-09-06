import * as request from '../utils/request';

export const getStatistic = async (dateFilter) => {
    return await request.post("/statistic", dateFilter)
}