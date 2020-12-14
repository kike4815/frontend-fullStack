import React from 'react'
import {Row,Col,Card, Button} from 'antd'
import {Link} from 'react-router-dom'
import reactJSHooks from '../../../assets/img/jpg/react-js-hooks.jpg'
import reactNative from '../../../assets/img/jpg/react-native.jpg'
import javascript from '../../../assets/img/jpg/javascript-es6.jpg'
import wordpress from '../../../assets/img/jpg/wordpress.jpg'
import prestashop from '../../../assets/img/jpg/prestashop-1-7.jpg'
import cssgrid from '../../../assets/img/jpg/css-grid.jpg'

import './HomeCourses.scss'

export default function HomeCourses() {
    return (
        <Row className='home-courses'>
            <Col lg={24} className='home-courses__title'><h2>Aprende y mejora tus habilidades</h2></Col>
            <Col lg={4}/>
            <Col lg={16}>
                <Row className='row-courses'>
                    <Col md={6}>
                        <CardCourse image={reactJSHooks} 
                        title='React JS Hooks'
                        subtitle='Intermedio - React/Javascript'
                        link='https://www.udemy.com/es/topic/react'
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse image={reactNative} 
                        title='React Native Expo'
                        subtitle='Intermedio - React/Javascript'
                        link='https://www.udemy.com/course/react-native-expo-creando-mini-tripadvisor-de-restaurantes'
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse image={javascript} 
                        title='JavaScript ES6'
                        subtitle='Básico - Javascript'
                        link='https://www.udemy.com/es/topic/javascript'
                        />
                    </Col>
                    <Col md={6}>
                        <CardCourse image={wordpress} 
                        title='Wordpress'
                        subtitle='Básico - Wordpress'
                        link='https://www.udemy.com/topic/wordpress/'
                        />
                    </Col>
                    
                </Row >
                <Row className='row-courses'>
                <Col md={6}>
                        <CardCourse image={prestashop} 
                        title='PrestaShop 1.0'
                        subtitle='Básico - Prestashop'
                        link='https://www.udemy.com/es/topic/prestashop/'
                        />
                    </Col>
                    <Col md={6}/>  
                    <Col md={6}/>
                    <Col md={6}>
                        <CardCourse image={cssgrid} 
                        title='CSS grid'
                        subtitle='Intermedio - CSS'
                        link='https://www.udemy.com/course/css-grid-y-flexbox-la-guia-definitiva-crea-10-proyectos/'
                        />
                    </Col>  
                </Row>

            </Col>
            <Col lg={4}/>
            <Col lg={24} className='home-courses__more'>
                <Link to={'/courses'}>
                    <Button>Ver más</Button>
                </Link>
            </Col>
        </Row>
    )
}

function CardCourse(props){
    const {image,title, subtitle,link} = props
    const {Meta} = Card

    return (
        <a href={link} target='_blank' rel="noopener noreferrer">
            <Card
            className='home-courses__card'
            cover={<img src={image} alt={title}/>}
            actions={[<Button>Ingresar</Button>]}
            >
              <Meta title={title} description={subtitle}/>  
            </Card>
        </a>
    )
}
