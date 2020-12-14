import Modal from '../../../components/Modal'
import {Button,notification} from 'antd'
import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'
import { getPostsApi } from '../../../api/posts'
import PostList from '../../../components/Admin/Blog/PostList'
import Pagination from '../../../components/Pagination'
import AddEditForm from '../../../components/Admin/Blog/AddEditForm'

import './Blog.scss'

function Blog(props) {
    const {location, history}= props

    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
    const [posts, setPosts] = useState(null)
    const [reloadPosts, setReloadPosts] = useState(false)

    const {page = 1 } = queryString.parse(location.search)
    
    useEffect(() => {
        getPostsApi(8,page).then(response => {
            if(response?.code !==200){
                notification['warning']({
                    message: response.message
                })
            }else {
                setPosts(response.posts)
            }
        })
        .catch(()=> {
            notification['error']({
                message: 'Error del servidor'
            })
        })
        setReloadPosts(false)
    }, [page,reloadPosts]
    )

    if(!posts){
        return null
    }

    const addPost =()=> {
        setIsVisibleModal(true)
        setModalTitle('Creando nuevo Post')
        setModalContent(<AddEditForm 
            setIsVisibleModal={setIsVisibleModal}
            setReloadPosts={setReloadPosts}
            post={null}
        />)
    }
    const editPost =(posts)=> {
        setIsVisibleModal(true)
        setModalTitle('Editando Post')
        setModalContent(<AddEditForm 
            setIsVisibleModal={setIsVisibleModal}
            setReloadPosts={setReloadPosts}
            post={posts}
        />)
    }

    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary' onClick={addPost}>Nuevo post</Button>
            </div>

            <PostList posts={posts} setReloadPosts={setReloadPosts} editPost={editPost}/>
            <Pagination posts={posts} location={location} history={history}/>

            <Modal 
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
                width='75%'            
            >
                {modalContent}
            </Modal>

        </div>
    )
}

export default withRouter(Blog)