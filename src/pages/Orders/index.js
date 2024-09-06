import {Button, DatePicker, Flex, Typography, notification, Table, Input} from "antd";
import {CalendarOutlined, RightCircleOutlined, SearchOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getListOrders} from "../../services/order.service";
import columnsTable from "./columnsTable";
import PrescriptionModal from "../../components/prescriptionModal/prescriptionModal";
import ViewOrderModal from "../../components/viewOrderModal/viewOrderModal";

function Orders () {
    const user = useSelector(state => state.setUserReducer);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [selectedDate, setSelectedDate] = useState(null);
    const [listOrders, setListOrders] = useState([]);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [showBill, setShowBill] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getListOrders({
                    date: selectedDate,
                    keyword: keyword,
                    skip: (pagination.current - 1) * pagination.pageSize,
                    limit: pagination.pageSize,
                });
                if (response.code === 200) {
                    setListOrders(response.data);
                } else {
                    notification.error({message: response.message});
                }
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        }

        fetchApi();
    }, [pagination, keyword, reload, selectedDate]);

    const handleChangeTable = (pagination) => {
        setPagination(pagination);
    }

    const handleCancelPrescription = () => {
        setShowPrescriptionModal(false);
        setSelectedOrder(null);
    }

    const handleShowPrescription = (record) => {
        setShowPrescriptionModal(true);
        setSelectedOrder(record);
    }

    const handleShowBill = (record) => {
        setShowBill(true);
        setSelectedOrder(record);
    }

    const handleCancelBill = () => {
        setShowBill(false);
        setSelectedOrder(null);
    }

    return (
        <>
            <Typography.Title level={2}>Orders</Typography.Title>
            <Flex align="center" justify="space-between" style={{marginBottom: '20px'}}>
                <Flex gap='5px'>
                    <Input
                        placeholder="Search"
                        style={{ borderRadius: '20px' }}
                        size="large"
                        onChange={(e) => setKeyword(e.target.value)}
                        onPressEnter={() => setReload(!reload)}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SearchOutlined />}
                        size="large"
                        onClick={() => setReload(!reload)}
                    />
                </Flex>
                <Flex align="center" gap={10}>
                    <Button
                        onClick={() => setSelectedDate(null)}
                    >
                        All
                    </Button>
                    <Button
                        type="primary"
                        icon={<CalendarOutlined />}
                        onClick={() => setSelectedDate(dayjs())}
                    >
                        Today
                    </Button>
                    <Button
                        icon={<RightCircleOutlined />}
                        onClick={() => setSelectedDate(dayjs(selectedDate).add(1, "day"))}
                        disabled={!selectedDate}
                    >
                        Tomorrow
                    </Button>
                    <DatePicker
                        value={selectedDate}
                        format={"DD/MM/YYYY"}
                        onChange={(date) => setSelectedDate(date)}
                    />
                </Flex>
            </Flex>
            <Table
                rowKey={"_id"}
                dataSource={listOrders}
                columns={columnsTable(handleShowBill, handleShowPrescription)}
                loading={loading}
                pagination={pagination}
                onChange={handleChangeTable}
               scroll={{ x: 1300 }}
            />
            <PrescriptionModal
                sales={user}
                selectedOrder={selectedOrder}
                visible={showPrescriptionModal}
                onCancel={handleCancelPrescription}
            />
            <ViewOrderModal
                selectedOrder={selectedOrder}
                visible={showBill}
                handleCancel={handleCancelBill}
                footer
            />
        </>
    );
}

export default Orders;