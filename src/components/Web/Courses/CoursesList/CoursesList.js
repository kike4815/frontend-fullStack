import React, { useState,useEffect } from 'react'
import {getCourseUdemyApi} from '../../../../api/courses'
import {Row,Col,Button,notification,Card,Rate} from 'antd'

import './CoursesList.scss'


export default function CoursesList(props) {
    const {courses} = props
    
    return (
        <div className='courses-list'>
            <Row>
                {courses.map(course => (
                    <Col key={course._id} md={8} className='courses-list__course'>
                        <Course course={course}/>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

function Course(props){
    const {course} = props
    const [courseInfo, setcourseInfo] = useState({})
    const [urlCourse, seturlCourse] = useState('')
    const {Meta} = Card

    useEffect(() => {
        getCourseUdemyApi(course.idCourse).then(response=> {
            if(response?.code !== 200){
                notification['error']({
                    message: 'Error en el servidor, intentelo más tarde'
                })
            }else {
                setcourseInfo(response.data)
                mountUrl(response.data.url)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course])
    
    const mountUrl=url=>{
        if(!course.link){
            const baseUrl = `https://www.udemy.com${url}`
            const finalUrl = baseUrl + (course.coupon ? `?couponCode=${course.coupon}`:"")
            seturlCourse(finalUrl)
        }else {
            seturlCourse(course.link)
        }
    }

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href={urlCourse} target='_blank' rel='noopener noreferrer'>
        <Card cover={<img src={courseInfo.image_480x270} alt={courseInfo.title}/>}>
            <Meta title={courseInfo.title} description={courseInfo.headline}/>
            <Button>Entrar al curso</Button>
            <div className='courses-list__course-footer'>
                <span>{course.price ? `${course.price} €`: courseInfo.price}</span>
                <div>
                    <Rate disabled defaultValue={5} />
                </div>
            </div>
        </Card>
        </a>

    )
}
