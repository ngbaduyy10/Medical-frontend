import { Modal, Table } from "antd";
import {useEffect, useState} from "react";
import {medicineUsage} from "../../utils/constant";

function MedicineModal ({selectedRecord, open, onCancel}) {
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: () => <div style={{textAlign: "center"}}>Medicine</div>,
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            align: "center",
        },
        {
            title: "Usage",
            dataIndex: "usage",
            key: "usage",
            align: "center",
            render: (usage) => {return medicineUsage(usage);}
        },
    ];

    useEffect(() => {
        if (selectedRecord) {
            setDataSource(selectedRecord.medicines.map((item) => ({
                id: item.medicineId,
                name: item.name,
                quantity: item.quantity,
                usage: item.usage,
            })))
        }
    }, [selectedRecord])

    return (
        <>
            <Modal
                title={`Medicine prescription`}
                centered
                open={open}
                onCancel={onCancel}
                footer={null}
            >
                <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} />
            </Modal>
        </>
    )
}

export default MedicineModal;