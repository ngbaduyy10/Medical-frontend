import {Button, Space, Tag, Typography} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import {STATUS_BOOKING_COLOR} from "../../utils/constant";
import dayjs from "dayjs";

const columnsTable = (handleExamination) => {
    return [
        {
            title: () => <div style={{ textAlign: "center" }}>#</div>,
            dataIndex: "index",
            key: "index",
            align: "center",
            width: 70,
            render: (text, record, index) => (
                <Typography.Text strong style={{ fontSize: 17 }}>
                    {index + 1}
                </Typography.Text>
            ),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Date</div>,
            dataIndex: "date",
            ellipsis: true,
            key: "date",
            align: "center",
            width: 150,
            render: (date) => dayjs(date).format("DD/MM/YYYY"),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Time</div>,
            ellipsis: true,
            dataIndex: "time",
            width: 100,
            key: "time",
            align: "center",
            render: (time) => dayjs(time, "HH:mm").format("HH:mm"),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Patient</div>,
            ellipsis: true,
            width: 200,
            dataIndex: "patient",
            key: "patient",
            render: (patient) => {
                return patient.fullName;
            },
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Date of Birth</div>,
            width: 200,
            dataIndex: "birthday",
            key: "birthday",
            render: (birthday, record) => (
                <span>
                    {dayjs(record?.patient?.birthday).format("DD/MM/YYYY")}-{" "}
                    {dayjs().diff(record?.patient?.birthday, "year")} years old
                </span>
            ),
        },
        {
            title:() => <div style={{ textAlign: "center" }}>Phone</div>,
            width: 150,
            dataIndex: "phone",
            key: "phone",
            align: "center",
            render: (_, record) => {
                return record?.patient.phone;
            },
        },
        {
            width: 100,
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
            key: "action",
            align: "center",
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<CaretRightOutlined />}
                        onClick={() => handleExamination(record)}
                    >
                        Examine
                    </Button>
                </Space>
            ),
        },
    ]
}

export default columnsTable;