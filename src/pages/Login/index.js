import { Flex, Button, Form, Input, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/auth.service';
import {setUser} from "../../actions/user.action";

function Login () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (data) => {
        const response = await login(data);
        if (response.code === 400) {
            notification.error({
                message: "Error",
                description: response.message,
            });
        } else {
            localStorage.setItem("token", response.token);
            dispatch(setUser(response.user));
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
                    name="login"
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
                        Login
                    </Typography.Title>

                    <Form.Item
                        name="user"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email or phone!',
                            }
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email/Phone" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" style={{width: "100%", marginBottom: "10px"}}>
                            Login
                        </Button>
                        <Link to="/register" style={{fontSize: "17px"}}> Register</Link>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    )
}

export default Login;