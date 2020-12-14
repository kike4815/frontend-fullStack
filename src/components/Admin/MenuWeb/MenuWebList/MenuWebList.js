import React,{useEffect,useState} from 'react'
import {Switch,List,Button,Modal as ModalAntd, notification} from 'antd'
import Modal from '../../../Modal'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import DragSortableList from 'react-drag-sortable'
import { deleteMenuApi, updateMenuApi,activateMenuApi } from '../../../../api/menu'
import {getAccessToken} from '../../../../api/auth'
import AddMenuWebForm from '../AddMenuWebForm'
import EditMenuWebForm from '../EditMenuWebForm'
// import 

import './MenuWebList.scss'

const { confirm } = ModalAntd

export default function MenuWebList(props) {
    const {menu,setReloadMenuWeb} = props
    const [listItems, setListItems] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalContent, setModalContent] = useState(null)

    useEffect(() => {
        const lisItemArray = []
        menu.forEach(item =>{
            lisItemArray.push({
                content:(
                    <MenuItem item={item} activateMenu={activateMenu} editMenuWebModal={editMenuWebModal} deleteMenuWeb={deleteMenuWeb}/>
                )
            })
        })
        setListItems(lisItemArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menu])

    const onSort = (sortedList, dropEvent) => {
        const token = getAccessToken()
        sortedList.forEach(item => {
            const {_id} = item.content.props.item
            const order = item.rank
            updateMenuApi(token,_id,{order} )
        })
        
    }

    const activateMenu = (menu, status) => {
        const accestoken = getAccessToken()
        activateMenuApi(accestoken,menu._id,status).then(response => {
            notification['success']({
                message:response
            })
        })
    }

    const addMenuWeb =() => {
        setIsVisible(true)
        setModalTitle('Creando nuevo menú')
        setModalContent(
            <AddMenuWebForm setIsVisible={setIsVisible} setReloadMenuWeb={setReloadMenuWeb}/>
        )
    }

    const editMenuWebModal = menu => {
        setIsVisible(true)
        setModalTitle(`Editando el menu: ${menu.title}`)
        setModalContent(
            <EditMenuWebForm setIsVisible={setIsVisible} setReloadMenuWeb={setReloadMenuWeb} menu={menu}/>
        )
    }

    const deleteMenuWeb = menu => {
        const {_id } = menu
        const accestoken = getAccessToken()

        confirm({
            title:'Eliminando menú',
            content:`Estàs seguro que quieres eliminar el menú ${menu.title}?`,
            okText:'Eliminar',
            cancelText:'Cancelar',
            okType:'danger',
            onOk(){
                deleteMenuApi(accestoken,_id).then(response => {
                    notification['success']({
                        message: response
                    })
                    setReloadMenuWeb(true)
                }).catch(()=> {
                    notification['error']({
                        message:'Error del servidor, intentelo más tarde'
                    })
                })
            }
        })
    }

    return (
        <div className='menu-web-list'>
            <div className='menu-web-list__header'>
                <Button type='primary' onClick={addMenuWeb}>Crear Menu</Button>
            </div>

            <div className='menu-web-list__items'>
                <DragSortableList items={listItems} onSort={onSort} type='vertical'/>
            </div>
            <Modal title={modalTitle}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            >
            {modalContent}
            </Modal>
        </div>      
    )
}

function MenuItem (props){
    const {item,activateMenu,editMenuWebModal,deleteMenuWeb} = props
    return (
        <List.Item actions={[
            <Switch defaultChecked={item.active} onChange={e=> activateMenu(item,e)}/>,
            <Button type='primary'><EditOutlined onClick={()=> editMenuWebModal(item)}/></Button>,
            <Button type='danger'><DeleteOutlined onClick={()=> deleteMenuWeb(item)}/></Button>
        ]}>
            <List.Item.Meta title={item.title} description={item.url}/>
        </List.Item>
    )
}