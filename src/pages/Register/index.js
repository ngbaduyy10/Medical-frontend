import {Flex, Form, Button, Input, Typography, notification} from "antd";
import {UserOutlined, LockOutlined, PhoneOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
import {register} from "../../services/auth.service";
import {setUser} from "../../actions/user.action";

function Register () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (data) => {
        const response = await register(data);
        if (response.code === 400) {
            notification.error({
                message: "Error",
                description: response.message,
            });
        } else {
            localStorage.setItem("token", response.token);
            dispatch(setUser(response.user))
            navigate("/", {replace: true});
        }
    }

    return (
        <>
            <Flex
                justify={"center"}
                align={"center"}
                style={{
                    width: "100%",
                    height: "100vh",
                }}
            >
                <Form
                    name="register"
                    initialValues={{
                        remember: true,
                    }}
                    style={{
                        width: "450px",
                        border: "1px solid #ddd",
                        borderRadius: 12,
                        padding: "20px",
                    }}
                    onFinish={onFinish}
                >
                    <Typography.Title level={3} style={{ margin: "0 0 18px", textAlign: "center" }}>
                        Register
                    </Typography.Title>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please input your phone number!",
                            },
                            {
                                pattern: new RegExp(/^\d{10,12}$/),
                                message: "Invalid phone number!",
                            }
                        ]}
                    >
                        <Input prefix={<PhoneOutlined />} size="large" placeholder="Phone" />
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
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
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
                            Register
                        </Button>
                        <Link to="/login" style={{fontSize: "17px"}}>Login</Link>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    )
}

export default Register;