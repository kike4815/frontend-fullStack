import React, { useEffect, useState } from 'react'
import {getAccessToken} from '../../../../api/auth'
import {Form,Input,Button,notification} from 'antd'
import {KeyOutlined,DollarOutlined,GiftOutlined,LinkOutlined} from '@ant-design/icons'
import { addCourseApi, editCourseApi } from '../../../../api/courses'

import './AddEditCourseForm.scss'

export default function AddEditCourseForm(props) {
    const {setIsVisibleModal,setReloadCourses,course} = props
    const [courseData, setCourseData] = useState({})

    useEffect(() => {        
        course ? setCourseData(course) : setCourseData({})      
    }, [course])

    const addCourse =()=>{
        if(!courseData.idCourse){
            notification['warning']({
                message:'El id del curso es obligatorio'
            })
        }else {
            const accestoken = getAccessToken()
            addCourseApi(accestoken,courseData).then(response => {
                const typeNotification = response.code === 200 ? 'success' : 'warning'
                notification[typeNotification]({
                    message: response.message
                })
                setIsVisibleModal(false)
                setReloadCourses(true)
                setCourseData({})

            }).catch(() => {
                notification['error']({
                    message: 'Error en el servidor , intentelo más tarde'
                })
            })
        }
    }
    const editCourse=()=>{
        const accestoken = getAccessToken()
        editCourseApi(accestoken,course._id, courseData).then(response=>{
            const typeNotification = response.code === 200 ? 'success': 'warning'
            notification[typeNotification]({
                message: response.message
            })
            setIsVisibleModal(false)
            setReloadCourses(true)
            setCourseData({})
        })
        .catch(()=>{
            notification['error']({
                message: 'Error en el servidor, intentelo más tarde'
            })
        })
    }

    return (
        <div className='add-edit-form-course'>
            <AddEditForm 
            course={course} 
            addCourse={addCourse} 
            editCourse={editCourse}  
            setCourseData={setCourseData}
            courseData={courseData}
            />
        </div>
    )
}
 function AddEditForm(props){
    const {course, addCourse,editCourse,setCourseData, courseData} = props
    return(
        <Form className='form-add-edit' onFinish={course ? editCourse : addCourse}>
            <Form.Item>
                <Input 
                    prefix={<KeyOutlined />}
                    placeholder='ID del curso'
                    value={courseData.idCourse}
                    onChange={e => setCourseData({...courseData, idCourse: e.target.value})}
                    disabled={course ? true : false}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={< LinkOutlined/>}
                    placeholder='URL'
                    value={courseData.url}
                    onChange={e => setCourseData({...courseData, url: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<GiftOutlined />}
                    placeholder='Cupón de descuento'
                    value={courseData.coupon}
                    onChange={e => setCourseData({...courseData, coupon: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<DollarOutlined />}
                    placeholder='Precio del curso'
                    value={courseData.price}
                    onChange={e => setCourseData({...courseData, price: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    {course ? 'Actualizar Curso': 'Crear Curso'}
                </Button>
            </Form.Item>
        </Form>
    )
 }