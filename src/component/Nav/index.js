import { useState } from 'react';
import {
    LaptopOutlined, NotificationOutlined, UserOutlined, HomeFilled, AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    ContactsOutlined,
    SnippetsOutlined,
    ToolOutlined,
   BellOutlined
   
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Avatar, Space, Badge } from 'antd';
import './index.css'
import Home from '../Home';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter, redirect } from 'react-router-dom';
import { render } from 'react-dom';

const { Header, Content, Sider } = Layout;
function getItem(label, link, key, icon, children, type) {
    return {
        label, link, key, icon, children, type

    };
}
const items = [
    getItem('Home', '/home', 'sub1', <HomeFilled />),
    getItem('Đơn vị ', '/donvi', 'sub2', <DesktopOutlined />, [
        getItem('Đơn vị ', '/donvi', '1'),
        getItem('Nhóm đơn vị ', '/loaidonvi', '2'),
        getItem('Cán bộ ', '/canbo', '3'),


    ]
    ),
    getItem('Học viên ', '/hocvien', 'sub3', <ContactsOutlined />),
    getItem('Trang thiết bị', null, 'sub4', <ToolOutlined />, [
        getItem('Thiết bị', '/thiet_bi', '4'),
        getItem('Cấp phát', '/cap_phat', '5'),
    ]),
    getItem('Kế hoạch HL', null, 'sub5', <SnippetsOutlined />, [
        getItem('Kế hoạch HL', '/khhl', '9'),
        getItem('LichHL', '/lich', '10'),
        getItem('Điểm', '/diem', '11'),
        getItem('Đơn vị thực hiện', '/donvi_thuchien', '12'),



    ]),
    getItem('QL tài khoản ', '/taiKhoan', 'sub7', <UserOutlined />),
];
// const [selectedSidebarIndex, setSelectedSidebarIndex] = useState(null);

// // Xử lý khi một mục trong sidebar được nhấn
// const toggleSidebarItem = (index) => {
//     if (selectedSidebarIndex != index) {
//         // Nếu mục đang được chọn, bỏ chọn nó
//         setSelectedSidebarIndex(index);
//     }
// };

const Nav = () => {

    const handleMenuClick = ({ key }) => {
        // Your logic for handling menu item click
        return (
            <Link to='/home' />
        )
    };
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            {/* start header */}
            <Layout>
                <Header
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        // backgroundColor: colorBgContainer,
                        backgroundColor: 'rgb(66 104 157)',

                        borderBottom: 1,
                        borderBottomColor: 'black'

                    }}
                >

                    <Space size={25}
                        style={{
                            position: 'fixed',
                            left: 40,
                        }}
                    >
                        <Avatar className='logo' src='https://upload.wikimedia.org/wikipedia/vi/0/0e/Logo_MTA_new.png'

                            size="large"

                        >
                        </Avatar>
                        <span
                            style={
                                {
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: 'rgba(0, 0, 0, 0.88)'

                                }
                            }
                        >MTA</span>
                        <h1 className='space' style={{ width: 30, height: 40 }}></h1>
                    </Space>
                    {/* tk  */}
                    <Space
                        size={25}
                        style={{
                            position: 'fixed',
                            right: 40,
                        }}
                    >
                        <Badge count={100}>
                            <Avatar size="default" >
                                <BellOutlined /></Avatar>
                        </Badge>
                        <Avatar className='logo' src='https://upload.wikimedia.org/wikipedia/vi/0/0e/Logo_MTA_new.png'
                            style={{


                            }}
                            size="default"

                        >
                        </Avatar>

                    </Space>








                </Header>
            </Layout>

            {/* end header */}
            <Layout
                style={{
                    // backgroundColor: '#d0dbef',
                }}
            >
                {/* start nav */}
                <Sider className='sider'
                    width={200}
                    style={{
                        overflow: 'auto',
                        height: '90vh',
                        position: 'fixed',
                        left: 0,
                        top: 64,
                        bottom: 0,
                        background: colorBgContainer,
                        // backgroundColor: '#d0dbef',




                        // display: 'flex',
                        // alignItems: 'center',
                    }}
                >
                    {/* điều hướng  */}

                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{
                            height: '100%', borderRight: 0,
                            backgroundColor: '#d0dbef',

                        }}
                    >
                        {items.map((item) =>
                            item.children ? (
                                <Menu.SubMenu style={{ fontSize: '16px', fontWeight: 'bold' }}
                                    key={item.key}
                                    title={
                                        <span>
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </span>
                                    }
                                >
                                    {item.children.map((subItem) => (
                                        <Menu.Item key={subItem.key} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                            <Link to={subItem.link}>
                                                {subItem.icon}
                                                <span>{subItem.label}</span>
                                            </Link>
                                        </Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                            ) : (
                                <Menu.Item key={item.key} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    <Link to={item.link}>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </Menu.Item>
                            )
                        )}
                    </Menu>



                </Sider>
                {/* end nav */}
                <Layout>
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                            padding: '64px  64px 0x 274px',
                            display: 'flex',
                        }}
                    >
                        <Breadcrumb.Item>
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 700,
                        background: colorBgContainer,
                        padding: '0 24px 24px 274px',
                        zIndex: 0,

                        // display: 'flex',
                    }}
                >
                    Content
                    <h1>thanh </h1>

                </Content> */}
                    {/* <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 580,
                            background: colorBgContainer,
                        }}
                    >
                        Content
                        <img src='https://upload.wikimedia.org/wikipedia/vi/0/0e/Logo_MTA_new.png' alt="avatar" />
                    </Content> */}

                </Layout>
            </Layout>
        </Layout>
    );
};
export default Nav;