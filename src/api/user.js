import {baseURL, version} from './config'

export function signUpAPI (data) {
    const url = `${baseURL}/${version}/sign-up`
    const params = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    return fetch(url,params)
        .then(response => { 
        return response.json()
    })
    .then(result => {
        if(result.user){
            return {
                ok: true,
                message:'Usuario creado correctamente'}
        } 
        return {
            ok:false,
           message: result.message
        }
    })
    .catch(err => {
        return {
            ok:false,
            message:err.message
        }
    })
}

export function signInAPI(data){
    const url = `${baseURL}/${version}/sign-in`
    
    const params = {
        
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        
    }

    return fetch(url,params)
    .then(response => {
        return response.json()
    }).then(result => {
        return result
    })
    .catch(err=>{
        return err.message
    })
}

export function getUsersApi(token) {
    const url = `${baseURL}/${version}/users`

    const params = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    }
    return fetch(url,params)
    .then(response =>{
        return response.json()
    }).then(result => {
        return result
    }).catch(err=>{
        return err.message
    })
}
export function getUsersActiveApi(token,status) {
    const url = `${baseURL}/${version}/users-active?active=${status}`

    const params = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        }
    }
    return fetch(url,params)
    .then(response =>{
        return response.json()
    }).then(result => {
        return result
    }).catch(err=>{
        return err.message
    })
}

export function uploadAvatarApi(token, avatar, userId){
    const url = `${baseURL}/${version}/upload-avatar/${userId}`

    const formData = new FormData()
    formData.append("avatar", avatar,avatar.name)

    const params = {
        method : 'PUT',
        body: formData,
        headers: {
            'Authorization': token
        }
    }

    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err.message
    })
}

export function getAvatarApi (avatar) {
    const url = `${baseURL}/${version}/get-avatar/${avatar}`

    return fetch(url)
        .then(response => {
            return response.url
        })
        .catch(err => {
            return err.message
        })
}

export function updateUserApi (token,user,userId) {
    const url = `${baseURL}/${version}/update-user/${userId}`

    const params = {
        method: 'PUT',
        headers : {
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(user)
    }

    return fetch(url,params).then(response =>{
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err.message
    })
}

export function activateUserApi(token, userId, status){
    const url = `${baseURL}/${version}/activate-user/${userId}`
    const params = {
        method: 'PUT',
        headers : {
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            active: status
        })
    }
    return fetch(url, params)
    .then(response => {
        return response.json()
    }).then(result => {
        return result.message
    }).catch(error => {
        return error.message
    })
}

export function deleteUserApi(token, userId){
    const url = `${baseURL}/${version}/delete-user/${userId}`
    const params = {
        method: 'DELETE',
        headers : {
            'Content-type': 'application/json',
            'Authorization': token
        }
    }
    return fetch(url,params).then(response => {
        return response.json()
    }).then(result => {
        return result.message
    }).catch(error => {
        return error.message
    })
}

export function signUpAdminApi(token,data){
    const url = `${baseURL}/${version}/sign-up-admin`
    const params = {
        method: 'POST',
        headers : {
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }
    return fetch(url,params).then(response =>{
        return response.json()
    }).then(result => {
        return result.message
    }).catch(err => {
        return err.message
    })
}