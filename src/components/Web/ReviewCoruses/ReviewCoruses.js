import React from 'react'
import {Row, Col, Card, Avatar} from 'antd'
import AvatarNerd from '../../../assets/img/svg/avatar-de-perfil-masculino-nerd.svg'

import './ReviewCoruses.scss'

export default function ReviewCoruses() {
    return (
        <Row className='reviews-courses'>
            <Row>
                <Col lg={4}/>
                <Col lg={16} className='reviews-courses__title'>
                    <h2>
                        Forma parte de los 35 mil estudiantes que estan aprendiendo con los cursos
                    </h2>
                </Col>
                <Col lg={4}/>
            </Row>
            <Row>
                <Col lg={4}/>
                <Col lg={16}>
                    <Row className='row-cards'>
                        <Col md={8}>
                        <CardReview 
                        name='Alfonso Campo'
                        subtitle='Alumno de Udemy'
                        avatar={AvatarNerd}
                        review='Un curso excelente,el profesor explica bien pero no contesta a las preguntas, una lastima que pierda puntuación por estas cosas'
                        />
                        </Col>
                        <Col md={8}>
                        <CardReview 
                        name='Fernando Simon'
                        subtitle='Alumno de Udemy'
                        avatar={AvatarNerd}
                        review='Un curso excelente,el profesor explica bien pero no contesta a las preguntas, una lastima que pierda puntuación por estas cosas'
                        />
                        </Col>
                        <Col md={8}>
                        <CardReview 
                        name='Pablo Iglesias'
                        subtitle='Alumno de Udemy'
                        avatar={AvatarNerd}
                        review='Un curso excelente,el profesor explica bien pero no contesta a las preguntas, una lastima que pierda puntuación por estas cosas'
                        />
                        </Col>
                    </Row>
                    <Row className='row-cards'>
                        <Col md={8}>
                        <CardReview 
                        name='Amancio Ortega'
                        subtitle='Alumno de Udemy'
                        avatar={AvatarNerd}
                        review='Un curso excelente,el profesor explica bien pero no contesta a las preguntas, una lastima que pierda puntuación por estas cosas'
                        />
                        </Col>
                        <Col md={8}>
                        <CardReview 
                        name='Adolf Jitla'
                        subtitle='Alumno de Udemy'
                        avatar={AvatarNerd}
                        review='Un curso excelente,el profesor explica bien pero no contesta a las preguntas, una lastima que pierda puntuación por estas cosas'
                        />
                        </Col>
                        <Col md={8}>
                        <CardReview 
                        name='Julio Iglesias'
                        subtitle='Alumno de Udemy'
                        avatar={AvatarNerd}
                        review='Un curso excelente,el profesor explica bien pero no contesta a las preguntas, una lastima que pierda puntuación por estas cosas'
                        />
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}/>
            </Row>
        </Row>
    )
}

function CardReview(props){
    const {name, subtitle, avatar,review} = props
    const {Meta} = Card

    return (
        <Card className='reviews-courses__card'>
            <p>{review}</p>
            <Meta 
                avatar={<Avatar src={avatar}/>}
                title={name}
                description={subtitle}
            />
        </Card>
    )
}