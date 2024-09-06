import {Tooltip} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {Link} from "react-router-dom";

const columnsTable = () => {
    return [
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
            width: 100,
        },
        {
            title: "Date of Birth",
            dataIndex: "birthday",
            key: "birthday",
            width: 100,
            render: (birthday) => (
                <span>
                    {dayjs(birthday).format("DD/MM/YYYY")}-{" "}
                    {dayjs().diff(birthday, "year")} years old
                </span>
            ),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: 50,
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            width: 100,
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            width: 50,
            render: (_, record) => (
                <Tooltip title="View detail">
                    <Link to={`/profile-medical/${record._id}`} style={{color: "black", fontSize: 18}}><EyeOutlined /></Link>
                </Tooltip>
            ),
        },
    ]
}

export default columnsTable;