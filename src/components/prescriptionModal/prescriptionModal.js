import {Modal, Form, Input, Typography, Table, Radio, Flex, Button, notification} from "antd";
import {formatPrice} from "../../utils/constant";
import dayjs from "dayjs";
import columnsTable from "./columnsTable";
import Copy from "../Copy/copy";
import UserItem from "../userItem/userItem";
import {updateOrder} from "../../services/order.service";
import {updateMedicalRecord} from "../../services/medicalRecord.service";

function PrescriptionModal ({sales, selectedOrder, visible, onCancel}) {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const value = await form.validateFields();
            await updateMedicalRecord(selectedOrder.medicalRecord, {status: "medicine"})
            const response = await updateOrder(selectedOrder._id, {
                sales: sales.id,
                note: value.note,
                paymentMethod: value.paymentMethod,
            })
            if(response.code === 200) {
                notification.success({message: response.message});
                onCancel();
            } else {
                notification.error({message: response.message});
            }
        } catch(error) {
            notification.error({
                message: "Error",
                description: error.message,
            })
        }
    }

    return (
        <>
            <Modal
                open={visible}
                onOk={handleOk}
                onCancel={onCancel}
                okText="Confirm"
                cancelText="Cancel"
                centered
                width={800}
                styles={{
                    body: { height: "80vh", overflowY: "auto" },
                }}
            >
                <Typography.Title level={2} style={{textAlign: 'center', marginBottom: '30px'}}>Prescription Paying</Typography.Title>
                <Form
                    form={form}
                    labelAlign="left"
                    initialValues={{
                        fullName: selectedOrder?.patient.fullName,
                        phone: selectedOrder?.patient.phone,
                        birthday: dayjs(selectedOrder?.patient.birthday).format("DD/MM/YYYY"),
                        paymentMethod: "cash",
                    }}
                >
                    <Form.Item label="Order Number">
                        <Copy textCopy={selectedOrder?.orderNumber}>
                            <Button type="link">
                                {selectedOrder?.orderNumber}
                            </Button>
                        </Copy>
                    </Form.Item>

                    <Form.Item label="Patient" name="fullName" style={{width: '80%'}}>
                        <Input disabled />
                    </Form.Item>

                    <Flex gap={20}>
                        <Form.Item label="Phone" name="phone" style={{width: '30%'}}>
                            <Input disabled />
                        </Form.Item>

                        <Form.Item label="Date of Birth" name="birthday" style={{width: '45%'}}>
                            <Input disabled />
                        </Form.Item>
                    </Flex>

                    <Form.Item label="Doctor">
                        <UserItem user={selectedOrder?.medicalRecord.doctor} showSpecialty />
                    </Form.Item>

                    <Table
                        rowKey="medicineId"
                        columns={columnsTable()}
                        dataSource={selectedOrder?.medicines}
                        pagination={false}
                        scroll={{
                            x: 300,
                            y: 300,
                        }}
                        footer={() => (
                            <Flex
                                justify="flex-end"
                                align="center"
                                style={{ textAlign: "right", paddingRight: 70 }}
                            >
                                <b>Total Price: </b>{" "}
                                <Typography.Text
                                    style={{
                                        color: 'blue',
                                        width: 120,
                                        textAlign: "end",
                                        fontWeight: "bold",
                                        fontSize: 18,
                                    }}
                                >
                                    {formatPrice(selectedOrder.totalPrice)}
                                </Typography.Text>
                            </Flex>
                        )}
                    />

                    <Form.Item label="Note" name="note">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Payment Method"
                        name="paymentMethod"
                        valuePropName="value"
                        rules={[
                            { required: true, message: "Please choose payment method" },
                        ]}
                    >
                        <Radio.Group name="paymentMethod">
                            <Radio value="cash">Cash</Radio>
                            <Radio value="banking">Banking</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Sales">
                        <UserItem user={sales} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default PrescriptionModal;