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

import Nav from '../../Nav';
// import './index.css'
const { Header, Content, Sider } = Layout;
const { confirm } = Modal;
const { Search } = Input;
const { Title } = Typography;

// const onSearch = (value, _e, info) => console.log(info?.source, value);

// form 
const { Option } = Select;



const HocVienHL = () => {

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

        fetchKHHLData();
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
    const fetchDVHLData = async (id) => {
        try {
            const response = await fetch(`https://localhost:44325/api/DVHL/${id}`);
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
            const response = await fetch(`https://localhost:44325/api/DVHL/Filter/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setHocVienData(data);
        } catch (error) {
            console.error('There was a problem fetching the data: ', error);
        }
    };
    //
    const fetchKHHLData = async () => {
        try {
            const response = await fetch('https://localhost:44325/api/KHHL');
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
        fetchDVHLData(value);
        setSelected(value);
    }
    const handleSelectChangeHV = (value) => {
        // Assuming value is the selected ID from the Select component
        fetchHVHLData(value);

    }

    //  API them don vi moi 
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // add new don vi 
    const handleAddButtonClick = async () => {
        try {
            const formData = form.getFieldsValue();
            setLoading(true);

            const response = await fetch('https://localhost:44325/api/DVHL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const updatedResponse = fetchDVHLData(formData.khhl);
            const updatedData = await updatedResponse.json();
            setDVHLData(updatedData);
            setLoading(false);
            setOpen(false); // Check that this line is reached and the modal state is being updated properly
        } catch (error) {
            console.error('Error adding data:', error);
            setLoading(false);
            setOpen(false);

        }
    };

    const handleDeleteButtonClick = (dv) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đơn vị này?")) {
            fetch(`https://localhost:44325/api/DVHL/${selected}/${dv}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Xóa thành công, cập nhật lại danh sách đơn vị
                        return fetchDVHLData(selected);
                    }
                    throw new Error('Delete request failed');
                })
                .then(response => response.json())
                .then(updatedData => {
                    // Cập nhật state donViData với danh sách mới
                    setDVHLData(updatedData);
                })
                .catch(error => console.error('Error deleting or fetching data:', error));
        }
    };
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
    const showModal = () => {
        form.resetFields()
        form.setFieldsValue({
            khhl: selected
        });
        setOpen(true)
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
                        <Form.Item label="Kế hoạch huấn luyện"
                            name="Khoa"
                            rules={[{ required: true }]}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 400,
                                paddingTop: "20px"
                            }}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                onChange={handleSelectChange}
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={KHHLData.map(item => ({
                                    value: item.id,
                                    label: item.noidung,
                                }))}
                            />
                        </Form.Item>
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
                                                title: 'Đơn vị',
                                                dataIndex: 'donVi',
                                                key: 'donVi',

                                            }
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
                                                <Button type="primary" size='middle' onClick={showModal}>
                                                    <PlusOutlined />
                                                </Button>


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
                                            {
                                                title: 'Hành động',
                                                key: 'action',
                                                render: (_, record) => (
                                                    <Space size="middle">

                                                        <DeleteTwoTone onClick={() => handleDeleteButtonClick(record.id)} />

                                                    </Space>
                                                ),
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
                title="thêm đơn vị"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="huy" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="them" type="primary" onClick={handleAddButtonClick} loading={loading}>
                        Thêm
                    </Button>

                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="khhl" name="khhl">
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            onChange={handleSelectChange}
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={KHHLData.map(item => ({
                                value: item.id, // Assuming your API response has 'value' and 'label' fields
                                label: item.noidung,
                            }))}
                            // style={{ width: 380 }}
                            value={selected}
                            disabled
                        />
                    </Form.Item>
                    <Form.Item label="Đơn vị" name="donVi">
                        <TreeSelect

                            showSearch

                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            treeData={treeData}

                        />
                    </Form.Item>


                </Form>
            </Modal >


        </>
    )

}
export default HocVienHL;