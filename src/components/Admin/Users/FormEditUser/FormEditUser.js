import React, { useState,useCallback, useEffect } from 'react'
import {Avatar,Form,Input,Select,Button,Col,Row, notification} from 'antd'
import {useDropzone} from 'react-dropzone'
import {UserOutlined, MailOutlined, LockOutlined} from '@ant-design/icons'
import NoAvatar from '../../../../assets/img/png/no-avatar.png'
import { getAvatarApi, updateUserApi,uploadAvatarApi } from '../../../../api/user'
import {getAccessToken} from '../../../../api/auth'

import './FormEditUser.scss'

export default function FormEditUser(props) {
    const {user, setIsVisible,setUsersReload} = props
    const [avatar, setAvatar] = useState(null)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        setUserData({
            name:user.name,
            lastname: user.lastname,
            email:user.email,
            role:user.role,
            avatar:user.avatar
        })    
    }, [user])
    
    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response)
            })
        }else {
            setAvatar(null)
        }
    }, [user])

    useEffect(() => {
        if(avatar){
            setUserData({...userData, avatar: avatar.file})
        }    
    }, [avatar])


    const updateUser = () => {
        
        const token = getAccessToken()
        let userUpdate = userData

        if(userUpdate.password || userUpdate.repeatPassword){
            if(userUpdate.password !== userUpdate.repeatPassword){
                notification['error']({
                    message: 'Las contraseñas deben ser iguales'
                })
                return
            }else {
                delete userUpdate.repeatPassword
                
            }
        }
        if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email){
            notification['error']({
                message: 'El nombre, apellidos, y email son obligatorios'
            })
            return
        }

        if(typeof userUpdate.avatar == 'object'){
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response =>{
                userUpdate.avatar = response.avatarName
                updateUserApi(token, userUpdate, user._id).then(result => {
                    notification['success']({
                        message: result.message
                    })
                    setIsVisible(false)
                    setUsersReload(true)
                    setUserData({...userData, password:"", repeatPassword:""});
                })    
            })
        }else {
            updateUserApi(token, userUpdate, user._id).then(result => {
                notification['success']({
                    message: result.message
                })
                setIsVisible(false)
                setUsersReload(true)
                setUserData({...userData, password:"", repeatPassword:""});
            })
        }
    }

    return (
        <div className='edit-user-form'>
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}/>
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    )
}

function UploadAvatar(props){
const {avatar, setAvatar} = props
const [avatarURL, setAvatarURL] = useState(null)

useEffect(() => {
    if(avatar){
        if(avatar.preview){
            setAvatarURL(avatar.preview)
        }else {
            setAvatarURL(avatar)
        }
    }else {
        setAvatarURL(null)
    }
}, [avatar])

const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]
    setAvatar({file, preview: URL.createObjectURL(file)})
  }, [setAvatar])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      accept:'image/jpeg, image/png',
      noKeyboard:true,
      onDrop
  })

  return (
    <div  className='upload-avatar' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <Avatar size={150} src={NoAvatar}/>
        :
        <Avatar size={150} src={avatarURL ? avatarURL : NoAvatar}/>

      }
    </div>
  )

}
function EditForm (props){
    const {userData, setUserData, updateUser} = props
    const {Option} = Select
    return (
        <Form 
        className='form-edit'
        onFinish={updateUser}
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input 
                        prefix={<UserOutlined />}
                        placeholder='Nombre'
                        value={userData.name}
                        onChange={e => setUserData({...userData, name: e.target.value })}
                        />
                    </Form.Item>

                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input 
                        prefix={<UserOutlined />}
                        placeholder='Apellido'
                        value={userData.lastname}
                        onChange={e => setUserData({...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>  
                        <Input 
                        prefix={<MailOutlined />}
                        placeholder='Email'
                        value={userData.email}
                        onChange={e => setUserData({...userData, email: e.target.value })}
                        />
                 </Form.Item>   
                </Col>
                <Col span={12}>
                <Form.Item> 
                    <Select 
                    placeholder='Selecciona un rol'
                    onChange={e=> setUserData({...userData, role: e})}
                    value={userData.role}
                    >
                        <Option value='admin'>Administrador</Option>
                        <Option value='editor'>Editor</Option>
                        <Option value='reviewer'>Revisor</Option>
                    </Select>
                    </Form.Item>  
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input 
                        prefix={<LockOutlined />}
                        placeholder='Password'
                        value={userData.password}
                        type='password'
                        onChange={e => setUserData({...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input 
                        prefix={<LockOutlined />}
                        placeholder='Password'
                        value={userData.repeatPassword}
                        type='password'
                        onChange={e => setUserData({...userData, repeatPassword: e.target.value })}
                        />
                    </Form.Item>

                </Col>
            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Actualizar Usuario
                </Button>
            </Form.Item>
        </Form>
    )
}