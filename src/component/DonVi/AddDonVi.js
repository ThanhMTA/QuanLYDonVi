import React from "react";
import {

} from '@ant-design/icons';
import { Layout, Breadcrumb, theme, Space, Button } from 'antd';
import Nav from '../Nav';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

// import './index.css'
const { Header, Content, Sider } = Layout;

const Home = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <Nav />



            <Content
                style={{
                    // padding: 24,
                    margin: 0,
                    minHeight: 700,
                    background: colorBgContainer,
                    padding: '64px 24px 24px 274px',
                    zIndex: 0,

                    // display: 'flex',
                }}
            >
                Content
                <h1>thanh </h1>

            </Content>





        </>
    )

}
export default Home;