import React,{useEffect, useState} from 'react'
import {Switch,List,Avatar,Button,notification, Modal as ModalAntd} from 'antd'
import NoAvatar from '../../../../assets/img/png/no-avatar.png'
import {EditOutlined,DeleteOutlined,StopOutlined} from '@ant-design/icons'
import Modal from '../../../Modal'
import FormEditUser from '../FormEditUser'
import { getAvatarApi,activateUserApi,deleteUserApi } from '../../../../api/user'
import {getAccessToken} from '../../../../api/auth'
import AddUserForm from '../AddUserForm'

import './ListUsers.scss'

const {confirm } = ModalAntd

export default function ListUsers(props) {
    const {usersActive,usersInactive,setUsersReload} = props
    const [viewUsersActives, setViewUsersActives] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalContent, setModalContent] = useState('')

    const addUserModal = () => {
        setIsVisible(true)
        setModalTitle('Creando nuevo usuario')
        setModalContent(
            <AddUserForm setIsVisible={setIsVisible} setUsersReload={setUsersReload}/>
        )   
    }

    return (
        <div className='list-users'>
            <div className='list-users__header'>

            <div className='list-users__header-switch'>
                <Switch 
                    defaultChecked
                    onChange={()=> setViewUsersActives(!viewUsersActives)}
                />
            <span>{viewUsersActives ? 'Usuarios Activos': 'Usuarios Inactivos'}</span>
            </div>

            <Button type='primary' onClick={addUserModal}>
                Nuevo Usuario
            </Button>
            </div>

            {viewUsersActives ? <UsersActive 
            usersActive={usersActive}
            setIsVisible={setIsVisible}
            setModalContent={setModalContent}
            setModalTitle={setModalTitle}
            setUsersReload={setUsersReload}
            /> : <UsersInactive usersInactive={usersInactive} setUsersReload={setUsersReload}/>}

            <Modal 
            title={modalTitle}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            >
                {modalContent}
            </Modal>
        </div>
    )
}

function UsersActive(props){
    const {usersActive,setIsVisible, setModalContent,setModalTitle,setUsersReload} = props

    const editUser = user => {
        setIsVisible(true)
        setModalTitle(`Editar ${user.name ? user.name : '...'} ${user.lastname ? user.lastname:'...'}`)
        setModalContent(<FormEditUser user={user} setIsVisible={setIsVisible} setUsersReload={setUsersReload}/>)
    }

    return (
        <List
        className='users-active' 
        itemLayout='horizontal'
        dataSource={usersActive}
        renderItem={user => (<UserActive user={user} editUser={editUser} setUsersReload={setUsersReload}/>)}
        />
    )
}

function UserActive(props) {
    const {user,editUser,setUsersReload} = props
    const [avatar, setAvatar] = useState(null)

    useEffect(()=>{
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response)
            })
        }else {
            setAvatar(null)
        }
    },[user])

    const desactivate = () => {
        const accesToken = getAccessToken()

        activateUserApi(accesToken,user._id,false).then(response => {
            notification['success']({
                message:response
            })
            setUsersReload(true)
        }).catch(err => {
            notification['error']({
                message: err
            })
        })
    }

    const showDeleteConfirm =()=> {
        const accestoken = getAccessToken()
        confirm({
            title:'Eliminando usuario',
            content:`Estas seguro que quieres eliminar a ${user.email}?`,
            okText: 'Eliminar',
            okType:'danger',
            cancelText:'Cancelar',
            onOk(){
                deleteUserApi(accestoken,user._id).then(response => {
                    notification['success']({
                        message: response
                    })
                    setUsersReload(true)
                }).catch(error => {
                    notification['error']({
                        message:error
                    })
                })
            }
        })
    }

    return (
        <List.Item
            actions={[
                <Button 
                type='primary'
                onClick={()=> editUser(user)}
                >
                    <EditOutlined />
                </Button>,
                <Button 
                type='primary'
                style={{background:'#52c41a'}}
                onClick={desactivate}
                >
                    <StopOutlined />
                </Button>,
                <Button 
                type='danger'
                onClick={showDeleteConfirm}
                >
                    <DeleteOutlined /> 
                </Button>

            ]
            }
            >
                <List.Item.Meta 
                    avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
                    title={`
                    ${user.name ? user.name : '...'}
                    ${user.lastname ? user.lastname : '...'}
                    `}
                    description={user.email}
                />
            </List.Item> 
            
    )
}

function UsersInactive(props){
    const {usersInactive,setUsersReload} = props
    return (
        <List
        className='users-active' 
        itemLayout='horizontal'
        dataSource={usersInactive}
        renderItem={user => (
            <UserInactive user={user} setUsersReload={setUsersReload}/>
        )}
        />
    )
}

function UserInactive(props){
    const {user,setUsersReload} = props
    const [avatar, setAvatar] = useState(null)
    useEffect(() => {
        if(user.avatar){
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response)
            })
        }else {
            setAvatar(null)
        }
    }, [user]);

    const activateUser = () =>{
        const accesToken = getAccessToken()
        activateUserApi(accesToken,user._id,true)
        .then(response => {
            notification['success']({
                message:response
            })
            setUsersReload(true)
        }).catch(err => {
            notification['error']({
                message: err
            })
        
        })
    }

    const showDeleteConfirm = () => {
        const accestoken = getAccessToken()
        confirm({
            title:'Eliminando usuario',
            content:`Estas seguro que quieres eliminar a ${user.email}?`,
            okText: 'Eliminar',
            okType:'danger',
            cancelText:'Cancelar',
            onOk(){
                deleteUserApi(accestoken,user._id).then(response => {
                    notification['success']({
                        message: response
                    })
                    setUsersReload(true)
                }).catch(error => {
                    notification['error']({
                        message:error
                    })
                });
            }
        })
    }

    return (
        <List.Item
            actions={[
                <Button 
                type='primary'
                style={{background:'#52c41a'}}
                onClick={activateUser}
                >
                    <StopOutlined />
                </Button>,
                <Button 
                type='danger'
                onClick={showDeleteConfirm}
                >
                    <DeleteOutlined /> 
                </Button>

            ]
            }
            >
                <List.Item.Meta 
                    avatar={<Avatar src={avatar ? avatar : NoAvatar}/>}
                    title={`
                    ${user.name ? user.name : '...'}
                    ${user.lastname ? user.lastname : '...'}
                    `}
                    description={user.email}
                />
            </List.Item> 
            
    )
}