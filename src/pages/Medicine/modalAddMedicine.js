import {Modal, Form, Input, InputNumber, Radio, Typography, notification} from "antd";
import {useEffect} from "react";
import {createMedicine, updateMedicine} from "../../services/medicine.service";

function ModalAddMedicine ({showModal, setShowModal, selectedMedicine, reload, setReload}) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedMedicine && showModal) {
            form.setFieldsValue(selectedMedicine);
        }
    }, [form, selectedMedicine, showModal]);

    const handleOk = async () => {
        try {
            let response = {};
            const value = await form.validateFields();
            if (selectedMedicine) {
                response = await updateMedicine(selectedMedicine._id, value);
            } else {
                response = await createMedicine(value);
            }
            if (response.code === 200) {
                notification.success({
                    message: response.message,
                });
                handleCancel();
                setReload(!reload);
            } else {
                notification.error({
                    message: "Error",
                    description: response.message,
                });
            }
        } catch(error) {
            notification.error({
                message: "Error",
                description: error.message,
            });
        }
    }

    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
    }

    return (
        <>
            <Modal
                open={showModal}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={selectedMedicine ? "Update" : "Add"}
                cancelText="Cancel"
            >
                <Typography.Title level={3} style={{ margin: "0 0 18px", textAlign: "center" }}>
                    {selectedMedicine ? "Update Medicine" : "Add Medicine"}
                </Typography.Title>
                <Form
                    form={form}
                    labelCol={{ span: 5 }}
                    initialValues={{
                        usage: "before",
                    }}
                    labelAlign="left"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input medicine name" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Total Quantity"
                        name="totalQuantity"
                        rules={[{ required: true, message: "Please input quantity" }]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                type: "number",
                            },
                            { required: true, message: "Please input price" },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Usage"
                        name="usage"
                        rules={[{ required: true, message: "Please select medicine usage" }]}
                    >
                        <Radio.Group>
                            <Radio value="before">Before meal</Radio>
                            <Radio value="after">After meal</Radio>
                            <Radio value="both">Both</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Note"
                        name="note"
                        rules={[{ message: "Please input note" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ message: "Please input description" }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAddMedicine;