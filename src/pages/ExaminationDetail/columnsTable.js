import { Button, Space, Tooltip } from "antd";
import { EyeOutlined, EditOutlined, MinusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import UserItem from "../../components/userItem/userItem";

const columnsTable = (handleMedicineModal, handleEditRecord) => {
    return [
        {
            title: () => <div style={{ textAlign: "center" }}>Date</div>,
            dataIndex: "createdAt",
            key: "createdAt",
            width: 120,
            align: "center",
            render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
        },
        {
            width: 180,
            title: () => <div style={{ textAlign: "center" }}>Doctor</div>,
            dataIndex: "doctor",
            key: "doctor",
            render: (doctor) => {
                return <UserItem user={doctor} showSpecialty />;
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
            align: "center",
            title: () => <div style={{ textAlign: "center" }}>Medicines</div>,
            dataIndex: "medicines",
            key: "medicines",
            width: 80,
            render: (medicines, record) => {
                return medicines.length > 0 ? (
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleMedicineModal(record)}
                    />
                ) : (
                    <Tooltip title="Trống">
                        <MinusOutlined />
                    </Tooltip>
                );
            },
        },
        {
            width: 80,
            title: () => <div style={{ textAlign: "center" }}>Action</div>,
            key: "action",
            align: "center",
            render: (_, record) => {
                return record.status === 'medicine' ? null : (
                    <Space>
                        <Tooltip title="Edit">
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => handleEditRecord(record)}
                            />
                        </Tooltip>
                    </Space>
                );
            },
        },
    ]
}

export default columnsTable;