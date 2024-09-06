import { Button, Popconfirm, Tooltip, Typography, Flex } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {formatPrice, medicineUsage} from "../../utils/constant";

const columnsTable = (filter, handleEdit, handleDelete) => {
    return [
        {
            title: () => <div style={{ textAlign: "center" }}>#</div>,
            dataIndex: "index",
            key: "index",
            align: "center",
            width: 50,
            fixed: "left",
            render: (text, record, index) => (
                <Typography.Text strong style={{ fontSize: 17 }}>
                    {index + 1}
                </Typography.Text>
            ),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Name</div>,
            dataIndex: "name",
            key: "name",
            width: 200,
            fixed: "left",
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Quantity</div>,
            dataIndex: "totalQuantity",
            key: "totalQuantity",
            width: 90,
            align: "center",
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Price</div>,
            dataIndex: "price",
            key: "price",
            width: 80,
            align: "center",
            render: function (text) {
                return formatPrice(text);
            },
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Usage</div>,
            dataIndex: "usage",
            key: "usage",
            width: 150,
            align: "center",
            filters: [
                {
                    text: "Before",
                    value: "before",
                },
                {
                    text: "After",
                    value: "after",
                },
                {
                    text: "Before / After",
                    value: "both",
                },
            ],
            filteredValue: filter.usage || null,
            render: (text) => medicineUsage(text),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Note</div>,
            dataIndex: "note",
            key: "note",
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <Typography.Paragraph ellipsis={{ rows: 2 }}>
                        {text}
                    </Typography.Paragraph>
                </Tooltip>
            ),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Description</div>,
            dataIndex: "description",
            key: "description",
            width: 200,
            render: (text) => (
                <Tooltip title={text}>
                    <Typography.Paragraph ellipsis={{ rows: 3 }}>
                        {text}
                    </Typography.Paragraph>
                </Tooltip>
            ),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Updated At</div>,
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 160,
            align: "center",
            render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Action</div>,
            dataIndex: "action",
            key: "action",
            width: 100,
            align: "center",
            fixed: "right",
            render: (text, record) => (
                <Flex gap={10}>
                    <Tooltip title="Edit">
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Do you want to delete?"
                        okText="Yes"
                        cancelText="Cancel"
                        onConfirm={() => handleDelete(record)}
                        placement="left"
                    >
                        <Tooltip title="Delete">
                            <Button type="primary" icon={<DeleteOutlined />} danger ghost />
                        </Tooltip>
                    </Popconfirm>
                </Flex>
            ),
        },
    ]
}

export default columnsTable;