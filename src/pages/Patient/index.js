import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getListMedicalRecord} from "../../services/medicalRecord.service";
import {getUserById} from "../../services/user.service";
import {notification, Table, Descriptions, Tag, Tooltip, Button, Typography, Flex} from "antd";
import columnsTable from "../MedicalRecord/columnsTable";
import dayjs from "dayjs";
import {ArrowLeftOutlined} from "@ant-design/icons";
import MedicineModal from "../../components/medicineModal/medicineModal";
import {getListOrders} from "../../services/order.service";
import ViewOrderModal from "../../components/viewOrderModal/viewOrderModal";

function Patient () {
    const navigate = useNavigate();
    const params = useParams();
    const { id: userId } = params;
    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showMedicineModal, setShowMedicineModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewOrder, setShowViewOrder] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getListMedicalRecord({patient: userId});
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
    }, [userId])

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getUserById(userId);
                if (response.code === 200) {
                    setSelectedUser(response.data);
                } else {
                    notification.error({message: response.message});
                }
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: error.message,
                });
            }
        }

        fetchApi();
    }, [userId]);

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
            console.log(record);
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
            <Flex align="center" gap={20}>
                <Tooltip title="Back">
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
                </Tooltip>
                <Typography.Title level={2}>Patient Detail</Typography.Title>
            </Flex>
            <div>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="Patient" style={{fontWeight: "bold"}}>
                        {selectedUser?.fullName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">
                        {dayjs(selectedUser?.birthday).format("DD/MM/YYYY")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                        {selectedUser?.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {selectedUser?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {selectedUser?.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender">
                        <Tag color={selectedUser?.gender === 'male' ? 'blue' : 'pink'}>
                            {selectedUser?.gender?.toUpperCase()}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <Typography.Title level={2}>Examination History</Typography.Title>
            <Table
                rowKey={"_id"}
                dataSource={records}
                columns={columnsTable(handleMedicineModal, handleViewOrder)}
                loading={loading}
            />
            <MedicineModal selectedRecord={selectedRecord} open={showMedicineModal} onCancel={handleCancelMedicineModal} />
            <ViewOrderModal selectedOrder={selectedOrder} visible={showViewOrder} handleCancel={handleCancelViewOrder} />
        </>
    );
}

export default Patient;