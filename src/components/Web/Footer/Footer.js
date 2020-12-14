import React from 'react'
import {Layout,Col,Row} from 'antd'
import MyInfo from './MyInfo';
import NavigationFooter from './NavigationFooter';
import NewsLetter from '../NewsLetter';

import './Footer.scss'

export default function Footer() {
    const { Footer } = Layout;

    return (
        <Footer className='footer'>
            <Row>
                <Col md={4}/>
                <Col md={16}>
                    <Row>
                        <Col md={8}><MyInfo /></Col>
                        <Col md={8}><NavigationFooter /></Col>
                        <Col md={8}><NewsLetter /></Col>
                    </Row>
                    <Row className='footer__copyright'>
                        <Col md={12}>@ 2020 NO RIGHTS RESERVED</Col>
                        <Col md={12}>ENRIC PEDRÓS SANCHEZ || ENTRY LEVEL</Col>
                    </Row>
                </Col>
                <Col md={4}/>
            </Row>
        </Footer>
    )
}
