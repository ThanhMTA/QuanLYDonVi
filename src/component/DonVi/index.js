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




const DonVi = () => {

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

    const fetchLoaiDonViData = async () => {
        try {
            const response = await fetch('https://localhost:44325/api/LoaiDonVi');
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

            const response = await fetch('https://localhost:44325/api/DonVi', {
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
            const updatedResponse = await fetch('https://localhost:44325/api/DonVi');
            const updatedData = await updatedResponse.json();

            // 2. Cập nhật state với dữ liệu mới
            setDonViData(updatedData);

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

            const response = await fetch(`https://localhost:44325/api/DonVi/${formData.id}`, {
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
                const updatedResponse = await fetch('https://localhost:44325/api/DonVi');
                const updatedData = await updatedResponse.json();

                // Cập nhật state donViData với dữ liệu mới
                setDonViData(updatedData);
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
            fetch(`https://localhost:44325/api/DonVi/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Xóa thành công, cập nhật lại danh sách đơn vị
                        return fetch('https://localhost:44325/api/DonVi');
                    }
                    throw new Error('Delete request failed');
                })
                .then(response => response.json())
                .then(updatedData => {
                    // Cập nhật state donViData với danh sách mới
                    setDonViData(updatedData);
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
            loaiDv: record.loaiDv, // Đặt giá trị của loại đơn vị từ record vào trường "loaiDV"
            capTren: record.captren, // Đặt giá trị của cấp trên từ record vào trường "capTren"
            diaChi: record.address, // Đặt giá trị của địa chỉ từ record vào trường "diaChi"
            ten: record.ten, // Đặt giá trị của tên đơn vị từ record vào trường "ten"
            sdt: record.sdt,
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

    const onSelect = (selectedKeys, info) => {
        const selectedId = selectedKeys[0]; // Giả sử ID của đơn vị được chọn là phần tử đầu tiên trong mảng selectedKeys

        // Gửi yêu cầu API để lấy thông tin đơn vị con tương ứng với ID đã chọn
        fetch(`https://localhost:44325/api/DonVi/${selectedKeys}`)
            .then((response) => response.json())
            .then((data) => {
                setDonViDatas(data); // Cập nhật state với thông tin đơn vị con từ API
                const infoText = info ? info.node.title : 'Không có thông tin';
                const h3Element = document.querySelector('h3'); // Lấy thẻ h3
                if (h3Element) {
                    h3Element.textContent = ` ${infoText}`; // Hiển thị thông tin từ info trong thẻ h3
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                // Xử lý lỗi nếu cần thiết
            });

    };



    //     {
    //         title: 'Quản lý học viên',
    //         key: '0-0',
    //         children: [
    //             {
    //                 title: 'd1',
    //                 key: '0-0-0',
    //                 children: [
    //                     {
    //                         title: 'c155',
    //                         key: '0-0-0-0',
    //                         children: [
    //                             {
    //                                 title: 'cntt2',
    //                                 key: '0-0-0-0-0',
    //                             },
    //                             {
    //                                 title: 'anhttt',
    //                                 key: '0-0-0-0-1',
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-0-1',
    //                     },
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-0-2',
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'parent 1-1',
    //                 key: '0-0-1',
    //                 children: [
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-1-0',
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'parent 1-2',
    //                 key: '0-0-2',
    //                 children: [
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-2-0',
    //                     },
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-2-1',
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         title: 'QL học viên sau đại học',
    //         key: '0-1',
    //         children: [
    //             {
    //                 title: 'd1',
    //                 key: '0-0-0',
    //                 children: [
    //                     {
    //                         title: 'c155',
    //                         key: '0-0-0-0',
    //                         children: [
    //                             {
    //                                 title: 'cntt2',
    //                                 key: '0-0-0-0-0',
    //                             },
    //                             {
    //                                 title: 'anhttt',
    //                                 key: '0-0-0-0-1',
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-0-1',
    //                     },
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-0-2',
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'parent 1-1',
    //                 key: '0-0-1',
    //                 children: [
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-1-0',
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: 'parent 1-2',
    //                 key: '0-0-2',
    //                 children: [
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-2-0',
    //                     },
    //                     {
    //                         title: 'leaf',
    //                         key: '0-0-2-1',
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         title: 'Văn Phòng ',
    //         key: '0-2',
    //     },
    //     {
    //         title: 'Khoa_viện',
    //         key: '0-3',
    //     }

    // ];
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
        fetch(`https://localhost:44325/api/DonVi/search/${encodeURIComponent(searchText)}`)
            .then((response) => response.json())
            .then((data) => {
                // Cập nhật state loaiDonViData với kết quả trả về từ API
                setDonViDatas(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    return (
        <>
            <Nav />
            <Layout

                className="DV_content"
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
                            defaultExpandedKeys={[1]}
                            onSelect={onSelect}
                            treeData={treeData}


                        // Join tags if it's an array

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
                                        <Search

                                            placeholder="input search text"
                                            onSearch={onSearch}
                                            enterButton
                                        />
                                        <Button type="primary" size='middle' onClick={showModal}>
                                            <PlusOutlined />
                                        </Button>


                                    </Space>


                                </Flex>
                            </Layout>

                            {/* <Search
                                placeholder="input search text"
                                allowClear
                                enterButton="Search"
                                size="large"
                                onSearch={onSearch}
                            /> */}



                            {/* start table  */}

                            {/* {
                                donViData.map((dv, index) => {

                                })
                            } */}
                            <Table
                                className="custom-height-table"
                                size='small'
                                dataSource={donViDatas.map((dv, index) => ({
                                    id: dv.id,
                                    stt: index + 1,
                                    ten: dv.ten,
                                    sdt: dv.sdt,
                                    address: dv.diaChi,
                                    loaiDv: dv.loaiDv,
                                    captren: dv.capTren
                                    // Join tags if it's an array
                                }))}
                                columns={[
                                    {
                                        title: 'STT',
                                        dataIndex: 'stt',
                                        key: 'stt',
                                        ...getColumnSearchProps('id', 'STT'),
                                        render: (text) => <p> {text}</p>,
                                    },
                                    {
                                        title: 'Đơn vị',
                                        dataIndex: 'ten',
                                        key: 'ten',
                                        ...getColumnSearchProps('ten', 'Đơn vị'),
                                        render: (text) => <a>{text}</a>,
                                    },
                                    {
                                        title: 'SDT',
                                        dataIndex: 'sdt',
                                        key: 'sdt',
                                        ...getColumnSearchProps('sdt', 'SDT'),
                                        render: (text) => <p>{text}</p>,


                                    },

                                    {
                                        title: 'Địa chỉ  ',
                                        dataIndex: 'address',

                                        key: 'address',
                                        ...getColumnSearchProps('address', 'Địa chỉ'),
                                        render: (text) => <p>{text}</p>,
                                    },
                                    {
                                        title: 'Cấp trên   ',
                                        dataIndex: 'captren',

                                        key: 'capTren',
                                        ...getColumnSearchProps('captren', 'Cấp trên'),
                                        render: (text) => <p>{text}</p>,
                                    },
                                    {
                                        title: 'Loại ',
                                        dataIndex: 'loaiDv',

                                        key: 'loaiDv',
                                        ...getColumnSearchProps('loaiDv', 'Loại '),
                                        render: (text) => <p>{text}</p>,

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
                </Layout>

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
                    <Form.Item label="Cấp trên" name="capTren">
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
                    <Form.Item label="Loại đơn vị" name="loaiDv">

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
                            options={loaiDonViData.map(item => ({
                                value: item.tenNhom, // Assuming your API response has 'value' and 'label' fields
                                label: item.tenNhom,
                            }))}
                        />

                    </Form.Item>

                    <Form.Item label="Tên đơn vị" name="ten">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="diaChi">
                        <Input />
                    </Form.Item>
                    <Form.Item label="SĐT" name="sdt">
                        <Input />
                    </Form.Item>

                </Form>
            </Modal >







        </>
    )

}
export default DonVi;