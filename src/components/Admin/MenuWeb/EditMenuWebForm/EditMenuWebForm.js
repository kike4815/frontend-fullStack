import React,{useState,useEffect} from 'react'
import {Form,Input,Button,notification} from 'antd'
import { updateMenuApi } from '../../../../api/menu'
import { getAccessToken } from '../../../../api/auth'
import {FontSizeOutlined, LinkOutlined} from '@ant-design/icons'


import './EditMenuWebForm.scss'

export default function EdfitMenuWebForm(props) {
    const { setIsVisible,setReloadMenuWeb, menu} = props
    const [menuWebData, setmenuWebData] = useState(menu)

    useEffect(() => {
        setmenuWebData(menu)
    }, [menu])

    const editMenu =()=> {
        if(!menuWebData.title || !menuWebData.url){
            notification['error']({
                message:'todos los campos son obligatorios'
            })
        }else {
            const accestoken = getAccessToken()
            updateMenuApi(accestoken,menuWebData._id,menuWebData).then(response => {
                notification['success']({
                    message:response 
                });
                setIsVisible(false)
                setReloadMenuWeb(true)
            }).catch(() => {
                    notification['error']({
                        message:'Error en el servidor, intentelo más tarde'
                    })
                })
            
        }
    }

    return (
        <div className='edit-menu-web-form'>
            <EditForm menuWebData={menuWebData} setmenuWebData={setmenuWebData} editMenu={editMenu} />
        </div>
    )
}

function EditForm(props){
    const {menuWebData, setmenuWebData,editMenu} = props
    return (
        <Form className='form-edit'onFinish={editMenu}>
            <Form.Item>
                <Input 
                prefix={<FontSizeOutlined />}
                placeholder='Título'
                value={menuWebData.title}
                onChange={e => setmenuWebData({...menuWebData,title : e.target.value})}    
                />
            </Form.Item>
            
            <Form.Item>
            <Input 
                prefix={<LinkOutlined />}
                placeholder='URL'
                value={menuWebData.url}
                onChange={e => setmenuWebData({...menuWebData,url : e.target.value})}    
                />
            </Form.Item>
            
            <Form.Item>
                <Button type='primary' htmlType='submit'className='btn-submit'>Actualizar menú</Button>
            </Form.Item>


        </Form>
    )
}