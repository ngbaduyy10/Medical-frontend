import { Button, Popconfirm, Space, Tag, Typography } from "antd";
import { ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { STATUS_BOOKING_COLOR } from "../../utils/constant";
import UserItem from "../../components/userItem/userItem";
import dayjs from "dayjs";

const columnsTable = (handleEnterExamination) => {
    return [
        {
            title: () => <div style={{ textAlign: "center" }}>#</div>,
            dataIndex: "index",
            key: "index",
            align: "center",
            ellipsis: true,
            width: 30,
            render: (text, record, index) => (
                <Typography.Text strong style={{ fontSize: 17 }}>
                    {index + 1}
                </Typography.Text>
            ),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Date</div>,
            dataIndex: "date",
            key: "date",
            width: 90,
            align: "center",
            render: (date) => dayjs(date).format("DD/MM/YYYY"),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Time</div>,
            dataIndex: "time",
            width: 60,
            key: "time",
            align: "center",
            render: (time) => dayjs(time, "HH:mm").format("HH:mm"),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Specialty</div>,
            dataIndex: "specialtyId",
            width: 80,
            key: "specialtyId",
            align: "center",
            render: (specialtyId) => specialtyId.name,
        },
        {
            width: 170,
            title: () => <div style={{ textAlign: "center" }}>Patient</div>,
            dataIndex: "patient",
            key: "patient",
            render: (patient) => {
                return <UserItem user={patient} />;
            },
        },
        {
            width: 170,
            title: () => <div style={{ textAlign: "center" }}>Doctor</div>,
            dataIndex: "doctor",
            key: "doctor",
            render: (doctor) => {
                return <UserItem user={doctor} />;
            },
        },
        {
            width: 80,
            title: () => <div style={{ textAlign: "center" }}>Status</div>,
            align: "center",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                return (
                    <Tag color={STATUS_BOOKING_COLOR[status]}>{status.toUpperCase()}</Tag>
                );
            },
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Action</div>,
            width: 150,
            key: "action",
            align: "center",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        icon={<CheckCircleOutlined style={{ color: "green" }} />}
                        title="Add to waiting list ?"
                        placement="topRight"
                        description={
                            <>
                                <Typography.Text>Time: </Typography.Text>{" "}
                                <strong>
                                    {dayjs(record.date).format("DD/MM/YYYY")} - {record.time}
                                </strong>
                            </>
                        }
                        onConfirm={() => handleEnterExamination(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<ArrowRightOutlined />}>Add to waiting</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]
}

export default columnsTable;