import { CheckCircleOutlined, FileOutlined } from "@ant-design/icons";
import { Flex, message } from "antd";
import { useState } from "react";

function Copy ({children, textCopy}) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () =>
        navigator.clipboard.writeText(textCopy).then(() => {
            message.success("Copied successfully");
            setCopied(true);
        });

    return (
        <Flex align="center">
            {children}
            <span onClick={() => handleCopy()} style={{ cursor: "pointer" }}>
        {copied ? (
            <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
            <FileOutlined />
        )}
      </span>
        </Flex>
    );
}

export default Copy;
