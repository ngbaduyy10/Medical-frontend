import {useEffect, useState} from "react";
import {List, Input, Popover} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {getSpecialties} from "../../services/specialty.service";

function SpecialtySelect ({specialtyId, onChange}) {
    const [specialties, setSpecialties] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getSpecialties();
            if (response.code === 200) {
                setSpecialties(response.data);
            }
        }

        fetchApi();
    }, []);

    const getSpecialtyNameById = (id) => {
        return specialties.find((specialty) => specialty._id === id)?.name;
    }

    const handleSpecialtyChange = (specialty) => {
        setPopoverVisible(false);
        onChange(specialty._id);
    }

    const customDropdown = (
        <List
            style={{ width: 472, maxWidth: "100%", height: 300, overflow: "auto" }}
            itemLayout="horizontal"
            dataSource={specialties}
            renderItem={(specialty) => (
                <List.Item
                    onClick={() => handleSpecialtyChange(specialty)}
                    style={{cursor: "pointer"}}
                >
                    <List.Item.Meta
                        title={<b>{specialty.name}</b>}
                        description={specialty.description}
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
                    value={getSpecialtyNameById(specialtyId)}
                    readOnly
                    placeholder="Select Specialty"
                    suffix={<DownOutlined style={{ color: "#c2c2c2" }} />}
                />
            </Popover>
        </>
    )
}

export default SpecialtySelect;