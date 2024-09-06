import columnsTable from "./columnsTable";
import {getListMedicalRecord} from "../../services/medicalRecord.service";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Button, Flex, notification, Table, Typography, DatePicker} from "antd";
import {CalendarOutlined, RightCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import MedicineModal from "../../components/medicineModal/medicineModal";
import ViewOrderModal from "../../components/viewOrderModal/viewOrderModal";
import {getListOrders} from "../../services/order.service";

function MedicalRecord () {
    const user = useSelector(state => state.setUserReducer);
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showMedicineModal, setShowMedicineModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showViewOrder, setShowViewOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getListMedicalRecord({patient: user.id, date: selectedDate});
                if (response.code === 200) {
                    setRecords(response.data);
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
    }, [selectedDate, user])

    const handleMedicineModal = (record) => {
        setSelectedRecord(record);
        setShowMedicineModal(true);
    }

    const handleCancelMedicineModal = () => {
        setShowMedicineModal(false);
        setSelectedRecord(null);
    }

    const handleViewOrder = async (record) => {
        try {
            const response = await getListOrders({medicalRecord: record._id});
            if (response.code === 200) {
                setSelectedOrder(response.data[0]);
            } else {
                notification.error({message: response.message});
            }
            setShowViewOrder(true);
        } catch(error) {
            notification.error({message: "Error", description: error.message});
        }

    }

    const handleCancelViewOrder = () => {
        setShowViewOrder(false);
        setSelectedOrder(null);
    }

    return (
        <>
            <Flex align="center" justify="space-between" style={{marginBottom: '20px'}}>
                <Typography.Title level={2}>Medical Record</Typography.Title>
                <Flex align="center" gap={10}>
                    <Button onClick={() => setSelectedDate(null)}>
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
                    >
                        Tomorrow
                    </Button>
                    <DatePicker
                        value={selectedDate}
                        format="DD/MM/YYYY"
                        onChange={(date) => setSelectedDate(date)}
                    />
                </Flex>
            </Flex>
            <Table
                rowKey={"_id"}
                dataSource={records}
                columns={columnsTable(handleMedicineModal, handleViewOrder)}
                loading={loading}
            />
            <MedicineModal selectedRecord={selectedRecord} open={showMedicineModal} onCancel={handleCancelMedicineModal} />
            <ViewOrderModal selectedOrder={selectedOrder} visible={showViewOrder} handleCancel={handleCancelViewOrder} />
        </>
    )
}

export default MedicalRecord;