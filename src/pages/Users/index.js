import {Button, Flex, Input, notification, Table} from "antd";
import { SearchOutlined, PlusCircleFilled } from "@ant-design/icons";
import columnsTable from "./columnsTable";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUsers, changeStatus, tempDelete} from "../../services/user.service";
import ModalAddUser from "./modalAddUser";

function Users () {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false)
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [filter, setFilter] = useState({});
    const [sorter, setSorter] = useState({});
    const [keyword, setKeyword] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getUsers({
                    keyword: keyword,
                    skip: (pagination.current - 1) * pagination.pageSize,
                    limit: pagination.pageSize,
                    userType: filter.userType,
                    activeStatus: filter.activeStatus,
                    gender: filter.gender,
                    sortField: sorter.field,
                    sortOrder: sorter.order,
                });
                if (response.code === 200) {
                    setUsers(response.data.map((user, index) => ({...user, key: index + 1})));
                } else {
                    navigate('/logout', {replace: true});
                }
                setLoading(false);
            } catch(error) {
                setLoading(false)
            }
        }

        fetchApi();
    }, [pagination, filter, sorter, keyword, reload, navigate]);

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
        setFilter({
            userType: filters.userType,
            activeStatus: filters.activeStatus,
            gender: filters.gender,
        });
        switch(sorter.order) {
            case 'ascend':
                setSorter({
                    field: sorter.field,
                    order: 'asc',
                });
                break;
            case 'descend':
                setSorter({
                    field: sorter.field,
                    order: 'desc',
                });
                break;
            default:
                setSorter({});
                break;
        }

    }

    const handleChangeStatus = async (id, activeStatus) => {
        try {
            setLoading(true);
            const response = await changeStatus({
                id: id,
                activeStatus: !activeStatus,
            });
            setReload(!reload);
            if (response.code === 200) {
                notification.success({
                    message: response.message,
                });
            } else {
                notification.error({
                    message: response.message,
                });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const handleTempDelete = async (id) => {
        try {
            setLoading(true);
            const response = await tempDelete({id: id});
            setReload(!reload);
            if (response.code === 200) {
                notification.success({
                    message: response.message,
                });
            } else {
                notification.error({
                    message: response.message,
                });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
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
                    onClick={() => setShowModal(true)}
                >
                    Add User
                </Button>
            </Flex>
            <Table
                rowKey={"key"}
                columns={columnsTable(pagination, filter, handleChangeStatus, handleTempDelete)}
                dataSource={users}
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                scroll={{ x: 1300 }}
            />
            <ModalAddUser showModal={showModal} setShowModal={setShowModal} reload={reload} setReload={setReload} />
        </>
    );
}

export default Users;