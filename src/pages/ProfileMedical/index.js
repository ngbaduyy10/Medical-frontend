import {useEffect, useState} from 'react';
import {getUsers} from "../../services/user.service";
import {Button, Flex, Input, notification, Table, Typography} from "antd";
import columnsTable from "./columnsTable";
import {SearchOutlined} from "@ant-design/icons";

function ProfileMedical () {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [keyword, setKeyword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setLoading(true);
                const response = await getUsers({
                    userType: 'user',
                    keyword: keyword,
                    limit: pagination.pageSize,
                    skip: pagination.pageSize * (pagination.current - 1),
                });
                if (response.code === 200) {
                    setUsers(response.data);
                } else {
                    notification.error({message: 'Error', description: response.message});
                }
            } catch (error) {
                notification.error({message: 'Error', description: error.message});
            } finally {
                setLoading(false);
            }
        }

        fetchApi();
    }, [reload, pagination, keyword]);

    const handleChangeTable = (pagination) => {
        setPagination(pagination);
    }

    return (
        <>
            <Typography.Title level={2}>Profile Medical</Typography.Title>
            <Flex gap='5px' style={{width: "30%", marginBottom: 10}}>
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
            <Table
                rowKey="_id"
                dataSource={users}
                columns={columnsTable()}
                loading={loading}
                onChange={handleChangeTable}
                pagination={pagination}
            />
        </>
    );
}

export default ProfileMedical;