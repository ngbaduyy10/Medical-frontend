import {Flex, Typography, Space, Button, notification, List, Card, Badge} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getMeetings, deleteMeeting} from "../../services/meeting.service";
import dayjs from "dayjs";
import AddMeetingModal from "../../components/addMeetingModal";
import MeetingInfo from "../../components/meetingInfo/meetingInfo";

function Calendar () {
    const user = useSelector(state => state.setUserReducer);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [activeList, setActiveList] = useState('all');
    const [listMeetings, setListMeetings] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [showAddMeeting, setShowAddMeeting] = useState(false);
    const [showMeetingInfo, setShowMeetingInfo] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getMeetings({
                    userId: user.id,
                    startDate: activeList === 'today' ? dayjs() : null,
                });
                if (response.code === 200) {
                    setListMeetings(response.data);
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
                });
            } finally {
                setLoading(false);
            }
        }

        fetchApi();
    }, [activeList, user, reload]);

    const handleDateClick = (info) => {
        const meeting = {
            startDate: dayjs(info.start),
            endDate: dayjs(info.end),
        };
        setSelectedMeeting(meeting);
        setShowAddMeeting(true);
    }

    const handleCancelAddMeeting = () => {
        setSelectedMeeting(null);
        setShowAddMeeting(false);
    }

    const renderEvents = () => {
        return listMeetings.map((meeting) => {
            return {
                id: meeting._id,
                start: meeting.startDate,
                title: `Meeting: ${meeting.subject}`,
                date: dayjs(meeting.startDate).format("DD/MM/YYYY"),
                time: `${dayjs(meeting.startDate).format("HH:mm")} - ${dayjs(meeting.endDate).format("HH:mm")}`,
                backgroundColor: "green",
                borderColor: "green",
                meeting: meeting,
            };
        });
    }

    const renderEventContent = (eventInfo) => {
        return (
            <Space direction="vertical" style={{ overflow: "hidden" }}>
                <i>{eventInfo.event.title}</i>
                <b>{eventInfo.event.extendedProps.time}</b>
            </Space>
        );
    }

    const handleEventClick = ({ event }) => {
        setShowMeetingInfo(true);
        setSelectedMeeting(event.extendedProps.meeting);
    };

    const handleCancelMeetingInfo = () => {
        setShowMeetingInfo(false);
        setSelectedMeeting(null);
    }

    const handleEdit = (meeting) => {
        setShowMeetingInfo(false);
        setShowAddMeeting(true);
        setSelectedMeeting(meeting);
    }

    const handleDelete = async (meeting) => {
        try {
            const response = await deleteMeeting(meeting._id);
            if (response.code === 200) {
                notification.success({
                    message: "Success",
                    description: response.message,
                });
                setReload(!reload);
                handleCancelMeetingInfo();
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
            <Flex>
                <Space direction="vertical" style={{width: 350, paddingRight: 10}}>
                    <Typography.Title level={4}>Meeting List</Typography.Title>
                    <Flex gap={5}>
                        <Button
                            type={activeList === 'all' ? "primary" : "default"}
                            onClick={() => setActiveList('all')}
                        >
                            All
                        </Button>
                        <Button
                            type={activeList === 'today' ? "primary" : "default"}
                            onClick={() => setActiveList('today')}
                        >
                            Today
                        </Button>
                    </Flex>

                    <List
                        style={{paddingRight: 20}}
                        itemLayout="horizontal"
                        dataSource={listMeetings}
                        renderItem={(meeting) => (
                            <List.Item style={{width: "100%"}}>
                                <Card style={{width: "100%"}} styles={{ body: { padding: 10 } }}>
                                    <Badge.Ribbon
                                        color="orange"
                                        text="Meeting"
                                        style={{ top: -15, right: -18 }}
                                    >
                                        <List.Item.Meta
                                            style={{width: "100%", overflow: "hidden"}}
                                            title={
                                                <Button
                                                    style={{border: "none", padding: 0, fontSize: "17px"}}
                                                    onClick={() => {
                                                        setShowMeetingInfo(true);
                                                        setSelectedMeeting(meeting);
                                                    }}
                                                >
                                                    <b>{meeting.subject}</b>
                                                </Button>
                                            }
                                            description={
                                                <Space direction="horizontal" size={"small"}>
                                                    <ClockCircleOutlined/>
                                                    <Typography.Text style={{fontSize: 12}}>
                                                        {`
                                                            ${dayjs(meeting.startDate).format("DD/MM/YYYY")} - 
                                                            ${dayjs(meeting.startDate).format("HH:mm")} ~ 
                                                            ${dayjs(meeting.endDate).format("HH:mm")}
                                                        `}
                                                    </Typography.Text>
                                                </Space>
                                            }
                                        />
                                    </Badge.Ribbon>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Space>

                <div style={{width: "100%"}}>
                    <FullCalendar
                        height="80vh"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        themeSystem="bootstrap"
                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "today",
                        }}
                        buttonText={{today: "Today"}}
                        loading={loading}
                        initialView="dayGridMonth"
                        locale="en"
                        selectable
                        selectMirror={true}
                        dayMaxEvents={true}
                        eventTimeFormat={{hour12: false}}
                        droppable={false}
                        drop={false}
                        select={handleDateClick}
                        events={renderEvents()}
                        eventContent={renderEventContent}
                        eventClick={handleEventClick}
                    />
                </div>
            </Flex>

            <AddMeetingModal
                selectedMeeting={selectedMeeting}
                visible={showAddMeeting}
                handleCancel={handleCancelAddMeeting}
                reload={reload}
                setReload={setReload}
            />

            <MeetingInfo
                selectedMeeting={selectedMeeting}
                visible={showMeetingInfo}
                handleCancel={handleCancelMeetingInfo}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default Calendar;