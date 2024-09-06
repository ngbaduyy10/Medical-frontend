import { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Flex, Space } from "antd";
import dayjs from "dayjs";

const Clock = () => {
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(dayjs());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Flex align="center" justify="center">
            <Card styles={{ body: { padding: 10 } }}>
                <Space style={{fontSize: '20px'}}>
                    <ClockCircleOutlined />
                    {time.format("HH:mm:ss")}
                </Space>
            </Card>
        </Flex>
    );
};

export default Clock;