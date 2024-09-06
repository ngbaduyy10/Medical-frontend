import { Table, Typography, Flex, Tag, Button, Modal } from "antd";
import { formatPrice } from "../../utils/constant";
import columnsTable from "./columnsTable";
import { PAYMENT_METHOD_COLOR, STATUS_ORDER_COLOR } from "../../utils/constant";
import dayjs from "dayjs";
import UserItem from "../userItem/userItem";

function ViewOrderModal ({selectedOrder, visible, handleCancel, footer}) {
    return (
        <>
            <Modal
                open={visible}
                onCancel={handleCancel}
                footer={
                    footer ? ([
                            <Button key="back" onClick={handleCancel}>
                                Close
                            </Button>,
                            <Button
                                key="submit"
                                type="primary"
                                onClick={() => window.print()}
                            >
                                Print Bill
                            </Button>,
                        ]) : null
                }
                centered
                width={800}
                styles={{
                    body: { height: "80vh", overflowY: "auto" },
                }}
            >
                <Typography.Title style={{marginBottom: 10, color: "blue"}} level={3}>{`Order: ${selectedOrder?.orderNumber}`}</Typography.Title>
                <Flex align="center" gap={10} style={{ width: "45%", marginBottom: 10 }}>
                    <Typography.Text style={{fontSize: 17}} strong>Date:</Typography.Text>
                    <Typography.Text>
                        {dayjs(selectedOrder?.createdAt).format("DD/MM/YYYY HH:mm")}
                    </Typography.Text>
                </Flex>
                <Flex gap={20} align="center" style={{marginBottom: 10}}>
                    <Flex align="center" gap={10}>
                        <Typography.Text style={{fontSize: 17}} strong>Doctor:</Typography.Text>
                        <UserItem user={selectedOrder?.medicalRecord.doctor} showSpecialty />
                    </Flex>
                    <Flex align="center" gap={10}>
                        <Typography.Text style={{fontSize: 17}} strong>Patient:</Typography.Text>
                        <UserItem user={selectedOrder?.patient} />
                    </Flex>
                </Flex>

                <Typography.Text style={{fontSize: 17}} strong>Medicine:</Typography.Text>
                <Table
                    rowKey="medicineId"
                    columns={columnsTable()}
                    dataSource={selectedOrder?.medicines}
                    pagination={false}
                    footer={() => (
                        <Flex
                            justify="flex-end"
                            align="center"
                            style={{ textAlign: "right" }}
                        >
                            <b>Total Price:</b>{" "}
                            <Typography.Text
                                style={{
                                    color: 'red',
                                    width: 120,
                                    textAlign: "end",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                }}
                            >
                                {formatPrice(selectedOrder?.totalPrice)}
                            </Typography.Text>
                        </Flex>
                    )}
                />
                <Flex gap={10} style={{ minHeight: 60 }}>
                    <Typography.Text style={{fontSize: 17}} strong>Note:</Typography.Text>
                    <Typography.Paragraph style={{fontSize: 17}}>{selectedOrder?.note || "None"}</Typography.Paragraph>
                </Flex>
                <Flex gap={10} style={{marginBottom: 10}}>
                    <Typography.Text style={{fontSize: 17}} strong>Payment method:</Typography.Text>
                    <Tag style={{fontSize: 17}} color={PAYMENT_METHOD_COLOR[selectedOrder?.paymentMethod]}>
                        {selectedOrder?.paymentMethod.toUpperCase()}
                    </Tag>
                </Flex>
                <Flex gap={10} style={{marginBottom: 10}}>
                    <Typography.Text style={{fontSize: 17}} strong>Status:</Typography.Text>
                    <Tag style={{fontSize: 17}} color={STATUS_ORDER_COLOR[selectedOrder?.status]}>
                        {selectedOrder?.status.toUpperCase()}
                    </Tag>
                </Flex>
                <Flex align="center" gap={10} style={{ width: "45%" }}>
                    <Typography.Text style={{fontSize: 17}} strong>Sales:</Typography.Text>
                    <UserItem user={selectedOrder?.sales} />
                </Flex>
            </Modal>
        </>
    )
}

export default ViewOrderModal;