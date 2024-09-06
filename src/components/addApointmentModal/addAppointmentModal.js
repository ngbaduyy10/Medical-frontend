import {Modal, Typography, Form, Flex, DatePicker, notification, Spin, Row, Alert, Col, Button} from "antd";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import SpecialtySelect from "../specialtySelect/specialtySelect";
import DoctorSelect from "../doctorSelect/doctorSelect";
import {createAppointment, updateAppointment, getTimeListByDate} from "../../services/appointment.service";

function AddAppointmentModal ({showModal, setShowModal, appointmentInfo}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [timeList, setTimeList] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const date = selectedDate.format("DD/MM/YYYY");
            const response = await getTimeListByDate({date: date, doctor: selectedDoctor});
            if (response.code === 200) {
                setTimeList(response.data);
            } else {
                notification.error({message: "Error", description: response.message});
            }
            setLoading(false);
        }

        fetchApi();
    }, [selectedSpecialty, selectedDate, selectedDoctor, showModal]);

    useEffect(() => {
        if (appointmentInfo && showModal) {
            form.setFieldsValue({
                specialtyId: appointmentInfo.specialtyId._id,
                doctor: appointmentInfo.doctor._id,
                date: dayjs(appointmentInfo.date),
                time: appointmentInfo.time,
            });
            setSelectedSpecialty(appointmentInfo.specialtyId._id);
            setSelectedDoctor(appointmentInfo.doctor._id);
            setSelectedDate(dayjs(appointmentInfo.date));
            setSelectedHour(appointmentInfo.time);
        }
    }, [appointmentInfo, showModal, form]);

    const handleCancelModal = () => {
        form.resetFields();
        setSelectedHour(null);
        setShowModal(false);
    }

    const handleChangeSpecialty = (specialtyId) => {
        setSelectedSpecialty(specialtyId);
        form.setFieldValue("doctor", null);
    }

    const handleChangeDoctor = (doctor) => {
        setSelectedDoctor(doctor);
    }

    const handleChangeDate = (date) => {
        setSelectedDate(date);
        setSelectedHour(null);
    }

    const disabledDate = (current) => {
        const currentDate = dayjs();
        const sevenDaysLater = currentDate.add(7, "day");
        return (
            current && (current < currentDate.startOf("day") || current > sevenDaysLater.endOf("day"))
        );
    };

    const handleChangeHour = (hour) => {
        setSelectedHour(hour);
        form.setFieldValue("time", hour);
    }

    const handleOkModal = async () => {
        const value = await form.validateFields();
        let response = {};
        if (!appointmentInfo) {
            response = await createAppointment(value);
        } else {
            response = await updateAppointment(appointmentInfo._id, value);
        }
        if (response.code === 200) {
            notification.success({message: "Success", description: response.message});
            handleCancelModal();
        } else {
            notification.error({message: "Error", description: response.message});
        }
    }

    return (
        <>
            <Modal
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                okText={appointmentInfo?._id ? "Update" : "Add"}
                cancelText={"Cancel"}
                open={showModal}
                destroyOnClose
            >
                <Typography.Title level={3} style={{ margin: "0 0 18px", textAlign: "center" }}>
                    {appointmentInfo?._id ? "Update Appointment" : "Add Appointment"}
                </Typography.Title>

                <Form
                    form={form}
                    layout="vertical"
                    name="appointmentForm"
                    initialValues={{
                        date: dayjs(),
                    }}
                >
                    <Form.Item
                        label="Select Specialty"
                        name="specialtyId"
                        valuePropName="specialtyId"
                        rules={[
                            {
                                required: true,
                                message: "Please select a specialty",
                            },
                        ]}
                    >
                        <SpecialtySelect onChange={handleChangeSpecialty} />
                    </Form.Item>

                    <Form.Item
                        label="Select Doctor"
                        name="doctor"
                        valuePropName="doctor"
                        rules={[
                            {
                                required: true,
                                message: "Please select a doctor",
                            },
                        ]}
                    >
                        <DoctorSelect specialtyId={selectedSpecialty} onChange={handleChangeDoctor} />
                    </Form.Item>

                    <Flex gap={20}>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[{ required: true, message: "Please choose date" }]}
                        >
                            <DatePicker
                                format="DD/MM/YYYY"
                                onChange={handleChangeDate}
                                disabledDate={disabledDate}
                            />
                        </Form.Item>
                        <Form.Item
                            name="time"
                            label="Expected Time"
                            rules={[{ required: true, message: "Please choose time" }]}
                        >
                            <Typography.Text strong>{selectedHour}</Typography.Text>
                        </Form.Item>
                    </Flex>

                    <Spin spinning={loading}>
                        <Row gutter={[10, 10]}>
                            {timeList.length === 0 && (
                                <Alert
                                    style={{ width: "100%" }}
                                    type="warning"
                                    message="No available time!"
                                    description="Please choose another date or doctor."
                                />
                            )}
                            {timeList.map((hour) => (
                                <Col span={4} key={hour}>
                                    <Button
                                        key={hour}
                                        type={selectedHour === hour ? "primary" : "default"}
                                        onClick={() => handleChangeHour(hour)}
                                    >
                                        {hour}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </Spin>
                </Form>
            </Modal>
        </>
    )
}

export default AddAppointmentModal;