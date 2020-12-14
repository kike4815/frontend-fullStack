import React, { useEffect, useState } from 'react'
import CoursesList from '../components/Web/Courses/CoursesList'
import PresentationCourse from '../components/Web/Courses/PresentationCourse'
import {Spin,Row,Col, notification} from 'antd'
import {getCoursesApi} from '../api/courses'

export default function Courses() {
    const [courses, setCourses] = useState(null)

    useEffect(() => {
    getCoursesApi()
    .then(response => {
        if(response?.code !== 200){
            notification['warning']({
                message: response.message
            })
        }else {
            setCourses(response.courses)
        }
    })
    .catch(()=> {
        notification['error']({
            message: 'Error en el servidor, intentelo más tarde'
        })
    })   
    }, [])

    return (
        <Row>
            <Col md={4}/>
            <Col md={16}>
                <PresentationCourse />
                {!courses ? (
                    <Spin tip='Cargando cursos'
                    style={{textAlign:'center',width:'100%', padding: '20px'}}
                    />
                ):(

                <CoursesList courses={courses}/>
                )}
            </Col>
            <Col md={4}/>
        </Row>
    )
}
