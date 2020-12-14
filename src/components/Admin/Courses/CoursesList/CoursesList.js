import React, { useEffect, useState } from 'react'
import {deleteCourseApi, editCourseApi, getCourseUdemyApi} from '../../../../api/courses'
import {List,Button,Modal as ModalAntd, notification} from 'antd'
import Modal from '../../../Modal'
import DragSortTableList from 'react-drag-sortable'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import {getAccessToken} from '../../../../api/auth'
import AddEditCourseForm from '../AddEditCourseForm'

import './CoursesList.scss'

const {confirm} = ModalAntd

export default function CoursesList(props) {
    const {courses,setReloadCourses} = props

    const [listCourses, setListCourses] = useState([])
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)

    useEffect(() => {
        const listCoursesArray = []
        courses.forEach(course => {
            listCoursesArray.push({
                content:(
                    <Course course={course} deleteCourse={deleteCourse} editCourseModal={editCourseModal}/>
                )
            })
        });
        setListCourses(listCoursesArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses])

    const onSort =(sortedList,dropEvent)=>{
        const accesToken=getAccessToken()
        sortedList.forEach(item => {
            const {_id} = item.content.props.course
            const order = item.rank
            editCourseApi(accesToken,_id,{order})
        })
    }

    const addCourseModal =()=> {
        setIsVisibleModal(true)
        setModalTitle('Creando nuevo curso')
        setModalContent(<AddEditCourseForm 
            setIsVisibleModal={setIsVisibleModal}
            setReloadCourses={setReloadCourses}
        />)
    }
    const editCourseModal =course=> {
        setIsVisibleModal(true)
        setModalTitle('Actualizando curso')
        setModalContent(<AddEditCourseForm 
            setIsVisibleModal={setIsVisibleModal}
            setReloadCourses={setReloadCourses}
            course={course}
        />)
    }

    const deleteCourse = course => {
        const accesToken = getAccessToken()
        confirm({
            title:'Eliminando curso',
            content:`Estás seguro que quieres eliminar el curso ${course.idCourse} ?`,
            okText:'Eliminar',
            okType:'danger',
            cancelText:'Cancelar',
            onOk(){
                deleteCourseApi(accesToken,course._id).then(response => {
                    const typeNotification = response.code === 200 ? 'success' : 'warning'
                    notification[typeNotification]({
                        message: response.message
                    })
                    setReloadCourses(true)
                }).catch(() => {
                    notification['error']({
                        message: 'Error del servidor, intentelo más tarde'
                    })
                })
            }
        })
    }
    
    return (
        <div className='courses-list'>
            <div className='courses-list__header'>
                <Button type='primary' onClick={addCourseModal}>Nuevo Curso</Button>
            </div>
           <div className='courses-list__items'>
            {listCourses.length === 0 && (
                <h2 style={{textAlign:'center',margin:0}}>no tienes cursos creados</h2>
            )}
            <DragSortTableList items={listCourses} onSort={onSort} type='vertical'/>
           </div>
           <Modal
            title={modalTitle}
            isVisible={isVisibleModal}
            setIsVisible={setIsVisibleModal}
           >
               {modalContent}
           </Modal>
        </div>
    )
}

function Course(props){
    const {course,deleteCourse,editCourseModal} = props
    const [coursData, setCoursData] = useState(null)

    useEffect(() => {
        getCourseUdemyApi(course.idCourse).then(response => {
            if(response.code !== 200){
                notification['warning']({
                    message: `El curso  con el id ${course.idCourse} no se ha encontrado `
                })
            }
            setCoursData(response.data)
        })
    }, [course])

    if(!coursData){
        return null
    }

    return (
        <List.Item 
            actions={[
                <Button type='primary' onClick={()=>editCourseModal(course)}>
                <EditOutlined />
            </Button>,
            <Button type='danger' onClick={()=>deleteCourse(course)}>
                <DeleteOutlined />
            </Button>
            ]}
        >
            <img 
                src={coursData.image_480x270}
                alt={coursData.title}
                style={{width:'100px',marginRight:'20px'}}
            />
            <List.Item.Meta 
                title={`${coursData.title} | ID: ${course.idCourse}`}
                description={`${coursData.headline}`}
            />
        </List.Item>
    )
}