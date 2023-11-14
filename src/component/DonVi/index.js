import React, { useState } from "react";
import {
    DownOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone, EyeTwoTone,
    ExclamationCircleFilled
} from '@ant-design/icons';
import {
    Layout, Breadcrumb, theme, Space, Tree, Button,
    Flex, Input, Table, Modal,
    Cascader,
    DatePicker,
    Form,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';


import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import './index.css'
import Nav from '../Nav';
// import './index.css'
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;
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
    // delete
    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    // add 
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Đơn vị',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Số hiệu',
            dataIndex: 'sohieu',
            key: 'sohieu',
            render: (text) => <a>{text}</a>,
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

                    <a ><EditTwoTone onClick={showModal} /></a>
                    <DeleteTwoTone onClick={showDeleteConfirm} />
                    <a><EyeTwoTone onClick={showModal} /></a>

                </Space>
            ),
        },
    ];
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    // from 
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    //
    // end add 

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
                                        <Button type="primary" size='middle' onClick={showModal}>
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
            {/*  them moi  */}
            <Modal
                open={open}
                title="Thêm đơn vị "
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="huy" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="them" type="primary" >
                        Thêm
                    </Button>,

                ]}
            >
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    style={{
                        maxWidth: 600,
                        width: 800
                    }}
                >
                    <Form.Item label="Cấp trên">
                        <TreeSelect
                            treeData={[
                                {
                                    title: 'Light',
                                    value: 'light',
                                    children: [
                                        {
                                            title: 'Bamboo',
                                            value: 'bamboo',
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="Loại " >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tên đơn vị ">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số hiệu ">
                        <Input />
                    </Form.Item>


                    <Form.Item label="Địa chỉ ">
                        <Input />
                    </Form.Item>


                    <Form.Item label="SĐT">
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>






        </>
    )

}
export default DonVi;