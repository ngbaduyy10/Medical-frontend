import {Button, DatePicker, Flex, notification, Table, Typography} from "antd";
import {CalendarOutlined, RightCircleOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import columnsTable from "./columnsTable";
import {getListAppointments, updateStatusAppointment} from "../../services/appointment.service";

function AppointmentsPatient () {
    const [selectedDate, setSelectedDate] = useState(null);
    const [listAppointments, setListAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getListAppointments({
                    date: selectedDate,
                    status: 'booked',
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
    }, [selectedDate, reload]);

    const handleEnterExamination = async (record) => {
        try {
            const response = await updateStatusAppointment({
                id: record._id,
                status: 'waiting',
            });
            if (response.code === 200) {
                notification.success({
                    message: `Patient ${record.patient.fullName} has entered the examination room`,
                });
                setReload(!reload);
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

    return (
        <>
            <Flex align="center" justify="space-between" style={{marginBottom: '20px'}}>
                <Typography.Title level={2}>Patient Appointments</Typography.Title>
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
            <Table rowKey={"_id"} dataSource={listAppointments} columns={columnsTable(handleEnterExamination)} loading={loading} />
        </>
    )
}

export default AppointmentsPatient;