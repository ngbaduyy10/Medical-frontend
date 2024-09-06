import {Typography, Tag, Flex, Button, Tooltip, Popconfirm} from "antd";
import {LockOutlined, UnlockOutlined, DeleteOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {USER_TYPE_COLOR} from "../../utils/constant";

const columnsTable = (pagination, filter, handleChangeStatus, handleTempDelete) => {
    return [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            width: 50,
            align: "center",
            fixed: 'left',
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Full Name</div>,
            dataIndex: "fullName",
            key: "fullName",
            width: 200,
            fixed: 'left',
            sorter: true,
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Email</div>,
            dataIndex: "email",
            key: "email",
            width: 200,
            ellipsis: true,
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Date of Birth</div>,
            dataIndex: "birthday",
            key: "birthday",
            width: 200,
            ellipsis: true,
            sorter: true,
            render: (text, { birthday }) => {
                if (birthday) {
                    return (
                        <Typography.Text>
                            {dayjs(birthday).format("DD/MM/YYYY")} -{" "}
                            {dayjs().diff(birthday, "year")} years old
                        </Typography.Text>
                    )
                }
            },
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Gender</div>,
            dataIndex: "gender",
            key: "gender",
            width: 100,
            align: "center",
            ellipsis: true,
            filters: [
                {
                    text: "Male",
                    value: "male",
                },
                {
                    text: "Female",
                    value: "female",
                },
            ],
            filteredValue: filter.gender || null,
            render: (text, { gender }) => {
                if (gender) {
                    return (
                        <Tag color={gender === 'male' ? 'blue' : 'pink'}>
                            {gender === 'male' ? 'Male' : 'Female'}
                        </Tag>
                    );
                }
            }
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Phone</div>,
            dataIndex: "phone",
            key: "phone",
            align: "center",
            width: 150,
        },
        {
            title: () => <div style={{textAlign: 'center'}}>Address</div>,
            dataIndex: "address",
            key: "address",
            width: 200,
        },
        {
            title: "Role",
            dataIndex: "userType",
            key: "userType",
            width: 150,
            align: "center",
            filters: [
                {
                    text: "Admin",
                    value: "admin",
                },
                {
                    text: "Doctor",
                    value: "doctor",
                },
                {
                    text: "Staff",
                    value: "staff",
                },
                {
                    text: "Sales",
                    value: "sales",
                },
                {
                    text: "Customer",
                    value: "customer",
                },
                {
                    text: "User",
                    value: "user",
                },
            ],
            filteredValue: filter.userType || null,
            render: (text, { userType }) => (
                <>
                    <Tag color={USER_TYPE_COLOR[userType]}>
                        {userType.toUpperCase()}
                    </Tag>
                </>
            ),
        },
        {
            title: "Status",
            dataIndex: "activeStatus",
            key: "activeStatus",
            width: 100,
            align: "center",
            filters: [
                {
                    text: "Active",
                    value: true,
                },
                {
                    text: "Inactive",
                    value: false,
                },
            ],
            filteredValue: filter.activeStatus || null,
            render: (text, { activeStatus }) => (
                <>
                    <Tag color={activeStatus ? "green" : "red"} key={activeStatus}>
                        {activeStatus ? "Active" : "Inactive"}
                    </Tag>
                </>
            ),
        },
        {
            title: "Action",
            key: "action",
            fixed: 'right',
            width: 150,
            align: "center",
            render: (text, record) => (
                <Flex justify='center' gap='5px'>
                    <Tooltip title={record?.activeStatus ? "Inactive User" : "Active User"}>
                        <Button
                            type="text"
                            icon={record?.activeStatus ? <LockOutlined /> : <UnlockOutlined />}
                            onClick={() => handleChangeStatus(record?._id, record?.activeStatus)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title={`Do you want to delete ${record?.fullName}?`}
                        description="User will be moved to trash bin."
                        okText="Yes"
                        cancelText="Cancel"
                        onConfirm={() => handleTempDelete(record?._id)}
                    >
                        <Tooltip title="Delete User">
                            <Button type="text" icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Popconfirm>
                </Flex>
            )
        }
    ];
}

export default columnsTable;