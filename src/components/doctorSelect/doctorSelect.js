import {useEffect, useState} from 'react';
import {getUsers} from "../../services/user.service";
import {Input, List, Popover} from "antd";
import {DownOutlined} from "@ant-design/icons";

function DoctorSelect ({specialtyId, doctor, onChange}) {
    const [doctors, setDoctors] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getUsers({userType: "doctor", specialtyId: specialtyId});
            if (response.code === 200) {
                setDoctors(response.data);
            }
        }

        fetchApi();
    }, [specialtyId]);

    const getDoctorNameById = (id) => {
        return doctors.find((doctor) => doctor._id === id)?.fullName;
    }

    const handleDoctorChange = (doctor) => {
        setPopoverVisible(false);
        onChange(doctor._id);
    }

    const customDropdown = (
        <List
            style={{ width: 472, maxWidth: "100%", height: 300, overflow: "auto" }}
            itemLayout="horizontal"
            dataSource={doctors}
            renderItem={(doctor) => (
                <List.Item
                    onClick={() => handleDoctorChange(doctor)}
                    style={{cursor: "pointer"}}
                >
                    <List.Item.Meta
                        title={<b>{doctor.fullName}</b>}
                        description={doctor.specialtyId.name}
                    />
                </List.Item>
            )}
        />
    );

    return (
        <>
            <Popover
                placement="bottomLeft"
                open={popoverVisible}
                content={customDropdown}
                onOpenChange={() => setPopoverVisible(!popoverVisible)}
                trigger="click"
                style={{padding: 0}}
            >
                <Input
                    onClick={() => setPopoverVisible(!popoverVisible)}
                    value={getDoctorNameById(doctor)}
                    readOnly
                    placeholder="Select Doctor"
                    suffix={<DownOutlined style={{ color: "#c2c2c2" }} />}
                />
            </Popover>
        </>
    )
}

export default DoctorSelect;