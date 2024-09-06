import {Modal, Form, Input, Select, Typography, notification} from 'antd';
import {useState} from 'react';
import SpecialtySelect from "../../components/specialtySelect/specialtySelect";
import {createUser} from "../../services/user.service";
import {MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
const { Option } = Select;

function ModalAddUser ({showModal, setShowModal, reload, setReload}) {
    const [showSpecialty, setShowSpecialty] = useState(false);
    const [form] = Form.useForm();

    const handleUserTypeChange = (value) => {
        if (value === "doctor") {
            setShowSpecialty(true);
        } else {
            form.setFieldValue("specialtyId", null);
            setShowSpecialty(false);
        }
    }

    const handleCancel = () => {
        setShowModal(false);
        setShowSpecialty(false);
        form.resetFields();
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const response = await createUser(values);
            if (response.code === 200) {
                setShowSpecialty(false);
                setShowModal(false);
                form.resetFields();
                notification.success({
                    message: response.message,
                });
                setReload(!reload)
            } else {
                notification.error({
                    message: response.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            okText="Add"
            onOk={handleOk}
            cancelText="Cancel"
            onCancel={handleCancel}
            open={showModal}
            destroyOnClose
        >
            <Typography.Title level={3} style={{ margin: "0 0 18px", textAlign: "center" }}>
                Add User
            </Typography.Title>
            <Form
                layout="vertical"
                name="formAddUser"
                form={form}
                style={{ marginTop: 20 }}
            >
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your full name!",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} size='large' />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} size="large" />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!"
                        },
                        {
                            pattern: new RegExp(/^\d{10,12}$/),
                            message: "Invalid phone number!",
                        },
                    ]}
                >
                    <Input prefix={<PhoneOutlined />} size='large' />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="userType"
                    rules={[{ required: true, message: "Please choose user role" }]}
                >
                    <Select onChange={handleUserTypeChange} placeholder="Select Role">
                        <Option value="admin">Admin</Option>
                        <Option value="doctor">Doctor</Option>
                        <Option value="staff">Staff</Option>
                        <Option value="sales">Sales</Option>
                        <Option value="customer">Customer</Option>
                    </Select>
                </Form.Item>

                {showSpecialty && (
                    <Form.Item
                        label="Specialty"
                        name="specialtyId"
                        valuePropName="specialtyId"
                        rules={[
                            {
                                required: true,
                                message: "Please select your specialty!",
                            },
                        ]}
                    >
                        <SpecialtySelect />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
}

export default ModalAddUser;