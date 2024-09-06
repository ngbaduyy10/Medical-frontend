import {Button, Flex, Form, Input, Typography} from "antd";
import {LockOutlined} from "@ant-design/icons";
import {notification} from "antd";
import {changePassword} from "../../services/password.service";

function ChangePassword () {
    const onFinish = async (data) => {
        const response = await changePassword(data);
        if (response.code === 200) {
            notification.success({
                message: "Success",
                description: response.message,
            });
        } else {
            notification.error({
                message: "Error",
                description: response.message,
            });
        }
    }

    return (
        <>
            <Flex
                justify={"center"}
                align={"center"}
                style={{
                    width: "100%",
                }}
            >
                <Form
                    name="change-password"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        width: "450px",
                        padding: "20px",
                    }}
                    onFinish={onFinish}
                >
                    <Typography.Title level={3} style={{ margin: "0 0 18px", textAlign: "center" }}>
                        Change Password
                    </Typography.Title>

                    <Form.Item
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Old Password" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters',
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="New Password" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Passwords do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" style={{width: "100%", marginBottom: "10px"}}>
                            Change
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    )
}

export default ChangePassword;