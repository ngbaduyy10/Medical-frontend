import { Button, Descriptions, Modal, Popconfirm, Tag, Flex } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

function MeetingInfo ({selectedMeeting, visible, handleCancel, handleEdit ,handleDelete}) {
    const user = useSelector(state => state.setUserReducer);

    return (
        <>
            <Modal
                title={`Meeting: ${selectedMeeting?.subject} | Room: ${selectedMeeting?.room}`}
                open={visible}
                onCancel={handleCancel}
                footer={null}
                width={700}
            >
                <Descriptions column={2} bordered>
                    <Descriptions.Item
                        span={2}
                        label="Subject"
                        style={{
                            width: 150,
                        }}
                    >
                        {selectedMeeting?.subject}
                    </Descriptions.Item>
                    <Descriptions.Item label="Room">
                        {selectedMeeting?.room}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date">
                        <strong>
                            {dayjs(selectedMeeting?.startDate).format("DD/MM/YYYY")}
                        </strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Start time">
                        <strong>
                            {dayjs(selectedMeeting?.startDate).format("HH:mm")}
                        </strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="End time">
                        <strong>
                            {dayjs(selectedMeeting?.endDate).format("HH:mm")}
                        </strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Owner">
                        {selectedMeeting?.owner?.fullName}{" "}
                        {selectedMeeting?.owner?._id === user.id && (
                            <Tag color="blue">You</Tag>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                        {selectedMeeting?.owner?.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={2} style={{ height: 100 }}>
                        {selectedMeeting?.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Action">
                        {selectedMeeting?.owner?._id === user?.id && dayjs(selectedMeeting?.startDate).isAfter(dayjs()) && (
                            <Flex gap={5}>
                                <Button onClick={() => handleEdit(selectedMeeting)} type="primary">
                                    Edit
                                </Button>
                                <Popconfirm
                                    title="Delete"
                                    description="Delete this meeting?"
                                    okText="Yes"
                                    cancelText="Cancel"
                                    onConfirm={() => handleDelete(selectedMeeting)}
                                >
                                    <Button type="primary" danger>
                                        Delete
                                    </Button>
                                </Popconfirm>
                            </Flex>
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    )
}

export default MeetingInfo;