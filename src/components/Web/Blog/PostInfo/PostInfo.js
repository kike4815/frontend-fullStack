import React, { useEffect, useState } from 'react'
import {Spin,notification} from 'antd'
import moment from 'moment'
import 'moment/locale/es'
import {findPostApi} from '../../../../api/posts'

import './PostInfo.scss'

export default function PostInfo(props) {
    const {url} = props
    const [postInfo, setPostInfo] = useState(null)
    
    useEffect(() => {
        if(url){
            findPostApi(url).then(response => {
                if(response.code !== 200){
                    notification['warning']({
                        message: response.message
                    })
                }else {
                    setPostInfo(response.post)
                }
            }).catch(()=> {
                notification['warning']({
                    message: 'Error en el servidor'
                })  
            })
        }
    }, [url])

    if(!postInfo){
        return (
            <Spin tip='Cargando' style={{width:'100%', padding:'20px'}}/>
        )
    }

    return (
        <div className='post-info'>
            <h1 className='post-info__title'>{postInfo.title}</h1>
            <div className='post-info__creation-date'>
                {moment(postInfo.date).local('es').format('LL')}
            </div>

            <div className='post-info__description' 
                dangerouslySetInnerHTML={{__html:postInfo.description}}
            />
        </div>
    )
}
