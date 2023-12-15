import React, { useState, useEffect } from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
    DownOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone, EyeTwoTone,
    ExclamationCircleFilled,
    SearchOutlined,
    FilterTwoTone

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


} from 'antd';


import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

import Nav from '../Nav';
import DonVi from '.';
import 'moment/locale/vi'; // hoặc 'moment/locale/<tên_locale>'
moment.locale('vi'); // 
// import './index.css'
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;
const { Search } = Input;



dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';


// const onSearch = (value, _e, info) => console.log(info?.source, value);

// form 
const { Option } = Select;



const CanBo = () => {
    const [donViData, setDonViData] = useState([]);
    const [canBoData, setCanBoData] = useState([]);
    const [canBoDatas, setCanBoDatas] = useState([]);
    const [selectedUnitId, setSelectedUnitId] = useState(null);


    const [loaiCanBoData, setLoaiCanBoData] = useState([]);

    // const [treeData, setTreeData] = useState([]);


    // ds don vi 


    // API 
    useEffect(() => {
        // Gọi API khi component được mount
        fetchDonViData();

    }, []);




    // lay danh sach don vi 
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
    // tao tree theo phan cap 
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



    // lay danh sach can bo theo id 

    const onSelect = (selectedKeys, info) => {
        const selectedId = selectedKeys[0]; // Giả sử ID của đơn vị được chọn là phần tử đầu tiên trong mảng selectedKeys

        // Gửi yêu cầu API để lấy thông tin đơn vị con tương ứng với ID đã chọn
        if (info) {
            setSelectedUnitId(info.key);
        }
        console.log("id cua d v", info.key)
    };

    // Handle filter icon click
    const handleFilterIconClick = async () => {
        if (selectedUnitId) {
            fetch(`https://localhost:44325/api/CanBo/${selectedUnitId}`)
                .then((response) => response.json())
                .then((data) => {
                    setCanBoData(data); // Cập nhật state với thông tin đơn vị con từ API
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    // Xử lý lỗi nếu cần thiết
                });
            console.log("canbo", selectedUnitId)

            console.log("canbo", canBoData)
        }

    };
    const fetchDonViByLoaiDonViId = async (loaiDonViId) => {
        try {
            const response = await fetch(`https://localhost:44319/api/DonVi/DonVi/${loaiDonViId}`);
            const data = await response.json();
            return data; // Trả về dữ liệu đơn vị từ API
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };
    //  tìm kiếm đơn vị 
    const onSearch = (searchText) => {
        // Gọi API với từ khoá tìm kiếm searchText
        fetch(`https://localhost:44325/api/CanBo/search/${encodeURIComponent(searchText)}`)
            .then((response) => response.json())
            .then((data) => {
                // Cập nhật state loaiDonViData với kết quả trả về từ API
                setCanBoData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    //  add new  can bo  
    const handleAddButtonClick = async () => {
        try {
            const formData = form.getFieldsValue();




            // Định dạng lại giá trị của ngày sinh thành định dạng ngày tháng trước khi gửi đi
            // Thay đổi định dạng ngày tháng tùy theo định dạng bạn mong muốn
            console.log('can bo add', formData)
            setLoading(true);

            const response = await fetch('https://localhost:44325/api/CanBo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log('response', response);

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            console.log('canbo', data);

            setLoading(false);
            handleCancel();
        } catch (error) {
            console.error('Error adding data:', error);
            setLoading(false);
        }
    };



    /// sua thong tin 
    const handleEditButtonClick = async () => {
        try {
            const formData = form.getFieldsValue(); // Lấy giá trị từ form
            // const formData = await form.validateFields(); // Sử dụng validateFields() để lấy dữ liệu từ form
            // formData.ngaysinh= form.getFieldsValue().ngaysinh;
            console.log('formData', formData);

            setLoading(true);


            const response = await fetch(`https://localhost:44325/api/CanBo/${formData.id}`, {
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
                const updatedResponse = await fetch('https://localhost:44325/api/CanBo');
                const updatedData = await updatedResponse.json();

                // Cập nhật state donViData với dữ liệu mới
                setCanBoData(updatedData);
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
            fetch(`https://localhost:44325/api/CanBo/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Xóa thành công, cập nhật lại danh sách đơn vị
                        return fetch('https://localhost:44325/api/CanBo');
                    }
                    throw new Error('Delete request failed');
                })
                .then(response => response.json())
                .then(updatedData => {
                    // Cập nhật state donViData với danh sách mới
                    setCanBoData(updatedData);
                })
                .catch(error => console.error('Error deleting or fetching data:', error));
        }
    };

    // add 
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const showModal = () => {
        form.setFieldsValue();
        setOpen(true);
    };
    const showEditModal = (record) => {

        form.setFieldsValue({
            id: record.id,
            ten: record.ten,
            ngaysinh: record.ngaysinh, // Sử dụng ngày sinh đã định dạng
            quequan: record.quequan,
            capBac: record.capBac,
            chucVu: record.chucVu,
            hocHam: record.hocHam,
            hocVi: record.hocVi,
            sdt: record.sdt,
            cccd: record.cccd,
            donVi: record.donVi
        });
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
                                <h3> Danh sách Cán bộ </h3>
                            </space>
                            <Space size={25}

                            >
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


                                <FilterTwoTone
                                    style={{ fontSize: '16px', color: '#08c' }}
                                    onClick={handleFilterIconClick}
                                />

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
                        dataSource={canBoData.map((cb, index) => ({
                            id: cb.id,
                            stt: index + 1,
                            ten: cb.ten,
                            ngaysinh: moment(cb.ngaysinh),
                            quequan: cb.quequan,
                            capBac: cb.capBac,
                            chucVu: cb.chucVu,
                            hocHam: cb.hocHam,
                            hocVi: cb.hocVi,
                            sdt: cb.sdt,
                            cccd: cb.cccd,
                            donVi: cb.donVi


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
                                title: 'Họ Tên ',
                                dataIndex: 'ten',
                                key: 'ten',

                            },
                            {
                                title: 'Ngày Sinh ',
                                dataIndex: 'ngaysinh',
                                key: 'ngaysinh',
                                // định dạng ngày tháng năm sinh
                                render: (text, record) => (
                                    <span>
                                        {moment(record.ngaysinh).format('DD/MM/YYYY')}
                                    </span>
                                ),

                            },
                            {
                                title: 'Quê Quán',
                                dataIndex: 'quequan',
                                key: 'quequan',

                            },
                            {
                                title: 'Cấp Bậc ',
                                dataIndex: 'capBac',
                                key: 'capBac',

                            },
                            {
                                title: 'Chức Vụ ',
                                dataIndex: 'chucVu',
                                key: 'chucVu',

                            },
                            {
                                title: 'SĐT ',
                                dataIndex: 'sdt',
                                key: 'sdt',

                            },
                            {
                                title: 'CCCD/CMND ',
                                dataIndex: 'cccd',
                                key: 'cccd',

                            },
                            {
                                title: 'Đơn Vị ',
                                dataIndex: 'donVi',
                                key: 'donVi',

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
                title="Thêm cán bộ "
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
                    <Button key="sua" type="primary" onClick={handleEditButtonClick}>
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
                        <Input />
                    </Form.Item>
                    <Form.Item label="Họ tên" name="ten" rules={[{ required: true }]}  >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Ngày sinh" name="ngaysinh" rules={[{ required: true }]}>
                        <DatePicker format={'YYYY/MM/DD'} />
                    </Form.Item>
                    <Form.Item label="Quê quán" name="quequan" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Cấp bậc" name="capBac" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Chức vụ" name="chucVu" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="SĐT" name="sdt" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="CCCD" name="cccd" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Học hàm" name="hocHam" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Học vị" name="hocVi" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Đơn vị" name="donVi" rules={[{ required: true }]}>
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
                            treeData={treeData} />

                    </Form.Item>

                </Form>
            </Modal >

        </>
    )

}
export default CanBo;