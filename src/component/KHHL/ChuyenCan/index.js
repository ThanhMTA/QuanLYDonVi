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


import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter, useParams } from 'react-router-dom';

import Nav from '../../Nav';
// import './index.css'
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;
const { Search } = Input;
const { Title } = Typography;

// const onSearch = (value, _e, info) => console.log(info?.source, value);

// form 
const { Option } = Select;



const DiemDanh = () => {

    const { id } = useParams();
    const idlichhl = parseInt(id, 10);
    const [donViData, setDonViData] = useState([]);
    const [KHHLData, setKHHLData] = useState([]);
    const [DVHLData, setDVHLData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [selectedDV, setSelectedDV] = useState([]);



    const [hocVienData, setHocVienData] = useState([]);


    const [loaiDonViData, setLoaiDonViData] = useState([]);

    // const [treeData, setTreeData] = useState([]);


    // ds don vi 
    useEffect(() => {
        // Gọi API khi component được mount
        fetchDVHLData();

    }, []);

    const fetchDVHLData = async () => {
        try {
            const response = await fetch(`https://localhost:44325/api/DiemDanh/${idlichhl}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDVHLData(data);
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };
    const fetchHVHLData = async (id) => {
        try {
            const response = await fetch(`https://localhost:44325/api/DiemDanh/${idlichhl}/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setHocVienData(data);
            console.log('ghdshg', hocVienData)
            console.log('ghdshg', id)


        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };
    //

    const handleSelectChangeHV = (value) => {
        // Assuming value is the selected ID from the Select component
        fetchHVHLData(value);
        setSelectedDV(value);

    }

    //  API them don vi moi 
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // add new don vi 
    const handleEditButtonClick = async () => {
        try {
            const formData = form.getFieldsValue(); // Lấy giá trị từ form

            setLoading(true);

            const response = await fetch("https://localhost:44325/api/DiemDanh", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Gửi dữ liệu của form cần sửa lên API
            });

            if (response.ok) {
                console.log('Thông tin đã được cập nhật');
                const updatedResponse = fetchHVHLData(selectedDV);
                const updatedData = await updatedResponse.json();
                setHocVienData(updatedData);
                setLoading(false);
                setOpen(false);

            } else {
                console.error('Có lỗi khi cập nhật thông tin');
                // Xử lý khi có lỗi từ phía server
            }
        } catch (error) {
            console.error('Lỗi:', error);
            // Xử lý khi có lỗi từ phía client hoặc mạng
        } finally {
            setLoading(false);
            setOpen(false); // Đóng modal sau khi cập nhật (có thể di chuyển lệnh này vào `if (response.ok)` nếu cần)
        }
    };

    // const onSelect = (selectedKeys, info) => {
    //     const selectedId = selectedKeys[0]; // Giả sử ID của đơn vị được chọn là phần tử đầu tiên trong mảng selectedKeys

    //     // Gửi yêu cầu API để lấy thông tin đơn vị con tương ứng với ID đã chọn
    //     if (info) {
    //         setSelectedUnitId(info.key);
    //     }
    //     console.log("id cua d v", info.key)
    // };
    // add 
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const showEditModal = (record) => {
        form.setFieldsValue({
            hocVienId: record.id,
            lichHlid: idlichhl,
            comat: record.comat
        }); // Đặt giá trị của các trường trong form bằng thông tin từ record
        setOpen(true); // Hiển thị Modal
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
    const handleCancel1 = () => {
        setModalType(false);
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



    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex, columnTitle) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Tìm kiếm ${columnTitle}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <button onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}>Tìm kiếm</button>
                    <button onClick={() => handleReset(clearFilters)}>Đặt lại</button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <SearchOutlined
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });
    const onSearch = (searchText) => {
        // Gọi API với từ khoá tìm kiếm searchText
        fetch(`https://localhost:44319/api/LoaiDonVi/search/${encodeURIComponent(searchText)}`)
            .then((response) => response.json())
            .then((data) => {
                // Cập nhật state loaiDonViData với kết quả trả về từ API
                setLoaiDonViData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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
                        background: colorBgContainer,
                        // padding: '0 24px 0 224px',
                        border: 1


                        // display: 'flex',
                    }}>


                    <Layout style={{ marginTop: ' 20px' }}>

                        <Content>

                            <Row>
                                <Col span={18} push={6} style={{ padding: ' 0 5px' }}>

                                    <Title level={3} align="middle"> Danh học viên </Title>
                                    <Layout
                                        style={{

                                            paddingBottom: '10px'

                                            // display: 'flex',
                                        }}
                                    >
                                        <Flex justify='flex-end' align='center' className="flex-content">
                                            <Space size={25}

                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Search to Select"
                                                    optionFilterProp="children"
                                                    onChange={handleSelectChangeHV}
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    options={DVHLData.map(item => ({
                                                        value: item.donVi,
                                                        label: item.donVi,
                                                    }))}
                                                />

                                            </Space>


                                        </Flex>
                                    </Layout>
                                    <Table
                                        size='small'
                                        dataSource={hocVienData.map((dv, index) => ({
                                            id: dv.id,
                                            stt: index + 1,
                                            ten: dv.ten,
                                            ngaysinh: moment(dv.ngaysinh),
                                            quequan: dv.quequan,
                                            capBac: dv.capBac,
                                            sdt: dv.sdt,
                                            cccd: dv.cccd,
                                            donVi: dv.donVi,
                                            comat: dv.comat
                                            // Join tags if it's an array
                                        }))}
                                        columns={[
                                            {
                                                title: 'STT',
                                                dataIndex: 'stt',
                                                key: 'stt',
                                                ...getColumnSearchProps('id', 'STT'),
                                                render: (text) => <p>{text}</p>,
                                            },
                                            {
                                                title: 'Họ Tên',
                                                dataIndex: 'ten',
                                                key: 'ten',

                                            },
                                            {
                                                title: 'Ngày sinh',
                                                dataIndex: 'ngaysinh',
                                                key: 'ngaysinh',
                                                render: (text, record) => (
                                                    <span>
                                                        {moment(record.ngaysinh).format('DD/MM/YYYY')}
                                                    </span>
                                                ),

                                            },

                                            {
                                                title: 'Cấp bậc',
                                                dataIndex: 'capBac',
                                                key: 'capBac',

                                            },
                                            {
                                                title: 'có mặt',
                                                dataIndex: 'comat',
                                                key: 'comat',

                                            },
                                            {
                                                title: 'Hành động',
                                                key: 'action',
                                                render: (_, record) => (
                                                    <Space size="middle">
                                                        <a onClick={() => showEditModal(record)}>
                                                            <EditTwoTone />
                                                        </a>


                                                    </Space>
                                                ),
                                            },
                                        ]}
                                    />
                                </Col>
                                <Col span={6} pull={18} style={{ padding: ' 0 5px' }} >
                                    <Title level={3} align="middle"> Danh sách đơn vị </Title>
                                    <Layout
                                        style={{

                                            paddingBottom: '10px'



                                            // display: 'flex',
                                        }}
                                    >
                                        <Flex justify='space-between' align='center' className="flex-content">
                                            <Space size={25}

                                            >

                                                <Search placeholder="input search text" onSearch={onSearch} enterButton
                                                />



                                            </Space>


                                        </Flex>
                                    </Layout>
                                    <Table
                                        size='small'
                                        dataSource={DVHLData.map((dv, index) => ({

                                            stt: index + 1,
                                            donVi: dv.donVi,
                                            khhl: dv.idKhhl
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

                                        ]}
                                    />

                                </Col>
                            </Row>
                        </Content>

                    </Layout>



                </Content>
            </Layout>
            {/*  them moi  */}
            <Modal
                title="Thêm đơn vị"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="huy" onClick={handleCancel}>
                        Hủy
                    </Button>,

                    <Button key="sua" type="primary" loading={loading} onClick={handleEditButtonClick}>
                        Sửa
                    </Button>

                ]}
            >
                <Form
                    form={form}
                    // layout="vertical"
                    labelCol={{ flex: '90px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                >

                    <Form.Item label="HV" name="hocVienId" rules={[{ required: true }]}  >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="lichhl" name="lichHlid" rules={[{ required: true }]}>
                        <Input
                            disabled
                        />
                    </Form.Item>
                    <Form.Item label="có mặt" name="comat" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                </Form>
            </Modal >
        </>
    )

}
export default DiemDanh;