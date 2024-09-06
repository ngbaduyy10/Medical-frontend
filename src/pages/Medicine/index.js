import {Button, Flex, Input, notification, Table} from "antd";
import {PlusCircleFilled, SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import columnsTable from "./columnsTable";
import {getMedicines, deleteMedicine} from "../../services/medicine.service";
import ModalAddMedicine from "./modalAddMedicine";

function Medicine () {
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [filter, setFilter] = useState({});
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [showModal, setShowModal] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getMedicines({
                    keyword: keyword,
                    skip: (pagination.current - 1) * pagination.pageSize,
                    limit: pagination.pageSize,
                    usage: filter.usage,
                })
                if (response.code === 200) {
                    setMedicines(response.data.map((medicine, index) => ({...medicine, key: index + 1})));
                } else {
                    notification.error({
                        message: 'Error',
                        description: response.message,
                    });
                }
            } catch(error) {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        }

        fetchApi()
    }, [pagination, filter, keyword, reload]);

    const handleTableChange = (pagination, filters) => {
        setPagination(pagination);
        setFilter({
            usage: filters.usage,
        });
    }

    const handleEdit = (record) => {
        setShowModal(true);
        setSelectedMedicine(record);
    }

    const handleDelete = async (record) => {
        try {
            const response = await deleteMedicine(record._id);
            if (response.code === 200) {
                notification.success({
                    message: response.message,
                });
                setReload(!reload);
            } else {
                notification.error({
                    message: 'Error',
                    description: response.message,
                });

            }
        } catch(error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }
    }

    const handleAddMedicine = () => {
        setShowModal(true);
        setSelectedMedicine(null);
    }

    return (
        <>
            <Flex justify="space-between" style={{marginBottom: '20px'}}>
                <Flex gap='5px'>
                    <Input
                        placeholder="Search"
                        style={{ borderRadius: '20px' }}
                        size="large"
                        onChange={(e) => setKeyword(e.target.value)}
                        onPressEnter={() => setReload(!reload)}
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<SearchOutlined />}
                        size="large"
                        onClick={() => setReload(!reload)}
                    />
                </Flex>
                <Button
                    type="primary"
                    icon={<PlusCircleFilled />}
                    size="large"
                    ghost
                    onClick={handleAddMedicine}
                >
                    Add Medicine
                </Button>
            </Flex>
            <Table
                rowKey={"_id"}
                columns={columnsTable(filter, handleEdit, handleDelete)}
                dataSource={medicines}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ x: 1300 }}
            />
            <ModalAddMedicine showModal={showModal} setShowModal={setShowModal} selectedMedicine={selectedMedicine} reload={reload} setReload={setReload} />
        </>
    );
}

export default Medicine;