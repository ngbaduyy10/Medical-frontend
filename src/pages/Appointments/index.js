import {Typography, Flex, Button} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";
import {useState} from "react";
import ScheduleTable from "../../components/scheduleTable/scheduleTable";
import AddAppointmentModal from "../../components/addApointmentModal/addAppointmentModal";

function Appointments () {
    const [showModal, setShowModal] = useState(false);
    const [appointmentInfo, setAppointmentInfo] = useState({});

    const handleClickAddAppointment = () => {
        setShowModal(true);
        setAppointmentInfo(null);
    }

    return (
        <>
            <Flex align="center" justify="space-between" style={{marginBottom: '20px'}}>
                <Typography.Title level={2}>Appointments</Typography.Title>
                <Button
                    type="primary"
                    icon={<PlusCircleFilled />}
                    onClick={handleClickAddAppointment}
                >
                    Add Appointment
                </Button>
            </Flex>

            <ScheduleTable showModal={showModal} setShowModal={setShowModal} setAppointmentInfo={setAppointmentInfo} />

            <AddAppointmentModal showModal={showModal} setShowModal={setShowModal} appointmentInfo={appointmentInfo} />
        </>
    );
}

export default Appointments;