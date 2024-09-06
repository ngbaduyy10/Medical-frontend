import { Button, Popconfirm, Space, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {medicineUsage} from "../../utils/constant";

const columnsTable = (handleEdit, handleRemoveMedicine) => {
    return [
        {
            title: () => <div style={{ textAlign: "center" }}>Medicine Name</div>,
            dataIndex: "name",
            key: "name",
        },
        {
            width: 120,
            title: () => <div style={{ textAlign: "center" }}>Usage</div>,
            dataIndex: "usage",
            key: "usage",
            align: "center",
            render: (usage) => {
                return medicineUsage(usage);
            },
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Quantity</div>,
            dataIndex: "quantity",
            key: "quantity",
            width: 80,
            align: "center",
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Action</div>,
            width: 120,
            key: "action",
            align: "center",
            render: (_, record) => {
                return (
                    <Space>
                        <Tooltip title="Edit">
                            <Button
                                size="small"
                                onClick={() => handleEdit(record)}
                                icon={<EditOutlined />}
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Popconfirm
                                title="Do you want to delete this medicine?"
                                okText="Yes"
                                cancelText="Cancel"
                                onConfirm={() => handleRemoveMedicine(record)}
                            >
                                <Button
                                    danger
                                    size="small"
                                    icon={<DeleteOutlined color="red" />}
                                />
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ]
}

export default columnsTable;