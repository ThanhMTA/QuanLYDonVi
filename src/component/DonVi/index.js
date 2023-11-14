import React from "react";
import { DownOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone, EyeTwoTone } from '@ant-design/icons';
import { Layout, Breadcrumb, theme, Space, Tree, Button, Flex, Input, Table, Tag } from 'antd';
import Nav from '../Nav';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import './index.css'
// import './index.css'
const { Header, Content, Sider } = Layout;
const { Search } = Input;
const treeData = [
    {
        title: 'Quản lý học viên',
        key: '0-0',
        children: [
            {
                title: 'd1',
                key: '0-0-0',
                children: [
                    {
                        title: 'c155',
                        key: '0-0-0-0',
                        children: [
                            {
                                title: 'cntt2',
                                key: '0-0-0-0-0',
                            },
                            {
                                title: 'anhttt',
                                key: '0-0-0-0-1',
                            },
                        ]
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-1-0',
                    },
                ],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-2-0',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                    },
                ],
            },
        ],
    },
    {
        title: 'QL học viên sau đại học',
        key: '0-1',
        children: [
            {
                title: 'd1',
                key: '0-0-0',
                children: [
                    {
                        title: 'c155',
                        key: '0-0-0-0',
                        children: [
                            {
                                title: 'cntt2',
                                key: '0-0-0-0-0',
                            },
                            {
                                title: 'anhttt',
                                key: '0-0-0-0-1',
                            },
                        ]
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-1-0',
                    },
                ],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-2-0',
                    },
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                    },
                ],
            },
        ],
    },
    {
        title: 'Văn Phòng ',
        key: '0-2',
    },
    {
        title: 'Khoa_viện',
        key: '0-3',
    }

];
const onSearch = (value, _e, info) => console.log(info?.source, value);

const columns = [
    {
        title: 'Đơn vị',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Quân số',
        dataIndex: 'quanso',
        key: 'quanso',
    },
    {
        title: 'Địa chỉ  ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Loại ',
        dataIndex: 'type',
        key: 'type',
    },

    {
        title: 'Hành động',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <EditTwoTone />
                <DeleteTwoTone />
                <EyeTwoTone />
             
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const DonVi = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    return (
        <>
            <Nav />
            <Layout

                className="DV_content"
                style={{


                    // background: colorBgContainer,
                    padding: '0 20px 24px 260px',

                }}
            >
                <Breadcrumb
                    style={{
                        margin: '20px 0',
                        // padding: '64px  64px 0x 274px',
                        display: 'flex',
                    }}
                >
                    <Breadcrumb.Item>
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>

                <Layout

                >


                    <Sider className="Nav_DV"
                        style={{
                            overflow: 'auto',
                            height: '80vh',
                            position: 'fixed',

                            top: 118,
                            bottom: 0,
                            background: colorBgContainer,


                        }}
                    >

                        <Tree

                            showLine
                            switcherIcon={<DownOutlined />}
                            defaultExpandedKeys={['0-0-0']}
                            onSelect={onSelect}
                            treeData={treeData}
                        />
                    </Sider>
                    <Layout>

                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 700,
                                background: colorBgContainer,
                                padding: '0 24px 0 224px',
                                border: 1


                                // display: 'flex',
                            }}>
                            <Layout
                                style={{

                                    background: colorBgContainer,



                                    // display: 'flex',
                                }}
                            >
                                <Flex justify='space-between' align='center' className="flex-content">

                                    <space>
                                        <h3> Quản lý đơn vị </h3>
                                    </space>

                                    <Space size={25}

                                    >
                                        <Button type="primary" size='middle'>
                                            <PlusOutlined />
                                        </Button>


                                    </Space>


                                </Flex>
                            </Layout>
                            <Search placeholder="input search text" onSearch={onSearch} enterButton />
                            {/* <Search
                                placeholder="input search text"
                                allowClear
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch}
                            /> */}



                            {/* start table  */}
                            <Table
                                style={{
                                    padding: '20px 0 0 0 '
                                }}
                                columns={columns} dataSource={data} />
                            {/* end table */}
                        </Content>
                    </Layout>







                </Layout>

            </Layout>






        </>
    )

}
export default DonVi;