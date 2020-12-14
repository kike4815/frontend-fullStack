import React,{useState,useEffect} from 'react'
import { getMenusApi } from '../../../api/menu'
import MenuWebList from '../../../components/Admin/MenuWeb/MenuWebList'


import './MenuWeb.scss'

export default function MenuWeb() {
    const [menu, setMenu] = useState([])
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false)

    useEffect(() => {
        getMenusApi().then(response => {
            setMenu(response.menu)
        })
        setReloadMenuWeb(false)
    }, [reloadMenuWeb])

    return (
        <div className='menu-web'>
            <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb}/>
        </div>
    )
}
