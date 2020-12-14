import {baseURL,version} from './config'

export function getPostsApi(limit, page){
    const url =`${baseURL}/${version}/get-posts?limit=${limit}&page=${page}`
    
    return fetch(url)
    .then(response => {
        return response.json()
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })
}

export function deletePostApi(token,id){
    const url =`${baseURL}/${version}/delete-post/${id}`
    const params ={
        method: 'DELETE',
        headers:{
            'Content-type': 'application/json',
            Authorization: token
        }
    }    

    return fetch(url, params)
    .then(response => {
        return response.json()
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })  
}

export function createPostApi(token,data){
    const url =`${baseURL}/${version}/add-post`
    const params ={
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(data)
    }    

    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result 
    }).catch(err=>{
        return err
    })

}

export function updatePostApi(token,id,data){
    const url =`${baseURL}/${version}/update-post/${id}`
    const params ={
        method: 'PUT',
        headers:{
            'Content-type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify(data)
    }    

    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result 
    }).catch(err=>{
        return err
    })
  
}

export function findPostApi(url){
    const urlFetch =`${baseURL}/${version}/get-post/${url}`
    const params ={
        method: 'GET',
        headers:{
            'Content-type': 'application/json',            
        },
        
    }    

    return fetch(urlFetch,params).then(response => {
        return response.json()
    }).then(result => {
        return result 
    }).catch(err=>{
        return err
    })
  

}