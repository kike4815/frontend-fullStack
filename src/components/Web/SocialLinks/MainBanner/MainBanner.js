import React from 'react'
import {Row,Col} from 'antd'

import './MainBanner.scss'

export default function MainBanner() {
    return (
        <div className='main-banner'>
            <div className='main-banner__dark'/>
            <Row>
            <Col lg={4}/>
            <Col lg={16}>
                <h2>Aprender nuevas <br /> tecnologia web y mobil</h2>
                <h3>A través de cursos prácticos, concisos y actualizados, creador por {""}
                <br />
                profesionales con experiencia
                </h3>
            </Col>
            <Col lg={4}/>
            </Row>
        </div>
    )
}
