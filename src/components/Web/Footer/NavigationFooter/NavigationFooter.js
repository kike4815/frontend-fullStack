import React from 'react'
import {Row,Col} from 'antd'
import { BookOutlined} from '@ant-design/icons'

import './NavigationFooter.scss'

export default function NavigationFooter() {
    return (
        <Row className='navigation-footer'>
            <Col md={24}>
                <h3>Navegacion</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft />
            </Col>
            <Col md={12}>
                <RenderListRight />
            </Col>
        </Row>
    )
}

function RenderListLeft(){
    return (
        <ul>
            <li>
                <a href='#'>
                    <BookOutlined />Cursos online
                </a>
            </li>
            <li>
                <a href='#'>
                    <BookOutlined />Cursos online
                </a>
            </li>
            <li>
                <a href='#'>
                    <BookOutlined />Cursos online
                </a>
            </li>
            <li>
                <a href='#'>
                    <BookOutlined />Cursos online
                </a>
            </li>
        </ul>
    )
}

function RenderListRight(){
    return (
        <ul>
            <li>
                <a href='#'>
                    <BookOutlined />Cursos online
                </a>
            </li>
            <li>
                <a href='#'>
                    <BookOutlined />Cursos online
                </a>
            </li>
            <li>
                <a href='#'>
                    <BookOutlined />Cursos online
                </a>
            </li>
            <li>
                <a href='#'>
                    <BookOutlined />Cursos online
                </a>
            </li>
        </ul>
    )
}
