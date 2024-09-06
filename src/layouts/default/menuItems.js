import {
    UsergroupAddOutlined,
    MessageOutlined,
    HomeOutlined,
    CalendarOutlined,
    FileOutlined,
    GroupOutlined,
    MedicineBoxOutlined,
    ShoppingCartOutlined,
    UserSwitchOutlined,
    DashboardOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const menuItems = (user) => {
    const userType = user.userType;
    let menu = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: <Link to = "/">Home</Link>,
        },
    ];

    switch (userType) {
        case 'admin': {
            menu.push(
                {
                    key: "/users",
                    icon: <UsergroupAddOutlined />,
                    label: <Link to = "/users">Users</Link>,
                }
            )
            break;
        }
        case 'user': {
            menu.push(
                {
                    key: "/medical-record",
                    icon: <FileOutlined />,
                    label: <Link to = "/medical-record">Medical Record</Link>,
                },
                {
                    key: "/appointments",
                    icon: <CalendarOutlined />,
                    label: <Link to = "/appointments">Appointments</Link>,
                },
            )
            break;
        }
        case 'doctor': {
            menu.push(
                {
                    key: "/calendar",
                    icon: <CalendarOutlined />,
                    label: <Link to = "/calendar">Calendar</Link>,
                },
                {
                    key: "/examination",
                    icon: <GroupOutlined />,
                    label: <Link to = "/examination">Examination</Link>,
                }
            )
            break;
        }
        case 'staff': {
            menu.push(
                {
                    key: "/appointments-patient",
                    icon: <GroupOutlined />,
                    label: <Link to = "/appointments-patient">Patient Appointments</Link>,
                },
                {
                    key: "/profile-medical",
                    icon: <UserSwitchOutlined />,
                    label: <Link to = "/profile-medical">Profile Medical</Link>,
                }
            )
            break;
        }
        case 'sales': {
            menu.push(
                {
                    key: "/statistic",
                    icon: <DashboardOutlined />,
                    label: <Link to = "/statistic">Statistic</Link>,
                },
                {
                    key: "/medicine",
                    icon: <MedicineBoxOutlined />,
                    label: <Link to = "/medicine">Medicine</Link>,
                },
                {
                    key: "/orders",
                    icon: <ShoppingCartOutlined />,
                    label: <Link to = "/orders">Orders</Link>,
                }
            )
            break;
        }
        default: {
            break;
        }
    }

    menu.push(
        {
            key: "/chat",
            icon: <MessageOutlined />,
            label: <Link to = "/chat">Chat</Link>,
        }
    )

    return menu;
}

export default menuItems;