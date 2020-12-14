import React, { useEffect, useState } from 'react'
import {Spin, List,notification} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/es'
import queryString from 'query-string'
import Pagination from '../../../Pagination'
import {getPostsApi} from '../../../../api/posts'
import {Helmet} from 'react-helmet'

import './PostListWeb.scss'

export default function PostListWeb(props) {
    const {location, history} = props
    const [posts, setPosts] = useState(null)
    const {page = 1} = queryString.parse(location.search)    

    useEffect(() => {
        getPostsApi(8,page).then(response => {
            if(response?.code !==200){
                notification['warning']({
                    message: response.message
                })
            }else{
                setPosts(response.posts)
            }
        })
    }, [page])

    if(!posts){
        return (
            <Spin tip='Cargando' style={{width:'100%', padding:'200px 0'}} />
        )
    }

    return (
        <>
        <Helmet>
            <title>KIKE WEBDEVs | BLOG DESIGN</title>
        </Helmet>
        <div className='posts-list-web'>
            <h1>Blog</h1>
            <List 
                dataSource={posts.docs}
                renderItem={post => <Post post={post} />}/>            
            <Pagination posts={posts} location={location} history={history}/>    
        </div>
        </>
    )
}

function Post(props){
    const {post} = props
    
    const day = moment(post.date).format('DD')
    const month = moment(post.date).format('MMMM')

    return (
        <List.Item className='post'>
            
                <div className='post__date'>
                    <span>{day}</span>
                    <span>{month}</span>
                </div>
                <Link to={`blog/${post.url}`} target='_blank'>
                    <List.Item.Meta title={post.title}/>
                </Link>
            
        </List.Item>
        
    )
}
