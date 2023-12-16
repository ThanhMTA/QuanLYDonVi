import React, { useState, useEffect } from 'react';
import {
    DownOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone, EyeTwoTone,
    ExclamationCircleFilled,
    SearchOutlined,
    PlusSquareTwoTone,
    CalendarTwoTone

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
    TreeSelect, Row, Col

} from 'antd';
import moment from 'moment';
import 'moment/locale/vi'; // hoặc 'moment/locale/<tên_locale>'

import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

import Nav from '../Nav';
moment.locale('vi');
// import './index.css'
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;
const { Search } = Input;


// const onSearch = (value, _e, info) => console.log(info?.source, value);

// form 
const { Option } = Select;



const KHHL = () => {

    const [donViData, setDonViData] = useState([]);

    const [loaiTBData, setLoaiTBData] = useState([]);
    const [nhomTBData, setNhomTBData] = useState([]);

    const [kHHLData, setKHHLData] = useState([]);
    const [selectedUnitId, setSelectedUnitId] = useState(null);
    const [selectedLoaiTb, setSelectedLoaiTb] = useState(null);
    const [selectedDV, setSelectedDV] = useState(null);



    // const [treeData, setTreeData] = useState([]);


    // ds don vi 
    useEffect(() => {
        // Gọi API khi component được mount

        fetchDonViData();
        fetchKHHLTBData();
        fetchKHHLData();
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
    const fetchKHHLData = async () => {
        try {
            const response = await fetch('https://localhost:44325/api/KHHL');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setKHHLData(data);
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
    const handleAddButtonClick = async () => {
        try {
            const formData = form.getFieldsValue();
            setLoading(true);

            const response = await fetch('https://localhost:44325/api/KHHL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const updatedResponse = await fetch('https://localhost:44325/api/KHHL');
            const updatedData = await updatedResponse.json();
            setKHHLData(updatedData);
            setLoading(false);
            setOpen(false); // Check that this line is reached and the modal state is being updated properly
        } catch (error) {
            console.error('Error adding data:', error);
            setLoading(false);
            setOpen(false);
        }
    };

    const handleEditButtonClick = async () => {
        try {
            const formData = form.getFieldsValue(); // Lấy giá trị từ form

            setLoading(true);

            const response = await fetch(`https://localhost:44325/api/KHHL/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Gửi dữ liệu của form cần sửa lên API
            });

            if (response.ok) {
                console.log('Thông tin đã được cập nhật');
                // Xử lý khi sửa thành công

                // Gọi lại API để lấy danh sách đơn vị mới
                const updatedResponse = await fetch('https://localhost:44325/api/KHHL');
                const updatedData = await updatedResponse.json();

                // Cập nhật state loaiTBData với dữ liệu mới
                setKHHLData(updatedData);
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

    // Còn lại giữ nguyên phần code cho Table, Modal, và các hàm khác


    // delete loaitb 
    const handleDeleteButtonClick = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đơn vị này?")) {
            fetch(`https://localhost:44325/api/KHHL/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Xóa thành công, cập nhật lại danh sách đơn vị
                        return fetch('https://localhost:44325/api/KHHL');
                    }
                    throw new Error('Delete request failed');
                })
                .then(response => response.json())
                .then(updatedData => {
                    // Cập nhật state loaiTBData với danh sách mới
                    setKHHLData(updatedData);
                })
                .catch(error => console.error('Error deleting or fetching data:', error));
        }
    };
    // get nhom thiet bi 
    const fetchKHHLTBData = async (id) => {
        try {
            const response = await fetch(`https://localhost:44325/api/KHHL/Filter/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setKHHLData(data);
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };
    const handleSelectChange = (value) => {
        // Assuming value is the selected ID from the Select component
        fetchKHHLTBData(value);
        console.log("loai thiet bi :", loaiTBData)
    };
    const onSearch = (searchText) => {
        // Gọi API với từ khoá tìm kiếm searchText
        fetch(`https://localhost:44325/api/KHHL/search/${encodeURIComponent(searchText)}/${selectedUnitId}`)
            .then((response) => response.json())
            .then((data) => {
                // Cập nhật state kHHLData với kết quả trả về từ API
                setKHHLData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
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
    const onSelect = (selectedKeys, info) => {
        const selectedId = selectedKeys[0]; // Giả sử ID của đơn vị được chọn là phần tử đầu tiên trong mảng selectedKeys

        // Gửi yêu cầu API để lấy thông tin đơn vị con tương ứng với ID đã chọn
        if (info) {
            setSelectedUnitId(info.key);
            fetchKHHLTBData(info.key);
        }
        console.log("id cua d v", info.key)
    };
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const showModal = () => {
        form.setFieldsValue();
        setOpen(true);
    };
    const showEditModal = (record) => {
        form.setFieldsValue({
            id: record.id,
            noidung: record.noidung,
            tgbatdau: record.tgbatdau,
            tgketthuc: record.tgketthuc,
            tongtiethoc: record.tongtiethoc,
            ngaylap: record.ngaylap,
            maKhhl: record.maKhhl,
            donVi: record.donVi

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

                    <Layout
                        style={{

                            background: colorBgContainer,



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





                                <Search placeholder="input search text" onSearch={onSearch} enterButton
                                />
                                <Button type="primary" size='middle' onClick={showModal}>
                                    <PlusOutlined />
                                </Button>


                            </Space>


                        </Flex>
                    </Layout>



                    <Table
                        size='small'
                        dataSource={kHHLData.map((dv, index) => ({
                            id: dv.id,
                            stt: index + 1,
                            noidung: dv.noidung,
                            tgbatdau: moment(dv.tgbatdau),
                            tgketthuc: moment(dv.tgketthuc),
                            tongtiethoc: dv.tongtiethoc,
                            ngaylap: moment(dv.ngaylap),
                            maKhhl: dv.maKhhl,
                            donVi: dv.donVi
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
                                title: 'Mã',
                                dataIndex: 'maKhhl',
                                key: 'maKhhl',

                            },
                            {
                                title: 'Nội dung',
                                dataIndex: 'noidung',
                                key: 'noidung',

                            },
                            {
                                title: 'Ngày bắt đầu',
                                dataIndex: 'tgbatdau',
                                key: 'tgbatdau',
                                render: (text, record) => (
                                    <span>
                                        {moment(record.tgbatdau).format('DD/MM/YYYY')}
                                    </span>
                                ),

                            },
                            {
                                title: 'Ngày kết thúc',
                                dataIndex: 'tgketthuc',
                                key: 'tgketthuc',
                                render: (text, record) => (
                                    <span>
                                        {moment(record.tgketthuc).format('DD/MM/YYYY')}
                                    </span>
                                ),

                            },
                            {
                                title: 'Tổng tiết học',
                                dataIndex: 'tongtiethoc',
                                key: 'tongtiethoc',

                            },
                            {
                                title: 'Đơn vị lập',
                                dataIndex: 'donVi',
                                key: 'donVi',

                            },
                            {
                                title: 'Ngày lập',
                                dataIndex: 'ngaylap',
                                key: 'ngaylap',
                                render: (text, record) => (
                                    <span>
                                        {moment(record.ngaylap).format('DD/MM/YYYY')}
                                    </span>
                                ),

                            },
                            {
                                title: 'Hành động',
                                key: 'action',
                                render: (_, record) => (
                                    <Space size="middle">
                                        <a onClick={() => showEditModal(record)}>
                                            <EditTwoTone />
                                        </a>
                                        <DeleteTwoTone onClick={() => handleDeleteButtonClick(record.id)} />
                                        <Link to={`/khhl/lich/${record.id}`}>  <CalendarTwoTone /></Link>



                                    </Space>
                                ),
                            },
                        ]}
                    />


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
                    <Button key="them" type="primary" onClick={handleAddButtonClick} loading={loading}>
                        Thêm
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

                    <Form.Item label="ID" name="id" rules={[{ required: true }]}  >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Mã" name="maKhhl" rules={[{ required: true }]}  >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Nội Dung" name="noidung" rules={[{ required: true }]}  >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ngày bắt đầu " name="tgbatdau" rules={[{ required: true }]}>
                        <DatePicker format={'YYYY/MM/DD'}
                            style={{
                                width: 380,
                            }} />
                    </Form.Item>
                    <Form.Item label="Ngày kết thúc " name="tgketthuc" rules={[{ required: true }]}>
                        <DatePicker format={'YYYY/MM/DD'}
                            style={{
                                width: 380,
                            }} />
                    </Form.Item>
                    <Form.Item label="Tổng tiết học" name="tongtiethoc" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ngày lập " name="ngaylap" rules={[{ required: true }]}>
                        <DatePicker format={'YYYY/MM/DD'}
                            style={{
                                width: 380,
                            }} />
                    </Form.Item>

                    <Form.Item label="Đơn vị" name="donVi" rules={[{ required: true }]}>
                        <TreeSelect
                            showSearch
                            style={{
                                width: 380,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            treeData={treeData} />

                    </Form.Item>

                </Form>
            </Modal >

        </>
    )

}
export default KHHL;