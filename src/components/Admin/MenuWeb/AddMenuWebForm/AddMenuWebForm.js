import React,{useState} from 'react'
import {Form,Input,Button,Select,notification} from 'antd'
import {FontSizeOutlined} from '@ant-design/icons'
import {addMenuApi} from '../../../../api/menu'
import {getAccessToken} from '../../../../api/auth'

import './AddMenuWebForm.scss'

export default function AddMenuWebForm(props) {
    const {setIsVisible,setReloadMenuWeb} = props
    const [menuwebData, setMenuwebData] = useState({})

    const addMenu = () => {
        let finalData = {
            title: menuwebData.title,
            url: (menuwebData.http ? menuwebData.http : 'http://' ) + menuwebData.url
        }

        if(!finalData.title || !menuwebData.url || !finalData.url){
            notification['error']({
                message:'Todos los campos son obligatorios'
            })
        }else {
            const accestoken = getAccessToken()
            finalData.active = false
            finalData.order = 1000

            addMenuApi(accestoken, finalData).then(response => {
                notification['success']({
                    message: response
                })
                setIsVisible(false)
                setReloadMenuWeb(true)
                setMenuwebData({})
                finalData = {}
            }).catch(()=> {
                notification['error']({
                    message:'Error en el servidor'
                })
            })
        }
    }

    return (
        <div className='add-menu-web-form'>
            <Addform menuwebData={menuwebData} setMenuwebData={setMenuwebData} addMenu={addMenu}/>
        </div>
    )
}

function Addform(props){
    const {menuwebData,setMenuwebData,addMenu} = props
    const {Option} = Select

    const selectBefore = (
        <Select 
        style={{width:90}} 
        defaultValue='http://'
        onChange={e=> setMenuwebData({...menuwebData,http:e})}
        >
            <Option value='http://'>http://</Option>
            <Option value='https://'>https://</Option>
        </Select>
    )

    return (
        <Form className='form-add' onFinish={addMenu}>
            <Form.Item>
                <Input 
                    prefix={<FontSizeOutlined />}
                    placeholder='Título'
                    value={menuwebData.title}
                    onChange={e => setMenuwebData({...menuwebData,title : e.target.value})}    
                />
            </Form.Item>

            <Form.Item>
                <Input 
                    addonBefore={selectBefore}
                    placeholder='URL'
                    value={menuwebData.url}
                    onChange={e => setMenuwebData({...menuwebData,url : e.target.value})}    
                />
            </Form.Item>

            <Form.Item>
                <Button type='primary'htmlType='submit' className='btn-submit'>Crear Menú</Button>
            </Form.Item>
        </Form>
    )
}