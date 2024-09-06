import {notification, Table} from "antd";
import columnsTable from "./columnsTable";
import {useEffect, useState} from "react";
import {getAppointments, deleteAppointment} from "../../services/appointment.service";

function ScheduleTable ({showModal, setShowModal, setAppointmentInfo}) {
    const [reload, setReload] = useState(false);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAppointments();
            if (response.code === 200) {
                setAppointments(response.data);
            } else {
                notification.error({message: "Error", description: response.message});
            }
        }

        fetchApi();
    }, [showModal, reload]);


    const handleEditAppointment = (record) => {
        setShowModal(true);
        setAppointmentInfo(record);
    }

    const handleDeleteAppointment = async (record) => {
        const response = await deleteAppointment(record._id);
        if (response.code === 200) {
            notification.success({message: "Success", description: response.message});
            setReload(!reload);
        } else {
            notification.error({message: "Error", description: response.message});
        }
    }

    return (
        <>
            <Table
                rowKey="_id"
                columns={columnsTable(handleEditAppointment, handleDeleteAppointment)}
                dataSource={appointments}
            />
        </>
    )
}

export default ScheduleTable;