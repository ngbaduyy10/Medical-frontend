import { Card } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
const { Meta } = Card;

function UserItem ({user, showSpecialty}) {
    return (
        <>
            <Card
                style={{ width: 200 }}
                styles={{
                    body: {
                        padding: 10,
                    },
                }}
            >
                <Meta
                    title={user.fullName}
                    description={
                        <div>
                            {user.phone} <PhoneOutlined />
                            {showSpecialty && ` - ${user.specialtyId.name}`}
                        </div>
                    }
                />
            </Card>
        </>
    );
}

export default UserItem;