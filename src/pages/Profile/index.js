import {Form, Flex, Input, DatePicker, Select, Button, Typography, Upload, notification} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getUserById, updateUser} from "../../services/user.service";
const {Option} = Select;

function Profile () {
    const user = useSelector(state => state.setUserReducer);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [userProfile, setUserProfile] = useState({});
    const [imageUrl, setImageUrl] = useState();
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getUserById(user.id);
            if (response.code === 200) {
                setUserProfile({
                    ...response.data,
                    userType: response.data.userType.toUpperCase(),
                    birthday: dayjs(response.data.birthday)
                });
            } else if (response.code === 401) {
                navigate('/logout', {replace: true});
            }
        }

        fetchApi();
    }, [navigate, user]);

    useEffect(() => {
        form.setFieldsValue(userProfile);
        if (userProfile.photo) {
            setAvatar(userProfile.photo);
        }

    }, [userProfile, form]);

    const beforeUpload = async (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            notification.error({
                message: 'You can only upload JPG/PNG file!'
            });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            notification.error({
                message: 'Image must smaller than 2MB'
            });
        }
        setAvatar(URL.createObjectURL(file));
        setImageUrl(file);
        return false;
    };

    const onFinish = async (values) => {
        const data = {
            ...values,
            userType: values.userType.toLowerCase(),
            photo: imageUrl
        }
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        const response = await updateUser(formData);
        if (response.code === 200) {
            notification.success({
                message: response.message
            });
        } else if (response.code === 401) {
            navigate('/logout', {replace: true});
        }
    }

    return (
        <>
            <Typography.Title level={2} style={{margin: '0 0 30px'}}>USER PROFILE</Typography.Title>
            <Flex align="center">
                <Form
                    layout="vertical"
                    form={form}
                    name="update-account"
                    labelAlign="left"
                    style={{ width: "50%" }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Avatar"
                        name="photo"
                        valuePropName="photo"
                    >
                        <Upload
                            multiple={false}
                            name="photo"
                            listType="picture-circle"
                            showUploadList={false}
                            accept="image/png,image/jpeg,image/jpg"
                            beforeUpload={beforeUpload}
                        >
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                />
                            ) : (
                                <PlusOutlined />
                            )}
                        </Upload>
                    </Form.Item>

                    <Flex gap={20}>
                        <Form.Item
                            style={{ width: "50%" }}
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your full name!",
                                },
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "50%" }}
                            label="Email"
                            name="email"
                        >
                            <Input size="large" readOnly/>
                        </Form.Item>
                    </Flex>

                    <Flex gap={20}>
                        <Form.Item
                            label="Date of Birth"
                            name="birthday"
                            rules={[{ required: true, message: "Please input your date of birth!" }]}
                        >
                            <DatePicker format="DD/MM/YYYY" placeholder="Date of Birth" size="large" />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "30%" }}
                            label="Gender"
                            name="gender"
                            rules={[{ required: true, message: "Please select your gender" }]}
                        >
                            <Select size="large">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            style={{ width: "40%" }}
                            label="Phone"
                            name="phone"
                        >
                            <Input size="large" readOnly/>
                        </Form.Item>
                    </Flex>

                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: "Please input your address!"
                            }
                        ]}
                    >
                        <Input placeholder="Address" size="large" />
                    </Form.Item>

                    <Form.Item label="Role" name="userType" style={{width: '20%'}}>
                        <Input size="large" disabled />
                    </Form.Item>

                    <Flex justify={"space-between"} align={"center"}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">
                                Update
                            </Button>
                        </Form.Item>
                        <Link to="/change-password" style={{fontSize: "16px"}}> Change Password</Link>
                    </Flex>
                </Form>
            </Flex>
        </>
    )
}

export default Profile;