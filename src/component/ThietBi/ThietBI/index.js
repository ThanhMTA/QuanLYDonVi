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
    TreeSelect, Row, Col

} from 'antd';


import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

import Nav from '../../Nav';
// import './index.css'
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;
const { Search } = Input;


// const onSearch = (value, _e, info) => console.log(info?.source, value);

// form 
const { Option } = Select;



const ThietBi = () => {

    const [donViData, setDonViData] = useState([]);

    const [loaiTBData, setLoaiTBData] = useState([]);
    const [nhomTBData, setNhomTBData] = useState([]);

    const [thietBiData, setThietBiData] = useState([]);
    const [selectedUnitId, setSelectedUnitId] = useState(null);
    const [selectedLoaiTb, setSelectedLoaiTb] = useState(null);
    const [selectedDV, setSelectedDV] = useState(null);



    // const [treeData, setTreeData] = useState([]);


    // ds don vi 
    useEffect(() => {
        // Gọi API khi component được mount
        fetchNhomTBData();
        fetchDonViData();
        fetchLoaiTBData();
        fetchThietBiData();
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



    const fetchLoaiTBData = async (id) => {
        try {
            const response = await fetch(`https://localhost:44325/api/LoaiTB/Filter/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLoaiTBData(data);
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };

    const handleSelectChange = (value) => {
        // Assuming value is the selected ID from the Select component
        fetchLoaiTBData(value);
        console.log("loai thiet bi :", loaiTBData)
    };
    // api get all thiet bi 
    const fetchThietBiData = async () => {
        try {
            const response = await fetch('https://localhost:44325/api/ThietBi');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setThietBiData(data);
            console.log("Fetched data34: ", data); // Hiển thị toàn bộ dữ liệu từ loaiTBData
            console.log("First item ID: ", data[1].id); // Hiển thị ID của phần tử đầu tiên trong loaiTBData
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };
    // Filter thiet bi 
    const fetchFilterThietBiData = async () => {
        try {
            if (selectedLoaiTb !== null && selectedUnitId !== null) {
                // Both selections are made, fetch filtered data
                const response = await fetch(
                    `https://localhost:44325/api/ThietBi/Filter/${selectedLoaiTb}/${selectedUnitId}`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setThietBiData(data);
                // Handle fetched data as needed
                console.log('thiet bi ', data);
            }
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };

    const handleSearchClick = () => {
        // Call the data fetching function when the "Search" button is clicked
        fetchFilterThietBiData();
    };

    const onSelectLoaiTB = (value) => {
        setSelectedLoaiTb(value);
    };

    const onSelectDV = (value) => {
        setSelectedDV(value);
    };



    //  API them don vi moi 
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // add new don vi 
    const handleAddButtonClick = async () => {
        try {
            const formData = form.getFieldsValue();
            setLoading(true);

            const response = await fetch('https://localhost:44325/api/ThietBi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const updatedResponse = await fetch('https://localhost:44325/api/ThietBi');
            const updatedData = await updatedResponse.json();
            setThietBiData(updatedData);
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

            const response = await fetch(`https://localhost:44325/api/ThietBi/${formData.id}`, {
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
                const updatedResponse = await fetch('https://localhost:44325/api/ThietBi');
                const updatedData = await updatedResponse.json();

                // Cập nhật state loaiTBData với dữ liệu mới
                setThietBiData(updatedData);
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
            fetch(`https://localhost:44325/api/ThietBi/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Xóa thành công, cập nhật lại danh sách đơn vị
                        return fetch('https://localhost:44325/api/ThietBi');
                    }
                    throw new Error('Delete request failed');
                })
                .then(response => response.json())
                .then(updatedData => {
                    // Cập nhật state loaiTBData với danh sách mới
                    setThietBiData(updatedData);
                })
                .catch(error => console.error('Error deleting or fetching data:', error));
        }
    };
    // get nhom thiet bi 
    const fetchNhomTBData = async () => {
        try {
            const response = await fetch('https://localhost:44325/api/NhomTB');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNhomTBData(data)
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
    const onSelect = (selectedKeys, info) => {
        const selectedId = selectedKeys[0]; // Giả sử ID của đơn vị được chọn là phần tử đầu tiên trong mảng selectedKeys

        // Gửi yêu cầu API để lấy thông tin đơn vị con tương ứng với ID đã chọn
        if (info) {
            setSelectedUnitId(info.key);
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
            tenTb: record.tenTb,
            loaiTb: record.loaiTb,
            donVi: record.donVi,
            donviTinh: record.donviTinh,
            soLuong: record.soLuong,


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
    const onSearch = (searchText) => {
        // Gọi API với từ khoá tìm kiếm searchText
        fetch(`https://localhost:44319/api/ThietBi/search/${encodeURIComponent(searchText)}`)
            .then((response) => response.json())
            .then((data) => {
                // Cập nhật state thietBiData với kết quả trả về từ API
                setThietBiData(data);
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
                    <Layout
                        style={{
                            padding: 24,


                            // display: 'flex',
                        }}
                    >

                        <Row align="middle">
                            <Col span={8} style={{ paddingRight: ' 10px' }} >

                                <Form
                                    name="wrap"
                                    labelCol={{ flex: '100px' }}
                                    labelAlign="left"
                                    labelWrap
                                    wrapperCol={{ flex: 1 }}
                                    colon={false}
                                    style={{ maxWidth: 500 }}
                                >
                                    <Form.Item label="Nhóm Thiết Bị" name="Khoa" rules={[{ required: true }]}>
                                        <Select
                                            showSearch
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            onChange={handleSelectChange}
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={nhomTBData.map(item => ({
                                                value: item.id, // Assuming your API response has 'value' and 'label' fields
                                                label: item.tenNhom,
                                            }))}
                                        />
                                    </Form.Item>

                                    <Form.Item style={{ textAlign: 'right' }}>
                                        <Space size="small">
                                            <Button type="primary" htmlType="submit">
                                                <Link to='nhom_thiet_bi'> <PlusOutlined /></Link>
                                            </Button>

                                        </Space>
                                    </Form.Item>


                                </Form>

                            </Col>

                            <Col span={8} style={{ padding: '0 5px' }}>

                                <Form
                                    name="wrap"
                                    labelCol={{ flex: '100px' }}
                                    labelAlign="left"
                                    labelWrap
                                    wrapperCol={{ flex: 1 }}
                                    colon={false}
                                    style={{ maxWidth: 500 }}

                                >
                                    <Form.Item label="Loại Thiết Bị" name="Khoa" rules={[{ required: true }]}>
                                        <Select
                                            showSearch
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            onChange={onSelectLoaiTB}
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={loaiTBData.map(item => ({
                                                value: item.id, // Assuming your API response has 'value' and 'label' fields
                                                label: item.tenLoai,
                                            }))}
                                        />
                                    </Form.Item>

                                    <Form.Item style={{ textAlign: 'right' }}>
                                        <Space size="small">
                                            <Button type="primary" htmlType="submit">
                                                <Link to='loai_thiet_bi'> <PlusOutlined /></Link>
                                            </Button>
                                        </Space>
                                    </Form.Item>


                                </Form>

                            </Col>

                            <Col span={8} style={{ paddingLeft: ' 10px' }} >
                                <Form
                                    name="wrap"
                                    labelCol={{ flex: '100px' }}
                                    labelAlign="left"
                                    labelWrap
                                    wrapperCol={{ flex: 1 }}
                                    colon={false}
                                    style={{ maxWidth: 500 }}
                                >
                                    <Form.Item label="Đơn Vị" name="Khoa" rules={[{ required: true }]}>
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
                                            onChange={onSelectDV}
                                        />

                                    </Form.Item>

                                    <Form.Item style={{ textAlign: 'right' }}>

                                    </Form.Item>


                                </Form>




                            </Col>

                        </Row>

                        <div style={{ textAlign: 'right' }}>
                            <Space size="small">
                                <Button type="primary" htmlType="submit" onClick={handleSearchClick} >
                                    Search
                                </Button>
                                <Button
                                    onClick={() => {
                                        form.resetFields();
                                    }}
                                >
                                    Clear
                                </Button>

                            </Space>
                        </div>

                    </Layout>
                    <Layout
                        style={{

                            background: colorBgContainer,



                            // display: 'flex',
                        }}
                    >
                        <Flex justify='space-between' align='center' className="flex-content">

                            <space>
                                <h3> Danh sách học viên </h3>
                            </space>


                            <Space size={25}

                            >
                                <Button type="primary" size='middle' onClick={showModal}>
                                    <PlusOutlined />
                                </Button>


                            </Space>


                        </Flex>
                    </Layout>
                    <Search placeholder="input search text" onSearch={onSearch} enterButton
                        style={{
                            paddingBottom: 11,
                        }}
                    />


                    <Table
                        size='small'
                        dataSource={thietBiData.map((dv, index) => ({
                            id: dv.id,
                            stt: index + 1,
                            tenTb: dv.tenTb,
                            loaiTb: dv.loaiTb,
                            donVi: dv.donVi,
                            donviTinh: dv.donviTinh,
                            soLuong: dv.soLuong
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
                                title: 'Thiết bị',
                                dataIndex: 'tenTb',
                                key: 'tenTb',

                            },
                            {
                                title: 'Loại thiết bị',
                                dataIndex: 'loaiTb',
                                key: 'loaiTb',

                            },
                            {
                                title: 'Đơn vị',
                                dataIndex: 'donVi',
                                key: 'donVi',

                            },
                            {
                                title: 'Đơn vị tính',
                                dataIndex: 'donviTinh',
                                key: 'donviTinh',

                            },
                            {
                                title: 'Số lượng',
                                dataIndex: 'soLuong',
                                key: 'soLuong',

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
                    <Form.Item label="Nhóm Thiết Bị" name="Khoa" rules={[{ required: true }]}>
                        <Select

                            showSearch
                            style={{
                                width: 470,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            onChange={handleSelectChange}
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={nhomTBData.map(item => ({
                                value: item.id, // Assuming your API response has 'value' and 'label' fields
                                label: item.tenNhom,
                            }))}
                        />

                    </Form.Item>
                    <Form.Item label="Loại thiết bị" name="loaiTb">
                        <Select
                            showSearch
                            style={{
                                width: 470,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={loaiTBData.map(item => ({
                                value: item.tenLoai, // Assuming your API response has 'value' and 'label' fields
                                label: item.tenLoai,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="Thiết bị" name="tenTb">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Đơn vị" name="donVi">
                        <TreeSelect
                            showSearch
                            style={{
                                width: 470,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            treeData={treeData}
                            onSelect={onSelect}
                        />
                    </Form.Item>
                    <Form.Item label="Đơn vị tính" name="donviTinh">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Số Lượng" name="soLuong">
                        <Input />
                    </Form.Item>


                </Form>
            </Modal >

        </>
    )

}
export default ThietBi;