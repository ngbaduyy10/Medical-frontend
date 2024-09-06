import dayjs from "dayjs";
import {Tag, Flex} from "antd";
import {Button, Popconfirm, Tooltip, Typography} from "antd";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {STATUS_BOOKING_COLOR} from "../../utils/constant";

const columnsTable = (handleEditAppointment, handleDeleteAppointment) => {
    const timeBeforeCurrent = (date, time, hours) => {
        const timeMedical = dayjs(`${dayjs(date).format("DD/MM/YYYY")} ${time}`, "DD/MM/YYYY HH:mm");
        const currentTime = dayjs();
        const adjustedCurrentTime = timeMedical.subtract(hours, "hour");
        return currentTime.isBefore(adjustedCurrentTime);
    }

    const editPermission = (record) => {
        return record.status === 'booked' && timeBeforeCurrent(record.date, record.time, 2) ? (
            <>
                <Tooltip title="Edit Appointment">
                    <Button
                        type="default"
                        size="small"
                        onClick={() => handleEditAppointment(record)}
                    >
                        <EditOutlined />
                    </Button>
                </Tooltip>
                <Popconfirm
                    icon={<DeleteOutlined style={{ color: "red" }} />}
                    title="Delete Appointment"
                    description={
                        <>
                            <Typography.Text>Do you want to delete this appointment</Typography.Text>
                        </>
                    }
                    onConfirm={() => handleDeleteAppointment(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Tooltip title="Delete Appointment">
                        <Button type="default" danger size="small">
                            <DeleteOutlined />
                        </Button>
                    </Tooltip>
                </Popconfirm>
            </>
        ) : (
            <Tooltip title="Cannot edit appointment">
                <Button type="text" icon={<InfoCircleOutlined />} />
            </Tooltip>
        );
    }

    return [
        {
            title: () => <div style={{textAlign: 'center'}}>Created At</div>,
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            width: 150,
            render: (createdAt) => {
                return dayjs(createdAt).format("DD/MM/YYYY - HH:mm:ss");
            },
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Date</div>,
            dataIndex: "date",
            key: "date",
            align: "center",
            width: 120,
            render: (date) => {
                return dayjs(date).format("DD/MM/YYYY");
            },
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Expected Time</div>,
            dataIndex: "time",
            align: "center",
            key: "time",
            width: 120,
            render: (time) => {
                return dayjs(time, "HH:mm").format("HH:mm");
            },
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Specialty</div>,
            dataIndex: "specialtyId",
            key: "specialtyId",
            align: "center",
            width: 150,
            render: (specialtyId) => {
                return specialtyId.name;
            },
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Doctor</div>,
            dataIndex: "doctor",
            key: "doctor",
            align: "center",
            width: 150,
            render: (doctor) => {
                return doctor?.fullName || "Not defined";
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 150,
            render: (status) => (
                <Tag color={STATUS_BOOKING_COLOR[status]}>{status.toUpperCase()}</Tag>
            )
        },
        {
            title: "Action",
            align: "center",
            width: 120,
            render: (_, record) => (
                <Flex gap={10} justify="center">{editPermission(record)}</Flex>
            )
        },
    ]
}

export default columnsTable;