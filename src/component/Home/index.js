import React, { useState, useEffect } from 'react';
import {
    DownOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone, EyeTwoTone,
    ExclamationCircleFilled,
    SearchOutlined,
    PlusSquareTwoTone

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
    TreeSelect, Row, Col,
    Typography


} from 'antd';
import moment from 'moment';
import 'moment/locale/vi'; // hoặc 'moment/locale/<tên_locale>'


import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

import Nav from '../Nav';
// import './index.css'
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;
const { Search } = Input;
const { Title } = Typography;

// const onSearch = (value, _e, info) => console.log(info?.source, value);

// form 
const { Option } = Select;



const Dashboard = () => {
    const [donViData, setDonViData] = useState([]);

    const [loaiTBData, setLoaiTBData] = useState([]);
    const [tkData, setTkData] = useState([]);

    const [kHHLData, setKHHLData] = useState([]);
    const [selectedUnitId, setSelectedUnitId] = useState(null);



    // const [treeData, setTreeData] = useState([]);


    // ds don vi 
    useEffect(() => {
        // Gọi API khi component được mount

        fetchDonViData();


    }, []);


    const fetchDonViData = async () => {
        try {
            const response = await fetch('https://localhost:44325/api/DonVi');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDonViData(data);
            console.log("Fetched data: ", data); // Hiển thị toàn bộ dữ liệu từ donViData
            console.log("First item ID: ", data[1].id); // Hiển thị ID của phần tử đầu tiên trong donViData
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };




    // api get all thiet bi 
    const fetchTKData = async (id) => {
        try {
            console.log("ghjkkgkdl", selectedUnitId)
            const response = await fetch(`https://localhost:44325/api/TK/${id}/${selectedUnitId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTkData(data);
            console.log("Fetched data34: ", data); // Hiển thị toàn bộ dữ liệu từ loaiTBData
            console.log("First item ID: ", data[1].id); // Hiển thị ID của phần tử đầu tiên trong loaiTBData
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };
    // Filter thiet bi 






    //  API them don vi moi 
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // add new don vi 


    const fetchKHHLTBData = async (id) => {
        try {

            const response = await fetch(`https://localhost:44325/api/KHHL/Filter/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setKHHLData(data);
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };


    // add 
    const treeData = donViData
        .filter(dv => dv.capTren === null)
        .map(dv => ({
            key: dv.id,
            title: dv.ten,
            value: dv.ten,
            children:
                donViData
                    .filter(child => child.capTren === dv.ten)
                    .map(child => ({
                        key: child.id,
                        title: child.ten,
                        value: child.ten,
                        children: donViData
                            .filter(child2 => child2.capTren === child.ten)
                            .map(child2 => ({
                                key: child2.id,
                                title: child2.ten,
                                value: child2.ten,
                                children: donViData
                                    .filter(child3 => child3.capTren === child2.ten)
                                    .map(child3 => ({
                                        key: child3.id,
                                        title: child3.ten,
                                        value: child3.ten,


                                    }))

                            }))
                    }))

        }));
    /// khoach cha con 

    const onSelect = (selectedKeys, info) => {
        // Giả sử ID của đơn vị được chọn là phần tử đầu tiên trong mảng selectedKeys

        // Gửi yêu cầu API để lấy thông tin đơn vị con tương ứng với ID đã chọn
        if (info) {
            setSelectedUnitId(info.key);
            fetchKHHLTBData(info.key);
        }
        console.log("id cua d v", info.key)
    };




    const onSelectLoaiTB = (value) => {
        console.log("ghjkkgkdl", value)

        fetchTKData(value);
        console.log("data", value)
    };


    // form 
    const { token } = theme.useToken();



    return (
        <>
            <Nav />
            <Layout

                className="LDV_content"
                style={{


                    // background: colorBgContainer,
                    padding: '0 20px 24px 220px',

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




                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 700,
                        // background: colorBgContainer,
                        // padding: '0 24px 0 224px',
                        border: 1


                        // display: 'flex',
                    }}>
                    <Layout
                        style={{

                            // background: colorBgContainer,



                            // display: 'flex',
                        }}
                    >
                        <Flex justify='space-between' align='center' className="flex-content">

                            <space>
                                <h3> Kế hoạch huấn luyện </h3>
                            </space>

                            <Space size={25}

                            >
                                <TreeSelect

                                    showSearch

                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    treeData={treeData}
                                    onSelect={onSelect}

                                    style={{ width: 300 }}
                                />






                                <Select
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    onChange={onSelectLoaiTB}
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={kHHLData.map(item => ({
                                        value: item.id, // Assuming your API response has 'value' and 'label' fields
                                        label: item.noidung,
                                    }))}
                                />


                            </Space>


                        </Flex>
                    </Layout>

                    <Layout style={{ marginTop: ' 20px' }}>

                        <Content>

                            <Row>
                                <Col span={12} push={12} style={{ padding: ' 0 5px' }}>

                                    <Title level={3} align="middle"> Danh học viên </Title>


                                </Col>
                                <Col span={12} pull={12} style={{ padding: ' 0 5px' }} >
                                    <Title level={3} align="middle"> Danh sách đơn vị </Title>

                                    <Table
                                        size='small'
                                        dataSource={tkData.map((dv, index) => ({

                                            stt: index + 1,
                                            donVi: dv.donVi,
                                            gioi: dv.gioi,
                                            kha: dv.kha,
                                            trungbinh: dv.trungBinh,
                                            kem: dv.kem
                                            // Join tags if it's an array
                                        }))}
                                        columns={[
                                            {
                                                title: 'STT',
                                                dataIndex: 'stt',
                                                key: 'stt',

                                            },
                                            {
                                                title: 'Đơn vị',
                                                dataIndex: 'donVi',
                                                key: 'donVi'
                                            },
                                            {
                                                title: 'Giỏi',
                                                dataIndex: 'gioi',
                                                key: 'gioi',
                                                render: (text) => (
                                                    <span>{text}%</span>
                                                  ),
                                            },
                                            {
                                                title: 'Khá',
                                                dataIndex: 'kha',
                                                key: 'kha',
                                                render: (text) => (
                                                    <span>{text}%</span>
                                                  ),
                                            },
                                            {
                                                title: 'Trung Bình',
                                                dataIndex: 'trungbinh',
                                                key: 'trungbinh',
                                                render: (text) => (
                                                    <span>{text}%</span>
                                                  ),
                                            },
                                            {
                                                title: 'Kém',
                                                dataIndex: 'kem',
                                                key: 'kem',
                                                render: (text) => (
                                                    <span>{text}%</span>
                                                  ),
                                            }




                                        ]}
                                    />

                                </Col>
                            </Row>
                        </Content>

                    </Layout>



                </Content>










            </Layout>
            {/*  them moi  */}



        </>
    )

}
export default Dashboard;