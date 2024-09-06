import { Modal, Form, Input, Row, Col, TimePicker, Select, notification } from "antd";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {getUsers} from "../../services/user.service";
import {useSelector} from "react-redux";
import {createMeeting, updateMeeting} from "../../services/meeting.service";

const optionsRoom = [
    { value: "room1", label: "Room 1" },
    { value: "room2", label: "Room 2" },
    { value: "room3", label: "Room 3" },
];

function AddMeetingModal ({selectedMeeting, visible, handleCancel, reload, setReload}) {
    const user = useSelector(state => state.setUserReducer);
    const [form] = Form.useForm();
    const [keyword, setKeyword] = useState("");
    const [optionsDoctor, setOptionsDoctor] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getUsers({
                    userType: 'doctor',
                    keyword: keyword,
                })
                if (response.code === 200) {
                    const doctors = response.data.filter((item) => item._id !== user.id)
                    setOptionsDoctor(doctors.map(item => ({
                        value: item._id,
                        label: `${item.fullName} - ${item.phone}`
                    })));
                }
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: error.message,
                });

            }
        }

        fetchApi();
    }, [user, keyword]);

    useEffect(() => {
        if (selectedMeeting?._id) {
            form.setFieldsValue({
                subject: selectedMeeting?.subject,
                description: selectedMeeting?.description,
                startDate: dayjs(selectedMeeting?.startDate),
                endDate: dayjs(selectedMeeting?.endDate),
                room: selectedMeeting?.room,
                participants: selectedMeeting.participants,
            });
        } else{
            form.resetFields();
        }
    }, [selectedMeeting, form]);

    const handleOk = async () => {
        try {
            const value = await form.validateFields();
            value.owner = user.id;
            let response;
            if (selectedMeeting?._id) {
                response = await updateMeeting(selectedMeeting._id, value);
            } else {
                response = await createMeeting(value);
            }
            if (response.code === 200) {
                notification.success({
                    message: "Success",
                    description: response.message,
                });
                handleCancel();
                setReload(!reload);
            } else {
                notification.error({
                    message: "Error",
                    description: response.message,
                });
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.message,
            })
        }
    }

    return (
        <>
            <Modal
                title={selectedMeeting?._id ? "Edit Meeting" : "Create Meeting"}
                centered
                open={visible}
                okText={selectedMeeting?._id ? "Edit" : "Create"}
                cancelText="Cancel"
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose
                styles={{
                    body: {
                        height: "80vh",
                        paddingRight: 5,
                        overflowX: "hidden",
                        overflowY: "auto",
                    },
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Meeting subject"
                        name="subject"
                        rules={[{ required: true, message: "Please input meeting subject" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: "Please input description" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "16px" }}>
                        <Row gutter={16}>
                            <Col span={24} style={{marginBottom: "15px"}}>
                                <span style={{fontSize: "16px", fontWeight: 400}}>Date: </span>
                                <span>{dayjs(selectedMeeting?.startDate).format("DD/MM/YYYY")}</span>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Start time"
                                    name="startDate"
                                    rules={[{ required: true, message: "Please choose start time" }]}
                                >
                                    <TimePicker
                                        format="HH:mm"
                                        style={{ width: "100%" }}
                                        minuteStep={15}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="End time"
                                    name="endDate"
                                    rules={[{ required: true, message: "Please choose start time" }]}
                                >
                                    <TimePicker
                                        format="HH:mm"
                                        style={{ width: "100%" }}
                                        minuteStep={15}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name="room"
                        label="Room"
                        rules={[{ required: true, message: "Please choose room" }]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            options={optionsRoom}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Participants"
                        name="participants"
                        rules={[{ required: true }]}
                    >
                        <Select
                            allowClear
                            style={{ width: "100%" }}
                            mode="multiple"
                            options={optionsDoctor}
                            onSearch={(value) => setKeyword(value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export  default AddMeetingModal;