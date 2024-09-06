import dayjs from "dayjs";
import { Button, Tooltip, Space } from "antd";
import { EyeOutlined, MinusOutlined, FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import UserItem from "../../components/userItem/userItem";

const columnsTable = (handleMedicineModal, handleViewOrder) => {
    return [
        {
            title: () => <div style={{ textAlign: "center" }}>Date</div>,
            dataIndex: "createdAt",
            key: "createdAt",
            width: 110,
            render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Doctor</div>,
            dataIndex: "doctor",
            key: "doctor",
            width: 170,
            render: (doctor) => {
                return <UserItem user={doctor} showSpecialty /> ;
            },
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Result</div>,
            dataIndex: "result",
            key: "result",
            width: 200,
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Note</div>,
            dataIndex: "note",
            key: "note",
            width: 200,
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Medicines</div>,
            dataIndex: "medicines",
            key: "medicines",
            align: "center",
            width: 70,
            render: (medicines, record) => {
                return medicines.length > 0 ? (
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleMedicineModal(record)}
                    />
                ) : (
                    <Tooltip title="Nothing">
                        <MinusOutlined />
                    </Tooltip>
                );
            },
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Action</div>,
            key: "action",
            dataIndex: "action",
            align: "center",
            width: 80,
            render: (_, record) => {
                return (record.status === "medicine" ? (
                    <Space>
                        <Tooltip title="View Order">
                            <Button
                                icon={<FileDoneOutlined />}
                                onClick={() => handleViewOrder(record)}
                            />
                        </Tooltip>
                    </Space>
                ) : (
                    <Tooltip title="No bill yet"><InfoCircleOutlined style={{ fontSize: '18px' }}/></Tooltip>
                    )
                );
            },
        },
    ]
}

export default columnsTable;