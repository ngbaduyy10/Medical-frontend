import { Button, Popconfirm, Tooltip, Typography, Flex, notification, Table, Descriptions, Tag } from 'antd';
import { CheckCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom';
import {getListAppointments, updateStatusAppointment} from '../../services/appointment.service';
import {getListMedicalRecord} from '../../services/medicalRecord.service';
import {useState, useEffect} from "react";
import columnsTable from "./columnsTable";
import { STATUS_BOOKING_COLOR } from "../../utils/constant";
import dayjs from "dayjs";
import MedicineModal from "../../components/medicineModal/medicineModal";
import MedicalRecordModal from "../../components/medicalRecordModal/medicalRecordModal";
import {createOrder} from "../../services/order.service";

function ExaminationDetail () {
    const navigate = useNavigate();
    const params = useParams();
    const { id: appointmentId } = params;

    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [examinationHistory, setExaminationHistory] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showMedicineModal, setShowMedicineModal] = useState(false);
    const [showMedicalModal, setShowMedicalModal] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getListAppointments({id: appointmentId});
                if (response.code === 200) {
                    setSelectedAppointment(response.data[0]);
                } else {
                    notification.error({
                        message: 'Error',
                        description: response.message,
                    });
                }
            } catch(error) {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            }
        }

        fetchApi();
    }, [appointmentId, reload]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getListMedicalRecord({patient: selectedAppointment?.patient._id});
                if (response.code === 200) {
                    setExaminationHistory(response.data);
                } else {
                    notification.error({
                        message: 'Error',
                        description: response.message,
                    });
                }
            } catch(error) {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            }
            setLoading(false);
        }

        fetchApi();
    }, [selectedAppointment, reload]);

    const handleFinishExamination = async () => {
        try {
            await updateStatusAppointment({
                id: appointmentId,
                status: 'finished',
            });
            const response = await createOrder({
                medicalRecord: result._id,
                patient: result.patient,
                medicines: result.medicines,
            });
            if (response.code !== 200) {
                notification.error({
                    message: 'Error',
                    description: 'Create order failed',
                });
                return;
            }
            navigate("/examination");
            notification.success({
                message: 'Success',
                description: 'Finish examination successfully',
            });
        } catch(error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }
    }

    const handleMedicineModal = (record) => {
        setSelectedRecord(record);
        setShowMedicineModal(true);
    }

    const handleEditRecord = (record) => {
        setSelectedRecord(record);
        setShowMedicalModal(true);
    }

    const handleCancelMedicineModal = () => {
        setShowMedicineModal(false);
        setSelectedRecord(null);
    }

    const handleCancelMedicalRecord = () => {
        setShowMedicalModal(false);
        setSelectedRecord(null);
    }

    return (
        <>
            <Flex align="center" justify="space-between" style={{marginBottom: '20px'}}>
                <Flex align="center" gap={20}>
                    <Tooltip title="Back">
                        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
                    </Tooltip>
                    <Typography.Title style={{ margin: 0 }} level={2}>Examination Detail</Typography.Title>
                </Flex>

                <Flex justify="end" style={{ flex: "1 1" }}>
                    <Popconfirm
                        title="Confirm finish examination"
                        okText="Confirm"
                        cancelText="Cancel"
                        onConfirm={handleFinishExamination}
                    >
                        <Tooltip
                            title={
                                !selectedAppointment?.isExamined ? "No examination result" : "Finish examination"
                            }
                        >
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                style={{
                                    backgroundColor: selectedAppointment?.isExamined ? "green" : "white",
                                }}
                                disabled={!selectedAppointment?.isExamined}
                            >
                                Finish Examination
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                </Flex>
            </Flex>

            <Typography.Title level={4}>Patient Information</Typography.Title>
            <Descriptions column={2} bordered>
                <Descriptions.Item label="Patient" style={{ fontWeight: "bold" }}>
                    {selectedAppointment?.patient?.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Birthday">
                    {`${dayjs(selectedAppointment?.patient?.birthday).format("DD/MM/YYYY")}- ${dayjs().diff(selectedAppointment?.patient?.birthday, "year")} years old`}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                    {selectedAppointment?.patient?.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Time">
                    {dayjs(selectedAppointment?.date).format("DD/MM/YYYY")} | {selectedAppointment?.time}
                </Descriptions.Item>
                <Descriptions.Item label="Specialty">
                    {selectedAppointment?.specialtyId.name}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <Tag color={STATUS_BOOKING_COLOR[selectedAppointment?.status]}>
                        {selectedAppointment?.status.toUpperCase()}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>

            <Flex align="center" justify="space-between" style={{marginBottom: '20px'}}>
                <Typography.Title level={4}>Examination History</Typography.Title>
                <Button
                    type="primary"
                    onClick={() => setShowMedicalModal(true)}
                >
                    Examination Result
                </Button>
            </Flex>
            <Table
                rowKey="_id"
                dataSource={examinationHistory}
                columns={columnsTable(handleMedicineModal, handleEditRecord)}
                loading={loading}
            />
            <MedicineModal selectedRecord={selectedRecord} open={showMedicineModal} onCancel={handleCancelMedicineModal} />
            <MedicalRecordModal
                appointmentId={appointmentId}
                selectedRecord={selectedRecord}
                visible={showMedicalModal}
                onCancel={handleCancelMedicalRecord}
                reload={reload}
                setReload={setReload}
                setResult={setResult}
            />
        </>
    )
}

export default ExaminationDetail;