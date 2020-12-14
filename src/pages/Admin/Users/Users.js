import React,{useState,useEffect} from 'react'
import {getUsersActiveApi} from '../../../api/user'
import {getAccessToken} from '../../../api/auth'
import ListUsers from '../../../components/Admin/Users/ListUsers'

import './Users.scss'

export default function Users() {
    const [usersActive, setUsersActive] = useState([])
    const [usersInactive, setUsersInactive] = useState([])
    const [usersReload, setUsersReload] = useState(false)
    const token = getAccessToken()
    

    useEffect(() => {
        getUsersActiveApi(token,true).then(response => {
            setUsersActive(response.users)
        })
        getUsersActiveApi(token,false).then(response => {
            setUsersInactive(response.users)
        });
        setUsersReload(false)
    }, [token,usersReload])

    return (
        <div className='users'>
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} setUsersReload={setUsersReload}/>
        </div>
    )
}
