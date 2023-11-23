import React, { useState, useEffect } from 'react';
import {
    DownOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone, EyeTwoTone,
    ExclamationCircleFilled,
    SearchOutlined,

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


// const onSearch = (value, _e, info) => console.log(info?.source, value);




const LoaiDonVi = () => {

    const [donViData, setDonViData] = useState([]);
    const [donViDatas, setDonViDatas] = useState([]);

    const [loaiDonViData, setLoaiDonViData] = useState([]);

    // const [treeData, setTreeData] = useState([]);


    // ds don vi 
    useEffect(() => {
        // Gọi API khi component được mount
        fetchDonViData();
        fetchLoaiDonViData();
    }, []);






    const fetchDonViData = async () => {
        try {
            const response = await fetch('https://localhost:44319/api/DonVi');
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

    const fetchLoaiDonViData = async () => {
        try {
            const response = await fetch('https://localhost:44319/api/LoaiDonVi');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLoaiDonViData(data);
            console.log("Fetched data34: ", data); // Hiển thị toàn bộ dữ liệu từ donViData
            console.log("First item ID: ", data[1].id); // Hiển thị ID của phần tử đầu tiên trong donViData
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };

    //  API them don vi moi 
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // add new don vi 
    const handleAddButtonClick = async () => {
        try {
            const formData = form.getFieldsValue(); // Lấy giá trị từ form

            setLoading(true);

            const response = await fetch('https://localhost:44319/api/LoaiDonVi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Gửi dữ liệu lấy được từ form lên API
            });

            const data = await response.json();
            console.log(data);

            // Sau khi thêm dữ liệu, bạn có thể cập nhật danh sách hoặc state tương ứng tại đây
            // Ví dụ:
            // 1. Gọi lại API để lấy dữ liệu mới
            const updatedResponse = await fetch('https://localhost:44319/api/LoaiDonVi');
            const updatedData = await updatedResponse.json();

            // 2. Cập nhật state với dữ liệu mới
            setLoaiDonViData(updatedData);

            // Đóng Modal sau khi thêm dữ liệu
            setLoading(false);
            handleCancel();
        } catch (error) {
            console.error('Error adding data:', error);
            setLoading(false);
        }
    };
    const handleEditButtonClick = async () => {
        try {
            const formData = form.getFieldsValue(); // Lấy giá trị từ form

            setLoading(true);

            const response = await fetch(`https://localhost:44319/api/LoaiDonVi/${formData.id}`, {
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
                const updatedResponse = await fetch('https://localhost:44319/api/LoaiDonVi');
                const updatedData = await updatedResponse.json();

                // Cập nhật state donViData với dữ liệu mới
                setLoaiDonViData(updatedData);
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


    // delete donvi 
    const handleDeleteButtonClick = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đơn vị này?")) {
            fetch(`https://localhost:44319/api/LoaiDonVi/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Xóa thành công, cập nhật lại danh sách đơn vị
                        return fetch('https://localhost:44319/api/LoaiDonVi');
                    }
                    throw new Error('Delete request failed');
                })
                .then(response => response.json())
                .then(updatedData => {
                    // Cập nhật state donViData với danh sách mới
                    setLoaiDonViData(updatedData);
                })
                .catch(error => console.error('Error deleting or fetching data:', error));
        }
    };

    // add 
    const [open, setOpen] = useState(false);
    const showModal = () => {
        form.setFieldsValue();
        setOpen(true);
    };
    const showEditModal = (record) => {
        form.setFieldsValue({
            // Đặt giá trị của loại đơn vị từ record vào trường "loaiDV"

            tenNhom: record.tenNhom, // Đặt giá trị của tên đơn vị từ record vào trường "ten"

            id: record.id
            // Đặt giá trị của SĐT từ record vào trường "sdt"
            // ... các trường khác tương tự ...
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
    return (
        <>
            <Nav />
            <Layout

                className="LDV_content"
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


                    <Table
                        dataSource={loaiDonViData.map((dv, index) => ({
                            id: dv.id,
                            stt: index + 1,
                            tenNhom: dv.tenNhom,
                            // Join tags if it's an array
                        }))}
                        columns={[
                            {
                                title: 'STT',
                                dataIndex: 'stt',
                                key: 'stt',
                                ...getColumnSearchProps('id', 'STT'),
                                render: (text) => <a>{text}</a>,
                            },
                            {
                                title: 'ID',
                                dataIndex: 'id',
                                key: 'id',
                                ...getColumnSearchProps('id', 'STT'),
                                render: (text) => <a>{text}</a>,
                            },
                            {
                                title: 'Loại đơn vị',
                                dataIndex: 'tenNhom',
                                key: 'tenNhom',
                                ...getColumnSearchProps('ten', 'Đơn vị'),
                                render: (text) => <a>{text}</a>,
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
                <Form form={form} layout="vertical">
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Tên loại đơn vị" name="tenNhom">
                        <Input />
                    </Form.Item>


                </Form>
            </Modal >







        </>
    )

}
export default LoaiDonVi;