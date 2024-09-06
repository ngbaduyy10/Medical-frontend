import {useEffect, useState} from "react";
import {Button, DatePicker, Flex, notification, Table, Typography, Alert} from "antd";
import columnsTable from "./columnsTable";
import {getListAppointments} from "../../services/appointment.service";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CalendarOutlined, RightCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {updateStatusAppointment} from "../../services/appointment.service";

function Examination () {
    const user = useSelector(state => state.setUserReducer);
    const navigate = useNavigate();
    const [listAppointments, setListAppointments] = useState([]);
    const [patientExamining, setPatientExamining] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getListAppointments({
                    doctor: user.id,
                    date: selectedDate,
                    status: 'waiting',
                });
                if (response.code === 200) {
                    setListAppointments(response.data);
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
    }, [selectedDate, user.id]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListAppointments({
                doctor: user.id,
                status: 'examining',
            });
            if (response.code === 200) {
                setPatientExamining(response.data.length > 0 ? response.data[0] : null);
            } else {
                notification.error({
                    message: response.message,
                });
            }
        }

        fetchApi();
    }, [user.id])

    const handleExamination = async (record) => {
        if (patientExamining) {
            notification.error({
                message: "Error",
                description: "You are examining another patient",
            });
        } else {
            try {
                const response = await updateStatusAppointment({
                   id: record._id,
                   status: 'examining',
                });
                if (response.code === 200) {
                    navigate(`/examination/${record._id}`);
                } else {
                    notification.error({
                        message: response.message,
                    });
                }
            } catch(error) {
                notification.error({
                    message: "Error",
                    description: error.message,
                });
            }
        }
    }

    return (
        <>
            <Flex align="center" justify="space-between" style={{marginBottom: '20px'}}>
                <Typography.Title level={2}>Examination</Typography.Title>
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
            {patientExamining && (
                <Alert
                    showIcon
                    message={`Patient: ${patientExamining.patient.fullName}`}
                    type="warning"
                    action={
                        <Button
                            style={{marginLeft: 10}}
                            type="link"
                            size="small"
                            onClick={() => {
                                navigate(`/examination/${patientExamining._id}`);
                            }}
                        >
                            Examining
                        </Button>
                    }
                />

            )}
            <Table rowKey={"_id"} dataSource={listAppointments} columns={columnsTable(handleExamination)} loading={loading} />
        </>
    )
}

export default Examination;