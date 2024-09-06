import Copy from "../../components/Copy/copy";
import {Button, Tag, Tooltip} from "antd";
import { EyeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import UserItem from "../../components/userItem/userItem";
import {formatPrice, PAYMENT_METHOD_COLOR, STATUS_ORDER_COLOR} from "../../utils/constant";

const columnsTable = (handleShowBill, handleShowPrescription) => {
    return [
        {
            title: () => <div style={{ textAlign: "center" }}>Order Number</div>,
            dataIndex: "orderNumber",
            key: "orderNumber",
            width: 200,
            fixed: "left",
            render: (orderNumber, record) => (
                <Copy textCopy={orderNumber}>
                    <Button
                        onClick={() => handleShowBill(record)}
                        type="link"
                    >
                        {orderNumber}
                    </Button>
                </Copy>
            ),
        },
        {
            align: "center",
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 140,
            render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Sales</div>,
            dataIndex: "sales",
            key: "sales",
            width: 220,
            render: (sales) => {
                return sales && <UserItem user={sales} />;
            },
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Patient</div>,
            dataIndex: "patient",
            key: "patient",
            width: 220,
            render: (patient) => {
                return patient && <UserItem user={patient} />;
            },
        },
        {
            title: () => <div style={{ textAlign: "center" }}>Doctor</div>,
            width: 220,
            render: (_, record) => {
                return record?.medicalRecord.doctor && <UserItem user={record?.medicalRecord.doctor} showSpecialty />;
            },
        },
        {
            title: "Total Price",
            dataIndex: "totalPrice",
            key: "totalPrice",
            align: "center",
            width: 100,
            render: (totalPrice) => (
                <span style={{ fontWeight: "500" }}>{formatPrice(totalPrice)}</span>
            ),
        },
        {
            align: "center",
            title: "Payment",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
            width: 130,
            render: (paymentMethod) => (
                <Tag color={PAYMENT_METHOD_COLOR[paymentMethod]}>
                    {paymentMethod.toUpperCase()}
                </Tag>
            ),
        },
        {
            align: "center",
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (status) => (
                <Tag color={STATUS_ORDER_COLOR[status]}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            align: "center",
            title: "Action",
            key: "action",
            width: 100,
            fixed: "right",
            render: (_, record) => {
                return ( record.status === 'pending' ? (
                        <Tooltip title="Confirm Prescription">
                            <Button
                                icon={<CheckCircleOutlined />}
                                onClick={() => handleShowPrescription(record)}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Show Bill">
                            <Button
                                icon={<EyeOutlined />}
                                onClick={() => handleShowBill(record)}
                            />
                        </Tooltip>
                    )
                );
            },
        },
    ]
}

export default columnsTable;