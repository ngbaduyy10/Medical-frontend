import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {getStatistic} from "../../services/statistic.service";
import {Card, Col, Divider, Row, Select, Table, Typography, notification, Flex} from "antd";
import {DollarCircleOutlined, ShoppingCartOutlined, UserAddOutlined} from "@ant-design/icons";
import {formatPrice} from "../../utils/constant";

const DATE_MODE = {
    DAY: "day",
    WEEK: "week",
    MONTH: "month",
    YEAR: "year",
};

function Statistic () {
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(DATE_MODE.DAY);
    const [statistic, setStatistic] = useState({});

    const renderDate = (date) => {
        switch (date) {
            case DATE_MODE.DAY:
                return { startDate: dayjs(), endDate: dayjs() };
            case DATE_MODE.WEEK:
                return {
                    startDate: dayjs().startOf("week"),
                    endDate: dayjs().endOf("week"),
                };
            case DATE_MODE.MONTH:
                return {
                    startDate: dayjs().startOf("month"),
                    endDate: dayjs().endOf("month"),
                };
            case DATE_MODE.YEAR:
                return {
                    startDate: dayjs().startOf("year"),
                    endDate: dayjs().endOf("year"),
                };
            default:
                return { startDate: dayjs(), endDate: dayjs() };
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const dateFilter = renderDate(date);
            const response = await getStatistic(dateFilter);
            if (response.code === 200) {
                setStatistic(response.data);
            } else {
                notification.error({
                    message: "Error",
                    description: response.message,
                })
            }
            setLoading(false);
        }

        fetchApi();
    }, [date]);

    // const lineChartConfig = {
    //     data: statistic?.chartMonth,
    //     height: 300,
    //     xField: "day",
    //     yField: "value",
    //     point: {
    //         size: 5,
    //         shape: "circle",
    //     },
    //     interaction: {
    //         tooltip: {
    //             render: (event, { title, items }) => {
    //                 console.log(items);
    //                 return (
    //                     <div style={{ padding: "8px 16px" }}>
    //                         <p>{title}</p>
    //                         <ul>
    //                             {items && items.map((item) =>
    //                                 item.name === "value" ? (
    //                                     <li key={item.name} style={{ color: item.color }}>
    //                                         Revenue: {formatPrice(item.value)}
    //                                     </li>
    //                                 ) : null
    //                             )}
    //                         </ul>
    //                     </div>
    //                 );
    //             },
    //         },
    //     },
    // };
    //
    // const columnChartConfig = {
    //     data: statistic?.chartYear,
    //     height: 300,
    //     xField: "month",
    //     yField: "value",
    //     columnWidthRatio: 0.6,
    //     label: {
    //         position: "top",
    //         text: (d) => formatPrice(d.value),
    //         style: {
    //             fill: "#000",
    //             fontSize: 12,
    //             y: -20,
    //         },
    //     },
    //     interaction: {
    //         tooltip: {
    //             render: (event, { title, items }) => {
    //                 return (
    //                     <div style={{ padding: "8px 16px" }}>
    //                         <p>{title}</p>
    //                         <ul>
    //                             {items && items.map((item) =>
    //                                 item.name === "value" ? (
    //                                     <li key={item.name} style={{ color: item.color }}>
    //                                         Revenue: {formatPrice(item.value)}
    //                                     </li>
    //                                 ) : null
    //                             )}
    //                         </ul>
    //                     </div>
    //                 );
    //             },
    //         },
    //     },
    // };

    const topMedicinesColumns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            align: "right",
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => formatPrice(price),
        },
        {
            align: "center",
            title: "Total sold",
            dataIndex: "totalQuantity",
            key: "totalQuantity",
        },
    ];

    return (
        <>
            <div style={{minHeight: 360}}>
                <Typography.Title style={{marginTop: 0, marginBottom: 30}} level={2}>Statistic</Typography.Title>
                <Flex align="center" gap={10}>
                    <Typography.Text>Choose Date:</Typography.Text>
                    <Select value={date} onChange={setDate} style={{width: 200}}>
                        <Select.Option value="day">Today</Select.Option>
                        <Select.Option value="week">This week</Select.Option>
                        <Select.Option value="month">This month</Select.Option>
                        <Select.Option value="year">This year</Select.Option>
                    </Select>
                    <Typography.Text strong style={{fontSize: 20}}>
                        {dayjs(renderDate(date).startDate).format("DD/MM/YYYY")}
                        {" ~ "}
                        {dayjs(renderDate(date).endDate).format("DD/MM/YYYY")}
                    </Typography.Text>
                </Flex>
                <Divider/>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8}>
                        <Card
                            loading={loading}
                            title="Total order"
                            bordered={false}
                            style={{height: "100%"}}
                        >
                            <ShoppingCartOutlined style={{fontSize: 32, marginRight: 8}}/>
                            <span style={{fontSize: 24}}>{statistic?.totalOrder}</span>
                            <span style={{fontSize: 16}}> order</span>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Card
                            loading={loading}
                            title="Total revenue"
                            bordered={false}
                            style={{height: "100%"}}
                        >
                            <DollarCircleOutlined style={{fontSize: 32, marginRight: 8}}/>
                            <span style={{fontSize: 24}}>
                                {formatPrice(statistic?.totalRevenue)}
                            </span>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Card
                            loading={loading}
                            title="Total new patient"
                            bordered={false}
                            style={{height: "100%"}}
                        >
                            <UserAddOutlined style={{fontSize: 32, marginRight: 8}}/>
                            <span style={{fontSize: 24}}>{statistic?.totalPatient}</span>
                            <span style={{fontSize: 16}}> patient</span>
                        </Card>
                    </Col>
                </Row>
                <Card
                    title="Most sold medicines"
                    bordered={false}
                    style={{marginTop: 24}}
                >
                    <Table
                        loading={loading}
                        rowKey="_id"
                        columns={topMedicinesColumns}
                        dataSource={statistic?.listTopMedicine}
                        pagination={false}
                    />
                </Card>
                {/*<Row gutter={[16, 16]}>*/}
                {/*    <Col xs={24} sm={24} md={12}>*/}
                {/*        <Card*/}
                {/*            title={`Revenue chart by day of the month ${*/}
                {/*                dayjs().month() + 1*/}
                {/*            }`}*/}
                {/*            bordered={false}*/}
                {/*            style={{height: 400}}*/}
                {/*        >*/}
                {/*            <Line {...lineChartConfig} />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*    <Col xs={24} sm={24} md={12}>*/}
                {/*        <Card*/}
                {/*            title={`Revenue chart by month of the year ${dayjs().year()}`}*/}
                {/*            bordered={false}*/}
                {/*            style={{height: 400}}*/}
                {/*        >*/}
                {/*            <Column {...columnChartConfig} />*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </div>
        </>
    )
}

export default Statistic;