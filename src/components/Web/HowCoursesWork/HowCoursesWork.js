import React from 'react';
import {Row, Col, Card} from 'antd'
import {ClockCircleOutlined,KeyOutlined, MessageOutlined, UserOutlined,DollarCircleOutlined,CheckCircleOutlined} from '@ant-design/icons'

import './HowCoursesWork.scss'

export default function HowCoursesWork() {
    return (
        <Row className='how-my-courses-work'>
            <Col lg={24} className='how-my-courses-work__title'>
                <h2>Como funcionan los cursos?</h2>
                <h3>
                    Cada curso cuenta con contenido bajo la web de Udemy, activa las 24 h del dia los 365 dias al año
                </h3>
            </Col>

            <Col lg={4}/>
            <Col lg={16}>
                <Row className='row-cards'>
                    <Col md={8}>
                        <CardInfo 
                        icon={<ClockCircleOutlined />}
                        title='Cursos y clases'
                        description='Cursos entre 10 y 30 horas y cada clase del curso con una duración máxima de 30 horas'
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                        icon={<KeyOutlined />}
                        title='Acceso 24/7'
                        description='Cursos entre 10 y 30 horas y cada clase del curso con una duración máxima de 30 horas'
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                        icon={<MessageOutlined />}
                        title='Aprendizaje colaborativo'
                        description='Aprende de los demás dejando tus dudas para que profesores y compañeros te ayuden '
                        />
                    </Col>
                </Row>
                <Row className='row-cards'>
                    <Col md={8}>
                        <CardInfo 
                        icon={<UserOutlined />}
                        title='Mejora tu perfil'
                        description='Aprende y mejora tu perfil para mantenerte informado de actualizaciones'
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                        icon={<DollarCircleOutlined />}
                        title='Precios Bajos'
                        description='Obtén el curso que necesitas por solo 9.90 y ten acceso a el por tiempo ilimitado'
                        />
                    </Col>
                    <Col md={8}>
                        <CardInfo 
                        icon={<CheckCircleOutlined />}
                        title='Certificados de finalización'
                        description='Al completar tu curso recibirás una certificación que te expedirá Udemy en pdf'
                        />
                    </Col>
                </Row>
            </Col>
            <Col lg={4}/>
        </Row>
    )
}

function CardInfo(props){
    const {icon, title, description} = props
    const {Meta} = Card

    return(
        <Card className='how-my-courses-work__card'>
            {icon}
            <Meta title={title} description={description}/>
        </Card>
    )
}