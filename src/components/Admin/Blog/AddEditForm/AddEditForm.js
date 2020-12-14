import React, { useEffect, useState } from 'react'
import {Row,Col,Form,DatePicker,Input,Button,notification} from 'antd'
import {Editor} from '@tinymce/tinymce-react'
import {getAccessToken} from '../../../../api/auth'
import { createPostApi,updatePostApi } from '../../../../api/posts'
import moment from 'moment'
import {FontSizeOutlined, LinkOutlined} from '@ant-design/icons'

import './AddEditForm.scss'

export default function AddEditForm(props) {
    const {setIsVisibleModal,setReloadPosts,post} = props
    const [postData, setPostData] = useState({})

    useEffect(() => {
        if(post){
            setPostData(post)
        }else{
            setPostData({})
        }
    }, [post])

    const processPost =()=>{
        const {title,url, description, date} = postData
        if(!title || !url || !description || !date){
            notification['error']({
                message: 'Todos los campos son obligatorios'
            })
        }else{
            if(!post){
                addPost()
            }else {
                updatePost()
            }
        }
    }

    const addPost =()=> {
        const accesstoken = getAccessToken()
        createPostApi(accesstoken,postData).then(response => {
            const typeNotification = response.code !== 200 ? 'warning' : 'success'

            notification[typeNotification]({
                message:response.message
            })

            setIsVisibleModal(false)
            setReloadPosts(true)
            setPostData({})
        })
        .catch(()=> {
            notification['error']({
                message: 'Error en el servidor'
            })
        })
    }

    const updatePost=()=> {
        const accesstoken= getAccessToken()
        updatePostApi(accesstoken,postData._id,postData).then(response => {
            const typeNotification = response.code !== 200 ? 'warning': 'success'
            notification[typeNotification]({
                message: response.message
            })
            setIsVisibleModal(false)
            setReloadPosts(true)
            setPostData({})
        })
        .catch(()=> {
            notification['error']({
                message: 'Error en el servidor'
            })
        })
    }

    return (
        <div className='add-edit-post-form'>
            <AddEditPostForm postData={postData} setPostData={setPostData} post={post} processPost={processPost}/>
        </div>
    )
}

function AddEditPostForm(props){
    const {postData, setPostData, post,processPost} = props
    return (
        <Form className='add-edit-post-form'onFinish={processPost} >
            <Row gutter={24}>
                <Col span={8}>
                    <Input 
                        prefix={<FontSizeOutlined />}
                        placeholder='Titulo'
                        value={postData.title}
                        onChange={e=> setPostData({...postData, title:e.target.value})}
                    />
                </Col>
                <Col span={8}>
                    <Input 
                        prefix={<LinkOutlined />}
                        placeholder='url'
                        value={postData.url}
                        onChange={e=>setPostData({...postData, url:textTransformURL(e.target.value)})}
                    />
                </Col>
                <Col span={8}>
                    <DatePicker 
                        style={{width:'100%'}}
                        format='DD/MM/YYYY HH:mm:ss'
                        placeholder='Fecha de publicación'
                        value={postData.date && moment(postData.date)}
                        onChange={(e,value) => setPostData({
                            ...postData,
                            date: moment(value,"DD/MM/YYYY HH:mm:ss").toISOString()
                        })}
                    />
                </Col>
            </Row>
            <Editor
            value={postData.description ? postData.description : ''}
         init={{
           height: 400,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
         }}
         onBlur={e => setPostData({...postData, description: e.target.getContent()})}
       />
       <Button type='primary' htmlType='submit' className='btn-submit'>
           {post ? 'Actualizar post': 'Crear post'}
       </Button>
        </Form>
    )
}

function textTransformURL(text){
    const url = text.replace(" ","-")
    return url.toLowerCase()
}