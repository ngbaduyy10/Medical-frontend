import { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    UserOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Flex, Modal } from 'antd';
import menuItems from "./menuItems";
import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import Clock from "./headerClock";
const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

function LayoutDefault () {
    const user = useSelector(state => state.setUserReducer);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogout = () => {
        confirm({
            title: 'Do you want to logout?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                navigate("/logout", { replace: true });
            },
        });
    }

    const selectedKey = () => {
        const path = window.location.pathname;
        const menu = menuItems(user);
        for (let i = 0; i < menu.length; i++) {
            if (path.includes(menu[i].key) && menu[i].key !== "/") {
                return [menu[i].key];
            }
        }
        return ["/"];
    }

    return (
        <>
            <Layout>
                <Sider trigger={null} width={250} collapsible collapsed={collapsed} style={{position: "sticky", top: 0, height: '100vh'}}>
                    <div style={{height: '70px'}} />
                    <Menu
                        style={{fontSize: '16px'}}
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectedKey()}
                        items={menuItems(user)}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            position: "sticky",
                            zIndex: 1000,
                            height: '70px',
                            top: 0,
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Flex justify="space-between" align="center">
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 70,
                                    height: 70,
                                }}
                            />
                            <Clock />
                            <Flex gap='5px'>
                                <Button
                                    type="text"
                                    icon={<UserOutlined />}
                                    onClick={() => navigate("/profile")}
                                    style={{
                                        fontSize: '16px',
                                        padding: '20px 10px',
                                    }}
                                >
                                    {user.fullName}
                                </Button>
                                <Button
                                    type="text"
                                    icon={<LogoutOutlined />}
                                    onClick={handleLogout}
                                    style={{
                                        fontSize: '16px',
                                        padding: '20px 10px',
                                        marginRight: '10px',
                                    }}
                                    danger
                                >
                                    Logout
                                </Button>
                            </Flex>
                        </Flex>
                    </Header>

                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 'calc(100vh - 118px)',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default LayoutDefault